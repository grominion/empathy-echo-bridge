
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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
    // Try to get the data from the request
    const body = await req.json()
    const conflictDescription = body.conflictDescription

    // If successful, just echo it back
    return new Response(
      JSON.stringify({ 
        message: "Success! I received your text.",
        receivedText: conflictDescription 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    // If anything fails, return a very specific error
    return new Response(
      JSON.stringify({ 
        error: 'The backend function crashed while reading your request.',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
