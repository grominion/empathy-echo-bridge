
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConflictInput } from './ConflictInput';
import { analyzeConflict } from '../utils/empathyAnalyzer';

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
  const navigate = useNavigate();

  const handleAnalyze = async (conflictText: string) => {
    console.log("Text Conflict Description Received!");
    console.log("Text length:", conflictText.length);
    
    setError(null);
    setIsLoading(true);
    
    try {
      const result = await analyzeConflict(conflictText, false); // Pass false for text input
      navigate('/result', { state: { analysis: result } });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error("A critical error occurred:", e);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("EchoSimulator Component Rendered");

  return (
    <div className="space-y-8">
      <ConflictInput onAnalyze={handleAnalyze} isAnalyzing={isLoading} />
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p style={{color: 'red'}} className="text-sm">
            <strong>Error:</strong> {error}
          </p>
        </div>
      )}
    </div>
  );
};
