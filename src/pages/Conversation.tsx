
import React, { useState } from 'react';
import { ConflictInput } from '../components/ConflictInput';
import { CoachAnalysis } from '../components/CoachAnalysis';
import { ContinueInput } from '../components/ContinueInput';
import { StartNewConversationFab } from '../components/StartNewConversationFab';
import { EditableMessage } from '../components/EditableMessage';
import { LoadingBubble } from '../components/LoadingBubble';
import { analyzeConflict, continueCoaching } from '../utils/empathyAnalyzer';

export interface ConversationTurn {
  type: 'initial_problem' | 'ai_analysis' | 'their_reply' | 'loading';
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

  const handleStartNewConversation = () => {
    setConversationHistory([]);
    setError(null);
  };

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
      
      // Add loading bubble
      const loadingTurn: ConversationTurn = {
        type: 'loading',
        content: 'Thinking...',
        timestamp: new Date()
      };
      
      setConversationHistory([initialTurn, loadingTurn]);
      
      const result = await analyzeConflict(conflictDescription);
      
      // Replace loading bubble with AI analysis
      const analysisTurn: ConversationTurn = {
        type: 'ai_analysis',
        content: result.otherPerspective,
        timestamp: new Date()
      };
      
      setConversationHistory([initialTurn, analysisTurn]);
      
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
      setError(errorMessage);
      // Remove loading bubble on error
      setConversationHistory(prev => prev.filter(turn => turn.type !== 'loading'));
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
      
      // Add loading bubble
      const loadingTurn: ConversationTurn = {
        type: 'loading',
        content: 'Thinking...',
        timestamp: new Date()
      };
      
      const updatedHistory = [...conversationHistory, replyTurn, loadingTurn];
      setConversationHistory(updatedHistory);
      
      const result = await continueCoaching(updatedHistory.filter(turn => turn.type !== 'loading'));
      
      // Replace loading bubble with new AI analysis
      const analysisTurn: ConversationTurn = {
        type: 'ai_analysis',
        content: result.otherPerspective,
        timestamp: new Date()
      };
      
      setConversationHistory(prev => [
        ...prev.filter(turn => turn.type !== 'loading'),
        analysisTurn
      ]);
      
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
      setError(errorMessage);
      // Remove loading bubble on error
      setConversationHistory(prev => prev.filter(turn => turn.type !== 'loading'));
      console.error("Error continuing conversation:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditLastReply = async (newContent: string) => {
    console.log("Editing last reply:", newContent);
    
    setError(null);
    setIsLoading(true);
    
    try {
      // Find the last user reply and update it - using reverse and findIndex for compatibility
      const updatedHistory = [...conversationHistory];
      const reversedHistory = [...updatedHistory].reverse();
      const lastReplyIndexFromEnd = reversedHistory.findIndex(turn => turn.type === 'their_reply');
      
      if (lastReplyIndexFromEnd !== -1) {
        const lastReplyIndex = updatedHistory.length - 1 - lastReplyIndexFromEnd;
        
        updatedHistory[lastReplyIndex] = {
          ...updatedHistory[lastReplyIndex],
          content: newContent,
          timestamp: new Date()
        };
        
        // Remove any AI analysis that came after this reply and add loading bubble
        const historyUpToReply = updatedHistory.slice(0, lastReplyIndex + 1);
        const loadingTurn: ConversationTurn = {
          type: 'loading',
          content: 'Thinking...',
          timestamp: new Date()
        };
        
        setConversationHistory([...historyUpToReply, loadingTurn]);
        
        // Get new analysis with updated history
        const result = await continueCoaching(historyUpToReply);
        
        // Replace loading bubble with new AI analysis
        const analysisTurn: ConversationTurn = {
          type: 'ai_analysis',
          content: result.otherPerspective,
          timestamp: new Date()
        };
        
        setConversationHistory([...historyUpToReply, analysisTurn]);
      }
      
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
      setError(errorMessage);
      // Remove loading bubble on error
      setConversationHistory(prev => prev.filter(turn => turn.type !== 'loading'));
      console.error("Error editing conversation:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const isConversationStarted = conversationHistory.length > 0;
  
  const getLastUserReplyIndex = () => {
    const reversedHistory = [...conversationHistory].reverse();
    const lastReplyIndexFromEnd = reversedHistory.findIndex(turn => turn.type === 'their_reply');
    return lastReplyIndexFromEnd !== -1 ? conversationHistory.length - 1 - lastReplyIndexFromEnd : -1;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <StartNewConversationFab 
        onStartNew={handleStartNewConversation}
        isVisible={isConversationStarted}
      />
      
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
              <div className="space-y-8">
                {conversationHistory.map((turn, index) => (
                  <div key={index}>
                    {turn.type === 'initial_problem' && (
                      <div className="flex justify-end mb-6">
                        <div className="max-w-3xl bg-blue-500 text-white rounded-2xl rounded-br-sm px-6 py-4 shadow-lg">
                          <h3 className="text-sm font-semibold text-blue-100 mb-2 uppercase tracking-wide">Your Initial Conflict</h3>
                          <div className="text-white whitespace-pre-wrap leading-relaxed">
                            {turn.content}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {turn.type === 'ai_analysis' && (
                      <div className="flex justify-start mb-6">
                        <div className="max-w-3xl">
                          <CoachAnalysis analysis={{ otherPerspective: turn.content }} />
                        </div>
                      </div>
                    )}
                    
                    {turn.type === 'loading' && (
                      <div className="flex justify-start mb-6">
                        <div className="max-w-3xl">
                          <LoadingBubble />
                        </div>
                      </div>
                    )}
                    
                    {turn.type === 'their_reply' && (
                      <div className="flex justify-end mb-6">
                        <div className="max-w-3xl bg-amber-50 border border-amber-200 shadow-lg rounded-2xl rounded-br-sm p-6">
                          <h3 className="text-sm font-semibold text-amber-800 mb-3 uppercase tracking-wide">Their Reply</h3>
                          <EditableMessage
                            content={turn.content}
                            onEdit={handleEditLastReply}
                            isLastUserMessage={index === getLastUserReplyIndex()}
                          />
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
