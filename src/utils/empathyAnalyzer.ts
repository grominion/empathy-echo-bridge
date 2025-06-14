
import { AnalysisResult } from '../components/EchoSimulator';

export const analyzeConflict = async (conflictDescription: string): Promise<AnalysisResult> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
  
  // New ULTIMATE PROMPT structure with USER_QUERY first
  const prompt = `### USER_QUERY
${conflictDescription}
---
### SYSTEM_INSTRUCTIONS
You are ECHO, an AI Empathy Simulator. Your task is to analyze the USER_QUERY above.

1.  **LANGUAGE:** First, detect the language of the USER_QUERY. Your entire response MUST be in that same language. This is the top priority.
2.  **ANALYSIS:** Analyze the query to understand the conflict.
3.  **RESPONSE STRUCTURE:** You MUST format your response using these exact Markdown headings: \`### The Other Perspective\`, \`### The Emotional Bridge\`, \`### The Translator for your next discussion\`.
4.  **CONTENT - The Other Perspective:** Write a first-person ("I") narrative from the other person's point of view. It must be empathetic and insightful.
5.  **CONTENT - The Emotional Bridge:** Identify the non-obvious shared human value or fear.
6.  **CONTENT - The Translator:** Give a concrete "Don't say / Instead, try" suggestion.`;

  console.log('AI Prompt being sent:', prompt);
  console.log('User input mapped to [USER_INPUT]:', conflictDescription);
  
  // Simulate Claude 3 Opus response with the required structure
  const aiOutput = `### The Other Perspective
I feel like my experience and knowledge aren't being respected when ideas are dismissed quickly. I've worked hard to build expertise, and when I see gaps in thinking or potential issues, I feel compelled to speak up immediately. I worry that if I don't intervene, we might miss important considerations or make costly mistakes. Sometimes I interrupt because I'm excited about the solution I can see, and I want to help the team avoid pitfalls I've encountered before.

### The Emotional Bridge
Both sides share a deep commitment to doing quality work and contributing meaningfully to the team's success. You both care about being heard and having your expertise valued.

### The Translator for your next discussion
**Don't say:** "You always interrupt me and dismiss my ideas"
**Instead, try:** "I'd love to build on what you just shared. Could I finish my thought first, and then get your perspective on how we might address the challenges you're seeing?"

**Don't say:** "You're not experienced enough to understand this"
**Instead, try:** "I've encountered something similar before. Would it help if I shared what I learned, and then we could explore how that applies to your approach?"`;
  
  const analysis: AnalysisResult = {
    detectedLanguage: 'English',
    otherPerspective: aiOutput,
    emotionalBridge: '',
    translator: []
  };
  
  console.log('AI Response generated:', analysis);
  
  return analysis;
};
