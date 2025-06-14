
import { supabase } from "@/integrations/supabase/client";
import { ConversationTurn, AnalysisResult } from "@/pages/Conversation";

export async function analyzeConflict(conflictDescription: string): Promise<AnalysisResult> {
  console.log("Calling analyze-conflict edge function...");
  
  try {
    const { data, error } = await supabase.functions.invoke('analyze-conflict', {
      body: { conflictDescription }
    });

    if (error) {
      console.error("Supabase function error:", error);
      throw new Error(`Function call failed: ${error.message}`);
    }

    if (!data) {
      throw new Error("No data returned from analysis function");
    }

    // Check if the response contains an error
    if (data.error) {
      console.error("Backend error:", data.error);
      throw new Error(data.error);
    }

    // Extract the three analyses from the response
    const { claudeAnalysis, googleAnalysis, openaiAnalysis, wisdomOfCrowd } = data;
    
    if (!claudeAnalysis && !googleAnalysis && !openaiAnalysis) {
      throw new Error("No analysis data returned from any API");
    }

    console.log("Multi-AI analysis completed successfully");
    
    // Return the analysis result with all three analyses and wisdom of crowd
    const result: AnalysisResult = {
      empathyAnalysis: claudeAnalysis,
      strategyAnalysis: googleAnalysis, 
      devilsAdvocateAnalysis: openaiAnalysis,
      detectedLanguage: 'en' // Default to English for now
    };

    // Add wisdom of crowd data if available
    if (wisdomOfCrowd) {
      result.wisdomOfCrowd = wisdomOfCrowd;
    }

    return result;

  } catch (error) {
    console.error("Error in analyzeConflict:", error);
    throw error;
  }
}

export async function continueCoaching(conversationHistory: ConversationTurn[]): Promise<AnalysisResult> {
  // For now, just use the same analysis function
  // This could be enhanced to provide more context-aware responses
  const lastUserMessage = conversationHistory
    .filter(turn => turn.type === 'initial_problem' || turn.type === 'their_reply')
    .pop();
  
  if (!lastUserMessage) {
    throw new Error("No user message found to continue coaching");
  }
  
  return analyzeConflict(lastUserMessage.content);
}
