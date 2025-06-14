
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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

    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY')
    if (!anthropicApiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured')
    }

    let prompt = ''
    
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

      prompt = `### ROLE
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
    } else {
      // Original single-shot analysis
      prompt = `You are an expert psychologist. Your single task is to analyze the text inside the "USER TEXT" block below and provide a structured, three-part analysis. Your entire response must be in the exact same language as the user's text.

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
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2048,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Anthropic API error:', response.status, errorText)
      throw new Error(`Anthropic API error: ${response.status}`)
    }

    const data = await response.json()
    console.log('Successfully received response from Anthropic')
    
    const aiResponse = data.content[0].text
    
    const analysis = {
      detectedLanguage: 'English',
      otherPerspective: aiResponse,
      emotionalBridge: '',
      translator: []
    }
    
    return new Response(
      JSON.stringify(analysis),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to analyze conflict',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
