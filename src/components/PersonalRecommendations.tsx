
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Heart,
  BookOpen,
  Users,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle,
  Star,
  Lightbulb
} from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'exercise' | 'challenge' | 'content' | 'connection';
  title: string;
  description: string;
  reason: string;
  priority: number;
  estimatedTime: string;
  category: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
  impact: number;
  completionRate?: number;
}

interface UserProgress {
  empathyScore: number;
  communicationSkill: number;
  conflictResolution: number;
  emotionalIntelligence: number;
  recentAreas: string[];
  weakAreas: string[];
  strengths: string[];
}

export const PersonalRecommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    // Simuler les données utilisateur
    const mockUserProgress: UserProgress = {
      empathyScore: 72,
      communicationSkill: 65,
      conflictResolution: 58,
      emotionalIntelligence: 70,
      recentAreas: ['Conflits Professionnels', 'Communication Familiale'],
      weakAreas: ['Gestion de Colère', 'Expression Émotionnelle'],
      strengths: ['Écoute Active', 'Empathie']
    };

    const mockRecommendations: Recommendation[] = [
      {
        id: '1',
        type: 'exercise',
        title: 'Exercice de Respiration Anti-Colère',
        description: 'Technique de respiration 4-7-8 pour gérer les pics de colère',
        reason: 'Vous avez mentionné des difficultés avec la gestion de colère',
        priority: 9,
        estimatedTime: '5 min',
        category: 'Gestion Émotionnelle',
        difficulty: 'facile',
        impact: 85,
        completionRate: 78
      },
      {
        id: '2',
        type: 'challenge',
        title: 'Défi 7 Jours - Expression Positive',
        description: 'Chaque jour, exprimez une émotion positive à une personne différente',
        reason: 'Pour améliorer votre score en expression émotionnelle',
        priority: 8,
        estimatedTime: '10 min/jour',
        category: 'Communication',
        difficulty: 'moyen',
        impact: 75
      },
      {
        id: '3',
        type: 'content',
        title: 'Guide: Résoudre les Conflits en 5 Étapes',
        description: 'Méthode structurée basée sur la communication non-violente',
        reason: 'Votre score en résolution de conflits peut être amélioré',
        priority: 7,
        estimatedTime: '15 min',
        category: 'Résolution de Conflits',
        difficulty: 'moyen',
        impact: 80
      },
      {
        id: '4',
        type: 'connection',
        title: 'Rejoindre le Groupe "Parents Bienveillants"',
        description: 'Communauté dédiée à la communication familiale positive',
        reason: 'Basé sur vos analyses récentes sur la famille',
        priority: 6,
        estimatedTime: '30 min',
        category: 'Communauté',
        difficulty: 'facile',
        impact: 70
      },
      {
        id: '5',
        type: 'exercise',
        title: 'Pratique Miroir Empathique',
        description: 'Exercice pour développer votre capacité à refléter les émotions',
        reason: 'Renforcez votre point fort en empathie',
        priority: 5,
        estimatedTime: '12 min',
        category: 'Empathie',
        difficulty: 'difficile',
        impact: 65
      }
    ];

    setUserProgress(mockUserProgress);
    setRecommendations(mockRecommendations.sort((a, b) => b.priority - a.priority));
  }, []);

  const categories = ['all', 'Gestion Émotionnelle', 'Communication', 'Résolution de Conflits', 'Empathie', 'Communauté'];

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(r => r.category === selectedCategory);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'exercise': return <Target className="h-5 w-5" />;
      case 'challenge': return <TrendingUp className="h-5 w-5" />;
      case 'content': return <BookOpen className="h-5 w-5" />;
      case 'connection': return <Users className="h-5 w-5" />;
      default: return <Sparkles className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'exercise': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'challenge': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'content': return 'bg-green-50 text-green-700 border-green-200';
      case 'connection': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facile': return 'bg-green-100 text-green-700';
      case 'moyen': return 'bg-yellow-100 text-yellow-700';
      case 'difficile': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header avec aperçu des progrès */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-indigo-600" />
            Recommandations Personnalisées
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userProgress && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Vos Forces</h4>
                  <div className="space-y-2">
                    {userProgress.strengths.map((strength, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-700">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Axes d'Amélioration</h4>
                  <div className="space-y-2">
                    {userProgress.weakAreas.map((area, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-orange-600" />
                        <span className="text-sm text-gray-700">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">{userProgress.empathyScore}%</div>
                  <div className="text-xs text-gray-600">Empathie</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{userProgress.communicationSkill}%</div>
                  <div className="text-xs text-gray-600">Communication</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{userProgress.conflictResolution}%</div>
                  <div className="text-xs text-gray-600">Résolution</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{userProgress.emotionalIntelligence}%</div>
                  <div className="text-xs text-gray-600">Intelligence Émot.</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Filtres */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="whitespace-nowrap"
          >
            {category === 'all' ? 'Toutes' : category}
          </Button>
        ))}
      </div>

      {/* Liste des recommandations */}
      <div className="grid gap-4">
        {filteredRecommendations.map((rec) => (
          <Card key={rec.id} className={`hover:shadow-lg transition-shadow border ${getTypeColor(rec.type)}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-white/50">
                  {getTypeIcon(rec.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">{rec.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-semibold">{rec.impact}%</span>
                      </div>
                      <div className="text-xs text-gray-500">Impact</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {rec.estimatedTime}
                    </div>
                    <Badge className={getDifficultyColor(rec.difficulty)}>
                      {rec.difficulty}
                    </Badge>
                    <Badge variant="outline">
                      {rec.category}
                    </Badge>
                  </div>
                  
                  <div className="bg-yellow-50 p-2 rounded text-xs text-yellow-800 mb-3">
                    <Lightbulb className="h-3 w-3 inline mr-1" />
                    {rec.reason}
                  </div>
                  
                  {rec.completionRate && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Taux de réussite communautaire</span>
                        <span>{rec.completionRate}%</span>
                      </div>
                      <Progress value={rec.completionRate} className="h-2" />
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Commencer
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                    <Button size="sm" variant="outline">
                      Plus tard
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
