
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  MessageSquare, 
  Star, 
  Calendar,
  Clock,
  Heart,
  Target,
  Award,
  User,
  Send,
  BookOpen,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  UserPlus,
  MessageCircle,
  Video,
  Phone
} from 'lucide-react';

interface MentorProfile {
  id: string;
  name: string;
  avatar: string;
  level: number;
  specialties: string[];
  experience: string;
  rating: number;
  sessions: number;
  availability: 'available' | 'busy' | 'offline';
  nextSlot?: string;
  bio: string;
  successStories: number;
}

interface MentorshipRequest {
  id: string;
  type: 'seek_mentor' | 'offer_mentoring';
  title: string;
  description: string;
  skills: string[];
  timeCommitment: string;
  preferredStyle: string;
  urgency: 'low' | 'medium' | 'high';
  author: string;
  responses: number;
}

interface MentorshipSession {
  id: string;
  mentorName: string;
  menteeName: string;
  topic: string;
  scheduledDate: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'video' | 'chat' | 'phone';
  notes?: string;
}

export const PeerMentoring: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'find' | 'requests' | 'sessions' | 'become'>('find');
  const [selectedMentor, setSelectedMentor] = useState<MentorProfile | null>(null);

  const mentors: MentorProfile[] = [
    {
      id: '1',
      name: 'Sarah M.',
      avatar: '👩‍🦰',
      level: 8,
      specialties: ['Communication Non-Violente', 'Conflits Familiaux', 'Écoute Active'],
      experience: '5 ans d\'expérience en médiation familiale',
      rating: 4.9,
      sessions: 156,
      availability: 'available',
      nextSlot: '2024-01-03T14:00',
      bio: 'Passionnée par la communication bienveillante, j\'aide les personnes à transformer leurs conflits en opportunités de connexion.',
      successStories: 23
    },
    {
      id: '2',
      name: 'Alex P.',
      avatar: '👨‍💼',
      level: 7,
      specialties: ['Leadership Empathique', 'Gestion d\'Équipe', 'Résolution Professionnelle'],
      experience: 'Manager depuis 8 ans, coach certifié',
      rating: 4.8,
      sessions: 134,
      availability: 'busy',
      nextSlot: '2024-01-05T10:00',
      bio: 'J\'accompagne les leaders dans le développement de leur intelligence émotionnelle et leur capacité à gérer les conflits.',
      successStories: 31
    },
    {
      id: '3',
      name: 'Marie L.',
      avatar: '👩‍🎨',
      level: 6,
      specialties: ['Communication Créative', 'Expression Artistique', 'Gestion du Stress'],
      experience: 'Art-thérapeute et coach en créativité',
      rating: 4.7,
      sessions: 89,
      availability: 'available',
      nextSlot: '2024-01-02T16:30',
      bio: 'J\'utilise l\'art et la créativité comme outils de communication et de résolution de conflits.',
      successStories: 18
    }
  ];

  const mentorshipRequests: MentorshipRequest[] = [
    {
      id: '1',
      type: 'seek_mentor',
      title: 'Recherche mentor pour communication avec adolescent',
      description: 'Ma fille de 16 ans et moi avons du mal à communiquer. Je cherche quelqu\'un qui a de l\'expérience avec les ados.',
      skills: ['Communication Adolescents', 'Patience', 'Écoute'],
      timeCommitment: '2-3 sessions par mois',
      preferredStyle: 'Bienveillant et pratique',
      urgency: 'medium',
      author: 'Julie D.',
      responses: 3
    },
    {
      id: '2',
      type: 'offer_mentoring',
      title: 'Mentor disponible en résolution de conflits professionnels',
      description: 'Fort de 10 ans d\'expérience en RH, j\'offre mon aide pour les conflits en entreprise.',
      skills: ['Médiation Professionnelle', 'Négociation', 'Gestion d\'Équipe'],
      timeCommitment: '1-2h par semaine',
      preferredStyle: 'Structuré et orienté solutions',
      urgency: 'low',
      author: 'Marc B.',
      responses: 7
    },
    {
      id: '3',
      type: 'seek_mentor',
      title: 'Aide pour développer ma confiance en communication',
      description: 'Je suis très timide et j\'ai du mal à m\'exprimer lors des conflits. Cherche mentor patient.',
      skills: ['Confiance en Soi', 'Assertivité', 'Communication'],
      timeCommitment: 'Flexible',
      preferredStyle: 'Doux et encourageant',
      urgency: 'high',
      author: 'Tom R.',
      responses: 5
    }
  ];

  const upcomingSessions: MentorshipSession[] = [
    {
      id: '1',
      mentorName: 'Sarah M.',
      menteeName: 'Vous',
      topic: 'Gestion des conflits familiaux',
      scheduledDate: '2024-01-03T14:00',
      duration: 60,
      status: 'scheduled',
      type: 'video'
    },
    {
      id: '2',
      mentorName: 'Vous',
      menteeName: 'Emma L.',
      topic: 'Développement de l\'empathie',
      scheduledDate: '2024-01-04T11:00',
      duration: 45,
      status: 'scheduled',
      type: 'chat'
    }
  ];

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-700';
      case 'busy': return 'bg-yellow-100 text-yellow-700';
      case 'offline': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSessionIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'phone': return <Phone className="h-4 w-4" />;
      case 'chat': return <MessageCircle className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const requestMentoring = (mentorId: string) => {
    console.log(`Requesting mentoring from ${mentorId}`);
    // Ici on ferait l'API call
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Users className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Mentorat Peer-to-Peer</h2>
                <p className="text-white/90">Apprenez ensemble, grandissez ensemble</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-white/80">Sessions complétées</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">4.8</div>
              <div className="text-sm text-white/80">Note moyenne</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-white/80">Mentees actifs</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">2</div>
              <div className="text-sm text-white/80">Mentors suivis</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="find">Trouver un Mentor</TabsTrigger>
          <TabsTrigger value="requests">Demandes</TabsTrigger>
          <TabsTrigger value="sessions">Mes Sessions</TabsTrigger>
          <TabsTrigger value="become">Devenir Mentor</TabsTrigger>
        </TabsList>

        {/* Trouver un mentor */}
        <TabsContent value="find" className="space-y-4">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{mentor.avatar}</div>
                    <h3 className="font-bold text-lg text-gray-800">{mentor.name}</h3>
                    <Badge className="bg-blue-100 text-blue-700">
                      Niveau {mentor.level}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Note:</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold">{mentor.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Sessions:</span>
                      <span className="font-semibold">{mentor.sessions}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Disponibilité:</span>
                      <Badge className={getAvailabilityColor(mentor.availability)}>
                        {mentor.availability}
                      </Badge>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Spécialités:</p>
                      <div className="flex flex-wrap gap-1">
                        {mentor.specialties.slice(0, 2).map((specialty, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                        {mentor.specialties.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{mentor.specialties.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2">{mentor.bio}</p>
                    
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1" onClick={() => requestMentoring(mentor.id)}>
                        <UserPlus className="h-3 w-3 mr-1" />
                        Demander
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setSelectedMentor(mentor)}>
                        Voir Profil
                      </Button>
                    </div>
                    
                    {mentor.nextSlot && mentor.availability === 'available' && (
                      <div className="bg-green-50 p-2 rounded text-xs text-green-700 text-center">
                        Prochaine dispo: {new Date(mentor.nextSlot).toLocaleString()}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Demandes de mentorat */}
        <TabsContent value="requests" className="space-y-4">
          <div className="space-y-4">
            {mentorshipRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${request.type === 'seek_mentor' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                      {request.type === 'seek_mentor' ? <Target className="h-4 w-4" /> : <Heart className="h-4 w-4" />}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-800">{request.title}</h4>
                        <Badge className={getUrgencyColor(request.urgency)}>
                          {request.urgency}
                        </Badge>
                        <Badge variant="outline">
                          {request.responses} réponses
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3">{request.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-3 mb-3 text-sm">
                        <div>
                          <span className="text-gray-500">Compétences recherchées:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {request.skills.map((skill, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Engagement:</span>
                          <p className="text-gray-700">{request.timeCommitment}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          Par {request.author}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Répondre
                          </Button>
                          {request.type === 'seek_mentor' && (
                            <Button size="sm">
                              <Send className="h-3 w-3 mr-1" />
                              Proposer Aide
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <h3 className="font-semibold text-gray-800 mb-2">Créer une Demande de Mentorat</h3>
              <p className="text-sm text-gray-600 mb-4">
                Décrivez votre besoin et trouvez le mentor parfait pour vous accompagner.
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle Demande
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sessions */}
        <TabsContent value="sessions" className="space-y-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Prochaines Sessions</h3>
            {upcomingSessions.map((session) => (
              <Card key={session.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                        {getSessionIcon(session.type)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{session.topic}</h4>
                        <p className="text-sm text-gray-600">
                          {session.mentorName === 'Vous' ? 
                            `Vous mentorez ${session.menteeName}` : 
                            `Avec ${session.mentorName}`
                          }
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(session.scheduledDate).toLocaleDateString()}
                          <Clock className="h-3 w-3" />
                          {new Date(session.scheduledDate).toLocaleTimeString()}
                          <span>({session.duration} min)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Reprogrammer
                      </Button>
                      <Button size="sm">
                        Rejoindre
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Devenir mentor */}
        <TabsContent value="become" className="space-y-4">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-6 w-6 text-green-600" />
                Devenez Mentor EchoSim
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Partagez votre expérience et aidez d'autres membres de la communauté à développer 
                leurs compétences relationnelles. En devenant mentor, vous contribuez à créer un 
                écosystème d'apprentissage bienveillant.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Avantages Mentor</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Badge exclusif "Mentor Certifié"</li>
                    <li>• +100 XP par session complétée</li>
                    <li>• Accès aux outils de mentorat avancés</li>
                    <li>• Reconnaissance communautaire</li>
                    <li>• Développement de vos propres compétences</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Prérequis</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Niveau 5 minimum</li>
                    <li>• Score d'empathie > 70%</li>
                    <li>• 10 analyses complétées</li>
                    <li>• Participation active communauté</li>
                    <li>• Formation mentor (2h en ligne)</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Votre Éligibilité</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Niveau 5 ✓</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Score empathie: 78% ✓</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">15 analyses complétées ✓</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Membre actif communauté ✓</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span className="text-sm">Formation mentor en attente</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button className="bg-gradient-to-r from-green-500 to-blue-500">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Commencer la Formation
                </Button>
                <Button variant="outline">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  En Savoir Plus
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de profil mentor */}
      {selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{selectedMentor.avatar}</div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedMentor.name}</h3>
                    <Badge className="bg-blue-100 text-blue-700">
                      Niveau {selectedMentor.level}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => setSelectedMentor(null)}>
                  ×
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">{selectedMentor.rating}</div>
                  <div className="text-sm text-gray-600">Note moyenne</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{selectedMentor.sessions}</div>
                  <div className="text-sm text-gray-600">Sessions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{selectedMentor.successStories}</div>
                  <div className="text-sm text-gray-600">Success Stories</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Bio</h4>
                <p className="text-gray-600 text-sm">{selectedMentor.bio}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Spécialités</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMentor.specialties.map((specialty, idx) => (
                    <Badge key={idx} className="bg-purple-100 text-purple-700">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Expérience</h4>
                <p className="text-gray-600 text-sm">{selectedMentor.experience}</p>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button 
                  className="flex-1"
                  onClick={() => {
                    requestMentoring(selectedMentor.id);
                    setSelectedMentor(null);
                  }}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Demander Mentorat
                </Button>
                <Button variant="outline" onClick={() => setSelectedMentor(null)}>
                  Fermer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
