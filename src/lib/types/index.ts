// Domain types for the Filiz Diyet website

export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  imageUrl: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
}

export type BlogCategory = 'tarif' | 'beslenme' | 'saglik' | 'yasam';

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions: string[];
  tags: RecipeTag[];
  category: RecipeCategory;
}

export type RecipeTag = 'glutensiz' | 'vegan' | 'dusuk-kalorili' | 'protein' | 'smoothie' | 'atistirmalik' | 'ana-yemek' | 'tatli';
export type RecipeCategory = 'kahvalti' | 'ana-yemek' | 'atistirmalik' | 'icecek' | 'tatli' | 'salata';

export interface SuccessStory {
  id: string;
  name: string;
  age: number;
  initialWeight: number;
  currentWeight: number;
  duration: string;
  quote: string;
  imageUrl: string;
  program: string;
}

export interface Appointment {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  serviceType: string;
  message: string;
  status: AppointmentStatus;
  createdAt: string;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  program: string;
}

export interface BmiResult {
  bmi: number;
  category: string;
  color: string;
  recommendation: string;
}

export interface CalorieResult {
  bmr: number;
  tdee: number;
  deficit: number;
  surplus: number;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  socialMedia: {
    instagram: string;
    linkedin: string;
  };
}
