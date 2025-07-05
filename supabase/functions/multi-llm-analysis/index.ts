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

    // Récupérer toutes les configurations actives par catégorie
    const { data: configs, error: configError } = await supabase
      .from('llm_configurations')
      .select('*')
      .eq('is_active', true)
      .order('priority_order', { ascending: true })

    if (configError || !configs || configs.length === 0) {
      throw new Error("No active LLM configurations found")
    }

    console.log('Using LLM configs:', configs.map(c => `${c.name} (${c.category})`))

    const analyses: Record<string, any> = {}
    const promises = configs.map(async (config) => {
      try {
        let result = ''
        const prompt = `${config.system_prompt}

Analyze this conflict: ${conflictDescription}`

        switch (config.provider) {
          case 'anthropic':
            result = await callAnthropic(config, prompt)
            break
          case 'openai':
            result = await callOpenAI(config, prompt)
            break
          case 'google':
            result = await callGoogle(config, prompt)
            break
          case 'xai':
            result = await callXAI(config, prompt)
            break
          case 'mistral':
            result = await callMistral(config, prompt)
            break
          case 'deepseek':
            result = await callDeepSeek(config, prompt)
            break
          case 'qwen':
            result = await callQwen(config, prompt)
            break
        }
        
        analyses[config.category || config.provider] = {
          result,
          name: config.name,
          provider: config.provider,
          category: config.category,
          description: config.description
        }
      } catch (error) {
        console.error(`Error with ${config.name}:`, error)
        analyses[config.category || config.provider] = {
          error: error.message,
          name: config.name,
          provider: config.provider,
          category: config.category
        }
      }
    })

    await Promise.all(promises)

    return new Response(
      JSON.stringify({ 
        analyses,
        configs_used: configs.map(c => ({ name: c.name, category: c.category }))
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('Multi-LLM analysis failed:', error)
    return new Response(
      JSON.stringify({ 
        error: `Multi-LLM analysis failed: ${error.message}`
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

async function callAnthropic(config: any, prompt: string) {
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
          content: prompt
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

async function callOpenAI(config: any, prompt: string) {
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
          content: prompt
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

async function callGoogle(config: any, prompt: string) {
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
          text: prompt
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

async function callXAI(config: any, prompt: string) {
  const xaiApiKey = Deno.env.get('XAI_API_KEY')
  if (!xaiApiKey) throw new Error('XAI_API_KEY not found')

  const response = await fetch(config.api_endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${xaiApiKey}`,
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
          content: prompt
        }
      ]
    })
  })

  if (!response.ok) {
    throw new Error(`XAI API error: ${response.status}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}

async function callMistral(config: any, prompt: string) {
  const mistralApiKey = Deno.env.get('MISTRAL_API_KEY')
  if (!mistralApiKey) throw new Error('MISTRAL_API_KEY not found')

  const response = await fetch(config.api_endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${mistralApiKey}`,
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
          content: prompt
        }
      ]
    })
  })

  if (!response.ok) {
    throw new Error(`Mistral API error: ${response.status}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}

async function callDeepSeek(config: any, prompt: string) {
  const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY')
  if (!deepseekApiKey) throw new Error('DEEPSEEK_API_KEY not found')

  const response = await fetch(config.api_endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${deepseekApiKey}`,
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
          content: prompt
        }
      ]
    })
  })

  if (!response.ok) {
    throw new Error(`DeepSeek API error: ${response.status}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}

async function callQwen(config: any, prompt: string) {
  const qwenApiKey = Deno.env.get('QWEN_API_KEY')
  if (!qwenApiKey) throw new Error('QWEN_API_KEY not found')

  const response = await fetch(config.api_endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${qwenApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: config.model,
      parameters: {
        max_tokens: config.max_tokens,
        temperature: config.temperature
      },
      input: {
        messages: [
          {
            role: 'system',
            content: config.system_prompt
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      }
    })
  })

  if (!response.ok) {
    throw new Error(`Qwen API error: ${response.status}`)
  }

  const data = await response.json()
  return data.output.choices[0].message.content
}
