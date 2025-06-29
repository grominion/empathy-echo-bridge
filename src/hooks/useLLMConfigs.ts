
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

export const useLLMConfigs = () => {
  const [configs, setConfigs] = useState<LLMConfig[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchConfigs = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('llm_configurations')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setConfigs(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement';
      setError(errorMessage);
      toast({
        title: "Erreur",
        description: "Impossible de charger les configurations LLM",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveConfig = async (configData: Partial<LLMConfig>) => {
    if (!configData.name || !configData.provider || !configData.model || !configData.api_endpoint) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return false;
    }

    setIsLoading(true);
    try {
      const dataToSave = {
        name: configData.name,
        provider: configData.provider,
        model: configData.model,
        api_endpoint: configData.api_endpoint,
        max_tokens: configData.max_tokens || 2048,
        temperature: configData.temperature || 0.7,
        system_prompt: configData.system_prompt || '',
        is_active: configData.is_active || false
      };

      if (configData.id) {
        const { error } = await supabase
          .from('llm_configurations')
          .update(dataToSave)
          .eq('id', configData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('llm_configurations')
          .insert(dataToSave);
        if (error) throw error;
      }

      toast({
        title: "Succès",
        description: "Configuration LLM sauvegardée"
      });
      
      await fetchConfigs();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur de sauvegarde';
      setError(errorMessage);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder la configuration",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleActiveConfig = async (id: string, isActive: boolean) => {
    try {
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
      await fetchConfigs();
    } catch (err) {
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
      await fetchConfigs();
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la configuration",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  return {
    configs,
    isLoading,
    error,
    saveConfig,
    toggleActiveConfig,
    deleteConfig,
    refreshConfigs: fetchConfigs
  };
};
