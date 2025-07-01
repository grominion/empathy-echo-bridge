
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Bell, 
  BellRing, 
  Clock, 
  Users, 
  Target, 
  Heart, 
  Zap,
  Settings,
  X,
  CheckCircle,
  AlertCircle,
  Info,
  TrendingUp
} from 'lucide-react';

interface NotificationSettings {
  dailyReminders: boolean;
  communityUpdates: boolean;
  achievementAlerts: boolean;
  coachingTips: boolean;
  conflictOpportunities: boolean;
  weeklyReports: boolean;
}

interface SmartNotification {
  id: string;
  type: 'reminder' | 'achievement' | 'community' | 'coaching' | 'conflict' | 'report';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  timestamp: string;
  read: boolean;
  actionRequired?: boolean;
  relatedRoute?: string;
}

export const SmartNotificationSystem: React.FC = () => {
  const [notifications, setNotifications] = useState<SmartNotification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>({
    dailyReminders: true,
    communityUpdates: true,
    achievementAlerts: true,
    coachingTips: true,
    conflictOpportunities: false,
    weeklyReports: true
  });
  const [showSettings, setShowSettings] = useState(false);

  // Simulation de notifications intelligentes
  useEffect(() => {
    const mockNotifications: SmartNotification[] = [
      {
        id: '1',
        type: 'coaching',
        title: 'Moment d\'Empathie Quotidien',
        message: 'Il est 14h - le moment parfait pour pratiquer l\'écoute active avec un collègue.',
        priority: 'medium',
        timestamp: new Date().toISOString(),
        read: false,
        actionRequired: true,
        relatedRoute: '/personal-development'
      },
      {
        id: '2',
        type: 'community',
        title: 'Nouvelle Question dans Votre Domaine',
        message: 'Sarah M. a posé une question sur "Communication avec les adolescents" - votre expertise serait précieuse.',
        priority: 'high',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        read: false,
        relatedRoute: '/personal-development?tab=community'
      },
      {
        id: '3',
        type: 'achievement',
        title: 'Objectif Presque Atteint! 🎯',
        message: 'Plus que 2 analyses pour débloquer le badge "Expert en Communication"',
        priority: 'medium',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: true
      },
      {
        id: '4',
        type: 'conflict',
        title: 'Opportunité de Croissance Détectée',
        message: 'Votre patron semble stressé aujourd\'hui - c\'est le moment parfait pour pratiquer l\'empathie proactive.',
        priority: 'low',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        read: false,
        actionRequired: true
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'coaching': return <Heart className="h-4 w-4" />;
      case 'community': return <Users className="h-4 w-4" />;
      case 'achievement': return <Target className="h-4 w-4" />;
      case 'conflict': return <Zap className="h-4 w-4" />;
      case 'report': return <TrendingUp className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'medium': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'low': return 'bg-gray-100 text-gray-700 border-gray-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const updateSettings = (key: keyof NotificationSettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4">
      {/* Header avec compteur */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BellRing className="h-5 w-5 text-blue-600" />
              Notifications Intelligentes
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Notifications personnalisées basées sur vos habitudes et objectifs de développement personnel.
          </p>
        </CardContent>
      </Card>

      {/* Paramètres */}
      {showSettings && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Paramètres de Notification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Rappels quotidiens</p>
                  <p className="text-sm text-gray-600">Moments d'empathie et exercices</p>
                </div>
                <Switch
                  checked={settings.dailyReminders}
                  onCheckedChange={(checked) => updateSettings('dailyReminders', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mises à jour communautaires</p>
                  <p className="text-sm text-gray-600">Nouvelles questions et discussions</p>
                </div>
                <Switch
                  checked={settings.communityUpdates}
                  onCheckedChange={(checked) => updateSettings('communityUpdates', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Alertes de succès</p>
                  <p className="text-sm text-gray-600">Nouveaux badges et niveaux</p>
                </div>
                <Switch
                  checked={settings.achievementAlerts}
                  onCheckedChange={(checked) => updateSettings('achievementAlerts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Conseils de coaching</p>
                  <p className="text-sm text-gray-600">Tips personnalisés du coach IA</p>
                </div>
                <Switch
                  checked={settings.coachingTips}
                  onCheckedChange={(checked) => updateSettings('coachingTips', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Opportunités de conflit</p>
                  <p className="text-sm text-gray-600">Suggestions proactives basées sur le contexte</p>
                </div>
                <Switch
                  checked={settings.conflictOpportunities}
                  onCheckedChange={(checked) => updateSettings('conflictOpportunities', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Liste des notifications */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`${!notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white'} hover:shadow-md transition-shadow`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${getPriorityColor(notification.priority)} border`}>
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-800">{notification.title}</h4>
                    <Badge className={getPriorityColor(notification.priority)}>
                      {notification.priority}
                    </Badge>
                    {notification.actionRequired && (
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Action requise
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </div>
                    
                    <div className="flex gap-2">
                      {!notification.read && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Marquer comme lu
                        </Button>
                      )}
                      {notification.actionRequired && (
                        <Button size="sm">
                          Agir maintenant
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actions globales */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Notifications Intelligentes Activées</h4>
              <p className="text-sm text-gray-600">
                L'IA analyse vos habitudes pour vous suggérer les meilleurs moments d'action.
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                Tout marquer comme lu
              </Button>
              <Button size="sm">
                Configurer l'IA
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
