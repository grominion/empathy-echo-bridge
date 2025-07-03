import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Sparkles, 
  Users, 
  BarChart3, 
  MessageSquare, 
  Heart,
  Star,
  CheckCircle,
  ArrowRight,
  Lock
} from 'lucide-react';

interface GuestModeInfoProps {
  feature?: string;
}

export const GuestModeInfo: React.FC<GuestModeInfoProps> = ({ feature }) => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
      title: "Suivi des Progrès",
      description: "Visualisez votre évolution dans la résolution de conflits",
      premium: true
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-green-600" />,
      title: "Historique Complet",
      description: "Accédez à toutes vos analyses passées",
      premium: true
    },
    {
      icon: <Users className="h-6 w-6 text-purple-600" />,
      title: "Coach Personnel IA",
      description: "Conversations illimitées avec votre coach empathique",
      premium: true
    },
    {
      icon: <Heart className="h-6 w-6 text-red-500" />,
      title: "Développement Personnel",
      description: "Modules complets pour améliorer vos relations",
      premium: true
    },
    {
      icon: <Shield className="h-6 w-6 text-indigo-600" />,
      title: "Données Sécurisées",
      description: "Toutes vos analyses sont sauvegardées en sécurité",
      premium: true
    },
    {
      icon: <Sparkles className="h-6 w-6 text-yellow-500" />,
      title: "Suggestions Personnalisées",
      description: "Recommandations adaptées à votre profil",
      premium: true
    }
  ];

  const benefits = [
    "Analyses illimitées de vos conflits",
    "Suivi personnalisé de vos progrès", 
    "Coach IA disponible 24h/24",
    "Historique sécurisé de vos analyses",
    "Modules de développement personnel",
    "Communauté d'entraide"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent mb-4">
              Débloquez tout le potentiel d'ECHO
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
              {feature 
                ? `Pour accéder à ${feature}, créez votre compte gratuit et développez votre intelligence émotionnelle.`
                : "Créez votre compte gratuit pour accéder à toutes les fonctionnalités avancées d'ECHO."
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                size="lg" 
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Créer mon compte gratuit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-sm text-gray-500">
                <CheckCircle className="inline h-4 w-4 text-green-500 mr-1" />
                100% gratuit • Aucune carte bancaire • Accès immédiat
              </p>
            </div>
          </div>

          {/* Mode invité actuel */}
          <Card className="mb-8 border-yellow-200 bg-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-yellow-200 rounded-lg">
                  <Shield className="h-5 w-5 text-yellow-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-800">Mode Invité Activé</h3>
                  <p className="text-sm text-yellow-700">Vous utilisez ECHO sans compte. Fonctionnalités limitées.</p>
                </div>
              </div>
              <div className="text-sm text-yellow-700">
                ✅ Analyse basique de conflits disponible<br/>
                🔒 Sauvegarde, historique et coaching avancé nécessitent un compte
              </div>
            </CardContent>
          </Card>

          {/* Fonctionnalités premium */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="relative overflow-hidden border-gray-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  {feature.premium && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                      <Lock className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Témoignage */}
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 mb-8">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-lg text-gray-700 italic mb-4 max-w-2xl mx-auto">
                "Grâce à ECHO, j'ai appris à mieux gérer mes conflits familiaux et professionnels. 
                Le coach IA est incredibly et les analyses sont précises. Un outil révolutionnaire !"
              </p>
              <p className="font-semibold text-gray-800">- Sarah M., utilisatrice depuis 6 mois</p>
            </CardContent>
          </Card>

          {/* Liste des bénéfices */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-gray-800">
                Pourquoi rejoindre ECHO ?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Avec votre compte gratuit :</h3>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
                      <Heart className="h-16 w-16 text-indigo-600" />
                    </div>
                    <p className="text-sm text-gray-600">
                      Rejoignez des milliers d'utilisateurs qui transforment leurs relations
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-8 pt-6 border-t border-gray-200">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/auth')}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Commencer maintenant - C'est gratuit !
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="mt-4 text-sm text-gray-500">
                  Aucune carte bancaire requise • Accès immédiat • Données sécurisées
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Retour à l'accueil */}
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="px-6 py-2"
            >
              Retour à l'analyse gratuite
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};