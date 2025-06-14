
-- Create the emotional_bridges table to store wisdom of the crowd data
CREATE TABLE public.emotional_bridges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bridge_text TEXT NOT NULL UNIQUE,
  occurrence_count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create an index on bridge_text for faster lookups
CREATE INDEX idx_emotional_bridges_text ON public.emotional_bridges(bridge_text);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_emotional_bridges_updated_at 
    BEFORE UPDATE ON public.emotional_bridges 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
