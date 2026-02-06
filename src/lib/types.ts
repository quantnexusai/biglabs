export interface Profile {
  id: string;
  created_at: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  company_name: string | null;
  role: string | null;
  phone: string | null;
}

export interface Article {
  id: string;
  created_at: string;
  user_id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string | null;
  published: boolean;
  published_at: string | null;
}

export interface CaseStudy {
  id: string;
  created_at: string;
  user_id: string;
  title: string;
  slug: string;
  client_name: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  metrics: CaseStudyMetric[];
  testimonial_quote: string | null;
  testimonial_author: string | null;
  testimonial_role: string | null;
  image_url: string | null;
  published: boolean;
}

export interface CaseStudyMetric {
  label: string;
  value: string;
  description?: string;
}

export interface Career {
  id: string;
  created_at: string;
  user_id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  description: string;
  requirements: string[];
  benefits: string[];
  salary_range: string | null;
  published: boolean;
}

export interface Service {
  id: string;
  created_at: string;
  user_id: string;
  title: string;
  slug: string;
  description: string;
  long_description: string | null;
  icon: string;
  features: string[];
  published: boolean;
  sort_order: number;
}

export interface Consultation {
  id: string;
  created_at: string;
  user_id: string | null;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  message: string;
  preferred_date: string | null;
  preferred_time: string | null;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface AnalyticsReport {
  id: string;
  created_at: string;
  user_id: string;
  title: string;
  report_type: string;
  data: Record<string, unknown>;
  ai_insights: string | null;
}

export interface Testimonial {
  id: string;
  created_at: string;
  user_id: string;
  quote: string;
  author_name: string;
  author_role: string;
  company: string;
  avatar_url: string | null;
  published: boolean;
}

export interface PricingPlan {
  id: string;
  created_at: string;
  user_id: string;
  name: string;
  description: string;
  price: number;
  interval: 'monthly' | 'quarterly' | 'annually' | 'project';
  features: string[];
  highlighted: boolean;
  sort_order: number;
}

export interface Contact {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
}
