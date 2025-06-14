
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Loader2 } from 'lucide-react';

interface VoiceInputProps {
  onAnalyze: (audioData: string) => void;
  isAnalyzing: boolean;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ onAnalyze, isAnalyzing }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setIsProcessing(true);
        
        // Convert to base64
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          const base64Data = base64String.split(',')[1]; // Remove data:audio/webm;base64, prefix
          onAnalyze(base64Data);
          setIsProcessing(false);
        };
        reader.readAsDataURL(audioBlob);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Unable to access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const isDisabled = isAnalyzing || isProcessing;

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-medium text-slate-700 mb-2">Voice Analysis</h3>
        <p className="text-sm text-slate-500 mb-4">
          Record your voice to get emotionally-aware conflict analysis
        </p>
      </div>
      
      <Button
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isDisabled}
        className={`w-24 h-24 rounded-full text-white shadow-lg transition-all duration-200 ${
          isRecording 
            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        size="icon"
      >
        {isProcessing || isAnalyzing ? (
          <Loader2 className="w-8 h-8 animate-spin" />
        ) : isRecording ? (
          <MicOff className="w-8 h-8" />
        ) : (
          <Mic className="w-8 h-8" />
        )}
      </Button>
      
      <div className="text-center text-sm text-slate-600">
        {isProcessing ? (
          'Processing audio...'
        ) : isAnalyzing ? (
          'Analyzing with voice emotion detection...'
        ) : isRecording ? (
          'Recording... Click to stop'
        ) : (
          'Click to start voice recording'
        )}
      </div>
    </div>
  );
};
