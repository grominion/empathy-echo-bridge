
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RotateCcw, Heart, MessageSquare, Lightbulb, Brain, Shield, Zap } from 'lucide-react';
import { AnalysisResult } from './EchoSimulator';
import { getAlternativeLLMAnalyses } from '@/utils/multiLLMAnalyzer';

interface EmpathyAnalysisProps {
  analysis: AnalysisResult;
  conflictDescription: string;
  onReset: () => void;
}

export const EmpathyAnalysis: React.FC<EmpathyAnalysisProps> = ({ analysis, conflictDescription, onReset }) => {
  const [selectedTab, setSelectedTab] = useState('main');
  const [alternativeAnalyses, setAlternativeAnalyses] = useState<Record<string, any>>({});
  const [loadingAlternatives, setLoadingAlternatives] = useState(false);

  const fetchAlternativeAnalyses = async () => {
    if (Object.keys(alternativeAnalyses).length > 0) return;
    
    setLoadingAlternatives(true);
    try {
      const analyses = await getAlternativeLLMAnalyses(conflictDescription);
      setAlternativeAnalyses(analyses);
    } catch (error) {
      console.error('Failed to fetch alternative analyses:', error);
    } finally {
      setLoadingAlternatives(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl mb-4 shadow-lg">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent mb-2">
          ECHO Analysis Complete
        </h1>
        <p className="text-slate-600">Your empathy insights are ready</p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="main" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Principal
          </TabsTrigger>
          <TabsTrigger value="empathy" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Empathie
          </TabsTrigger>
          <TabsTrigger value="devils-advocate" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Avocat du Diable
          </TabsTrigger>
          <TabsTrigger value="grok" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Grok
          </TabsTrigger>
          <TabsTrigger value="mistral" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Mistral
          </TabsTrigger>
        </TabsList>

        <TabsContent value="main" className="mt-6">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl text-slate-800 flex items-center justify-center gap-2">
                <MessageSquare className="w-6 h-6 text-blue-600" />
                Analyse Stratégique (OpenAI)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 rounded-lg p-6">
                <div className="prose prose-slate max-w-none">
                  <div className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {analysis.empathyAnalysis || analysis.otherPerspective || 'No analysis available'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="empathy" className="mt-6">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl text-slate-800 flex items-center justify-center gap-2">
                <Heart className="w-6 h-6 text-red-500" />
                Analyse Empathique (Claude)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!alternativeAnalyses.anthropic ? (
                <div className="text-center py-8">
                  <Button onClick={fetchAlternativeAnalyses} disabled={loadingAlternatives}>
                    {loadingAlternatives ? 'Chargement...' : 'Voir l\'analyse empathique'}
                  </Button>
                </div>
              ) : (
                <div className="bg-red-50 rounded-lg p-6">
                  <div className="prose prose-slate max-w-none">
                    <div className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                      {alternativeAnalyses.anthropic.result || alternativeAnalyses.anthropic.error}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devils-advocate" className="mt-6">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl text-slate-800 flex items-center justify-center gap-2">
                <Shield className="w-6 h-6 text-orange-500" />
                Avocat du Diable (Gemini)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!alternativeAnalyses.google ? (
                <div className="text-center py-8">
                  <Button onClick={fetchAlternativeAnalyses} disabled={loadingAlternatives}>
                    {loadingAlternatives ? 'Chargement...' : 'Voir l\'avocat du diable'}
                  </Button>
                </div>
              ) : (
                <div className="bg-orange-50 rounded-lg p-6">
                  <div className="prose prose-slate max-w-none">
                    <div className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                      {alternativeAnalyses.google.result || alternativeAnalyses.google.error}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grok" className="mt-6">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl text-slate-800 flex items-center justify-center gap-2">
                <Zap className="w-6 h-6 text-purple-500" />
                Perspective Rebelle (Grok)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!alternativeAnalyses.xai ? (
                <div className="text-center py-8">
                  <Button onClick={fetchAlternativeAnalyses} disabled={loadingAlternatives}>
                    {loadingAlternatives ? 'Chargement...' : 'Voir la perspective Grok'}
                  </Button>
                </div>
              ) : (
                <div className="bg-purple-50 rounded-lg p-6">
                  <div className="prose prose-slate max-w-none">
                    <div className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                      {alternativeAnalyses.xai.result || alternativeAnalyses.xai.error}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mistral" className="mt-6">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl text-slate-800 flex items-center justify-center gap-2">
                <Brain className="w-6 h-6 text-blue-500" />
                Approche Française (Mistral)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!alternativeAnalyses.mistral ? (
                <div className="text-center py-8">
                  <Button onClick={fetchAlternativeAnalyses} disabled={loadingAlternatives}>
                    {loadingAlternatives ? 'Chargement...' : 'Voir l\'approche française'}
                  </Button>
                </div>
              ) : (
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="prose prose-slate max-w-none">
                    <div className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                      {alternativeAnalyses.mistral.result || alternativeAnalyses.mistral.error}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="text-center">
        <Button
          onClick={onReset}
          variant="outline"
          className="flex items-center gap-2 mx-auto"
        >
          <RotateCcw className="w-4 h-4" />
          Analyze Another Conflict
        </Button>
      </div>
    </div>
  );
};
