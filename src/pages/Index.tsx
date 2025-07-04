
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
  CheckCircle,
  Sparkles,
  Zap
} from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-indigo-600" />,
      title: "AI Personal Coach",
      description: "Smart assistant to guide you through your relationships"
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Empathetic Analysis", 
      description: "Understand emotions and perspectives in your conflicts"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      title: "Personal Growth",
      description: "Track progress and develop emotional intelligence"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
      title: "Guided Conversations",
      description: "Learn non-violent communication techniques"
    }
  ];

  const benefits = [
    "Resolve personal and professional conflicts",
    "Improve your communication skills",
    "Develop empathy and emotional intelligence", 
    "Personalized progress tracking",
    "24/7 AI coach access"
  ];

  const testimonials = [
    {
      text: "ECHO helped me understand my family conflicts and build better relationships. A revolutionary tool!",
      author: "Sarah M.",
      rating: 5
    },
    {
      text: "The AI analysis is incredibly insightful. I've learned so much about communication.",
      author: "James R.", 
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <header className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl mb-8 shadow-2xl">
              <span className="text-4xl font-bold text-white">E</span>
            </div>
            
            <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-700 bg-clip-text text-transparent mb-6">
              ECHO
            </h1>
            
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-yellow-500" />
              <p className="text-3xl text-slate-700 font-light">
                Your Empathetic AI Coach
              </p>
              <Sparkles className="h-6 w-6 text-yellow-500" />
            </div>
            
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Develop your emotional intelligence, resolve conflicts with wisdom,
              and transform your relationships through advanced psychological analysis and non-violent communication.
            </p>
            
            {!user && (
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <Link to="/auth">
                  <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-5 text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    Start Free Now
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Free • No commitment • Instant results</span>
                </div>
              </div>
            )}
          </header>

          {/* Main App Demo */}
          <div className="mb-20">
            <EchoSimulator />
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-sm border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white">
                <CardContent className="p-8 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-3 text-lg">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits & Testimonials */}
          {!user && (
            <div className="grid lg:grid-cols-2 gap-12 mb-20">
              {/* Benefits */}
              <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-xl">
                <CardContent className="p-10">
                  <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                    <Zap className="h-8 w-8 text-yellow-500" />
                    Why Choose ECHO?
                  </h2>
                  <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-lg">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Testimonials */}
              <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-xl">
                <CardContent className="p-10">
                  <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                    <Users className="h-8 w-8 text-blue-500" />
                    What Users Say
                  </h2>
                  <div className="space-y-6">
                    {testimonials.map((testimonial, index) => (
                      <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                        <div className="flex items-center gap-1 mb-3">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                          ))}
                        </div>
                        <p className="text-gray-700 italic mb-3 text-lg">
                          "{testimonial.text}"
                        </p>
                        <p className="text-gray-600 font-medium">- {testimonial.author}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* CTA Section */}
          {!user && (
            <div className="text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-3xl p-16 shadow-2xl">
              <h2 className="text-5xl font-bold mb-6">
                Ready to Transform Your Relationships?
              </h2>
              <p className="text-2xl mb-10 opacity-90">
                Join thousands building emotional intelligence with ECHO.
              </p>
              <Link to="/auth">
                <Button size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-gray-100 px-12 py-6 text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  Start Your Journey Now
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <p className="mt-6 text-lg opacity-75">
                100% Free • No credit card • Instant access
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
