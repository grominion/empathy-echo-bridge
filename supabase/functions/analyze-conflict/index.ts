
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

    // Securely get the API key from Supabase secrets
    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY')
    if (!anthropicApiKey) {
      throw new Error('CRITICAL: ANTHROPIC_API_KEY not configured in Supabase Secrets.')
    }

    // Call the real Anthropic API
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
    const aiResponse = data.content[0].text
    
    // Send the successful response back to the frontend
    return new Response(
      JSON.stringify({ analysis: aiResponse }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
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
