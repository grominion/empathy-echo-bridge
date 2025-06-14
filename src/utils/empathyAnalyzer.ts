
import { AnalysisResult } from '../components/EchoSimulator';

// Simple AI simulation that repeats the input text
export const analyzeConflict = async (conflictDescription: string): Promise<AnalysisResult> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
  
  // Simple prompt: "Repeat this text: [USER_INPUT]"
  const aiOutput = `Repeat this text: ${conflictDescription}`;
  
  // For now, we'll structure this as a simple response
  // This maintains compatibility with the existing AnalysisResult interface
  const analysis: AnalysisResult = {
    detectedLanguage: 'English',
    otherPerspective: aiOutput,
    emotionalBridge: '',
    translator: []
  };
  
  return analysis;
};
