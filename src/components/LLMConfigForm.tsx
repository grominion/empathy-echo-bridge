
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save, X } from 'lucide-react';

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
  category?: string;
  description?: string;
  cost_per_token?: number;
  priority_order?: number;
  api_request_template?: any;
}

interface LLMConfigFormProps {
  config?: Partial<LLMConfig>;
  onSave: (config: Partial<LLMConfig>) => Promise<boolean>;
  onCancel: () => void;
  isLoading: boolean;
}

const categoryOptions = [
  { value: 'strategy', label: 'Stratégie' },
  { value: 'empathy', label: 'Empathie' },
  { value: 'devil_advocate', label: 'Avocat du Diable' },
  { value: 'rebel', label: 'Rebelle' },
  { value: 'methodical', label: 'Méthodique' },
  { value: 'global', label: 'Global' },
  { value: 'wisdom', label: 'Sagesse' },
  { value: 'creative', label: 'Créatif' },
  { value: 'analytical', label: 'Analytique' }
];

const providerOptions = [
  { value: 'anthropic', label: 'Anthropic (Claude)' },
  { value: 'openai', label: 'OpenAI (GPT)' },
  { value: 'google', label: 'Google (Gemini)' },
  { value: 'xai', label: 'xAI (Grok)' },
  { value: 'mistral', label: 'Mistral' },
  { value: 'deepseek', label: 'DeepSeek' },
  { value: 'qwen', label: 'Qwen (Alibaba)' }
];

export const LLMConfigForm: React.FC<LLMConfigFormProps> = ({
  config,
  onSave,
  onCancel,
  isLoading
}) => {
  const [formData, setFormData] = useState<Partial<LLMConfig>>({
    name: '',
    provider: '',
    model: '',
    api_endpoint: '',
    max_tokens: 4096,
    temperature: 0.7,
    system_prompt: '',
    is_active: false,
    category: 'strategy',
    description: '',
    cost_per_token: 0.0,
    priority_order: 0,
    api_request_template: {},
    ...config
  });

  useEffect(() => {
    setFormData({
      name: '',
      provider: '',
      model: '',
      api_endpoint: '',
      max_tokens: 4096,
      temperature: 0.7,
      system_prompt: '',
      is_active: false,
      category: 'strategy',
      description: '',
      cost_per_token: 0.0,
      priority_order: 0,
      api_request_template: {},
      ...config
    });
  }, [config]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onSave(formData);
    if (success) {
      onCancel();
    }
  };

  const updateField = (field: keyof LLMConfig, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getEndpointTemplate = (provider: string) => {
    const templates = {
      anthropic: 'https://api.anthropic.com/v1/messages',
      openai: 'https://api.openai.com/v1/chat/completions',
      google: 'https://generativelanguage.googleapis.com/v1beta/models/[MODEL]:generateContent',
      xai: 'https://api.x.ai/v1/chat/completions',
      mistral: 'https://api.mistral.ai/v1/chat/completions',
      deepseek: 'https://api.deepseek.com/chat/completions',
      qwen: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation'
    };
    return templates[provider as keyof typeof templates] || '';
  };

  const handleProviderChange = (provider: string) => {
    updateField('provider', provider);
    updateField('api_endpoint', getEndpointTemplate(provider));
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Save className="h-5 w-5" />
          {config?.id ? 'Modifier' : 'Nouvelle'} Configuration LLM
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations de base */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nom *</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Ex: Claude Sonnet Empathique"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description || ''}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Description courte du LLM"
              />
            </div>
          </div>

          {/* Provider et Modèle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="provider">Fournisseur *</Label>
              <Select
                value={formData.provider || ''}
                onValueChange={handleProviderChange}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un fournisseur" />
                </SelectTrigger>
                <SelectContent>
                  {providerOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="model">Modèle *</Label>
              <Input
                id="model"
                value={formData.model || ''}
                onChange={(e) => updateField('model', e.target.value)}
                placeholder="Ex: claude-3-sonnet-20240229"
                required
              />
            </div>
          </div>

          {/* Catégorie et Priorité */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="category">Catégorie *</Label>
              <Select
                value={formData.category || 'strategy'}
                onValueChange={(value) => updateField('category', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="priority_order">Ordre de Priorité</Label>
              <Input
                id="priority_order"
                type="number"
                value={formData.priority_order || 0}
                onChange={(e) => updateField('priority_order', parseInt(e.target.value) || 0)}
                placeholder="1 = principal, 2 = secondaire..."
              />
            </div>
            <div>
              <Label htmlFor="cost_per_token">Coût par Token</Label>
              <Input
                id="cost_per_token"
                type="number"
                step="0.00000001"
                value={formData.cost_per_token || 0.0}
                onChange={(e) => updateField('cost_per_token', parseFloat(e.target.value) || 0.0)}
                placeholder="0.00002"
              />
            </div>
          </div>

          {/* API Configuration */}
          <div>
            <Label htmlFor="api_endpoint">Endpoint API *</Label>
            <Input
              id="api_endpoint"
              value={formData.api_endpoint || ''}
              onChange={(e) => updateField('api_endpoint', e.target.value)}
              placeholder="URL de l'API"
              required
            />
          </div>

          {/* Paramètres du modèle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="max_tokens">Max Tokens</Label>
              <Input
                id="max_tokens"
                type="number"
                value={formData.max_tokens || 4096}
                onChange={(e) => updateField('max_tokens', parseInt(e.target.value) || 4096)}
              />
            </div>
            <div>
              <Label htmlFor="temperature">Température</Label>
              <Input
                id="temperature"
                type="number"
                step="0.1"
                min="0"
                max="2"
                value={formData.temperature || 0.7}
                onChange={(e) => updateField('temperature', parseFloat(e.target.value) || 0.7)}
              />
            </div>
          </div>

          {/* Prompt Système */}
          <div>
            <Label htmlFor="system_prompt">Prompt Système *</Label>
            <Textarea
              id="system_prompt"
              value={formData.system_prompt || ''}
              onChange={(e) => updateField('system_prompt', e.target.value)}
              placeholder="Vous êtes un expert en résolution de conflits... IMPORTANT: Always respond in the same language as the user's input."
              rows={6}
              className="min-h-[150px]"
              required
            />
            <div className="text-sm text-gray-500 mt-1">
              💡 Tip: Ajoutez toujours "IMPORTANT: Always respond in the same language as the user's input" à la fin de votre prompt
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active || false}
                onChange={(e) => updateField('is_active', e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="is_active">Configuration active</Label>
            </div>
            
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="w-4 h-4 mr-2" />
                Annuler
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="w-4 h-4 mr-2" />
                {config?.id ? 'Modifier' : 'Ajouter'}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
