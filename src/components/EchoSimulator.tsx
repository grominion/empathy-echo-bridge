
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConflictInput } from './ConflictInput';
import { SmartSuggestions } from './SmartSuggestions';
import { ShareExportModal } from './ShareExportModal';
import { MotivationNotifications } from './MotivationNotifications';
import { analyzeConflict } from '../utils/empathyAnalyzer';
import { StartNewConversationFab } from './StartNewConversationFab';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap, TrendingUp, Clock, Heart, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface AnalysisResult {
  otherPerspective?: string;
  emotionalBridge?: string;
  translator?: Array<{
    dontSay: string;
    insteadTry: string;
  }>;
  detectedLanguage: string;
  empathyAnalysis?: string;
  strategyAnalysis?: string;
  devilsAdvocateAnalysis?: any;
  wisdomOfCrowd?: any;
  voiceMetadata?: any;
}

export const EchoSimulator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState<{
    result: AnalysisResult;
    description: string;
    title: string;
  } | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [language, setLanguage] = useState('en');
  
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleAnalyze = async (conflictText: string) => {
    console.log("Starting conflict analysis...");
    console.log("Text length:", conflictText.length);

    if (!conflictText.trim()) {
      toast({
        title: "Error",
        description: "Please describe your conflict before analyzing.",
        variant: "destructive"
      });
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const result = await analyzeConflict(conflictText, false);
      
      console.log("Analysis completed:", result);
      
      // Save for sharing
      setLastAnalysis({
        result,
        description: conflictText,
        title: conflictText.substring(0, 50) + (conflictText.length > 50 ? '...' : '')
      });
      
      navigate('/result', { state: { analysis: result } });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An error occurred during analysis';
      setError(errorMessage);
      console.error("Analysis error:", e);
      
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceAnalyze = async (audioData: string) => {
    console.log("Starting voice analysis...");
    console.log("Audio data length:", audioData.length);

    setError(null);
    setIsLoading(true);

    try {
      const { analyzeVoiceConflict } = await import('../utils/empathyAnalyzer');
      const result = await analyzeVoiceConflict(audioData);
      
      console.log("Voice analysis completed:", result);
      
      // Save for sharing
      setLastAnalysis({
        result,
        description: 'Voice analysis',
        title: 'Voice Conflict Analysis'
      });
      
      navigate('/result', { state: { analysis: result } });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Voice analysis failed';
      setError(errorMessage);
      console.error("Voice analysis error:", e);
      
      toast({
        title: "Voice Analysis Failed", 
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartNewConversation = () => {
    setError(null);
    setIsLoading(false);
    setSelectedTemplate('');
    setResetKey(prev => prev + 1);
  };

  const quickTemplates = [
    {
      title: "Express Conflict ⚡",
      description: "Quick 30-second analysis",
      icon: <Zap className="h-6 w-6" />,
      template: "I just had a disagreement with someone close to me. I'd like to understand their perspective and find a solution quickly. How can I approach them constructively?"
    },
    {
      title: "Alternative Perspective 🔄", 
      description: "See the other person's viewpoint",
      icon: <TrendingUp className="h-6 w-6" />,
      template: "I had a disagreement with someone and I can't understand their reaction. Can you help me see things from their perspective and identify what might have hurt or frustrated them?"
    }
  ];

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
    // Auto-scroll to input
    setTimeout(() => {
      const inputElement = document.querySelector('textarea');
      inputElement?.focus();
      inputElement?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Notifications */}
      <MotivationNotifications />
      
      {/* FAB */}
      <StartNewConversationFab
        onStartNew={handleStartNewConversation}
        isVisible={true}
      />

      {/* Main Content Layout */}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Central Analysis Input - Takes most space */}
        <div className="lg:col-span-3">
          <ConflictInput
            key={resetKey}
            onAnalyze={handleAnalyze}
            onVoiceAnalyze={handleVoiceAnalyze}
            isAnalyzing={isLoading}
            selectedTemplate={selectedTemplate}
            language={language}
            onLanguageChange={setLanguage}
          />
        </div>

        {/* Sidebar with Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Templates */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              Quick Start
            </h3>
            
            {quickTemplates.map((template, index) => (
              <Card key={index} className="hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-blue-200">
                <CardContent className="p-4">
                  <Button
                    variant="ghost"
                    className="w-full h-full p-0 flex flex-col items-start gap-3 group-hover:bg-transparent"
                    onClick={() => handleTemplateSelect(template.template)}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                        {template.icon}
                      </div>
                    </div>
                    <div className="text-left w-full">
                      <h4 className="font-medium text-gray-800 text-sm mb-1">
                        {template.title}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {template.description}
                      </p>
                    </div>
                  </Button>
                </CardContent>
              </Card>
            ))}

            {/* History Button */}
            <Card className="hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-blue-200">
              <CardContent className="p-4">
                <Button
                  variant="ghost"
                  className="w-full h-full p-0 flex flex-col items-start gap-3 group-hover:bg-transparent"
                  onClick={() => user ? navigate('/history') : navigate('/auth')}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <Clock className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="text-left w-full">
                    <h4 className="font-medium text-gray-800 text-sm mb-1">
                      Recent History 📚
                    </h4>
                    <p className="text-xs text-gray-600">
                      {user ? 'Review your analyses' : 'Sign in to access'}
                    </p>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Smart Suggestions - Compact */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <SmartSuggestions 
              onSelectSuggestion={(suggestion) => {
                if (suggestion.type === 'template') {
                  setSelectedTemplate(suggestion.content);
                }
              }}
              userHistory={[]}
            />
          </div>

          {/* Progress Motivation */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Heart className="h-5 w-5 text-purple-600" />
                <Users className="h-5 w-5 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-sm">
                Build Better Relationships
              </h3>
              <p className="text-xs text-gray-600 mb-3">
                Each analysis improves your emotional intelligence
              </p>
              <Button 
                size="sm" 
                className="w-full text-xs"
                onClick={() => user ? navigate('/dashboard') : navigate('/auth')}
              >
                {user ? 'View Progress' : 'Create Free Account'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-4xl mx-auto">
          <p className="text-red-700 text-sm">
            <strong>Error:</strong> {error}
          </p>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && lastAnalysis && (
        <ShareExportModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          analysis={lastAnalysis.result}
          conflictDescription={lastAnalysis.description}
          title={lastAnalysis.title}
        />
      )}
    </div>
  );
};
