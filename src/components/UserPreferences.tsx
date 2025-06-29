
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Settings, Palette, Globe, Bell } from 'lucide-react';

interface UserPrefs {
  theme: string;
  language: string;
  default_analysis_type: string;
  notifications_enabled: boolean;
}

export const UserPreferences: React.FC = () => {
  const [preferences, setPreferences] = useState<UserPrefs>({
    theme: 'light',
    language: 'fr',
    default_analysis_type: 'full',
    notifications_enabled: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      if (data) {
        setPreferences({
          theme: data.theme || 'light',
          language: data.language || 'fr',
          default_analysis_type: data.default_analysis_type || 'full',
          notifications_enabled: data.notifications_enabled ?? true
        });
      }
    } catch (error) {
      console.error('Error fetching preferences:', error);
    }
  };

  const savePreferences = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          ...preferences,
          user_id: (await supabase.auth.getUser()).data.user?.id
        });

      if (error) throw error;

      toast({
        title: "Préférences sauvegardées",
        description: "Vos préférences ont été mises à jour avec succès"
      });

      // Appliquer le thème immédiatement
      applyTheme(preferences.theme);
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

  const applyTheme = (theme: string) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold">Préférences</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
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
                  <SelectItem value="light">Clair</SelectItem>
                  <SelectItem value="dark">Sombre</SelectItem>
                  <SelectItem value="auto">Automatique</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
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
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analyse par Défaut</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
                  <SelectItem value="empathy">Analyse empathique</SelectItem>
                  <SelectItem value="strategy">Analyse stratégique</SelectItem>
                  <SelectItem value="full">Analyse complète</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="notifications"
                checked={preferences.notifications_enabled}
                onCheckedChange={(checked) => setPreferences({ ...preferences, notifications_enabled: checked })}
              />
              <Label htmlFor="notifications">Activer les notifications</Label>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={savePreferences} disabled={isLoading}>
          {isLoading ? 'Sauvegarde...' : 'Sauvegarder les préférences'}
        </Button>
      </div>
    </div>
  );
};
