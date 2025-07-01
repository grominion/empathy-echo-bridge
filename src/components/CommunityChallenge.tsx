
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Users, 
  Target, 
  Calendar,
  Clock,
  Star,
  Flame,
  Award,
  TrendingUp,
  Heart,
  MessageSquare,
  Share2,
  CheckCircle,
  Crown,
  Zap,
  Gift
} from 'lucide-react';

interface CommunityChallenge {
  id: string;
  title: string;
  description: string;
  category: 'empathy' | 'communication' | 'conflict_resolution' | 'mindfulness';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  duration: number; // en jours
  participants: number;
  maxParticipants?: number;
  startDate: string;
  endDate: string;
  rewards: {
    xp: number;
    badge?: string;
    communityTitle?: string;
  };
  tasks: ChallengeTask[];
  isActive: boolean;
  userParticipating: boolean;
  userProgress: number;
}

interface ChallengeTask {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  type: 'daily' | 'weekly' | 'milestone';
}

interface ChallengeLeaderboard {
  rank: number;
  username: string;
  progress: number;
  points: number;
  avatar: string;
  badge?: string;
}

export const CommunityChallenge: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'current' | 'upcoming' | 'leaderboard' | 'history'>('current');
  const [selectedChallenge, setSelectedChallenge] = useState<CommunityChallenge | null>(null);

  const challenges: CommunityChallenge[] = [
    {
      id: 'empathy_week',
      title: '7 Jours d\'Empathie Pure 💝',
      description: 'Une semaine pour développer votre muscle empathique avec des exercices quotidiens progressifs.',
      category: 'empathy',
      difficulty: 'beginner',
      duration: 7,
      participants: 247,
      maxParticipants: 300,
      startDate: '2024-01-01',
      endDate: '2024-01-07',
      rewards: {
        xp: 500,
        badge: 'Coeur Empathique',
        communityTitle: 'Empathie Master'
      },
      tasks: [
        {
          id: 'day1',
          title: 'Écoute Active Premium',
          description: 'Passez 20 minutes à écouter quelqu\'un sans l\'interrompre',
          points: 50,
          completed: true,
          type: 'daily'
        },
        {
          id: 'day2',
          title: 'Miroir Émotionnel',
          description: 'Refletez les émotions de 3 personnes différentes',
          points: 60,
          completed: true,
          type: 'daily'
        },
        {
          id: 'day3',
          title: 'Questions Curieuses',
          description: 'Posez 5 questions ouvertes profondes',
          points: 70,
          completed: false,
          type: 'daily'
        }
      ],
      isActive: true,
      userParticipating: true,
      userProgress: 65
    },
    {
      id: 'communication_master',
      title: 'Maître de Communication 🗣️',
      description: 'Défi de 21 jours pour transformer votre style de communication.',
      category: 'communication',
      difficulty: 'intermediate',
      duration: 21,
      participants: 156,
      maxParticipants: 200,
      startDate: '2024-01-10',
      endDate: '2024-01-31',
      rewards: {
        xp: 1200,
        badge: 'Communication Expert',
        communityTitle: 'Sage Communicateur'
      },
      tasks: [],
      isActive: false,
      userParticipating: false,
      userProgress: 0
    },
    {
      id: 'conflict_ninja',
      title: 'Ninja de Résolution 🥷',
      description: 'Défi expert : résoudre 10 conflits réels en 30 jours.',
      category: 'conflict_resolution',
      difficulty: 'expert',
      duration: 30,
      participants: 43,
      maxParticipants: 50,
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      rewards: {
        xp: 2000,
        badge: 'Ninja Résolution',
        communityTitle: 'Maître Pacificateur'
      },
      tasks: [],
      isActive: false,
      userParticipating: false,
      userProgress: 0
    }
  ];

  const leaderboard: ChallengeLeaderboard[] = [
    { rank: 1, username: 'Sarah M.', progress: 95, points: 1847, avatar: '👩‍🦰', badge: 'Empathie Master' },
    { rank: 2, username: 'Alex P.', progress: 87, points: 1654, avatar: '👨‍💼', badge: 'Communication Expert' },
    { rank: 3, username: 'Vous', progress: 65, points: 1205, avatar: '👤' },
    { rank: 4, username: 'Marie L.', progress: 58, points: 1134, avatar: '👩‍🎨' },
    { rank: 5, username: 'Thomas R.', progress: 52, points: 987, avatar: '👨‍🔬' }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'empathy': return <Heart className="h-4 w-4" />;
      case 'communication': return <MessageSquare className="h-4 w-4" />;
      case 'conflict_resolution': return <Target className="h-4 w-4" />;
      case 'mindfulness': return <Star className="h-4 w-4" />;
      default: return <Trophy className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-blue-100 text-blue-700';
      case 'advanced': return 'bg-purple-100 text-purple-700';
      case 'expert': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const joinChallenge = (challengeId: string) => {
    console.log(`Joining challenge: ${challengeId}`);
    // Ici on ferait l'API call
  };

  const completeTask = (challengeId: string, taskId: string) => {
    console.log(`Completing task ${taskId} for challenge ${challengeId}`);
    // Ici on ferait l'API call
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Trophy className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Défis Communautaires</h2>
                <p className="text-white/90">Grandissez ensemble, relevez des défis inspirants</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">1,205 pts</div>
              <div className="text-white/90">Votre score total</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-lg font-bold">3</div>
              <div className="text-sm text-white/80">Défis actifs</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-lg font-bold">12</div>
              <div className="text-sm text-white/80">Défis complétés</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-lg font-bold">3</div>
              <div className="text-sm text-white/80">Rang global</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="current">Actuels</TabsTrigger>
          <TabsTrigger value="upcoming">À venir</TabsTrigger>
          <TabsTrigger value="leaderboard">Classement</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>

        {/* Défis actuels */}
        <TabsContent value="current" className="space-y-4">
          {challenges.filter(c => c.isActive).map((challenge) => (
            <Card key={challenge.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                      {getCategoryIcon(challenge.category)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{challenge.title}</h3>
                      <p className="text-gray-600 mb-3">{challenge.description}</p>
                      
                      <div className="flex gap-2 mb-3">
                        <Badge className={getDifficultyColor(challenge.difficulty)}>
                          {challenge.difficulty}
                        </Badge>
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          {challenge.duration} jours
                        </Badge>
                        <Badge variant="outline">
                          <Users className="h-3 w-3 mr-1" />
                          {challenge.participants} participants
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">+{challenge.rewards.xp}</div>
                    <div className="text-sm text-gray-600">XP</div>
                  </div>
                </div>

                {challenge.userParticipating && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-blue-800">Votre progression</span>
                      <span className="text-blue-600 font-bold">{challenge.userProgress}%</span>
                    </div>
                    <Progress value={challenge.userProgress} className="mb-2" />
                    
                    {challenge.tasks.length > 0 && (
                      <div className="space-y-2 mt-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Tâches du jour :</h4>
                        {challenge.tasks.slice(0, 3).map((task) => (
                          <div key={task.id} className="flex items-center justify-between bg-white p-3 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border-2 ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'} flex items-center justify-center`}>
                                {task.completed && <CheckCircle className="h-3 w-3 text-white" />}
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">{task.title}</p>
                                <p className="text-sm text-gray-600">{task.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-yellow-100 text-yellow-700">
                                +{task.points} pts
                              </Badge>
                              {!task.completed && (
                                <Button size="sm" onClick={() => completeTask(challenge.id, task.id)}>
                                  Compléter
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Se termine le {new Date(challenge.endDate).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    {!challenge.userParticipating && (
                      <Button onClick={() => joinChallenge(challenge.id)}>
                        Rejoindre le défi
                      </Button>
                    )}
                    <Button variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Partager
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Classement */}
        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-600" />
                Classement des Champions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((player) => (
                  <div key={player.rank} className={`flex items-center justify-between p-4 rounded-lg ${player.username === 'Vous' ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                        player.rank === 1 ? 'bg-yellow-500' : 
                        player.rank === 2 ? 'bg-gray-400' : 
                        player.rank === 3 ? 'bg-amber-600' : 'bg-blue-500'
                      }`}>
                        {player.rank}
                      </div>
                      <div className="text-2xl">{player.avatar}</div>
                      <div>
                        <p className="font-semibold text-gray-800">{player.username}</p>
                        {player.badge && (
                          <Badge className="bg-purple-100 text-purple-700 text-xs">
                            {player.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-lg text-gray-800">{player.points} pts</div>
                      <div className="text-sm text-gray-600">{player.progress}% progression</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Défis à venir */}
        <TabsContent value="upcoming" className="space-y-4">
          {challenges.filter(c => !c.isActive).map((challenge) => (
            <Card key={challenge.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-full text-gray-600">
                      {getCategoryIcon(challenge.category)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{challenge.title}</h4>
                      <p className="text-sm text-gray-600">{challenge.description}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge className={getDifficultyColor(challenge.difficulty)}>
                          {challenge.difficulty}
                        </Badge>
                        <Badge variant="outline">
                          <Calendar className="h-3 w-3 mr-1" />
                          Début : {new Date(challenge.startDate).toLocaleDateString()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">
                    S'inscrire
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* CTA pour créer un défi */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Zap className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Créez Votre Propre Défi</h3>
              <p className="text-gray-600">Inspirez la communauté avec vos idées uniques</p>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-green-500 to-blue-500">
            <Gift className="h-4 w-4 mr-2" />
            Proposer un Défi Communautaire
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
