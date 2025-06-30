
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Lightbulb, 
  Clock, 
  TrendingUp, 
  Users,
  MessageCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface Suggestion {
  id: string;
  type: 'quick_analysis' | 'template' | 'tip' | 'pattern';
  title: string;
  description: string;
  content: string;
  category: string;
  priority: number;
}

interface SmartSuggestionsProps {
  onSelectSuggestion: (suggestion: Suggestion) => void;
  userHistory?: any[];
}

export const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({
  onSelectSuggestion,
  userHistory = []
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const baseSuggestions: Suggestion[] = [
    {
      id: 'work_conflict',
      type: 'template',
      title: 'Conflit avec un collègue',
      description: 'Template pour analyser les tensions professionnelles',
      content: 'Mon collègue [nom] et moi avons un désaccord sur [sujet]. Il pense que [sa position] tandis que je crois que [ma position]. Cela affecte notre travail parce que [impact].',
      category: 'Professionnel',
      priority: 8
    },
    {
      id: 'family_dispute',
      type: 'template',
      title: 'Dispute familiale',
      description: 'Pour résoudre les conflits en famille',
      content: 'Il y a une tension dans ma famille concernant [sujet]. [Membre de famille] ressent [émotion] parce que [raison]. De mon côté, je [ma perspective].',
      category: 'Familial',
      priority: 9
    },
    {
      id: 'quick_check',
      type: 'quick_analysis',
      title: 'Analyse Express',
      description: 'Une analyse rapide en 30 secondes',
      content: 'Mode analyse rapide activé',
      category: 'Rapide',
      priority: 7
    },
    {
      id: 'empathy_tip',
      type: 'tip',
      title: 'Booster votre empathie',
      description: 'Technique pour mieux comprendre l\'autre',
      content: 'Avant de répondre, posez-vous: "Qu\'est-ce qui pourrait pousser cette personne à agir ainsi?" Imaginez 3 raisons positives.',
      category: 'Conseil',
      priority: 6
    },
    {
      id: 'romantic_conflict',
      type: 'template',
      title: 'Tension de couple',
      description: 'Résoudre les conflits relationnels',
      content: 'Mon/ma partenaire et moi avons un problème avec [sujet]. Il/elle se sent [émotion] parce que [raison]. Moi, je ressens [mon émotion] car [ma raison].',
      category: 'Relationnel',
      priority: 8
    },
    {
      id: 'friend_issue',
      type: 'template',
      title: 'Problème d\'amitié',
      description: 'Gérer les conflits entre amis',
      content: 'Mon ami(e) [nom] et moi avons eu un malentendu sur [situation]. Je pense qu\'il/elle [interprétation] mais en réalité [ce qui s\'est passé].',
      category: 'Amical',
      priority: 7
    }
  ];

  const categories = ['all', 'Professionnel', 'Familial', 'Relationnel', 'Amical', 'Conseil', 'Rapide'];

  useEffect(() => {
    // Analyser l'historique pour des suggestions personnalisées
    const personalizedSuggestions = [...baseSuggestions];
    
    if (userHistory.length > 0) {
      // Ajouter des suggestions basées sur l'historique
      const recentCategories = userHistory.slice(0, 3).map(h => h.category || 'Général');
      const mostUsedCategory = recentCategories[0] || 'Professionnel';
      
      personalizedSuggestions.unshift({
        id: 'based_on_history',
        type: 'pattern',
        title: `Analyse similaire (${mostUsedCategory})`,
        description: 'Basé sur vos analyses récentes',
        content: `Analyser un nouveau cas de type ${mostUsedCategory.toLowerCase()}`,
        category: mostUsedCategory,
        priority: 10
      });
    }

    // Suggestion du moment selon l'heure
    const hour = new Date().getHours();
    let timeBasedSuggestion: Suggestion;
    
    if (hour < 12) {
      timeBasedSuggestion = {
        id: 'morning_boost',
        type: 'tip',
        title: 'Boost matinal 🌅',
        description: 'Commencez la journée avec de l\'empathie',
        content: 'Prenez 2 minutes pour réfléchir aux interactions d\'hier. Y a-t-il quelqu\'un que vous pourriez mieux comprendre ?',
        category: 'Conseil',
        priority: 9
      };
    } else if (hour < 18) {
      timeBasedSuggestion = {
        id: 'midday_check',
        type: 'quick_analysis',
        title: 'Check de mi-journée ⚡',
        description: 'Une tension au travail ?',
        content: 'Analysez rapidement un conflit professionnel',
        category: 'Professionnel',
        priority: 8
      };
    } else {
      timeBasedSuggestion = {
        id: 'evening_reflect',
        type: 'tip',
        title: 'Réflexion du soir 🌙',
        description: 'Digérez les interactions de la journée',
        content: 'Repensez à une conversation difficile d\'aujourd\'hui. Que pourriez-vous améliorer ?',
        category: 'Conseil',
        priority: 8
      };
    }
    
    personalizedSuggestions.unshift(timeBasedSuggestion);
    
    setSuggestions(personalizedSuggestions.sort((a, b) => b.priority - a.priority));
  }, [userHistory]);

  const filteredSuggestions = activeCategory === 'all' 
    ? suggestions 
    : suggestions.filter(s => s.category === activeCategory);

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'quick_analysis': return <Clock className="h-4 w-4" />;
      case 'template': return <MessageCircle className="h-4 w-4" />;
      case 'tip': return <Lightbulb className="h-4 w-4" />;
      case 'pattern': return <TrendingUp className="h-4 w-4" />;
      default: return <Sparkles className="h-4 w-4" />;
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'quick_analysis': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'template': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'tip': return 'bg-green-50 text-green-700 border-green-200';
      case 'pattern': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-blue-600" />
          Suggestions Intelligentes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filtres par catégorie */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="whitespace-nowrap"
            >
              {category === 'all' ? 'Tout' : category}
            </Button>
          ))}
        </div>

        {/* Liste des suggestions */}
        <div className="grid gap-3">
          {filteredSuggestions.slice(0, 6).map((suggestion) => (
            <Card
              key={suggestion.id}
              className={`hover:shadow-md transition-all cursor-pointer border ${getSuggestionColor(suggestion.type)}`}
              onClick={() => onSelectSuggestion(suggestion)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-lg bg-white/50">
                      {getSuggestionIcon(suggestion.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 mb-1">
                        {suggestion.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {suggestion.description}
                      </p>
                      {suggestion.type === 'tip' && (
                        <p className="text-xs text-gray-500 italic">
                          {suggestion.content}
                        </p>
                      )}
                      <Badge className="text-xs mt-2">
                        {suggestion.category}
                      </Badge>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSuggestions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>Aucune suggestion pour cette catégorie</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
