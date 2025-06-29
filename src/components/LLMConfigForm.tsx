
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

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

interface LLMConfigFormProps {
  config?: Partial<LLMConfig>;
  onSave: (config: Partial<LLMConfig>) => Promise<boolean>;
  onCancel: () => void;
  isLoading: boolean;
}

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
    max_tokens: 2048,
    temperature: 0.7,
    system_prompt: '',
    is_active: false,
    ...config
  });

  useEffect(() => {
    setFormData({
      name: '',
      provider: '',
      model: '',
      api_endpoint: '',
      max_tokens: 2048,
      temperature: 0.7,
      system_prompt: '',
      is_active: false,
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {config?.id ? 'Modifier' : 'Nouvelle'} Configuration LLM
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nom *</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Ex: Claude Sonnet"
                required
              />
            </div>
            <div>
              <Label htmlFor="provider">Fournisseur *</Label>
              <Select
                value={formData.provider || ''}
                onValueChange={(value) => updateField('provider', value)}
                required
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
                value={formData.model || ''}
                onChange={(e) => updateField('model', e.target.value)}
                placeholder="Ex: claude-3-sonnet-20240229"
                required
              />
            </div>
            <div>
              <Label htmlFor="api_endpoint">Endpoint API *</Label>
              <Input
                id="api_endpoint"
                value={formData.api_endpoint || ''}
                onChange={(e) => updateField('api_endpoint', e.target.value)}
                placeholder="https://api.anthropic.com/v1/messages"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="max_tokens">Max Tokens</Label>
              <Input
                id="max_tokens"
                type="number"
                value={formData.max_tokens || 2048}
                onChange={(e) => updateField('max_tokens', parseInt(e.target.value))}
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
                value={formData.temperature || 0.7}
                onChange={(e) => updateField('temperature', parseFloat(e.target.value))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="system_prompt">Prompt Système</Label>
            <Textarea
              id="system_prompt"
              value={formData.system_prompt || ''}
              onChange={(e) => updateField('system_prompt', e.target.value)}
              placeholder="Vous êtes un expert en résolution de conflits..."
              rows={3}
            />
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {config?.id ? 'Modifier' : 'Ajouter'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
