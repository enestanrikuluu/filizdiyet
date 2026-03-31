import { getRecipes } from '$lib/services/recipe-service';
import { getTestimonials } from '$lib/services/content-service';
import { getBlogPosts } from '$lib/services/blog-service';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const [recipes, testimonials, blogPosts] = await Promise.all([
    getRecipes(),
    getTestimonials(),
    getBlogPosts()
  ]);

  return {
    recipes: recipes.slice(0, 3),
    testimonials,
    blogPosts: blogPosts.slice(0, 3)
  };
};
