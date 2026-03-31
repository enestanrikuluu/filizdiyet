<script lang="ts">
  import { BLOG_POSTS } from '$lib/data/blog-posts';
  import { RECIPES } from '$lib/data/recipes';
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import { formatDate } from '$lib/utils/calculations';

  type Category = 'all' | 'tarif' | 'beslenme' | 'saglik' | 'yasam';

  let activeCategory: Category = $state('all');

  const categories: { value: Category; label: string }[] = [
    { value: 'all', label: 'Tümü' },
    { value: 'tarif', label: 'Tarifler' },
    { value: 'beslenme', label: 'Beslenme' },
    { value: 'saglik', label: 'Sağlık' },
  ];

  // Combine blog posts and recipes into unified items
  let allItems = $derived([
    ...BLOG_POSTS.map(post => ({
      id: `blog-${post.id}`,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      imageUrl: post.imageUrl,
      date: post.publishedAt,
      readingTime: post.readingTime,
      type: 'blog' as const,
      tags: post.tags
    })),
    ...RECIPES.map(recipe => ({
      id: `recipe-${recipe.id}`,
      slug: recipe.slug,
      title: recipe.title,
      excerpt: recipe.description,
      category: 'tarif' as const,
      imageUrl: recipe.imageUrl,
      date: '',
      readingTime: recipe.prepTime + recipe.cookTime,
      type: 'recipe' as const,
      tags: recipe.tags as string[]
    }))
  ]);

  let filteredItems = $derived(activeCategory === 'all'
    ? allItems
    : allItems.filter(item => item.category === activeCategory));
</script>

<svelte:head>
  <title>Blog & Tarifler — Filiz Diyet | Sağlıklı Beslenme</title>
</svelte:head>

<section class="section" style="padding-top: var(--space-16);">
  <div class="container">
    <SectionHeading
      label="Blog & Tarifler"
      title="Bilgi Köşesi"
      description="Sağlıklı beslenme hakkında bilmeniz gereken her şey: tariflerden beslenme ipuçlarına."
    />

    <!-- Category Filter -->
    <div class="flex flex-wrap gap-2" style="margin-bottom: var(--space-12);">
      {#each categories as cat}
        <button
          onclick={() => activeCategory = cat.value}
          style="
            padding: var(--space-2) var(--space-6);
            border-radius: var(--radius-full);
            font-size: var(--text-sm);
            font-weight: 500;
            border: 1px solid {activeCategory === cat.value ? 'var(--color-primary)' : 'var(--color-border-strong)'};
            background: {activeCategory === cat.value ? 'var(--color-primary)' : 'transparent'};
            color: {activeCategory === cat.value ? 'var(--color-text-inverse)' : 'var(--color-text-secondary)'};
            cursor: pointer;
            transition: all var(--duration-fast) var(--ease-out-quart);
          "
        >
          {cat.label}
        </button>
      {/each}
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
      {#each filteredItems as item, i (item.id)}
        <a
          href="/blog/{item.slug}"
          class="group block"
          style="text-decoration: none;"
        >
          <!-- Image -->
          <div
            style="
              aspect-ratio: 3/2;
              background: linear-gradient({120 + i * 20}deg, var(--color-primary-lighter), var(--color-accent-light));
              border-radius: var(--radius-lg);
              margin-bottom: var(--space-4);
              overflow: hidden;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: var(--font-display);
              font-style: italic;
              color: var(--color-primary);
              transition: transform var(--duration-normal) var(--ease-out-expo);
            "
          >
            <span style="font-size: var(--text-sm); text-align: center; padding: var(--space-4); opacity: 0.6;">
              {item.title}
            </span>
          </div>

          <!-- Meta -->
          <div class="flex items-center gap-3" style="margin-bottom: var(--space-2);">
            <span style="
              font-size: var(--text-xs);
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              color: var(--color-primary);
            ">
              {item.type === 'recipe' ? 'Tarif' : item.category === 'beslenme' ? 'Beslenme' : item.category === 'saglik' ? 'Sağlık' : 'Yaşam'}
            </span>
            {#if item.readingTime}
              <span style="font-size: var(--text-xs); color: var(--color-text-tertiary);">
                {item.readingTime} dk
              </span>
            {/if}
          </div>

          <!-- Title -->
          <h3 style="font-size: var(--text-lg); margin-bottom: var(--space-2); transition: color var(--duration-fast) var(--ease-out-quart);">
            {item.title}
          </h3>

          <!-- Excerpt -->
          <p style="font-size: var(--text-sm); color: var(--color-text-tertiary); line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
            {item.excerpt}
          </p>
        </a>
      {/each}
    </div>

    {#if filteredItems.length === 0}
      <div class="text-center" style="padding: var(--space-16);">
        <p class="font-display" style="font-size: var(--text-2xl); color: var(--color-text-tertiary);">
          Bu kategoride henüz içerik yok.
        </p>
      </div>
    {/if}
  </div>
</section>
