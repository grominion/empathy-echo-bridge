
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Flame, 
  Target, 
  Star, 
  Calendar,
  TrendingUp,
  Heart,
  Zap,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

interface StreakInfo {
  current: number;
  best: number;
  lastActive: string;
}

export const MotivationNotifications: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [streak, setStreak] = useState<StreakInfo>({ current: 3, best: 7, lastActive: new Date().toISOString() });
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const navigate = useNavigate();

  const achievements: Achievement[] = [
    {
      id: 'first_analysis',
      title: 'Premier Pas',
      description: 'Votre première analyse complétée !',
      icon: <Star className="h-4 w-4" />,
      unlocked: true
    },
    {
      id: 'streak_3',
      title: 'En Feu ! 🔥',
      description: '3 jours consécutifs d\'utilisation',
      icon: <Flame className="h-4 w-4" />,
      unlocked: streak.current >= 3
    },
    {
      id: 'analyses_10',
      title: 'Expert en Communication',
      description: 'Complétez 10 analyses',
      icon: <Trophy className="h-4 w-4" />,
      unlocked: false,
      progress: 7,
      maxProgress: 10
    },
    {
      id: 'favorites_5',
      title: 'Collectionneur',
      description: 'Ajoutez 5 analyses aux favoris',
      icon: <Heart className="h-4 w-4" />,
      unlocked: false,
      progress: 2,
      maxProgress: 5
    }
  ];

  const motivationalMessages = [
    "Votre série de 3 jours continue ! Continuez comme ça ! 🔥",
    "Chaque conflit résolu vous rend plus sage 🧠",
    "Vous progressez vers le badge 'Expert' ! 🏆",
    "Votre empathie grandit à chaque utilisation 💝"
  ];

  useEffect(() => {
    // Simuler la vérification des achievements et streaks
    const timer = setTimeout(() => {
      if (streak.current === 3 && !achievements.find(a => a.id === 'streak_3')?.unlocked) {
        setNewAchievement(achievements.find(a => a.id === 'streak_3') || null);
        setShowNotification(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const dailyTip = {
    title: "💡 Conseil du jour",
    content: "L'écoute active commence par poser des questions ouvertes. Essayez 'Comment vous sentez-vous par rapport à...' au lieu de 'Êtes-vous en colère ?'"
  };

  if (!showNotification && !newAchievement) return null;

  return (
    <>
      {/* Notification de streak */}
      {showNotification && (
        <Card className="fixed top-20 right-4 z-50 w-80 shadow-lg border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-100 rounded-full">
                  <Flame className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Série de {streak.current} jours ! 🔥
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-orange-100 text-orange-800 text-xs">
                      Actuel: {streak.current} jours
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Record: {streak.best} jours
                    </Badge>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotification(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Nouveau badge achievement */}
      {newAchievement && (
        <Card className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-96 shadow-2xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
          <CardContent className="p-6 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Nouveau Badge Débloqué ! 🎉
              </h3>
              <h4 className="text-lg font-semibold text-blue-700 mb-1">
                {newAchievement.title}
              </h4>
              <p className="text-gray-600 text-sm">
                {newAchievement.description}
              </p>
            </div>
            
            <div className="flex gap-2 justify-center">
              <Button
                onClick={() => {
                  setNewAchievement(null);
                  navigate('/dashboard');
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-600"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Voir mes badges
              </Button>
              <Button
                variant="outline"
                onClick={() => setNewAchievement(null)}
              >
                Continuer
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Conseil du jour (widget flottant) */}
      <Card className="fixed bottom-4 right-4 z-40 w-80 shadow-lg bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-l-green-500">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-100 rounded-full">
              <Zap className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 text-sm mb-1">
                {dailyTip.title}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {dailyTip.content}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
