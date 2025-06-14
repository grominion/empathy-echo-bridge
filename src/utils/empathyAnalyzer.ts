
import { AnalysisResult } from '../components/EchoSimulator';

export const analyzeConflict = async (conflictDescription: string): Promise<AnalysisResult> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
  
  // Build the diagnostic AI prompt with user input
  const prompt = `You are a diagnostic tool. Your only purpose is to report information.

Follow these two instructions precisely:

1.  **IDENTIFY YOURSELF:** Start your response with the phrase "AI Model Identity:" and then state the name of the AI model you are (e.g., Claude 3, GPT-4, etc.).
2.  **REPORT THE INPUT:** On a new line, start with the phrase "User Input Received:" and then repeat the EXACT, verbatim text you received as the user input for this request. If you received nothing, write "NULL".

[USER_INPUT]
${conflictDescription}`;

  console.log('Diagnostic AI prompt with user input:', prompt);
  console.log('User input being analyzed:', conflictDescription);
  
  // For diagnostic purposes, simulate the AI response with the expected format
  const diagnosticResponse = `AI Model Identity: Simulated AI Model (Test Environment)

User Input Received: ${conflictDescription || 'NULL'}`;
  
  console.log('Diagnostic response:', diagnosticResponse);
  
  const analysis: AnalysisResult = {
    detectedLanguage: 'English',
    otherPerspective: diagnosticResponse,
    emotionalBridge: '',
    translator: []
  };
  
  console.log('Analysis result:', analysis);
  
  return analysis;
};
