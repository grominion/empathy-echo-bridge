
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Brain, History, Users } from 'lucide-react';
import { useLLMConfigs } from '@/hooks/useLLMConfigs';
import { LLMConfigForm } from '@/components/LLMConfigForm';
import { LLMConfigList } from '@/components/LLMConfigList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LLMConfig {
  id?: string;
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
  const { configs, isLoading, saveConfig, toggleActiveConfig, deleteConfig } = useLLMConfigs();
  const [editingConfig, setEditingConfig] = useState<Partial<LLMConfig> | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (config: LLMConfig) => {
    setEditingConfig(config);
    setShowForm(true);
  };

  const handleNewConfig = () => {
    setEditingConfig(null);
    setShowForm(true);
  };

  const handleSave = async (configData: Partial<LLMConfig>) => {
    const success = await saveConfig(configData);
    if (success) {
      setShowForm(false);
      setEditingConfig(null);
    }
    return success;
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingConfig(null);
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
          {showForm ? (
            <LLMConfigForm
              config={editingConfig}
              onSave={handleSave}
              onCancel={handleCancel}
              isLoading={isLoading}
            />
          ) : (
            <div className="flex justify-end mb-4">
              <button
                onClick={handleNewConfig}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Nouvelle Configuration
              </button>
            </div>
          )}

          <LLMConfigList
            configs={configs}
            isLoading={isLoading}
            onEdit={handleEdit}
            onToggleActive={toggleActiveConfig}
            onDelete={deleteConfig}
          />
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
