-- Create schools table
CREATE TABLE public.schools (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  ges_registration_no TEXT NOT NULL UNIQUE,
  region TEXT NOT NULL,
  district TEXT NOT NULL,
  school_type TEXT NOT NULL CHECK (school_type IN ('Public', 'Private', 'Mission', 'International')),
  address TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  subscription_tier TEXT NOT NULL DEFAULT 'Free' CHECK (subscription_tier IN ('Free', 'Trial', 'Standard', 'Premium')),
  subscription_status TEXT NOT NULL DEFAULT 'trial' CHECK (subscription_status IN ('active', 'expired', 'trial')),
  subscription_renewal_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;

-- Create policies - Schools are viewable by everyone (admins only in production)
CREATE POLICY "Schools are viewable by everyone" 
ON public.schools 
FOR SELECT 
USING (true);

-- Only authenticated users can create schools
CREATE POLICY "Authenticated users can create schools" 
ON public.schools 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Only authenticated users can update schools
CREATE POLICY "Authenticated users can update schools" 
ON public.schools 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

-- Only authenticated users can delete schools
CREATE POLICY "Authenticated users can delete schools" 
ON public.schools 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_schools_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_schools_updated_at
BEFORE UPDATE ON public.schools
FOR EACH ROW
EXECUTE FUNCTION public.update_schools_updated_at();

-- Create indexes for better performance
CREATE INDEX idx_schools_region ON public.schools(region);
CREATE INDEX idx_schools_district ON public.schools(district);
CREATE INDEX idx_schools_subscription_status ON public.schools(subscription_status);
CREATE INDEX idx_schools_ges_registration_no ON public.schools(ges_registration_no);