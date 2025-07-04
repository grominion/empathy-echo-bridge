
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Loader2, RefreshCcw } from 'lucide-react';
import { EchoSimulator } from '../components/EchoSimulator';
import { EmpathyAnalysis } from '../components/EmpathyAnalysis';
import { ConflictInput } from '../components/ConflictInput';
import { analyzeConflict, continueCoaching } from '../utils/empathyAnalyzer';
import { EditableMessage } from '../components/EditableMessage';
import { ContinueInput } from '../components/ContinueInput';
import { CoachAnalysis } from '@/components/CoachAnalysis';
import { LoadingBubble } from '@/components/LoadingBubble';
import { StartNewConversationFab } from '@/components/StartNewConversationFab';
import { ProgressIndicator, useAnalysisProgress } from '@/components/ProgressIndicator';

export interface DevilsAdvocateAttack {
  attack_type: string;
  example_quote: string;
  counter_strategy: string;
}

export interface AnalysisResult {
  empathyAnalysis?: string;
  strategyAnalysis?: string;
  devilsAdvocateAnalysis?: DevilsAdvocateAttack[] | string;
  wisdomOfCrowd?: {
    text: string;
    count: number;
    totalAnalyzed: number;
    percentage: number;
  };
  voiceMetadata?: {
    transcribedText: string;
    sentimentData: {
      sentiment: string;
      confidence: number;
      emotions: Array<{ emotion: string; confidence: number }>;
    };
    processingSource: string;
  };
  otherPerspective?: string; // Keep for backward compatibility
  emotionalBridge?: string;
  translator?: Array<{
    dontSay: string;
    insteadTry: string;
  }>;
  detectedLanguage: string;
}

export interface ConversationTurn {
  type: 'initial_problem' | 'ai_analysis' | 'their_reply';
  content: string;
  timestamp: number;
  isLoading?: boolean;
  fullAnalysis?: AnalysisResult;
}

