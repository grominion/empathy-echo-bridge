
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  MessageSquare, 
  Heart,
  Share2,
  BookOpen,
  HelpCircle,
  Star,
  ThumbsUp,
  Clock,
  TrendingUp,
  Award,
  User,
  Send,
  Plus,
  Filter,
  Search
} from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorLevel: number;
  category: 'question' | 'success' | 'resource' | 'discussion';
  replies: number;
  likes: number;
  createdAt: string;
  tags: string[];
  isHelpful: boolean;
}

interface CommunityMember {
  id: string;
  name: string;
  level: number;
  title: string;
  contributions: number;
  helpfulAnswers: number;
  joinedAt: string;
  avatar: string;
  isOnline: boolean;
}

export const CommunityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'forum' | 'members' | 'events' | 'resources'>('forum');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'question' | 'success' | 'resource' | 'discussion'>('all');

  const forumPosts: ForumPost[] = [
    {
      id: '1',
      title: 'Comment gérer un conflit avec un collègue têtu ?',
      content: 'J\'ai un collègue qui refuse d\'écouter mes idées. Chaque réunion devient un conflit...',
      author: 'Marie L.',
      authorLevel: 4,
      category: 'question',
      replies: 12,
      likes: 8,
      createdAt: '2024-01-02',
      tags: ['travail', 'communication', 'écoute'],
      isHelpful: false
    },
    {
      id: '2',
      title: '🎉 Succès : Réconciliation avec ma sœur après 2 ans !',
      content: 'Grâce aux techniques apprises ici, j\'ai enfin pu renouer avec ma sœur. Voici comment...',
      author: 'Thomas R.',
      authorLevel: 6,
      category: 'success',
      replies: 24,
      likes: 45,
      createdAt: '2024-01-01',
      tags: ['famille', 'réconciliation', 'empathie'],
      isHelpful: true
    },
    {
      id: '3',
      title: 'Ressource : Les 5 phrases magiques pour désamorcer un conflit',
      content: 'Voici une liste de phrases que j\'utilise régulièrement et qui fonctionnent vraiment...',
      author: 'Sarah M.',
      authorLevel: 8,
      category: 'resource',
      replies: 18,
      likes: 67,
      createdAt: '2023-12-30',
      tags: ['techniques', 'phrases', 'désamorcer'],
      isHelpful: true
    },
    {
      id: '4',
      title: 'Discussion : L\'empathie, ça s\'apprend vraiment ?',
      content: 'Je me demande si certaines personnes sont naturellement plus empathiques...',
      author: 'Alex P.',
      authorLevel: 7,
      category: 'discussion',
      replies: 31,
      likes: 23,
      createdAt: '2023-12-28',
      tags: ['empathie', 'psychologie', 'débat'],
      isHelpful: false
    },
    {
      id: '5',
      title: 'Aide : Mon adolescent ne me parle plus',
      content: 'Depuis 6 mois, ma fille de 16 ans évite les conversations. Comment renouer ?',
      author: 'Julie D.',
      authorLevel: 3,
      category: 'question',
      replies: 15,
      likes: 12,
      createdAt: '2023-12-27',
      tags: ['adolescent', 'famille', 'communication'],
      isHelpful: false
    }
  ];

  const communityMembers: CommunityMember[] = [
    {
      id: '1',
      name: 'Sarah M.',
      level: 8,
      title: 'Maître de l\'Harmonie',
      contributions: 156,
      helpfulAnswers: 89,
      joinedAt: '2023-06-15',
      avatar: '👩‍🦰',
      isOnline: true
    },
    {
      id: '2',
      name: 'Alex P.',
      level: 7,
      title: 'Sage Connecté',
      contributions: 124,
      helpfulAnswers: 67,
      joinedAt: '2023-08-20',
      avatar: '👨‍💼',
      isOnline: true
    },
    {
      id: '3',
      name: 'Marie L.',
      level: 6,
      title: 'Expert Relationnel',
      contributions: 89,
      helpfulAnswers: 45,
      joinedAt: '2023-09-10',
      avatar: '👩‍🎨',
      isOnline: false
    },
    {
      id: '4',
      name: 'Thomas R.',
      level: 6,
      title: 'Expert Relationnel',
      contributions: 92,
      helpfulAnswers: 52,
      joinedAt: '2023-07-05',
      avatar: '👨‍🔬',
      isOnline: true
    }
  ];

  const upcomingEvents = [
    {
      id: '1',
      title: 'Atelier : Communication Non-Violente',
      date: '2024-01-10',
      time: '19:00',
      participants: 23,
      maxParticipants: 30,
      host: 'Sarah M.',
      description: 'Découvrez les bases de la CNV avec notre experte communautaire'
    },
    {
      id: '2',
      title: 'Cercle de Parole : Conflits Familiaux',
      date: '2024-01-15',
      time: '20:00',
      participants: 12,
      maxParticipants: 15,
      host: 'Alex P.',
      description: 'Échangez avec d\'autres parents sur vos défis familiaux'
    },
    {
      id: '3',
      title: 'Défi Communautaire : 7 jours de gratitude',
      date: '2024-01-20',
      time: '00:00',
      participants: 87,
      maxParticipants: 100,
      host: 'Équipe EchoSim',
      description: 'Rejoignez notre défi pour cultiver la gratitude ensemble'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'question': return <HelpCircle className="h-4 w-4" />;
      case 'success': return <Star className="h-4 w-4" />;
      case 'resource': return <BookOpen className="h-4 w-4" />;
      case 'discussion': return <MessageSquare className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'question': return 'bg-blue-100 text-blue-700';
      case 'success': return 'bg-green-100 text-green-700';
      case 'resource': return 'bg-purple-100 text-purple-700';
      case 'discussion': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredPosts = selectedCategory === 'all' 
    ? forumPosts 
    : forumPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-50 via-blue-50 to-teal-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6 text-purple-600" />
            Centre Communautaire EchoSim
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Rejoignez notre communauté bienveillante de plus de 2,500 membres qui s'entraident 
            pour développer leurs compétences relationnelles et résoudre leurs conflits.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">2,547</div>
              <div className="text-sm text-gray-600">Membres actifs</div>
            </div>
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">1,234</div>
              <div className="text-sm text-gray-600">Discussions</div>
            </div>
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">456</div>
              <div className="text-sm text-gray-600">Succès partagés</div>
            </div>
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">89</div>
              <div className="text-sm text-gray-600">Événements</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="forum" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Forum
          </TabsTrigger>
          <TabsTrigger value="members" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Membres
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Événements
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Ressources
          </TabsTrigger>
        </TabsList>

        {/* Forum Tab */}
        <TabsContent value="forum" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                Tous
              </Button>
              <Button
                variant={selectedCategory === 'question' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('question')}
                className="flex items-center gap-1"
              >
                <HelpCircle className="h-3 w-3" />
                Questions
              </Button>
              <Button
                variant={selectedCategory === 'success' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('success')}
                className="flex items-center gap-1"
              >
                <Star className="h-3 w-3" />
                Succès
              </Button>
              <Button
                variant={selectedCategory === 'resource' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('resource')}
                className="flex items-center gap-1"
              >
                <BookOpen className="h-3 w-3" />
                Ressources
              </Button>
            </div>
            
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nouvelle discussion
            </Button>
          </div>

          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`${getCategoryColor(post.category)} flex items-center gap-1`}>
                          {getCategoryIcon(post.category)}
                          {post.category}
                        </Badge>
                        {post.isHelpful && (
                          <Badge className="bg-yellow-100 text-yellow-700">
                            <Award className="h-3 w-3 mr-1" />
                            Utile
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className="font-semibold text-gray-800 mb-2 hover:text-blue-600 cursor-pointer">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {post.content}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author} (Niv. {post.authorLevel})
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {post.replies} réponses
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {post.likes} likes
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="flex gap-1 mt-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {communityMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <div className="text-3xl">{member.avatar}</div>
                      {member.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{member.name}</h4>
                      <p className="text-sm text-gray-600">{member.title}</p>
                      <Badge className="bg-blue-100 text-blue-700 text-xs">
                        Niveau {member.level}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Contributions</p>
                      <p className="font-semibold">{member.contributions}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Réponses utiles</p>
                      <p className="font-semibold">{member.helpfulAnswers}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Message
                    </Button>
                    <Button size="sm" variant="outline">
                      <User className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-4">
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-2">{event.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(event.date).toLocaleDateString()} à {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {event.participants}/{event.maxParticipants} participants
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          Animé par {event.host}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {Math.round((event.participants / event.maxParticipants) * 100)}% complet
                        </span>
                      </div>
                    </div>
                    
                    <Button className="ml-4">
                      Participer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Guides Pratiques</h4>
                    <p className="text-sm text-gray-600">12 guides téléchargeables</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Techniques de communication, résolution de conflits, développement de l'empathie
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Parcourir les guides
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Star className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Témoignages</h4>
                    <p className="text-sm text-gray-600">89 histoires de succès</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Découvrez comment d'autres membres ont transformé leurs relations
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Lire les témoignages
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
