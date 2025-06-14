
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Brain, MessageCircle, Loader2 } from 'lucide-react';

interface ConflictInputProps {
  onAnalyze: (conflictText: string) => void;
  isAnalyzing: boolean;
}

export const ConflictInput: React.FC<ConflictInputProps> = ({ onAnalyze, isAnalyzing }) => {
  const [conflictText, setConflictText] = useState('');

  const handleSubmit = () => {
    if (conflictText.trim()) {
      onAnalyze(conflictText.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey && conflictText.trim()) {
      handleSubmit();
    }
  };

  console.log("ConflictInput rendered, isAnalyzing:", isAnalyzing);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader className="text-center pb-6">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full">
            <MessageCircle className="w-8 h-8 text-blue-700" />
          </div>
        </div>
        <CardTitle className="text-2xl text-slate-800">
          Tell ECHO About Your Conflict
        </CardTitle>
        <p className="text-slate-600 mt-2">
          Describe your disagreement or conflict in detail. Share your perspective and how you're feeling about the situation.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Textarea
            placeholder="Describe your conflict situation here... What happened? How are you feeling? What's at stake?"
            value={conflictText}
            onChange={(e) => setConflictText(e.target.value)}
            onKeyDown={handleKeyPress}
            className="min-h-[120px] text-base leading-relaxed resize-none focus:ring-2 focus:ring-blue-500"
            disabled={isAnalyzing}
          />
          
          <Button
            onClick={handleSubmit}
            disabled={!conflictText.trim() || isAnalyzing}
            className="w-full h-12 text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyzing Conflict...
              </>
            ) : (
              'Analyze My Conflict'
            )}
          </Button>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 space-y-2">
          <h4 className="font-medium text-slate-700 flex items-center gap-2">
            <Brain className="w-4 h-4" />
            What ECHO Will Analyze
          </h4>
          <ul className="text-sm text-slate-600 space-y-1 ml-6">
            <li>• The other person's perspective and underlying motivations</li>
            <li>• Emotional bridges to help you connect with them</li>
            <li>• Strategic communication approaches</li>
            <li>• Potential manipulative arguments and how to counter them</li>
          </ul>
        </div>

        <div className="text-center text-xs text-slate-500">
          <p>💡 Tip: Press Ctrl+Enter to quickly submit your conflict description</p>
        </div>
      </CardContent>
    </Card>
  );
};
