
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Brain, 
  Heart,
  Target,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Lightbulb,
  Award,
  Users,
  MessageSquare,
  Clock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts';

interface InsightData {
  date: string;
  empathyScore: number;
  communicationScore: number;
  conflictResolution: number;
  selfAwareness: number;
}

interface PersonalPattern {
  id: string;
  title: string;
  description: string;
  frequency: number;
  impact: 'positive' | 'neutral' | 'negative';
  suggestion: string;
}

export const PersonalInsights: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');
  
  const progressData: InsightData[] = [
    { date: '01/12', empathyScore: 65, communicationScore: 70, conflictResolution: 60, selfAwareness: 68 },
    { date: '08/12', empathyScore: 68, communicationScore: 72, conflictResolution: 65, selfAwareness: 70 },
    { date: '15/12', empathyScore: 72, communicationScore: 75, conflictResolution: 70, selfAwareness: 72 },
    { date: '22/12', empathyScore: 75, communicationScore: 78, conflictResolution: 73, selfAwareness: 75 },
    { date: '29/12', empathyScore: 78, communicationScore: 80, conflictResolution: 76, selfAwareness: 78 }
  ];

  const patterns: PersonalPattern[] = [
    {
      id: '1',
      title: 'Communication en début de semaine',
      description: 'Vos scores de communication sont 15% plus élevés le mardi et mercredi',
      frequency: 85,
      impact: 'positive',
      suggestion: 'Planifiez vos conversations importantes en milieu de semaine'
    },
    {
      id: '2',
      title: 'Gestion des conflits après 16h',
      description: 'Votre capacité de résolution de conflits diminue de 20% en fin de journée',
      frequency: 73,
      impact: 'negative',
      suggestion: 'Reportez les discussions difficiles au matin quand possible'
    },
    {
      id: '3',
      title: 'Empathie croissante',
      description: 'Votre score d\'empathie augmente de 2 points chaque semaine depuis un mois',
      frequency: 100,
      impact: 'positive',
      suggestion: 'Continuez vos pratiques d\'écoute active, elles portent leurs fruits !'
    }
  ];

  const skillDistribution = [
    { name: 'Empathie', value: 78, color: '#ec4899' },
    { name: 'Communication', value: 80, color: '#3b82f6' },
    { name: 'Résolution', value: 76, color: '#f59e0b' },
    { name: 'Conscience', value: 78, color: '#8b5cf6' }
  ];

  const weeklyStats = {
    conversationsAnalyzed: 12,
    avgEmpathyGain: '+3 points',
    longestStreak: '8 jours',
    challengesCompleted: 5,
    journalEntries: 4,
    communityInteractions: 7
  };

  const getPatternColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'bg-green-100 text-green-700 border-green-200';
      case 'negative': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-600" />
            Vos Insights Personnels - Analyse Comportementale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Découvrez vos patterns, célébrez vos progrès et obtenez des recommandations personnalisées 
            basées sur votre parcours unique de développement relationnel.
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === 'week' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              7 jours
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === 'month' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              30 jours
            </button>
            <button
              onClick={() => setTimeRange('quarter')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === 'quarter' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              3 mois
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <MessageSquare className="h-6 w-6 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-blue-600">{weeklyStats.conversationsAnalyzed}</div>
            <div className="text-xs text-gray-600">Analyses</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-green-600">{weeklyStats.avgEmpathyGain}</div>
            <div className="text-xs text-gray-600">Empathie</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Activity className="h-6 w-6 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold text-orange-600">{weeklyStats.longestStreak}</div>
            <div className="text-xs text-gray-600">Série</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-6 w-6 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold text-purple-600">{weeklyStats.challengesCompleted}</div>
            <div className="text-xs text-gray-600">Défis</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 mx-auto mb-2 text-pink-600" />
            <div className="text-2xl font-bold text-pink-600">{weeklyStats.journalEntries}</div>
            <div className="text-xs text-gray-600">Journal</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-indigo-600" />
            <div className="text-2xl font-bold text-indigo-600">{weeklyStats.communityInteractions}</div>
            <div className="text-xs text-gray-600">Social</div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Évolution de Vos Compétences Relationnelles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[50, 90]} />
              <Tooltip />
              <Line type="monotone" dataKey="empathyScore" stroke="#ec4899" strokeWidth={3} name="Empathie" />
              <Line type="monotone" dataKey="communicationScore" stroke="#3b82f6" strokeWidth={3} name="Communication" />
              <Line type="monotone" dataKey="conflictResolution" stroke="#f59e0b" strokeWidth={3} name="Résolution" />
              <Line type="monotone" dataKey="selfAwareness" stroke="#8b5cf6" strokeWidth={3} name="Conscience" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Skills Distribution */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-purple-600" />
              Répartition de Vos Compétences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RechartsPieChart>
                <Pie
                  data={skillDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {skillDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {skillDistribution.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: skill.color }}></div>
                  <span className="text-sm text-gray-700">{skill.name}: {skill.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              Vos Points Forts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">🌟 Excellence en Communication</h4>
              <p className="text-sm text-green-700">
                Votre score de 80% vous place dans le top 15% des utilisateurs. 
                Vous excellez dans l'expression claire de vos idées.
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">💡 Progression Constante</h4>
              <p className="text-sm text-blue-700">
                +12 points d'empathie ce mois-ci ! Votre engagement dans les pratiques 
                d'écoute active porte vraiment ses fruits.
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">🎯 Consistance Remarquable</h4>
              <p className="text-sm text-purple-700">
                8 jours consécutifs d'activité ! Cette régularité transforme 
                littéralement votre façon d'interagir avec les autres.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personal Patterns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            Vos Patterns Comportementaux Uniques
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patterns.map((pattern) => (
              <Card key={pattern.id} className={`border-l-4 ${getPatternColor(pattern.impact)}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{pattern.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{pattern.description}</p>
                    </div>
                    <Badge className={getPatternColor(pattern.impact)}>
                      {pattern.frequency}% de fréquence
                    </Badge>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h5 className="font-medium text-blue-800 mb-1 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Recommandation Personnalisée
                    </h5>
                    <p className="text-sm text-blue-700">{pattern.suggestion}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Clock className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Prochaines Actions Recommandées</h3>
              <p className="text-gray-600">Basées sur votre analyse comportementale</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Cette Semaine</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Pratiquer l'écoute active 3x</li>
                <li>• Journal de gratitude quotidien</li>
                <li>• Un défi relationnel difficile</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Ce Mois</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Améliorer résolution de conflits</li>
                <li>• Rejoindre 2 discussions communauté</li>
                <li>• Objectif: 85% en empathie</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Long Terme</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Devenir mentor communauté</li>
                <li>• Atteindre niveau 5</li>
                <li>• Créer vos propres défis</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
