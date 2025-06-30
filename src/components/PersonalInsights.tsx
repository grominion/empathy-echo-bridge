
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  Target,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  Users,
  Heart,
  MessageSquare,
  Calendar,
  Star,
  ArrowRight
} from 'lucide-react';

interface PersonalInsight {
  id: string;
  type: 'strength' | 'growth_area' | 'pattern' | 'recommendation';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'communication' | 'empathy' | 'conflict_resolution' | 'self_awareness';
  actionable: boolean;
  actionSteps?: string[];
}

interface BehaviorPattern {
  id: string;
  name: string;
  frequency: number;
  trend: 'improving' | 'stable' | 'declining';
  description: string;
  suggestions: string[];
}

interface RelationshipMetric {
  name: string;
  score: number;
  change: number;
  description: string;
}

export const PersonalInsights: React.FC = () => {
  const [insights, setInsights] = useState<PersonalInsight[]>([
    {
      id: '1',
      type: 'strength',
      title: 'Excellent Auditeur Actif',
      description: 'Vos analyses montrent une capacité remarquable à comprendre les perspectives multiples. Vous posez souvent les bonnes questions.',
      impact: 'high',
      category: 'communication',
      actionable: false
    },
    {
      id: '2',
      type: 'growth_area',
      title: 'Gestion des Émotions Intenses',
      description: 'Vous avez tendance à éviter les conflits émotionnellement chargés. Développer cette compétence enrichirait vos relations.',
      impact: 'medium',
      category: 'conflict_resolution',
      actionable: true,
      actionSteps: [
        'Pratiquez la respiration profonde avant les conversations difficiles',
        'Identifiez vos déclencheurs émotionnels personnels',
        'Utilisez des phrases "Je" pour exprimer vos sentiments',
        'Demandez des pauses si nécessaire pendant les discussions intenses'
      ]
    },
    {
      id: '3',
      type: 'pattern',
      title: 'Recherche de Perfectionnisme',
      description: 'Vous analysez souvent les situations jusqu\'au moindre détail. C\'est une force, mais attention à la sur-analyse.',
      impact: 'medium',
      category: 'self_awareness',
      actionable: true,
      actionSteps: [
        'Fixez-vous des limites de temps pour la réflexion',
        'Acceptez que certaines situations restent imparfaites',
        'Célébrez les progrès, pas seulement la perfection'
      ]
    },
    {
      id: '4',
      type: 'recommendation',
      title: 'Développez Votre Assertivité',
      description: 'Basé sur vos patterns, vous bénéficieriez de techniques d\'assertivité pour équilibrer empathie et besoins personnels.',
      impact: 'high',
      category: 'communication',
      actionable: true,
      actionSteps: [
        'Pratiquez dire "non" de manière bienveillante',
        'Exprimez vos besoins clairement et directement',
        'Utilisez des affirmations positives sur votre valeur',
        'Négociez des compromis équitables'
      ]
    }
  ]);

  const [behaviorPatterns, setBehaviorPatterns] = useState<BehaviorPattern[]>([
    {
      id: '1',
      name: 'Écoute avant de répondre',
      frequency: 85,
      trend: 'improving',
      description: 'Vous prenez le temps d\'écouter avant de formuler vos réponses',
      suggestions: ['Continuez cette excellente habitude', 'Partagez cette technique avec d\'autres']
    },
    {
      id: '2',
      name: 'Évitement des confrontations',
      frequency: 40,
      trend: 'stable',
      description: 'Vous avez tendance à éviter les conversations difficiles',
      suggestions: ['Commencez par de petites conversations difficiles', 'Préparez vos points clés à l\'avance']
    },
    {
      id: '3',
      name: 'Recherche de solutions',
      frequency: 78,
      trend: 'improving',
      description: 'Vous cherchez activement des solutions lors des conflits',
      suggestions: ['Excellent mindset', 'Aidez les autres à adopter cette approche']
    }
  ]);

  const [relationshipMetrics, setRelationshipMetrics] = useState<RelationshipMetric[]>([
    {
      name: 'Qualité des Communications',
      score: 76,
      change: +8,
      description: 'Vos échanges sont devenus plus authentiques et empathiques'
    },
    {
      name: 'Gestion des Conflits',
      score: 68,
      change: +12,
      description: 'Net progrès dans votre approche des désaccords'
    },
    {
      name: 'Intelligence Émotionnelle',
      score: 82,
      change: +5,
      description: 'Excellente capacité à comprendre et gérer les émotions'
    },
    {
      name: 'Empathie Active',
      score: 88,
      change: +3,
      description: 'Votre point fort - vous comprenez vraiment les autres'
    }
  ]);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'strength': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'growth_area': return <TrendingUp className="h-5 w-5 text-blue-600" />;
      case 'pattern': return <Brain className="h-5 w-5 text-purple-600" />;
      case 'recommendation': return <Lightbulb className="h-5 w-5 text-orange-600" />;
      default: return <Star className="h-5 w-5 text-gray-600" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'strength': return 'bg-green-50 border-green-200';
      case 'growth_area': return 'bg-blue-50 border-blue-200';
      case 'pattern': return 'bg-purple-50 border-purple-200';
      case 'recommendation': return 'bg-orange-50 border-orange-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'declining': return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      case 'stable': return <Target className="h-4 w-4 text-gray-600" />;
      default: return <Target className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            Vos Insights Personnels - Comprendre Qui Vous Êtes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            Basé sur vos analyses et réflexions, voici votre profil relationnel unique. 
            Ces insights vous aident à construire des relations plus authentiques et épanouissantes.
          </p>
        </CardContent>
      </Card>

      {/* Relationship Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Votre Évolution Relationnelle
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {relationshipMetrics.map((metric, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-800">{metric.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-800">{metric.score}%</span>
                    <Badge className={metric.change > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                      {metric.change > 0 ? '+' : ''}{metric.change}
                    </Badge>
                  </div>
                </div>
                <Progress value={metric.score} className="h-2" />
                <p className="text-sm text-gray-600">{metric.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personal Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            Vos Insights Personnalisés
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight) => (
              <Card key={insight.id} className={`${getInsightColor(insight.type)} border-2`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-800">{insight.title}</h4>
                        <Badge className={getImpactColor(insight.impact)}>
                          Impact {insight.impact}
                        </Badge>
                        <Badge variant="outline">
                          {insight.category.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-700 mb-3 leading-relaxed">
                        {insight.description}
                      </p>

                      {insight.actionable && insight.actionSteps && (
                        <div className="bg-white/70 rounded-lg p-3 mt-3">
                          <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                            <ArrowRight className="h-4 w-4" />
                            Actions concrètes pour progresser :
                          </h5>
                          <ul className="space-y-1">
                            {insight.actionSteps.map((step, index) => (
                              <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                                <span className="bg-gray-200 text-gray-700 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                  {index + 1}
                                </span>
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Behavior Patterns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Vos Patterns de Comportement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {behaviorPatterns.map((pattern) => (
              <Card key={pattern.id} className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-gray-800">{pattern.name}</h4>
                      {getTrendIcon(pattern.trend)}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-800">{pattern.frequency}%</div>
                      <div className="text-xs text-gray-600">fréquence</div>
                    </div>
                  </div>
                  
                  <Progress value={pattern.frequency} className="h-2 mb-3" />
                  
                  <p className="text-sm text-gray-700 mb-3">{pattern.description}</p>
                  
                  <div className="bg-white rounded-lg p-3">
                    <h5 className="font-medium text-gray-800 mb-2">Suggestions :</h5>
                    <ul className="space-y-1">
                      {pattern.suggestions.map((suggestion, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <MessageSquare className="h-3 w-3 text-blue-500 flex-shrink-0 mt-1" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Motivational Message */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Star className="h-6 w-6 text-yellow-500" />
            <h3 className="text-xl font-bold text-gray-800">Vous Progressez Magnifiquement !</h3>
          </div>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Chaque analyse, chaque réflexion, chaque effort que vous faites vous rapproche de la personne 
            que vous voulez devenir. Vos relations s'améliorent parce que <strong>vous</strong> vous améliorez.
          </p>
          <div className="flex justify-center gap-3">
            <Button className="bg-gradient-to-r from-green-500 to-blue-500">
              <Calendar className="h-4 w-4 mr-2" />
              Planifier mon prochain défi
            </Button>
            <Button variant="outline">
              <Heart className="h-4 w-4 mr-2" />
              Partager mes progrès
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
