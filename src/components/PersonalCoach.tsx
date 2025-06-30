
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Heart, 
  Lightbulb,
  Target,
  Calendar,
  TrendingUp,
  User,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Clock
} from 'lucide-react';

interface CoachingRecommendation {
  id: string;
  type: 'daily_action' | 'relationship_tip' | 'mindset_shift' | 'practice_exercise';
  title: string;
  description: string;
  impact: 'immediate' | 'short_term' | 'long_term';
  difficulty: 'easy' | 'medium' | 'challenging';
  timeRequired: string;
  personalizedReason: string;
  actionSteps: string[];
}

interface DailyCoachingMessage {
  message: string;
  tone: 'encouraging' | 'motivational' | 'supportive' | 'challenging';
  focusArea: string;
}

export const PersonalCoach: React.FC = () => {
  const [todaysFocus, setTodaysFocus] = useState('Communication Authentique');
  const [selectedRecommendation, setSelectedRecommendation] = useState<CoachingRecommendation | null>(null);

  const dailyMessage: DailyCoachingMessage = {
    message: "Aujourd'hui, concentrez-vous sur l'écoute véritable. Au lieu de préparer votre réponse pendant que l'autre parle, soyez pleinement présent(e). Cette pratique simple mais puissante transformera vos conversations.",
    tone: 'encouraging',
    focusArea: 'Écoute Active'
  };

  const recommendations: CoachingRecommendation[] = [
    {
      id: 'morning_intention',
      type: 'daily_action',
      title: 'Intention Relationnelle du Matin',
      description: 'Commencez chaque journée en définissant une intention pour vos interactions.',
      impact: 'immediate',
      difficulty: 'easy',
      timeRequired: '2 minutes',
      personalizedReason: 'Basé sur votre tendance à être réactif(ve) dans les conversations matinales.',
      actionSteps: [
        'Avant de vérifier votre téléphone, prenez 2 minutes',
        'Demandez-vous : "Comment veux-je me présenter aujourd\'hui ?"',
        'Choisissez une qualité (patience, curiosité, bienveillance)',
        'Visualisez-vous incarnant cette qualité dans vos interactions'
      ]
    },
    {
      id: 'curiosity_questions',
      type: 'practice_exercise',
      title: 'Les 3 Questions de Curiosité',
      description: 'Développez votre empathie en posant des questions qui montrent un intérêt genuine.',
      impact: 'short_term',
      difficulty: 'medium',
      timeRequired: '15 minutes',
      personalizedReason: 'Vous excellez dans l\'analyse mais pourriez davantage explorer les perspectives.',
      actionSteps: [
        'Dans votre prochaine conversation, posez 3 questions ouvertes',
        '"Qu\'est-ce qui vous passionne le plus dans ce projet ?"',
        '"Comment vous sentez-vous par rapport à cette situation ?"',
        '"Qu\'est-ce qui serait le plus utile pour vous maintenant ?"',
        'Écoutez vraiment les réponses sans préparer la vôtre'
      ]
    },
    {
      id: 'conflict_reframe',
      type: 'mindset_shift',
      title: 'Reframe : Du Conflit à la Connexion',
      description: 'Changez votre perspective sur les désaccords pour les voir comme des opportunités.',
      impact: 'long_term',
      difficulty: 'challenging',
      timeRequired: '20 minutes',
      personalizedReason: 'Vos analyses montrent une tendance à éviter certains conflits constructifs.',
      actionSteps: [
        'Identifiez un désaccord récent qui vous a mis(e) mal à l\'aise',
        'Écrivez 3 choses que cette personne essayait peut-être d\'exprimer',
        'Trouvez un point commun, même petit, dans vos positions',
        'Pratiquez une phrase comme : "Je vois que c\'est important pour vous, aidez-moi à comprendre..."'
      ]
    },
    {
      id: 'emotional_check_in',
      type: 'relationship_tip',
      title: 'Check-in Émotionnel Quotidien',
      description: 'Créez des moments de connexion authentique avec vos proches.',
      impact: 'immediate',
      difficulty: 'easy',
      timeRequired: '5 minutes',
      personalizedReason: 'Parfait pour approfondir vos relations existantes.',
      actionSteps: [
        'Choisissez une personne importante pour vous',
        'Demandez : "Comment tu te sens vraiment aujourd\'hui ?"',
        'Écoutez sans donner de conseils immédiatement',
        'Partagez aussi votre état émotionnel authentique',
        'Terminez par : "Merci de partager ça avec moi"'
      ]
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'immediate': return 'bg-green-100 text-green-700';
      case 'short_term': return 'bg-blue-100 text-blue-700';
      case 'long_term': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'challenging': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'daily_action': return <Calendar className="h-4 w-4" />;
      case 'relationship_tip': return <Heart className="h-4 w-4" />;
      case 'mindset_shift': return <Lightbulb className="h-4 w-4" />;
      case 'practice_exercise': return <Target className="h-4 w-4" />;
      default: return <Sparkles className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Daily Coaching Message */}
      <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-blue-600" />
            Votre Coach Personnel Vous Parle
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-white/70 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-800">Focus du jour : {dailyMessage.focusArea}</span>
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">
                {dailyMessage.message}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Sparkles className="h-4 w-4" />
                <span>Personnalisé pour votre parcours de développement</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500">
                <CheckCircle className="h-4 w-4 mr-2" />
                J'ai appliqué ce conseil
              </Button>
              <Button variant="outline">
                <ArrowRight className="h-4 w-4 mr-2" />
                Voir plus de conseils
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personalized Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600" />
            Recommandations Personnalisées pour Vous
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {recommendations.map((rec) => (
              <Card 
                key={rec.id} 
                className="cursor-pointer hover:shadow-md transition-all hover:bg-gray-50"
                onClick={() => setSelectedRecommendation(rec)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                      {getTypeIcon(rec.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">{rec.title}</h4>
                      <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                        {rec.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className={getImpactColor(rec.impact)}>
                          {rec.impact}
                        </Badge>
                        <Badge className={getDifficultyColor(rec.difficulty)}>
                          {rec.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {rec.timeRequired}
                        </Badge>
                      </div>
                      
                      <div className="bg-blue-50 p-2 rounded text-xs text-blue-700">
                        <strong>Pourquoi pour vous :</strong> {rec.personalizedReason}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Recommendation Modal */}
      {selectedRecommendation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getTypeIcon(selectedRecommendation.type)}
                {selectedRecommendation.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                {selectedRecommendation.description}
              </p>
              
              <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                <h4 className="font-semibold text-purple-800 mb-2">Pourquoi cette recommandation ?</h4>
                <p className="text-purple-700 text-sm">
                  {selectedRecommendation.personalizedReason}
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Plan d'Action Étape par Étape
                </h4>
                <ol className="space-y-2">
                  {selectedRecommendation.actionSteps.map((step, index) => (
                    <li key={index} className="text-sm text-blue-700 flex items-start gap-3">
                      <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Impact Attendu
                </h4>
                <p className="text-green-700 text-sm">
                  En pratiquant cet exercice, vous développerez votre {selectedRecommendation.type === 'daily_action' ? 'routine relationnelle' : 
                    selectedRecommendation.type === 'relationship_tip' ? 'connexion émotionnelle' :
                    selectedRecommendation.type === 'mindset_shift' ? 'perspective positive' : 'compétence pratique'}. 
                  Les bénéfices se manifesteront à {selectedRecommendation.impact === 'immediate' ? 'court terme' : 
                    selectedRecommendation.impact === 'short_term' ? 'moyen terme' : 'long terme'}.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500"
                  onClick={() => {
                    // Ici on pourrait tracker l'engagement
                    setSelectedRecommendation(null);
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Je m'engage à essayer (+50 XP)
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedRecommendation(null)}
                >
                  Plus tard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Weekly Challenge */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Target className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Défi de la Semaine</h3>
              <p className="text-gray-600">Créez une Connexion Profonde</p>
            </div>
          </div>
          
          <p className="text-gray-700 mb-4 leading-relaxed">
            Cette semaine, votre mission est d'avoir une conversation vraiment profonde avec quelqu'un d'important pour vous. 
            Allez au-delà du superficiel et créez un moment de connexion authentique.
          </p>
          
          <div className="bg-white p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Votre approche suggérée :</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Choisissez un moment sans distractions</li>
              <li>• Commencez par partager quelque chose de personnel</li>
              <li>• Posez des questions sur leurs rêves, leurs peurs, leurs valeurs</li>
              <li>• Écoutez avec votre cœur, pas seulement vos oreilles</li>
            </ul>
          </div>
          
          <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500">
            <Heart className="h-4 w-4 mr-2" />
            Accepter le Défi (+200 XP)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
