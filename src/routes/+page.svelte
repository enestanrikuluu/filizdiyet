<script lang="ts">
  import { onMount } from 'svelte';
  import { SERVICES } from '$lib/data/services';
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import type { PageData } from './$types';

  let { data } = $props<{ data: PageData }>();

  let heroVisible = $state(false);
  let sections: Record<string, boolean> = $state({});

  onMount(() => {
    heroVisible = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sections[entry.target.id] = true;
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  });

  const featuredServices = SERVICES.slice(0, 3);
  const featuredRecipes = data.recipes;
</script>

<svelte:head>
  <title>Ana Sayfa — Filiz Diyet</title>
  <meta name="description" content="Diyetisyen Başak Filiz Tanrıkulu'nun kişiye özel beslenme danışmanlığı hizmetleri. Sağlıklı yaşam için bilimsel temelli diyet programları. Tuzla, İstanbul." />
  <meta name="keywords" content="diyetisyen, beslenme danışmanlığı, diyet programı, kilo yönetimi, sağlıklı beslenme, Tuzla, İstanbul" />
  <meta property="og:title" content="Ana Sayfa — Filiz Diyet" />
  <meta property="og:description" content="Diyetisyen Başak Filiz Tanrıkulu'nun kişiye özel beslenme danışmanlığı hizmetleri. Sağlıklı yaşam için bilimsel temelli diyet programları." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="/" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<!-- HERO -->
<section class="relative overflow-hidden" style="min-height: calc(100vh - 4.5rem); display: flex; align-items: center; padding-block: var(--space-16);">
  <!-- Decorative bg element -->
  <div class="absolute -right-20 top-1/2 -translate-y-1/2 hidden lg:block" style="width: 45vw; height: 45vw; max-width: 650px; max-height: 650px; background: var(--color-primary-lighter); border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%; opacity: 0.5;"></div>
  <div class="absolute right-20 top-1/3 hidden lg:block" style="width: 12vw; height: 12vw; max-width: 180px; max-height: 180px; background: var(--color-accent-light); border-radius: 50% 50% 40% 60% / 60% 40% 50% 50%; opacity: 0.35;"></div>

  <div class="container relative z-10">
    <div class="max-w-2xl">
      {#if heroVisible}
        <p
          class="animate-fade-in-up"
          style="font-size: var(--text-sm); font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--color-primary); margin-bottom: var(--space-4);"
        >
          Diyetisyen Başak Filiz Tanrıkulu
        </p>
        <h1
          class="animate-fade-in-up stagger-1"
          style="margin-bottom: var(--space-6);"
        >
          Sağlıklı Yaşamın <span style="font-style: italic; color: var(--color-primary);">Anahtarı</span>
        </h1>
        <p
          class="animate-fade-in-up stagger-2"
          style="font-size: var(--text-lg); color: var(--color-text-secondary); margin-bottom: var(--space-8); max-width: 48ch; line-height: 1.7;"
        >
          Bilimsel temelli, kişiye özel beslenme programlarıyla sağlıklı ve sürdürülebilir bir yaşam tarzına adım atın. Çünkü siz buna değersiniz.
        </p>
        <div class="flex flex-wrap gap-4 animate-fade-in-up stagger-3">
          <Button href="/iletisim" size="lg">Randevu Al</Button>
          <Button href="/hizmetler" variant="outline" size="lg">Hizmetleri Keşfet</Button>
        </div>
      {/if}
    </div>
  </div>
</section>

<!-- STATS -->
<section
  id="stats"
  data-animate
  style="border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); padding-block: var(--space-8);"
>
  <div class="container">
    <div
      class="grid grid-cols-2 md:grid-cols-4 gap-8"
      style="opacity: {sections['stats'] ? '1' : '0'}; transform: translateY({sections['stats'] ? '0' : '15px'}); transition: all var(--duration-reveal) var(--ease-out-expo);"
    >
      {#each [
        { number: '1400+', label: 'Mutlu Danışan' },
        { number: '6+', label: 'Yıl Deneyim' },
        { number: '140+', label: 'İçerik Paylaşımı' },
        { number: '5.0', label: 'Ortalama Puan' }
      ] as stat, i}
        <div class="text-center" style="transition-delay: {i * 100}ms;">
          <p class="font-display" style="font-size: var(--text-3xl); color: var(--color-text-primary); font-weight: 400; letter-spacing: -0.02em;">
            {stat.number}
          </p>
          <p style="font-size: var(--text-sm); color: var(--color-text-tertiary); margin-top: var(--space-1);">
            {stat.label}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- SERVICES -->
