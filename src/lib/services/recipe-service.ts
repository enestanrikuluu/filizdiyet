import { supabase } from '$lib/supabase';
import type { Recipe } from '$lib/types';

export async function getRecipes(): Promise<Recipe[]> {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }

  return (data ?? []).map(mapRecipe);
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error || !data) return null;
  return mapRecipe(data);
}

function mapRecipe(row: Record<string, unknown>): Recipe {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    description: row.description as string,
    imageUrl: (row.image_url as string) ?? '',
    prepTime: row.prep_time as number,
    cookTime: row.cook_time as number,
    servings: row.servings as number,
    calories: row.calories as number,
    protein: Number(row.protein),
    carbs: Number(row.carbs),
    fat: Number(row.fat),
    ingredients: row.ingredients as string[],
    instructions: row.instructions as string[],
    tags: (row.tags as string[]) ?? [],
    category: row.category as Recipe['category']
  };
}
