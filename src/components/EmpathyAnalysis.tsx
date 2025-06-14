
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, AlertTriangle } from 'lucide-react';
import { AnalysisResult } from './EchoSimulator';

interface EmpathyAnalysisProps {
  analysis: AnalysisResult;
  onReset: () => void;
}

export const EmpathyAnalysis: React.FC<EmpathyAnalysisProps> = ({ analysis, onReset }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-600 to-red-700 rounded-xl mb-4 shadow-lg">
          <AlertTriangle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-700 to-red-800 bg-clip-text text-transparent mb-2">
          Diagnostic Test Results
        </h1>
        <p className="text-slate-600">Testing Model Identity & Data Connection</p>
      </div>

      <div className="space-y-6">
        {/* Raw AI Response */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-slate-800 flex items-center justify-center gap-2">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              Raw AI Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-100 rounded-lg p-6 font-mono text-sm">
              <pre className="text-slate-700 whitespace-pre-wrap">
                {analysis.otherPerspective}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button
          onClick={onReset}
          variant="outline"
          className="flex items-center gap-2 mx-auto"
        >
          <RotateCcw className="w-4 h-4" />
          Run Another Test
        </Button>
      </div>
    </div>
  );
};
