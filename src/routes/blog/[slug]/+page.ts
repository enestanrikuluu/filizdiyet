import { getBlogPostBySlug } from '$lib/services/blog-service';
import { getRecipeBySlug } from '$lib/services/recipe-service';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const blogPost = await getBlogPostBySlug(params.slug);
  if (blogPost) {
    return { type: 'blog' as const, item: blogPost };
  }

  const recipe = await getRecipeBySlug(params.slug);
  if (recipe) {
    return { type: 'recipe' as const, item: recipe };
  }

  throw error(404, 'İçerik bulunamadı');
};
