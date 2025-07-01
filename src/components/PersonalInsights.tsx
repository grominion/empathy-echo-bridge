
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  TrendingUp, 
  Heart, 
  Target,
  BarChart3,
  PieChart,
  Calendar,
  Users,
  MessageSquare,
  Lightbulb,
  Award,
  ArrowUp,
  ArrowDown,
  Minus,
  Sparkles,
  Clock,
  CheckCircle,
  AlertCircle,
  Star
} from 'lucide-react';

interface InsightData {
  empathyScore: number;
  communicationScore: number;
  conflictResolutionScore: number;
  emotionalIntelligenceScore: number;
  weeklyProgress: Array<{ week: string; score: number }>;
  strongPoints: string[];
  improvementAreas: string[];
  recentAchievements: string[];
  upcomingGoals: string[];
  dailyMood: Array<{ date: string; mood: number }>;
  interactionStats: {
    conversationsAnalyzed: number;
    conflictsResolved: number;
    empathyMoments: number;
    communicationWins: number;
  };
}

interface Recommendation {
  type: 'strength' | 'improvement' | 'goal';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  timeframe: string;
}

export const PersonalInsights: React.FC = () => {
  const [insightData, setInsightData] = useState<InsightData | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter'>('week');

  useEffect(() => {
    // Simuler des données d'insights
    const mockData: InsightData = {
      empathyScore: 78,
      communicationScore: 72,
      conflictResolutionScore: 65,
      emotionalIntelligenceScore: 74,
      weeklyProgress: [
        { week: 'S1', score: 65 },
        { week: 'S2', score: 68 },
        { week: 'S3', score: 71 },
        { week: 'S4', score: 74 },
      ],
      strongPoints: [
        'Écoute active excellente',
        'Empathie naturelle développée',
        'Gestion du stress en amélioration',
        'Communication non-violente'
      ],
      improvementAreas: [
        'Expression des émotions négatives',
        'Gestion des conflits en groupe',
        'Assertivité dans les négociations',
        'Régulation émotionnelle sous stress'
      ],
      recentAchievements: [
        'Résolution pacifique d\'un conflit familial',
        'Amélioration de 12% en communication',
        'Completion du défi "7 jours d\'empathie"',
        'Premier feedback positif en médiation'
      ],
      upcomingGoals: [
        'Maîtriser la technique de validation émotionnelle',
        'Développer l\'assertivité bienveillante',
        'Créer un rituel de réflexion quotidien',
        'Rejoindre un groupe de pratique'
      ],
      dailyMood: [
        { date: '2024-01-01', mood: 7 },
        { date: '2024-01-02', mood: 8 },
        { date: '2024-01-03', mood: 6 },
        { date: '2024-01-04', mood: 9 },
        { date: '2024-01-05', mood: 7 },
        { date: '2024-01-06', mood: 8 },
        { date: '2024-01-07', mood: 8 },
      ],
      interactionStats: {
        conversationsAnalyzed: 47,
        conflictsResolved: 8,
        empathyMoments: 23,
        communicationWins: 15
      }
    };

    const mockRecommendations: Recommendation[] = [
      {
        type: 'improvement',
        title: 'Développer l\'assertivité',
        description: 'Vos analyses montrent une tendance à éviter les confrontations. Travaillons sur l\'expression claire de vos besoins.',
        priority: 'high',
        timeframe: '2 semaines'
      },
      {
        type: 'strength',
        title: 'Capitaliser sur votre empathie',
        description: 'Votre score d\'empathie est excellent ! Utilisez cette force pour devenir mentor.',
        priority: 'medium',
        timeframe: '1 mois'
      },
      {
        type: 'goal',
        title: 'Objectif: Médiation familiale',
        description: 'Basé sur vos progrès, vous pourriez aider à résoudre les tensions familiales de fin d\'année.',
        priority: 'high',
        timeframe: '3 semaines'
      }
    ];

    setInsightData(mockData);
    setRecommendations(mockRecommendations);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-blue-600 bg-blue-50';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-500';
    if (score >= 60) return 'from-blue-500 to-indigo-500';
    if (score >= 40) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <ArrowUp className="h-4 w-4 text-green-600" />;
    if (current < previous) return <ArrowDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (!insightData) return <div>Chargement des insights...</div>;

  return (
    <div className="space-y-4 sm:space-y-6 px-1 sm:px-0">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <Heart className="h-8 w-8 text-purple-600" />
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-bold text-purple-700">{insightData.empathyScore}%</div>
                <div className="text-xs sm:text-sm text-purple-600">Empathie</div>
              </div>
            </div>
            <Progress value={insightData.empathyScore} className="h-2 mb-2" />
            <div className="flex items-center gap-1 text-xs text-gray-600">
              {getTrendIcon(insightData.empathyScore, 72)}
              <span>+6% ce mois</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-bold text-blue-700">{insightData.communicationScore}%</div>
                <div className="text-xs sm:text-sm text-blue-600">Communication</div>
              </div>
            </div>
            <Progress value={insightData.communicationScore} className="h-2 mb-2" />
            <div className="flex items-center gap-1 text-xs text-gray-600">
              {getTrendIcon(insightData.communicationScore, 68)}
              <span>+4% ce mois</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <Target className="h-8 w-8 text-green-600" />
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-bold text-green-700">{insightData.conflictResolutionScore}%</div>
                <div className="text-xs sm:text-sm text-green-600">Résolution</div>
              </div>
            </div>
            <Progress value={insightData.conflictResolutionScore} className="h-2 mb-2" />
            <div className="flex items-center gap-1 text-xs text-gray-600">
              {getTrendIcon(insightData.conflictResolutionScore, 58)}
              <span>+7% ce mois</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <Brain className="h-8 w-8 text-orange-600" />
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-bold text-orange-700">{insightData.emotionalIntelligenceScore}%</div>
                <div className="text-xs sm:text-sm text-orange-600">Intelligence Émot.</div>
              </div>
            </div>
            <Progress value={insightData.emotionalIntelligenceScore} className="h-2 mb-2" />
            <div className="flex items-center gap-1 text-xs text-gray-600">
              {getTrendIcon(insightData.emotionalIntelligenceScore, 70)}
              <span>+4% ce mois</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Card className="bg-white border-slate-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-indigo-600 mb-1">{insightData.interactionStats.conversationsAnalyzed}</div>
            <div className="text-xs text-gray-600">Conversations analysées</div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{insightData.interactionStats.conflictsResolved}</div>
            <div className="text-xs text-gray-600">Conflits résolus</div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">{insightData.interactionStats.empathyMoments}</div>
            <div className="text-xs text-gray-600">Moments d'empathie</div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{insightData.interactionStats.communicationWins}</div>
            <div className="text-xs text-gray-600">Succès communication</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <Tabs defaultValue="progress" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white border border-slate-200">
          <TabsTrigger value="progress">Progrès</TabsTrigger>
          <TabsTrigger value="strengths">Forces</TabsTrigger>
          <TabsTrigger value="goals">Objectifs</TabsTrigger>
          <TabsTrigger value="recommendations">IA</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-4">
          <Card className="bg-white shadow-lg border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                Évolution Hebdomadaire
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insightData.weeklyProgress.map((week, idx) => (
                  <div key={week.week} className="flex items-center gap-4">
                    <div className="w-12 text-sm font-medium text-gray-600">{week.week}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700">Score global</span>
                        <span className="text-sm font-semibold">{week.score}%</span>
                      </div>
                      <Progress value={week.score} className="h-2" />
                    </div>
                    {idx > 0 && (
                      <div className="flex items-center gap-1">
                        {getTrendIcon(week.score, insightData.weeklyProgress[idx - 1].score)}
                        <span className="text-xs text-gray-500">
                          {week.score - insightData.weeklyProgress[idx - 1].score > 0 ? '+' : ''}
                          {week.score - insightData.weeklyProgress[idx - 1].score}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strengths" className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  Points Forts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {insightData.strongPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                      <Star className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{point}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Target className="h-5 w-5" />
                  Axes d'Amélioration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {insightData.improvementAreas.map((area, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{area}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <Award className="h-5 w-5" />
                  Réussites Récentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {insightData.recentAchievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <Target className="h-5 w-5" />
                  Objectifs à Venir
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {insightData.upcomingGoals.map((goal, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                      <Clock className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{goal}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="space-y-4">
            {recommendations.map((rec, idx) => (
              <Card key={idx} className="bg-white border-slate-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-5 w-5 text-indigo-600" />
                        <h3 className="font-semibold text-gray-800">{rec.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{rec.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`${getPriorityColor(rec.priority)} text-xs border`}>
                        {rec.priority === 'high' ? 'Priorité haute' : 
                         rec.priority === 'medium' ? 'Priorité moyenne' : 'Priorité basse'}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>Délai: {rec.timeframe}</span>
                    </div>
                    <Button size="sm" variant="outline" className="border-indigo-300 text-indigo-700 hover:bg-indigo-50">
                      Commencer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
