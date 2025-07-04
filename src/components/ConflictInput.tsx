
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Brain, MessageCircle, Loader2, Mic, MicOff, Languages } from 'lucide-react';

interface ConflictInputProps {
  onAnalyze: (conflictText: string) => void;
  onVoiceAnalyze: (audioData: string) => void;
  isAnalyzing: boolean;
  selectedTemplate?: string;
}

export const ConflictInput: React.FC<ConflictInputProps> = ({
  onAnalyze,
  onVoiceAnalyze,
  isAnalyzing,
  selectedTemplate = ''
}) => {
  const [conflictText, setConflictText] = useState(selectedTemplate);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [language, setLanguage] = useState('en');
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  // Update text when template changes
  useEffect(() => {
    setConflictText(selectedTemplate);
  }, [selectedTemplate]);

  const getText = (key: string) => {
    const texts = {
      en: {
        title: "Tell ECHO About Your Conflict",
        subtitle: "Describe your situation below or use voice for deeper analysis",
        placeholder: "Describe your conflict situation here... What happened? How are you feeling? What's at stake?",
        analyzeButton: "Analyze My Conflict",
        analyzing: "Analyzing Conflict...",
        recordingHint: "Recording... Click to stop",
        voiceHint: "Tap to record your conflict",
        processing: "Processing audio...",
        analyzing2: "Analyzing with voice...",
        whatEcho: "What ECHO Will Analyze",
        tip: "💡 Tip: Press Ctrl+Enter to quickly submit your conflict description",
        features: [
          "• The other person's perspective and underlying motivations",
          "• Emotional bridges to help you connect with them", 
          "• Strategic communication approaches",
          "• Potential manipulative arguments and how to counter them",
          "• Voice tone and emotional analysis for deeper insights"
        ]
      },
      fr: {
        title: "Parlez à ECHO de votre conflit",
        subtitle: "Décrivez votre situation ci-dessous ou utilisez la voix pour une analyse plus approfondie",
        placeholder: "Décrivez votre situation de conflit ici... Que s'est-il passé ? Comment vous sentez-vous ? Qu'est-ce qui est en jeu ?",
        analyzeButton: "Analyser mon conflit",
        analyzing: "Analyse en cours...",
        recordingHint: "Enregistrement... Cliquez pour arrêter",
        voiceHint: "Appuyez pour enregistrer votre conflit",
        processing: "Traitement audio...",
        analyzing2: "Analyse avec la voix...",
        whatEcho: "Ce qu'ECHO va analyser",
        tip: "💡 Conseil : Appuyez sur Ctrl+Entrée pour soumettre rapidement votre description",
        features: [
          "• La perspective de l'autre personne et ses motivations profondes",
          "• Des ponts émotionnels pour vous aider à vous connecter",
          "• Des approches de communication stratégiques", 
          "• Les arguments manipulateurs potentiels et comment les contrer",
          "• Analyse du ton vocal et émotionnel pour des insights plus profonds"
        ]
      }
    };
    return texts[language as keyof typeof texts]?.[key as keyof typeof texts['en']] || texts.en[key as keyof typeof texts['en']];
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      let chunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = async () => {
        setIsProcessing(true);
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          const base64Data = base64String.split(',')[1];
          onVoiceAnalyze(base64Data);
          setIsProcessing(false);
        };
        reader.readAsDataURL(audioBlob);

        // Stop tracks
        stream.getTracks().forEach(track => track.stop());
      };

      chunks = [];
      recorder.start();
      setIsRecording(true);
      setMediaRecorder(recorder);

      // Stop after 30 seconds
      setTimeout(() => {
        if (recorder.state !== "inactive") {
          recorder.stop();
          setIsRecording(false);
        }
      }, 30000);
    } catch (error) {
      console.error('Microphone access error:', error);
      alert('Microphone access error: ' + (error as any).message);
    }
  };

  const handleStopRecording = () => {
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
    <div className="w-full max-w-4xl mx-auto">
      {/* Language Toggle */}
      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
          className="flex items-center gap-2"
        >
          <Languages className="w-4 h-4" />
          {language === 'en' ? 'FR' : 'EN'}
        </Button>
      </div>

      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            {getText('title')}
          </CardTitle>
          <p className="text-slate-600 mt-3 text-lg">
            {getText('subtitle')}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Main Text Input */}
          <div className="space-y-4">
            <Textarea
              placeholder={getText('placeholder')}
              value={conflictText}
              onChange={(e) => setConflictText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="min-h-[140px] text-lg leading-relaxed resize-none focus:ring-2 focus:ring-blue-500 border-2 border-slate-200"
              disabled={isAnalyzing}
            />
            
            <Button
              onClick={handleSubmit}
              disabled={!conflictText.trim() || isAnalyzing}
              className="w-full h-14 text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                  {getText('analyzing')}
                </>
              ) : (
                <>
                  <Brain className="w-6 h-6 mr-3" />
                  {getText('analyzeButton')}
                </>
              )}
            </Button>
          </div>

          {/* Voice Input Section */}
          <div className="border-t pt-6">
            <div className="text-center space-y-4">
              <p className="text-slate-500 font-medium">- OR -</p>
              
              <div className="flex flex-col items-center space-y-4">
                <Button
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  disabled={isAnalyzing || isProcessing}
                  className={`w-24 h-24 rounded-full text-white shadow-xl transition-all duration-200 flex items-center justify-center
                  ${isRecording ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-blue-600 hover:bg-blue-700 hover:scale-105"}
                  `}
                  size="icon"
                >
                  {(isAnalyzing || isProcessing) ? (
                    <Loader2 className="w-10 h-10 animate-spin" />
                  ) : isRecording ? (
                    <MicOff className="w-10 h-10" />
                  ) : (
                    <Mic className="w-10 h-10" />
                  )}
                </Button>
                
                <div className="text-sm text-slate-600 font-medium min-h-5">
                  {isProcessing
                    ? getText('processing')
                    : isAnalyzing
                      ? getText('analyzing2')
                      : isRecording
                        ? getText('recordingHint')
                        : getText('voiceHint')}
                </div>
              </div>
            </div>
          </div>

          {/* What ECHO Analyzes */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6 border border-blue-100">
            <h4 className="font-semibold text-slate-800 flex items-center gap-3 mb-4">
              <Brain className="w-5 h-5 text-blue-600" />
              {getText('whatEcho')}
            </h4>
            <ul className="text-sm text-slate-700 space-y-2">
              {getText('features').map((feature: string, index: number) => (
                <li key={index} className={index === 4 ? "text-blue-600 font-medium" : ""}>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center text-xs text-slate-500">
            <p>{getText('tip')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
