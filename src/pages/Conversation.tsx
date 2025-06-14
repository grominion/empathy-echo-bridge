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

  useEffect(() => {
    // Simulate a delay to show the FAB after the component mounts
    const timer = setTimeout(() => {
      setShowNewConversationFab(true);
    }, 500);

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, []);

  const startNewConversation = useCallback(() => {
    console.log("Starting a completely new conversation");
    setConversationHistory([]);
    setError(null);
    setShowNewConversationFab(false);

    // Slight delay before showing the FAB again
    setTimeout(() => {
      setShowNewConversationFab(true);
    }, 500);
  }, []);

  const handleAnalyze = async (conflictDescription: string) => {
    console.log("Starting new analysis...");
    
    setError(null);
    setIsAnalyzing(true);
    
    // Add loading bubble immediately
    const newConversation: ConversationTurn[] = [
      ...conversationHistory,
      {
        type: 'initial_problem',
        content: conflictDescription,
        timestamp: Date.now()
      },
      {
        type: 'ai_analysis',
        content: '', // Will be replaced when analysis completes
        timestamp: Date.now(),
        isLoading: true
      }
    ];
    setConversationHistory(newConversation);
    
    try {
      const result = await analyzeConflict(conflictDescription);
      console.log("Analysis completed successfully");
      
      // Replace loading bubble with actual analysis
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
      
      // Remove loading bubble on error
      setConversationHistory(conversationHistory);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleContinueConversation = async (theirReply: string) => {
    console.log("Continuing conversation with reply:", theirReply);
    
    setError(null);
    setIsAnalyzing(true);
    
    // Add their reply and loading bubble
    const updatedHistory: ConversationTurn[] = [
      ...conversationHistory,
      {
        type: 'their_reply',
        content: theirReply,
        timestamp: Date.now()
      },
      {
        type: 'ai_analysis',
        content: '', // Will be replaced when analysis completes
        timestamp: Date.now(),
        isLoading: true
      }
    ];
    setConversationHistory(updatedHistory);
    
    try {
      const result = await continueCoaching(updatedHistory);
      console.log("Coaching continuation completed successfully");
      
      // Replace loading bubble with actual analysis
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
      
      // Remove loading bubble on error
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
    
    // Remove all subsequent messages after the edited one
    const truncatedHistory = updatedHistory.slice(0, index + 1);
    setConversationHistory(truncatedHistory);
    
    console.log("Updated conversation history after edit");
  };

  const renderConversationTurn = (turn: ConversationTurn, index: number) => {
    switch (turn.type) {
      case 'initial_problem':
        return (
          <div key={index} className="mb-6">
            <div className="text-slate-500 text-sm mb-1">
              You started the conversation...
            </div>
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
            <div className="text-blue-500 text-sm mb-1">
              ECHO analyzed the situation...
            </div>
            {turn.isLoading ? (
              <LoadingBubble />
            ) : (
              <CoachAnalysis analysis={turn.fullAnalysis!} />
            )}
          </div>
        );
      case 'their_reply':
        return (
          <div key={index} className="mb-6">
            <div className="text-green-500 text-sm mb-1">
              They replied...
            </div>
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
      <h1 className="text-4xl font-bold text-center text-slate-800 mb-8">
        ECHO: Your AI Communication Coach
      </h1>

      {/* Conversation History */}
      <div className="space-y-6">
        {conversationHistory.map((turn, index) => (
          renderConversationTurn(turn, index)
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p style={{ color: 'red' }} className="text-sm">
            <strong>Error:</strong> {error}
          </p>
        </div>
      )}

      {/* Initial Conflict Input or Continue Input */}
      {!hasInitialProblem ? (
        <ConflictInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
      ) : canContinue ? (
        <ContinueInput onContinue={handleContinueConversation} isAnalyzing={isAnalyzing} />
      ) : null}
    </div>
  );
};

export default Conversation;
