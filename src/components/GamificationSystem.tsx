
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star, 
  Target, 
  Award,
  Flame,
  Crown,
  Heart,
  Brain,
  Users,
  MessageSquare,
  Calendar,
  Zap,
  Gift,
  Medal,
  Sparkles
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  unlockedAt?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
}

interface UserLevel {
  current: number;
  xp: number;
  xpForNext: number;
  title: string;
}

export const GamificationSystem: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'achievements' | 'levels' | 'leaderboard' | 'rewards'>('achievements');

  const userLevel: UserLevel = {
    current: 5,
    xp: 2150,
    xpForNext: 2500,
    title: "Médiateur Expérimenté"
  };

  const achievements: Achievement[] = [
    {
      id: 'first_analysis',
      title: 'Premier Pas',
      description: 'Votre première analyse de conflit complétée',
      icon: <Star className="h-5 w-5" />,
      unlocked: true,
      unlockedAt: '2024-12-20',
      rarity: 'common',
      xpReward: 50
    },
    {
      id: 'empathy_master',
      title: 'Maître de l\'Empathie',
      description: 'Atteignez 90% de score d\'empathie',
      icon: <Heart className="h-5 w-5" />,
      unlocked: true,
      unlockedAt: '2024-12-25',
      rarity: 'epic',
      xpReward: 200
    },
    {
      id: 'streak_7',
      title: 'Série Dorée',
      description: '7 jours consécutifs d\'utilisation',
      icon: <Flame className="h-5 w-5" />,
      unlocked: true,
      unlockedAt: '2024-12-28',
      rarity: 'rare',
      xpReward: 150
    },
    {
      id: 'community_helper',
      title: 'Pilier de la Communauté',
      description: 'Aidez 10 personnes sur le forum',
      icon: <Users className="h-5 w-5" />,
      unlocked: false,
      rarity: 'rare',
      xpReward: 175
    },
    {
      id: 'conflict_resolver',
      title: 'Résolveur de Conflits',
      description: 'Résolvez 25 conflits avec succès',
      icon: <Target className="h-5 w-5" />,
      unlocked: false,
      rarity: 'epic',
      xpReward: 250
    },
    {
      id: 'wisdom_seeker',
      title: 'Chercheur de Sagesse',
      description: 'Complétez 50 exercices de réflexion',
      icon: <Brain className="h-5 w-5" />,
      unlocked: false,
      rarity: 'legendary',
      xpReward: 500
    }
  ];

  const levels = [
    { level: 1, title: "Débutant Bienveillant", xpRequired: 0, color: "bg-gray-200" },
    { level: 2, title: "Apprenti Empathique", xpRequired: 100, color: "bg-green-200" },
    { level: 3, title: "Communicateur Conscient", xpRequired: 300, color: "bg-blue-200" },
    { level: 4, title: "Médiateur Avisé", xpRequired: 600, color: "bg-purple-200" },
    { level: 5, title: "Médiateur Expérimenté", xpRequired: 1000, color: "bg-orange-200" },
    { level: 6, title: "Expert Relationnel", xpRequired: 1500, color: "bg-red-200" },
    { level: 7, title: "Sage Connecté", xpRequired: 2500, color: "bg-yellow-200" },
    { level: 8, title: "Maître de l'Harmonie", xpRequired: 4000, color: "bg-pink-200" },
    { level: 9, title: "Ambassadeur de Paix", xpRequired: 6000, color: "bg-indigo-200" },
    { level: 10, title: "Légende Vivante", xpRequired: 10000, color: "bg-gradient-to-r from-yellow-300 to-orange-400" }
  ];

  const leaderboard = [
    { rank: 1, name: "Sarah M.", level: 8, xp: 5420, badge: "Maître de l'Harmonie" },
    { rank: 2, name: "Alex P.", level: 7, xp: 3890, badge: "Sage Connecté" },
    { rank: 3, name: "Marie L.", level: 6, xp: 2980, badge: "Expert Relationnel" },
    { rank: 4, name: "Thomas R.", level: 6, xp: 2750, badge: "Expert Relationnel" },
    { rank: 5, name: "Vous", level: userLevel.current, xp: userLevel.xp, badge: userLevel.title },
    { rank: 6, name: "Julie D.", level: 5, xp: 1920, badge: "Médiateur Expérimenté" },
    { rank: 7, name: "Marc B.", level: 4, xp: 1580, badge: "Médiateur Avisé" }
  ];

  const rewards = [
    { id: 'theme_gold', name: 'Thème Doré', cost: 500, description: 'Interface élégante dorée', icon: <Crown className="h-5 w-5" /> },
    { id: 'avatar_premium', name: 'Avatar Premium', cost: 300, description: 'Collection d\'avatars exclusifs', icon: <Star className="h-5 w-5" /> },
    { id: 'coach_session', name: 'Session Coach Premium', cost: 800, description: '1h de coaching personnalisé', icon: <MessageSquare className="h-5 w-5" /> },
    { id: 'early_access', name: 'Accès Anticipé', cost: 1000, description: 'Nouvelles fonctionnalités en avant-première', icon: <Zap className="h-5 w-5" /> }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'rare': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'epic': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'legendary': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const progressToNext = (userLevel.xp / userLevel.xpForNext) * 100;

  return (
    <div className="space-y-6">
      {/* Header avec niveau actuel */}
      <Card className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Crown className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Niveau {userLevel.current}</h2>
                <p className="text-white/90">{userLevel.title}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{userLevel.xp} XP</p>
              <p className="text-white/90">{userLevel.xpForNext - userLevel.xp} XP pour le niveau suivant</p>
            </div>
          </div>
          
          <Progress value={progressToNext} className="h-3 bg-white/20" />
          <p className="text-sm text-white/80 mt-2">
            {Math.round(progressToNext)}% vers {levels[userLevel.current]?.title || 'Niveau Maximum'}
          </p>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={selectedCategory === 'achievements' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('achievements')}
          className="flex items-center gap-2"
        >
          <Trophy className="h-4 w-4" />
          Succès
        </Button>
        <Button
          variant={selectedCategory === 'levels' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('levels')}
          className="flex items-center gap-2"
        >
          <Target className="h-4 w-4" />
          Niveaux
        </Button>
        <Button
          variant={selectedCategory === 'leaderboard' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('leaderboard')}
          className="flex items-center gap-2"
        >
          <Medal className="h-4 w-4" />
          Classement
        </Button>
        <Button
          variant={selectedCategory === 'rewards' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('rewards')}
          className="flex items-center gap-2"
        >
          <Gift className="h-4 w-4" />
          Récompenses
        </Button>
      </div>

      {/* Contenu selon la catégorie */}
      {selectedCategory === 'achievements' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className={`${achievement.unlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${achievement.unlocked ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                      <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                        {achievement.rarity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">+{achievement.xpReward} XP</span>
                      {achievement.unlocked && achievement.unlockedAt && (
                        <span className="text-xs text-green-600">
                          Débloqué le {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedCategory === 'levels' && (
        <div className="space-y-4">
          {levels.map((level, index) => (
            <Card key={level.level} className={`${level.level <= userLevel.current ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${level.color}`}>
                      {level.level}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{level.title}</h4>
                      <p className="text-sm text-gray-600">{level.xpRequired} XP requis</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {level.level <= userLevel.current && (
                      <Badge className="bg-green-100 text-green-700">
                        <Award className="h-3 w-3 mr-1" />
                        Atteint
                      </Badge>
                    )}
                    {level.level === userLevel.current && (
                      <Badge className="bg-blue-100 text-blue-700">
                        <Star className="h-3 w-3 mr-1" />
                        Actuel
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedCategory === 'leaderboard' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              Classement de la Communauté
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard.map((player) => (
                <div key={player.rank} className={`flex items-center justify-between p-3 rounded-lg ${player.name === 'Vous' ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                      player.rank === 1 ? 'bg-yellow-500' : 
                      player.rank === 2 ? 'bg-gray-400' : 
                      player.rank === 3 ? 'bg-amber-600' : 'bg-blue-500'
                    }`}>
                      {player.rank}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{player.name}</p>
                      <p className="text-sm text-gray-600">{player.badge}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">Niveau {player.level}</p>
                    <p className="text-sm text-gray-600">{player.xp} XP</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedCategory === 'rewards' && (
        <div className="grid md:grid-cols-2 gap-4">
          {rewards.map((reward) => (
            <Card key={reward.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                    {reward.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">{reward.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-purple-100 text-purple-700">
                        {reward.cost} XP
                      </Badge>
                      <Button size="sm" disabled={userLevel.xp < reward.cost}>
                        {userLevel.xp >= reward.cost ? 'Échanger' : 'XP insuffisant'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Prochains objectifs */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Sparkles className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Prochains Objectifs</h3>
              <p className="text-gray-600">Continuez votre progression !</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Objectif Proche</h4>
              <p className="text-sm text-gray-600 mb-2">Atteindre le niveau 6</p>
              <Progress value={((userLevel.xp - 1000) / (1500 - 1000)) * 100} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">
                {1500 - userLevel.xp} XP restants
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Prochain Succès</h4>
              <p className="text-sm text-gray-600">Pilier de la Communauté</p>
              <p className="text-xs text-gray-500 mt-1">
                Aidez 10 personnes sur le forum (+175 XP)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
