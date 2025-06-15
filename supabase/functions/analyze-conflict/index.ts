import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Standard CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get the user's text from the request
    const { conflictDescription } = await req.json()
    if (!conflictDescription) {
      throw new Error("Conflict description is required.")
    }

    // Get all API keys from Supabase secrets
    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY')
    const googleApiKey = Deno.env.get('GOOGLE_API_KEY')
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')

    // Check for missing API keys
    const missingKeys = []
    if (!anthropicApiKey) missingKeys.push('ANTHROPIC_API_KEY')
    if (!googleApiKey) missingKeys.push('GOOGLE_API_KEY')
    if (!openaiApiKey) missingKeys.push('OPENAI_API_KEY')

    if (missingKeys.length > 0) {
      throw new Error(`Missing API keys: ${missingKeys.join(', ')}`)
    }

    // Initialize Supabase client for database operations
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Define the three API calls
    const callAnthropic = async () => {
      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': anthropicApiKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            model: 'claude-3-opus-20240229',
            max_tokens: 2048,
            messages: [
              {
                role: 'user',
                content: `You are an expert psychologist. Your single task is to analyze the text inside the "USER TEXT" block below and provide a structured, three-part analysis. Your entire response must be in the exact same language as the user's text.

--- USER TEXT BEGINS ---
${conflictDescription}
--- USER TEXT ENDS ---

Now, provide your analysis using these exact three Markdown headings and nothing else:

### The Other Perspective

### The Emotional Bridge

### The Translator for your next discussion

For the Translator section, you MUST provide AT LEAST THREE distinct suggestions for different angles of conversation. Format each one on a new line using this exact structure: 
1. **Don't say:** [phrase] / **Instead, try:** [phrase]
2. **Don't say:** [phrase] / **Instead, try:** [phrase]
3. **Don't say:** [phrase] / **Instead, try:** [phrase]`
              }
            ]
          })
        })

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Anthropic API error: ${response.status} - ${errorText}`)
        }

        const data = await response.json()
        return data.content[0].text
      } catch (error) {
        console.error('Anthropic API failed:', error)
        return `Error calling Claude: ${error.message}`
      }
    }

    const callGoogle = async () => {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${googleApiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are a cold, rational strategist. Your entire response must be in the exact same language as the user's text. Analyze this conflict: ${conflictDescription}. Do not focus on feelings. Identify the core interests and propose a 3-step tactical plan for de-escalation.`
              }]
            }],
            generationConfig: {
              maxOutputTokens: 2048,
              temperature: 0.7
            }
          })
        })

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Google API error: ${response.status} - ${errorText}`)
        }

        const data = await response.json()
        return data.candidates[0].content.parts[0].text
      } catch (error) {
        console.error('Google API failed:', error)
        return `Error calling Gemini: ${error.message}`
      }
    }

    const callOpenAI = async () => {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openaiApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            max_tokens: 2048,
            response_format: { type: "json_object" },
            messages: [
              {
                role: 'system',
                content: 'You must respond with valid JSON only. Your entire response MUST be a valid JSON object with an "attacks" key containing an array of objects, and nothing else.'
              },
              {
                role: 'user',
                content: `Your entire response must be in the same language as the user's text. The user is facing a conflict and needs to prepare for manipulative arguments.

The user's conflict is: "${conflictDescription}"

Generate a JSON object with an "attacks" key containing an array of objects, where each object has these three keys: "attack_type", "example_quote", and "counter_strategy".

Example of the required JSON format:
{
  "attacks": [
    {
      "attack_type": "Personal Attack",
      "example_quote": "You're just being emotional and not thinking logically.",
      "counter_strategy": "Acknowledge their point but re-center on your feelings. 'I understand you see it that way, but for me, this is an emotional issue and my feelings are valid.'"
    },
    {
      "attack_type": "Guilt-Tripping", 
      "example_quote": "After everything I've done for you, you're questioning my judgment?",
      "counter_strategy": "Set a boundary without being aggressive. 'I'm grateful for everything, and this conversation isn't about that. It's about finding a solution to this specific issue.'"
    }
  ]
}`
              }
            ]
          })
        })

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`OpenAI API error: ${response.status} - ${errorText}`)
        }

        const data = await response.json()
        const rawContent = data.choices[0].message.content
        
        // Parse the JSON response from OpenAI
        try {
          const parsedOpenAIResponse = JSON.parse(rawContent)
          return parsedOpenAIResponse.attacks || []
        } catch (parseError) {
          console.error('Failed to parse OpenAI JSON response:', parseError)
          console.error('Raw response:', rawContent)
          return `Error parsing GPT-4 response: ${parseError.message}`
        }
      } catch (error) {
        console.error('OpenAI API failed:', error)
        return `Error calling GPT-4: ${error.message}`
      }
    }

    // Execute all three API calls in parallel
    console.log('Starting parallel API calls...')
    const [claudeAnalysis, googleAnalysis, openaiAnalysis] = await Promise.all([
      callAnthropic(),
      callGoogle(),
      callOpenAI()
    ])

    console.log('All API calls completed')

    // Process Wisdom of the Crowd if Claude analysis succeeded
    let wisdomOfCrowd = null
    if (claudeAnalysis && !claudeAnalysis.startsWith('Error calling Claude:')) {
      try {
        // Extract the emotional bridge text from Claude's response
        const bridgeMatch = claudeAnalysis.match(/### The Emotional Bridge\s*\n\n?([\s\S]*?)(?=\n### |$)/i)
        if (bridgeMatch && bridgeMatch[1]) {
          const bridgeText = bridgeMatch[1].trim()
          
          // Perform UPSERT operation on emotional_bridges table
          const { data: upsertData, error: upsertError } = await supabase
            .from('emotional_bridges')
            .upsert(
              { bridge_text: bridgeText, occurrence_count: 1 },
              { 
                onConflict: 'bridge_text',
                count: 'exact'
              }
            )
            .select()

          if (upsertError) {
            // If upsert failed due to conflict, increment the existing count
            const { error: updateError } = await supabase
              .from('emotional_bridges')
              .update({ 
                occurrence_count: supabase.rpc('increment_count'),
                updated_at: new Date().toISOString()
              })
              .eq('bridge_text', bridgeText)

            if (updateError) {
              console.error('Error updating bridge count:', updateError)
            }
          }

          // Get the current count for this bridge and total count
          const { data: currentBridge } = await supabase
            .from('emotional_bridges')
            .select('occurrence_count')
            .eq('bridge_text', bridgeText)
            .single()

          const { data: totalCountData } = await supabase
            .rpc('get_total_bridge_count')

          if (currentBridge && totalCountData !== null) {
            const percentage = Math.round((currentBridge.occurrence_count / totalCountData) * 100)
            
            wisdomOfCrowd = {
              text: bridgeText,
              count: currentBridge.occurrence_count,
              totalAnalyzed: totalCountData,
              percentage: percentage
            }
          }
        }
      } catch (error) {
        console.error('Error processing wisdom of crowd:', error)
        // Continue without wisdom data if there's an error
      }
    }

    // Send the consolidated response back to the frontend
    const response = { 
      claudeAnalysis,
      googleAnalysis,
      openaiAnalysis
    }

    // Add wisdom of crowd data if available
    if (wisdomOfCrowd) {
      response.wisdomOfCrowd = wisdomOfCrowd
    }

    return new Response(
      JSON.stringify(response),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('Edge Function failed:', error)
    // Send a detailed error message back to the frontend for debugging
    return new Response(
      JSON.stringify({ 
        error: `Edge Function failed: ${error.message}`
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