const Conversation: React.FC = () => {
  const [conversationHistory, setConversationHistory] = useState<ConversationTurn[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNewConversationFab, setShowNewConversationFab] = useState(false);
  const [language, setLanguage] = useState('en');
  const { steps, currentStep, nextStep, reset, isComplete } = useAnalysisProgress();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNewConversationFab(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const startNewConversation = useCallback(() => {
    console.log("Starting a completely new conversation");
    setConversationHistory([]);
    setError(null);
    setShowNewConversationFab(false);
    reset();

    setTimeout(() => {
      setShowNewConversationFab(true);
    }, 500);
  }, [reset]);

  const handleAnalyze = async (conflictText: string) => {
    console.log("Starting new text analysis...");
    
    setError(null);
    setIsAnalyzing(true);
    reset();
    
    const newConversation: ConversationTurn[] = [
      ...conversationHistory,
      {
        type: 'initial_problem',
        content: conflictText,
        timestamp: Date.now()
      },
      {
        type: 'ai_analysis',
        content: '',
        timestamp: Date.now(),
        isLoading: true
      }
    ];
    setConversationHistory(newConversation);
    
    try {
      // Simuler la progression
      const progressTimer = setInterval(() => {
        if (!isComplete) {
          nextStep();
        }
      }, 2000);

      const result = await analyzeConflict(conflictText, false);
      console.log("Analysis completed successfully");
      
      clearInterval(progressTimer);
      
      const completedConversation = newConversation.map((turn, index) => {
        if (index === newConversation.length - 1 && turn.isLoading) {
          return {
            ...turn,
            content: result.empathyAnalysis || result.otherPerspective || 'Analysis completed',
            isLoading: false,
            fullAnalysis: result
          };
        }
        return turn;
      });
      
      setConversationHistory(completedConversation);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error("Analysis failed:", e);
      setConversationHistory(conversationHistory);
    } finally {
      setIsAnalyzing(false);
      reset();
    }
  };

  const handleVoiceAnalyze = async (audioData: string) => {
    console.log("Starting new audio analysis...");
    
    setError(null);
    setIsAnalyzing(true);
    
    const newConversation: ConversationTurn[] = [
      ...conversationHistory,
      {
        type: 'initial_problem',
        content: audioData,
        timestamp: Date.now()
      },
      {
        type: 'ai_analysis',
        content: '',
        timestamp: Date.now(),
        isLoading: true
      }
    ];
    setConversationHistory(newConversation);
    
    try {
      const result = await analyzeConflict(audioData, true);
      console.log("Analysis completed successfully");
      
      const completedConversation = newConversation.map((turn, index) => {
        if (index === newConversation.length - 1 && turn.isLoading) {
          return {
            ...turn,
            content: result.empathyAnalysis || result.otherPerspective || 'Analysis completed',
            isLoading: false,
            fullAnalysis: result
          };
        }
        return turn;
      });
      
      setConversationHistory(completedConversation);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error("Voice analysis failed:", e);
      setConversationHistory(conversationHistory);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleContinueConversation = async (theirReply: string) => {
    console.log("Continuing conversation with reply:", theirReply);
    
    setError(null);
    setIsAnalyzing(true);
    
    const updatedHistory: ConversationTurn[] = [
      ...conversationHistory,
      {
        type: 'their_reply',
        content: theirReply,
        timestamp: Date.now()
      },
      {
        type: 'ai_analysis',
        content: '',
        timestamp: Date.now(),
        isLoading: true
      }
    ];
    setConversationHistory(updatedHistory);
    
    try {
      const result = await continueCoaching(updatedHistory);
      console.log("Coaching continuation completed successfully");
      
      const completedConversation = updatedHistory.map((turn, index) => {
        if (index === updatedHistory.length - 1 && turn.isLoading) {
          return {
            ...turn,
            content: result.empathyAnalysis || result.otherPerspective || 'Analysis completed',
            isLoading: false,
            fullAnalysis: result
          };
        }
        return turn;
      });
      
      setConversationHistory(completedConversation);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error("Coaching continuation failed:", e);
      
      const historyWithoutLoading = updatedHistory.slice(0, -1);
      setConversationHistory(historyWithoutLoading);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleEditMessage = (index: number, newContent: string) => {
    console.log("Editing message at index:", index, "New content:", newContent);
    
    const updatedHistory = [...conversationHistory];
    updatedHistory[index] = {
      ...updatedHistory[index],
      content: newContent
    };
    
    const truncatedHistory = updatedHistory.slice(0, index + 1);
    setConversationHistory(truncatedHistory);
    
    console.log("Updated conversation history after edit");
  };

  const renderConversationTurn = (turn: ConversationTurn, index: number) => {
    switch (turn.type) {
      case 'initial_problem':
        return (
          <div key={index} className="mb-6">
            <EditableMessage
              content={turn.content}
              onEdit={(newContent) => handleEditMessage(index, newContent)}
              isLastUserMessage={index === conversationHistory.length - 1}
            />
          </div>
        );
      case 'ai_analysis':
        return (
          <div key={index} className="mb-6">
            {turn.isLoading ? (
              <>
                <LoadingBubble />
                {isAnalyzing && (
                  <div className="mt-4">
                    <ProgressIndicator steps={steps} currentStep={currentStep} />
                  </div>
                )}
              </>
            ) : (
              <CoachAnalysis analysis={turn.fullAnalysis!} />
            )}
          </div>
        );
      case 'their_reply':
        return (
          <div key={index} className="mb-6">
            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed bg-green-50/50 rounded-lg p-4">
              {turn.content}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const hasInitialProblem = conversationHistory.some(turn => turn.type === 'initial_problem');
  const lastTurnType = conversationHistory.length > 0 ? conversationHistory[conversationHistory.length - 1].type : null;
  const canContinue = lastTurnType === 'ai_analysis' && !isAnalyzing;

  return (
    <div className="container mx-auto p-8 max-w-3xl">
      <StartNewConversationFab onStartNew={startNewConversation} isVisible={showNewConversationFab} />
      <h1 className="text-4xl font-bold text-center text-slate-800 dark:text-slate-200 mb-8">
        ECHO: Your AI Communication Coach
      </h1>

      <div className="space-y-6">
        {conversationHistory.map((turn, index) => (
          renderConversationTurn(turn, index)
        ))}
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p style={{ color: 'red' }} className="text-sm">
            <strong>Error:</strong> {error}
          </p>
        </div>
      )}

      {!hasInitialProblem ? (
        <ConflictInput 
          onAnalyze={handleAnalyze} 
          onVoiceAnalyze={handleVoiceAnalyze} 
          isAnalyzing={isAnalyzing}
          language={language}
          onLanguageChange={setLanguage}
        />
      ) : canContinue ? (
        <ContinueInput onContinue={handleContinueConversation} isAnalyzing={isAnalyzing} />
      ) : null}
    </div>
  );
};

export default Conversation;
