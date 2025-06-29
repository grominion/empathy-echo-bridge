
import { supabase } from "@/integrations/supabase/client";
import { AnalysisResult } from "@/pages/Conversation";

export async function callDynamicLLM(conflictDescription: string): Promise<AnalysisResult> {
  console.log("Calling dynamic LLM edge function...");
  
  try {
    const { data, error } = await supabase.functions.invoke('dynamic-llm-call', {
      body: { conflictDescription }
    });

    if (error) {
      console.error("Supabase function error:", error);
      throw new Error(`Function call failed: ${error.message}`);
    }

    if (!data) {
      throw new Error("No data returned from dynamic LLM function");
    }

    if (data.error) {
      console.error("Backend error:", data.error);
      throw new Error(data.error);
    }

    console.log("Dynamic LLM analysis completed successfully");
    console.log("Used LLM:", data.llm_used, "Provider:", data.provider);
    
    return {
      empathyAnalysis: data.analysis,
      detectedLanguage: 'fr'
    };

  } catch (error) {
    console.error("Error in callDynamicLLM:", error);
    throw error;
  }
}

export async function saveConversationHistory(
  conflictDescription: string, 
  analysisResult: AnalysisResult,
  llmConfigId?: string
) {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      console.log("No authenticated user, skipping history save");
      return;
    }

    const title = conflictDescription.substring(0, 50) + (conflictDescription.length > 50 ? '...' : '');

    // Convert AnalysisResult to a JSON-serializable format
    const analysisJson = JSON.parse(JSON.stringify({
      empathyAnalysis: analysisResult.empathyAnalysis || null,
      strategyAnalysis: analysisResult.strategyAnalysis || null,
      devilsAdvocateAnalysis: analysisResult.devilsAdvocateAnalysis || null,
      wisdomOfCrowd: analysisResult.wisdomOfCrowd || null,
      voiceMetadata: analysisResult.voiceMetadata || null,
      otherPerspective: analysisResult.otherPerspective || null,
      emotionalBridge: analysisResult.emotionalBridge || null,
      translator: analysisResult.translator || null,
      detectedLanguage: analysisResult.detectedLanguage || 'en'
    }));

    const { error } = await supabase
      .from('conversation_history')
      .insert({
        user_id: user.user.id,
        title,
        conflict_description: conflictDescription,
        analysis_result: analysisJson,
        llm_config_used: llmConfigId,
        is_favorite: false
      });

    if (error) {
      console.error("Error saving conversation history:", error);
    } else {
      console.log("Conversation saved to history successfully");
    }
  } catch (error) {
    console.error("Error in saveConversationHistory:", error);
  }
}
