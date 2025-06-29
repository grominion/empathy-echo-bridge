
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { History, Star, Search, Download, Share } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ConversationItem {
  id: string;
  title: string;
  conflict_description: string;
  created_at: string;
  is_favorite: boolean;
  analysis_result: any;
}

export const ConversationHistory: React.FC = () => {
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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
      setConversations(data || []);
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

  const toggleFavorite = async (id: string, isFavorite: boolean) => {
    try {
      const { error } = await supabase
        .from('conversation_history')
        .update({ is_favorite: !isFavorite })
        .eq('id', id);

      if (error) throw error;
      fetchConversations();
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
        title: "Lien copié",
        description: "Le lien a été copié dans le presse-papiers"
      });
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.conflict_description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <History className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold">Historique des Conversations</h2>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher dans l'historique..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredConversations.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                Aucune conversation trouvée
              </h3>
              <p className="text-gray-500">
                Commencez une nouvelle analyse pour voir l'historique ici.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredConversations.map((conversation) => (
            <Card key={conversation.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      {conversation.title}
                      {conversation.is_favorite && (
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      )}
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(conversation.created_at).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(conversation.id, conversation.is_favorite)}
                    >
                      <Star className={`h-4 w-4 ${conversation.is_favorite ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => exportConversation(conversation)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => shareConversation(conversation)}
                    >
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 line-clamp-3 mb-4">
                  {conversation.conflict_description}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">
                    Analyse complète
                  </Badge>
                  <Button variant="outline" size="sm">
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
