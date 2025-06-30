
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Plus, 
  Calendar, 
  Heart,
  Lightbulb,
  Target,
  TrendingUp,
  Star,
  Filter,
  Search,
  Edit,
  Trash2,
  Save
} from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: 'excellent' | 'good' | 'neutral' | 'difficult' | 'challenging';
  category: 'gratitude' | 'reflection' | 'goal' | 'relationship' | 'learning';
  tags: string[];
  insights: string[];
}

export const ReflectionJournal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: new Date().toISOString(),
      title: 'Conversation difficile avec mon collègue',
      content: 'Aujourd\'hui j\'ai eu une conversation tendue avec Marc au bureau. Au lieu de réagir émotionnellement comme d\'habitude, j\'ai pris une pause et j\'ai essayé de comprendre son point de vue. J\'ai réalisé qu\'il était stressé par les délais du projet. Cette approche a complètement changé la dynamique de notre échange.',
      mood: 'good',
      category: 'relationship',
      tags: ['travail', 'empathie', 'communication'],
      insights: [
        'La pause avant de réagir est puissante',
        'Chercher la cause sous-jacente aide à désamorcer les tensions',
        'L\'empathie transforme les conflits en connexions'
      ]
    },
    {
      id: '2',
      date: new Date(Date.now() - 86400000).toISOString(),
      title: 'Gratitude pour ma famille',
      content: 'Ce soir, ma fille m\'a spontanément dit merci pour l\'aide aux devoirs. Ces petits moments me rappellent pourquoi il est important d\'être présent et patient, même quand c\'est difficile. Je me sens reconnaissant pour ces connexions authentiques.',
      mood: 'excellent',
      category: 'gratitude',
      tags: ['famille', 'reconnaissance', 'présence'],
      insights: [
        'Les petits gestes comptent énormément',
        'La patience crée des espaces pour la connexion',
        'La gratitude amplifie les moments positifs'
      ]
    }
  ]);

  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: 'neutral' as const,
    category: 'reflection' as const,
    tags: [] as string[]
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const moodColors = {
    excellent: 'bg-green-100 text-green-700 border-green-200',
    good: 'bg-blue-100 text-blue-700 border-blue-200',
    neutral: 'bg-gray-100 text-gray-700 border-gray-200',
    difficult: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    challenging: 'bg-red-100 text-red-700 border-red-200'
  };

  const categoryColors = {
    gratitude: 'bg-pink-100 text-pink-700',
    reflection: 'bg-purple-100 text-purple-700',
    goal: 'bg-blue-100 text-blue-700',
    relationship: 'bg-green-100 text-green-700',
    learning: 'bg-orange-100 text-orange-700'
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || entry.category === filter;
    return matchesSearch && matchesFilter;
  });

  const saveEntry = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      title: newEntry.title,
      content: newEntry.content,
      mood: newEntry.mood,
      category: newEntry.category,
      tags: newEntry.tags,
      insights: []
    };

    setEntries(prev => [entry, ...prev]);
    setNewEntry({
      title: '',
      content: '',
      mood: 'neutral',
      category: 'reflection',
      tags: []
    });
  };

  const prompts = [
    "Qu'est-ce qui m'a fait me sentir connecté(e) aujourd'hui ?",
    "Comment ai-je géré une situation difficile récemment ?",
    "Pour quoi suis-je reconnaissant(e) en ce moment ?",
    "Qu'est-ce que j'ai appris sur moi-même cette semaine ?",
    "Comment mes relations ont-elles évolué ?",
    "Quel petit progrès puis-je célébrer ?"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-50 via-blue-50 to-green-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-purple-600" />
            Journal de Développement Personnel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Documentez votre parcours, célébrez vos progrès et transformez vos expériences en sagesse.
          </p>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{entries.length}</div>
              <div className="text-sm text-gray-600">Réflexions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {entries.reduce((acc, entry) => acc + entry.insights.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Insights</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.floor((Date.now() - new Date(entries[entries.length - 1]?.date || Date.now()).getTime()) / (1000 * 60 * 60 * 24)) + 1}
              </div>
              <div className="text-sm text-gray-600">Jours actifs</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Writing Prompts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            Inspirations pour Écrire
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {prompts.map((prompt, index) => (
              <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors"
                   onClick={() => setNewEntry(prev => ({ ...prev, title: prompt }))}>
                <p className="text-sm text-blue-800">{prompt}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* New Entry Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-green-600" />
            Nouvelle Réflexion
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            type="text"
            placeholder="Titre de votre réflexion..."
            value={newEntry.title}
            onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <Textarea
            placeholder="Partagez vos pensées, vos découvertes, vos émotions..."
            value={newEntry.content}
            onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
            rows={4}
          />
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Humeur</label>
              <select
                value={newEntry.mood}
                onChange={(e) => setNewEntry(prev => ({ ...prev, mood: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="excellent">Excellent</option>
                <option value="good">Bien</option>
                <option value="neutral">Neutre</option>
                <option value="difficult">Difficile</option>
                <option value="challenging">Challengeant</option>
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
              <select
                value={newEntry.category}
                onChange={(e) => setNewEntry(prev => ({ ...prev, category: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="reflection">Réflexion</option>
                <option value="gratitude">Gratitude</option>
                <option value="goal">Objectif</option>
                <option value="relationship">Relation</option>
                <option value="learning">Apprentissage</option>
              </select>
            </div>
          </div>
          
          <Button onClick={saveEntry} className="w-full bg-gradient-to-r from-purple-500 to-blue-500">
            <Save className="h-4 w-4 mr-2" />
            Sauvegarder ma Réflexion
          </Button>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3 items-center">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher dans vos réflexions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Toutes</option>
              <option value="gratitude">Gratitude</option>
              <option value="reflection">Réflexion</option>
              <option value="goal">Objectifs</option>
              <option value="relationship">Relations</option>
              <option value="learning">Apprentissage</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Journal Entries */}
      <div className="space-y-4">
        {filteredEntries.map((entry) => (
          <Card key={entry.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{entry.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {new Date(entry.date).toLocaleDateString('fr-FR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Badge className={moodColors[entry.mood]}>
                    {entry.mood}
                  </Badge>
                  <Badge className={categoryColors[entry.category]}>
                    {entry.category}
                  </Badge>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                {entry.content}
              </p>
              
              {entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {entry.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
              
              {entry.insights.length > 0 && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                  <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Insights Clés
                  </h4>
                  <ul className="space-y-1">
                    {entry.insights.map((insight, index) => (
                      <li key={index} className="text-sm text-yellow-700">
                        • {insight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
