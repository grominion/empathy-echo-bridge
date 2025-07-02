
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { EchoSimulator } from '../components/EchoSimulator';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Heart, 
  Brain, 
  Users, 
  TrendingUp, 
  MessageSquare, 
  Shield,
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <Brain className="h-6 w-6 text-indigo-600" />,
      title: "Coach IA Personnel",
      description: "Un assistant intelligent pour vous guider dans vos relations"
    },
    {
      icon: <Heart className="h-6 w-6 text-red-500" />,
      title: "Analyse Empathique",
      description: "Comprenez les émotions et perspectives dans vos conflits"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-green-600" />,
      title: "Développement Personnel",
      description: "Suivez vos progrès et développez votre intelligence émotionnelle"
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-blue-600" />,
      title: "Conversations Guidées",
      description: "Apprenez à communiquer de manière non-violente"
    }
  ];

  const benefits = [
    "Résolution de conflits personnels et professionnels",
    "Amélioration de vos compétences en communication",
    "Développement de l'empathie et de l'intelligence émotionnelle",
    "Suivi personnalisé de vos progrès",
    "Accès à un coach IA disponible 24h/24"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <header className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl mb-6 shadow-lg">
              <span className="text-3xl font-bold text-white">E</span>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent mb-6">
              ECHO
            </h1>
            <p className="text-2xl text-slate-600 mb-4 font-light">
              Votre Coach Empathique IA
            </p>
            <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed mb-8">
              Développez votre intelligence émotionnelle, résolvez vos conflits avec sagesse,
              et transformez vos relations grâce à l'analyse psychologique avancée et la communication non-violente.
            </p>
            
            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link to="/auth">
                  <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    Commencer gratuitement
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <p className="text-sm text-gray-500">
                  <CheckCircle className="inline h-4 w-4 text-green-500 mr-1" />
                  Gratuit • Sans engagement • Résultats immédiats
                </p>
              </div>
            )}
          </header>

          {/* Demo Section */}
          <div className="mb-16">
            <EchoSimulator />
            
            {!user && (
              <div className="text-center mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Vous voulez plus de fonctionnalités ?
                </h3>
                <p className="text-gray-600 mb-4">
                  Créez un compte gratuit pour accéder au coach personnel, sauvegarder vos analyses et suivre vos progrès.
                </p>
                <Link to="/auth">
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                    Créer mon compte gratuit
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits Section */}
          {!user && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 mb-16">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                  Pourquoi choisir ECHO ?
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Bénéfices concrets</h3>
                    <ul className="space-y-3">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <Star className="h-5 w-5 text-yellow-500" />
                        <Star className="h-5 w-5 text-yellow-500" />
                        <Star className="h-5 w-5 text-yellow-500" />
                        <Star className="h-5 w-5 text-yellow-500" />
                      </div>
                      <p className="text-gray-700 italic mb-3">
                        "ECHO m'a aidé à comprendre mes conflits familiaux et à développer de meilleures relations. Un outil révolutionnaire !"
                      </p>
                      <p className="text-sm text-gray-600 font-medium">- Marie, utilisatrice</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CTA Section */}
          {!user && (
            <div className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-12 shadow-2xl">
              <h2 className="text-4xl font-bold mb-4">
                Prêt à transformer vos relations ?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Rejoignez des milliers d'utilisateurs qui développent leur intelligence émotionnelle avec ECHO.
              </p>
              <Link to="/auth">
                <Button size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Commencer maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="mt-4 text-sm opacity-75">
                100% gratuit • Pas de carte bancaire • Résultats instantanés
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
