import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Heart, Link, MessageSquare, RotateCcw, User, ArrowRight } from 'lucide-react';
import { AnalysisResult } from './EchoSimulator';

interface EmpathyAnalysisProps {
  analysis: AnalysisResult;
  onReset: () => void;
}

export const EmpathyAnalysis: React.FC<EmpathyAnalysisProps> = ({ analysis, onReset }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full">
            <Heart className="w-6 h-6 text-green-700" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Empathy Analysis Complete</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                Language: {analysis.detectedLanguage}
              </Badge>
            </div>
          </div>
        </div>
        
        <Button
          onClick={onReset}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          New Analysis
        </Button>
      </div>

      <div className="grid gap-6">
        {/* The Other Perspective */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl text-slate-800">
              <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg">
                <User className="w-5 h-5 text-blue-700" />
              </div>
              The Other Perspective
            </CardTitle>
            <p className="text-sm text-slate-600">
              Understanding their viewpoint, values, and underlying motivations
            </p>
          </CardHeader>
          <CardContent>
            <div className="prose prose-slate max-w-none">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-400">
                <p className="text-slate-700 leading-relaxed italic whitespace-pre-line">
                  "{analysis.otherPerspective}"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* The Emotional Bridge */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl text-slate-800">
              <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
                <Link className="w-5 h-5 text-purple-700" />
              </div>
              The Emotional Bridge
            </CardTitle>
            <p className="text-sm text-slate-600">
              The shared human need that connects both perspectives
            </p>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-l-4 border-purple-400">
              <p className="text-slate-700 leading-relaxed font-medium">
                {analysis.emotionalBridge}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* The Translator */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl text-slate-800">
              <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg">
                <MessageSquare className="w-5 h-5 text-green-700" />
              </div>
              The Translator for Your Next Discussion
            </CardTitle>
            <p className="text-sm text-slate-600">
              Strategic communication approaches to bridge understanding
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysis.translator.map((item, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className="grid md:grid-cols-2">
                    <div className="bg-red-50 p-4 border-r">
                      <div className="flex items-start gap-2">
                        <Badge variant="destructive" className="text-xs shrink-0 mt-0.5">
                          DON'T SAY
                        </Badge>
                        <p className="text-sm text-red-800 leading-relaxed">
                          {item.dontSay}
                        </p>
                      </div>
                    </div>
                    <div className="bg-green-50 p-4">
                      <div className="flex items-start gap-2">
                        <Badge className="bg-green-600 text-xs shrink-0 mt-0.5">
                          INSTEAD, TRY
                        </Badge>
                        <p className="text-sm text-green-800 leading-relaxed font-medium">
                          {item.insteadTry}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-slate-100 rounded-lg p-6 text-center">
        <p className="text-slate-600 text-sm">
          Remember: The goal is not to win an argument, but to create understanding and find common ground.
        </p>
      </div>
    </div>
  );
};
