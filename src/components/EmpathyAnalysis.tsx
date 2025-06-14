
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, Heart, Users, MessageSquare } from 'lucide-react';
import { AnalysisResult } from './EchoSimulator';

interface EmpathyAnalysisProps {
  analysis: AnalysisResult;
  onReset: () => void;
}

export const EmpathyAnalysis: React.FC<EmpathyAnalysisProps> = ({ analysis, onReset }) => {
  // Parse the AI output to extract the three sections using the exact Markdown headings
  const parseAnalysis = (text: string) => {
    const sections = {
      otherPerspective: '',
      emotionalBridge: '',
      translator: ''
    };

    // Use the exact Markdown headings from the prompt
    const otherPerspectiveMatch = text.match(/### The Other Perspective\s*([\s\S]*?)(?=### The Emotional Bridge|$)/);
    const emotionalBridgeMatch = text.match(/### The Emotional Bridge\s*([\s\S]*?)(?=### The Translator for your next discussion|$)/);
    const translatorMatch = text.match(/### The Translator for your next discussion\s*([\s\S]*?)$/);

    if (otherPerspectiveMatch) {
      sections.otherPerspective = otherPerspectiveMatch[1].trim();
    }
    if (emotionalBridgeMatch) {
      sections.emotionalBridge = emotionalBridgeMatch[1].trim();
    }
    if (translatorMatch) {
      sections.translator = translatorMatch[1].trim();
    }

    console.log('Parsed sections:', sections);

    return sections;
  };

  const sections = parseAnalysis(analysis.otherPerspective);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl mb-4 shadow-lg">
          <span className="text-2xl font-bold text-white">E</span>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent mb-2">
          ECHO Analysis Complete
        </h1>
        <p className="text-slate-600">AI Empathy Analysis</p>
      </div>

      <div className="space-y-6">
        {/* The Other Perspective */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-slate-800 flex items-center justify-center gap-2">
              <Users className="w-6 h-6 text-blue-600" />
              The Other Perspective
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 rounded-lg p-6">
              <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap">
                {sections.otherPerspective}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* The Emotional Bridge */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-slate-800 flex items-center justify-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              The Emotional Bridge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-red-50 rounded-lg p-6">
              <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap">
                {sections.emotionalBridge}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* The Translator for your next discussion */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-slate-800 flex items-center justify-center gap-2">
              <MessageSquare className="w-6 h-6 text-green-600" />
              The Translator for your next discussion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 rounded-lg p-6">
              <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap">
                {sections.translator}
              </p>
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
          Try Another Analysis
        </Button>
      </div>
    </div>
  );
};
