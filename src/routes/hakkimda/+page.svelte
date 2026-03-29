<script lang="ts">
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
      { threshold: 0.15 }
    );
    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });

  const milestones = [
    { year: '2018', title: 'Beslenme ve Diyetetik Lisans Eğitimi', desc: 'Üniversite eğitimini başarıyla tamamladı.' },
    { year: '2019', title: 'Klinik Staj ve Deneyim', desc: 'Hastanelerde klinik beslenme uygulamaları ve staj.' },
    { year: '2020', title: 'Filiz Diyet\'in Kuruluşu', desc: 'Tuzla\'da kendi beslenme danışmanlık ofisini açtı.' },
    { year: '2022', title: 'Online Danışmanlık Hizmeti', desc: 'Türkiye geneline online diyet danışmanlığı başlattı.' },
    { year: '2023', title: 'Biruni Üniversitesi Sunumu', desc: 'Kolajen ve Anti-Aging üzerine akademik sunum.' },
    { year: '2024', title: 'Lösev İş Birliği', desc: 'Lösev ile sosyal sorumluluk projelerinde aktif rol.' },
  ];

  const expertiseAreas = [
    'Kilo Yönetimi',
    'PCOS Beslenmesi',
    'Duygusal Yeme',
    'Sporcu Beslenmesi',
    'Besin Güvenliği',
    'Anti-Aging Beslenme',
    'Bağırsak Sağlığı',
    'Çocuk Beslenmesi'
  ];
</script>

<svelte:head>
  <title>Hakkımda — Diyetisyen Başak Filiz Tanrıkulu | Filiz Diyet</title>
</svelte:head>

<!-- Hero -->
<section class="section" style="padding-top: var(--space-16);">
  <div class="container">
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
      <!-- Image -->
      <div class="lg:col-span-2">
        <div
          style="
            width: 100%;
            aspect-ratio: 3/4;
            background: linear-gradient(160deg, var(--color-primary-lighter), var(--color-accent-light));
            border-radius: var(--radius-lg);
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: end;
            justify-content: center;
            padding-bottom: var(--space-8);
            font-family: var(--font-display);
            font-style: italic;
            color: var(--color-primary);
            font-size: var(--text-xl);
          "
        >
          Dyt. Başak Filiz Tanrıkulu
        </div>
      </div>

      <!-- Bio -->
      <div class="lg:col-span-3">
        <p style="font-size: var(--text-xs); font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--color-primary); margin-bottom: var(--space-3);">
          Hakkımda
        </p>
        <h1 style="margin-bottom: var(--space-6);">
          Diyetisyen<br><span style="font-style: italic;">Başak Filiz</span> Tanrıkulu
        </h1>
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          <p style="font-size: var(--text-base); color: var(--color-text-secondary); line-height: 1.8;">
            Beslenme ve Diyetetik alanında lisans eğitimimi tamamladıktan sonra, klinik beslenme ve toplum beslenmesi alanlarında kapsamlı deneyim kazandım. Tuzla'da kendi danışmanlık ofisimi açarak, binlerce danışanın sağlıklı yaşam hedeflerine ulaşmasına yardımcı oldum.
          </p>
          <p style="font-size: var(--text-base); color: var(--color-text-secondary); line-height: 1.8;">
            Beslenme konusundaki yaklaşımım, yasaklara değil dengeye dayanır. Sürdürülebilir beslenme alışkanlıkları geliştirmenize, yemekle sağlıklı bir ilişki kurmanıza ve hedeflerinize uzun vadeli ulaşmanıza odaklanıyorum.
          </p>
          <p style="font-size: var(--text-base); color: var(--color-text-secondary); line-height: 1.8;">
            Biruni Üniversitesi'nde kolajen ve anti-aging beslenme üzerine sunumlar yapmak, Lösev ile sosyal sorumluluk projelerinde yer almak ve kurumsal beslenme eğitimleri vermek, mesleğime olan tutkumun yansımalarıdır.
          </p>
        </div>

        <blockquote style="border-left: 3px solid var(--color-accent); padding-left: var(--space-6); margin-top: var(--space-8);">
          <p class="font-display" style="font-size: var(--text-xl); font-style: italic; color: var(--color-text-primary); line-height: 1.5;">
            "Her birey benzersizdir ve beslenme planı da öyle olmalı."
          </p>
        </blockquote>
      </div>
    </div>
  </div>
</section>

