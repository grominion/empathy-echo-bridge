
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Calendar, 
  Clock,
  CheckCircle,
  Play,
  Star,
  Flame,
  Trophy,
  Heart,
  Brain,
  Users,
  MessageSquare,
  Lightbulb,
  Award,
  TrendingUp,
  Zap,
  BookOpen
} from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: 'communication' | 'empathy' | 'conflict' | 'mindfulness' | 'relationships';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  xpReward: number;
  completed: boolean;
  progress: number;
  maxProgress: number;
  instructions: string[];
  tips: string[];
}

interface DailyQuest {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
  xpReward: number;
  category: string;
}

export const PersonalGrowthModule: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'communication' | 'empathy' | 'conflict' | 'mindfulness' | 'relationships'>('all');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const dailyQuests: DailyQuest[] = [
    {
      id: 'daily_1',
      title: 'Écoute Active',
      description: 'Pratiquez l\'écoute active avec 3 personnes aujourd\'hui',
      icon: <MessageSquare className="h-5 w-5" />,
      completed: false,
      xpReward: 50,
      category: 'Communication'
    },
    {
      id: 'daily_2',
      title: 'Moment de Gratitude',
      description: 'Exprimez votre gratitude à une personne',
      icon: <Heart className="h-5 w-5" />,
      completed: true,
      xpReward: 30,
      category: 'Relations'
    },
    {
      id: 'daily_3',
      title: 'Question Ouverte',
      description: 'Posez une question ouverte pour mieux comprendre quelqu\'un',
      icon: <Lightbulb className="h-5 w-5" />,
      completed: false,
      xpReward: 40,
      category: 'Empathie'
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 'comm_1',
      title: 'Maître de la Communication',
      description: 'Développez vos compétences de communication sur 7 jours',
      category: 'communication',
      difficulty: 'intermediate',
      duration: '7 jours',
      xpReward: 200,
      completed: false,
      progress: 3,
      maxProgress: 7,
      instructions: [
        'Jour 1-2: Pratiquez l\'écoute active avec vos proches',
        'Jour 3-4: Utilisez des questions ouvertes dans vos conversations',
        'Jour 5-6: Exprimez vos sentiments avec des "je" statements',
        'Jour 7: Faites un bilan de vos progrès'
      ],
      tips: [
        'Maintenez un contact visuel pendant les conversations',
        'Reformulez ce que vous avez compris',
        'Évitez les jugements et les conseils non sollicités'
      ]
    },
    {
      id: 'emp_1',
      title: 'Développeur d\'Empathie',
      description: 'Renforcez votre capacité d\'empathie en 14 jours',
      category: 'empathy',
      difficulty: 'beginner',
      duration: '14 jours',
      xpReward: 150,
      completed: true,
      progress: 14,
      maxProgress: 14,
      instructions: [
        'Semaine 1: Observez les émotions des autres sans juger',
        'Semaine 2: Pratiquez la perspective-taking quotidiennement'
      ],
      tips: [
        'Observez le langage corporel et les micro-expressions',
        'Demandez-vous: "Que ressentirait-je à sa place?"',
        'Validez les émotions même si vous n\'êtes pas d\'accord'
      ]
    },
    {
      id: 'conf_1',
      title: 'Résolveur de Conflits',
      description: 'Apprenez à transformer les conflits en opportunités',
      category: 'conflict',
      difficulty: 'advanced',
      duration: '21 jours',
      xpReward: 300,
      completed: false,
      progress: 0,
      maxProgress: 21,
      instructions: [
        'Semaine 1: Identifiez vos déclencheurs émotionnels',
        'Semaine 2: Pratiquez la communication non-violente',
        'Semaine 3: Appliquez les techniques dans des situations réelles'
      ],
      tips: [
        'Restez calme et respirez profondément',
        'Cherchez les besoins sous-jacents',
        'Proposez des solutions gagnant-gagnant'
      ]
    },
    {
      id: 'mind_1',
      title: 'Pleine Conscience Relationnelle',
      description: 'Cultivez la présence dans vos interactions',
      category: 'mindfulness',
      difficulty: 'beginner',
      duration: '10 jours',
      xpReward: 120,
      completed: false,
      progress: 5,
      maxProgress: 10,
      instructions: [
        'Pratiquez la méditation de pleine conscience 10 min/jour',
        'Soyez présent dans chaque conversation',
        'Observez vos réactions sans jugement'
      ],
      tips: [
        'Concentrez-vous sur votre respiration',
        'Remarquez quand votre esprit divague',
        'Revenez gentiment à l\'instant présent'
      ]
    },
    {
      id: 'rel_1',
      title: 'Architecte de Relations',
      description: 'Construisez des relations plus profondes et authentiques',
      category: 'relationships',
      difficulty: 'intermediate',
      duration: '30 jours',
      xpReward: 400,
      completed: false,
      progress: 12,
      maxProgress: 30,
      instructions: [
        'Semaine 1: Identifiez vos relations importantes',
        'Semaine 2: Pratiquez la vulnérabilité appropriée',
        'Semaine 3: Créez des moments de connexion authentique',
        'Semaine 4: Consolidez vos nouvelles habitudes'
      ],
      tips: [
        'Partagez quelque chose de personnel',
        'Posez des questions profondes',
        'Créez des rituels de connexion'
      ]
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'communication': return <MessageSquare className="h-4 w-4" />;
      case 'empathy': return <Heart className="h-4 w-4" />;
      case 'conflict': return <Target className="h-4 w-4" />;
      case 'mindfulness': return <Brain className="h-4 w-4" />;
      case 'relationships': return <Users className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'communication': return 'bg-blue-100 text-blue-700';
      case 'empathy': return 'bg-pink-100 text-pink-700';
      case 'conflict': return 'bg-red-100 text-red-700';
      case 'mindfulness': return 'bg-purple-100 text-purple-700';
      case 'relationships': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredChallenges = selectedCategory === 'all' 
    ? challenges 
    : challenges.filter(challenge => challenge.category === selectedCategory);

  const completedQuests = dailyQuests.filter(quest => quest.completed).length;
  const totalQuestXP = dailyQuests.reduce((sum, quest) => sum + (quest.completed ? quest.xpReward : 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-green-600" />
            Votre Parcours de Développement Personnel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Développez vos compétences relationnelles avec des défis personnalisés, 
            des quêtes quotidiennes et un suivi de progression détaillé.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{completedQuests}/3</div>
              <div className="text-sm text-gray-600">Quêtes du jour</div>
            </div>
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{challenges.filter(c => c.completed).length}</div>
              <div className="text-sm text-gray-600">Défis complétés</div>
            </div>
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">{totalQuestXP}</div>
              <div className="text-sm text-gray-600">XP gagnés</div>
            </div>
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">12</div>
              <div className="text-sm text-gray-600">Jour de série</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quêtes quotidiennes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Quêtes Quotidiennes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {dailyQuests.map((quest) => (
              <Card key={quest.id} className={`${quest.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50'} hover:shadow-md transition-shadow`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${quest.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                      {quest.completed ? <CheckCircle className="h-5 w-5" /> : quest.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{quest.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{quest.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <Badge className={getCategoryColor(quest.category.toLowerCase())}>
                          {quest.category}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">+{quest.xpReward} XP</span>
                          {!quest.completed && (
                            <Button size="sm">
                              <Play className="h-3 w-3 mr-1" />
                              Faire
                            </Button>
                          )}
                          {quest.completed && (
                            <Badge className="bg-green-100 text-green-700">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Terminé
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filtres pour les défis */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('all')}
          size="sm"
        >
          Tous les défis
        </Button>
        <Button
          variant={selectedCategory === 'communication' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('communication')}
          size="sm"
          className="flex items-center gap-1"
        >
          <MessageSquare className="h-3 w-3" />
          Communication
        </Button>
        <Button
          variant={selectedCategory === 'empathy' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('empathy')}
          size="sm"
          className="flex items-center gap-1"
        >
          <Heart className="h-3 w-3" />
          Empathie
        </Button>
        <Button
          variant={selectedCategory === 'conflict' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('conflict')}
          size="sm"
          className="flex items-center gap-1"
        >
          <Target className="h-3 w-3" />
          Conflits
        </Button>
        <Button
          variant={selectedCategory === 'relationships' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('relationships')}
          size="sm"
          className="flex items-center gap-1"
        >
          <Users className="h-3 w-3" />
          Relations
        </Button>
      </div>

      {/* Défis */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredChallenges.map((challenge) => (
          <Card key={challenge.id} className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedChallenge(challenge)}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${challenge.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                  {challenge.completed ? <Trophy className="h-5 w-5" /> : getCategoryIcon(challenge.category)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-800">{challenge.title}</h4>
                    {challenge.completed && (
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Terminé
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={getCategoryColor(challenge.category)}>
                      {getCategoryIcon(challenge.category)}
                      <span className="ml-1 capitalize">{challenge.category}</span>
                    </Badge>
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {challenge.duration}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progression</span>
                      <span className="text-gray-800 font-medium">
                        {challenge.progress}/{challenge.maxProgress}
                      </span>
                    </div>
                    <Progress 
                      value={(challenge.progress / challenge.maxProgress) * 100} 
                      className="h-2"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-gray-500">+{challenge.xpReward} XP</span>
                    <Button size="sm" disabled={challenge.completed}>
                      {challenge.completed ? 'Terminé' : challenge.progress > 0 ? 'Continuer' : 'Commencer'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de détail du défi */}
      {selectedChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getCategoryIcon(selectedChallenge.category)}
                {selectedChallenge.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                {selectedChallenge.description}
              </p>
              
              <div className="flex gap-2">
                <Badge className={getCategoryColor(selectedChallenge.category)}>
                  {selectedChallenge.category}
                </Badge>
                <Badge className={getDifficultyColor(selectedChallenge.difficulty)}>
                  {selectedChallenge.difficulty}
                </Badge>
                <Badge variant="outline">
                  <Clock className="h-3 w-3 mr-1" />
                  {selectedChallenge.duration}
                </Badge>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Instructions du Défi
                </h4>
                <ol className="space-y-2">
                  {selectedChallenge.instructions.map((instruction, index) => (
                    <li key={index} className="text-sm text-blue-700 flex items-start gap-3">
                      <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="leading-relaxed">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Conseils pour Réussir
                </h4>
                <ul className="space-y-2">
                  {selectedChallenge.tips.map((tip, index) => (
                    <li key={index} className="text-sm text-green-700 flex items-start gap-2">
                      <Star className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Votre Progression
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-purple-700">Avancement</span>
                    <span className="text-purple-800 font-medium">
                      {selectedChallenge.progress}/{selectedChallenge.maxProgress} jours
                    </span>
                  </div>
                  <Progress 
                    value={(selectedChallenge.progress / selectedChallenge.maxProgress) * 100} 
                    className="h-3"
                  />
                  <p className="text-xs text-purple-600">
                    {selectedChallenge.maxProgress - selectedChallenge.progress} jours restants
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500"
                  disabled={selectedChallenge.completed}
                  onClick={() => {
                    // Ici on pourrait déclencher le défi
                    setSelectedChallenge(null);
                  }}
                >
                  {selectedChallenge.completed ? 
                    <>
                      <Trophy className="h-4 w-4 mr-2" />
                      Défi Terminé (+{selectedChallenge.xpReward} XP)
                    </> :
                    selectedChallenge.progress > 0 ?
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Continuer le Défi
                    </> :
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Commencer le Défi
                    </>
                  }
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedChallenge(null)}
                >
                  Fermer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Widget de motivation */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <Flame className="h-8 w-8 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Votre Série Continue !</h3>
              <p className="text-gray-600">12 jours d'activité consécutive</p>
            </div>
          </div>
          
          <p className="text-gray-700 mb-4 leading-relaxed">
            Vous êtes sur une excellente lancée ! Continuez à relever des défis quotidiens 
            pour maintenir votre progression et débloquer de nouveaux niveaux.
          </p>
          
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-orange-500 to-red-500">
              <Target className="h-4 w-4 mr-2" />
              Nouveau Défi
            </Button>
            <Button variant="outline">
              <Award className="h-4 w-4 mr-2" />
              Mes Succès
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
