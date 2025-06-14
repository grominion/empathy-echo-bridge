import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Brain, MessageCircle, Loader2, Mic } from 'lucide-react';

interface ConflictInputProps {
  onAnalyze: (conflictText: string) => void;
  onVoiceAnalyze: (audioData: string) => void;
  isAnalyzing: boolean;
}

export const ConflictInput: React.FC<ConflictInputProps> = ({
  onAnalyze,
  onVoiceAnalyze,
  isAnalyzing
}) => {
  const [conflictText, setConflictText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Voice input logic here (adapted for inline mic button)
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new window.MediaRecorder(stream);
      let chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        setIsProcessing(true);
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          // remove the data:*/*;base64, prefix
          const base64Data = base64String.split(',')[1];
          onVoiceAnalyze(base64Data);
          setIsProcessing(false);
        };
        reader.readAsDataURL(audioBlob);

        // Stop tracks
        stream.getTracks().forEach(track => track.stop());
      };

      chunks = [];
      mediaRecorder.start();
      setIsRecording(true);

      // Stop after 30 seconds or when button is clicked again (handled below)
      setTimeout(() => {
        if (mediaRecorder.state !== "inactive") {
          mediaRecorder.stop();
          setIsRecording(false);
        }
      }, 30000);

      // Save mediaRecorder to window for access in handler
      (window as any)._activeMediaRecorder = mediaRecorder;
    } catch (error) {
      alert('Microphone access error: ' + (error as any).message);
    }
  };

  const handleStopRecording = () => {
    const mediaRecorder = (window as any)._activeMediaRecorder;
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

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

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl text-slate-800">
          Tell ECHO About Your Conflict
        </CardTitle>
        <p className="text-slate-600 mt-2">
          Use your voice or type below for personalized analysis
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Centered Mic Button */}
        <div className="flex flex-col items-center">
          <Button
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            disabled={isAnalyzing || isProcessing}
            className={`w-20 h-20 rounded-full text-white shadow-lg mb-2 transition-all duration-200 flex items-center justify-center
            ${isRecording ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-blue-600 hover:bg-blue-700"}
            `}
            size="icon"
            aria-label={isRecording ? "Stop Recording" : "Start Recording"}
          >
            {(isAnalyzing || isProcessing) ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </Button>
          <div className="text-xs text-slate-600 min-h-5">
            {isProcessing
              ? 'Processing audio...'
              : isAnalyzing
                ? 'Analyzing with voice...'
                : isRecording
                  ? 'Recording... Click to stop'
                  : 'Tap to record your conflict'}
          </div>
        </div>

        {/* "OR" separator */}
        <div className="text-center my-2">
          <span className="inline-block px-3 py-0.5 bg-slate-100 rounded-full text-slate-500 text-xs font-medium select-none">- OR -</span>
        </div>

        {/* Text Input */}
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

        {/* What ECHO Will Analyze (unchanged) */}
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
            <li className="text-blue-600 font-medium">• Voice tone and emotional analysis for deeper insights</li>
          </ul>
        </div>

        <div className="text-center text-xs text-slate-500">
          <p>💡 Tip: Press Ctrl+Enter to quickly submit your conflict description</p>
        </div>
      </CardContent>
    </Card>
  );
};
