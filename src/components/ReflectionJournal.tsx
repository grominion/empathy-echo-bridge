
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Calendar, 
  Heart,
  Brain,
  Lightbulb,
  Star,
  TrendingUp,
  Clock,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Share2,
  Tag,
  Eye
} from 'lucide-react';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'reflection' | 'gratitude' | 'challenge' | 'insight' | 'goal';
  mood: 'happy' | 'neutral' | 'sad' | 'excited' | 'frustrated' | 'peaceful';
  tags: string[];
  isPrivate: boolean;
  insights: string[];
  conflictAnalyzed?: boolean;
}

interface ReflectionPrompt {
  id: string;
  question: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'deep';
  description: string;
}

export const ReflectionJournal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'entries' | 'prompts' | 'insights' | 'analytics'>('entries');
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'reflection' | 'gratitude' | 'challenge' | 'insight' | 'goal'>('all');

  const journalEntries: JournalEntry[] = [
    {
      id: '1',
      title: 'Conflit résolu avec mon collègue',
      content: 'Aujourd\'hui, j\'ai enfin pu clarifier le malentendu avec Marc. J\'ai réalisé que je n\'écoutais pas vraiment ses préoccupations. En utilisant les techniques d\'écoute active, j\'ai pu comprendre qu\'il se sentait débordé et non soutenu. Nous avons trouvé des solutions ensemble et notre relation s\'est améliorée.',
      date: '2024-01-02',
      category: 'reflection',
      mood: 'happy',
      tags: ['travail', 'communication', 'écoute active', 'résolution'],
      isPrivate: false,
      insights: [
        'L\'écoute active transforme vraiment les conversations',
        'Les conflits cachent souvent des besoins non exprimés',
        'Prendre l\'initiative de clarifier évite l\'escalade'
      ],
      conflictAnalyzed: true
    },
    {
      id: '2',
      title: 'Gratitude pour ma famille',
      content: 'Je suis reconnaissant pour le soutien constant de ma famille. Même dans les moments difficiles, ils sont là. Aujourd\'hui, ma mère m\'a appelé juste pour prendre des nouvelles, et cela m\'a rappelé à quel point ces petites attentions comptent.',
      date: '2024-01-01',
      category: 'gratitude',
      mood: 'peaceful',
      tags: ['famille', 'soutien', 'amour', 'reconnaissance'],
      isPrivate: false,
      insights: [
        'Les petites attentions ont un grand impact',
        'Exprimer sa gratitude renforce les liens',
        'Le soutien familial est un pilier fondamental'
      ]
    },
    {
      id: '3',
      title: 'Défi : Être plus patient avec les enfants',
      content: 'J\'ai remarqué que je m\'impatiente facilement avec mes enfants le soir. J\'ai décidé de prendre 5 minutes de respiration consciente avant de les coucher. Cela m\'aide à être plus présent et bienveillant. Les enfants réagissent mieux quand je suis calme.',
      date: '2023-12-30',
      category: 'challenge',
      mood: 'excited',
      tags: ['parentalité', 'patience', 'respiration', 'présence'],
      isPrivate: true,
      insights: [
        'La respiration consciente aide à retrouver le calme',
        'Les enfants reflètent notre état émotionnel',
        'Prendre soin de soi permet de mieux prendre soin des autres'
      ]
    },
    {
      id: '4',
      title: 'Insight sur mes patterns de communication',
      content: 'J\'ai réalisé que j\'ai tendance à couper la parole quand quelqu\'un exprime une émotion forte. C\'est probablement parce que cela me met mal à l\'aise. Je vais pratiquer l\'écoute sans intervenir et apprendre à tolérer ces moments d\'inconfort.',
      date: '2023-12-28',
      category: 'insight',
      mood: 'neutral',
      tags: ['communication', 'écoute', 'émotions', 'patterns'],
      isPrivate: false,
      insights: [
        'Nos inconforts révèlent nos zones de croissance',
        'Couper la parole est souvent une réaction défensive',
        'Tolérer l\'inconfort permet d\'approfondir les relations'
      ]
    }
  ];

  const reflectionPrompts: ReflectionPrompt[] = [
    {
      id: '1',
      question: 'Décrivez une situation où vous avez fait preuve d\'empathie aujourd\'hui. Comment l\'autre personne a-t-elle réagi ?',
      category: 'Empathie',
      difficulty: 'easy',
      description: 'Explorez vos moments d\'empathie quotidiens'
    },
    {
      id: '2',
      question: 'Quel est un conflit récurrent dans votre vie ? Quels patterns pouvez-vous identifier ?',
      category: 'Conflits',
      difficulty: 'medium',
      description: 'Analysez vos patterns de conflit pour mieux les comprendre'
    },
    {
      id: '3',
      question: 'Si vous pouviez réécrire une conversation difficile de cette semaine, que changeriez-vous ?',
      category: 'Communication',
      difficulty: 'medium',
      description: 'Réfléchissez à vos interactions pour les améliorer'
    },
    {
      id: '4',
      question: 'Quelle croyance sur les relations avez-vous remise en question récemment ?',
      category: 'Croyances',
      difficulty: 'deep',
      description: 'Explorez vos croyances profondes sur les relations humaines'
    },
    {
      id: '5',
      question: 'Décrivez une personne qui vous inspire dans ses relations. Qu\'aimeriez-vous apprendre d\'elle ?',
      category: 'Inspiration',
      difficulty: 'easy',
      description: 'Trouvez des modèles pour votre développement personnel'
    }
  ];

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'happy': return '😊';
      case 'neutral': return '😐';
      case 'sad': return '😢';
      case 'excited': return '🤩';
      case 'frustrated': return '😤';
      case 'peaceful': return '😌';
      default: return '😐';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'reflection': return <Brain className="h-4 w-4" />;
      case 'gratitude': return <Heart className="h-4 w-4" />;
      case 'challenge': return <Star className="h-4 w-4" />;
      case 'insight': return <Lightbulb className="h-4 w-4" />;
      case 'goal': return <TrendingUp className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'reflection': return 'bg-blue-100 text-blue-700';
      case 'gratitude': return 'bg-pink-100 text-pink-700';
      case 'challenge': return 'bg-orange-100 text-orange-700';
      case 'insight': return 'bg-yellow-100 text-yellow-700';
      case 'goal': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'deep': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredEntries = selectedCategory === 'all' 
    ? journalEntries 
    : journalEntries.filter(entry => entry.category === selectedCategory);

  const analyticsData = {
    totalEntries: journalEntries.length,
    entriesThisWeek: 3,
    mostUsedCategory: 'reflection',
    averageMood: 'happy',
    insightsGained: journalEntries.reduce((sum, entry) => sum + entry.insights.length, 0),
    streakDays: 7
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-50 via-blue-50 to-teal-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-purple-600" />
            Journal de Réflexion Personnel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Cultivez l'introspection et suivez votre évolution personnelle grâce à la réflexion guidée, 
            l'analyse de vos patterns et la documentation de vos insights.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">{analyticsData.totalEntries}</div>
              <div className="text-sm text-gray-600">Entrées totales</div>
            </div>
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{analyticsData.entriesThisWeek}</div>
              <div className="text-sm text-gray-600">Cette semaine</div>
            </div>
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{analyticsData.insightsGained}</div>
              <div className="text-sm text-gray-600">Insights</div>
            </div>
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">{analyticsData.streakDays}</div>
              <div className="text-sm text-gray-600">Jours de suite</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="entries" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Mes Entrées
          </TabsTrigger>
          <TabsTrigger value="prompts" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Prompts
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Insights
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analyse
          </TabsTrigger>
        </TabsList>

        {/* Entries Tab */}
        <TabsContent value="entries" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                Toutes
              </Button>
              <Button
                variant={selectedCategory === 'reflection' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('reflection')}
                className="flex items-center gap-1"
              >
                <Brain className="h-3 w-3" />
                Réflexions
              </Button>
              <Button
                variant={selectedCategory === 'gratitude' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('gratitude')}
                className="flex items-center gap-1"
              >
                <Heart className="h-3 w-3" />
                Gratitude
              </Button>
              <Button
                variant={selectedCategory === 'challenge' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('challenge')}
                className="flex items-center gap-1"
              >
                <Star className="h-3 w-3" />
                Défis
              </Button>
            </div>
            
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nouvelle entrée
            </Button>
          </div>

          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <Card key={entry.id} className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedEntry(entry)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-800">{entry.title}</h3>
                        <span className="text-lg">{getMoodEmoji(entry.mood)}</span>
                        {entry.conflictAnalyzed && (
                          <Badge className="bg-blue-100 text-blue-700 text-xs">
                            <Eye className="h-3 w-3 mr-1" />
                            Analysé
                          </Badge>
                        )}
                        {entry.isPrivate && (
                          <Badge variant="outline" className="text-xs">
                            Privé
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {entry.content}
                      </p>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getCategoryColor(entry.category)}>
                          {getCategoryIcon(entry.category)}
                          <span className="ml-1 capitalize">{entry.category}</span>
                        </Badge>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(entry.date).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="flex gap-1 flex-wrap">
                        {entry.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {entry.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{entry.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  {entry.insights.length > 0 && (
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <h4 className="font-medium text-yellow-800 mb-1 flex items-center gap-1">
                        <Lightbulb className="h-3 w-3" />
                        Insights clés
                      </h4>
                      <p className="text-sm text-yellow-700">
                        {entry.insights[0]}
                        {entry.insights.length > 1 && (
                          <span className="text-yellow-600 ml-1">
                            (+{entry.insights.length - 1} autres)
                          </span>
                        )}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Prompts Tab */}
        <TabsContent value="prompts" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {reflectionPrompts.map((prompt) => (
              <Card key={prompt.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                      <Lightbulb className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-purple-100 text-purple-700">
                          {prompt.category}
                        </Badge>
                        <Badge className={getDifficultyColor(prompt.difficulty)}>
                          {prompt.difficulty}
                        </Badge>
                      </div>
                      
                      <p className="font-medium text-gray-800 mb-2 leading-relaxed">
                        {prompt.question}
                      </p>
                      
                      <p className="text-sm text-gray-600 mb-3">
                        {prompt.description}
                      </p>
                      
                      <Button size="sm" className="w-full">
                        <Plus className="h-3 w-3 mr-1" />
                        Réfléchir à cette question
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-4">
          <div className="space-y-4">
            {journalEntries.map((entry) => (
              entry.insights.length > 0 && (
                <Card key={entry.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
                        <Lightbulb className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-800">{entry.title}</h4>
                          <Badge className={getCategoryColor(entry.category)}>
                            {entry.category}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.date).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          {entry.insights.map((insight, index) => (
                            <div key={index} className="bg-yellow-50 p-3 rounded-lg">
                              <p className="text-sm text-yellow-800 leading-relaxed">
                                {insight}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Statistiques de Réflexion
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{analyticsData.totalEntries}</div>
                    <div className="text-sm text-gray-600">Entrées totales</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{analyticsData.entriesThisWeek}</div>
                    <div className="text-sm text-gray-600">Cette semaine</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{analyticsData.insightsGained}</div>
                    <div className="text-sm text-gray-600">Insights</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{analyticsData.streakDays}</div>
                    <div className="text-sm text-gray-600">Jours de suite</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pink-600" />
                  Humeur et Bien-être
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{getMoodEmoji(analyticsData.averageMood)}</div>
                    <p className="text-sm text-gray-600">Humeur moyenne</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Entrées positives</span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Catégorie favorite</span>
                      <span className="text-sm font-medium capitalize">{analyticsData.mostUsedCategory}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Moyenne insights/entrée</span>
                      <span className="text-sm font-medium">
                        {(analyticsData.insightsGained / analyticsData.totalEntries).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de détail d'entrée */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getCategoryIcon(selectedEntry.category)}
                {selectedEntry.title}
                <span className="text-lg">{getMoodEmoji(selectedEntry.mood)}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className={getCategoryColor(selectedEntry.category)}>
                  {selectedEntry.category}
                </Badge>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(selectedEntry.date).toLocaleDateString()}
                </span>
                {selectedEntry.isPrivate && (
                  <Badge variant="outline">Privé</Badge>
                )}
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedEntry.content}
                </p>
              </div>
              
              {selectedEntry.insights.length > 0 && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Insights de cette réflexion
                  </h4>
                  <ul className="space-y-2">
                    {selectedEntry.insights.map((insight, index) => (
                      <li key={index} className="text-sm text-yellow-700 flex items-start gap-2">
                        <Star className="h-3 w-3 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex gap-1 flex-wrap">
                {selectedEntry.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedEntry(null)}
                >
                  Fermer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Widget d'encouragement */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Continuez votre voyage intérieur</h3>
              <p className="text-gray-600">La réflexion régulière transforme votre vie</p>
            </div>
          </div>
          
          <p className="text-gray-700 mb-4 leading-relaxed">
            Vous avez déjà écrit {analyticsData.totalEntries} entrées et gagné {analyticsData.insightsGained} insights précieux. 
            Chaque réflexion vous rapproche de la personne que vous voulez devenir.
          </p>
          
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Réflexion
            </Button>
            <Button variant="outline">
              <Lightbulb className="h-4 w-4 mr-2" />
              Prompt Aléatoire
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
