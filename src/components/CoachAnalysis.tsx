
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Target, AlertTriangle, Users, TrendingUp, Brain, Zap, Shield, CheckCircle } from 'lucide-react';
import { AnalysisResult } from '@/pages/Conversation';

interface CoachAnalysisProps {
  analysis: AnalysisResult;
}

export const CoachAnalysis: React.FC<CoachAnalysisProps> = ({ analysis }) => {
  // Use empathyAnalysis if available, fall back to otherPerspective for backward compatibility
  const mainAnalysis = analysis.empathyAnalysis || analysis.otherPerspective || '';
  
  // Helper function to render analysis text with bold section titles
  const renderAnalysisWithBoldTitles = (text: string) => {
    // Split by markdown headers and make them bold
    const parts = text.split(/(###\s+[^\n]+)/g);
    
    return parts.map((part, index) => {
      if (part.match(/###\s+[^\n]+/)) {
        // This is a header - make it bold with more margin
        const headerText = part.replace(/###\s+/, '');
        return (
          <div key={index} className="font-semibold text-slate-800 mt-6 mb-3 first:mt-0">
            {headerText}
          </div>
        );
      }
      // Regular text
      return (
        <div key={index} className="whitespace-pre-wrap leading-relaxed">
          {part}
        </div>
      );
    });
  };

  // Helper function to parse and render Devil's Advocate analysis as cards
  const renderDevilsAdvocateCards = (text: string) => {
    if (!text) return null;

    // Split the text by lines and parse argument/counter-strategy pairs
    const lines = text.split('\n').filter(line => line.trim());
    const cards = [];
    let currentCard = null;

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Check if this line starts a new argument (looks for bullet points or bold formatting)
      if (trimmedLine.match(/^[-*•]\s*\*\*/) || trimmedLine.match(/^\*\*[^*]+\*\*/)) {
        // If we have a current card, save it
        if (currentCard) {
          cards.push(currentCard);
        }
        
        // Start a new card
        const titleMatch = trimmedLine.match(/\*\*([^*]+)\*\*/);
        const title = titleMatch ? titleMatch[1] : trimmedLine.replace(/^[-*•]\s*/, '');
        
        currentCard = {
          title: title,
          quote: '',
          counterStrategy: ''
        };
      } else if (trimmedLine.match(/^[-*•]\s*\*\*Counter-Strategy:\*\*/)) {
        // This is the counter-strategy section
        if (currentCard) {
          const strategyText = trimmedLine.replace(/^[-*•]\s*\*\*Counter-Strategy:\*\*\s*/, '');
          currentCard.counterStrategy = strategyText;
        }
      } else if (currentCard && !currentCard.counterStrategy && trimmedLine.length > 0) {
        // This might be a quote or additional description for the current argument
        if (trimmedLine.startsWith('"') || trimmedLine.includes('"')) {
          currentCard.quote = trimmedLine.replace(/^[-*•]\s*/, '');
        }
      } else if (currentCard && currentCard.counterStrategy === '' && trimmedLine.length > 0) {
        // Additional content for the counter-strategy
        const cleanLine = trimmedLine.replace(/^[-*•]\s*/, '');
        if (cleanLine.toLowerCase().includes('counter') || cleanLine.toLowerCase().includes('strategy') || cleanLine.toLowerCase().includes('response')) {
          currentCard.counterStrategy = cleanLine.replace(/\*\*Counter-Strategy:\*\*\s*/, '');
        }
      }
    }

    // Don't forget the last card
    if (currentCard) {
      cards.push(currentCard);
    }

    // If we couldn't parse cards properly, fall back to the original formatting
    if (cards.length === 0) {
      return (
        <div className="prose prose-slate max-w-none text-slate-700">
          {renderAnalysisWithBoldTitles(text)}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {cards.map((card, index) => (
          <div 
            key={index}
            className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Attack Title with Icon */}
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0 mt-1">
                <Shield className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-red-800 text-lg mb-2">
                  {card.title}
                </h4>
                {card.quote && (
                  <blockquote className="italic text-gray-600 border-l-4 border-red-200 pl-4 mb-3">
                    {card.quote}
                  </blockquote>
                )}
              </div>
            </div>

            {/* Counter-Strategy */}
            {card.counterStrategy && (
              <div className="bg-green-50 border border-green-200 rounded-md p-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-green-800 mb-1">Your Response:</div>
                    <div className="text-green-700 leading-relaxed">
                      {card.counterStrategy}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Main Multi-AI Analysis with Tabs */}
      <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xl rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            Council of Sages Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="empath" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="empath" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                The Empath's View
              </TabsTrigger>
              <TabsTrigger value="strategist" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                The Strategist's Plan
              </TabsTrigger>
              <TabsTrigger value="devils-advocate" className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                The Devil's Advocate
              </TabsTrigger>
            </TabsList>

            {/* Empath Tab (Claude) */}
            <TabsContent value="empath" className="mt-4">
              <div className="bg-blue-50/50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-blue-800">Claude's Empathetic Analysis</h3>
                </div>
                <div className="prose prose-slate max-w-none text-slate-700">
                  {renderAnalysisWithBoldTitles(mainAnalysis)}
                </div>
              </div>
            </TabsContent>

            {/* Strategist Tab (Google) */}
            <TabsContent value="strategist" className="mt-4">
              <div className="bg-green-50/50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full">
                    <Target className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-800">Gemini's Strategic Analysis</h3>
                </div>
                <div className="prose prose-slate max-w-none text-slate-700">
                  {analysis.strategyAnalysis ? (
                    renderAnalysisWithBoldTitles(analysis.strategyAnalysis)
                  ) : (
                    <div className="text-slate-500 italic">Strategic analysis not available</div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Devil's Advocate Tab (OpenAI) */}
            <TabsContent value="devils-advocate" className="mt-4">
              <div className="bg-red-50/50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-gradient-to-br from-red-100 to-pink-100 rounded-full">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-red-800">GPT-4's Devil's Advocate</h3>
                </div>
                {analysis.devilsAdvocateAnalysis ? (
                  renderDevilsAdvocateCards(analysis.devilsAdvocateAnalysis)
                ) : (
                  <div className="text-slate-500 italic">Devil's advocate analysis not available</div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Wisdom of the Crowd Module */}
      {analysis.wisdomOfCrowd && (
        <Card className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border-2 border-purple-200 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="pb-4 bg-gradient-to-r from-purple-100/50 to-indigo-100/50">
            <CardTitle className="text-xl text-slate-800 flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full">
                <Users className="w-6 h-6 text-purple-700" />
              </div>
              <div>
                <div className="text-xl font-bold">You're Not Alone</div>
                <div className="text-sm text-slate-600 font-normal">Wisdom of the Crowd</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <p className="text-slate-700 leading-relaxed text-lg mb-4">
                  {analysis.wisdomOfCrowd.text}
                </p>
                <div className="flex items-center gap-6 text-sm text-slate-600">
                  <div className="flex items-center gap-2 bg-white/70 rounded-full px-4 py-2">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    <span className="font-medium">Seen {analysis.wisdomOfCrowd.count.toLocaleString()} times</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/70 rounded-full px-4 py-2">
                    <Zap className="w-4 h-4 text-indigo-600" />
                    <span className="font-medium">Out of {analysis.wisdomOfCrowd.totalAnalyzed.toLocaleString()} conflicts</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl font-bold mb-1">
                    {analysis.wisdomOfCrowd.percentage}%
                  </div>
                  <div className="text-sm opacity-90">frequency</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
