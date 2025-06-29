
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
    const { conflictDescription } = await req.json()
    if (!conflictDescription) {
      throw new Error("Conflict description is required.")
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Récupérer la configuration LLM active
    const { data: activeConfig, error: configError } = await supabase
      .from('llm_configurations')
      .select('*')
      .eq('is_active', true)
      .single()

    if (configError || !activeConfig) {
      throw new Error("No active LLM configuration found")
    }

    console.log('Using LLM config:', activeConfig.name)

    let analysisResult = ''

    switch (activeConfig.provider) {
      case 'anthropic':
        analysisResult = await callAnthropic(activeConfig, conflictDescription)
        break
      case 'openai':
        analysisResult = await callOpenAI(activeConfig, conflictDescription)
        break
      case 'google':
        analysisResult = await callGoogle(activeConfig, conflictDescription)
        break
      default:
        throw new Error(`Unsupported provider: ${activeConfig.provider}`)
    }

    return new Response(
      JSON.stringify({ 
        analysis: analysisResult,
        llm_used: activeConfig.name,
        provider: activeConfig.provider
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('Dynamic LLM call failed:', error)
    return new Response(
      JSON.stringify({ 
        error: `Dynamic LLM call failed: ${error.message}`
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

async function callAnthropic(config: any, conflictDescription: string) {
  const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY')
  if (!anthropicApiKey) throw new Error('ANTHROPIC_API_KEY not found')

  const response = await fetch(config.api_endpoint, {
    method: 'POST',
    headers: {
      'x-api-key': anthropicApiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: config.model,
      max_tokens: config.max_tokens,
      messages: [
        {
          role: 'user',
          content: `${config.system_prompt}

Analyze this conflict: ${conflictDescription}`
        }
      ]
    })
  })

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.status}`)
  }

  const data = await response.json()
  return data.content[0].text
}

async function callOpenAI(config: any, conflictDescription: string) {
  const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
  if (!openaiApiKey) throw new Error('OPENAI_API_KEY not found')

  const response = await fetch(config.api_endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: config.model,
      max_tokens: config.max_tokens,
      temperature: config.temperature,
      messages: [
        {
          role: 'system',
          content: config.system_prompt
        },
        {
          role: 'user',
          content: `Analyze this conflict: ${conflictDescription}`
        }
      ]
    })
  })

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}

async function callGoogle(config: any, conflictDescription: string) {
  const googleApiKey = Deno.env.get('GOOGLE_API_KEY')
  if (!googleApiKey) throw new Error('GOOGLE_API_KEY not found')

  const response = await fetch(`${config.api_endpoint}?key=${googleApiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `${config.system_prompt}

Analyze this conflict: ${conflictDescription}`
        }]
      }],
      generationConfig: {
        maxOutputTokens: config.max_tokens,
        temperature: config.temperature
      }
    })
  })

  if (!response.ok) {
    throw new Error(`Google API error: ${response.status}`)
  }

  const data = await response.json()
  return data.candidates[0].content.parts[0].text
}
