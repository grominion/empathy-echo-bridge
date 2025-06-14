
import React, { useState } from 'react';
import { ConflictInput } from '../components/ConflictInput';
import { CoachAnalysis } from '../components/CoachAnalysis';
import { ContinueInput } from '../components/ContinueInput';
import { analyzeConflict, continueCoaching } from '../utils/empathyAnalyzer';

export interface ConversationTurn {
  type: 'initial_problem' | 'ai_analysis' | 'their_reply';
  content: string;
  timestamp: Date;
}

export interface AnalysisResult {
  otherPerspective: string;
  emotionalBridge: string;
  translator: Array<{
    dontSay: string;
    insteadTry: string;
  }>;
  detectedLanguage: string;
}

const Conversation = () => {
  const [conversationHistory, setConversationHistory] = useState<ConversationTurn[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInitialAnalysis = async (conflictDescription: string) => {
    console.log("Initial analysis requested:", conflictDescription);
    
    setError(null);
    setIsLoading(true);
    
    try {
      // Add the initial problem to conversation history
      const initialTurn: ConversationTurn = {
        type: 'initial_problem',
        content: conflictDescription,
        timestamp: new Date()
      };
      
      setConversationHistory([initialTurn]);
      
      const result = await analyzeConflict(conflictDescription);
      
      // Add the AI analysis to conversation history
      const analysisTurn: ConversationTurn = {
        type: 'ai_analysis',
        content: result.otherPerspective,
        timestamp: new Date()
      };
      
      setConversationHistory(prev => [...prev, analysisTurn]);
      
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error("A critical error occurred:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueConversation = async (theirReply: string) => {
    console.log("Continue conversation:", theirReply);
    
    setError(null);
    setIsLoading(true);
    
    try {
      // Add their reply to conversation history
      const replyTurn: ConversationTurn = {
        type: 'their_reply',
        content: theirReply,
        timestamp: new Date()
      };
      
      const updatedHistory = [...conversationHistory, replyTurn];
      setConversationHistory(updatedHistory);
      
      const result = await continueCoaching(updatedHistory);
      
      // Add the new AI analysis to conversation history
      const analysisTurn: ConversationTurn = {
        type: 'ai_analysis',
        content: result.otherPerspective,
        timestamp: new Date()
      };
      
      setConversationHistory(prev => [...prev, analysisTurn]);
      
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error("Error continuing conversation:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const isConversationStarted = conversationHistory.length > 0;
  const lastAnalysis = conversationHistory.filter(turn => turn.type === 'ai_analysis').pop();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl mb-6 shadow-lg">
              <span className="text-3xl font-bold text-white">E</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent mb-4">
              ECHO
            </h1>
            <p className="text-xl text-slate-600 mb-2">
              AI Communication Coach
            </p>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Turn-by-turn coaching for difficult conversations. Start with your conflict, then paste their replies to get tactical guidance.
            </p>
          </header>
          
          {!isConversationStarted ? (
            <ConflictInput onAnalyze={handleInitialAnalysis} isAnalyzing={isLoading} />
          ) : (
            <div className="space-y-8">
              {/* Conversation Thread */}
              <div className="space-y-6">
                {conversationHistory.map((turn, index) => (
                  <div key={index} className="space-y-4">
                    {turn.type === 'initial_problem' && (
                      <div className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-slate-800 mb-3">Your Initial Conflict</h3>
                        <div className="text-slate-700 whitespace-pre-wrap leading-relaxed bg-slate-50 rounded-lg p-4">
                          {turn.content}
                        </div>
                      </div>
                    )}
                    
                    {turn.type === 'ai_analysis' && (
                      <CoachAnalysis analysis={{ otherPerspective: turn.content }} />
                    )}
                    
                    {turn.type === 'their_reply' && (
                      <div className="bg-amber-50/80 backdrop-blur-sm border border-amber-200 shadow-lg rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-amber-800 mb-3">Their Reply</h3>
                        <div className="text-amber-700 whitespace-pre-wrap leading-relaxed bg-amber-100/50 rounded-lg p-4">
                          {turn.content}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Continue Input - only show if conversation started and not currently loading */}
              {!isLoading && (
                <ContinueInput 
                  onContinue={handleContinueConversation} 
                  isAnalyzing={isLoading}
                />
              )}
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
              <p style={{color: 'red'}} className="text-sm">
                <strong>Error:</strong> {error}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
