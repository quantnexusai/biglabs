-- Biglabs Database Schema
-- Run this in your Supabase SQL Editor (supabase.com > SQL Editor)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- PROFILES TABLE (extends auth.users)
-- =============================================
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    email TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    company_name TEXT,
    role TEXT,
    phone TEXT
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, first_name, last_name)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'first_name',
        NEW.raw_user_meta_data->>'last_name'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- ARTICLES TABLE
-- =============================================
CREATE TABLE public.articles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    category TEXT,
    image_url TEXT,
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own articles"
    ON public.articles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Public can view published articles"
    ON public.articles FOR SELECT
    USING (published = true);

CREATE POLICY "Users can insert own articles"
    ON public.articles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own articles"
    ON public.articles FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own articles"
    ON public.articles FOR DELETE
    USING (auth.uid() = user_id);

CREATE INDEX idx_articles_user_id ON public.articles(user_id);
CREATE INDEX idx_articles_slug ON public.articles(slug);
CREATE INDEX idx_articles_published ON public.articles(published);

-- =============================================
-- CASE STUDIES TABLE
-- =============================================
CREATE TABLE public.case_studies (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    client_name TEXT,
    industry TEXT,
    challenge TEXT,
    solution TEXT,
    results TEXT,
    metrics JSONB DEFAULT '[]',
    testimonial_quote TEXT,
    testimonial_author TEXT,
    testimonial_role TEXT,
    image_url TEXT,
    published BOOLEAN DEFAULT false
);

ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own case studies"
    ON public.case_studies FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Public can view published case studies"
    ON public.case_studies FOR SELECT
    USING (published = true);

CREATE POLICY "Users can insert own case studies"
    ON public.case_studies FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own case studies"
    ON public.case_studies FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own case studies"
    ON public.case_studies FOR DELETE
    USING (auth.uid() = user_id);

CREATE INDEX idx_case_studies_user_id ON public.case_studies(user_id);
CREATE INDEX idx_case_studies_slug ON public.case_studies(slug);

-- =============================================
-- CAREERS TABLE
-- =============================================
CREATE TABLE public.careers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    department TEXT,
    location TEXT,
    type TEXT DEFAULT 'full-time',
    description TEXT,
    requirements JSONB DEFAULT '[]',
    benefits JSONB DEFAULT '[]',
    salary_range TEXT,
    published BOOLEAN DEFAULT false
);

ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own careers"
    ON public.careers FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Public can view published careers"
    ON public.careers FOR SELECT
    USING (published = true);

CREATE POLICY "Users can insert own careers"
    ON public.careers FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own careers"
    ON public.careers FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own careers"
    ON public.careers FOR DELETE
    USING (auth.uid() = user_id);

CREATE INDEX idx_careers_user_id ON public.careers(user_id);

-- =============================================
-- SERVICES TABLE
-- =============================================
CREATE TABLE public.services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    long_description TEXT,
    icon TEXT,
    features JSONB DEFAULT '[]',
    published BOOLEAN DEFAULT false,
    sort_order INT DEFAULT 0
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own services"
    ON public.services FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Public can view published services"
    ON public.services FOR SELECT
    USING (published = true);

CREATE POLICY "Users can insert own services"
    ON public.services FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own services"
    ON public.services FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own services"
    ON public.services FOR DELETE
    USING (auth.uid() = user_id);

CREATE INDEX idx_services_user_id ON public.services(user_id);
CREATE INDEX idx_services_slug ON public.services(slug);

-- =============================================
-- CONSULTATIONS TABLE
-- =============================================
CREATE TABLE public.consultations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    phone TEXT,
    message TEXT,
    preferred_date DATE,
    preferred_time TEXT,
    status TEXT DEFAULT 'pending'
);

ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view consultations"
    ON public.consultations FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update consultations"
    ON public.consultations FOR UPDATE
    USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can submit a consultation"
    ON public.consultations FOR INSERT
    WITH CHECK (true);

CREATE INDEX idx_consultations_user_id ON public.consultations(user_id);
CREATE INDEX idx_consultations_status ON public.consultations(status);

-- =============================================
-- ANALYTICS REPORTS TABLE
-- =============================================
CREATE TABLE public.analytics_reports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    report_type TEXT,
    data JSONB DEFAULT '{}',
    ai_insights TEXT
);

ALTER TABLE public.analytics_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own reports"
    ON public.analytics_reports FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reports"
    ON public.analytics_reports FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reports"
    ON public.analytics_reports FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reports"
    ON public.analytics_reports FOR DELETE
    USING (auth.uid() = user_id);

CREATE INDEX idx_analytics_reports_user_id ON public.analytics_reports(user_id);

-- =============================================
-- TESTIMONIALS TABLE
-- =============================================
CREATE TABLE public.testimonials (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    quote TEXT NOT NULL,
    author_name TEXT NOT NULL,
    author_role TEXT,
    company TEXT,
    avatar_url TEXT,
    published BOOLEAN DEFAULT false
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own testimonials"
    ON public.testimonials FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Public can view published testimonials"
    ON public.testimonials FOR SELECT
    USING (published = true);

CREATE POLICY "Users can insert own testimonials"
    ON public.testimonials FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own testimonials"
    ON public.testimonials FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own testimonials"
    ON public.testimonials FOR DELETE
    USING (auth.uid() = user_id);

CREATE INDEX idx_testimonials_user_id ON public.testimonials(user_id);

-- =============================================
-- PRICING PLANS TABLE
-- =============================================
CREATE TABLE public.pricing_plans (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC DEFAULT 0,
    interval TEXT DEFAULT 'monthly',
    features JSONB DEFAULT '[]',
    highlighted BOOLEAN DEFAULT false,
    sort_order INT DEFAULT 0
);

ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own pricing plans"
    ON public.pricing_plans FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Public can view all pricing plans"
    ON public.pricing_plans FOR SELECT
    USING (true);

CREATE POLICY "Users can insert own pricing plans"
    ON public.pricing_plans FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pricing plans"
    ON public.pricing_plans FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own pricing plans"
    ON public.pricing_plans FOR DELETE
    USING (auth.uid() = user_id);

CREATE INDEX idx_pricing_plans_user_id ON public.pricing_plans(user_id);

-- =============================================
-- CONTACTS TABLE
-- =============================================
CREATE TABLE public.contacts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    message TEXT
);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact"
    ON public.contacts FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Authenticated users can view contacts"
    ON public.contacts FOR SELECT
    USING (auth.role() = 'authenticated');
