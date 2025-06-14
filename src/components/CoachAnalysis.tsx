
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
    <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xl rounded-2xl rounded-tl-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full">
            <MessageSquare className="w-5 h-5 text-blue-600" />
          </div>
          ECHO Coach Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-slate max-w-none">
          <div className="text-slate-700 whitespace-pre-wrap leading-relaxed">
            {analysis.otherPerspective}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
