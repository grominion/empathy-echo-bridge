
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalGrowthModule } from '@/components/PersonalGrowthModule';
import { GamificationSystem } from '@/components/GamificationSystem';
import { PersonalCoach } from '@/components/PersonalCoach';
import { CommunityHub } from '@/components/CommunityHub';
import { ReflectionJournal } from '@/components/ReflectionJournal';
import { PersonalInsights } from '@/components/PersonalInsights';
import { MotivationNotifications } from '@/components/MotivationNotifications';
import { 
  Trophy, 
  Target, 
  Users, 
  BookOpen, 
  Brain,
  MessageSquare,
  Sparkles,
  Heart
} from 'lucide-react';

const PersonalDevelopment = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <MotivationNotifications />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-700 rounded-2xl mb-6 shadow-lg">
              <Heart className="text-3xl font-bold text-white h-10 w-10" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-700 to-blue-800 bg-clip-text text-transparent mb-4">
              Développement Personnel & Relations
            </h1>
            <p className="text-xl text-slate-600 mb-2">
              Transformez vos relations, développez votre empathie
            </p>
            <p className="text-sm text-slate-500 max-w-3xl mx-auto leading-relaxed">
              Un écosystème complet pour développer vos compétences relationnelles, 
              avec des défis personnalisés, un coaching IA, une communauté bienveillante 
              et des insights comportementaux avancés.
            </p>
          </header>

          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Vue d'ensemble</span>
              </TabsTrigger>
              <TabsTrigger value="challenges" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span className="hidden sm:inline">Défis</span>
              </TabsTrigger>
              <TabsTrigger value="gamification" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                <span className="hidden sm:inline">Niveaux</span>
              </TabsTrigger>
              <TabsTrigger value="coach" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Coach IA</span>
              </TabsTrigger>
              <TabsTrigger value="community" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Communauté</span>
              </TabsTrigger>
              <TabsTrigger value="journal" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Journal</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setActiveTab('challenges')}>
                  <CardContent className="p-6 text-center">
                    <Target className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                    <h3 className="font-bold text-lg text-gray-800 mb-2">Défis Quotidiens</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Challenges personnalisés pour développer votre empathie et vos relations
                    </p>
                    <Button variant="outline" size="sm">Voir mes défis</Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setActiveTab('coach')}>
                  <CardContent className="p-6 text-center">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-green-600" />
                    <h3 className="font-bold text-lg text-gray-800 mb-2">Coach Personnel IA</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Conseils personnalisés et accompagnement adapté à votre parcours
                    </p>
                    <Button variant="outline" size="sm">Parler à mon coach</Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setActiveTab('community')}>
                  <CardContent className="p-6 text-center">
                    <Users className="h-12 w-12 mx-auto mb-4 text-orange-600" />
                    <h3 className="font-bold text-lg text-gray-800 mb-2">Communauté</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Partagez, apprenez et grandissez avec d'autres personnes bienveillantes
                    </p>
                    <Button variant="outline" size="sm">Rejoindre</Button>
                  </CardContent>
                </Card>
              </div>

              <PersonalInsights />
            </TabsContent>

            {/* Challenges Tab */}
            <TabsContent value="challenges">
              <PersonalGrowthModule />
            </TabsContent>

            {/* Gamification Tab */}
            <TabsContent value="gamification">
              <GamificationSystem />
            </TabsContent>

            {/* Coach Tab */}
            <TabsContent value="coach">
              <PersonalCoach />
            </TabsContent>

            {/* Community Tab */}
            <TabsContent value="community">
              <CommunityHub />
            </TabsContent>

            {/* Journal Tab */}
            <TabsContent value="journal">
              <ReflectionJournal />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PersonalDevelopment;
