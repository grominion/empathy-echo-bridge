
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star, 
  Medal, 
  Award,
  Target,
  Zap,
  Crown,
  Gem,
  Fire,
  TrendingUp
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  xpReward: number;
  category: 'empathy' | 'communication' | 'growth' | 'consistency';
}

interface UserLevel {
  level: number;
  title: string;
  xpRequired: number;
  benefits: string[];
  color: string;
}

export const GamificationSystem: React.FC = () => {
  const [currentXP, setCurrentXP] = useState(850);
  const [currentLevel, setCurrentLevel] = useState(3);
  const [streak, setStreak] = useState(12);

  const levels: UserLevel[] = [
    {
      level: 1,
      title: "Apprenti Empathique",
      xpRequired: 0,
      benefits: ["Accès aux défis de base", "Journal de réflexion"],
      color: "bg-gray-500"
    },
    {
      level: 2,
      title: "Communicateur Conscient",
      xpRequired: 250,
      benefits: ["Analyses avancées", "Suggestions personnalisées", "Insights comportementaux"],
      color: "bg-blue-500"
    },
    {
      level: 3,
      title: "Constructeur de Relations",
      xpRequired: 750,
      benefits: ["Défis de groupe", "Coaching personnalisé", "Patterns avancés"],
      color: "bg-purple-500"
    },
    {
      level: 4,
      title: "Maître de l'Empathie",
      xpRequired: 1500,
      benefits: ["Mentoring d'autres utilisateurs", "Création de défis", "Statut VIP"],
      color: "bg-orange-500"
    },
    {
      level: 5,
      title: "Coach Relationnel",
      xpRequired: 3000,
      benefits: ["Accès illimité", "Badge d'expert", "Communauté exclusive"],
      color: "bg-yellow-500"
    }
  ];

  const achievements: Achievement[] = [
    {
      id: 'first_analysis',
      title: 'Premier Pas',
      description: 'Complétez votre première analyse de conflit',
      icon: <Target className="h-6 w-6" />,
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      xpReward: 50,
      category: 'empathy'
    },
    {
      id: 'daily_streak_7',
      title: 'Semaine Consistante',
      description: 'Maintenez une série de 7 jours consécutifs',
      icon: <Fire className="h-6 w-6" />,
      unlocked: true,
      progress: 7,
      maxProgress: 7,
      xpReward: 100,
      category: 'consistency'
    },
    {
      id: 'reflections_10',
      title: 'Penseur Profond',
      description: 'Complétez 10 réflexions dans votre journal',
      icon: <Medal className="h-6 w-6" />,
      unlocked: false,
      progress: 7,
      maxProgress: 10,
      xpReward: 150,
      category: 'growth'
    },
    {
      id: 'challenges_completed_5',
      title: 'Défi Accepté',
      description: 'Terminez 5 défis de développement personnel',
      icon: <Trophy className="h-6 w-6" />,
      unlocked: false,
      progress: 3,
      maxProgress: 5,
      xpReward: 200,
      category: 'growth'
    },
    {
      id: 'empathy_master',
      title: 'Maître de l\'Empathie',
      description: 'Atteignez un score d\'empathie de 90%',
      icon: <Crown className="h-6 w-6" />,
      unlocked: false,
      progress: 72,
      maxProgress: 90,
      xpReward: 500,
      category: 'empathy'
    }
  ];

  const currentLevelData = levels.find(l => l.level === currentLevel) || levels[0];
  const nextLevelData = levels.find(l => l.level === currentLevel + 1);
  const progressToNextLevel = nextLevelData ? 
    ((currentXP - currentLevelData.xpRequired) / (nextLevelData.xpRequired - currentLevelData.xpRequired)) * 100 : 100;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'empathy': return 'bg-pink-100 text-pink-700';
      case 'communication': return 'bg-blue-100 text-blue-700';
      case 'growth': return 'bg-green-100 text-green-700';
      case 'consistency': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Level & XP Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Crown className={`h-6 w-6 text-white`} />
              <div className={`px-3 py-1 rounded-full ${currentLevelData.color} text-white font-bold`}>
                Niveau {currentLevel}
              </div>
            </div>
            <h3 className="font-bold text-gray-800 mb-1">{currentLevelData.title}</h3>
            <p className="text-sm text-gray-600">{currentXP} XP</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Fire className="h-6 w-6 text-orange-600" />
              <span className="text-2xl font-bold text-orange-600">{streak}</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Jours Consécutifs</h3>
            <p className="text-sm text-gray-600">Continue comme ça !</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <span className="text-2xl font-bold text-green-600">+125</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-1">XP Cette Semaine</h3>
            <p className="text-sm text-gray-600">Excellent progrès !</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress to Next Level */}
      {nextLevelData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              Progression vers {nextLevelData.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Niveau {currentLevel}</span>
                <span>{currentXP} / {nextLevelData.xpRequired} XP</span>
                <span>Niveau {nextLevelData.level}</span>
              </div>
              <Progress value={progressToNextLevel} className="h-3" />
              <p className="text-sm text-gray-600">
                Plus que {nextLevelData.xpRequired - currentXP} XP pour débloquer de nouveaux avantages !
              </p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Prochains avantages :</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  {nextLevelData.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            Vos Accomplissements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={`${achievement.unlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${achievement.unlocked ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                        {achievement.unlocked && <Badge className="bg-green-100 text-green-700">Débloqué</Badge>}
                        <Badge className={getCategoryColor(achievement.category)}>
                          {achievement.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                      
                      {!achievement.unlocked && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Progrès</span>
                            <span>{achievement.progress} / {achievement.maxProgress}</span>
                          </div>
                          <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 mt-2">
                        <Gem className="h-3 w-3 text-purple-500" />
                        <span className="text-xs text-purple-600 font-medium">+{achievement.xpReward} XP</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Motivation Message */}
      <Card className="bg-gradient-to-r from-purple-50 via-blue-50 to-green-50 border-2 border-purple-200">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Award className="h-6 w-6 text-purple-600" />
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
              Vous Êtes Sur la Bonne Voie !
            </h3>
          </div>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Chaque XP que vous gagnez représente une vraie amélioration dans vos relations. 
            Vous ne collectez pas juste des points - vous devenez une meilleure version de vous-même.
          </p>
          <div className="flex justify-center gap-3">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500">
              <Target className="h-4 w-4 mr-2" />
              Nouveau Défi
            </Button>
            <Button variant="outline">
              <Trophy className="h-4 w-4 mr-2" />
              Partager mes Progrès
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
