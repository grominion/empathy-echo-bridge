import { supabase } from "@/integrations/supabase/client";

export async function getAlternativeLLMAnalyses(conflictDescription: string): Promise<Record<string, any>> {
  console.log("Calling multi-llm-analysis edge function...");
  
  try {
    const { data, error } = await supabase.functions.invoke('multi-llm-analysis', {
      body: { 
        conflictDescription,
        providers: ['anthropic', 'google', 'xai', 'mistral']
      }
    });

    if (error) {
      console.error("Supabase function error:", error);
      throw new Error(`Function call failed: ${error.message}`);
    }

    if (!data) {
      throw new Error("No data returned from multi-LLM function");
    }

    if (data.error) {
      console.error("Backend error:", data.error);
      throw new Error(data.error);
    }

    console.log("Multi-LLM analysis completed successfully");
    console.log("Providers used:", data.providers_used);
    
    return data.analyses;

  } catch (error) {
    console.error("Error in getAlternativeLLMAnalyses:", error);
    throw error;
  }
}