
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
    const assemblyAiApiKey = Deno.env.get('ASSEMBLYAI_API_KEY')
    if (!assemblyAiApiKey) {
      throw new Error('CRITICAL: ASSEMBLYAI_API_KEY not found in Supabase Secrets.')
    }

    // First, upload the audio file to get a URL
    const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
      method: 'POST',
      headers: { 'authorization': assemblyAiApiKey },
      body: req.body
    })
    const uploadData = await uploadResponse.json()
    const audioUrl = uploadData.upload_url

    if (!audioUrl) {
      throw new Error('Failed to upload audio to AssemblyAI.')
    }

    // Then, submit the URL for transcription
    const transcriptResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
      method: 'POST',
      headers: {
        'authorization': assemblyAiApiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify({ audio_url: audioUrl })
    })
    const transcriptData = await transcriptResponse.json()
    const transcriptId = transcriptData.id

    // Poll for the result
    let status = 'processing';
    let transcriptionResult;
    while (status === 'processing' || status === 'queued') {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
      const pollResponse = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
        headers: { 'authorization': assemblyAiApiKey }
      });
      transcriptionResult = await pollResponse.json();
      status = transcriptionResult.status;
      if (status === 'error') {
        throw new Error(`AssemblyAI transcription failed: ${transcriptionResult.error}`);
      }
    }

    // Once complete, return the text
    return new Response(
      JSON.stringify({ transcription: transcriptionResult.text }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Voice function failed: ${error.message}` }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
