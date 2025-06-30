import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Plus, 
  Calendar,
  TrendingUp,
  Heart,
  Star,
  Edit3,
  Save,
  X
} from 'lucide-react';

interface ReflectionEntry {
  id: string;
  date: string;
  prompt: string;
  response: string;
  mood: 'positive' | 'neutral' | 'challenging';
  insights: string[];
  relationshipImpact: number; // 1-5 scale
}

interface ReflectionPrompt {
  id: string;
  text: string;
  category: 'self_awareness' | 'relationships' | 'growth' | 'conflicts';
  difficulty: 'easy' | 'medium' | 'deep';
}

export const ReflectionJournal: React.FC = () => {
  const [entries, setEntries] = useState<ReflectionEntry[]>([
    {
      id: '1',
      date: '2024-01-15',
      prompt: 'Décrivez une situation récente où vous avez réagi différemment que d\'habitude. Qu\'est-ce qui a changé en vous ?',
      response: 'Hier, au lieu de m\'énerver contre mon collègue, j\'ai pris une pause et j\'ai essayé de comprendre son point de vue. Je réalise que je deviens plus patient.',
      mood: 'positive',
      insights: ['Plus de patience', 'Meilleure écoute', 'Moins de réactivité'],
      relationshipImpact: 4
    }
  ]);

  const [selectedPrompt, setSelectedPrompt] = useState<ReflectionPrompt | null>(null);
  const [currentResponse, setCurrentResponse] = useState('');
  const [isWriting, setIsWriting] = useState(false);

  const reflectionPrompts: ReflectionPrompt[] = [
    {
      id: '1',
      text: 'Quelle est la dernière fois où vous avez vraiment écouté quelqu\'un sans penser à votre réponse ?',
      category: 'relationships',
      difficulty: 'easy'
    },
    {
      id: '2',
      text: 'Décrivez un moment où vous avez changé d\'avis sur quelqu\'un. Qu\'est-ce qui a provoqué ce changement ?',
      category: 'self_awareness',
      difficulty: 'medium'
    },
    {
      id: '3',
      text: 'Quel pattern de comportement aimeriez-vous changer dans vos relations ? Pourquoi ce pattern existe-t-il ?',
      category: 'growth',
      difficulty: 'deep'
    },
    {
      id: '4',
      text: 'Pensez à un conflit récent. Si vous pouviez le revivre, que feriez-vous différemment ?',
      category: 'conflicts',
      difficulty: 'medium'
    },
    {
      id: '5',
      text: 'Qu\'est-ce que vos relations vous apprennent sur vous-même ?',
      category: 'self_awareness',
      difficulty: 'deep'
    }
  ];

  const todayPrompt = reflectionPrompts[new Date().getDate() % reflectionPrompts.length];

  const startReflection = (prompt: ReflectionPrompt) => {
    setSelectedPrompt(prompt);
    setCurrentResponse('');
    setIsWriting(true);
  };

  const saveReflection = () => {
    if (!selectedPrompt || !currentResponse.trim()) return;

    const newEntry: ReflectionEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      prompt: selectedPrompt.text,
      response: currentResponse,
      mood: 'positive', // Default, user can change
      insights: [],
      relationshipImpact: 3
    };

    setEntries(prev => [newEntry, ...prev]);
    setIsWriting(false);
    setSelectedPrompt(null);
    setCurrentResponse('');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'self_awareness': return 'bg-purple-100 text-purple-700';
      case 'relationships': return 'bg-blue-100 text-blue-700';
      case 'growth': return 'bg-green-100 text-green-700';
      case 'conflicts': return 'bg-orange-100 text-orange-700';
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

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'positive': return 'bg-green-100 text-green-700';
      case 'neutral': return 'bg-gray-100 text-gray-700';
      case 'challenging': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            Journal de Réflexion - Votre Chemin vers une Meilleure Version de Vous
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            La réflexion quotidienne est l'outil le plus puissant pour développer votre intelligence émotionnelle 
            et améliorer vos relations. Chaque question vous aide à mieux vous comprendre et à grandir.
          </p>
          
          {/* Today's Prompt */}
          <Card className="bg-white border-2 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="font-semibold text-blue-800">Question du Jour</span>
                <Badge className={getCategoryColor(todayPrompt.category)}>
                  {todayPrompt.category.replace('_', ' ')}
                </Badge>
              </div>
              <p className="text-gray-700 mb-3">{todayPrompt.text}</p>
              <Button 
                onClick={() => startReflection(todayPrompt)}
                className="bg-gradient-to-r from-blue-500 to-purple-500"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Commencer ma Réflexion
              </Button>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Writing Interface */}
      {isWriting && selectedPrompt && (
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Edit3 className="h-5 w-5 text-blue-600" />
                Votre Réflexion
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsWriting(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800 font-medium mb-2">Question :</p>
              <p className="text-blue-700">{selectedPrompt.text}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Votre réflexion (prenez votre temps, soyez honnête avec vous-même)
              </label>
              <Textarea
                value={currentResponse}
                onChange={(e) => setCurrentResponse(e.target.value)}
                placeholder="Écrivez vos pensées, vos observations, vos insights... Il n'y a pas de mauvaise réponse, juste votre vérité."
                rows={6}
                className="w-full"
              />
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-800 text-sm">
                💡 <strong>Conseil :</strong> Soyez authentique et bienveillant envers vous-même. 
                Cette réflexion vous aide à grandir et à devenir la personne que vous voulez être.
              </p>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={saveReflection}
                disabled={!currentResponse.trim()}
                className="bg-gradient-to-r from-green-500 to-blue-500"
              >
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder ma Réflexion
              </Button>
              <Button 
                variant="outline"
                onClick={() => setIsWriting(false)}
              >
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Other Prompts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-600" />
            Autres Questions de Réflexion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {reflectionPrompts.filter(p => p.id !== todayPrompt.id).map((prompt) => (
              <Card 
                key={prompt.id} 
                className="cursor-pointer hover:shadow-md transition-all hover:bg-gray-50"
                onClick={() => startReflection(prompt)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex gap-2">
                      <Badge className={getCategoryColor(prompt.category)}>
                        {prompt.category.replace('_', ' ')}
                      </Badge>
                      <Badge className={getDifficultyColor(prompt.difficulty)}>
                        {prompt.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {prompt.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Previous Entries */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Vos Réflexions Précédentes - Votre Évolution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {entries.map((entry) => (
              <Card key={entry.id} className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {new Date(entry.date).toLocaleDateString('fr-FR')}
                      </span>
                      <Badge className={getMoodColor(entry.mood)}>
                        {entry.mood}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-3 w-3 ${
                            i < entry.relationshipImpact 
                              ? 'text-yellow-500 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-800 mb-1">Question :</p>
                    <p className="text-sm text-gray-600 italic">{entry.prompt}</p>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-800 mb-1">Votre réflexion :</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{entry.response}</p>
                  </div>

                  {entry.insights.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {entry.insights.map((insight, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {insight}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
