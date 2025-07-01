
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Plus, 
  Calendar, 
  Heart, 
  Brain, 
  Target,
  TrendingUp,
  Sparkles,
  Search,
  Filter,
  Download,
  Share2,
  Star,
  Clock,
  Lightbulb,
  BarChart3,
  Smile,
  Meh,
  Frown
} from 'lucide-react';

interface JournalEntry {
  id: string;
  date: Date;
  title: string;
  content: string;
  mood: 'positive' | 'neutral' | 'negative';
  category: 'relationship' | 'work' | 'family' | 'personal';
  tags: string[];
  insights: string[];
  goals: string[];
  gratitude: string[];
  challenges: string[];
}

interface MoodStats {
  positive: number;
  neutral: number;
  negative: number;
}

export const ReflectionJournal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<Partial<JournalEntry>>({
    title: '',
    content: '',
    mood: 'neutral',
    category: 'personal',
    tags: [],
    insights: [],
    goals: [],
    gratitude: [],
    challenges: []
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [moodStats, setMoodStats] = useState<MoodStats>({ positive: 0, neutral: 0, negative: 0 });

  const categories = [
    { id: 'all', label: 'Toutes', icon: BookOpen },
    { id: 'relationship', label: 'Relations', icon: Heart },
    { id: 'work', label: 'Travail', icon: Target },
    { id: 'family', label: 'Famille', icon: Heart },
    { id: 'personal', label: 'Personnel', icon: Brain }
  ];

  const moodOptions = [
    { value: 'positive', label: 'Positif', icon: Smile, color: 'text-green-600' },
    { value: 'neutral', label: 'Neutre', icon: Meh, color: 'text-yellow-600' },
    { value: 'negative', label: 'Difficile', icon: Frown, color: 'text-red-600' }
  ];

  const promptQuestions = [
    "Comment me suis-je senti aujourd'hui dans mes relations ?",
    "Quelle situation m'a le plus marqué émotionnellement ?",
    "Qu'ai-je appris sur moi-même récemment ?",
    "Comment ai-je géré les conflits cette semaine ?",
    "Quels sont mes objectifs relationnels pour demain ?"
  ];

  useEffect(() => {
    // Simuler des entrées existantes
    const mockEntries: JournalEntry[] = [
      {
        id: '1',
        date: new Date(Date.now() - 86400000),
        title: 'Conversation difficile avec Marie',
        content: 'Aujourd\'hui, j\'ai eu une discussion tendue avec Marie au travail. J\'ai réalisé que je n\'écoutais pas vraiment son point de vue...',
        mood: 'negative',
        category: 'work',
        tags: ['communication', 'écoute', 'travail'],
        insights: ['Je dois améliorer mon écoute active', 'Les émotions interfèrent avec ma compréhension'],
        goals: ['Pratiquer l\'écoute active cette semaine'],
        gratitude: ['Marie a pris le temps de m\'expliquer son ressenti'],
        challenges: ['Gérer mes réactions émotionnelles']
      },
      {
        id: '2',
        date: new Date(Date.now() - 172800000),
        title: 'Moment de connexion avec mon enfant',
        content: 'Ce soir, nous avons eu une belle conversation sur ses peurs. J\'ai utilisé la technique de validation émotionnelle...',
        mood: 'positive',
        category: 'family',
        tags: ['enfant', 'écoute', 'empathie'],
        insights: ['La validation émotionnelle fonctionne vraiment', 'Mon enfant s\'ouvre quand je ne juge pas'],
        goals: ['Continuer ces moments privilégiés'],
        gratitude: ['La confiance de mon enfant', 'Ce moment de connexion'],
        challenges: []
      }
    ];

    setEntries(mockEntries);
    updateMoodStats(mockEntries);
  }, []);

  const updateMoodStats = (entriesList: JournalEntry[]) => {
    const stats = entriesList.reduce((acc, entry) => {
      acc[entry.mood]++;
      return acc;
    }, { positive: 0, neutral: 0, negative: 0 });
    
    setMoodStats(stats);
  };

  const handleSaveEntry = () => {
    if (!currentEntry.title || !currentEntry.content) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date(),
      title: currentEntry.title!,
      content: currentEntry.content!,
      mood: currentEntry.mood!,
      category: currentEntry.category!,
      tags: currentEntry.tags || [],
      insights: currentEntry.insights || [],
      goals: currentEntry.goals || [],
      gratitude: currentEntry.gratitude || [],
      challenges: currentEntry.challenges || []
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    updateMoodStats(updatedEntries);
    
    setCurrentEntry({
      title: '',
      content: '',
      mood: 'neutral',
      category: 'personal',
      tags: [],
      insights: [],
      goals: [],
      gratitude: [],
      challenges: []
    });
    setIsWriting(false);
  };

  const handleAddTag = (field: keyof JournalEntry, value: string) => {
    if (!value.trim()) return;
    
    setCurrentEntry(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[] || []), value.trim()]
    }));
  };

  const handleRemoveTag = (field: keyof JournalEntry, index: number) => {
    setCurrentEntry(prev => ({
      ...prev,
      [field]: (prev[field] as string[])?.filter((_, i) => i !== index) || []
    }));
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || entry.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getMoodIcon = (mood: string) => {
    const moodOption = moodOptions.find(option => option.value === mood);
    return moodOption ? <moodOption.icon className={`h-4 w-4 ${moodOption.color}`} /> : null;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-1 sm:px-0">
      {/* Header with stats */}
      <Card className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 border-amber-200 shadow-lg">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
            Journal de Réflexion
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Mood statistics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-white/60 rounded-xl backdrop-blur-sm">
              <Smile className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-green-600">{moodStats.positive}</div>
              <div className="text-xs text-gray-600">Moments positifs</div>
            </div>
            <div className="text-center p-3 bg-white/60 rounded-xl backdrop-blur-sm">
              <Meh className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-yellow-600">{moodStats.neutral}</div>
              <div className="text-xs text-gray-600">Moments neutres</div>
            </div>
            <div className="text-center p-3 bg-white/60 rounded-xl backdrop-blur-sm">
              <Frown className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-red-600">{moodStats.negative}</div>
              <div className="text-xs text-gray-600">Défis</div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={() => setIsWriting(true)}
              className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Réflexion
            </Button>
            <Button variant="outline" size="sm" className="border-amber-300">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Writing interface */}
      {isWriting && (
        <Card className="bg-white shadow-lg border-slate-200 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-lg">Nouvelle Réflexion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="Titre de votre réflexion"
                value={currentEntry.title}
                onChange={(e) => setCurrentEntry(prev => ({ ...prev, title: e.target.value }))}
              />
              <select
                value={currentEntry.category}
                onChange={(e) => setCurrentEntry(prev => ({ ...prev, category: e.target.value as any }))}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                {categories.filter(cat => cat.id !== 'all').map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {moodOptions.map(mood => (
                <Button
                  key={mood.value}
                  variant={currentEntry.mood === mood.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentEntry(prev => ({ ...prev, mood: mood.value as any }))}
                  className="flex items-center gap-2"
                >
                  <mood.icon className={`h-4 w-4 ${mood.color}`} />
                  {mood.label}
                </Button>
              ))}
            </div>

            <Textarea
              placeholder="Écrivez votre réflexion..."
              value={currentEntry.content}
              onChange={(e) => setCurrentEntry(prev => ({ ...prev, content: e.target.value }))}
              className="min-h-32"
            />

            {/* Structured reflection */}
            <Tabs defaultValue="insights" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="insights">Insights</TabsTrigger>
                <TabsTrigger value="goals">Objectifs</TabsTrigger>
                <TabsTrigger value="gratitude">Gratitude</TabsTrigger>
                <TabsTrigger value="challenges">Défis</TabsTrigger>
              </TabsList>

              <TabsContent value="insights" className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Qu'avez-vous appris sur vous-même ?"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddTag('insights', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentEntry.insights?.map((insight, idx) => (
                    <Badge key={idx} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveTag('insights', idx)}>
                      {insight} ×
                    </Badge>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="goals" className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Quel objectif vous fixez-vous ?"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddTag('goals', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentEntry.goals?.map((goal, idx) => (
                    <Badge key={idx} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveTag('goals', idx)}>
                      {goal} ×
                    </Badge>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="gratitude" className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Pour quoi êtes-vous reconnaissant ?"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddTag('gratitude', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentEntry.gratitude?.map((item, idx) => (
                    <Badge key={idx} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveTag('gratitude', idx)}>
                      {item} ×
                    </Badge>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="challenges" className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Quel défi avez-vous rencontré ?"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddTag('challenges', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentEntry.challenges?.map((challenge, idx) => (
                    <Badge key={idx} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveTag('challenges', idx)}>
                      {challenge} ×
                    </Badge>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-2">
              <Button onClick={handleSaveEntry} className="flex-1 bg-amber-600 hover:bg-amber-700">
                Enregistrer
              </Button>
              <Button variant="outline" onClick={() => setIsWriting(false)}>
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher dans vos réflexions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="whitespace-nowrap"
            >
              <category.icon className="h-4 w-4 mr-2" />
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Entries list */}
      <div className="space-y-4">
        {filteredEntries.map((entry) => (
          <Card key={entry.id} className="bg-white hover:shadow-lg transition-shadow duration-300 border-slate-200">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getMoodIcon(entry.mood)}
                    <h3 className="font-semibold text-gray-800">{entry.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(entry.date)}
                    <Badge variant="outline" className="text-xs">
                      {categories.find(cat => cat.id === entry.category)?.label}
                    </Badge>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                {entry.content.length > 200 ? `${entry.content.substring(0, 200)}...` : entry.content}
              </p>

              {/* Tags and structured data */}
              <div className="space-y-3">
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {entry.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {entry.insights.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1 text-xs font-medium text-purple-700 mb-1">
                      <Lightbulb className="h-3 w-3" />
                      Insights
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {entry.insights.map((insight, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-purple-200 text-purple-700">
                          {insight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {entry.goals.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1 text-xs font-medium text-blue-700 mb-1">
                      <Target className="h-3 w-3" />
                      Objectifs
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {entry.goals.map((goal, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-blue-200 text-blue-700">
                          {goal}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredEntries.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              {searchTerm ? 'Aucune réflexion trouvée' : 'Commencez votre journal'}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'Essayez avec d\'autres mots-clés' : 'Partagez vos réflexions sur vos relations et votre développement personnel'}
            </p>
            {!searchTerm && (
              <Button onClick={() => setIsWriting(true)} className="bg-amber-600 hover:bg-amber-700">
                <Plus className="h-4 w-4 mr-2" />
                Écrire ma première réflexion
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
