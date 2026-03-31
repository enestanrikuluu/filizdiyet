<script lang="ts">
  import { isAdminAuthenticated } from '$lib/stores';
  import type { Appointment } from '$lib/types';

  let loginPassword = $state('');
  let loginError = $state('');

  // Demo admin password
  function handleLogin() {
    if (loginPassword === 'filizdiyet2024') {
      isAdminAuthenticated.set(true);
      loginError = '';
    } else {
      loginError = 'Yanlış şifre. Tekrar deneyin.';
    }
  }

  function handleLogout() {
    isAdminAuthenticated.set(false);
    loginPassword = '';
  }

  // Demo appointments data
  const demoAppointments: Appointment[] = [
    { id: '1', fullName: 'Ayşe Yılmaz', email: 'ayse@email.com', phone: '0532 111 2233', date: '2026-04-02', time: '10:00', serviceType: 'Kişiye Özel Diyet', message: 'İlk görüşme', status: 'confirmed', createdAt: '2026-03-28' },
    { id: '2', fullName: 'Mehmet Kaya', email: 'mehmet@email.com', phone: '0544 222 3344', date: '2026-04-03', time: '14:00', serviceType: 'Online Diyet', message: '', status: 'pending', createdAt: '2026-03-29' },
    { id: '3', fullName: 'Zeynep Aksoy', email: 'zeynep@email.com', phone: '0555 333 4455', date: '2026-04-04', time: '11:30', serviceType: 'PCOS Beslenme', message: 'Hormon testi sonuçlarım var', status: 'pending', createdAt: '2026-03-29' },
  ];

  let activeTab: 'appointments' | 'stats' | 'settings' = $state('appointments');

  function getStatusLabel(status: string): string {
    const labels: Record<string, string> = { pending: 'Beklemede', confirmed: 'Onaylandı', cancelled: 'İptal', completed: 'Tamamlandı' };
    return labels[status] || status;
  }

  function getStatusColor(status: string): string {
    const colors: Record<string, string> = { pending: 'var(--color-warning)', confirmed: 'var(--color-success)', cancelled: 'var(--color-error)', completed: 'var(--color-info)' };
    return colors[status] || 'var(--color-text-tertiary)';
  }

  const inputStyle = `width: 100%; padding: var(--space-3) var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-family: var(--font-body); font-size: var(--text-base); outline: none;`;
</script>

<svelte:head>
  <title>Admin Panel — Filiz Diyet</title>
  <meta name="description" content="Filiz Diyet Admin Panel. Randevuları yönetin ve site ayarlarını kontrol edin." />
  <meta name="keywords" content="admin, panel, yönetim, randevular" />
  <meta property="og:title" content="Admin Panel — Filiz Diyet" />
  <meta property="og:description" content="Filiz Diyet Admin Panel" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="/admin" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

