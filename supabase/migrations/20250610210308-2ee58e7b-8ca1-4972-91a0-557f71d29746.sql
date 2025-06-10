
-- Add the missing api_type column to api_configurations table
ALTER TABLE public.api_configurations 
ADD COLUMN api_type text DEFAULT 'domain';

-- Add api_secret column for providers that require it (like some hosting APIs)
ALTER TABLE public.api_configurations 
ADD COLUMN api_secret text;

-- Update existing records to have the domain type by default
UPDATE public.api_configurations 
SET api_type = 'domain' 
WHERE api_type IS NULL;

-- Make api_type not nullable now that we've set defaults
ALTER TABLE public.api_configurations 
ALTER COLUMN api_type SET NOT NULL;

-- Add a check constraint to ensure valid api_types
ALTER TABLE public.api_configurations 
ADD CONSTRAINT valid_api_type CHECK (api_type IN ('domain', 'hosting'));
