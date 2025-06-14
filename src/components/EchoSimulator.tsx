
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
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async (conflictDescription: string) => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeConflict(conflictDescription);
      navigate('/result', { state: { analysis: result } });
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      <ConflictInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
    </div>
  );
};
