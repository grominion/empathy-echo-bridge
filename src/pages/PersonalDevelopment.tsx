
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
import { PeerMentoring } from '@/components/PeerMentoring';
import { PersonalRecommendations } from '@/components/PersonalRecommendations';
import { GuidedMeditation } from '@/components/GuidedMeditation';
import { HabitTracker } from '@/components/HabitTracker';
import { VoiceEmotionAnalysis } from '@/components/VoiceEmotionAnalysis';
import { AchievementSystem } from '@/components/AchievementSystem';
import { 
  Trophy, 
  Target, 
  Users, 
  BookOpen, 
  Brain,
  MessageSquare,
  Sparkles,
  Heart,
  Lightbulb,
  Mic,
  Calendar,
  Award,
  Headphones,
  CheckSquare
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
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-10 mb-8">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Vue</span>
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                <span className="hidden sm:inline">Suggestions</span>
              </TabsTrigger>
              <TabsTrigger value="challenges" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span className="hidden sm:inline">Défis</span>
              </TabsTrigger>
              <TabsTrigger value="habits" className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Habitudes</span>
              </TabsTrigger>
              <TabsTrigger value="meditation" className="flex items-center gap-2">
                <Headphones className="h-4 w-4" />
                <span className="hidden sm:inline">Méditation</span>
              </TabsTrigger>
              <TabsTrigger value="voice" className="flex items-center gap-2">
                <Mic className="h-4 w-4" />
                <span className="hidden sm:inline">Voix</span>
              </TabsTrigger>
              <TabsTrigger value="mentoring" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Mentorat</span>
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span className="hidden sm:inline">Succès</span>
              </TabsTrigger>
              <TabsTrigger value="coach" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Coach</span>
              </TabsTrigger>
              <TabsTrigger value="journal" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Journal</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-4 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setActiveTab('recommendations')}>
                  <CardContent className="p-4 text-center">
                    <Lightbulb className="h-10 w-10 mx-auto mb-3 text-purple-600" />
                    <h3 className="font-bold text-sm text-gray-800 mb-2">Suggestions IA</h3>
                    <p className="text-gray-600 text-xs mb-3">
                      Recommandations personnalisées
                    </p>
                    <Button variant="outline" size="sm">Explorer</Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setActiveTab('habits')}>
                  <CardContent className="p-4 text-center">
                    <CheckSquare className="h-10 w-10 mx-auto mb-3 text-green-600" />
                    <h3 className="font-bold text-sm text-gray-800 mb-2">Suivi Habitudes</h3>
                    <p className="text-gray-600 text-xs mb-3">
                      Développez jour après jour
                    </p>
                    <Button variant="outline" size="sm">Commencer</Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setActiveTab('meditation')}>
                  <CardContent className="p-4 text-center">
                    <Headphones className="h-10 w-10 mx-auto mb-3 text-orange-600" />
                    <h3 className="font-bold text-sm text-gray-800 mb-2">Méditation</h3>
                    <p className="text-gray-600 text-xs mb-3">
                      Sessions guidées
                    </p>
                    <Button variant="outline" size="sm">Méditer</Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setActiveTab('voice')}>
                  <CardContent className="p-4 text-center">
                    <Mic className="h-10 w-10 mx-auto mb-3 text-indigo-600" />
                    <h3 className="font-bold text-sm text-gray-800 mb-2">Analyse Vocale</h3>
                    <p className="text-gray-600 text-xs mb-3">
                      Émotions par la voix
                    </p>
                    <Button variant="outline" size="sm">Analyser</Button>
                  </CardContent>
                </Card>
              </div>

              <PersonalInsights />
            </TabsContent>

            {/* Recommendations Tab */}
            <TabsContent value="recommendations">
              <PersonalRecommendations />
            </TabsContent>

            {/* Challenges Tab */}
            <TabsContent value="challenges">
              <PersonalGrowthModule />
            </TabsContent>

            {/* Habits Tab */}
            <TabsContent value="habits">
              <HabitTracker />
            </TabsContent>

            {/* Meditation Tab */}
            <TabsContent value="meditation">
              <GuidedMeditation />
            </TabsContent>

            {/* Voice Analysis Tab */}
            <TabsContent value="voice">
              <VoiceEmotionAnalysis />
            </TabsContent>

            {/* Peer Mentoring Tab */}
            <TabsContent value="mentoring">
              <PeerMentoring />
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <AchievementSystem />
            </TabsContent>

            {/* Coach Tab */}
            <TabsContent value="coach">
              <PersonalCoach />
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
