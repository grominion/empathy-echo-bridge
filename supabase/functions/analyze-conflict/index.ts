
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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

### The Translator for your next discussion`
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
                text: `You are a cold, rational strategist. Analyze this conflict: ${conflictDescription}. Do not focus on feelings. Identify the core interests and propose a 3-step tactical plan for de-escalation.`
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
            messages: [
              {
                role: 'user',
                content: `You are a cynical Devil's Advocate. Read this conflict: ${conflictDescription}. Prepare the user for the worst possible response. What are the most unfair or manipulative arguments the other person could use? List them as bullet points.`
              }
            ]
          })
        })

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`OpenAI API error: ${response.status} - ${errorText}`)
        }

        const data = await response.json()
        return data.choices[0].message.content
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

    // Send the consolidated response back to the frontend
    return new Response(
      JSON.stringify({ 
        claudeAnalysis,
        googleAnalysis,
        openaiAnalysis
      }),
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
