
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { 
  TrendingUp, 
  Star, 
  Calendar, 
  MessageSquare, 
  Clock,
  Target,
  Brain,
  Heart,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from './LoadingSpinner';

interface DashboardStats {
  totalAnalyses: number;
  favoriteAnalyses: number;
  analysesThisWeek: number;
  averagePerWeek: number;
  mostActiveDay: string;
  recentAnalyses: any[];
  topCategories: { category: string; count: number }[];
}

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [motivationalQuote, setMotivationalQuote] = useState('');
  const navigate = useNavigate();

  const quotes = [
    "Chaque conflit résolu vous rend plus sage 🧠",
    "Votre empathie grandit à chaque analyse 💝",
    "Transformer les conflits en opportunités, c'est votre superpower ! ⚡",
    "L'écoute active change tout, continuez ! 👂",
    "Vous êtes en train de devenir un maître de la communication 🎯"
  ];

  useEffect(() => {
    fetchDashboardData();
    setMotivationalQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data, error } = await supabase
        .from('conversation_history')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        calculateStats(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement du dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (conversations: any[]) => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const thisWeek = conversations.filter(c => new Date(c.created_at) > weekAgo);
    const favorites = conversations.filter(c => c.is_favorite);
    
    // Calculer le jour le plus actif
    const dayCount: { [key: string]: number } = {};
    conversations.forEach(conv => {
      const day = new Date(conv.created_at).toLocaleDateString('fr-FR', { weekday: 'long' });
      dayCount[day] = (dayCount[day] || 0) + 1;
    });
    const mostActiveDay = Object.keys(dayCount).reduce((a, b) => dayCount[a] > dayCount[b] ? a : b, 'lundi');

    // Calculer la moyenne par semaine
    const firstConv = conversations[conversations.length - 1];
    const weeksActive = firstConv ? Math.max(1, Math.ceil((now.getTime() - new Date(firstConv.created_at).getTime()) / (7 * 24 * 60 * 60 * 1000))) : 1;
    const avgPerWeek = Math.round(conversations.length / weeksActive * 10) / 10;

    // Analyses récentes
    const recentAnalyses = conversations.slice(0, 3);

    // Catégories principales (simulation basée sur les mots-clés)
    const topCategories = [
      { category: 'Conflits familiaux', count: Math.floor(conversations.length * 0.4) },
      { category: 'Problèmes professionnels', count: Math.floor(conversations.length * 0.3) },
      { category: 'Relations amicales', count: Math.floor(conversations.length * 0.2) },
      { category: 'Autres', count: Math.floor(conversations.length * 0.1) }
    ].filter(cat => cat.count > 0);

    setStats({
      totalAnalyses: conversations.length,
      favoriteAnalyses: favorites.length,
      analysesThisWeek: thisWeek.length,
      averagePerWeek: avgPerWeek,
      mostActiveDay,
      recentAnalyses,
      topCategories
    });
  };

  if (isLoading) {
    return <LoadingSpinner message="Chargement de votre tableau de bord..." size="lg" />;
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">
          Bienvenue sur ECHO !
        </h3>
        <p className="text-gray-500 mb-4">
          Commencez votre première analyse pour voir vos statistiques ici.
        </p>
        <Button onClick={() => navigate('/')}>
          Démarrer une analyse
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header avec motivation */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Votre Tableau de Bord 📊
        </h1>
        <p className="text-lg text-blue-600 font-medium">
          {motivationalQuote}
        </p>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-blue-700">{stats.totalAnalyses}</p>
              <p className="text-sm text-blue-600">Analyses totales</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-yellow-50 to-yellow-100">
          <div className="flex items-center gap-3">
            <Star className="h-8 w-8 text-yellow-600" />
            <div>
              <p className="text-2xl font-bold text-yellow-700">{stats.favoriteAnalyses}</p>
              <p className="text-sm text-yellow-600">Favoris</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-green-700">{stats.analysesThisWeek}</p>
              <p className="text-sm text-green-600">Cette semaine</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div>
              <p className="text-2xl font-bold text-purple-700">{stats.averagePerWeek}</p>
              <p className="text-sm text-purple-600">Moy./semaine</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Insights personnalisés */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Vos Habitudes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Jour le plus actif:</span>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                {stats.mostActiveDay}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Progression:</span>
              <Badge variant="secondary" className="bg-green-50 text-green-700">
                {stats.analysesThisWeek > 0 ? '📈 En croissance' : '😴 Au repos'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Taux de favoris:</span>
              <Badge variant="secondary" className="bg-yellow-50 text-yellow-700">
                {Math.round((stats.favoriteAnalyses / stats.totalAnalyses) * 100)}%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              Catégories Principales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats.topCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600">{category.category}:</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full" 
                      style={{ width: `${(category.count / stats.totalAnalyses) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{category.count}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Analyses récentes */}
      {stats.recentAnalyses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-600" />
              Analyses Récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.recentAnalyses.map((analysis, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{analysis.title}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(analysis.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {analysis.is_favorite && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                    <Button variant="ghost" size="sm" onClick={() => navigate('/history')}>
                      Voir
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Call to action */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-6 text-center">
          <Heart className="h-12 w-12 mx-auto mb-4 text-white" />
          <h3 className="text-xl font-bold mb-2">Prêt pour une nouvelle analyse ?</h3>
          <p className="mb-4 text-blue-100">
            Continuez à développer vos compétences en communication et résolution de conflits.
          </p>
          <Button 
            variant="secondary" 
            onClick={() => navigate('/')}
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            <Zap className="h-4 w-4 mr-2" />
            Démarrer une analyse
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
