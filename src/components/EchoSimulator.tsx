
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConflictInput } from './ConflictInput';
import { analyzeConflict } from '../utils/empathyAnalyzer';
import { StartNewConversationFab } from './StartNewConversationFab'; // Import the floating FAB

export interface AnalysisResult {
  otherPerspective: string;
  emotionalBridge: string;
  translator: Array<{
    dontSay: string;
    insteadTry: string;
  }>;
  detectedLanguage: string;
}

export const EchoSimulator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0); // Used to force-reset child state
  const navigate = useNavigate();

  const handleAnalyze = async (conflictText: string) => {
    console.log("Text Conflict Description Received!");
    console.log("Text length:", conflictText.length);

    setError(null);
    setIsLoading(true);

    try {
      const result = await analyzeConflict(conflictText, false);
      navigate('/result', { state: { analysis: result } });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error("A critical error occurred:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceAnalyze = async (audioData: string) => {
    console.log("Voice Conflict Data Received!");
    console.log("Audio data length:", audioData.length);

    setError(null);
    setIsLoading(true);

    try {
      const { analyzeVoiceConflict } = await import('../utils/empathyAnalyzer');
      const result = await analyzeVoiceConflict(audioData);
      navigate('/result', { state: { analysis: result } });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error("Voice analysis error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartNewConversation = () => {
    // Confirmation via custom dialog or use the FAB's onStartNew
    if (window.confirm('Are you sure? This will clear the current analysis.')) {
      setError(null);
      setIsLoading(false);
      setResetKey(prev => prev + 1); // This re-mounts child components (like ConflictInput)
    }
  };

  // Always show the new conversation FAB
  return (
    <div className="space-y-8 relative">
      <StartNewConversationFab
        onStartNew={handleStartNewConversation}
        isVisible={true}
      />
      <ConflictInput
        key={resetKey}
        onAnalyze={handleAnalyze}
        onVoiceAnalyze={handleVoiceAnalyze}
        isAnalyzing={isLoading}
      />
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p style={{ color: 'red' }} className="text-sm">
            <strong>Error:</strong> {error}
          </p>
        </div>
      )}
    </div>
  );
};
