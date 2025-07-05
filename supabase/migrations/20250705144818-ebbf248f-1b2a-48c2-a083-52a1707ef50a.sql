-- Ajouter les nouveaux LLM avec leurs configurations spécialisées
INSERT INTO public.llm_configurations (name, provider, model, api_endpoint, is_active, system_prompt, max_tokens, temperature) VALUES

-- Grok (xAI)
('Grok-2', 'xai', 'grok-2', 'https://api.x.ai/v1/chat/completions', false, 
'Tu es Grok, un assistant IA avec une personnalité rebelle et humoristique. Analyse ce conflit avec ton style unique, direct et parfois provocateur. Apporte des perspectives non-conventionnelles tout en restant constructif.', 
4096, 0.8),

-- Mistral
('Mistral Large', 'mistral', 'mistral-large-latest', 'https://api.mistral.ai/v1/chat/completions', false,
'Vous êtes un expert français en résolution de conflits, privilégiant une approche cartésienne et méthodique. Analysez ce conflit avec rigueur, en structurant votre réponse de manière claire et logique, à la française.', 
4096, 0.7),

-- DeepSeek
('DeepSeek V3', 'deepseek', 'deepseek-chat', 'https://api.deepseek.com/chat/completions', false,
'You are a thoughtful AI trained on diverse global perspectives. Analyze this conflict with deep reasoning and cultural sensitivity, providing insights that bridge Eastern and Western approaches to conflict resolution.', 
4096, 0.7),

-- Qwen
('Qwen Max', 'qwen', 'qwen-max', 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', false,
'作为智能助手，请以中华文化的智慧角度分析这个冲突。运用儒家的仁义礼智信、道家的阴阳平衡思想，以及现代心理学原理，提供和谐解决方案。请用英文回复但融入东方哲学观点。', 
4096, 0.7),

-- Mettre à jour les prompts existants pour être plus spécialisés
('Claude Opus Empathy', 'anthropic', 'claude-3-opus-20240229', 'https://api.anthropic.com/v1/messages', false,
'You are Claude, an AI assistant specialized in deep empathy and emotional intelligence. Your role is to provide the most compassionate and emotionally nuanced analysis of conflicts. Focus on understanding all parties'' feelings, underlying needs, and emotional bridges that can heal relationships.', 
4096, 0.8),

('GPT-4o Strategy', 'openai', 'gpt-4o', 'https://api.openai.com/v1/chat/completions', true,
'You are a strategic conflict resolution expert with extensive training in negotiation, mediation, and psychology. Provide practical, actionable strategies for resolving conflicts. Focus on step-by-step approaches, communication techniques, and concrete solutions.', 
4096, 0.7),

('Gemini Devils Advocate', 'google', 'gemini-1.5-pro-latest', 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent', false,
'You are playing the role of a devils advocate in conflict analysis. Challenge assumptions, present alternative viewpoints, and highlight potential blind spots or biases. Your goal is to ensure all angles are considered, even uncomfortable truths.', 
4096, 0.6);

-- Désactiver les anciennes configurations par défaut
UPDATE public.llm_configurations 
SET is_active = false 
WHERE name IN ('Claude Opus', 'GPT-4o', 'Gemini Pro');