<script lang="ts">
  import { adminLogin, adminLogout, getDashboardStats } from '$lib/services/admin-service';
  import { getAppointments, updateAppointmentStatus } from '$lib/services/appointment-service';
  import type { PageData } from './$types';
  import type { Appointment } from '$lib/types';

  let { data } = $props<{ data: PageData }>();

  let loginEmail = $state('');
  let loginPassword = $state('');
  let loginError = $state('');
  let isLoading = $state(false);
  let appointments = $state<Appointment[]>([]);
  let stats = $state({ totalAppointments: 0, pendingAppointments: 0, totalBlogPosts: 0, totalRecipes: 0, totalSuccessStories: 0 });

  let activeTab: 'appointments' | 'stats' | 'settings' = $state('appointments');

  async function handleLogin() {
    if (!loginEmail.trim() || !loginPassword.trim()) {
      loginError = 'E-posta ve şifre gereklidir.';
      return;
    }

    isLoading = true;
    loginError = '';

    try {
      await adminLogin(loginEmail, loginPassword);
      loginEmail = '';
      loginPassword = '';
      // Reload page to update authenticated state
      window.location.reload();
    } catch (error) {
      loginError = error instanceof Error ? error.message : 'Giriş yapılamadı. Lütfen tekrar deneyin.';
    } finally {
      isLoading = false;
    }
  }

  async function handleLogout() {
    await adminLogout();
    window.location.reload();
  }

  async function loadAppointments() {
    try {
      appointments = await getAppointments();
    } catch (error) {
      console.error('Randevular yüklenemedi:', error);
    }
  }

  async function loadStats() {
    try {
      stats = await getDashboardStats();
    } catch (error) {
      console.error('İstatistikler yüklenemedi:', error);
    }
  }

  async function handleStatusChange(id: string, newStatus: string) {
    try {
      await updateAppointmentStatus(id, newStatus);
      await loadAppointments();
    } catch (error) {
      console.error('Durum güncellenemedi:', error);
    }
  }

  // Load data on mount if authenticated
  import { onMount } from 'svelte';

  onMount(() => {
    if (data.authenticated) {
      loadAppointments();
      loadStats();
    }
  });

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

{#if !data.authenticated}
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
        <label style="display: block; font-size: var(--text-sm); font-weight: 500; color: var(--color-text-secondary); margin-bottom: var(--space-2);">E-posta</label>
        <input type="email" value={loginEmail} onchange={(e) => loginEmail = e.currentTarget.value} placeholder="admin@example.com" style={inputStyle} />

        <label style="display: block; font-size: var(--text-sm); font-weight: 500; color: var(--color-text-secondary); margin-bottom: var(--space-2); margin-top: var(--space-4);">Şifre</label>
        <input type="password" value={loginPassword} onchange={(e) => loginPassword = e.currentTarget.value} placeholder="Şifreniz" style={inputStyle} />

        {#if loginError}
          <p style="font-size: var(--text-xs); color: var(--color-error); margin-top: var(--space-2);">{loginError}</p>
        {/if}

        <button type="submit" disabled={isLoading} style="width: 100%; padding: var(--space-3); background: var(--color-primary); color: white; border: none; border-radius: var(--radius-full); font-weight: 600; cursor: {isLoading ? 'wait' : 'pointer'}; margin-top: var(--space-4); font-size: var(--text-sm); opacity: {isLoading ? '0.7' : '1'};">
          {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
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
          { label: 'Toplam Randevu', value: stats.totalAppointments, color: 'var(--color-primary)' },
          { label: 'Bekleyen', value: stats.pendingAppointments, color: 'var(--color-warning)' },
          { label: 'Blog Yazıları', value: stats.totalBlogPosts, color: 'var(--color-info)' },
          { label: 'Tarifler', value: stats.totalRecipes, color: 'var(--color-success)' }
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
                {#each appointments as apt}
                  <tr style="border-bottom: 1px solid var(--color-border);">
                    <td style="padding: var(--space-3) var(--space-4);">
                      <p style="font-weight: 500;">{apt.full_name}</p>
                      <p style="font-size: var(--text-xs); color: var(--color-text-tertiary);">{apt.phone}</p>
                    </td>
                    <td style="padding: var(--space-3) var(--space-4); color: var(--color-text-secondary);">{apt.service_type}</td>
                    <td style="padding: var(--space-3) var(--space-4); color: var(--color-text-secondary);">{apt.preferred_date}</td>
                    <td style="padding: var(--space-3) var(--space-4); color: var(--color-text-secondary);">{apt.preferred_time}</td>
                    <td style="padding: var(--space-3) var(--space-4);">
                      <select
                        value={apt.status}
                        onchange={(e) => handleStatusChange(apt.id, e.currentTarget.value)}
                        style="font-size: var(--text-xs); padding: 2px var(--space-2); border-radius: var(--radius-full); border: none; background: {getStatusColor(apt.status)}20; color: {getStatusColor(apt.status)}; cursor: pointer;"
                      >
                        <option value="pending">Beklemede</option>
                        <option value="confirmed">Onaylandı</option>
                        <option value="cancelled">İptal</option>
                        <option value="completed">Tamamlandı</option>
                      </select>
                    </td>
                    <td style="padding: var(--space-3) var(--space-4);">
                      <button onclick={() => alert(apt.message || 'İçerik yok')} style="font-size: var(--text-xs); color: var(--color-primary); background: none; border: none; cursor: pointer; text-decoration: underline;">
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
        <div style="padding: var(--space-8); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg);">
          <h3 style="font-size: var(--text-xl); margin-bottom: var(--space-6);">Genel İstatistikler</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div style="padding: var(--space-6); background: var(--color-surface-alt); border-radius: var(--radius-md);">
              <p style="font-size: var(--text-sm); color: var(--color-text-secondary); margin-bottom: var(--space-2);">Toplam Randevular</p>
              <p class="font-display" style="font-size: var(--text-3xl); color: var(--color-primary);">{stats.totalAppointments}</p>
            </div>
            <div style="padding: var(--space-6); background: var(--color-surface-alt); border-radius: var(--radius-md);">
              <p style="font-size: var(--text-sm); color: var(--color-text-secondary); margin-bottom: var(--space-2);">Bekleyen Randevular</p>
              <p class="font-display" style="font-size: var(--text-3xl); color: var(--color-warning);">{stats.pendingAppointments}</p>
            </div>
            <div style="padding: var(--space-6); background: var(--color-surface-alt); border-radius: var(--radius-md);">
              <p style="font-size: var(--text-sm); color: var(--color-text-secondary); margin-bottom: var(--space-2);">Yayınlanan Blog Yazıları</p>
              <p class="font-display" style="font-size: var(--text-3xl); color: var(--color-info);">{stats.totalBlogPosts}</p>
            </div>
            <div style="padding: var(--space-6); background: var(--color-surface-alt); border-radius: var(--radius-md);">
              <p style="font-size: var(--text-sm); color: var(--color-text-secondary); margin-bottom: var(--space-2);">Yayınlanan Tarifler</p>
              <p class="font-display" style="font-size: var(--text-3xl); color: var(--color-success);">{stats.totalRecipes}</p>
            </div>
          </div>
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
