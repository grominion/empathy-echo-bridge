
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeConflict } from '../utils/empathyAnalyzer';
import { useToast } from '@/hooks/use-toast';
import { AnalysisResult } from '../components/EchoSimulator';

export const useAnalysisHandler = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastAnalysis, setLastAnalysis] = useState<{
    result: AnalysisResult;
    description: string;
    title: string;
  } | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAnalyze = async (conflictText: string) => {
    console.log("Starting conflict analysis...");
    console.log("Text length:", conflictText.length);

    if (!conflictText.trim()) {
      toast({
        title: "Error",
        description: "Please describe your conflict before analyzing.",
        variant: "destructive"
      });
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const result = await analyzeConflict(conflictText, false);
      
      console.log("Analysis completed:", result);
      
      // Save for sharing
      setLastAnalysis({
        result,
        description: conflictText,
        title: conflictText.substring(0, 50) + (conflictText.length > 50 ? '...' : '')
      });
      
      navigate('/result', { state: { analysis: result, conflictDescription: conflictText } });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An error occurred during analysis';
      setError(errorMessage);
      console.error("Analysis error:", e);
      
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceAnalyze = async (audioData: string) => {
    console.log("Starting voice analysis...");
    console.log("Audio data length:", audioData.length);

    setError(null);
    setIsLoading(true);

    try {
      const { analyzeVoiceConflict } = await import('../utils/empathyAnalyzer');
      const result = await analyzeVoiceConflict(audioData);
      
      console.log("Voice analysis completed:", result);
      
      // Save for sharing
      setLastAnalysis({
        result,
        description: 'Voice analysis',
        title: 'Voice Conflict Analysis'
      });
      
      navigate('/result', { state: { analysis: result, conflictDescription: 'Voice analysis' } });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Voice analysis failed';
      setError(errorMessage);
      console.error("Voice analysis error:", e);
      
      toast({
        title: "Voice Analysis Failed", 
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetAnalysis = () => {
    setError(null);
    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    lastAnalysis,
    handleAnalyze,
    handleVoiceAnalyze,
    resetAnalysis
  };
};
