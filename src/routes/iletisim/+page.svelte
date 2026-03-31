<script lang="ts">
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { SITE_SETTINGS } from '$lib/data/site-config';
  import { SERVICES } from '$lib/data/services';
  import { generateTimeSlots, isValidPhone, isValidEmail } from '$lib/utils/calculations';
  import { isSubmitting, submissionSuccess } from '$lib/stores';
  import { createAppointment } from '$lib/services/appointment-service';

  let formData = $state({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    serviceType: '',
    message: ''
  });

  let errors: Record<string, string> = $state({});
  let submissionError = $state('');
  const timeSlots = generateTimeSlots();

  function validateForm(): boolean {
    errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Ad soyad gereklidir.';
    if (!formData.email.trim() || !isValidEmail(formData.email)) errors.email = 'Geçerli bir e-posta adresi girin.';
    if (!formData.phone.trim() || !isValidPhone(formData.phone)) errors.phone = 'Geçerli bir telefon numarası girin.';
    if (!formData.date) errors.date = 'Tarih seçiniz.';
    if (!formData.time) errors.time = 'Saat seçiniz.';
    if (!formData.serviceType) errors.serviceType = 'Hizmet seçiniz.';
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit() {
    if (!validateForm()) return;
    isSubmitting.set(true);
    submissionError = '';

    try {
      await createAppointment({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        preferredDate: formData.date,
        preferredTime: formData.time,
        serviceType: formData.serviceType,
        message: formData.message
      });

      submissionSuccess.set(true);
      formData = { fullName: '', email: '', phone: '', date: '', time: '', serviceType: '', message: '' };
    } catch (error) {
      submissionError = error instanceof Error ? error.message : 'Randevu oluşturulamadı. Lütfen tekrar deneyin.';
    } finally {
      isSubmitting.set(false);
    }
  }

  // Get tomorrow's date for min attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const inputStyle = `
    width: 100%;
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: var(--color-text-primary);
    background: var(--color-surface);
    transition: border-color var(--duration-fast) var(--ease-out-quart);
    outline: none;
  `;
  const errorInputStyle = inputStyle.replace('var(--color-border)', 'var(--color-error)');
  const labelStyle = `display: block; font-size: var(--text-sm); font-weight: 500; color: var(--color-text-secondary); margin-bottom: var(--space-2);`;
</script>

<svelte:head>
  <title>İletişim & Randevu — Filiz Diyet</title>
  <meta name="description" content="Filiz Diyet ile iletişime geçin ve randevu alın. Ücretsiz ön görüşme için formu doldurun. Tuzla, İstanbul." />
  <meta name="keywords" content="iletişim, randevu, beslenme danışmanlığı, ücretsiz danışma, Tuzla İstanbul" />
  <meta property="og:title" content="İletişim & Randevu — Filiz Diyet" />
  <meta property="og:description" content="Filiz Diyet ile iletişime geçin ve ücretsiz ön görüşme için randevu alın." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="/iletisim" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<section class="section" style="padding-top: var(--space-16);">
  <div class="container">
    <SectionHeading
      label="İletişim"
      title="Randevu Al"
      description="Sağlıklı yaşama ilk adımınızı atın. Formu doldurun, size en kısa sürede dönüş yapalım."
    />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <!-- Form -->
      <div class="lg:col-span-2">
        {#if $submissionSuccess}
          <div style="padding: var(--space-12); text-align: center; border: 1px solid var(--color-success); border-radius: var(--radius-lg); background: oklch(95% 0.04 145);">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mx-auto" style="margin-bottom: var(--space-4);">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <h3 style="font-size: var(--text-2xl); margin-bottom: var(--space-3);">Randevu Talebiniz Alındı!</h3>
            <p style="color: var(--color-text-secondary); max-width: 40ch; margin-inline: auto;">
              En kısa sürede sizinle iletişime geçeceğiz. Sağlıklı günler dileriz.
            </p>
            <button onclick={() => submissionSuccess.set(false)} style="margin-top: var(--space-6); padding: var(--space-2) var(--space-6); background: var(--color-primary); color: white; border: none; border-radius: var(--radius-full); cursor: pointer; font-weight: 600;">
              Yeni Randevu Al
            </button>
          </div>
        {:else}
          {#if submissionError}
            <div style="padding: var(--space-4); margin-bottom: var(--space-4); background: oklch(95% 0.08 25); border: 1px solid var(--color-error); border-radius: var(--radius-md); color: var(--color-error); font-size: var(--text-sm);">
              {submissionError}
            </div>
          {/if}
          <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} style="display: flex; flex-direction: column; gap: var(--space-4);">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="fullName" style={labelStyle}>Ad Soyad *</label>
                <input id="fullName" type="text" value={formData.fullName} onchange={(e) => formData.fullName = e.currentTarget.value} placeholder="Adınız Soyadınız" style={errors.fullName ? errorInputStyle : inputStyle} onfocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'} onblur={(e) => e.currentTarget.style.borderColor = errors.fullName ? 'var(--color-error)' : 'var(--color-border)'} />
                {#if errors.fullName}<p style="font-size: var(--text-xs); color: var(--color-error); margin-top: var(--space-1);">{errors.fullName}</p>{/if}
              </div>
              <div>
                <label for="email" style={labelStyle}>E-posta *</label>
                <input id="email" type="email" value={formData.email} onchange={(e) => formData.email = e.currentTarget.value} placeholder="ornek@email.com" style={errors.email ? errorInputStyle : inputStyle} onfocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'} onblur={(e) => e.currentTarget.style.borderColor = errors.email ? 'var(--color-error)' : 'var(--color-border)'} />
                {#if errors.email}<p style="font-size: var(--text-xs); color: var(--color-error); margin-top: var(--space-1);">{errors.email}</p>{/if}
              </div>
            </div>

            <div>
              <label for="phone" style={labelStyle}>Telefon *</label>
              <input id="phone" type="tel" value={formData.phone} onchange={(e) => formData.phone = e.currentTarget.value} placeholder="05XX XXX XX XX" style={errors.phone ? errorInputStyle : inputStyle} onfocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'} onblur={(e) => e.currentTarget.style.borderColor = errors.phone ? 'var(--color-error)' : 'var(--color-border)'} />
              {#if errors.phone}<p style="font-size: var(--text-xs); color: var(--color-error); margin-top: var(--space-1);">{errors.phone}</p>{/if}
            </div>

            <div>
              <label for="service" style={labelStyle}>Hizmet Türü *</label>
              <select id="service" value={formData.serviceType} onchange={(e) => formData.serviceType = e.currentTarget.value} style="{errors.serviceType ? errorInputStyle : inputStyle} cursor: pointer;">
                <option value="">Seçiniz</option>
                {#each SERVICES as service}
                  <option value={service.id}>{service.title}</option>
                {/each}
              </select>
              {#if errors.serviceType}<p style="font-size: var(--text-xs); color: var(--color-error); margin-top: var(--space-1);">{errors.serviceType}</p>{/if}
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="date" style={labelStyle}>Tercih Edilen Tarih *</label>
                <input id="date" type="date" value={formData.date} onchange={(e) => formData.date = e.currentTarget.value} min={minDate} style={errors.date ? errorInputStyle : inputStyle} onfocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'} onblur={(e) => e.currentTarget.style.borderColor = errors.date ? 'var(--color-error)' : 'var(--color-border)'} />
                {#if errors.date}<p style="font-size: var(--text-xs); color: var(--color-error); margin-top: var(--space-1);">{errors.date}</p>{/if}
              </div>
              <div>
                <label for="time" style={labelStyle}>Tercih Edilen Saat *</label>
                <select id="time" value={formData.time} onchange={(e) => formData.time = e.currentTarget.value} style="{errors.time ? errorInputStyle : inputStyle} cursor: pointer;">
                  <option value="">Seçiniz</option>
                  {#each timeSlots as slot}
                    <option value={slot}>{slot}</option>
                  {/each}
                </select>
                {#if errors.time}<p style="font-size: var(--text-xs); color: var(--color-error); margin-top: var(--space-1);">{errors.time}</p>{/if}
              </div>
            </div>

            <div>
              <label for="message" style={labelStyle}>Mesajınız (İsteğe Bağlı)</label>
              <textarea id="message" value={formData.message} onchange={(e) => formData.message = e.currentTarget.value} rows="4" placeholder="Eklemek istediğiniz notlar..." style="{inputStyle} resize: vertical;" onfocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'} onblur={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}></textarea>
            </div>

            <button
              type="submit"
              disabled={$isSubmitting}
              style="
                padding: var(--space-3) var(--space-8);
                background: var(--color-primary);
                color: #fff;
                font-weight: 600;
                border: none;
                border-radius: var(--radius-full);
                cursor: {$isSubmitting ? 'wait' : 'pointer'};
                font-size: var(--text-base);
                opacity: {$isSubmitting ? '0.7' : '1'};
                transition: all var(--duration-fast) var(--ease-out-quart);
                align-self: flex-start;
              "
            >
              {$isSubmitting ? 'Gönderiliyor...' : 'Randevu Talebi Gönder'}
            </button>
          </form>
        {/if}
      </div>

      <!-- Contact Sidebar -->
      <div>
        <div style="padding: var(--space-8); background: var(--color-surface-alt); border-radius: var(--radius-lg); position: sticky; top: 6rem;">
          <h4 style="font-size: var(--text-lg); margin-bottom: var(--space-6);">İletişim Bilgileri</h4>

          <div style="display: flex; flex-direction: column; gap: var(--space-6);">
            <div>
              <p style="font-size: var(--text-xs); font-weight: 600; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-1);">Adres</p>
              <p style="font-size: var(--text-sm); color: var(--color-text-secondary);">{SITE_SETTINGS.address}</p>
            </div>
            <div>
              <p style="font-size: var(--text-xs); font-weight: 600; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-1);">Telefon</p>
              <a href="tel:{SITE_SETTINGS.phone}" style="font-size: var(--text-sm); color: var(--color-text-secondary); text-decoration: none;">{SITE_SETTINGS.phone}</a>
            </div>
            <div>
              <p style="font-size: var(--text-xs); font-weight: 600; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-1);">E-posta</p>
              <a href="mailto:{SITE_SETTINGS.email}" style="font-size: var(--text-sm); color: var(--color-text-secondary); text-decoration: none;">{SITE_SETTINGS.email}</a>
            </div>
            <div>
              <p style="font-size: var(--text-xs); font-weight: 600; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-1);">Çalışma Saatleri</p>
              <p style="font-size: var(--text-sm); color: var(--color-text-secondary);">{SITE_SETTINGS.workingHours}</p>
            </div>
            <div>
              <p style="font-size: var(--text-xs); font-weight: 600; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-1);">Sosyal Medya</p>
              <div class="flex gap-3" style="margin-top: var(--space-2);">
                <a href={SITE_SETTINGS.socialMedia.instagram} target="_blank" rel="noopener" style="font-size: var(--text-sm); color: var(--color-primary); text-decoration: none;">Instagram</a>
                <a href={SITE_SETTINGS.socialMedia.linkedin} target="_blank" rel="noopener" style="font-size: var(--text-sm); color: var(--color-primary); text-decoration: none;">LinkedIn</a>
              </div>
            </div>
          </div>

          <!-- Map placeholder -->
          <div style="margin-top: var(--space-6); aspect-ratio: 4/3; background: var(--color-border); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
            <p style="font-size: var(--text-sm); color: var(--color-text-tertiary);">Tuzla, İstanbul</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
