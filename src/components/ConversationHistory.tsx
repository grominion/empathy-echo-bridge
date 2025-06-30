
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { History, Star, Search, Download, Share, Calendar, TrendingUp, MessageSquare, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LoadingSpinner } from './LoadingSpinner';

interface ConversationItem {
  id: string;
  title: string;
  conflict_description: string;
  created_at: string;
  is_favorite: boolean;
  analysis_result: any;
}

interface ConversationStats {
  total: number;
  favorites: number;
  thisWeek: number;
  avgPerWeek: number;
}

export const ConversationHistory: React.FC = () => {
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState<ConversationItem | null>(null);
  const [stats, setStats] = useState<ConversationStats>({ total: 0, favorites: 0, thisWeek: 0, avgPerWeek: 0 });
  const [filter, setFilter] = useState<'all' | 'favorites' | 'recent'>('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('conversation_history')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const convs = data || [];
      setConversations(convs);
      calculateStats(convs);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger l'historique",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (convs: ConversationItem[]) => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const firstConv = convs[convs.length - 1];
    
    const thisWeek = convs.filter(c => new Date(c.created_at) > weekAgo).length;
    const weeksActive = firstConv ? Math.max(1, Math.ceil((now.getTime() - new Date(firstConv.created_at).getTime()) / (7 * 24 * 60 * 60 * 1000))) : 1;
    
    setStats({
      total: convs.length,
      favorites: convs.filter(c => c.is_favorite).length,
      thisWeek,
      avgPerWeek: Math.round(convs.length / weeksActive * 10) / 10
    });
  };

  const toggleFavorite = async (id: string, isFavorite: boolean) => {
    try {
      const { error } = await supabase
        .from('conversation_history')
        .update({ is_favorite: !isFavorite })
        .eq('id', id);

      if (error) throw error;
      
      setConversations(prev => prev.map(conv => 
        conv.id === id ? { ...conv, is_favorite: !isFavorite } : conv
      ));
      
      toast({
        title: !isFavorite ? "Ajouté aux favoris ⭐" : "Retiré des favoris",
        description: !isFavorite ? "Cette analyse est maintenant dans vos favoris" : "Cette analyse n'est plus dans vos favoris"
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier le favori",
        variant: "destructive"
      });
    }
  };

  const exportConversation = (conversation: ConversationItem) => {
    const content = `
ECHO - Analyse de Conflit
========================

Titre: ${conversation.title}
Date: ${new Date(conversation.created_at).toLocaleDateString('fr-FR')}

Description du conflit:
${conversation.conflict_description}

Analyse:
${JSON.stringify(conversation.analysis_result, null, 2)}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `echo-analysis-${conversation.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export réussi 📥",
      description: "Votre analyse a été téléchargée"
    });
  };

  const shareConversation = async (conversation: ConversationItem) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `ECHO - ${conversation.title}`,
          text: conversation.conflict_description,
          url: window.location.href
        });
      } catch (error) {
        console.log('Partage annulé');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Lien copié 🔗",
        description: "Le lien a été copié dans le presse-papiers"
      });
    }
  };

  const getFilteredConversations = () => {
    let filtered = conversations;
    
    if (filter === 'favorites') {
      filtered = filtered.filter(conv => conv.is_favorite);
    } else if (filter === 'recent') {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(conv => new Date(conv.created_at) > weekAgo);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(conv =>
        conv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.conflict_description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const filteredConversations = getFilteredConversations();

  if (isLoading) {
    return <LoadingSpinner message="Chargement de votre historique..." size="lg" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <History className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold">Votre Historique</h2>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-gray-600">Analyses totales</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="text-2xl font-bold">{stats.favorites}</p>
              <p className="text-sm text-gray-600">Favoris</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-2xl font-bold">{stats.thisWeek}</p>
              <p className="text-sm text-gray-600">Cette semaine</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-2xl font-bold">{stats.avgPerWeek}</p>
              <p className="text-sm text-gray-600">Moy./semaine</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher dans l'historique..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            size="sm"
          >
            Tout
          </Button>
          <Button
            variant={filter === 'favorites' ? 'default' : 'outline'}
            onClick={() => setFilter('favorites')}
            size="sm"
          >
            <Star className="h-4 w-4 mr-1" />
            Favoris
          </Button>
          <Button
            variant={filter === 'recent' ? 'default' : 'outline'}
            onClick={() => setFilter('recent')}
            size="sm"
          >
            <Clock className="h-4 w-4 mr-1" />
            Récents
          </Button>
        </div>
      </div>

      {/* Liste des conversations */}
      <div className="grid gap-4">
        {filteredConversations.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                {searchTerm ? 'Aucun résultat trouvé' : 'Aucune conversation trouvée'}
              </h3>
              <p className="text-gray-500">
                {searchTerm ? 'Essayez avec des mots-clés différents' : 'Commencez une nouvelle analyse pour voir l\'historique ici.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredConversations.map((conversation) => (
            <Card key={conversation.id} className="hover:shadow-lg transition-all duration-200 hover:scale-[1.01]">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {conversation.title}
                      {conversation.is_favorite && (
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      )}
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(conversation.created_at).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(conversation.id, conversation.is_favorite)}
                      className="hover:bg-yellow-50"
                    >
                      <Star className={`h-4 w-4 ${conversation.is_favorite ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => exportConversation(conversation)}
                      className="hover:bg-blue-50"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => shareConversation(conversation)}
                      className="hover:bg-green-50"
                    >
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 line-clamp-3 mb-4 leading-relaxed">
                  {conversation.conflict_description}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                    Analyse complète
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedConversation(conversation)}
                    className="hover:bg-blue-50"
                  >
                    Voir l'analyse
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
