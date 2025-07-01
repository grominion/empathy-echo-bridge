
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Heart, 
  Brain, 
  Lightbulb,
  Target,
  TrendingUp,
  Sparkles,
  Mic,
  MicOff,
  Volume2,
  Clock,
  CheckCircle
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'coach';
  content: string;
  timestamp: Date;
  category?: 'empathy' | 'communication' | 'conflict' | 'general';
  suggestions?: string[];
}

interface CoachPersonality {
  name: string;
  specialty: string;
  tone: string;
  avatar: string;
  color: string;
}

export const PersonalCoach: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState<CoachPersonality | null>(null);
  const [sessionStats, setSessionStats] = useState({
    duration: 0,
    messagesCount: 0,
    insights: 0
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const coaches: CoachPersonality[] = [
    {
      name: 'Emma',
      specialty: 'Empathie & Relations',
      tone: 'Bienveillante et chaleureuse',
      avatar: '🤗',
      color: 'from-pink-500 to-rose-500'
    },
    {
      name: 'Marc',
      specialty: 'Communication Pro',
      tone: 'Structuré et motivant',
      avatar: '💼',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      name: 'Léa',
      specialty: 'Résolution Conflits',
      tone: 'Calme et analytique',
      avatar: '⚖️',
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Alex',
      specialty: 'Intelligence Émotionnelle',
      tone: 'Sage et perspicace',
      avatar: '🧠',
      color: 'from-purple-500 to-violet-500'
    }
  ];

  const quickPrompts = [
    'Comment gérer une conversation difficile avec mon collègue ?',
    'Je me sens incompris dans ma relation',
    'Comment améliorer mon écoute active ?',
    'Aide-moi à résoudre ce conflit familial',
    'Comment exprimer mes émotions sainement ?'
  ];

  useEffect(() => {
    if (!selectedCoach) {
      setSelectedCoach(coaches[0]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionStats(prev => ({
        ...prev,
        duration: prev.duration + 1
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const simulateCoachResponse = async (userMessage: string): Promise<Message> => {
    const responses = {
      empathy: [
        "Je comprends que cette situation soit difficile pour vous. Parlons de ce que vous ressentez exactement.",
        "Vos émotions sont valides. Comment pensez-vous que l'autre personne pourrait se sentir ?",
        "C'est courageux de partager cela. Quelle serait votre approche idéale dans cette situation ?"
      ],
      communication: [
        "La communication efficace commence par l'écoute. Avez-vous essayé de reformuler ce que dit l'autre personne ?",
        "Utilisons la technique du 'je' : au lieu de 'tu fais', dites 'je ressens'. Comment pourriez-vous reformuler ?",
        "Le timing est crucial. Quel serait le meilleur moment pour cette conversation ?"
      ],
      conflict: [
        "Identifions d'abord les besoins de chacun. Quels sont vos besoins dans cette situation ?",
        "Cherchons une solution gagnant-gagnant. Qu'est-ce qui serait acceptable pour toutes les parties ?",
        "Parfois, il faut accepter d'être en désaccord. Comment pourriez-vous coexister malgré vos différences ?"
      ]
    };

    const category = userMessage.toLowerCase().includes('conflit') ? 'conflict' :
                    userMessage.toLowerCase().includes('communic') ? 'communication' :
                    userMessage.toLowerCase().includes('sens') || userMessage.toLowerCase().includes('émotion') ? 'empathy' : 'general';

    const categoryResponses = responses[category as keyof typeof responses] || responses.empathy;
    const randomResponse = categoryResponses[Math.floor(Math.random() * categoryResponses.length)];

    const suggestions = [
      'Exercice de respiration 4-7-8',
      'Technique de l\'écoute active',
      'Script de communication non-violente'
    ];

    return {
      id: Date.now().toString(),
      type: 'coach',
      content: randomResponse,
      timestamp: new Date(),
      category: category as any,
      suggestions: Math.random() > 0.5 ? suggestions : undefined
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setSessionStats(prev => ({
      ...prev,
      messagesCount: prev.messagesCount + 1
    }));

    // Simulate coach thinking time
    setTimeout(async () => {
      const coachResponse = await simulateCoachResponse(inputValue);
      setMessages(prev => [...prev, coachResponse]);
      setIsTyping(false);
      
      if (coachResponse.suggestions) {
        setSessionStats(prev => ({
          ...prev,
          insights: prev.insights + 1
        }));
      }
    }, 1000 + Math.random() * 2000);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
    inputRef.current?.focus();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-1 sm:px-0">
      {/* Header with coach selection */}
      <Card className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-indigo-200 shadow-lg">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
            Coach Personnel IA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Coach selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {coaches.map((coach) => (
              <div
                key={coach.name}
                onClick={() => setSelectedCoach(coach)}
                className={`p-3 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                  selectedCoach?.name === coach.name
                    ? 'border-indigo-300 bg-white shadow-md transform scale-105'
                    : 'border-transparent bg-white/60 hover:bg-white/80 hover:scale-102'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{coach.avatar}</div>
                  <div className="font-semibold text-sm text-gray-800">{coach.name}</div>
                  <div className="text-xs text-gray-600 mb-1">{coach.specialty}</div>
                  <div className="text-xs text-gray-500">{coach.tone}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Session stats */}
          <div className="flex justify-center gap-4 sm:gap-6">
            <div className="text-center">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{formatTime(sessionStats.duration)}</span>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <MessageSquare className="h-4 w-4" />
                <span>{sessionStats.messagesCount} messages</span>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Lightbulb className="h-4 w-4" />
                <span>{sessionStats.insights} insights</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat interface */}
      <Card className="bg-white shadow-lg border-slate-200">
        <CardContent className="p-0">
          {/* Messages */}
          <ScrollArea className="h-96 sm:h-[500px] p-4">
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">
                    {selectedCoach?.avatar}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Bonjour ! Je suis {selectedCoach?.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {selectedCoach?.specialty} • {selectedCoach?.tone}
                  </p>
                  <p className="text-sm text-gray-500">
                    Comment puis-je vous aider aujourd'hui ?
                  </p>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'coach' && (
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${selectedCoach?.color} flex items-center justify-center text-white text-sm font-bold`}>
                        {selectedCoach?.name.charAt(0)}
                      </div>
                    </div>
                  )}
                  
                  <div className={`max-w-xs sm:max-w-md ${message.type === 'user' ? 'order-first' : ''}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.type === 'user'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    
                    {message.suggestions && (
                      <div className="mt-2 space-y-1">
                        {message.suggestions.map((suggestion, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs mr-1 cursor-pointer hover:bg-indigo-50"
                            onClick={() => handleQuickPrompt(`Comment faire : ${suggestion}`)}
                          >
                            {suggestion}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  
                  {message.type === 'user' && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${selectedCoach?.color} flex items-center justify-center text-white text-sm font-bold`}>
                      {selectedCoach?.name.charAt(0)}
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Quick prompts */}
          {messages.length === 0 && (
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Suggestions de conversation :</h4>
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickPrompt(prompt)}
                    className="text-xs bg-white hover:bg-indigo-50 border-gray-300"
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Tapez votre message..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
