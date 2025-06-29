
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Loader2, Edit, Trash2 } from 'lucide-react';

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

interface LLMConfigListProps {
  configs: LLMConfig[];
  isLoading: boolean;
  onEdit: (config: LLMConfig) => void;
  onToggleActive: (id: string, isActive: boolean) => void;
  onDelete: (id: string) => void;
}

export const LLMConfigList: React.FC<LLMConfigListProps> = ({
  configs,
  isLoading,
  onEdit,
  onToggleActive,
  onDelete
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Chargement des configurations...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurations Existantes ({configs.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {configs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Aucune configuration LLM trouvée. Créez-en une pour commencer.
          </div>
        ) : (
          <div className="space-y-4">
            {configs.map((config) => (
              <div key={config.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">{config.name}</h3>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                      {config.provider} - {config.model}
                    </span>
                    {config.is_active && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        ✓ Actif
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Actif</span>
                      <Switch
                        checked={config.is_active}
                        onCheckedChange={(checked) => onToggleActive(config.id, checked)}
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(config)}
                      className="flex items-center gap-1"
                    >
                      <Edit className="h-4 w-4" />
                      Modifier
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(config.id)}
                      className="flex items-center gap-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      Supprimer
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Tokens:</strong> {config.max_tokens} | <strong>Température:</strong> {config.temperature}</p>
                  <p><strong>Endpoint:</strong> <code className="bg-gray-100 px-1 rounded">{config.api_endpoint}</code></p>
                  {config.system_prompt && (
                    <p><strong>Prompt:</strong> {config.system_prompt.substring(0, 100)}{config.system_prompt.length > 100 ? '...' : ''}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
