
import React, { useState } from 'react';
import { ConflictInput } from './ConflictInput';
import { SmartSuggestions } from './SmartSuggestions';
import { ShareExportModal } from './ShareExportModal';
import { MotivationNotifications } from './MotivationNotifications';
import { StartNewConversationFab } from './StartNewConversationFab';
import { QuickActionTemplates } from './QuickActionTemplates';
import { useAnalysisHandler } from '../hooks/useAnalysisHandler';

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
  const [resetKey, setResetKey] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [language, setLanguage] = useState('en');
  
  const { isLoading, error, lastAnalysis, handleAnalyze, handleVoiceAnalyze, resetAnalysis } = useAnalysisHandler();

  const handleStartNewConversation = () => {
    resetAnalysis();
    setSelectedTemplate('');
    setResetKey(prev => prev + 1);
  };

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
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Central Analysis Input */}
        <ConflictInput
          key={resetKey}
          onAnalyze={handleAnalyze}
          onVoiceAnalyze={handleVoiceAnalyze}
          isAnalyzing={isLoading}
          selectedTemplate={selectedTemplate}
          language={language}
          onLanguageChange={setLanguage}
        />

        {/* Smart Suggestions - Full Width */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <SmartSuggestions 
            onSelectSuggestion={(suggestion) => {
              if (suggestion.type === 'template') {
                setSelectedTemplate(suggestion.content);
              }
            }}
            userHistory={[]}
          />
        </div>

        {/* Quick Actions Row */}
        <QuickActionTemplates onTemplateSelect={handleTemplateSelect} />
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
