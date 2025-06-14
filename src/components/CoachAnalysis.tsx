
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Target, AlertTriangle, Users, TrendingUp } from 'lucide-react';
import { AnalysisResult } from '@/pages/Conversation';

interface CoachAnalysisProps {
  analysis: AnalysisResult;
}

export const CoachAnalysis: React.FC<CoachAnalysisProps> = ({ analysis }) => {
  // Use empathyAnalysis if available, fall back to otherPerspective for backward compatibility
  const mainAnalysis = analysis.empathyAnalysis || analysis.otherPerspective || '';
  
  return (
    <div className="space-y-6">
      {/* Main Empathy Analysis */}
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
              {mainAnalysis}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strategy Analysis */}
      {analysis.strategyAnalysis && (
        <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xl rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              Strategic Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-slate max-w-none">
              <div className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                {analysis.strategyAnalysis}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Devil's Advocate Analysis */}
      {analysis.devilsAdvocateAnalysis && (
        <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xl rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-red-100 to-pink-100 rounded-full">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              Devil's Advocate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-slate max-w-none">
              <div className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                {analysis.devilsAdvocateAnalysis}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Wisdom of the Crowd */}
      {analysis.wisdomOfCrowd && (
        <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 shadow-xl rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              Wisdom of the Crowd
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="text-slate-700 leading-relaxed">
                  {analysis.wisdomOfCrowd.text}
                </p>
                <div className="mt-3 flex items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>Seen {analysis.wisdomOfCrowd.count} times</span>
                  </div>
                  <div>
                    <span>Out of {analysis.wisdomOfCrowd.totalAnalyzed} total conflicts</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {analysis.wisdomOfCrowd.percentage}%
                </div>
                <div className="text-xs text-slate-500">frequency</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
