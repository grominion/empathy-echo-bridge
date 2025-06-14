
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Brain, MessageCircle, Loader2 } from 'lucide-react';

interface ConflictInputProps {
  onAnalyze: (description: string) => void;
  isAnalyzing: boolean;
}

export const ConflictInput: React.FC<ConflictInputProps> = ({ onAnalyze, isAnalyzing }) => {
  const [conflictDescription, setConflictDescription] = useState('');

  const handleSubmit = () => {
    if (conflictDescription.trim()) {
      onAnalyze(conflictDescription.trim());
    }
  };

  const isValid = conflictDescription.trim().length > 20;

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader className="text-center pb-6">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full">
            <MessageCircle className="w-8 h-8 text-blue-700" />
          </div>
        </div>
        <CardTitle className="text-2xl text-slate-800">
          Describe Your Conflict
        </CardTitle>
        <p className="text-slate-600 mt-2">
          Share the disagreement or conflict you're experiencing. Be as detailed as possible about your perspective and the other person's viewpoint.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Textarea
            placeholder="Example: My colleague keeps interrupting me in meetings and dismissing my ideas. They seem to think their experience makes them more qualified to speak on every topic. I feel frustrated and unheard, but they probably think I'm not contributing valuable insights quickly enough..."
            value={conflictDescription}
            onChange={(e) => setConflictDescription(e.target.value)}
            className="min-h-[120px] text-base border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
            disabled={isAnalyzing}
          />
          <p className="text-sm text-slate-500">
            {conflictDescription.length} characters • Minimum 20 characters recommended
          </p>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 space-y-2">
          <h4 className="font-medium text-slate-700 flex items-center gap-2">
            <Brain className="w-4 h-4" />
            What ECHO Will Analyze
          </h4>
          <ul className="text-sm text-slate-600 space-y-1 ml-6">
            <li>• The other person's genuine perspective and underlying motivations</li>
            <li>• Shared human needs and values between both sides</li>
            <li>• Strategic communication approaches to bridge the gap</li>
          </ul>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!isValid || isAnalyzing}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-3 text-lg font-medium shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Analyzing Perspectives...
            </>
          ) : (
            <>
              <Brain className="w-5 h-5 mr-2" />
              Listen to the Echo
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
