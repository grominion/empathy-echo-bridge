
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, MessageCircle, Loader2, Mic } from 'lucide-react';

interface ConflictInputProps {
  onAnalyze: (audioData: string) => void;
  isAnalyzing: boolean;
}

export const ConflictInput: React.FC<ConflictInputProps> = ({ onAnalyze, isAnalyzing }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        
        // Convert to base64
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Audio = reader.result as string;
          const base64Data = base64Audio.split(',')[1]; // Remove data:audio/webm;base64, prefix
          onAnalyze(base64Data);
        };
        reader.readAsDataURL(audioBlob);

        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
        setIsUploading(false);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsUploading(true);
    }
  };

  const handleMouseDown = () => {
    if (!isAnalyzing && !isUploading) {
      startRecording();
    }
  };

  const handleMouseUp = () => {
    if (isRecording) {
      stopRecording();
    }
  };

  const getButtonText = () => {
    if (isAnalyzing) return "Thinking...";
    if (isUploading) return "Uploading and Analyzing...";
    if (isRecording) return "Recording... Release to Send";
    return "Hold to Record";
  };

  const getButtonIcon = () => {
    if (isAnalyzing || isUploading) return <Loader2 className="w-8 h-8 animate-spin" />;
    return <Mic className={`w-8 h-8 ${isRecording ? 'text-red-500' : ''}`} />;
  };

  console.log("ConflictInput rendered, isAnalyzing:", isAnalyzing, "isRecording:", isRecording, "isUploading:", isUploading);

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
          Hold the microphone button and speak about your disagreement or conflict. Share your perspective and how you're feeling about the situation.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <Button
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp} // Stop recording if mouse leaves button
            disabled={isAnalyzing || isUploading}
            className={`w-48 h-24 text-lg font-medium shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50 ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
            } text-white rounded-2xl flex flex-col items-center justify-center gap-2`}
          >
            {getButtonIcon()}
            <span className="text-center leading-tight">{getButtonText()}</span>
          </Button>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 space-y-2">
          <h4 className="font-medium text-slate-700 flex items-center gap-2">
            <Brain className="w-4 h-4" />
            What ECHO Will Analyze From Your Voice
          </h4>
          <ul className="text-sm text-slate-600 space-y-1 ml-6">
            <li>• Your words and the story you're telling</li>
            <li>• Your emotional tone and how you're feeling</li>
            <li>• The other person's perspective and underlying motivations</li>
            <li>• Strategic communication approaches to bridge the gap</li>
          </ul>
        </div>

        <div className="text-center text-xs text-slate-500">
          <p>🎙️ Make sure your microphone is enabled</p>
          <p>Press and hold the button while speaking, then release to send</p>
        </div>
      </CardContent>
    </Card>
  );
};
