import { supabase } from '$lib/supabase';
import type { SuccessStory, Testimonial } from '$lib/types';

export async function getSuccessStories(): Promise<SuccessStory[]> {
  const { data, error } = await supabase
    .from('success_stories')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching success stories:', error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    age: row.age,
    initialWeight: row.initial_weight,
    currentWeight: row.current_weight,
    duration: row.duration,
    quote: row.quote,
    imageUrl: row.image_url ?? '',
    program: row.program
  }));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    text: row.text,
    rating: row.rating,
    program: row.program
  }));
}
