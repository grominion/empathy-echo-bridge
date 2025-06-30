
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  Heart, 
  MessageSquare,
  ThumbsUp,
  Share2,
  Plus,
  Crown,
  Medal,
  Star,
  Lightbulb,
  BookOpen,
  Target
} from 'lucide-react';

interface CommunityPost {
  id: string;
  author: {
    name: string;
    level: number;
    avatar: string;
    title: string;
  };
  content: string;
  type: 'success_story' | 'question' | 'tip' | 'reflection';
  likes: number;
  comments: number;
  timeAgo: string;
  tags: string[];
}

interface CommunityMember {
  id: string;
  name: string;
  level: number;
  title: string;
  helpfulPosts: number;
  avatar: string;
  specialization: string;
}

export const CommunityHub: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'feed' | 'members' | 'share'>('feed');
  const [newPostContent, setNewPostContent] = useState('');

  const posts: CommunityPost[] = [
    {
      id: '1',
      author: {
        name: 'Marie L.',
        level: 4,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marie',
        title: 'Maître de l\'Empathie'
      },
      content: 'Hier, j\'ai eu ma première vraie conversation profonde avec mon adolescent après avoir appliqué les techniques d\'écoute active. Il m\'a parlé de ses vraies préoccupations au lieu de juste dire "ça va". Le changement dans notre relation est incroyable ! 💙',
      type: 'success_story',
      likes: 23,
      comments: 8,
      timeAgo: '2h',
      tags: ['famille', 'écoute active', 'adolescents']
    },
    {
      id: '2',
      author: {
        name: 'Thomas K.',
        level: 3,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas',
        title: 'Constructeur de Relations'
      },
      content: 'Question pour la communauté : Comment gérez-vous les conversations difficiles avec des collègues qui sont toujours sur la défensive ? J\'ai essayé plusieurs approches mais je n\'arrive pas à créer un climat de confiance...',
      type: 'question',
      likes: 5,
      comments: 12,
      timeAgo: '4h',
      tags: ['travail', 'conflit', 'défensivité']
    },
    {
      id: '3',
      author: {
        name: 'Sophie R.',
        level: 5,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
        title: 'Coach Relationnel'
      },
      content: '💡 Tip du jour : Avant une conversation importante, prenez 30 secondes pour vous demander "Quel est mon intention véritable ?" Veux-je avoir raison, ou veux-je comprendre ? Cette simple question change tout votre langage corporel et votre ton.',
      type: 'tip',
      likes: 45,
      comments: 15,
      timeAgo: '6h',
      tags: ['intention', 'communication', 'mindset']
    },
    {
      id: '4',
      author: {
        name: 'Alex M.',
        level: 2,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        title: 'Communicateur Conscient'
      },
      content: 'Réflexion du jour : J\'ai réalisé que quand je dis "Je comprends" à quelqu\'un, je coupe souvent sa parole. Maintenant j\'essaie de dire "Dis-moi en plus" à la place. La différence est énorme dans la profondeur de nos échanges.',
      type: 'reflection',
      likes: 18,
      comments: 6,
      timeAgo: '1j',
      tags: ['écoute', 'empathie', 'amélioration']
    }
  ];

  const topMembers: CommunityMember[] = [
    {
      id: '1',
      name: 'Sophie R.',
      level: 5,
      title: 'Coach Relationnel',
      helpfulPosts: 127,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
      specialization: 'Résolution de conflits'
    },
    {
      id: '2',
      name: 'David L.',
      level: 4,
      title: 'Maître de l\'Empathie',
      helpfulPosts: 89,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      specialization: 'Communication familiale'
    },
    {
      id: '3',
      name: 'Emma T.',
      level: 4,
      title: 'Maître de l\'Empathie',
      helpfulPosts: 76,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      specialization: 'Relations amoureuses'
    }
  ];

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'success_story': return <Star className="h-4 w-4 text-yellow-600" />;
      case 'question': return <MessageSquare className="h-4 w-4 text-blue-600" />;
      case 'tip': return <Lightbulb className="h-4 w-4 text-green-600" />;
      case 'reflection': return <BookOpen className="h-4 w-4 text-purple-600" />;
      default: return <MessageSquare className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPostTypeLabel = (type: string) => {
    switch (type) {
      case 'success_story': return 'Histoire de Succès';
      case 'question': return 'Question';
      case 'tip': return 'Conseil';
      case 'reflection': return 'Réflexion';
      default: return 'Post';
    }
  };

  const getLevelColor = (level: number) => {
    if (level >= 5) return 'text-yellow-600';
    if (level >= 4) return 'text-orange-600';
    if (level >= 3) return 'text-purple-600';
    if (level >= 2) return 'text-blue-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6 text-purple-600" />
            Communauté des Constructeurs de Relations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Connectez-vous avec d'autres personnes qui transforment leurs relations. 
            Partagez vos succès, posez vos questions, et grandissez ensemble.
          </p>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">2,847</div>
              <div className="text-sm text-gray-600">Membres actifs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1,234</div>
              <div className="text-sm text-gray-600">Histoires partagées</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">95%</div>
              <div className="text-sm text-gray-600">Satisfaits</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
        <Button
          variant={selectedTab === 'feed' ? 'default' : 'ghost'}
          onClick={() => setSelectedTab('feed')}
          className="flex-1"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Fil d'Actualité
        </Button>
        <Button
          variant={selectedTab === 'members' ? 'default' : 'ghost'}
          onClick={() => setSelectedTab('members')}
          className="flex-1"
        >
          <Users className="h-4 w-4 mr-2" />
          Membres Inspirants
        </Button>
        <Button
          variant={selectedTab === 'share' ? 'default' : 'ghost'}
          onClick={() => setSelectedTab('share')}
          className="flex-1"
        >
          <Plus className="h-4 w-4 mr-2" />
          Partager
        </Button>
      </div>

      {/* Feed Tab */}
      {selectedTab === 'feed' && (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-800">{post.author.name}</span>
                      <Badge className={`${getLevelColor(post.author.level)} bg-transparent border`}>
                        <Crown className="h-3 w-3 mr-1" />
                        Niveau {post.author.level}
                      </Badge>
                      <span className="text-xs text-gray-500">{post.author.title}</span>
                      <span className="text-xs text-gray-400">• {post.timeAgo}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      {getPostTypeIcon(post.type)}
                      <span className="text-sm font-medium text-gray-700">
                        {getPostTypeLabel(post.type)}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {post.content}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                        <Heart className="h-4 w-4" />
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                        <MessageSquare className="h-4 w-4" />
                        {post.comments}
                      </button>
                      <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
                        <Share2 className="h-4 w-4" />
                        Partager
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Members Tab */}
      {selectedTab === 'members' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topMembers.map((member) => (
            <Card key={member.id} className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <Avatar className="h-16 w-16 mx-auto mb-3">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <h3 className="font-semibold text-gray-800 mb-1">{member.name}</h3>
                
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Badge className={`${getLevelColor(member.level)} bg-transparent border`}>
                    <Crown className="h-3 w-3 mr-1" />
                    Niveau {member.level}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{member.title}</p>
                <p className="text-xs text-purple-600 font-medium mb-3">
                  Spécialité : {member.specialization}
                </p>
                
                <div className="flex items-center justify-center gap-1 mb-4">
                  <Medal className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-gray-600">
                    {member.helpfulPosts} posts utiles
                  </span>
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  <MessageSquare className="h-3 w-3 mr-2" />
                  Suivre
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Share Tab */}
      {selectedTab === 'share' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-blue-600" />
              Partagez Votre Expérience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Votre histoire peut inspirer et aider d'autres personnes dans leur parcours. 
              Qu'avez-vous appris récemment sur les relations humaines ?
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" size="sm">
                <Star className="h-4 w-4 mr-2" />
                Succès
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Question
              </Button>
              <Button variant="outline" size="sm">
                <Lightbulb className="h-4 w-4 mr-2" />
                Conseil
              </Button>
              <Button variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Réflexion
              </Button>
            </div>
            
            <Textarea
              placeholder="Partagez votre expérience, vos questions ou vos découvertes..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              rows={4}
            />
            
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Conseils pour un bon post :</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Soyez authentique et vulnérable</li>
                <li>• Partagez des détails concrets</li>
                <li>• Mentionnez ce que vous avez appris</li>
                <li>• Posez une question à la communauté</li>
              </ul>
            </div>
            
            <Button 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500"
              disabled={!newPostContent.trim()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Partager avec la Communauté
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Motivation Footer */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="h-6 w-6 text-red-500" />
            <h3 className="text-xl font-bold text-gray-800">Ensemble, Nous Grandissons</h3>
          </div>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Chaque histoire partagée, chaque conseil donné, chaque question posée 
            contribue à créer un monde plus empathique. Vous faites partie de cette transformation.
          </p>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
            <Target className="h-4 w-4 mr-2" />
            Rejoindre une Discussion
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
