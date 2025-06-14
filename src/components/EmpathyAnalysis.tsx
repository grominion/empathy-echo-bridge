
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, Heart, Link, MessageSquare } from 'lucide-react';
import { AnalysisResult } from './EchoSimulator';

interface EmpathyAnalysisProps {
  analysis: AnalysisResult;
  onReset: () => void;
}

export const EmpathyAnalysis: React.FC<EmpathyAnalysisProps> = ({ analysis, onReset }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl mb-4 shadow-lg">
          <span className="text-2xl font-bold text-white">E</span>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent mb-2">
          ECHO Response
        </h1>
        <p className="text-slate-600">AI Analysis Complete</p>
      </div>

      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl text-slate-800 flex items-center justify-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            AI Output
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-50 rounded-lg p-6 mb-6">
            <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap">
              {analysis.otherPerspective}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button
          onClick={onReset}
          variant="outline"
          className="flex items-center gap-2 mx-auto"
        >
          <RotateCcw className="w-4 h-4" />
          Try Another Analysis
        </Button>
      </div>
    </div>
  );
};
