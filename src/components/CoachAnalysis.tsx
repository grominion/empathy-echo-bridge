
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

interface CoachAnalysisProps {
  analysis: {
    otherPerspective: string;
  };
}

export const CoachAnalysis: React.FC<CoachAnalysisProps> = ({ analysis }) => {
  return (
    <Card className="bg-blue-50/80 backdrop-blur-sm border border-blue-200 shadow-xl">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl text-blue-800 flex items-center justify-center gap-2">
          <MessageSquare className="w-6 h-6 text-blue-600" />
          ECHO Coach Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-white/60 rounded-lg p-6">
          <div className="prose prose-slate max-w-none">
            <div className="text-slate-700 whitespace-pre-wrap leading-relaxed">
              {analysis.otherPerspective}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
