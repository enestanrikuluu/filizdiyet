<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  import type { BlogPost, Recipe } from '$lib/types';
  import { formatDate } from '$lib/utils/calculations';

  let { data } = $props();

  const categoryLabels: Record<string, string> = {
    beslenme: 'Beslenme',
    saglik: 'Sağlık',
    yasam: 'Yaşam',
    tarif: 'Tarif',
    kahvalti: 'Kahvaltı',
    'ana-yemek': 'Ana Yemek',
    atistirmalik: 'Atıştırmalık',
    icecek: 'İçecek',
    tatli: 'Tatlı',
    salata: 'Salata'
  };

  let isBlogPost = $derived(data.type === 'blog');
  let blogPost = $derived(isBlogPost ? (data.item as BlogPost) : null);
  let recipe = $derived(!isBlogPost ? (data.item as Recipe) : null);

  // Related content from load function
  let relatedPosts = $derived(data.relatedPosts ?? []);
  let relatedRecipes = $derived(data.relatedRecipes ?? []);

  // Parse markdown-like bold text
  function parseContent(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n- /g, '<br/>• ')
      .replace(/\n(\d+)\. /g, '<br/>$1. ');
  }
</script>

<svelte:head>
  <title>{isBlogPost ? blogPost?.title : recipe?.title} — Filiz Diyet</title>
  <meta name="description" content={isBlogPost ? blogPost?.excerpt : recipe?.description} />
</svelte:head>

<!-- Hero Banner -->
<section style="
  padding-top: var(--space-20);
  padding-bottom: var(--space-12);
  background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-primary-lighter) 100%);
