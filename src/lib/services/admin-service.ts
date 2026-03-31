import { supabase } from '$lib/supabase';

// ── Auth ──

export async function adminLogin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return data;
}

export async function adminLogout() {
  await supabase.auth.signOut();
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

// ── Dashboard Stats ──

export async function getDashboardStats() {
  const [appointments, blogPosts, recipes, stories] = await Promise.all([
    supabase.from('appointments').select('id, status', { count: 'exact' }),
    supabase.from('blog_posts').select('id', { count: 'exact' }),
    supabase.from('recipes').select('id', { count: 'exact' }),
    supabase.from('success_stories').select('id', { count: 'exact' })
  ]);

  const pendingAppointments = appointments.data?.filter((a) => a.status === 'pending').length ?? 0;

  return {
    totalAppointments: appointments.count ?? 0,
    pendingAppointments,
    totalBlogPosts: blogPosts.count ?? 0,
    totalRecipes: recipes.count ?? 0,
    totalSuccessStories: stories.count ?? 0
  };
}

// ── Blog CRUD ──

export async function createBlogPost(post: {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readingTime: number;
  tags: string[];
}) {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      reading_time: post.readingTime,
      tags: post.tags
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateBlogPost(id: string, updates: Record<string, unknown>) {
  // Convert camelCase to snake_case for DB
  const dbUpdates: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(updates)) {
    const snakeKey = key.replace(/[A-Z]/g, (m) => '_' + m.toLowerCase());
    dbUpdates[snakeKey] = value;
  }

  const { error } = await supabase.from('blog_posts').update(dbUpdates).eq('id', id);
  if (error) throw new Error(error.message);
}

export async function deleteBlogPost(id: string) {
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

// ── All blog posts (including unpublished) for admin ──

export async function getAllBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getAllRecipes() {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}
