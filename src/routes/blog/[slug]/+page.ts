import { BLOG_POSTS } from '$lib/data/blog-posts';
import { RECIPES } from '$lib/data/recipes';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const blogPost = BLOG_POSTS.find((post) => post.slug === params.slug);
  if (blogPost) {
    return { type: 'blog' as const, item: blogPost };
  }

  const recipe = RECIPES.find((r) => r.slug === params.slug);
  if (recipe) {
    return { type: 'recipe' as const, item: recipe };
  }

  throw error(404, 'İçerik bulunamadı');
};
