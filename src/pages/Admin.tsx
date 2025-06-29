import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Settings, Brain, History, Users } from 'lucide-react';

interface LLMConfig {
  id: string;
  name: string;
  provider: string;
  model: string;
  api_endpoint: string;
  is_active: boolean;
  max_tokens: number;
  temperature: number;
  system_prompt: string;
}

const Admin: React.FC = () => {
  const [llmConfigs, setLlmConfigs] = useState<LLMConfig[]>([]);
  const [editingConfig, setEditingConfig] = useState<Partial<LLMConfig>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchLLMConfigs();
  }, []);

  const fetchLLMConfigs = async () => {
    try {
      const { data, error } = await supabase
        .from('llm_configurations')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setLlmConfigs(data || []);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les configurations LLM",
        variant: "destructive"
      });
    }
  };

  const saveLLMConfig = async () => {
    if (!editingConfig.name || !editingConfig.provider || !editingConfig.model) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      if (editingConfig.id) {
        const { error } = await supabase
          .from('llm_configurations')
          .update(editingConfig)
          .eq('id', editingConfig.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('llm_configurations')
          .insert(editingConfig);
        if (error) throw error;
      }

      toast({
        title: "Succès",
        description: "Configuration LLM sauvegardée"
      });
      
      setEditingConfig({});
      fetchLLMConfigs();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder la configuration",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleActiveConfig = async (id: string, isActive: boolean) => {
    try {
      // D'abord, désactiver toutes les autres configurations si on active celle-ci
      if (isActive) {
        await supabase
          .from('llm_configurations')
          .update({ is_active: false })
          .neq('id', id);
      }

      const { error } = await supabase
        .from('llm_configurations')
        .update({ is_active: isActive })
        .eq('id', id);

      if (error) throw error;
      fetchLLMConfigs();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier la configuration",
        variant: "destructive"
      });
    }
  };

  const deleteConfig = async (id: string) => {
    try {
      const { error } = await supabase
        .from('llm_configurations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Succès",
        description: "Configuration supprimée"
      });
      fetchLLMConfigs();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la configuration",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center gap-3 mb-8">
        <Settings className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800">Administration ECHO</h1>
      </div>

      <Tabs defaultValue="llm-config" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="llm-config" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Configurations LLM
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="h-4 w-4" />
            Historique
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="h-4 w-4" />
            Utilisateurs
          </TabsTrigger>
          <TabsTrigger value="analytics">
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="llm-config" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Nouvelle Configuration LLM</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nom *</Label>
                  <Input
                    id="name"
                    value={editingConfig.name || ''}
                    onChange={(e) => setEditingConfig({ ...editingConfig, name: e.target.value })}
                    placeholder="Ex: Claude Sonnet"
                  />
                </div>
                <div>
                  <Label htmlFor="provider">Fournisseur *</Label>
                  <Select
                    value={editingConfig.provider || ''}
                    onValueChange={(value) => setEditingConfig({ ...editingConfig, provider: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un fournisseur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="anthropic">Anthropic</SelectItem>
                      <SelectItem value="openai">OpenAI</SelectItem>
                      <SelectItem value="google">Google</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="model">Modèle *</Label>
                  <Input
                    id="model"
                    value={editingConfig.model || ''}
                    onChange={(e) => setEditingConfig({ ...editingConfig, model: e.target.value })}
                    placeholder="Ex: claude-3-sonnet-20240229"
                  />
                </div>
                <div>
                  <Label htmlFor="api_endpoint">Endpoint API *</Label>
                  <Input
                    id="api_endpoint"
                    value={editingConfig.api_endpoint || ''}
                    onChange={(e) => setEditingConfig({ ...editingConfig, api_endpoint: e.target.value })}
                    placeholder="https://api.anthropic.com/v1/messages"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="max_tokens">Max Tokens</Label>
                  <Input
                    id="max_tokens"
                    type="number"
                    value={editingConfig.max_tokens || 2048}
                    onChange={(e) => setEditingConfig({ ...editingConfig, max_tokens: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="temperature">Température</Label>
                  <Input
                    id="temperature"
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    value={editingConfig.temperature || 0.7}
                    onChange={(e) => setEditingConfig({ ...editingConfig, temperature: parseFloat(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="system_prompt">Prompt Système</Label>
                <Textarea
                  id="system_prompt"
                  value={editingConfig.system_prompt || ''}
                  onChange={(e) => setEditingConfig({ ...editingConfig, system_prompt: e.target.value })}
                  placeholder="Vous êtes un expert en résolution de conflits..."
                  rows={3}
                />
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setEditingConfig({})}>
                  Annuler
                </Button>
                <Button onClick={saveLLMConfig} disabled={isLoading}>
                  {editingConfig.id ? 'Modifier' : 'Ajouter'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configurations Existantes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {llmConfigs.map((config) => (
                  <div key={config.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{config.name}</h3>
                        <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                          {config.provider} - {config.model}
                        </span>
                        {config.is_active && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                            Actif
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={config.is_active}
                          onCheckedChange={(checked) => toggleActiveConfig(config.id, checked)}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingConfig(config)}
                        >
                          Modifier
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteConfig(config.id)}
                        >
                          Supprimer
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Tokens: {config.max_tokens} | Température: {config.temperature}</p>
                      <p className="truncate">Prompt: {config.system_prompt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Historique des Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Fonctionnalité d'historique en développement...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Utilisateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Gestion des utilisateurs en développement...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Analytics en développement...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
