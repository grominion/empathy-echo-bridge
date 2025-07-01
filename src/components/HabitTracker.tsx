
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Circle,
  Target,
  TrendingUp,
  Calendar,
  Award,
  Flame,
  Star,
  Plus,
  Settings,
  BarChart3,
  Clock
} from 'lucide-react';

interface Habit {
  id: string;
  title: string;
  description: string;
  category: string;
  frequency: 'daily' | 'weekly' | 'custom';
  targetCount: number;
  currentStreak: number;
  longestStreak: number;
  completedDays: string[];
  createdAt: string;
  color: string;
  icon: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
}

interface DailyProgress {
  date: string;
  completedHabits: string[];
  totalHabits: number;
  completionRate: number;
}

export const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [weeklyProgress, setWeeklyProgress] = useState<DailyProgress[]>([]);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    // Initialiser avec des habitudes d'exemple
    const mockHabits: Habit[] = [
      {
        id: '1',
        title: 'Pratique d\'écoute active',
        description: 'Pratiquer l\'écoute active dans au moins 3 conversations',
        category: 'Communication',
        frequency: 'daily',
        targetCount: 1,
        currentStreak: 5,
        longestStreak: 12,
        completedDays: ['2024-01-01', '2024-01-02', '2024-01-03'],
        createdAt: '2024-01-01',
        color: 'bg-blue-500',
        icon: '👂',
        difficulty: 'moyen'
      },
      {
        id: '2',
        title: 'Méditation quotidienne',
        description: '10 minutes de méditation pour la gestion émotionnelle',
        category: 'Bien-être',
        frequency: 'daily',
        targetCount: 1,
        currentStreak: 3,
        longestStreak: 8,
        completedDays: ['2024-01-01', '2024-01-02'],
        createdAt: '2024-01-01',
        color: 'bg-purple-500',
        icon: '🧘',
        difficulty: 'facile'
      },
      {
        id: '3',
        title: 'Expression de gratitude',
        description: 'Exprimer sa gratitude à une personne différente',
        category: 'Relations',
        frequency: 'daily',
        targetCount: 1,
        currentStreak: 7,
        longestStreak: 15,
        completedDays: ['2024-01-01', '2024-01-02', '2024-01-03'],
        createdAt: '2024-01-01',
        color: 'bg-green-500',
        icon: '🙏',
        difficulty: 'facile'
      },
      {
        id: '4',
        title: 'Résolution de conflit',
        description: 'Aborder positivement un malentendu ou désaccord',
        category: 'Résolution',
        frequency: 'weekly',
        targetCount: 2,
        currentStreak: 2,
        longestStreak: 4,
        completedDays: ['2024-01-01'],
        createdAt: '2024-01-01',
        color: 'bg-orange-500',
        icon: '🤝',
        difficulty: 'difficile'
      }
    ];

    setHabits(mockHabits);
    generateWeeklyProgress(mockHabits);
  }, []);

  const generateWeeklyProgress = (habits: Habit[]) => {
    const progress: DailyProgress[] = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const completedHabits = habits.filter(habit => 
        habit.completedDays.includes(dateStr)
      ).map(h => h.id);
      
      progress.push({
        date: dateStr,
        completedHabits,
        totalHabits: habits.length,
        completionRate: Math.round((completedHabits.length / habits.length) * 100)
      });
    }
    
    setWeeklyProgress(progress);
  };

  const toggleHabit = (habitId: string, date: string = selectedDate) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const isCompleted = habit.completedDays.includes(date);
        const updatedDays = isCompleted 
          ? habit.completedDays.filter(d => d !== date)
          : [...habit.completedDays, date];
        
        // Recalculer la streak
        let currentStreak = 0;
        const sortedDays = updatedDays.sort().reverse();
        const today = new Date().toISOString().split('T')[0];
        
        if (sortedDays.includes(today)) {
          currentStreak = 1;
          let checkDate = new Date(today);
          checkDate.setDate(checkDate.getDate() - 1);
          
          while (sortedDays.includes(checkDate.toISOString().split('T')[0])) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
          }
        }
        
        return {
          ...habit,
          completedDays: updatedDays,
          currentStreak,
          longestStreak: Math.max(habit.longestStreak, currentStreak)
        };
      }
      return habit;
    }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facile': return 'bg-green-100 text-green-700';
      case 'moyen': return 'bg-yellow-100 text-yellow-700';  
      case 'difficile': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCompletionRate = () => {
    const completedToday = habits.filter(habit => 
      habit.completedDays.includes(selectedDate)
    ).length;
    return Math.round((completedToday / habits.length) * 100);
  };

  const getTotalStreak = () => {
    return habits.reduce((sum, habit) => sum + habit.currentStreak, 0);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', { 
      weekday: 'short', 
      day: 'numeric' 
    });
  };

  const isToday = (dateStr: string) => {
    return dateStr === new Date().toISOString().split('T')[0];
  };

  return (
    <div className="space-y-6">
      {/* Header avec stats */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Suivi d'Habitudes
              </h2>
              <p className="text-gray-600">
                Développez vos compétences relationnelles jour après jour
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">
                {getCompletionRate()}%
              </div>
              <div className="text-sm text-gray-600">Aujourd'hui</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">{habits.length}</div>
              <div className="text-sm text-gray-600">Habitudes actives</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-orange-600">{getTotalStreak()}</div>
              <div className="text-sm text-gray-600">Streak total</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {habits.reduce((max, h) => Math.max(max, h.longestStreak), 0)}
              </div>
              <div className="text-sm text-gray-600">Record personnel</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-sm text-gray-600">Jours actifs</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendrier hebdomadaire */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Progression de la Semaine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weeklyProgress.map((day) => (
              <div
                key={day.date}
                className={`p-3 rounded-lg text-center cursor-pointer transition-colors ${
                  isToday(day.date) 
                    ? 'bg-blue-100 border-2 border-blue-300' 
                    : 'bg-gray-50 hover:bg-gray-100'
                } ${selectedDate === day.date ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedDate(day.date)}
              >
                <div className="text-xs text-gray-600 mb-1">
                  {formatDate(day.date)}
                </div>
                <div className="text-sm font-semibold">
                  {day.completionRate}%
                </div>
                <div className="text-xs text-gray-500">
                  {day.completedHabits.length}/{day.totalHabits}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Liste des habitudes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            Habitudes du {formatDate(selectedDate)}
          </h3>
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Nouvelle Habitude
          </Button>
        </div>

        {habits.map((habit) => {
          const isCompleted = habit.completedDays.includes(selectedDate);
          
          return (
            <Card key={habit.id} className={`transition-all ${isCompleted ? 'bg-green-50 border-green-200' : 'hover:shadow-md'}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 mt-1"
                    onClick={() => toggleHabit(habit.id)}
                  >
                    {isCompleted ? 
                      <CheckCircle className="h-6 w-6 text-green-600" /> : 
                      <Circle className="h-6 w-6 text-gray-400" />
                    }
                  </Button>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{habit.icon}</span>
                          <h4 className={`font-semibold ${isCompleted ? 'text-green-800 line-through' : 'text-gray-800'}`}>
                            {habit.title}
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{habit.description}</p>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Flame className="h-4 w-4 text-orange-500" />
                          <span className="text-sm font-semibold">{habit.currentStreak}</span>
                        </div>
                        <div className="text-xs text-gray-500">jours</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{habit.category}</Badge>
                      <Badge className={getDifficultyColor(habit.difficulty)}>
                        {habit.difficulty}
                      </Badge>
                      {habit.currentStreak >= 7 && (
                        <Badge className="bg-yellow-100 text-yellow-700">
                          <Award className="h-3 w-3 mr-1" />
                          Série !
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Record: {habit.longestStreak} jours</span>
                      <span>{habit.completedDays.length} complétions totales</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bouton statistiques */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-4 text-center">
          <h3 className="font-semibold text-gray-800 mb-2">Analysez Vos Progrès</h3>
          <p className="text-sm text-gray-600 mb-4">
            Découvrez vos tendances et célébrez vos réussites
          </p>
          <Button onClick={() => setShowStats(!showStats)}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Voir les Statistiques
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
