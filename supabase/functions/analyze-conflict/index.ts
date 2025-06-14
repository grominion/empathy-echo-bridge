import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const { conflictDescription, conversationHistory, isCoachMode } = body
    
    if (!conflictDescription && !conversationHistory) {
      return new Response(
        JSON.stringify({ error: 'Conflict description or conversation history is required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Processing request - Coach Mode:', isCoachMode)

    // Get API keys from environment
    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY')
    const googleApiKey = Deno.env.get('GOOGLE_API_KEY')
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    
    if (!anthropicApiKey || !googleApiKey || !openaiApiKey) {
      throw new Error('Missing required API keys')
    }

    // Initialize Supabase client for database operations
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    let anthropicPrompt = ''
    let googlePrompt = ''
    let openaiPrompt = ''
    
    if (isCoachMode && conversationHistory) {
      // Format conversation history for coach mode
      const formattedHistory = conversationHistory.map((turn: any, index: number) => {
        switch (turn.type) {
          case 'initial_problem':
            return `Initial Problem: "${turn.content}"`
          case 'ai_analysis':
            const analysisNumber = Math.floor(index / 2) + 1
            return `AI Coach's Analysis #${analysisNumber}: ${turn.content}`
          case 'their_reply':
            const replyNumber = Math.floor((index - 1) / 2) + 1
            return `Their Reply #${replyNumber}: "${turn.content}"`
          default:
            return ''
        }
      }).filter(entry => entry).join('\n')

      anthropicPrompt = `### ROLE
You are ECHO, a world-class communication coach and psychologist. Your goal is to help the user navigate a difficult conversation by providing turn-by-turn tactical advice. You have access to the entire conversation history.

### CONTEXT: CONVERSATION HISTORY
Below is the transcript of the user's difficult conversation so far. The user provides their initial problem and then the replies they receive from the other person. Your job is to analyze the LATEST reply in the context of everything that came before.

--- CONVERSATION HISTORY BEGINS ---
${formattedHistory}
--- CONVERSATION HISTORY ENDS ---

### YOUR TASK
Based on the full history, analyze the **latest reply from the other person**. Provide a new, concise, three-part analysis to coach the user for their NEXT move. Your analysis must be shorter and more tactical than the first one.

Respond in the same language as the conversation. Use these exact Markdown headings:

### Deconstructing Their Last Reply
(Briefly explain the emotion or fear likely driving their latest message. What did they really mean?)

### The Next Emotional Bridge
(Identify the immediate point of connection you can build on. What common ground does their last reply reveal?)

### Your Next Move (The Translator)
(Provide a new, concrete "Don't say / Instead, try" suggestion to de-escalate and move the conversation forward.)`

      googlePrompt = `You are a cold, rational strategist. Analyze this ongoing conflict conversation: "${formattedHistory}". Do not focus on feelings. Identify the core interests, potential leverage points for each party, and propose a 3-step tactical plan for de-escalation that leads to a measurable compromise. Your response MUST be concise and actionable.`
      
      openaiPrompt = `You are a cynical and aggressive Devil's Advocate. Read this ongoing conflict conversation: "${formattedHistory}". Prepare the user for the worst possible response. What are the most unfair, manipulative, or irrational arguments the other person could use next? List them as bullet points.`
    } else {
      // Original single-shot analysis
      anthropicPrompt = `You are an expert psychologist. Your single task is to analyze the text inside the "USER TEXT" block below and provide a structured, three-part analysis. Your entire response must be in the exact same language as the user's text.

--- USER TEXT BEGINS ---
${conflictDescription}
--- USER TEXT ENDS ---

Now, provide your analysis using these exact three Markdown headings and nothing else:

### The Other Perspective
(Your first-person analysis goes here)

### The Emotional Bridge
(Your analysis of the shared emotion goes here)

### The Translator for your next discussion
(Your "Don't say / Instead, try" advice goes here)`

      googlePrompt = `You are a cold, rational strategist. Analyze this conflict: "${conflictDescription}". Do not focus on feelings. Identify the core interests, potential leverage points for each party, and propose a 3-step tactical plan for de-escalation that leads to a measurable compromise. Your response MUST be concise and actionable.`
      
      openaiPrompt = `You are a cynical and aggressive Devil's Advocate. Read this conflict: "${conflictDescription}". Prepare the user for the worst possible response. What are the most unfair, manipulative, or irrational arguments the other person could use? List them as bullet points.`
    }

    console.log('Making parallel API calls to Council of Sages...')

    // Call 1: Anthropic (The Empath)
    const anthropicCall = fetch('https://api.anthropic.com/v1/messages', {
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
            content: anthropicPrompt
          }
        ]
      })
    })

    // Call 2: Google (The Strategist)
    const googleCall = fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${googleApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: googlePrompt
          }]
        }]
      })
    })

    // Call 3: OpenAI (The Devil's Advocate)
    const openaiCall = fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: 1500,
        messages: [
          {
            role: 'user',
            content: openaiPrompt
          }
        ]
      })
    })

    // Execute all API calls in parallel
    const [anthropicResponse, googleResponse, openaiResponse] = await Promise.all([
      anthropicCall,
      googleCall,
      openaiCall
    ])

    // Check responses
    if (!anthropicResponse.ok) {
      const errorText = await anthropicResponse.text()
      console.error('Anthropic API error:', anthropicResponse.status, errorText)
      throw new Error(`Anthropic API error: ${anthropicResponse.status}`)
    }

    if (!googleResponse.ok) {
      const errorText = await googleResponse.text()
      console.error('Google API error:', googleResponse.status, errorText)
      throw new Error(`Google API error: ${googleResponse.status}`)
    }

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text()
      console.error('OpenAI API error:', openaiResponse.status, errorText)
      throw new Error(`OpenAI API error: ${openaiResponse.status}`)
    }

    // Parse responses
    const anthropicData = await anthropicResponse.json()
    const googleData = await googleResponse.json()
    const openaiData = await openaiResponse.json()

    console.log('Successfully received responses from all AI providers')
    
    const empathyAnalysis = anthropicData.content[0].text
    const strategyAnalysis = googleData.candidates[0].content.parts[0].text
    const devilsAdvocateAnalysis = openaiData.choices[0].message.content

    // Extract emotional bridge text for database storage
    let emotionalBridgeText = ''
    if (empathyAnalysis) {
      // Extract text between "### The Emotional Bridge" or "### The Next Emotional Bridge" and the next heading
      const bridgeMatch = empathyAnalysis.match(/### (?:The Next )?Emotional Bridge\s*\n(.*?)(?=\n###|$)/s)
      if (bridgeMatch) {
        emotionalBridgeText = bridgeMatch[1].trim()
        // Clean up markdown and extract key phrases
        emotionalBridgeText = emotionalBridgeText.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1')
        // Take first sentence or up to 200 chars for storage
        if (emotionalBridgeText.length > 200) {
          emotionalBridgeText = emotionalBridgeText.substring(0, 200).split('.')[0]
        }
      }
    }

    // Database interaction for wisdom of the crowd
    let wisdomOfCrowd = null
    if (emotionalBridgeText) {
      console.log('Processing emotional bridge for wisdom of crowd:', emotionalBridgeText)
      
      try {
        // Check if this emotional bridge already exists
        const { data: existingBridge, error: selectError } = await supabase
          .from('emotional_bridges')
          .select('*')
          .eq('bridge_text', emotionalBridgeText)
          .single()

        if (selectError && selectError.code !== 'PGRST116') { // PGRST116 is "no rows found"
          console.error('Error checking existing bridge:', selectError)
        }

        let currentCount = 0
        if (existingBridge) {
          // Increment existing count
          const newCount = existingBridge.occurrence_count + 1
          const { error: updateError } = await supabase
            .from('emotional_bridges')
            .update({ occurrence_count: newCount })
            .eq('id', existingBridge.id)

          if (updateError) {
            console.error('Error updating bridge count:', updateError)
          } else {
            currentCount = newCount
            console.log('Updated existing bridge count to:', newCount)
          }
        } else {
          // Insert new bridge
          const { data: newBridge, error: insertError } = await supabase
            .from('emotional_bridges')
            .insert({ bridge_text: emotionalBridgeText })
            .select()
            .single()

          if (insertError) {
            console.error('Error inserting new bridge:', insertError)
          } else {
            currentCount = 1
            console.log('Inserted new bridge with count 1')
          }
        }

        // Get total count of all bridges to calculate percentage
        const { count: totalEntries, error: countError } = await supabase
          .from('emotional_bridges')
          .select('*', { count: 'exact', head: true })

        if (countError) {
          console.error('Error getting total count:', countError)
        } else {
          const percentage = totalEntries ? Math.round((currentCount / totalEntries) * 100) : 0
          wisdomOfCrowd = {
            text: `This emotional bridge has been seen in ${percentage}% of similar conflicts analyzed on ECHO.`,
            count: currentCount,
            totalAnalyzed: totalEntries || 0,
            percentage: percentage
          }
          console.log('Wisdom of crowd calculated:', wisdomOfCrowd)
        }
      } catch (dbError) {
        console.error('Database operation failed:', dbError)
        // Continue without wisdom of crowd data
      }
    }

    // Consolidate final response
    const analysis = {
      empathyAnalysis: empathyAnalysis,
      strategyAnalysis: strategyAnalysis,
      devilsAdvocateAnalysis: devilsAdvocateAnalysis,
      wisdomOfCrowd: wisdomOfCrowd,
      detectedLanguage: 'English'
    }
    
    console.log('Sending consolidated analysis response')
    
    return new Response(
      JSON.stringify(analysis),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Edge function internal error:', error)
    return new Response(
      JSON.stringify({ 
        error: `Backend Error: ${error.message}`
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
