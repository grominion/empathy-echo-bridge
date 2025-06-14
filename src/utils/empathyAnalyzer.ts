
import { AnalysisResult } from '../components/EchoSimulator';
import { supabase } from './supabase';

export const analyzeConflict = async (conflictDescription: string): Promise<AnalysisResult> => {
  console.log('Making secure API call via Supabase Edge Function:', conflictDescription);
  
  try {
    const { data, error } = await supabase.functions.invoke('analyze-conflict', {
      body: {
        conflictDescription: conflictDescription
      }
    });

    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(`Analysis failed: ${error.message}`);
    }

    if (!data) {
      throw new Error('No data received from analysis function');
    }

    console.log('Analysis result received:', data);
    return data as AnalysisResult;
    
  } catch (error) {
    console.error('Analysis call failed:', error);
    throw new Error(`Failed to analyze conflict: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
