
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalGrowthModule } from '../components/PersonalGrowthModule';
import { ReflectionJournal } from '../components/ReflectionJournal';
import { PersonalInsights } from '../components/PersonalInsights';
import { 
  TrendingUp, 
  BookOpen, 
  Brain, 
  Target,
  Heart,
  Star,
  Sparkles
} from 'lucide-react';

const PersonalDevelopment = () => {
  const [activeTab, setActiveTab] = useState('growth');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-700 rounded-2xl mb-4 shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-700 to-blue-800 bg-clip-text text-transparent mb-3">
              Votre Développement Personnel
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Devenez la meilleure version de vous-même. Transformez vos relations, 
              développez votre empathie et créez des connexions authentiques.
            </p>
          </div>

          {/* Motivation Card */}
          <Card className="mb-8 bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 border-2 border-purple-200 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-4 text-center">
                <div className="flex items-center gap-2">
                  <Heart className="h-6 w-6 text-red-500" />
                  <span className="font-semibold text-gray-800">Relations Plus Profondes</span>
                </div>
                <div className="w-px h-8 bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <Brain className="h-6 w-6 text-purple-500" />
                  <span className="font-semibold text-gray-800">Intelligence Émotionnelle</span>
                </div>
                <div className="w-px h-8 bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                  <span className="font-semibold text-gray-800">Épanouissement Personnel</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-white shadow-md">
              <TabsTrigger 
                value="growth" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
              >
                <Target className="w-4 h-4" />
                Défis & Croissance
              </TabsTrigger>
              <TabsTrigger 
                value="reflection" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
              >
                <BookOpen className="w-4 h-4" />
                Journal de Réflexion
              </TabsTrigger>
              <TabsTrigger 
                value="insights" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
              >
                <Brain className="w-4 h-4" />
                Insights Personnels
              </TabsTrigger>
            </TabsList>

            <TabsContent value="growth" className="mt-6">
              <PersonalGrowthModule />
            </TabsContent>

            <TabsContent value="reflection" className="mt-6">
              <ReflectionJournal />
            </TabsContent>

            <TabsContent value="insights" className="mt-6">
              <PersonalInsights />
            </TabsContent>
          </Tabs>

          {/* Footer Motivation */}
          <Card className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-800">Votre Transformation Continue</h3>
              </div>
              <p className="text-gray-700 mb-4 max-w-2xl mx-auto leading-relaxed">
                Chaque jour est une opportunité de grandir. Vous ne développez pas seulement de meilleures relations - 
                vous devenez une personne plus épanouie, plus connectée, plus authentique.
              </p>
              <p className="text-sm text-gray-600 italic">
                "La croissance personnelle n'est pas un événement, c'est un mode de vie." 
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PersonalDevelopment;
