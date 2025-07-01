
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Pause, 
  RotateCcw,
  Heart,
  Brain,
  Wind,
  Sparkles,
  Timer,
  Volume2,
  VolumeX,
  SkipForward,
  SkipBack,
  Settings,
  Star,
  Clock
} from 'lucide-react';

interface MeditationSession {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: string;
  difficulty: 'débutant' | 'intermédiaire' | 'avancé';
  focus: string;
  guide: string;
  rating: number;
  completions: number;
  steps: MeditationStep[];
}

interface MeditationStep {
  id: string;
  instruction: string;
  duration: number;
  type: 'breathing' | 'visualization' | 'reflection' | 'body_scan';
}

export const GuidedMeditation: React.FC = () => {
  const [selectedSession, setSelectedSession] = useState<MeditationSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const meditationSessions: MeditationSession[] = [
    {
      id: '1',
      title: 'Respiration Anti-Stress',
      description: 'Technique de respiration pour calmer l\'esprit et réduire le stress',
      duration: 10,
      category: 'Gestion du Stress',
      difficulty: 'débutant',
      focus: 'Respiration',
      guide: 'Dr. Sarah M.',
      rating: 4.8,
      completions: 1247,
      steps: [
        {
          id: '1',
          instruction: 'Installez-vous confortablement et fermez les yeux',
          duration: 30,
          type: 'reflection'
        },
        {
          id: '2',
          instruction: 'Inspirez lentement par le nez pendant 4 secondes',
          duration: 120,
          type: 'breathing'
        },
        {
          id: '3',
          instruction: 'Retenez votre souffle pendant 7 secondes',
          duration: 180,
          type: 'breathing'
        },
        {
          id: '4',
          instruction: 'Expirez par la bouche pendant 8 secondes',
          duration: 240,
          type: 'breathing'
        },
        {
          id: '5',
          instruction: 'Répétez ce cycle et observez votre détente',
          duration: 270,
          type: 'reflection'
        }
      ]
    },
    {
      id: '2',
      title: 'Méditation de la Compassion',
      description: 'Développez votre empathie et votre bienveillance envers vous-même et les autres',
      duration: 15,
      category: 'Empathie',
      difficulty: 'intermédiaire',
      focus: 'Compassion',
      guide: 'Marc L.',
      rating: 4.9,
      completions: 892,
      steps: [
        {
          id: '1',
          instruction: 'Centrez-vous sur votre respiration naturelle',
          duration: 60,
          type: 'breathing'
        },
        {
          id: '2',
          instruction: 'Visualisez une personne que vous aimez',
          duration: 180,
          type: 'visualization'
        },
        {
          id: '3',
          instruction: 'Envoyez-lui des pensées bienveillantes',
          duration: 240,
          type: 'reflection'
        },
        {
          id: '4',
          instruction: 'Étendez cette compassion à vous-même',
          duration: 300,
          type: 'reflection'
        },
        {
          id: '5',
          instruction: 'Incluez une personne avec qui vous avez des difficultés',
          duration: 360,
          type: 'visualization'
        }
      ]
    },
    {
      id: '3',
      title: 'Body Scan Relaxation',
      description: 'Scanner corporel pour relâcher les tensions physiques et mentales',
      duration: 20,
      category: 'Relaxation',
      difficulty: 'débutant',
      focus: 'Corps-Esprit',
      guide: 'Emma R.',
      rating: 4.7,
      completions: 653,
      steps: [
        {
          id: '1',
          instruction: 'Allongez-vous et détendez tout votre corps',
          duration: 60,
          type: 'body_scan'
        },
        {
          id: '2',
          instruction: 'Concentrez-vous sur vos pieds et orteils',
          duration: 180,
          type: 'body_scan'
        },
        {
          id: '3',
          instruction: 'Remontez lentement vers vos jambes',
          duration: 300,
          type: 'body_scan'
        },
        {
          id: '4',
          instruction: 'Observez votre abdomen et votre poitrine',
          duration: 420,
          type: 'body_scan'
        },
        {
          id: '5',
          instruction: 'Terminez par votre tête et votre visage',
          duration: 540,
          type: 'body_scan'
        }
      ]
    }
  ];

  useEffect(() => {
    if (isPlaying && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            if (currentStep < (selectedSession?.steps.length || 0) - 1) {
              setCurrentStep(prev => prev + 1);
              return selectedSession?.steps[currentStep + 1]?.duration || 0;
            } else {
              setIsPlaying(false);
              setSessionComplete(true);
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, timeRemaining, currentStep, selectedSession]);

  const startSession = (session: MeditationSession) => {
    setSelectedSession(session);
    setCurrentStep(0);
    setTimeRemaining(session.steps[0]?.duration || 0);
    setTotalTime(session.steps.reduce((acc, step) => acc + step.duration, 0));
    setIsPlaying(false);
    setSessionComplete(false);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetSession = () => {
    setCurrentStep(0);
    setTimeRemaining(selectedSession?.steps[0]?.duration || 0);
    setIsPlaying(false);
    setSessionComplete(false);
  };

  const nextStep = () => {
    if (selectedSession && currentStep < selectedSession.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setTimeRemaining(selectedSession.steps[currentStep + 1]?.duration || 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setTimeRemaining(selectedSession?.steps[currentStep - 1]?.duration || 0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'débutant': return 'bg-green-100 text-green-700';
      case 'intermédiaire': return 'bg-orange-100 text-orange-700';
      case 'avancé': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'breathing': return <Wind className="h-4 w-4" />;
      case 'visualization': return <Brain className="h-4 w-4" />;
      case 'reflection': return <Heart className="h-4 w-4" />;
      case 'body_scan': return <Sparkles className="h-4 w-4" />;
      default: return <Timer className="h-4 w-4" />;
    }
  };

  if (selectedSession) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Player Interface */}
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedSession.title}</h2>
              <p className="text-gray-600">{selectedSession.description}</p>
              <Badge className="mt-2">{selectedSession.category}</Badge>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Étape {currentStep + 1} sur {selectedSession.steps.length}</span>
                <span>{formatTime(timeRemaining)}</span>
              </div>
              <Progress 
                value={((totalTime - timeRemaining) / totalTime) * 100} 
                className="h-2 mb-4" 
              />
            </div>

            {/* Current Step */}
            <Card className="mb-6 bg-white/50">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  {getStepIcon(selectedSession.steps[currentStep]?.type)}
                  <h3 className="font-semibold text-lg">
                    Étape {currentStep + 1}
                  </h3>
                </div>
                <p className="text-gray-700 text-lg">
                  {selectedSession.steps[currentStep]?.instruction}
                </p>
              </CardContent>
            </Card>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <Button variant="outline" size="sm" onClick={prevStep} disabled={currentStep === 0}>
                <SkipBack className="h-4 w-4" />
              </Button>
              
              <Button 
                onClick={togglePlayPause} 
                size="lg"
                className="w-16 h-16 rounded-full"
                disabled={sessionComplete}
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={nextStep} 
                disabled={currentStep === selectedSession.steps.length - 1}
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2">
              <Button variant="ghost" size="sm" onClick={resetSession}>
                <RotateCcw className="h-4 w-4 mr-1" />
                Recommencer
              </Button>
              
              <Button variant="ghost" size="sm" onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              
              <Button variant="ghost" size="sm" onClick={() => setSelectedSession(null)}>
                Retour
              </Button>
            </div>

            {sessionComplete && (
              <Card className="mt-4 bg-green-50 border-green-200">
                <CardContent className="p-4 text-center">
                  <div className="text-green-600 mb-2">
                    <Sparkles className="h-8 w-8 mx-auto mb-2" />
                    <h3 className="font-semibold">Session Terminée !</h3>
                  </div>
                  <p className="text-sm text-green-700 mb-3">
                    Félicitations ! Vous avez complété la méditation "{selectedSession.title}".
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" onClick={resetSession}>
                      Refaire
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setSelectedSession(null)}>
                      Nouvelle Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            Méditation Guidée
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Découvrez nos sessions de méditation conçues pour développer votre intelligence 
            émotionnelle et améliorer vos relations interpersonnelles.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">12</div>
              <div className="text-sm text-gray-600">Sessions complétées</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">3h 45m</div>
              <div className="text-sm text-gray-600">Temps médité</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">7</div>
              <div className="text-sm text-gray-600">Jours consécutifs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">85%</div>
              <div className="text-sm text-gray-600">Score relaxation</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sessions List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {meditationSessions.map((session) => (
          <Card key={session.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="mb-3">
                <h3 className="font-semibold text-lg text-gray-800 mb-1">{session.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{session.description}</p>
                
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getDifficultyColor(session.difficulty)}>
                    {session.difficulty}
                  </Badge>
                  <Badge variant="outline">{session.category}</Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {session.duration} min
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500" />
                  {session.rating}
                </div>
              </div>
              
              <div className="text-xs text-gray-500 mb-3">
                Par {session.guide} • {session.completions} complétions
              </div>
              
              <Button 
                onClick={() => startSession(session)}
                className="w-full"
                size="sm"
              >
                <Play className="h-3 w-3 mr-1" />
                Commencer
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
