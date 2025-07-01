
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
  Lightbulb,
  Filter,
  Zap
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
  const [showFilters, setShowFilters] = useState(false);

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
      case 'exercise': return <Target className="h-4 w-4 sm:h-5 sm:w-5" />;
      case 'challenge': return <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />;
      case 'content': return <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />;
      case 'connection': return <Users className="h-4 w-4 sm:h-5 sm:w-5" />;
      default: return <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />;
    }
  };

  const getTypeGradient = (type: string) => {
    switch (type) {
      case 'exercise': return 'from-blue-500 to-cyan-500';
      case 'challenge': return 'from-purple-500 to-pink-500';
      case 'content': return 'from-green-500 to-emerald-500';
      case 'connection': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facile': return 'bg-green-100 text-green-700 border-green-200';
      case 'moyen': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'difficile': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-1 sm:px-0">
      {/* Header with progress overview - Mobile optimized */}
      <Card className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-indigo-200 shadow-lg">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
            Recommandations IA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {userProgress && (
            <>
              {/* Mobile-first stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="text-center p-3 bg-white/60 rounded-xl backdrop-blur-sm">
                  <div className="text-xl sm:text-2xl font-bold text-indigo-600">{userProgress.empathyScore}%</div>
                  <div className="text-xs sm:text-sm text-gray-600">Empathie</div>
                </div>
                <div className="text-center p-3 bg-white/60 rounded-xl backdrop-blur-sm">
                  <div className="text-xl sm:text-2xl font-bold text-purple-600">{userProgress.communicationSkill}%</div>
                  <div className="text-xs sm:text-sm text-gray-600">Communication</div>
                </div>
                <div className="text-center p-3 bg-white/60 rounded-xl backdrop-blur-sm">
                  <div className="text-xl sm:text-2xl font-bold text-orange-600">{userProgress.conflictResolution}%</div>
                  <div className="text-xs sm:text-sm text-gray-600">Résolution</div>
                </div>
                <div className="text-center p-3 bg-white/60 rounded-xl backdrop-blur-sm">
                  <div className="text-xl sm:text-2xl font-bold text-green-600">{userProgress.emotionalIntelligence}%</div>
                  <div className="text-xs sm:text-sm text-gray-600">Intelligence Émot.</div>
                </div>
              </div>

              {/* Strengths and Areas for improvement - Mobile optimized */}
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-white/60 rounded-xl p-4 backdrop-blur-sm">
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">Vos Forces</h4>
                  <div className="space-y-2">
                    {userProgress.strengths.map((strength, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-700">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white/60 rounded-xl p-4 backdrop-blur-sm">
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">Axes d'Amélioration</h4>
                  <div className="space-y-2">
                    {userProgress.weakAreas.map((area, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Target className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-700">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Mobile-first filter system */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="sm:hidden bg-white shadow-sm border-slate-200"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtres ({selectedCategory === 'all' ? 'Toutes' : selectedCategory})
        </Button>

        {/* Desktop filters */}
        <div className="hidden sm:flex gap-2 overflow-x-auto pb-2">
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

        {/* Mobile filters dropdown */}
        {showFilters && (
          <div className="sm:hidden bg-white rounded-xl shadow-lg border border-slate-200 p-3 animate-accordion-down">
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowFilters(false);
                  }}
                  className="text-xs"
                >
                  {category === 'all' ? 'Toutes' : category}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recommendations list - Enhanced mobile design */}
      <div className="space-y-4">
        {filteredRecommendations.map((rec, index) => (
          <Card 
            key={rec.id} 
            className="group hover:shadow-xl transition-all duration-300 border-slate-200 bg-white hover:bg-gradient-to-br hover:from-white hover:to-slate-50 transform hover:scale-[1.02]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Icon with gradient background */}
                <div className={`flex-shrink-0 p-3 sm:p-4 rounded-2xl bg-gradient-to-br ${getTypeGradient(rec.type)} shadow-lg self-start`}>
                  <div className="text-white">
                    {getTypeIcon(rec.type)}
                  </div>
                </div>
                
                <div className="flex-1 space-y-3 sm:space-y-4">
                  {/* Header with mobile-optimized layout */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-base sm:text-lg mb-1 group-hover:text-indigo-700 transition-colors">
                        {rec.title}
                      </h4>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {rec.description}
                      </p>
                    </div>
                    
                    {/* Impact score - repositioned for mobile */}
                    <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1 self-start">
                      <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs sm:text-sm font-bold shadow-md">
                        <Zap className="h-3 w-3" />
                        {rec.impact}%
                      </div>
                      <div className="text-xs text-gray-500 hidden sm:block">Impact</div>
                    </div>
                  </div>
                  
                  {/* Metadata - improved mobile layout */}
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg">
                      <Clock className="h-3 w-3" />
                      {rec.estimatedTime}
                    </div>
                    <Badge className={`${getDifficultyColor(rec.difficulty)} text-xs border`}>
                      {rec.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-slate-300">
                      {rec.category}
                    </Badge>
                  </div>
                  
                  {/* AI reasoning - enhanced styling */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-3 rounded-xl">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">
                        {rec.reason}
                      </p>
                    </div>
                  </div>
                  
                  {/* Success rate - mobile optimized */}
                  {rec.completionRate && (
                    <div className="bg-white border border-slate-200 rounded-xl p-3">
                      <div className="flex justify-between items-center text-xs sm:text-sm text-gray-600 mb-2">
                        <span>Taux de réussite communautaire</span>
                        <span className="font-semibold text-green-600">{rec.completionRate}%</span>
                      </div>
                      <Progress value={rec.completionRate} className="h-2" />
                    </div>
                  )}
                  
                  {/* Action buttons - mobile optimized */}
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200 group"
                      size="sm"
                    >
                      <span>Commencer</span>
                      <ArrowRight className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="sm:w-auto border-slate-300 hover:bg-slate-50"
                    >
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
