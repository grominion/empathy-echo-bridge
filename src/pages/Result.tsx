
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { EmpathyAnalysis } from '../components/EmpathyAnalysis';
import { ArrowLeft } from 'lucide-react';
import { AnalysisResult } from '../components/EchoSimulator';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const analysis = location.state?.analysis as AnalysisResult;
  const conflictDescription = location.state?.conflictDescription as string;

  const handleBack = () => {
    navigate('/');
  };

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">No Analysis Found</h1>
            <p className="text-slate-600 mb-6">Please return to the home page to start a new analysis.</p>
            <Button onClick={handleBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button 
              onClick={handleBack} 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
          
          <EmpathyAnalysis 
            analysis={analysis} 
            conflictDescription={conflictDescription || 'Previous conflict'} 
            onReset={handleBack} 
          />
        </div>
      </div>
    </div>
  );
};

export default Result;
