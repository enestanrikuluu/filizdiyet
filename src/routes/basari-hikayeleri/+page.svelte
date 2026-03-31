<script lang="ts">
  import { SUCCESS_STORIES, TESTIMONIALS } from '$lib/data/success-stories';
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { onMount } from 'svelte';

  let sections: Record<string, boolean> = $state({});

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { sections[entry.target.id] = true; }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
</script>

<svelte:head>
  <title>Başarı Hikayeleri — Filiz Diyet</title>
  <meta name="description" content="Filiz Diyet danışanlarının ilham veren dönüşüm hikayeleri. Gerçek insanlar, gerçek sonuçlar ve sağlıklı yaşamın başarısı." />
  <meta name="keywords" content="başarı hikayeleri, danışan yorumları, dönüşüm hikayeleri, kilo kaybı, beslenme başarısı, müşteri deneyimleri" />
  <meta property="og:title" content="Başarı Hikayeleri — Filiz Diyet" />
  <meta property="og:description" content="Danışanlarımızın ilham veren dönüşüm hikayeleri ve gerçek sonuçları." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="/basari-hikayeleri" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<section class="section" style="padding-top: var(--space-16);">
  <div class="container">
    <SectionHeading
      label="Başarı Hikayeleri"
      title="Gerçek İnsanlar, Gerçek Sonuçlar"
      description="Danışanlarımızın ilham veren dönüşüm hikayeleri. Her hikaye, kararlılığın ve doğru beslenmenin gücünü gösteriyor."
    />
  </div>
</section>

<!-- Stories -->
{#each SUCCESS_STORIES as story, i}
  <section
    id="story-{i}"
    data-animate
    style="padding-block: var(--space-8); {i % 2 === 1 ? 'background: var(--color-surface-alt);' : ''}"
  >
    <div class="container">
      <div
        class="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center"
        style="
          opacity: {sections[`story-${i}`] ? '1' : '0'};
          transform: translateY({sections[`story-${i}`] ? '0' : '20px'});
          transition: all var(--duration-reveal) var(--ease-out-expo);
        "
      >
        <!-- Metrics Card -->
        <div class="lg:col-span-2" style="padding: var(--space-8); border: 1px solid var(--color-border); border-radius: var(--radius-lg); background: var(--color-surface); text-align: center;">
          <div class="flex items-center justify-center gap-6" style="margin-bottom: var(--space-6);">
            <div>
              <p style="font-size: var(--text-xs); color: var(--color-text-tertiary); text-transform: uppercase; letter-spacing: 0.05em;">Başlangıç</p>
              <p class="font-display" style="font-size: var(--text-3xl); color: var(--color-text-tertiary);">{story.initialWeight}</p>
              <p style="font-size: var(--text-xs); color: var(--color-text-tertiary);">kg</p>
            </div>
            <div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </div>
            <div>
              <p style="font-size: var(--text-xs); color: var(--color-text-tertiary); text-transform: uppercase; letter-spacing: 0.05em;">Şimdi</p>
              <p class="font-display" style="font-size: var(--text-3xl); color: var(--color-primary);">{story.currentWeight}</p>
              <p style="font-size: var(--text-xs); color: var(--color-text-tertiary);">kg</p>
            </div>
          </div>
          <div style="padding: var(--space-3) var(--space-6); background: var(--color-primary-lighter); border-radius: var(--radius-full); display: inline-block;">
            <span class="font-display" style="font-size: var(--text-lg); color: var(--color-primary); font-weight: 500;">
              -{story.initialWeight - story.currentWeight} kg
            </span>
            <span style="font-size: var(--text-xs); color: var(--color-primary); margin-left: var(--space-2);">
              {story.duration}
            </span>
          </div>
        </div>

        <!-- Story Content -->
        <div class="lg:col-span-3">
          <p style="font-size: var(--text-xs); font-weight: 600; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-2);">
            {story.program}
          </p>
          <h3 style="font-size: var(--text-2xl); margin-bottom: var(--space-2);">{story.name}, {story.age}</h3>
          <blockquote style="margin-top: var(--space-4);">
            <p class="font-display" style="font-size: var(--text-lg); font-style: italic; color: var(--color-text-secondary); line-height: 1.7;">
              "{story.quote}"
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  </section>
{/each}

<!-- Testimonials -->
<section id="testimonials" data-animate style="padding-block: var(--section-padding);">
  <div class="container">
    <div style="opacity: {sections['testimonials'] ? '1' : '0'}; transform: translateY({sections['testimonials'] ? '0' : '20px'}); transition: all var(--duration-reveal) var(--ease-out-expo);">
      <SectionHeading label="Yorumlar" title="Danışanlarımız Ne Diyor?" />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each TESTIMONIALS as testimonial}
          <div style="padding: var(--space-6); border: 1px solid var(--color-border); border-radius: var(--radius-lg);">
            <div class="flex gap-1" style="margin-bottom: var(--space-3);">
              {#each Array(testimonial.rating) as _}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-accent)" stroke="none">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              {/each}
            </div>
            <p style="font-size: var(--text-sm); color: var(--color-text-secondary); line-height: 1.7; margin-bottom: var(--space-4);">
              "{testimonial.text}"
            </p>
            <p style="font-weight: 600; font-size: var(--text-sm);">{testimonial.name}</p>
            <p style="font-size: var(--text-xs); color: var(--color-text-tertiary);">{testimonial.program}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section style="background: var(--color-primary); padding-block: var(--section-padding);">
  <div class="container text-center">
    <h2 style="color: var(--color-text-inverse); margin-bottom: var(--space-4);">Sıradaki Başarı Hikayesi Sizin Olsun</h2>
    <p style="color: oklch(85% 0.03 155); font-size: var(--text-lg); max-width: 45ch; margin-inline: auto; margin-bottom: var(--space-8);">
      İlk adımı atın. Ücretsiz ön görüşme ile tanışalım.
    </p>
    <a href="/iletisim" style="display: inline-flex; padding: var(--space-3) var(--space-8); background: var(--color-surface); color: var(--color-primary); font-weight: 600; border-radius: var(--radius-full); text-decoration: none;">
      Hemen Başlayın
    </a>
  </div>
</section>
