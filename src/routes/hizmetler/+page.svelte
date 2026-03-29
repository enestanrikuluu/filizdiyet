<script lang="ts">
  import { SERVICES } from '$lib/data/services';
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { onMount } from 'svelte';

  let sections: Record<string, boolean> = {};

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sections[entry.target.id] = true;
            sections = sections;
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
</script>

<svelte:head>
  <title>Hizmetler — Filiz Diyet | Beslenme Danışmanlığı</title>
</svelte:head>

<section class="section" style="padding-top: var(--space-16);">
  <div class="container">
    <SectionHeading
      label="Hizmetler"
      title="Beslenme Danışmanlığı Hizmetlerimiz"
      description="Her bireyin ihtiyacı farklıdır. Size en uygun programı birlikte belirleyelim."
    />
  </div>
</section>

<!-- Services List -->
{#each SERVICES as service, i}
  <section
    id="service-{i}"
    data-animate
    style="
      padding-block: var(--space-12);
      {i % 2 === 1 ? 'background: var(--color-surface-alt);' : ''}
    "
  >
    <div class="container">
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
        style="
          opacity: {sections[`service-${i}`] ? '1' : '0'};
          transform: translateY({sections[`service-${i}`] ? '0' : '20px'});
          transition: all var(--duration-reveal) var(--ease-out-expo);
          {i % 2 === 1 ? 'direction: rtl;' : ''}
        "
      >
        <!-- Visual -->
        <div style="{i % 2 === 1 ? 'direction: ltr;' : ''}">
          <div
            style="
              aspect-ratio: 4/3;
              background: linear-gradient({135 + i * 30}deg, var(--color-primary-lighter), var(--color-accent-light));
              border-radius: var(--radius-lg);
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              overflow: hidden;
            "
          >
            <span class="font-display" style="font-size: var(--text-5xl); color: var(--color-primary); opacity: 0.15; font-weight: 400;">
              0{i + 1}
            </span>
          </div>
        </div>

        <!-- Content -->
        <div style="{i % 2 === 1 ? 'direction: ltr;' : ''}">
          <p style="font-size: var(--text-xs); font-weight: 600; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-2);">
            0{i + 1} — Hizmet
          </p>
          <h2 style="font-size: var(--text-3xl); margin-bottom: var(--space-4);">
            {service.title}
          </h2>
          <p style="font-size: var(--text-base); color: var(--color-text-secondary); line-height: 1.8; margin-bottom: var(--space-6);">
            {service.description}
          </p>

          <div style="display: flex; flex-direction: column; gap: var(--space-3); margin-bottom: var(--space-8);">
            {#each service.features as feature}
              <div class="flex items-start gap-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0" style="margin-top: 2px;">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span style="font-size: var(--text-sm); color: var(--color-text-secondary);">{feature}</span>
              </div>
            {/each}
          </div>

          <Button href="/iletisim">Bu Hizmet İçin Randevu Al</Button>
        </div>
      </div>
    </div>
  </section>
{/each}

<!-- CTA -->
<section style="background: var(--color-primary); padding-block: var(--section-padding);">
  <div class="container text-center">
    <h2 style="color: var(--color-text-inverse); margin-bottom: var(--space-4);">
      Hangi Program Size Uygun?
    </h2>
    <p style="color: oklch(85% 0.03 155); font-size: var(--text-lg); max-width: 45ch; margin-inline: auto; margin-bottom: var(--space-8);">
      Ücretsiz ön görüşme ile ihtiyaçlarınızı belirleyelim ve size en uygun programı birlikte seçelim.
    </p>
    <a
      href="/iletisim"
      style="display: inline-flex; padding: var(--space-3) var(--space-8); background: var(--color-surface); color: var(--color-primary); font-weight: 600; border-radius: var(--radius-full); text-decoration: none; transition: all var(--duration-fast) var(--ease-out-quart);"
    >
      Ücretsiz Görüşme Talep Et
    </a>
  </div>
</section>
