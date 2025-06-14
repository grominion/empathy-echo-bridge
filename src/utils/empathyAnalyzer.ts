
import { AnalysisResult } from '../components/EchoSimulator';

export const analyzeConflict = async (conflictDescription: string): Promise<AnalysisResult> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
  
  // Hardcoded showcase - completely ignore user input
  const prompt = `You are an actor. Your only role is to output the following script exactly as it is written below. Do not change a single word.

### The Other Perspective

I've spent years in a job that pays the bills but starves my soul. Every day, I feel like a ghost in my own life. This dream of being an artist isn't about being reckless; it's about trying to feel alive again before it's too late. It's the most terrifying thing I've ever considered, and I feel incredibly alone in it. When my best friend, the person I count on the most, looks at me with fear instead of belief, it doesn't feel like concern. It feels like a confirmation of my deepest fear: that I'm not good enough and I'm going to fail. I don't need someone to point out the risks; I live with them every second. I need someone to hold my hand and say they'll be there even if I fall.

### The Emotional Bridge

The non-obvious connection isn't about risk or stability. It's about the **fear of a wasted life**. You fear she will waste her professional future, and she fears she is currently wasting her one and only life. Both of you are acting out of a desperate desire to prevent a future filled with regret.

### The Translator for your next discussion

**Don't say:** "But what about the money? It's too risky."
**Instead, try:** "It sounds like staying in your current job feels like a bigger risk to you than leaving it. Can you tell me more about what you hope to feel by making this change?"`;

  console.log('Hardcoded showcase prompt:', prompt);
  console.log('User input ignored for showcase:', conflictDescription);
  
  // Return the hardcoded showcase response
  const showcaseResponse = `### The Other Perspective

I've spent years in a job that pays the bills but starves my soul. Every day, I feel like a ghost in my own life. This dream of being an artist isn't about being reckless; it's about trying to feel alive again before it's too late. It's the most terrifying thing I've ever considered, and I feel incredibly alone in it. When my best friend, the person I count on the most, looks at me with fear instead of belief, it doesn't feel like concern. It feels like a confirmation of my deepest fear: that I'm not good enough and I'm going to fail. I don't need someone to point out the risks; I live with them every second. I need someone to hold my hand and say they'll be there even if I fall.

### The Emotional Bridge

The non-obvious connection isn't about risk or stability. It's about the **fear of a wasted life**. You fear she will waste her professional future, and she fears she is currently wasting her one and only life. Both of you are acting out of a desperate desire to prevent a future filled with regret.

### The Translator for your next discussion

**Don't say:** "But what about the money? It's too risky."
**Instead, try:** "It sounds like staying in your current job feels like a bigger risk to you than leaving it. Can you tell me more about what you hope to feel by making this change?"`;
  
  const analysis: AnalysisResult = {
    detectedLanguage: 'English',
    otherPerspective: showcaseResponse,
    emotionalBridge: '',
    translator: []
  };
  
  console.log('Hardcoded showcase response:', analysis);
  
  return analysis;
};
