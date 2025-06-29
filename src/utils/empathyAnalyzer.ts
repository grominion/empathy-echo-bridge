import { supabase } from "@/integrations/supabase/client";
import { ConversationTurn, AnalysisResult } from "@/pages/Conversation";
import { callDynamicLLM, saveConversationHistory } from "./dynamicLLMAnalyzer";

export async function analyzeConflict(input: string, isAudio: boolean = false): Promise<AnalysisResult> {
  console.log("Starting conflict analysis with dynamic LLM...");
  
  try {
    // Utiliser le nouveau système LLM dynamique
    const result = await callDynamicLLM(input);
    
    // Sauvegarder dans l'historique
    await saveConversationHistory(input, result);
    
    return result;

  } catch (error) {
    console.error("Error in analyzeConflict:", error);
    // Fallback vers l'ancien système si le nouveau échoue
    return await analyzeConflictFallback(input, isAudio);
  }
}

// Garder l'ancien système comme fallback
async function analyzeConflictFallback(input: string, isAudio: boolean = false): Promise<AnalysisResult> {
  console.log("Using fallback analysis system...");
  
  try {
    const body = { conflictDescription: input };

    const { data, error } = await supabase.functions.invoke('analyze-conflict', {
      body
    });

    if (error) {
      console.error("Supabase function error:", error);
      throw new Error(`Function call failed: ${error.message}`);
    }

    if (!data) {
      throw new Error("No data returned from analysis function");
    }

    if (data.error) {
      console.error("Backend error:", data.error);
      throw new Error(data.error);
    }

    const { claudeAnalysis, googleAnalysis, openaiAnalysis, wisdomOfCrowd } = data;
    
    if (!claudeAnalysis && !googleAnalysis && !openaiAnalysis) {
      throw new Error("No analysis data returned from any API");
    }

    console.log("Fallback multi-AI analysis completed successfully");
    
    const result: AnalysisResult = {
      empathyAnalysis: claudeAnalysis,
      strategyAnalysis: googleAnalysis, 
      devilsAdvocateAnalysis: openaiAnalysis,
      detectedLanguage: 'en'
    };

    if (wisdomOfCrowd) {
      result.wisdomOfCrowd = wisdomOfCrowd;
    }

    return result;

  } catch (error) {
    console.error("Error in analyzeConflictFallback:", error);
    throw error;
  }
}

export async function analyzeVoiceConflict(audioData: string): Promise<AnalysisResult> {
  console.log("Calling analyze-voice-conflict edge function...");
  
  try {
    const body = { audioData };

    const { data, error } = await supabase.functions.invoke('analyze-voice-conflict', {
      body
    });

    if (error) {
      console.error("Supabase function error:", error);
      throw new Error(`Voice analysis failed: ${error.message}`);
    }

    if (!data) {
      throw new Error("No data returned from voice analysis function");
    }

    if (data.error) {
      console.error("Backend error:", data.error);
      throw new Error(data.error);
    }

    const { empathyAnalysis, strategyAnalysis, devilsAdvocateAnalysis, wisdomOfCrowd, voiceMetadata } = data;
    
    if (!empathyAnalysis && !strategyAnalysis && !devilsAdvocateAnalysis) {
      throw new Error("No analysis data returned from voice analysis");
    }

    console.log("Voice analysis completed successfully");
    console.log("Voice metadata:", voiceMetadata);
    
    const result: AnalysisResult = {
      empathyAnalysis,
      strategyAnalysis, 
      devilsAdvocateAnalysis,
      detectedLanguage: 'en',
      voiceMetadata
    };

    if (wisdomOfCrowd) {
      result.wisdomOfCrowd = wisdomOfCrowd;
    }

    return result;

  } catch (error) {
    console.error("Error in analyzeVoiceConflict:", error);
    throw error;
  }
}

export async function continueCoaching(conversationHistory: ConversationTurn[]): Promise<AnalysisResult> {
  const lastUserMessage = conversationHistory
    .filter(turn => turn.type === 'initial_problem' || turn.type === 'their_reply')
    .pop();
  
  if (!lastUserMessage) {
    throw new Error("No user message found to continue coaching");
  }
  
  return analyzeConflict(lastUserMessage.content, false);
}
