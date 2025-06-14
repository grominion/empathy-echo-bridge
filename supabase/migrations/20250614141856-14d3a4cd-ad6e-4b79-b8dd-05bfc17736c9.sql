
-- The emotional_bridges table already exists, but let's verify its structure
-- and add any missing constraints or indexes for optimal performance

-- Ensure the table has proper constraints
ALTER TABLE public.emotional_bridges 
ADD CONSTRAINT unique_bridge_text UNIQUE (bridge_text);

-- Add an index for faster occurrence counting
CREATE INDEX IF NOT EXISTS idx_emotional_bridges_occurrence_count 
ON public.emotional_bridges(occurrence_count DESC);

-- Create a function to get total count efficiently
CREATE OR REPLACE FUNCTION get_total_bridge_count()
RETURNS INTEGER AS $$
BEGIN
    RETURN (SELECT COALESCE(SUM(occurrence_count), 0) FROM public.emotional_bridges);
END;
$$ LANGUAGE plpgsql;
