
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Parse audio data from request
    const { audioData } = await req.json();

    if (!audioData) {
      throw new Error('No audio data provided');
    }

    // Step 1: Try ONLY the AssemblyAI transcription service
    try {
      const assemblyApiKey = Deno.env.get('ASSEMBLYAI_API_KEY');
      if (!assemblyApiKey) {
        throw new Error('AssemblyAI API key not configured');
      }

      // Convert base64 audio to binary
      const binaryAudio = Uint8Array.from(atob(audioData), c => c.charCodeAt(0));

      // Upload audio to AssemblyAI
      const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
        method: 'POST',
        headers: {
          'Authorization': assemblyApiKey,
          'Content-Type': 'application/octet-stream',
        },
        body: binaryAudio,
      });

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${await uploadResponse.text()}`);
      }

      const uploadResult = await uploadResponse.json();
      const audioUrl = uploadResult.upload_url;

      // Request transcription
      const transcriptResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
        method: 'POST',
        headers: {
          'Authorization': assemblyApiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          audio_url: audioUrl,
        }),
      });

      if (!transcriptResponse.ok) {
        throw new Error(`Transcription request failed: ${await transcriptResponse.text()}`);
      }

      const transcriptRequest = await transcriptResponse.json();
      const transcriptId = transcriptRequest.id;

      // Poll for completion
      let transcript;
      let attempts = 0;
      const maxAttempts = 60; // 5 minutes max

      while (attempts < maxAttempts) {
        const pollResponse = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
          headers: {
            'Authorization': assemblyApiKey,
          },
        });

        if (!pollResponse.ok) {
          throw new Error(`Polling failed: ${await pollResponse.text()}`);
        }

        transcript = await pollResponse.json();

        if (transcript.status === 'completed') {
          break;
        } else if (transcript.status === 'error') {
          throw new Error(`Transcription failed: ${transcript.error}`);
        }

        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
        attempts++;
      }

      if (!transcript || transcript.status !== 'completed') {
        throw new Error('Transcription timed out');
      }

      const transcribedText = transcript.text;

      return new Response(
        JSON.stringify({ transcription: transcribedText }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (errorAssembly) {
      return new Response(
        JSON.stringify({ error: `AssemblyAI call failed: ${errorAssembly.message}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Voice analysis failed: ${error.message}` }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

