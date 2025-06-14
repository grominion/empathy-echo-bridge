
import { AnalysisResult } from '../components/EchoSimulator';

export const analyzeConflict = async (conflictDescription: string): Promise<AnalysisResult> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
  
  // New three-part empathetic analysis prompt
  const prompt = `### TASK
Analyze the user's text below and generate a three-part empathetic analysis. Respond in the same language as the user's text.

### USER TEXT TO ANALYZE
${conflictDescription}

---

### The Other Perspective
(Write in the first person "I", from the other's point of view. Focus on their underlying emotions, fears, and values.)

### The Emotional Bridge
(Identify the single, specific core emotion or value that both sides share, even if they express it differently.)

### The Translator for your next discussion
(Provide a concrete "Don't say / Instead, try" format for de-escalation.)`;

  // For now, we'll simulate the AI response structure
  // In a real implementation, this would call the actual AI API
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
  
  return analysis;
};
