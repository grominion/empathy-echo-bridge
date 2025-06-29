
-- Table pour stocker les configurations LLM
CREATE TABLE public.llm_configurations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  provider VARCHAR(50) NOT NULL, -- 'openai', 'anthropic', 'google'
  model VARCHAR(100) NOT NULL,
  api_endpoint TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT false,
  max_tokens INTEGER DEFAULT 2048,
  temperature DECIMAL(3,2) DEFAULT 0.7,
  system_prompt TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(provider, model)
);

-- Table pour l'historique des conversations
CREATE TABLE public.conversation_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  title TEXT NOT NULL,
  conflict_description TEXT NOT NULL,
  analysis_result JSONB,
  llm_config_used UUID REFERENCES public.llm_configurations(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_favorite BOOLEAN DEFAULT false
);

-- Table pour les thèmes personnalisés
CREATE TABLE public.user_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  theme VARCHAR(20) DEFAULT 'light', -- 'light', 'dark'
  language VARCHAR(10) DEFAULT 'en',
  default_analysis_type VARCHAR(50) DEFAULT 'full', -- 'empathy', 'strategy', 'full'
  notifications_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- RLS pour llm_configurations (admin seulement pour maintenant)
ALTER TABLE public.llm_configurations ENABLE ROW LEVEL SECURITY;

-- RLS pour conversation_history
ALTER TABLE public.conversation_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own conversation history" 
  ON public.conversation_history 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own conversation history" 
  ON public.conversation_history 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own conversation history" 
  ON public.conversation_history 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own conversation history" 
  ON public.conversation_history 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS pour user_preferences
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own preferences" 
  ON public.user_preferences 
  FOR ALL 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Trigger pour updated_at
CREATE TRIGGER update_llm_configurations_updated_at
  BEFORE UPDATE ON public.llm_configurations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON public.user_preferences
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insertion des configurations par défaut
INSERT INTO public.llm_configurations (name, provider, model, api_endpoint, is_active, system_prompt) VALUES
('Claude Opus', 'anthropic', 'claude-3-opus-20240229', 'https://api.anthropic.com/v1/messages', true, 'You are an expert psychologist analyzing conflicts with empathy and wisdom.'),
('GPT-4o', 'openai', 'gpt-4o', 'https://api.openai.com/v1/chat/completions', false, 'You are a strategic conflict resolution expert.'),
('Gemini Pro', 'google', 'gemini-1.5-pro-latest', 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent', false, 'You are a rational strategist for conflict de-escalation.');
