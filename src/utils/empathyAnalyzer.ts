
import { AnalysisResult } from '../components/EchoSimulator';

const ANTHROPIC_API_KEY = "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";

export const analyzeConflict = async (conflictDescription: string): Promise<AnalysisResult> => {
  console.log('Making API call to Anthropic with user input:', conflictDescription);
  
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
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
(Your first-person analysis goes here)

### The Emotional Bridge
(Your analysis of the shared emotion goes here)

### The Translator for your next discussion
(Your "Don't say / Instead, try" advice goes here)`
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('API response received:', data);
    
    const aiResponse = data.content[0].text;
    
    const analysis: AnalysisResult = {
      detectedLanguage: 'English',
      otherPerspective: aiResponse,
      emotionalBridge: '',
      translator: []
    };
    
    console.log('Analysis result:', analysis);
    
    return analysis;
  } catch (error) {
    console.error('API call failed:', error);
    throw new Error(`Failed to analyze conflict: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