{#if !$isAdminAuthenticated}
  <!-- Login Screen -->
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--color-surface-alt);">
    <div style="width: 100%; max-width: 400px; padding: var(--space-8); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg);">
      <div class="text-center" style="margin-bottom: var(--space-8);">
        <h1 class="font-display" style="font-size: var(--text-2xl); margin-bottom: var(--space-2);">
          Filiz<span style="color: var(--color-accent); font-style: italic;"> Diyet</span>
        </h1>
        <p style="font-size: var(--text-sm); color: var(--color-text-tertiary);">Yönetim Paneli</p>
      </div>

      <form onsubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <label style="display: block; font-size: var(--text-sm); font-weight: 500; color: var(--color-text-secondary); margin-bottom: var(--space-2);">Şifre</label>
        <input type="password" value={loginPassword} onchange={(e) => loginPassword = e.currentTarget.value} placeholder="Yönetici şifresi" style={inputStyle} />
        {#if loginError}
          <p style="font-size: var(--text-xs); color: var(--color-error); margin-top: var(--space-2);">{loginError}</p>
        {/if}
        <button type="submit" style="width: 100%; padding: var(--space-3); background: var(--color-primary); color: white; border: none; border-radius: var(--radius-full); font-weight: 600; cursor: pointer; margin-top: var(--space-4); font-size: var(--text-sm);">
          Giriş Yap
        </button>
      </form>

      <a href="/" style="display: block; text-align: center; margin-top: var(--space-4); font-size: var(--text-xs); color: var(--color-text-tertiary);">← Siteye Dön</a>
    </div>
  </div>
{:else}
  <!-- Admin Dashboard -->
  <div style="min-height: 100vh; background: var(--color-surface-alt);">
    <!-- Admin Header -->
    <header style="background: var(--color-surface); border-bottom: 1px solid var(--color-border); padding: var(--space-4) var(--space-6); display: flex; justify-content: space-between; align-items: center;">
      <div class="flex items-center gap-4">
        <h1 class="font-display" style="font-size: var(--text-lg);">
          Filiz<span style="color: var(--color-accent); font-style: italic;"> Diyet</span>
          <span style="font-size: var(--text-xs); color: var(--color-text-tertiary); font-family: var(--font-body); margin-left: var(--space-2);">Admin</span>
        </h1>
      </div>
      <div class="flex items-center gap-4">
        <a href="/" style="font-size: var(--text-sm); color: var(--color-text-tertiary); text-decoration: none;">Siteyi Gör</a>
        <button onclick={handleLogout} style="font-size: var(--text-sm); color: var(--color-error); background: none; border: none; cursor: pointer;">Çıkış</button>
      </div>
    </header>

    <div style="max-width: 1200px; margin-inline: auto; padding: var(--space-8);">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style="margin-bottom: var(--space-8);">
        {#each [
          { label: 'Toplam Randevu', value: '3', color: 'var(--color-primary)' },
          { label: 'Bekleyen', value: '2', color: 'var(--color-warning)' },
          { label: 'Onaylanan', value: '1', color: 'var(--color-success)' },
          { label: 'Bu Hafta', value: '3', color: 'var(--color-info)' }
        ] as stat}
          <div style="padding: var(--space-6); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg);">
            <p style="font-size: var(--text-xs); color: var(--color-text-tertiary); text-transform: uppercase; letter-spacing: 0.05em;">{stat.label}</p>
            <p class="font-display" style="font-size: var(--text-3xl); color: {stat.color};">{stat.value}</p>
          </div>
        {/each}
      </div>

      <!-- Tabs -->
      <div class="flex gap-1" style="margin-bottom: var(--space-6); border-bottom: 1px solid var(--color-border); padding-bottom: 1px;">
        {#each [
          { key: 'appointments', label: 'Randevular' },
          { key: 'stats', label: 'İstatistikler' },
          { key: 'settings', label: 'Ayarlar' }
        ] as tab}
          <button
            onclick={() => activeTab = tab.key}
            style="
              padding: var(--space-2) var(--space-4);
              font-size: var(--text-sm);
              font-weight: 500;
              border: none;
              background: none;
              cursor: pointer;
              color: {activeTab === tab.key ? 'var(--color-primary)' : 'var(--color-text-tertiary)'};
              border-bottom: 2px solid {activeTab === tab.key ? 'var(--color-primary)' : 'transparent'};
              margin-bottom: -2px;
              transition: all var(--duration-fast) var(--ease-out-quart);
            "
          >
            {tab.label}
          </button>
        {/each}
      </div>

      <!-- Tab Content -->
      {#if activeTab === 'appointments'}
        <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); overflow: hidden;">
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: var(--text-sm);">
              <thead>
                <tr style="border-bottom: 1px solid var(--color-border);">
                  {#each ['İsim', 'Hizmet', 'Tarih', 'Saat', 'Durum', 'İşlem'] as header}
                    <th style="padding: var(--space-3) var(--space-4); text-align: left; font-weight: 600; color: var(--color-text-secondary); font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.05em;">
                      {header}
                    </th>
                  {/each}
                </tr>
              </thead>
              <tbody>
                {#each demoAppointments as apt}
                  <tr style="border-bottom: 1px solid var(--color-border);">
                    <td style="padding: var(--space-3) var(--space-4);">
                      <p style="font-weight: 500;">{apt.fullName}</p>
                      <p style="font-size: var(--text-xs); color: var(--color-text-tertiary);">{apt.phone}</p>
                    </td>
                    <td style="padding: var(--space-3) var(--space-4); color: var(--color-text-secondary);">{apt.serviceType}</td>
                    <td style="padding: var(--space-3) var(--space-4); color: var(--color-text-secondary);">{apt.date}</td>
                    <td style="padding: var(--space-3) var(--space-4); color: var(--color-text-secondary);">{apt.time}</td>
                    <td style="padding: var(--space-3) var(--space-4);">
                      <span style="display: inline-block; padding: 2px var(--space-3); border-radius: var(--radius-full); font-size: var(--text-xs); font-weight: 500; background: {getStatusColor(apt.status)}20; color: {getStatusColor(apt.status)};">
                        {getStatusLabel(apt.status)}
                      </span>
                    </td>
                    <td style="padding: var(--space-3) var(--space-4);">
                      <button style="font-size: var(--text-xs); color: var(--color-primary); background: none; border: none; cursor: pointer; text-decoration: underline;">
                        Detay
                      </button>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      {:else if activeTab === 'stats'}
        <div style="padding: var(--space-12); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); text-align: center;">
          <p class="font-display" style="font-size: var(--text-2xl); color: var(--color-text-tertiary);">İstatistikler</p>
          <p style="color: var(--color-text-tertiary); margin-top: var(--space-2);">Supabase entegrasyonu sonrası aktif olacak.</p>
        </div>
      {:else}
        <div style="padding: var(--space-8); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg);">
          <h3 style="font-size: var(--text-xl); margin-bottom: var(--space-6);">Site Ayarları</h3>
          <p style="font-size: var(--text-sm); color: var(--color-text-tertiary);">Supabase entegrasyonu sonrası site ayarları buradan yönetilebilecek.</p>
        </div>
      {/if}
    </div>
  </div>
{/if}
