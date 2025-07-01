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
  CheckSquare,
  Menu,
  X
} from 'lucide-react';

const PersonalDevelopment = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Vue', icon: Sparkles, color: 'from-purple-500 to-blue-500' },
    { id: 'recommendations', label: 'IA', icon: Lightbulb, color: 'from-yellow-500 to-orange-500' },
    { id: 'challenges', label: 'Défis', icon: Target, color: 'from-red-500 to-pink-500' },
    { id: 'habits', label: 'Habitudes', icon: CheckSquare, color: 'from-green-500 to-emerald-500' },
    { id: 'meditation', label: 'Méditation', icon: Headphones, color: 'from-indigo-500 to-purple-500' },
    { id: 'voice', label: 'Voix', icon: Mic, color: 'from-blue-500 to-cyan-500' },
    { id: 'mentoring', label: 'Mentorat', icon: Users, color: 'from-teal-500 to-green-500' },
    { id: 'achievements', label: 'Succès', icon: Award, color: 'from-orange-500 to-red-500' },
    { id: 'coach', label: 'Coach', icon: MessageSquare, color: 'from-violet-500 to-purple-500' },
    { id: 'journal', label: 'Journal', icon: BookOpen, color: 'from-cyan-500 to-blue-500' }
  ];

  const quickActions = [
    {
      title: 'Suggestions IA',
      description: 'Recommandations personnalisées basées sur votre profil',
      icon: Lightbulb,
      color: 'from-yellow-400 via-orange-400 to-red-400',
      tab: 'recommendations',
      stats: '12 nouvelles'
    },
    {
      title: 'Suivi Habitudes',
      description: 'Développez vos compétences jour après jour',
      icon: CheckSquare,
      color: 'from-green-400 via-emerald-400 to-teal-400',
      tab: 'habits',
      stats: '5 actives'
    },
    {
      title: 'Méditation Guidée',
      description: 'Sessions de relaxation et mindfulness',
      icon: Headphones,
      color: 'from-purple-400 via-violet-400 to-indigo-400',
      tab: 'meditation',
      stats: '8 min'
    },
    {
      title: 'Analyse Vocale',
      description: 'Comprenez vos émotions par la voix',
      icon: Mic,
      color: 'from-blue-400 via-cyan-400 to-sky-400',
      tab: 'voice',
      stats: 'Nouveau'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/50">
      <MotivationNotifications />
      
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Mobile Optimized */}
          <header className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Heart className="text-white h-8 w-8 sm:h-10 sm:w-10 animate-pulse" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-700 via-blue-700 to-indigo-800 bg-clip-text text-transparent mb-2 sm:mb-4">
              Développement Personnel
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl text-slate-600 mb-1 sm:mb-2 px-4">
              Transformez vos relations, développez votre empathie
            </p>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4">
              Un écosystème complet pour développer vos compétences relationnelles avec l'IA
            </p>
          </header>

          {/* Mobile Tab Navigation */}
          <div className="block sm:hidden mb-6">
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variant="outline"
              className="w-full justify-between mb-3 py-3 bg-white/80 backdrop-blur-sm border-slate-200 shadow-sm"
            >
              <span className="flex items-center gap-2">
                {tabs.find(tab => tab.id === activeTab)?.icon && 
                  React.createElement(tabs.find(tab => tab.id === activeTab)!.icon, { className: "h-4 w-4" })
                }
                {tabs.find(tab => tab.id === activeTab)?.label}
              </span>
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
            
            {isMobileMenuOpen && (
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-accordion-down">
                <div className="grid grid-cols-2 gap-1 p-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-2 p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        activeTab === tab.id 
                          ? `bg-gradient-to-br ${tab.color} text-white shadow-md` 
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      <span className="truncate">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="hidden sm:block mb-6 lg:mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-slate-200">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-10 gap-1 bg-transparent">
                  {tabs.map((tab) => (
                    <TabsTrigger 
                      key={tab.id}
                      value={tab.id} 
                      className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                        activeTab === tab.id 
                          ? `bg-gradient-to-br ${tab.color} text-white shadow-md transform scale-105` 
                          : 'text-slate-700 hover:bg-slate-100 hover:scale-102'
                      }`}
                    >
                      <tab.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline lg:inline">{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>

            {/* Overview Tab - Enhanced */}
            <TabsContent value="overview" className="space-y-6">
              {/* Quick Actions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {quickActions.map((action, index) => (
                  <Card 
                    key={action.title}
                    className={`group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br ${action.color} p-0 overflow-hidden transform hover:scale-105 hover:-translate-y-1`}
                    onClick={() => setActiveTab(action.tab)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-0 relative">
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
                      <div className="relative p-4 sm:p-6 text-white">
                        <div className="flex items-center justify-between mb-3">
                          <action.icon className="h-8 w-8 sm:h-10 sm:w-10 opacity-90" />
                          <span className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                            {action.stats}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm sm:text-base mb-2 group-hover:translate-x-1 transition-transform duration-300">
                          {action.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                          {action.description}
                        </p>
                        <div className="mt-4 flex items-center text-xs font-medium opacity-90">
                          Explorer
                          <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Personal Insights with enhanced mobile layout */}
              <div className="animate-fade-in">
                <PersonalInsights />
              </div>
            </TabsContent>

            {/* Other Tabs */}
            <TabsContent value="recommendations" className="animate-fade-in">
              <PersonalRecommendations />
            </TabsContent>

            <TabsContent value="challenges" className="animate-fade-in">
              <PersonalGrowthModule />
            </TabsContent>

            <TabsContent value="habits" className="animate-fade-in">
              <HabitTracker />
            </TabsContent>

            <TabsContent value="meditation" className="animate-fade-in">
              <GuidedMeditation />
            </TabsContent>

            <TabsContent value="voice" className="animate-fade-in">
              <VoiceEmotionAnalysis />
            </TabsContent>

            <TabsContent value="mentoring" className="animate-fade-in">
              <PeerMentoring />
            </TabsContent>

            <TabsContent value="achievements" className="animate-fade-in">
              <AchievementSystem />
            </TabsContent>

            <TabsContent value="coach" className="animate-fade-in">
              <PersonalCoach />
            </TabsContent>

            <TabsContent value="journal" className="animate-fade-in">
              <ReflectionJournal />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PersonalDevelopment;
