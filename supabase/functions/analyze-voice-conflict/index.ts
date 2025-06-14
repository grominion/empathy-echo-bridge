import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { audioData } = await req.json();
    
    if (!audioData) {
      throw new Error('No audio data provided');
    }

    console.log('Processing voice conflict analysis...');

    // Step 1: Convert audio data and send to AssemblyAI
    const assemblyApiKey = Deno.env.get('ASSEMBLYAI_API_KEY');
    if (!assemblyApiKey) {
      throw new Error('AssemblyAI API key not configured');
    }

    // Convert base64 audio to blob
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

    const uploadResult = await uploadResponse.json();
    const audioUrl = uploadResult.upload_url;

    // Request transcription with sentiment analysis
    const transcriptResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
      method: 'POST',
      headers: {
        'Authorization': assemblyApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        audio_url: audioUrl,
        sentiment_analysis: true,
        emotion_detection: true,
      }),
    });

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
    const sentimentData = {
      sentiment: transcript.sentiment_analysis_results?.[0]?.sentiment || 'neutral',
      confidence: transcript.sentiment_analysis_results?.[0]?.confidence || 0,
      emotions: transcript.emotion_detection_results || []
    };

    console.log('Transcription completed:', transcribedText);
    console.log('Sentiment data:', sentimentData);

    // Retrieve API keys for external models
    const claudeApiKey = Deno.env.get('ANTHROPIC_API_KEY');
    const googleApiKey = Deno.env.get('GOOGLE_API_KEY');
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');

    // Prepare prompts as before
    const claudePrompt = `You are an expert psychologist and empathy coach. Analyze the following conflict situation.

CRITICAL CONTEXT: The user's voice was analyzed and detected with the following emotional profile:
- Overall Sentiment: ${sentimentData.sentiment} (confidence: ${sentimentData.confidence})
- Detected Emotions: ${sentimentData.emotions.map(e => `${e.emotion} (${e.confidence})`).join(', ') || 'None detected'}

Use this emotional context to inform your analysis and provide more nuanced, emotionally-aware guidance.

The user said:
--- USER TEXT BEGINS ---
${transcribedText}
--- USER TEXT ENDS ---

Your task is to deeply understand the other person's perspective in this conflict. Think like a master negotiator and psychologist. Provide:

1. **The Other Person's Perspective**: What might the other person be thinking, feeling, or experiencing? What are their underlying needs, fears, or motivations?

2. **Emotional Bridge**: Given the user's detected emotional state, what specific emotional connection points could help bridge the gap between them and the other person?

3. **Communication Strategy**: Practical advice on how to approach this conversation, taking into account both the conflict content and the user's emotional state.

Write your response in a warm, understanding tone. Be specific and actionable.`;

    // Sequential API calls instead of parallel

    let claudeAnalysis = null;
    let googleAnalysis = null;
    let openaiAnalysis = null;

    // 1. Claude (Anthropic)
    if (claudeApiKey) {
      try {
        const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': claudeApiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-haiku-20240307',
            max_tokens: 1000,
            messages: [
              {
                role: 'user',
                content: claudePrompt
              }
            ]
          })
        });
        const claudeData = await claudeRes.json();
        claudeAnalysis = claudeData.content && claudeData.content[0] ? claudeData.content[0].text : null;
      } catch (err) {
        console.error('Claude API call failed:', err);
      }
    }

    // 2. Google (Gemini)
    if (googleApiKey) {
      try {
        const googleRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${googleApiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are a strategic communication expert. Analyze this conflict and provide tactical advice on how to navigate it successfully.

The user's situation: ${transcribedText}

Focus on:
1. Strategic positioning in the conversation
2. Tactical communication moves
3. How to achieve the user's goals while maintaining relationships
4. Potential obstacles and how to overcome them

Be practical and strategic in your response.`
              }]
            }]
          })
        });
        const googleData = await googleRes.json();
        googleAnalysis = googleData.candidates && googleData.candidates[0]
          ? googleData.candidates[0].content.parts[0].text
          : null;
      } catch (err) {
        console.error('Google API call failed:', err);
      }
    }

    // 3. OpenAI (GPT-4)
    if (openaiApiKey) {
      try {
        const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openaiApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'user',
                content: `Your entire response MUST be a valid JSON array of objects, and nothing else. Do not include any introductory text or markdown formatting. The user is facing a conflict and needs to prepare for manipulative arguments. Your response must be in the same language as the user's text.

The user's conflict is: "${transcribedText}"

Generate an array of objects, where each object has these three keys: "attack_type", "example_quote", and "counter_strategy".

Example of the required JSON format:
[
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
]`
              }
            ]
          })
        });
        const openaiData = await openaiRes.json();
        try {
          openaiAnalysis = JSON.parse(openaiData.choices[0].message.content);
        } catch (e) {
          console.error('Failed to parse OpenAI JSON response:', e);
          openaiAnalysis = openaiData.choices && openaiData.choices[0] && openaiData.choices[0].message
            ? openaiData.choices[0].message.content
            : null;
        }
      } catch (err) {
        console.error('OpenAI API call failed:', err);
      }
    }

    // Get wisdom of crowd data
    let wisdomOfCrowd = null;
    try {
      const { data: bridgeData, error: bridgeError } = await supabase
        .rpc('get_total_bridge_count');
      
      if (!bridgeError && bridgeData) {
        wisdomOfCrowd = {
          text: "Based on thousands of conflicts analyzed, emotional validation and active listening are the most effective first steps.",
          count: bridgeData,
          totalAnalyzed: bridgeData + 1,
          percentage: Math.round((bridgeData / (bridgeData + 1)) * 100)
        };
      }
    } catch (error) {
      console.error('Error fetching wisdom of crowd:', error);
    }

    // Return the analysis results with voice-specific metadata
    const response = {
      empathyAnalysis: claudeAnalysis,
      strategyAnalysis: googleAnalysis,
      devilsAdvocateAnalysis: openaiAnalysis,
      wisdomOfCrowd,
      detectedLanguage: 'en',
      voiceMetadata: {
        transcribedText,
        sentimentData,
        processingSource: 'voice'
      }
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-voice-conflict function:', error);
    return new Response(
      JSON.stringify({ error: `Voice analysis failed: ${error.message}` }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
