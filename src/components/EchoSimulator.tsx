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
import { Sparkles, Zap, TrendingUp, Clock } from 'lucide-react';

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
  
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAnalyze = async (conflictText: string) => {
    console.log("Text Conflict Description Received!");
    console.log("Text length:", conflictText.length);

    setError(null);
    setIsLoading(true);

    try {
      const result = await analyzeConflict(conflictText, false);
      
      // Sauvegarder pour le partage
      setLastAnalysis({
        result,
        description: conflictText,
        title: conflictText.substring(0, 50) + (conflictText.length > 50 ? '...' : '')
      });
      
      navigate('/result', { state: { analysis: result } });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error("A critical error occurred:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceAnalyze = async (audioData: string) => {
    console.log("Voice Conflict Data Received!");
    console.log("Audio data length:", audioData.length);

    setError(null);
    setIsLoading(true);

    try {
      const { analyzeVoiceConflict } = await import('../utils/empathyAnalyzer');
      const result = await analyzeVoiceConflict(audioData);
      
      // Sauvegarder pour le partage
      setLastAnalysis({
        result,
        description: audioData,
        title: 'Analyse vocale'
      });
      
      navigate('/result', { state: { analysis: result } });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error("Voice analysis error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartNewConversation = () => {
    if (window.confirm('Êtes-vous sûr ? Cela effacera l\'analyse actuelle.')) {
      setError(null);
      setIsLoading(false);
      setSelectedTemplate('');
      setResetKey(prev => prev + 1);
    }
  };

  const handleSuggestionSelect = (suggestion: any) => {
    if (suggestion.type === 'template') {
      setSelectedTemplate(suggestion.content);
    } else if (suggestion.type === 'quick_analysis') {
      // Activer le mode analyse rapide
      console.log("Mode analyse rapide activé");
    }
  };

  const quickAnalysisOptions = [
    {
      title: "Conflit Express ⚡",
      description: "Analyse rapide en 30 secondes",
      icon: <Zap className="h-5 w-5" />,
      action: () => {
        const template = "Je viens d'avoir une dispute avec un proche. J'aimerais comprendre son point de vue et trouver une solution rapidement. Comment puis-je l'aborder de manière constructive ?";
        setSelectedTemplate(template);
        // Auto-scroll to input
        setTimeout(() => {
          const inputElement = document.querySelector('textarea');
          inputElement?.focus();
          inputElement?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    },
    {
      title: "Perspective Alternative 🔄",
      description: "Voir le point de vue de l'autre",
      icon: <TrendingUp className="h-5 w-5" />,
      action: () => {
        const template = "J'ai eu un désaccord avec quelqu'un et je n'arrive pas à comprendre leur réaction. Pouvez-vous m'aider à voir les choses de leur perspective et identifier ce qui pourrait les avoir blessé ou frustrés ?";
        setSelectedTemplate(template);
        setTimeout(() => {
          const inputElement = document.querySelector('textarea');
          inputElement?.focus();
          inputElement?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    },
    {
      title: "Historique Récent 📚",
      description: "Revoir vos dernières analyses",
      icon: <Clock className="h-5 w-5" />,
      action: () => {
        if (user) {
          navigate('/history');
        } else {
          navigate('/auth');
        }
      }
    }
  ];

  return (
    <div className="space-y-8 relative">
      {/* Notifications de motivation */}
      <MotivationNotifications />
      
      {/* FAB pour nouvelle conversation */}
      <StartNewConversationFab
        onStartNew={handleStartNewConversation}
        isVisible={true}
      />

      {/* Options d'analyse rapide */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {quickAnalysisOptions.map((option, index) => (
          <Card key={index} className="hover:shadow-lg transition-all cursor-pointer group">
            <CardContent className="p-4">
              <Button
                variant="ghost"
                className="w-full h-full p-0 flex flex-col items-center gap-3 group-hover:bg-transparent"
                onClick={option.action}
              >
                <div className="p-3 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                  {option.icon}
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {option.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {option.description}
                  </p>
                </div>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Suggestions intelligentes */}
      <SmartSuggestions 
        onSelectSuggestion={handleSuggestionSelect}
        userHistory={[]} // TODO: récupérer depuis l'API
      />

      {/* Input principal pour les conflits */}
      <ConflictInput
        key={resetKey}
        onAnalyze={handleAnalyze}
        onVoiceAnalyze={handleVoiceAnalyze}
        isAnalyzing={isLoading}
        selectedTemplate={selectedTemplate}
      />

      {/* Message d'erreur */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p style={{ color: 'red' }} className="text-sm">
            <strong>Erreur:</strong> {error}
          </p>
        </div>
      )}

      {/* Modal de partage */}
      {showShareModal && lastAnalysis && (
        <ShareExportModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          analysis={lastAnalysis.result}
          conflictDescription={lastAnalysis.description}
          title={lastAnalysis.title}
        />
      )}

      {/* Widget de motivation en bas */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-gray-800">
              Développez votre intelligence émotionnelle
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Chaque analyse vous rend plus empathique et améliore vos relations.
          </p>
          <div className="flex justify-center gap-2">
            <Button 
              size="sm" 
              onClick={() => user ? navigate('/dashboard') : navigate('/auth')}
            >
              {user ? 'Voir mes progrès' : 'Créer un compte gratuit'}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowShareModal(true)}
              disabled={!lastAnalysis}
            >
              Partager une analyse
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
