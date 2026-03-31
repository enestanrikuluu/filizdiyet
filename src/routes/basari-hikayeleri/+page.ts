import { getSuccessStories, getTestimonials } from '$lib/services/content-service';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const [successStories, testimonials] = await Promise.all([
    getSuccessStories(),
    getTestimonials()
  ]);

  return {
    successStories,
    testimonials
  };
};
