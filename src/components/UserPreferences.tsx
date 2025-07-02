
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Settings, Palette, Globe, Bell, Brain, Volume2, Zap } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface UserPrefs {
  theme: string;
  language: string;
  default_analysis_type: string;
  notifications_enabled: boolean;
  analysis_speed: number;
  voice_feedback: boolean;
  auto_save: boolean;
  detailed_insights: boolean;
}

export const UserPreferences: React.FC = () => {
  const [preferences, setPreferences] = useState<UserPrefs>({
    theme: 'light',
    language: 'fr',
    default_analysis_type: 'full',
    notifications_enabled: true,
    analysis_speed: 50,
    voice_feedback: false,
    auto_save: true,
    detailed_insights: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { setTheme } = useTheme();

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching preferences:', error);
        return;
      }
      
      if (data) {
        setPreferences({
          theme: data.theme || 'light',
          language: data.language || 'fr',
          default_analysis_type: data.default_analysis_type || 'full',
          notifications_enabled: data.notifications_enabled ?? true,
          analysis_speed: 50, // Nouvelle propriété
          voice_feedback: false, // Nouvelle propriété
          auto_save: true, // Nouvelle propriété
          detailed_insights: true // Nouvelle propriété
        });
      }
    } catch (error) {
      console.error('Error fetching preferences:', error);
    }
  };

  const savePreferences = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Utilisateur non authentifié');
      }

      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          ...preferences,
          user_id: user.id
        });

      if (error) throw error;

      // Appliquer le thème immédiatement
      setTheme(preferences.theme as any);

      toast({
        title: "Préférences sauvegardées ✨",
        description: "Vos préférences ont été mises à jour avec succès"
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les préférences",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetToDefaults = () => {
    setPreferences({
      theme: 'light',
      language: 'fr',
      default_analysis_type: 'full',
      notifications_enabled: true,
      analysis_speed: 50,
      voice_feedback: false,
      auto_save: true,
      detailed_insights: true
    });
    
    toast({
      title: "Préférences réinitialisées 🔄",
      description: "Toutes les préférences ont été remises par défaut"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Settings className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Préférences</h2>
        </div>
        <Button variant="outline" onClick={resetToDefaults}>
          Réinitialiser
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Apparence */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Apparence
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="theme">Thème</Label>
              <Select
                value={preferences.theme}
                onValueChange={(value) => setPreferences({ ...preferences, theme: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">🌞 Clair</SelectItem>
                  <SelectItem value="dark">🌙 Sombre</SelectItem>
                  <SelectItem value="auto">🔄 Automatique</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Langue et Région */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Langue et Région
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="language">Langue</Label>
              <Select
                value={preferences.language}
                onValueChange={(value) => setPreferences({ ...preferences, language: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">🇫🇷 Français</SelectItem>
                  <SelectItem value="en">🇺🇸 English</SelectItem>
                  <SelectItem value="es">🇪🇸 Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Analyse */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Paramètres d'Analyse
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="analysis_type">Type d'analyse préféré</Label>
              <Select
                value={preferences.default_analysis_type}
                onValueChange={(value) => setPreferences({ ...preferences, default_analysis_type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="empathy">💝 Analyse empathique</SelectItem>
                  <SelectItem value="strategy">🎯 Analyse stratégique</SelectItem>
                  <SelectItem value="full">🚀 Analyse complète</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="analysis_speed">Vitesse d'analyse: {preferences.analysis_speed}%</Label>
              <Slider
                value={[preferences.analysis_speed]}
                onValueChange={(value) => setPreferences({ ...preferences, analysis_speed: value[0] })}
                max={100}
                min={10}
                step={10}
                className="mt-2"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>🐌 Détaillée</span>
                <span>⚡ Rapide</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="detailed_insights"
                checked={preferences.detailed_insights}
                onCheckedChange={(checked) => setPreferences({ ...preferences, detailed_insights: checked })}
              />
              <Label htmlFor="detailed_insights">Insights détaillés</Label>
            </div>
          </CardContent>
        </Card>

        {/* Notifications et Audio */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications & Audio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="notifications"
                checked={preferences.notifications_enabled}
                onCheckedChange={(checked) => setPreferences({ ...preferences, notifications_enabled: checked })}
              />
              <Label htmlFor="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Activer les notifications
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="voice_feedback"
                checked={preferences.voice_feedback}
                onCheckedChange={(checked) => setPreferences({ ...preferences, voice_feedback: checked })}
              />
              <Label htmlFor="voice_feedback" className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                Retour vocal
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="auto_save"
                checked={preferences.auto_save}
                onCheckedChange={(checked) => setPreferences({ ...preferences, auto_save: checked })}
              />
              <Label htmlFor="auto_save" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Sauvegarde automatique
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-4 pt-6">
        <Button variant="outline" onClick={fetchPreferences}>
          Annuler
        </Button>
        <Button onClick={savePreferences} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
          {isLoading ? 'Sauvegarde...' : '✨ Sauvegarder les préférences'}
        </Button>
      </div>
    </div>
  );
};
