
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause,
  Square,
  BarChart3,
  TrendingUp,
  Heart,
  Brain,
  Volume2,
  Download,
  Share2,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';

interface EmotionAnalysis {
  emotion: string;
  confidence: number;
  intensity: number;
  color: string;
  description: string;
}

interface VoiceMetrics {
  duration: number;
  avgPitch: number;
  speechRate: number;
  pauseFrequency: number;
  energyLevel: number;
  clarity: number;
}

interface AnalysisResult {
  id: string;
  timestamp: string;
  emotions: EmotionAnalysis[];
  dominantEmotion: string;
  metrics: VoiceMetrics;
  suggestions: string[];
  transcript?: string;
  audioUrl?: string;
}

export const VoiceEmotionAnalysis: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [recentAnalyses, setRecentAnalyses] = useState<AnalysisResult[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Charger les analyses récentes (simulation)
    const mockAnalyses: AnalysisResult[] = [
      {
        id: '1',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        emotions: [
          { emotion: 'Calme', confidence: 85, intensity: 3, color: 'bg-blue-500', description: 'Voix posée et sereine' },
          { emotion: 'Confiance', confidence: 72, intensity: 4, color: 'bg-green-500', description: 'Ton assuré' },
          { emotion: 'Légère inquiétude', confidence: 45, intensity: 2, color: 'bg-yellow-500', description: 'Nuances d\'hésitation' }
        ],
        dominantEmotion: 'Calme',
        metrics: {
          duration: 45,
          avgPitch: 180,
          speechRate: 150,
          pauseFrequency: 8,
          energyLevel: 65,
          clarity: 88
        },
        suggestions: [
          'Excellente maîtrise émotionnelle',
          'Votre calme transpire dans votre voix',
          'Continuez à cultiver cette sérénité'
        ]
      }
    ];
    
    setRecentAnalyses(mockAnalyses);
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        analyzeAudio(audioBlob);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Erreur accès microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const analyzeAudio = async (audioBlob: Blob) => {
    setIsAnalyzing(true);
    
    // Simulation de l'analyse (dans la réalité, ceci ferait appel à une API)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockResult: AnalysisResult = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      emotions: [
        { emotion: 'Joie', confidence: 78, intensity: 4, color: 'bg-yellow-500', description: 'Tonalité positive et énergique' },
        { emotion: 'Confiance', confidence: 82, intensity: 4, color: 'bg-green-500', description: 'Voix assurée et stable' },
        { emotion: 'Enthousiasme', confidence: 65, intensity: 3, color: 'bg-orange-500', description: 'Énergie communicative' },
        { emotion: 'Légère nervosité', confidence: 32, intensity: 2, color: 'bg-red-500', description: 'Quelques hésitations' }
      ],
      dominantEmotion: 'Confiance',
      metrics: {
        duration: recordingTime,
        avgPitch: 195,
        speechRate: 160,
        pauseFrequency: 6,
        energyLevel: 78,
        clarity: 85
      },
      suggestions: [
        'Votre confiance transparaît clairement',
        'Votre enthousiasme est contagieux',
        'Légère nervosité détectée - respirez profondément',
        'Excellente expressivité émotionnelle'
      ],
      audioUrl: URL.createObjectURL(audioBlob)
    };
    
    setCurrentResult(mockResult);
    setRecentAnalyses(prev => [mockResult, ...prev.slice(0, 4)]);
    setIsAnalyzing(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getEmotionIntensityColor = (intensity: number) => {
    if (intensity >= 4) return 'text-red-600';
    if (intensity >= 3) return 'text-orange-600';
    if (intensity >= 2) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getMetricScore = (value: number, type: 'pitch' | 'rate' | 'energy' | 'clarity') => {
    switch (type) {
      case 'pitch':
        if (value < 150) return { score: 'Grave', color: 'text-blue-600' };
        if (value < 200) return { score: 'Moyen', color: 'text-green-600' };
        return { score: 'Aigu', color: 'text-purple-600' };
      case 'rate':
        if (value < 120) return { score: 'Lent', color: 'text-blue-600' };
        if (value < 180) return { score: 'Normal', color: 'text-green-600' };
        return { score: 'Rapide', color: 'text-orange-600' };
      case 'energy':
        if (value < 40) return { score: 'Faible', color: 'text-gray-600' };
        if (value < 70) return { score: 'Modéré', color: 'text-yellow-600' };
        return { score: 'Élevé', color: 'text-red-600' };
      case 'clarity':
        if (value < 60) return { score: 'À améliorer', color: 'text-red-600' };
        if (value < 80) return { score: 'Correct', color: 'text-yellow-600' };
        return { score: 'Excellent', color: 'text-green-600' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            Analyse Vocale des Émotions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Analysez vos émotions à travers votre voix. Découvrez ce que votre tonalité, 
            votre rythme et votre intensité révèlent sur votre état émotionnel.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-purple-600">8</div>
              <div className="text-sm text-gray-600">Analyses effectuées</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">78%</div>
              <div className="text-sm text-gray-600">Clarity moyenne</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-600">Confiance</div>
              <div className="text-sm text-gray-600">Émotion dominante</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-orange-600">+12%</div>
              <div className="text-sm text-gray-600">Progression</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enregistrement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5" />
            Nouvelle Analyse Vocale
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            {!isRecording && !isAnalyzing && (
              <div>
                <p className="text-gray-600 mb-4">
                  Parlez pendant 30 secondes à 2 minutes pour une analyse complète
                </p>
                <Button 
                  onClick={startRecording}
                  size="lg"
                  className="w-32 h-32 rounded-full bg-red-500 hover:bg-red-600"
                >
                  <Mic className="h-8 w-8" />
                </Button>
              </div>
            )}
            
            {isRecording && (
              <div>
                <div className="mb-4">
                  <div className="text-2xl font-bold text-red-600 mb-2">
                    {formatTime(recordingTime)}
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-600 font-semibold">Enregistrement en cours...</span>
                  </div>
                </div>
                <Button 
                  onClick={stopRecording}
                  size="lg"
                  className="w-32 h-32 rounded-full bg-gray-600 hover:bg-gray-700"
                >
                  <Square className="h-8 w-8" />
                </Button>
              </div>
            )}
            
            {isAnalyzing && (
              <div>
                <div className="mb-4">
                  <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-purple-600 font-semibold">Analyse en cours...</p>
                  <p className="text-sm text-gray-600">Traitement de votre enregistrement vocal</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Résultats de l'analyse */}
      {currentResult && (
        <Card className="border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Résultat de l'Analyse
              </div>
              <Badge className="bg-purple-100 text-purple-700">
                {currentResult.dominantEmotion}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Émotions détectées */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Émotions Détectées</h4>
              <div className="space-y-3">
                {currentResult.emotions.map((emotion, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${emotion.color}`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{emotion.emotion}</span>
                        <span className="text-sm text-gray-600">{emotion.confidence}%</span>
                      </div>
                      <Progress value={emotion.confidence} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">{emotion.description}</p>
                    </div>
                    <Badge className={getEmotionIntensityColor(emotion.intensity)}>
                      Intensité {emotion.intensity}/5
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Métriques vocales */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Métriques Vocales</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Durée:</span>
                    <span className="font-semibold">{formatTime(currentResult.metrics.duration)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pitch moyen:</span>
                    <span className={`font-semibold ${getMetricScore(currentResult.metrics.avgPitch, 'pitch').color}`}>
                      {currentResult.metrics.avgPitch} Hz ({getMetricScore(currentResult.metrics.avgPitch, 'pitch').score})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Débit:</span>
                    <span className={`font-semibold ${getMetricScore(currentResult.metrics.speechRate, 'rate').color}`}>
                      {currentResult.metrics.speechRate} mots/min ({getMetricScore(currentResult.metrics.speechRate, 'rate').score})
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Énergie:</span>
                    <span className={`font-semibold ${getMetricScore(currentResult.metrics.energyLevel, 'energy').color}`}>
                      {currentResult.metrics.energyLevel}% ({getMetricScore(currentResult.metrics.energyLevel, 'energy').score})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Clarté:</span>
                    <span className={`font-semibold ${getMetricScore(currentResult.metrics.clarity, 'clarity').color}`}>
                      {currentResult.metrics.clarity}% ({getMetricScore(currentResult.metrics.clarity, 'clarity').score})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pauses:</span>
                    <span className="font-semibold">{currentResult.metrics.pauseFrequency}/min</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Suggestions Personnalisées</h4>
              <div className="space-y-2">
                {currentResult.suggestions.map((suggestion, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t">
              {currentResult.audioUrl && (
                <Button size="sm" variant="outline">
                  <Play className="h-3 w-3 mr-1" />
                  Réécouter
                </Button>
              )}
              <Button size="sm" variant="outline">
                <Download className="h-3 w-3 mr-1" />
                Exporter
              </Button>
              <Button size="sm" variant="outline">
                <Share2 className="h-3 w-3 mr-1" />
                Partager
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Historique */}
      {recentAnalyses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Analyses Récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAnalyses.map((analysis) => (
                <div key={analysis.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{analysis.dominantEmotion}</div>
                    <div className="text-sm text-gray-600">
                      {new Date(analysis.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{analysis.metrics.clarity}% clarté</div>
                    <div className="text-xs text-gray-500">{formatTime(analysis.metrics.duration)}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
