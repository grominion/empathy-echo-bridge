
import React, { useState } from 'react';
import { ConflictInput } from './ConflictInput';
import { EmpathyAnalysis } from './EmpathyAnalysis';
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
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async (conflictDescription: string) => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeConflict(conflictDescription);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setAnalysis(null);
  };

  return (
    <div className="space-y-8">
      {!analysis ? (
        <ConflictInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
      ) : (
        <EmpathyAnalysis analysis={analysis} onReset={handleReset} />
      )}
    </div>
  );
};
