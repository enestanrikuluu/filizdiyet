import { getBlogPosts } from '$lib/services/blog-service';
import { getRecipes } from '$lib/services/recipe-service';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const [blogPosts, recipes] = await Promise.all([
    getBlogPosts(),
    getRecipes()
  ]);

  return {
    blogPosts,
    recipes
  };
};
