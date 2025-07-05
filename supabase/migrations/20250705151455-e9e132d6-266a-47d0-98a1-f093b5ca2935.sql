
-- Ajouter une politique RLS pour permettre aux admins de voir et modifier les configurations LLM
CREATE POLICY "Admins can manage LLM configurations" 
  ON public.llm_configurations 
  FOR ALL 
  USING (has_role(auth.uid(), 'admin'));

-- Ajouter une politique pour que tous les utilisateurs authentifiés puissent voir les configurations actives (pour l'interface)
CREATE POLICY "Users can view active LLM configurations" 
  ON public.llm_configurations 
  FOR SELECT 
  USING (is_active = true);