<!-- Expertise -->
<section id="expertise" data-animate style="background: var(--color-surface-alt); padding-block: var(--section-padding);">
  <div class="container">
    <div
      style="opacity: {sections['expertise'] ? '1' : '0'}; transform: translateY({sections['expertise'] ? '0' : '20px'}); transition: all var(--duration-reveal) var(--ease-out-expo);"
    >
      <SectionHeading label="Uzmanlık Alanları" title="Nerede Yardımcı Olabilirim?" />
      <div class="flex flex-wrap gap-3">
        {#each expertiseAreas as area}
          <span
            style="
              padding: var(--space-2) var(--space-6);
              border: 1px solid var(--color-border-strong);
              border-radius: var(--radius-full);
              font-size: var(--text-sm);
              color: var(--color-text-secondary);
              transition: all var(--duration-fast) var(--ease-out-quart);
            "
            on:mouseenter={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary)'; e.currentTarget.style.background = 'var(--color-primary-lighter)'; }}
            on:mouseleave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-strong)'; e.currentTarget.style.color = 'var(--color-text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
            role="button"
            tabindex="0"
          >
            {area}
          </span>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- Timeline -->
<section id="timeline" data-animate class="section">
  <div class="container">
    <div
      style="opacity: {sections['timeline'] ? '1' : '0'}; transform: translateY({sections['timeline'] ? '0' : '20px'}); transition: all var(--duration-reveal) var(--ease-out-expo);"
    >
      <SectionHeading label="Kariyer Yolculuğu" title="Adım Adım" />
      <div class="relative" style="padding-left: var(--space-8); border-left: 2px solid var(--color-border);">
        {#each milestones as milestone, i}
          <div style="margin-bottom: var(--space-8); position: relative;">
            <div
              style="
                position: absolute;
                left: calc(-1 * var(--space-8) - 5px);
                top: 4px;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: var(--color-surface);
                border: 2px solid var(--color-primary);
              "
            ></div>
            <p style="font-size: var(--text-xs); font-weight: 600; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-1);">
              {milestone.year}
            </p>
            <h4 style="font-size: var(--text-lg); margin-bottom: var(--space-1);">{milestone.title}</h4>
            <p style="font-size: var(--text-sm); color: var(--color-text-tertiary);">{milestone.desc}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- Social Responsibility -->
<section id="social" data-animate style="background: var(--color-surface-alt); padding-block: var(--section-padding);">
  <div class="container">
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-8"
      style="opacity: {sections['social'] ? '1' : '0'}; transform: translateY({sections['social'] ? '0' : '20px'}); transition: all var(--duration-reveal) var(--ease-out-expo);"
    >
      <div style="padding: var(--space-8); border: 1px solid var(--color-border); border-radius: var(--radius-lg); background: var(--color-surface);">
        <p style="font-size: var(--text-xs); font-weight: 600; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-3);">Sosyal Sorumluluk</p>
        <h3 style="font-size: var(--text-xl); margin-bottom: var(--space-3);">Lösev İş Birliği</h3>
        <p style="font-size: var(--text-sm); color: var(--color-text-secondary); line-height: 1.7;">
          Lösemili Çocuklar Vakfı (Lösev) ile düzenlenen etkinliklerde gönüllü olarak yer alıyorum. Sağlıklı beslenme bilincini toplumun her kesimine yaymak en büyük motivasyonum.
        </p>
      </div>
      <div style="padding: var(--space-8); border: 1px solid var(--color-border); border-radius: var(--radius-lg); background: var(--color-surface);">
        <p style="font-size: var(--text-xs); font-weight: 600; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-3);">Akademik</p>
        <h3 style="font-size: var(--text-xl); margin-bottom: var(--space-3);">Üniversite Sunumları</h3>
        <p style="font-size: var(--text-sm); color: var(--color-text-secondary); line-height: 1.7;">
          Biruni Üniversitesi'nde "Kolajen ve Anti-Aging" konulu sunumlar yaparak, beslenme bilimindeki güncel gelişmeleri akademik ortamda paylaşıyorum.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section style="padding-block: var(--section-padding);">
  <div class="container text-center">
    <h2 style="margin-bottom: var(--space-4);">Birlikte Çalışalım</h2>
    <p style="font-size: var(--text-lg); color: var(--color-text-tertiary); max-width: 45ch; margin-inline: auto; margin-bottom: var(--space-8);">
      Sağlığınıza yatırım yapmak için doğru zaman şimdi. Ücretsiz ön görüşme için iletişime geçin.
    </p>
    <Button href="/iletisim" size="lg">Randevu Al</Button>
  </div>
</section>