
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  Target, 
  TrendingUp, 
  Calendar,
  Star,
  CheckCircle,
  Users,
  Lightbulb,
  BookOpen,
  Award
} from 'lucide-react';

interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  category: 'empathy' | 'communication' | 'conflict_resolution' | 'self_awareness';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  completed: boolean;
  actionSteps: string[];
}

interface PersonalGrowthStats {
  empathyScore: number;
  communicationScore: number;
  conflictResolutionScore: number;
  selfAwarenessScore: number;
  totalPoints: number;
  weeklyStreak: number;
  completedChallenges: number;
}

export const PersonalGrowthModule: React.FC = () => {
  const [stats, setStats] = useState<PersonalGrowthStats>({
    empathyScore: 72,
    communicationScore: 68,
    conflictResolutionScore: 75,
    selfAwarenessScore: 70,
    totalPoints: 1450,
    weeklyStreak: 5,
    completedChallenges: 23
  });

  const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>([
    {
      id: 'empathy_1',
      title: 'Écoute Active Challenge',
      description: 'Lors de votre prochaine conversation, posez 3 questions ouvertes pour mieux comprendre l\'autre personne',
      category: 'empathy',
      difficulty: 'easy',
      points: 10,
      completed: false,
      actionSteps: [
        'Choisissez une conversation aujourd\'hui',
        'Posez "Comment vous sentez-vous par rapport à...?"',
        'Demandez "Qu\'est-ce qui vous préoccupe le plus?"',
        'Finissez par "Que puis-je faire pour vous aider?"'
      ]
    },
    {
      id: 'communication_1',
      title: 'Expression Positive',
      description: 'Exprimez une appréciation sincère à 3 personnes différentes aujourd\'hui',
      category: 'communication',
      difficulty: 'medium',
      points: 15,
      completed: false,
      actionSteps: [
        'Identifiez 3 personnes dans votre entourage',
        'Trouvez quelque chose de spécifique à apprécier chez chacune',
        'Exprimez votre appréciation de manière directe et sincère',
        'Observez leur réaction et la vôtre'
      ]
    },
    {
      id: 'conflict_1',
      title: 'Perspective Alternative',
      description: 'Face à un désaccord, trouvez 3 raisons valides pour lesquelles l\'autre personne pourrait avoir cette opinion',
      category: 'conflict_resolution',
      difficulty: 'hard',
      points: 25,
      completed: false,
      actionSteps: [
        'Identifiez un désaccord récent',
        'Listez 3 raisons positives pour leur position',
        'Partagez votre compréhension avec la personne',
        'Cherchez un terrain d\'entente'
      ]
    }
  ]);

  const [selectedChallenge, setSelectedChallenge] = useState<DailyChallenge | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'empathy': return <Heart className="h-4 w-4" />;
      case 'communication': return <Users className="h-4 w-4" />;
      case 'conflict_resolution': return <Target className="h-4 w-4" />;
      case 'self_awareness': return <Lightbulb className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'empathy': return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'communication': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'conflict_resolution': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'self_awareness': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const completeChallenge = (challengeId: string) => {
    setDailyChallenges(prev => 
      prev.map(challenge => 
        challenge.id === challengeId 
          ? { ...challenge, completed: true }
          : challenge
      )
    );
    
    const challenge = dailyChallenges.find(c => c.id === challengeId);
    if (challenge) {
      setStats(prev => ({
        ...prev,
        totalPoints: prev.totalPoints + challenge.points,
        completedChallenges: prev.completedChallenges + 1
      }));
    }
    
    setSelectedChallenge(null);
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.totalPoints}</div>
            <div className="text-sm text-gray-600">Points Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.weeklyStreak}</div>
            <div className="text-sm text-gray-600">Jours Consécutifs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.completedChallenges}</div>
            <div className="text-sm text-gray-600">Défis Complétés</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round((stats.empathyScore + stats.communicationScore + stats.conflictResolutionScore + stats.selfAwarenessScore) / 4)}
            </div>
            <div className="text-sm text-gray-600">Score Moyen</div>
          </CardContent>
        </Card>
      </div>

      {/* Growth Areas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Vos Domaines de Croissance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Empathie</span>
              <span className="text-sm text-gray-600">{stats.empathyScore}%</span>
            </div>
            <Progress value={stats.empathyScore} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Communication</span>
              <span className="text-sm text-gray-600">{stats.communicationScore}%</span>
            </div>
            <Progress value={stats.communicationScore} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Résolution de Conflits</span>
              <span className="text-sm text-gray-600">{stats.conflictResolutionScore}%</span>
            </div>
            <Progress value={stats.conflictResolutionScore} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Conscience de Soi</span>
              <span className="text-sm text-gray-600">{stats.selfAwarenessScore}%</span>
            </div>
            <Progress value={stats.selfAwarenessScore} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Daily Challenges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-600" />
            Défis Quotidiens - Devenez la Meilleure Version de Vous-Même
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dailyChallenges.map((challenge) => (
              <Card 
                key={challenge.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  challenge.completed ? 'bg-green-50 border-green-200' : 'hover:bg-gray-50'
                }`}
                onClick={() => !challenge.completed && setSelectedChallenge(challenge)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getCategoryIcon(challenge.category)}
                        <h4 className="font-semibold text-gray-800">
                          {challenge.title}
                        </h4>
                        {challenge.completed && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {challenge.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge className={getCategoryColor(challenge.category)}>
                          {challenge.category.replace('_', ' ')}
                        </Badge>
                        <Badge className={getDifficultyColor(challenge.difficulty)}>
                          {challenge.difficulty}
                        </Badge>
                        <Badge variant="outline">
                          +{challenge.points} points
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Challenge Detail Modal */}
      {selectedChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getCategoryIcon(selectedChallenge.category)}
                {selectedChallenge.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                {selectedChallenge.description}
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Plan d'Action
                </h4>
                <ol className="space-y-2">
                  {selectedChallenge.actionSteps.map((step, index) => (
                    <li key={index} className="text-sm text-blue-700 flex items-start gap-2">
                      <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <Award className="h-4 w-4 text-yellow-600" />
                  Pourquoi ce défi vous rendra meilleur(e)
                </h4>
                <p className="text-sm text-gray-700">
                  En pratiquant {selectedChallenge.category === 'empathy' ? 'l\'empathie' : 
                    selectedChallenge.category === 'communication' ? 'la communication' :
                    selectedChallenge.category === 'conflict_resolution' ? 'la résolution de conflits' : 'la conscience de soi'}, 
                  vous développez votre intelligence émotionnelle et créez des relations plus profondes et authentiques.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={() => completeChallenge(selectedChallenge.id)}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Marquer comme Complété (+{selectedChallenge.points} points)
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedChallenge(null)}
                >
                  Plus tard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
