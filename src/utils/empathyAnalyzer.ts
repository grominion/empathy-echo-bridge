
import { AnalysisResult } from '../components/EchoSimulator';

export const analyzeConflict = async (conflictDescription: string): Promise<AnalysisResult> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
  
  // Build the dynamic AI prompt with user input
  const prompt = `You are an expert psychologist. Your single task is to analyze the text inside the "USER TEXT" block below and provide a structured, three-part analysis. Your entire response must be in the exact same language as the user's text.

--- USER TEXT BEGINS ---
${conflictDescription}
--- USER TEXT ENDS ---

Now, provide your analysis using these exact three Markdown headings and nothing else:

### The Other Perspective
(Your first-person analysis goes here)

### The Emotional Bridge
(Your analysis of the shared emotion goes here)

### The Translator for your next discussion
(Your "Don't say / Instead, try" advice goes here)`;

  console.log('Dynamic AI prompt with user input:', prompt);
  console.log('User input being analyzed:', conflictDescription);
  
  // For now, simulate AI response based on the user's actual input
  // In a real implementation, this would call an actual AI API
  const simulatedResponse = generateSimulatedResponse(conflictDescription);
  
  const analysis: AnalysisResult = {
    detectedLanguage: 'English',
    otherPerspective: simulatedResponse,
    emotionalBridge: '',
    translator: []
  };
  
  console.log('Dynamic analysis response:', analysis);
  
  return analysis;
};

// Simulate AI analysis based on user input
const generateSimulatedResponse = (userInput: string): string => {
  // Simple keyword-based response generation for demonstration
  const keywords = userInput.toLowerCase();
  
  if (keywords.includes('work') || keywords.includes('job') || keywords.includes('career')) {
    return `### The Other Perspective

I feel trapped in a situation where my professional identity and personal fulfillment seem to be at odds. Every day I go to work, I'm reminded of the gap between where I thought I'd be and where I actually am. When someone questions my choices or suggests alternatives, it feels like they're questioning my entire sense of self-worth and capability. I'm not just defending a decision; I'm defending my right to feel valued and competent in my own life.

### The Emotional Bridge

The shared emotion here is **the fear of not being enough** - both sides are grappling with questions of worth, capability, and the desire to feel valued and successful in their own definitions of those terms.

### The Translator for your next discussion

**Don't say:** "Have you considered other options?"
**Instead, try:** "It sounds like this situation is really important to your sense of identity. What would feeling successful look like to you?"`;
  }
  
  if (keywords.includes('relationship') || keywords.includes('family') || keywords.includes('friend')) {
    return `### The Other Perspective

I feel misunderstood and judged by someone whose opinion matters deeply to me. When they react negatively to my choices or feelings, it's not just disagreement - it feels like rejection of who I am as a person. I need them to see that my actions come from a place of genuine need or care, not from a desire to hurt or disappoint them. Their disapproval cuts deeper because I value our connection so much.

### The Emotional Bridge

The shared emotion is **the deep need for connection and understanding** - both people desperately want to maintain their relationship while also feeling heard and validated in their individual experiences.

### The Translator for your next discussion

**Don't say:** "You're being too sensitive about this."
**Instead, try:** "I can see this really matters to you. Help me understand what you're feeling right now."`;
  }
  
  // Default response for general conflicts
  return `### The Other Perspective

I'm experiencing this situation from a completely different emotional starting point than it might appear. What looks like stubbornness or poor judgment from the outside actually comes from a place of deep vulnerability and need. I'm not trying to be difficult - I'm trying to protect something that feels essential to who I am or what I need to survive emotionally. When others don't see this, I feel profoundly alone and misunderstood.

### The Emotional Bridge

The core shared emotion is **the human need for safety and understanding** - both sides want to feel secure and validated, even though they're expressing this need in ways that seem to conflict with each other.

### The Translator for your next discussion

**Don't say:** "You need to be more reasonable about this."
**Instead, try:** "I want to understand what's driving this for you. What would help you feel more secure in this situation?"`;
};
