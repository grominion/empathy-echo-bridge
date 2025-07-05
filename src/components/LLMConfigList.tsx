
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Loader2, Edit, Trash2, ArrowUp, ArrowDown, Star, DollarSign } from 'lucide-react';

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
  category?: string;
  description?: string;
  cost_per_token?: number;
  priority_order?: number;
}

interface LLMConfigListProps {
  configs: LLMConfig[];
  isLoading: boolean;
  onEdit: (config: LLMConfig) => void;
  onToggleActive: (id: string, isActive: boolean) => void;
  onDelete: (id: string) => void;
}

const getCategoryLabel = (category: string) => {
  const labels = {
    strategy: 'Stratégie',
    empathy: 'Empathie',
    devil_advocate: 'Avocat du Diable',
    rebel: 'Rebelle',
    methodical: 'Méthodique',
    global: 'Global',
    wisdom: 'Sagesse',
    creative: 'Créatif',
    analytical: 'Analytique'
  };
  return labels[category as keyof typeof labels] || category;
};

const getCategoryColor = (category: string) => {
  const colors = {
    strategy: 'bg-blue-100 text-blue-800',
    empathy: 'bg-pink-100 text-pink-800',
    devil_advocate: 'bg-red-100 text-red-800',
    rebel: 'bg-purple-100 text-purple-800',
    methodical: 'bg-green-100 text-green-800',
    global: 'bg-yellow-100 text-yellow-800',
    wisdom: 'bg-orange-100 text-orange-800',
    creative: 'bg-indigo-100 text-indigo-800',
    analytical: 'bg-gray-100 text-gray-800'
  };
  return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

const getProviderIcon = (provider: string) => {
  const icons = {
    anthropic: '🤖',
    openai: '🧠',
    google: '🔍',
    xai: '⚡',
    mistral: '🇫🇷',
    deepseek: '🌊',
    qwen: '🐲'
  };
  return icons[provider as keyof typeof icons] || '🤖';
};

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

  // Trier par ordre de priorité
  const sortedConfigs = [...configs].sort((a, b) => (a.priority_order || 999) - (b.priority_order || 999));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Configurations LLM ({configs.length})</span>
          <div className="text-sm text-gray-500">
            {configs.filter(c => c.is_active).length} actives
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {configs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🤖</div>
            <p>Aucune configuration LLM trouvée.</p>
            <p className="text-sm">Créez-en une pour commencer.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedConfigs.map((config) => (
              <div key={config.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{getProviderIcon(config.provider)}</div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{config.name}</h3>
                        {config.priority_order === 1 && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
                        {config.is_active && (
                          <Badge className="bg-green-100 text-green-800">
                            ✓ Actif
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">
                          {config.provider} - {config.model}
                        </Badge>
                        {config.category && (
                          <Badge className={getCategoryColor(config.category)}>
                            {getCategoryLabel(config.category)}
                          </Badge>
                        )}
                        {config.priority_order && (
                          <Badge variant="outline">
                            Priorité {config.priority_order}
                          </Badge>
                        )}
                      </div>
                      {config.description && (
                        <p className="text-sm text-gray-600">{config.description}</p>
                      )}
                    </div>
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>
                    <strong>Tokens max:</strong> {config.max_tokens}
                  </div>
                  <div>
                    <strong>Température:</strong> {config.temperature}
                  </div>
                  {config.cost_per_token && config.cost_per_token > 0 && (
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      <strong>Coût:</strong> ${config.cost_per_token.toFixed(8)}/token
                    </div>
                  )}
                  <div>
                    <strong>Endpoint:</strong> 
                    <code className="bg-gray-100 px-1 rounded ml-1 text-xs">
                      {config.api_endpoint.length > 30 
                        ? config.api_endpoint.substring(0, 30) + '...' 
                        : config.api_endpoint
                      }
                    </code>
                  </div>
                </div>
                
                {config.system_prompt && (
                  <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                    <strong>Prompt système:</strong>
                    <p className="mt-1 text-gray-700">
                      {config.system_prompt.length > 200 
                        ? config.system_prompt.substring(0, 200) + '...' 
                        : config.system_prompt
                      }
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
