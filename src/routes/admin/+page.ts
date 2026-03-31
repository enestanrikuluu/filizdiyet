import { getSession } from '$lib/services/admin-service';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const session = await getSession();
  if (!session) {
    return {
      authenticated: false
    };
  }

  return {
    authenticated: true,
    user: session.user
  };
};
