
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Brain, 
  TrendingUp, 
  Heart, 
  Target, 
  Users,
  Clock,
  Lightbulb,
  Star,
  AlertTriangle,
  CheckCircle,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  Activity
} from 'lucide-react';

interface BehavioralPattern {
  pattern: string;
  frequency: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
  suggestions: string[];
}

interface EmotionalState {
  emotion: string;
  intensity: number;
  frequency: number;
  triggers: string[];
  color: string;
}

export const BehavioralAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('month');

  // Données de progression empathique sur le temps
  const empathyProgressData = [
    { date: '01/01', empathy: 65, communication: 58, resolution: 72 },
    { date: '08/01', empathy: 68, communication: 62, resolution: 75 },
    { date: '15/01', empathy: 72, communication: 65, resolution: 78 },
    { date: '22/01', empathy: 75, communication: 70, resolution: 82 },
    { date: '29/01', empathy: 78, communication: 73, resolution: 85 },
  ];

  // Analyse radar des compétences
  const skillsRadarData = [
    { skill: 'Empathie', current: 78, target: 85 },
    { skill: 'Écoute Active', current: 73, target: 80 },
    { skill: 'Communication', current: 70, target: 85 },
    { skill: 'Résolution', current: 82, target: 90 },
    { skill: 'Patience', current: 65, target: 75 },
    { skill: 'Assertivité', current: 68, target: 80 },
  ];

  // États émotionnels
  const emotionalStates: EmotionalState[] = [
    { emotion: 'Calme', intensity: 8, frequency: 45, triggers: ['méditation', 'nature'], color: '#10B981' },
    { emotion: 'Frustration', intensity: 6, frequency: 25, triggers: ['retards', 'incompréhension'], color: '#F59E0B' },
    { emotion: 'Joie', intensity: 9, frequency: 35, triggers: ['succès', 'connexions'], color: '#8B5CF6' },
    { emotion: 'Anxiété', intensity: 4, frequency: 20, triggers: ['conflits', 'inconnu'], color: '#EF4444' },
    { emotion: 'Empathie', intensity: 7, frequency: 60, triggers: ['histoires', 'vulnérabilité'], color: '#06B6D4' },
  ];

  // Patterns comportementaux détectés
  const behavioralPatterns: BehavioralPattern[] = [
    {
      pattern: 'Pic d\'empathie en fin de semaine',
      frequency: 85,
      trend: 'increasing',
      impact: 'positive',
      description: 'Vous êtes naturellement plus empathique le vendredi et weekend',
      suggestions: [
        'Planifiez les conversations difficiles en fin de semaine',
        'Utilisez ce moment pour aider la communauté',
        'Pratiquez l\'auto-compassion pendant ces pics'
      ]
    },
    {
      pattern: 'Baisse de patience en début de semaine',
      frequency: 70,
      trend: 'stable',
      impact: 'negative',
      description: 'Tendance à être moins patient les lundis et mardis',
      suggestions: [
        'Préparez des techniques de respiration pour le lundi',
        'Évitez les décisions importantes en début de semaine',
        'Créez une routine matinale apaisante'
      ]
    },
    {
      pattern: 'Communication excellente après exercice',
      frequency: 92,
      trend: 'increasing',
      impact: 'positive',
      description: 'Vos compétences de communication sont optimales après l\'activité physique',
      suggestions: [
        'Planifiez les réunions importantes après le sport',
        'Intégrez 10 min de mouvement avant les conversations critiques',
        'Utilisez la marche pour les discussions informelles'
      ]
    }
  ];

  // Données hebdomadaires d'activité
  const weeklyActivityData = [
    { day: 'Lun', conflicts: 3, resolutions: 2, empathy: 65 },
    { day: 'Mar', conflicts: 2, resolutions: 2, empathy: 68 },
    { day: 'Mer', conflicts: 4, resolutions: 3, empathy: 72 },
    { day: 'Jeu', conflicts: 1, resolutions: 1, empathy: 75 },
    { day: 'Ven', conflicts: 2, resolutions: 2, empathy: 80 },
    { day: 'Sam', conflicts: 1, resolutions: 1, empathy: 85 },
    { day: 'Dim', conflicts: 0, resolutions: 0, empathy: 82 },
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === 'increasing') return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (trend === 'decreasing') return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
    return <TrendingUp className="h-4 w-4 text-gray-600" />;
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'bg-green-100 text-green-700';
      case 'negative': return 'bg-red-100 text-red-700';
      case 'neutral': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header avec métriques principales */}
      <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Brain className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Analyses Comportementales</h2>
                <p className="text-white/90">Intelligence artificielle appliquée à votre développement</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Activity className="h-6 w-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">78%</div>
              <div className="text-sm text-white/80">Score Empathie</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Target className="h-6 w-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-white/80">Patterns Détectés</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">+15%</div>
              <div className="text-sm text-white/80">Progression</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Lightbulb className="h-6 w-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">8</div>
              <div className="text-sm text-white/80">Recommandations</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <Tabs defaultValue="patterns" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="patterns" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Patterns
          </TabsTrigger>
          <TabsTrigger value="emotions" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Émotions
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Compétences
          </TabsTrigger>
          <TabsTrigger value="predictions" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Prédictions
          </TabsTrigger>
        </TabsList>

        {/* Patterns comportementaux */}
        <TabsContent value="patterns" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Graphique de progression */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Évolution des Compétences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={empathyProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Line type="monotone" dataKey="empathy" stroke="#8B5CF6" strokeWidth={2} name="Empathie" />
                    <Line type="monotone" dataKey="communication" stroke="#06B6D4" strokeWidth={2} name="Communication" />
                    <Line type="monotone" dataKey="resolution" stroke="#10B981" strokeWidth={2} name="Résolution" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Activité hebdomadaire */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Activité Hebdomadaire
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Bar dataKey="conflicts" fill="#F59E0B" name="Conflits" />
                    <Bar dataKey="resolutions" fill="#10B981" name="Résolutions" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Patterns détectés */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Patterns Comportementaux Détectés par l'IA</h3>
            {behavioralPatterns.map((pattern, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                      {getTrendIcon(pattern.trend)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-800">{pattern.pattern}</h4>
                        <Badge className={getImpactColor(pattern.impact)}>
                          {pattern.impact}
                        </Badge>
                        <Badge variant="outline">
                          {pattern.frequency}% de fiabilité
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{pattern.description}</p>
                      
                      <div className="bg-blue-50 rounded-lg p-3">
                        <h5 className="font-semibold text-blue-800 mb-2">Suggestions de l'IA :</h5>
                        <ul className="space-y-1">
                          {pattern.suggestions.map((suggestion, idx) => (
                            <li key={idx} className="text-sm text-blue-700 flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analyse émotionnelle */}
        <TabsContent value="emotions" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Graphique en secteurs des émotions */}
            <Card>
              <CardHeader>
                <CardTitle>Répartition Émotionnelle</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={emotionalStates}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="frequency"
                      label={({ emotion, frequency }) => `${emotion}: ${frequency}%`}
                    >
                      {emotionalStates.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Détail des états émotionnels */}
            <Card>
              <CardHeader>
                <CardTitle>États Émotionnels Détaillés</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {emotionalStates.map((state, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-800">{state.emotion}</span>
                      <Badge style={{ backgroundColor: state.color, color: 'white' }}>
                        {state.frequency}%
                      </Badge>
                    </div>
                    <div className="mb-2">
                      <div className="text-sm text-gray-600">Intensité: {state.intensity}/10</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${state.intensity * 10}%`,
                            backgroundColor: state.color 
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Déclencheurs principaux:</span>
                      <div className="flex gap-1 mt-1">
                        {state.triggers.map((trigger, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {trigger}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analyse des compétences */}
        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Radar des Compétences Relationnelles</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={skillsRadarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Niveau Actuel"
                    dataKey="current"
                    stroke="#8B5CF6"
                    fill="#8B5CF6"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Objectif"
                    dataKey="target"
                    stroke="#10B981"
                    fill="transparent"
                    strokeDasharray="5 5"
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Prédictions IA */}
        <TabsContent value="predictions" className="space-y-4">
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Prédictions & Recommandations IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    Progression Prédite
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Basé sur vos patterns actuels, vous devriez atteindre:
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>85% en Empathie</strong> d'ici 3 semaines</li>
                    <li>• <strong>Niveau 6</strong> d'ici la fin du mois</li>
                    <li>• <strong>Badge "Sage"</strong> dans 10 jours</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    Points d'Attention
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    L'IA a détecté des zones à surveiller:
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Baisse d'énergie les mardis (78% de probabilité)</li>
                    <li>• Risque de conflit familial ce weekend</li>
                    <li>• Besoin de pause dans 4-5 jours</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-600" />
                  Plan d'Action Personnalisé (IA)
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">Cette Semaine</div>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Méditation 10min/jour</li>
                      <li>• 2 conversations profondes</li>
                      <li>• Éviter lundi matin pour décisions</li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">Ce Mois</div>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Challenge empathie 7 jours</li>
                      <li>• Rejoindre 2 discussions forum</li>
                      <li>• Session coaching IA</li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">Long Terme</div>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Devenir mentor communautaire</li>
                      <li>• Spécialisation résolution</li>
                      <li>• Formation leadership</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