<section id="services" data-animate class="section">
  <div class="container">
    <div
      style="opacity: {sections['services'] ? '1' : '0'}; transform: translateY({sections['services'] ? '0' : '20px'}); transition: all var(--duration-reveal) var(--ease-out-expo);"
    >
      <SectionHeading
        label="Hizmetler"
        title="Size Özel Çözümler"
        description="Her bireyin ihtiyacı farklıdır. İhtiyacınıza en uygun beslenme programını birlikte belirleyelim."
      />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style="background: var(--color-border); border: 1px solid var(--color-border); border-radius: var(--radius-lg); overflow: hidden;">
        {#each featuredServices as service, i}
          <div
            style="background: var(--color-surface); padding: var(--space-8); transition: background var(--duration-fast) var(--ease-out-quart);"
            onmouseenter={(e) => e.currentTarget.style.background = 'var(--color-surface-elevated)'}
            onmouseleave={(e) => e.currentTarget.style.background = 'var(--color-surface)'}
            role="button"
            tabindex="0"
          >
            <p style="font-size: var(--text-xs); font-weight: 600; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-3);">
              0{i + 1}
            </p>
            <h3 style="font-size: var(--text-xl); margin-bottom: var(--space-3);">{service.title}</h3>
            <p style="font-size: var(--text-sm); color: var(--color-text-tertiary); line-height: 1.7;">
              {service.description}
            </p>
          </div>
        {/each}
      </div>

      <div class="mt-8" style="text-align: right;">
        <a
          href="/hizmetler"
          style="font-size: var(--text-sm); font-weight: 500; color: var(--color-primary); text-decoration: none; display: inline-flex; align-items: center; gap: var(--space-2); transition: gap var(--duration-fast) var(--ease-out-quart);"
          onmouseenter={(e) => e.currentTarget.style.gap = 'var(--space-3)'}
          onmouseleave={(e) => e.currentTarget.style.gap = 'var(--space-2)'}
        >
          Tüm hizmetleri gör
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  </div>
</section>

<!-- ABOUT PREVIEW -->
<section id="about" data-animate style="background: var(--color-surface-alt); padding-block: var(--section-padding);">
  <div class="container">
    <div
      class="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center"
      style="opacity: {sections['about'] ? '1' : '0'}; transform: translateY({sections['about'] ? '0' : '20px'}); transition: all var(--duration-reveal) var(--ease-out-expo);"
    >
      <!-- Image placeholder -->
      <div class="lg:col-span-2 flex justify-center">
        <div
          style="
            width: 100%;
            max-width: 360px;
            aspect-ratio: 3/4;
            background: linear-gradient(135deg, var(--color-primary-lighter), var(--color-accent-light));
            border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--color-primary);
            font-family: var(--font-display);
            font-size: var(--text-lg);
            font-style: italic;
          "
        >
          Dyt. Başak Filiz
        </div>
      </div>

      <!-- Text -->
      <div class="lg:col-span-3">
        <p style="font-size: var(--text-xs); font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--color-primary); margin-bottom: var(--space-3);">
          Hakkımda
        </p>
        <h2 style="margin-bottom: var(--space-6);">Diyetisyen Başak Filiz Tanrıkulu</h2>
        <p style="font-size: var(--text-base); color: var(--color-text-secondary); line-height: 1.8; margin-bottom: var(--space-6);">
          Beslenme ve Diyetetik alanında lisans eğitimimi tamamladıktan sonra, klinik beslenme ve toplum beslenmesi alanlarında deneyim kazandım. Biruni Üniversitesi'nde kolajen ve anti-aging beslenme üzerine sunumlar yaptım, Lösev gibi sosyal sorumluluk projelerinde yer aldım.
        </p>
        <p style="font-size: var(--text-base); color: var(--color-text-secondary); line-height: 1.8; margin-bottom: var(--space-8);">
          Her danışanımın benzersiz olduğuna inanıyorum. Bu yüzden tek tip diyet programları yerine, yaşam tarzınıza, sağlık durumunuza ve hedeflerinize göre tamamen kişiselleştirilmiş beslenme planları hazırlıyorum.
        </p>

        <blockquote style="border-left: 3px solid var(--color-accent); padding-left: var(--space-6); margin-bottom: var(--space-8);">
          <p class="font-display" style="font-size: var(--text-xl); font-style: italic; color: var(--color-text-primary); line-height: 1.5;">
            "Buradasınız çünkü hayalleriniz buna değer."
          </p>
        </blockquote>

        <Button href="/hakkimda" variant="outline">Daha Fazla Bilgi</Button>
      </div>
    </div>
  </div>
</section>

