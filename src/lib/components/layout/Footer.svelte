<script lang="ts">
  import { SITE_SETTINGS, NAV_LINKS } from '$lib/data/site-config';
</script>

<footer style="background: var(--color-text-primary); color: var(--color-text-inverse); padding-block: var(--section-padding) var(--space-8);">
  <div class="container">
    <!-- Main Footer Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8" style="padding-bottom: var(--space-16);">
      
      <!-- Brand -->
      <div class="lg:col-span-1">
        <a href="/" class="inline-block mb-4" style="text-decoration: none;">
          <span class="font-display" style="font-size: var(--text-2xl); color: var(--color-surface); font-weight: 500; letter-spacing: -0.02em;">
            Filiz<span style="color: var(--color-accent); font-style: italic;"> Diyet</span>
          </span>
        </a>
        <p style="color: oklch(75% 0.005 90); font-size: var(--text-sm); line-height: 1.7; max-width: 28ch;">
          Sağlıklı yaşamın anahtarı, bilimsel ve kişiye özel beslenme danışmanlığı.
        </p>
        <p class="mt-4" style="font-family: var(--font-display); font-style: italic; color: oklch(65% 0.005 90); font-size: var(--text-sm);">
          #buradasınçünkühayallerinbunadeğer
        </p>
      </div>

      <!-- Quick Links -->
      <div>
        <h4 style="font-size: var(--text-sm); font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: oklch(65% 0.005 90); margin-bottom: var(--space-6); font-family: var(--font-body);">
          Sayfalar
        </h4>
        <nav class="flex flex-col" style="gap: var(--space-3);">
          {#each NAV_LINKS as link}
            <a
              href={link.href}
              style="color: oklch(80% 0.005 90); font-size: var(--text-sm); transition: color var(--duration-fast) var(--ease-out-quart); text-decoration: none;"
              onmouseenter={(e) => e.currentTarget.style.color = 'var(--color-accent-light)'}
              onmouseleave={(e) => e.currentTarget.style.color = 'oklch(80% 0.005 90)'}
            >
              {link.label}
            </a>
          {/each}
        </nav>
      </div>

      <!-- Services -->
      <div>
        <h4 style="font-size: var(--text-sm); font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: oklch(65% 0.005 90); margin-bottom: var(--space-6); font-family: var(--font-body);">
          Hizmetler
        </h4>
        <nav class="flex flex-col" style="gap: var(--space-3);">
          {#each ['Kişiye Özel Diyet', 'Online Danışmanlık', 'PCOS Beslenme', 'Duygusal Yeme', 'Sporcu Beslenmesi', 'Kurumsal Eğitim'] as service}
            <a
              href="/hizmetler"
              style="color: oklch(80% 0.005 90); font-size: var(--text-sm); transition: color var(--duration-fast) var(--ease-out-quart); text-decoration: none;"
              onmouseenter={(e) => e.currentTarget.style.color = 'var(--color-accent-light)'}
              onmouseleave={(e) => e.currentTarget.style.color = 'oklch(80% 0.005 90)'}
            >
              {service}
            </a>
          {/each}
        </nav>
      </div>

      <!-- Contact -->
      <div>
        <h4 style="font-size: var(--text-sm); font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: oklch(65% 0.005 90); margin-bottom: var(--space-6); font-family: var(--font-body);">
          İletişim
        </h4>
        <div class="flex flex-col" style="gap: var(--space-4);">
          <div>
            <p style="color: oklch(60% 0.005 90); font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-1);">Adres</p>
            <p style="color: oklch(80% 0.005 90); font-size: var(--text-sm);">{SITE_SETTINGS.address}</p>
          </div>
          <div>
            <p style="color: oklch(60% 0.005 90); font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-1);">E-posta</p>
            <a href="mailto:{SITE_SETTINGS.email}" style="color: oklch(80% 0.005 90); font-size: var(--text-sm); text-decoration: none;">
              {SITE_SETTINGS.email}
            </a>
          </div>
          <div>
            <p style="color: oklch(60% 0.005 90); font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-1);">Telefon</p>
            <a href="tel:{SITE_SETTINGS.phone}" style="color: oklch(80% 0.005 90); font-size: var(--text-sm); text-decoration: none;">
              {SITE_SETTINGS.phone}
            </a>
          </div>
          <div>
            <p style="color: oklch(60% 0.005 90); font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-1);">Çalışma Saatleri</p>
            <p style="color: oklch(80% 0.005 90); font-size: var(--text-sm);">{SITE_SETTINGS.workingHours}</p>
          </div>
          
          <!-- Social -->
          <div class="flex gap-4 mt-2">
            <a
              href={SITE_SETTINGS.socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style="color: oklch(70% 0.005 90); transition: color var(--duration-fast) var(--ease-out-quart);"
              onmouseenter={(e) => e.currentTarget.style.color = 'var(--color-accent-light)'}
              onmouseleave={(e) => e.currentTarget.style.color = 'oklch(70% 0.005 90)'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a
              href={SITE_SETTINGS.socialMedia.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style="color: oklch(70% 0.005 90); transition: color var(--duration-fast) var(--ease-out-quart);"
              onmouseenter={(e) => e.currentTarget.style.color = 'var(--color-accent-light)'}
              onmouseleave={(e) => e.currentTarget.style.color = 'oklch(70% 0.005 90)'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div style="border-top: 1px solid oklch(30% 0.005 90); padding-top: var(--space-6); display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: var(--space-4);">
      <p style="color: oklch(50% 0.005 90); font-size: var(--text-xs);">
        © {new Date().getFullYear()} Filiz Diyet — Diyetisyen Başak Filiz Tanrıkulu. Tüm hakları saklıdır.
      </p>
      <div class="flex gap-6">
        <a href="/gizlilik" style="color: oklch(50% 0.005 90); font-size: var(--text-xs); text-decoration: none;">Gizlilik Politikası</a>
        <a href="/kvkk" style="color: oklch(50% 0.005 90); font-size: var(--text-xs); text-decoration: none;">KVKK</a>
      </div>
    </div>
  </div>
</footer>