">
  <div class="container" style="max-width: 48rem; margin-inline: auto;">
    <!-- Breadcrumb -->
    <nav style="margin-bottom: var(--space-6); font-size: var(--text-sm); color: var(--color-text-tertiary);">
      <a href="/" style="color: var(--color-text-tertiary); text-decoration: none;">Ana Sayfa</a>
      <span style="margin-inline: var(--space-2);">/</span>
      <a href="/blog" style="color: var(--color-text-tertiary); text-decoration: none;">Blog</a>
      <span style="margin-inline: var(--space-2);">/</span>
      <span style="color: var(--color-text-primary);">{isBlogPost ? blogPost?.title : recipe?.title}</span>
    </nav>

    <!-- Category Badge -->
    <span style="
      display: inline-block;
      font-size: var(--text-xs);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--color-primary);
      background: var(--color-primary-lighter);
      padding: var(--space-1) var(--space-3);
      border-radius: var(--radius-full);
      margin-bottom: var(--space-4);
    ">
      {isBlogPost ? categoryLabels[blogPost?.category ?? ''] ?? blogPost?.category : '🍽️ Tarif'}
    </span>

    <h1 style="margin-bottom: var(--space-4); line-height: 1.2;">
      {isBlogPost ? blogPost?.title : recipe?.title}
    </h1>

    <p style="font-size: var(--text-lg); color: var(--color-text-tertiary); max-width: 45ch; margin-bottom: var(--space-6);">
      {isBlogPost ? blogPost?.excerpt : recipe?.description}
    </p>

    <!-- Meta Info -->
    <div class="flex flex-wrap items-center gap-4" style="font-size: var(--text-sm); color: var(--color-text-tertiary);">
      {#if isBlogPost && blogPost}
        <span>📅 {formatDate(blogPost.publishedAt)}</span>
        <span>⏱️ {blogPost.readingTime} dk okuma</span>
      {/if}
      {#if recipe}
        <span>⏱️ Hazırlık: {recipe.prepTime} dk</span>
        {#if recipe.cookTime > 0}
          <span>🔥 Pişirme: {recipe.cookTime} dk</span>
        {/if}
        <span>👤 {recipe.servings} kişilik</span>
        <span>🔋 {recipe.calories} kcal</span>
      {/if}
    </div>
  </div>
</section>

<!-- Hero Image -->
{#if (isBlogPost && blogPost?.imageUrl) || (!isBlogPost && recipe?.imageUrl)}
  <div class="container" style="max-width: 48rem; margin-inline: auto; margin-top: calc(-1 * var(--space-4));">
    <img
      src={isBlogPost ? blogPost?.imageUrl : recipe?.imageUrl}
      alt={isBlogPost ? blogPost?.title : recipe?.title}
      style="width: 100%; aspect-ratio: 16/9; object-fit: cover; border-radius: var(--radius-xl); box-shadow: var(--shadow-lg);"
    />
  </div>
{/if}

<!-- Content Area -->
<section style="padding-block: var(--space-16);">
  <div class="container" style="max-width: 48rem; margin-inline: auto;">

    {#if isBlogPost && blogPost}
      <!-- Blog Post Content -->
      <article class="blog-content" style="
        font-size: var(--text-base);
        line-height: 1.85;
        color: var(--color-text-secondary);
      ">
        <p>{@html parseContent(blogPost.content)}</p>
      </article>

      <!-- Tags -->
      {#if blogPost.tags.length > 0}
        <div class="flex flex-wrap gap-2" style="margin-top: var(--space-10); padding-top: var(--space-8); border-top: 1px solid var(--color-border);">
          {#each blogPost.tags as tag}
            <span style="
              font-size: var(--text-xs);
              color: var(--color-text-tertiary);
              background: var(--color-surface-alt);
              padding: var(--space-1) var(--space-3);
              border-radius: var(--radius-full);
            ">
              #{tag}
            </span>
          {/each}
        </div>
      {/if}
    {/if}

    {#if !isBlogPost && recipe}
      <!-- Recipe Nutritional Info -->
      <div class="grid grid-cols-4 gap-3" style="margin-bottom: var(--space-10);">
        {#each [
          { label: 'Kalori', value: `${recipe.calories}`, unit: 'kcal', color: 'var(--color-accent)' },
          { label: 'Protein', value: `${recipe.protein}`, unit: 'g', color: 'var(--color-primary)' },
          { label: 'Karbonhidrat', value: `${recipe.carbs}`, unit: 'g', color: 'oklch(65% 0.15 30)' },
          { label: 'Yağ', value: `${recipe.fat}`, unit: 'g', color: 'oklch(55% 0.12 250)' }
        ] as stat}
          <div style="
            text-align: center;
            padding: var(--space-4) var(--space-2);
            background: var(--color-surface-alt);
            border-radius: var(--radius-lg);
          ">
            <div style="font-size: var(--text-2xl); font-weight: 700; font-family: var(--font-display); color: {stat.color};">
              {stat.value}
            </div>
            <div style="font-size: var(--text-xs); color: var(--color-text-tertiary);">{stat.unit}</div>
            <div style="font-size: var(--text-xs); font-weight: 500; color: var(--color-text-secondary); margin-top: var(--space-1);">
              {stat.label}
            </div>
          </div>
        {/each}
      </div>

      <!-- Ingredients -->
      <div style="margin-bottom: var(--space-10);">
        <h2 style="font-size: var(--text-xl); margin-bottom: var(--space-4);">Malzemeler</h2>
        <ul style="list-style: none; padding: 0;">
          {#each recipe.ingredients as ingredient, i}
            <li style="
              display: flex;
              align-items: flex-start;
              gap: var(--space-3);
              padding: var(--space-3) 0;
              border-bottom: 1px solid var(--color-border);
              font-size: var(--text-base);
              color: var(--color-text-secondary);
              animation: fadeInUp var(--duration-normal) var(--ease-out-expo) both;
              animation-delay: {i * 40}ms;
            ">
              <span style="
                flex-shrink: 0;
                width: 1.5rem;
                height: 1.5rem;
                border-radius: 50%;
                background: var(--color-primary-lighter);
                color: var(--color-primary);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: var(--text-xs);
                font-weight: 600;
              ">{i + 1}</span>
              {ingredient}
            </li>
          {/each}
        </ul>
      </div>

      <!-- Instructions -->
      <div style="margin-bottom: var(--space-10);">
        <h2 style="font-size: var(--text-xl); margin-bottom: var(--space-4);">Hazırlanışı</h2>
        <ol style="list-style: none; padding: 0; counter-reset: step;">
          {#each recipe.instructions as step, i}
            <li style="
              display: flex;
              align-items: flex-start;
              gap: var(--space-4);
              padding: var(--space-4) 0;
              border-bottom: 1px solid var(--color-border);
              animation: fadeInUp var(--duration-normal) var(--ease-out-expo) both;
              animation-delay: {i * 60}ms;
            ">
              <span style="
                flex-shrink: 0;
                width: 2rem;
                height: 2rem;
                border-radius: 50%;
                background: var(--color-primary);
                color: var(--color-text-inverse);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: var(--text-sm);
                font-weight: 700;
              ">{i + 1}</span>
              <p style="font-size: var(--text-base); color: var(--color-text-secondary); line-height: 1.6; padding-top: var(--space-1);">
                {step}
              </p>
            </li>
          {/each}
        </ol>
      </div>

      <!-- Recipe Tags -->
      {#if recipe.tags.length > 0}
        <div class="flex flex-wrap gap-2" style="margin-top: var(--space-6); padding-top: var(--space-6); border-top: 1px solid var(--color-border);">
          {#each recipe.tags as tag}
            <span style="
              font-size: var(--text-xs);
              color: var(--color-text-tertiary);
              background: var(--color-surface-alt);
              padding: var(--space-1) var(--space-3);
              border-radius: var(--radius-full);
            ">
              #{tag}
            </span>
          {/each}
        </div>
      {/if}
    {/if}

    <!-- CTA -->
    <div style="
      margin-top: var(--space-12);
      padding: var(--space-8);
      background: var(--color-primary-lighter);
      border-radius: var(--radius-xl);
      text-align: center;
    ">
      <h3 style="font-size: var(--text-lg); margin-bottom: var(--space-2);">Size Özel Beslenme Planı</h3>
      <p style="font-size: var(--text-sm); color: var(--color-text-tertiary); margin-bottom: var(--space-4);">
        Kişisel ihtiyaçlarınıza uygun profesyonel beslenme danışmanlığı için hemen randevu alın.
      </p>
      <Button href="/iletisim" variant="primary" size="md">Randevu Al</Button>
    </div>

    <!-- Related Content -->
    {#if (isBlogPost && relatedPosts.length > 0) || (!isBlogPost && relatedRecipes.length > 0)}
      <div style="margin-top: var(--space-16);">
        <h2 style="font-size: var(--text-xl); margin-bottom: var(--space-6);">
          {isBlogPost ? 'Benzer Yazılar' : 'Benzer Tarifler'}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {#if isBlogPost}
            {#each relatedPosts as post}
              <a href="/blog/{post.slug}" style="text-decoration: none; color: inherit;">
                <div style="
                  background: var(--color-surface-alt);
                  border-radius: var(--radius-lg);
                  overflow: hidden;
                  transition: transform var(--duration-fast) var(--ease-out-quart);
                "
                  onmouseenter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onmouseleave={(e) => e.currentTarget.style.transform = 'none'}
                >
                  <div style="height: 8rem; background: linear-gradient(135deg, var(--color-primary-lighter), var(--color-surface-alt));"></div>
                  <div style="padding: var(--space-4);">
                    <h3 style="font-size: var(--text-sm); font-weight: 600; margin-bottom: var(--space-1);">{post.title}</h3>
                    <p style="font-size: var(--text-xs); color: var(--color-text-tertiary);">{post.readingTime} dk okuma</p>
                  </div>
                </div>
              </a>
            {/each}
          {:else}
            {#each relatedRecipes as rel}
              <a href="/blog/{rel.slug}" style="text-decoration: none; color: inherit;">
                <div style="
                  background: var(--color-surface-alt);
                  border-radius: var(--radius-lg);
                  overflow: hidden;
                  transition: transform var(--duration-fast) var(--ease-out-quart);
                "
                  onmouseenter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onmouseleave={(e) => e.currentTarget.style.transform = 'none'}
                >
                  <div style="height: 8rem; background: linear-gradient(135deg, var(--color-accent-lighter), var(--color-surface-alt));"></div>
                  <div style="padding: var(--space-4);">
                    <h3 style="font-size: var(--text-sm); font-weight: 600; margin-bottom: var(--space-1);">{rel.title}</h3>
                    <p style="font-size: var(--text-xs); color: var(--color-text-tertiary);">{rel.calories} kcal · {rel.servings} kişilik</p>
                  </div>
                </div>
              </a>
            {/each}
          {/if}
        </div>
      </div>
    {/if}

    <!-- Back to Blog -->
    <div style="margin-top: var(--space-10); text-align: center;">
      <Button href="/blog" variant="ghost" size="md">← Tüm Yazılara Dön</Button>
    </div>
  </div>
</section>

<style>
  .blog-content :global(strong) {
    color: var(--color-text-primary);
    font-weight: 600;
  }

  .blog-content :global(p) {
    margin-bottom: var(--space-4);
  }

  .blog-content :global(p:last-child) {
    margin-bottom: 0;
  }
</style>