<!-- RECIPES -->
<section id="recipes" data-animate class="section">
  <div class="container">
    <div
      style="opacity: {sections['recipes'] ? '1' : '0'}; transform: translateY({sections['recipes'] ? '0' : '20px'}); transition: all var(--duration-reveal) var(--ease-out-expo);"
    >
      <SectionHeading
        label="Tarifler"
        title="Sağlıklı & Lezzetli"
        description="Diyet yapmak lezzetten vazgeçmek değildir. İşte size bunu kanıtlayacak tarifler."
      />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each featuredRecipes as recipe, i}
          <a
            href="/blog/{recipe.slug}"
            class="group block"
            style="text-decoration: none; {i === 0 && 'md:col-span-2 lg:col-span-1'}"
          >
            <div
              style="
                aspect-ratio: {i === 0 ? '4/3' : '3/2'};
                background: linear-gradient(135deg, var(--color-primary-lighter) 0%, var(--color-accent-light) 100%);
                border-radius: var(--radius-lg);
                margin-bottom: var(--space-4);
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: var(--font-display);
                font-style: italic;
                color: var(--color-primary);
                font-size: var(--text-lg);
                transition: transform var(--duration-normal) var(--ease-out-expo);
              "
              onmouseenter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onmouseleave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              role="button"
              tabindex="0"
            >
              {recipe.title}
            </div>
            <div class="flex items-center gap-3" style="margin-bottom: var(--space-2);">
              {#each recipe.tags.slice(0, 2) as tag}
                <span style="font-size: var(--text-xs); font-weight: 500; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.05em;">
                  {tag.replace('-', ' ')}
                </span>
              {/each}
              <span style="font-size: var(--text-xs); color: var(--color-text-tertiary);">
                {recipe.calories} kcal
              </span>
            </div>
            <h3 style="font-size: var(--text-lg); margin-bottom: var(--space-2);">{recipe.title}</h3>
            <p style="font-size: var(--text-sm); color: var(--color-text-tertiary); line-height: 1.6;">
              {recipe.description}
            </p>
          </a>
        {/each}
      </div>

      <div class="mt-8" style="text-align: right;">
        <a
          href="/blog"
          style="font-size: var(--text-sm); font-weight: 500; color: var(--color-primary); text-decoration: none; display: inline-flex; align-items: center; gap: var(--space-2);"
        >
          Tüm tarifleri gör →
        </a>
      </div>
    </div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section id="testimonials" data-animate style="background: var(--color-surface-alt); padding-block: var(--section-padding); overflow: hidden;">
  <div class="container">
    <SectionHeading
      label="Danışan Yorumları"
      title="Onlar Ne Diyor?"
    />
  </div>
  <div
    class="flex gap-6 px-6 overflow-x-auto pb-4"
    style="
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      opacity: {sections['testimonials'] ? '1' : '0'};
      transition: opacity var(--duration-reveal) var(--ease-out-expo);
    "
  >
    <div style="min-width: var(--space-6); flex-shrink: 0;"></div>
    {#each data.testimonials as testimonial}
      <div
        style="
          min-width: 320px;
          max-width: 400px;
          flex-shrink: 0;
          scroll-snap-align: start;
          padding: var(--space-8);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
        "
      >
        <p class="font-display" style="font-size: var(--text-3xl); color: var(--color-primary-lighter); line-height: 1; margin-bottom: var(--space-2);">
          "
        </p>
        <p style="font-size: var(--text-sm); color: var(--color-text-secondary); line-height: 1.7; margin-bottom: var(--space-6);">
          {testimonial.text}
        </p>
        <div>
          <p style="font-weight: 600; font-size: var(--text-sm); color: var(--color-text-primary);">{testimonial.name}</p>
          <p style="font-size: var(--text-xs); color: var(--color-text-tertiary);">{testimonial.program}</p>
        </div>
      </div>
    {/each}
    <div style="min-width: var(--space-6); flex-shrink: 0;"></div>
  </div>
</section>

<!-- CTA -->
<section style="background: var(--color-primary); padding-block: var(--section-padding);">
  <div class="container text-center">
    <h2 style="color: var(--color-text-inverse); margin-bottom: var(--space-4);">
      Sağlıklı Yaşama <span style="font-style: italic;">İlk Adımı</span> Atın
    </h2>
    <p style="color: oklch(85% 0.03 155); font-size: var(--text-lg); max-width: 45ch; margin-inline: auto; margin-bottom: var(--space-8);">
      Ücretsiz ön görüşme ile tanışalım ve size en uygun beslenme programını birlikte belirleyelim.
    </p>
    <a
      href="/iletisim"
      style="
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: var(--space-3) var(--space-8);
        background: var(--color-surface);
        color: var(--color-primary);
        font-weight: 600;
        font-size: var(--text-base);
        border-radius: var(--radius-full);
        text-decoration: none;
        transition: all var(--duration-fast) var(--ease-out-quart);
      "
      onmouseenter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
      onmouseleave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      Hemen Randevu Al
    </a>
  </div>
</section>