
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Loader2, ArrowRight } from 'lucide-react';

interface ContinueInputProps {
  onContinue: (reply: string) => void;
  isAnalyzing: boolean;
}

export const ContinueInput: React.FC<ContinueInputProps> = ({ onContinue, isAnalyzing }) => {
  const [theirReply, setTheirReply] = useState('');

  const handleSubmit = () => {
    console.log("Continue submit called!");
    console.log("Their reply:", theirReply);
    
    if (theirReply.trim()) {
      console.log("About to call onContinue with:", theirReply.trim());
      onContinue(theirReply.trim());
      setTheirReply(''); // Clear the input after submission
    } else {
      console.log("Reply is empty, not calling onContinue");
    }
  };

  const isValid = theirReply.trim().length > 5;

  console.log("ContinueInput rendered, isAnalyzing:", isAnalyzing, "isValid:", isValid);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full">
            <MessageSquare className="w-6 h-6 text-green-700" />
          </div>
        </div>
        <CardTitle className="text-xl text-slate-800">
          Continue the Conversation
        </CardTitle>
        <p className="text-slate-600 mt-2">
          What did they reply? Paste their response or describe their reaction here.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder="Example: They said 'I understand your point, but I still think you're overreacting. This isn't as big a deal as you're making it out to be.' They seemed a bit defensive but were trying to stay calm..."
            value={theirReply}
            onChange={(e) => setTheirReply(e.target.value)}
            className="min-h-[100px] text-base border-slate-200 focus:border-green-400 focus:ring-green-400/20"
            disabled={isAnalyzing}
          />
          <p className="text-sm text-slate-500">
            {theirReply.length} characters • Share their exact words or describe their reaction
          </p>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!isValid || isAnalyzing}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white py-3 text-lg font-medium shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Analyzing Their Response...
            </>
          ) : (
            <>
              <ArrowRight className="w-5 h-5 mr-2" />
              Get My Next Move
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
