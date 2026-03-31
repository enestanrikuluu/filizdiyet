import { getBlogPostBySlug, getBlogPosts } from '$lib/services/blog-service';
import { getRecipeBySlug, getRecipes } from '$lib/services/recipe-service';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const blogPost = await getBlogPostBySlug(params.slug);
  if (blogPost) {
    // Get related posts in same category
    const allPosts = await getBlogPosts();
    const relatedPosts = allPosts
      .filter((p) => p.slug !== blogPost.slug && p.category === blogPost.category)
      .slice(0, 3);
    return { type: 'blog' as const, item: blogPost, relatedPosts, relatedRecipes: [] };
  }

  const recipe = await getRecipeBySlug(params.slug);
  if (recipe) {
    // Get related recipes in same category
    const allRecipes = await getRecipes();
    const relatedRecipes = allRecipes
      .filter((r) => r.slug !== recipe.slug && r.category === recipe.category)
      .slice(0, 3);
    return { type: 'recipe' as const, item: recipe, relatedPosts: [], relatedRecipes };
  }

  throw error(404, 'İçerik bulunamadı');
};
