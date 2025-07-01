
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Star,
  Award,
  Target,
  Crown,
  Gem,
  Gift,
  Zap,
  Heart,
  Users,
  TrendingUp,
  Calendar,
  CheckCircle,
  Lock,
  Sparkles,
  Medal
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'communication' | 'empathy' | 'resolution' | 'growth' | 'community';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'legendary';
  points: number;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedAt?: string;
  icon: string;
  requirements: string[];
  reward: {
    type: 'badge' | 'feature' | 'cosmetic' | 'boost';
    description: string;
  };
}

interface UserStats {
  totalPoints: number;
  level: number;
  nextLevelPoints: number;
  streak: number;
  completedAchievements: number;
  rank: string;
  badges: string[];
}

export const AchievementSystem: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [recentUnlocks, setRecentUnlocks] = useState<Achievement[]>([]);

  useEffect(() => {
    const mockAchievements: Achievement[] = [
      {
        id: '1',
        title: 'Premier Pas',
        description: 'Complétez votre première analyse de conflit',
        category: 'growth',
        tier: 'bronze',
        points: 50,
        progress: 1,
        maxProgress: 1,
        unlocked: true,
        unlockedAt: '2024-01-01T10:00:00Z',
        icon: '🎯',
        requirements: ['Terminer 1 analyse'],
        reward: {
          type: 'badge',
          description: 'Badge "Débutant Empathique"'
        }
      },
      {
        id: '2',
        title: 'Écoute Active',
        description: 'Démontrez des compétences d\'écoute exceptionnelles dans 10 analyses',
        category: 'communication',
        tier: 'silver',
        points: 150,
        progress: 7,
        maxProgress: 10,
        unlocked: false,
        icon: '👂',
        requirements: ['Score écoute > 80% dans 10 analyses'],
        reward: {
          type: 'feature',
          description: 'Accès aux analyses avancées'
        }
      },
      {
        id: '3',
        title: 'Cœur Compatissant',
        description: 'Maintenez un score d\'empathie élevé pendant 30 jours',
        category: 'empathy',
        tier: 'gold',
        points: 300,
        progress: 18,
        maxProgress: 30,
        unlocked: false,
        icon: '💖',
        requirements: ['Score empathie > 85% pendant 30 jours'],
        reward: {
          type: 'cosmetic',
          description: 'Avatar doré spécial'
        }
      },
      {
        id: '4',
        title: 'Médiateur Expert',
        description: 'Résolvez 25 conflits avec succès',
        category: 'resolution',
        tier: 'gold',
        points: 400,
        progress: 12,
        maxProgress: 25,
        unlocked: false,
        icon: '🤝',
        requirements: ['25 résolutions réussies', 'Score > 90%'],
        reward: {
          type: 'badge',
          description: 'Titre "Médiateur Certifié"'
        }
      },
      {
        id: '5',
        title: 'Mentor Bienveillant',
        description: 'Aidez 5 membres de la communauté',
        category: 'community',
        tier: 'platinum',
        points: 500,
        progress: 2,
        maxProgress: 5,
        unlocked: false,
        icon: '🌟',
        requirements: ['Mentor 5 personnes', 'Note > 4.5/5'],
        reward: {
          type: 'feature',
          description: 'Accès au programme de mentorat avancé'
        }
      },
      {
        id: '6',
        title: 'Légende Empathique',
        description: 'Atteignez le niveau maximum dans toutes les compétences',
        category: 'growth',
        tier: 'legendary',
        points: 1000,
        progress: 0,
        maxProgress: 1,
        unlocked: false,
        icon: '👑',
        requirements: ['Niveau 10 partout', '100 analyses', '50 mentorés'],
        reward: {
          type: 'cosmetic',
          description: 'Couronne légendaire et titre permanent'
        }
      }
    ];

    const mockUserStats: UserStats = {
      totalPoints: 850,
      level: 6,
      nextLevelPoints: 1000,
      streak: 12,
      completedAchievements: 8,
      rank: 'Empathique Avancé',
      badges: ['🎯', '💖', '🤝']
    };

    setAchievements(mockAchievements);
    setUserStats(mockUserStats);
    
    // Récents débloqués
    setRecentUnlocks(mockAchievements.filter(a => a.unlocked).slice(0, 3));
  }, []);

  const categories = [
    { id: 'all', label: 'Tous', icon: Trophy },
    { id: 'communication', label: 'Communication', icon: Users },
    { id: 'empathy', label: 'Empathie', icon: Heart },
    { id: 'resolution', label: 'Résolution', icon: Target },
    { id: 'growth', label: 'Croissance', icon: TrendingUp },
    { id: 'community', label: 'Communauté', icon: Users }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'bg-amber-600 text-white';
      case 'silver': return 'bg-gray-400 text-white';
      case 'gold': return 'bg-yellow-500 text-white';
      case 'platinum': return 'bg-indigo-600 text-white';
      case 'legendary': return 'bg-gradient-to-r from-purple-600 to-pink-600 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'bronze': return <Medal className="h-4 w-4" />;
      case 'silver': return <Award className="h-4 w-4" />;
      case 'gold': return <Trophy className="h-4 w-4" />;
      case 'platinum': return <Gem className="h-4 w-4" />;
      case 'legendary': return <Crown className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  const getCompletionPercentage = () => {
    return Math.round((unlockedAchievements.length / achievements.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header avec stats utilisateur */}
      <Card className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Système de Récompenses</h2>
              <p className="text-white/90">Célébrez vos progrès et débloquez des récompenses</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{userStats?.level}</div>
              <div className="text-sm text-white/80">Niveau</div>
            </div>
          </div>

          {userStats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{userStats.totalPoints}</div>
                <div className="text-sm text-white/80">Points totaux</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{userStats.completedAchievements}</div>
                <div className="text-sm text-white/80">Succès débloqués</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{userStats.streak}</div>
                <div className="text-sm text-white/80">Jours consécutifs</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{getCompletionPercentage()}%</div>
                <div className="text-sm text-white/80">Progression</div>
              </div>
            </div>
          )}

          {userStats && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Progression niveau {userStats.level + 1}</span>
                <span>{userStats.totalPoints}/{userStats.nextLevelPoints} pts</span>
              </div>
              <Progress 
                value={(userStats.totalPoints / userStats.nextLevelPoints) * 100} 
                className="h-3 bg-white/20"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Récents débloqués */}
      {recentUnlocks.length > 0 && (
        <Card className="border-2 border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <Sparkles className="h-5 w-5" />
              Récemment Débloqués
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 overflow-x-auto">
              {recentUnlocks.map((achievement) => (
                <div key={achievement.id} className="flex-shrink-0 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl mb-2">
                    {achievement.icon}
                  </div>
                  <div className="text-sm font-semibold text-yellow-800">{achievement.title}</div>
                  <div className="text-xs text-yellow-600">+{achievement.points} pts</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation par catégorie */}
      <div className="overflow-x-auto">
        <div className="flex gap-2 pb-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {category.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Onglets succès */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Tous ({achievements.length})</TabsTrigger>
          <TabsTrigger value="unlocked">Débloqués ({unlockedAchievements.length})</TabsTrigger>
          <TabsTrigger value="locked">À débloquer ({lockedAchievements.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          <AchievementGrid achievements={filteredAchievements} />
        </TabsContent>

        <TabsContent value="unlocked" className="space-y-4 mt-6">
          <AchievementGrid achievements={filteredAchievements.filter(a => a.unlocked)} />
        </TabsContent>

        <TabsContent value="locked" className="space-y-4 mt-6">
          <AchievementGrid achievements={filteredAchievements.filter(a => !a.unlocked)} />
        </TabsContent>
      </Tabs>
    </div>
  );

  function AchievementGrid({ achievements }: { achievements: Achievement[] }) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <Card 
            key={achievement.id} 
            className={`transition-all hover:shadow-lg ${
              achievement.unlocked 
                ? 'border-green-200 bg-green-50' 
                : 'border-gray-200 hover:border-purple-300'
            } ${!achievement.unlocked && achievement.progress === 0 ? 'opacity-60' : ''}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className={`p-3 rounded-full ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-br from-green-400 to-green-600' 
                    : achievement.progress > 0 
                      ? 'bg-gradient-to-br from-blue-400 to-purple-600'
                      : 'bg-gray-300'
                } text-white text-xl flex items-center justify-center relative`}>
                  {achievement.unlocked ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : achievement.progress === 0 ? (
                    <Lock className="h-5 w-5" />
                  ) : (
                    achievement.icon
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                    <Badge className={`${getTierColor(achievement.tier)} text-xs`}>
                      {getTierIcon(achievement.tier)}
                      <span className="ml-1 capitalize">{achievement.tier}</span>
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                </div>
              </div>

              {!achievement.unlocked && (
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progression</span>
                    <span>{achievement.progress}/{achievement.maxProgress}</span>
                  </div>
                  <Progress 
                    value={(achievement.progress / achievement.maxProgress) * 100} 
                    className="h-2"
                  />
                </div>
              )}

              <div className="space-y-2 mb-3">
                <div className="text-sm font-medium text-gray-700">Prérequis:</div>
                <ul className="text-xs text-gray-600 space-y-1">
                  {achievement.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-2 rounded text-xs text-gray-700 mb-3">
                <div className="font-medium mb-1">Récompense:</div>
                <div className="flex items-center gap-1">
                  <Gift className="h-3 w-3" />
                  {achievement.reward.description}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-purple-600">
                  <Star className="h-4 w-4" />
                  <span className="font-semibold">{achievement.points} pts</span>
                </div>
                
                {achievement.unlocked && achievement.unlockedAt && (
                  <div className="text-xs text-gray-500">
                    Débloqué le {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
};
