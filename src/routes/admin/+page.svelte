<script lang="ts">
  import { adminLogin, adminLogout, getDashboardStats, getAllBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost, getAllRecipes, createRecipe, updateRecipe, deleteRecipe, getAllSuccessStories, createSuccessStory, updateSuccessStory, deleteSuccessStory } from '$lib/services/admin-service';
  import { getAppointments, updateAppointmentStatus } from '$lib/services/appointment-service';
  import type { PageData } from './$types';
  import { onMount } from 'svelte';

  let { data } = $props<{ data: PageData }>();

  // Auth state
  let loginEmail = $state('');
  let loginPassword = $state('');
  let loginError = $state('');
  let isLoading = $state(false);

  // Dashboard
  let stats = $state({ totalAppointments: 0, pendingAppointments: 0, totalBlogPosts: 0, totalRecipes: 0, totalSuccessStories: 0 });

  // Data
  let appointments = $state<any[]>([]);
  let blogPosts = $state<any[]>([]);
  let recipes = $state<any[]>([]);
  let successStories = $state<any[]>([]);

  // UI state
  type TabKey = 'dashboard' | 'appointments' | 'blog' | 'recipes' | 'stories';
  let activeTab: TabKey = $state('dashboard');
  let showModal = $state(false);
  let modalMode: 'create' | 'edit' = $state('create');
  let modalType: 'blog' | 'recipe' | 'story' = $state('blog');
  let editingItem = $state<any>(null);
  let saving = $state(false);
  let notification = $state('');

  // Form fields
  let formTitle = $state('');
  let formSlug = $state('');
  let formExcerpt = $state('');
  let formContent = $state('');
  let formCategory = $state('beslenme');
  let formTags = $state('');
  let formImageUrl = $state('');
  let formReadingTime = $state(5);
  // Recipe specific
  let formDescription = $state('');
  let formPrepTime = $state(10);
  let formCookTime = $state(20);
  let formServings = $state(4);
  let formCalories = $state(300);
  let formProtein = $state(15);
  let formCarbs = $state(30);
  let formFat = $state(10);
  let formIngredients = $state('');
  let formInstructions = $state('');
  let formRecipeCategory = $state('ana-yemek');
  // Story specific
  let formName = $state('');
  let formAge = $state(30);
  let formInitialWeight = $state(80);
  let formCurrentWeight = $state(65);
  let formDuration = $state('3 ay');
  let formQuote = $state('');
  let formProgram = $state('Kilo Yönetimi');

  // ── Auth ──
  async function handleLogin() {
    if (!loginEmail.trim() || !loginPassword.trim()) {
      loginError = 'E-posta ve şifre gereklidir.';
      return;
    }
    isLoading = true;
    loginError = '';
    try {
      await adminLogin(loginEmail, loginPassword);
      window.location.reload();
    } catch (error) {
      loginError = error instanceof Error ? error.message : 'Giriş yapılamadı.';
    } finally {
      isLoading = false;
    }
  }

  async function handleLogout() {
    await adminLogout();
    window.location.reload();
  }

  // ── Data Loading ──
  async function loadAll() {
    await Promise.all([loadStats(), loadAppointments(), loadBlogPosts(), loadRecipes(), loadStories()]);
  }

  async function loadStats() {
    try { stats = await getDashboardStats(); } catch (e) { console.error(e); }
  }
  async function loadAppointments() {
    try { appointments = await getAppointments(); } catch (e) { console.error(e); }
  }
  async function loadBlogPosts() {
    try { blogPosts = await getAllBlogPosts(); } catch (e) { console.error(e); }
  }
  async function loadRecipes() {
    try { recipes = await getAllRecipes(); } catch (e) { console.error(e); }
  }
  async function loadStories() {
    try { successStories = await getAllSuccessStories(); } catch (e) { console.error(e); }
  }

  onMount(() => {
    if (data.authenticated) loadAll();
  });

  // ── Notifications ──
  function showNotification(msg: string) {
    notification = msg;
    setTimeout(() => notification = '', 3000);
  }

  // ── Appointments ──
  async function handleStatusChange(id: string, newStatus: string) {
    try {
      await updateAppointmentStatus(id, newStatus);
      await loadAppointments();
      showNotification('Randevu durumu güncellendi');
    } catch (e) { console.error(e); }
  }

  // ── Slug generator ──
  function generateSlug(title: string): string {
    return title.toLowerCase()
      .replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ş/g,'s').replace(/ı/g,'i').replace(/ö/g,'o').replace(/ç/g,'c')
      .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
  }

  // ── Modal open ──
  function openCreate(type: 'blog' | 'recipe' | 'story') {
    modalMode = 'create';
    modalType = type;
    editingItem = null;
    resetForm();
    showModal = true;
  }

  function openEdit(type: 'blog' | 'recipe' | 'story', item: any) {
    modalMode = 'edit';
    modalType = type;
    editingItem = item;
    if (type === 'blog') {
      formTitle = item.title || '';
      formSlug = item.slug || '';
      formExcerpt = item.excerpt || '';
      formContent = item.content || '';
      formCategory = item.category || 'beslenme';
      formTags = (item.tags || []).join(', ');
      formImageUrl = item.image_url || '';
      formReadingTime = item.reading_time || 5;
    } else if (type === 'recipe') {
      formTitle = item.title || '';
      formSlug = item.slug || '';
      formDescription = item.description || '';
      formImageUrl = item.image_url || '';
      formPrepTime = item.prep_time || 10;
      formCookTime = item.cook_time || 20;
      formServings = item.servings || 4;
      formCalories = item.calories || 300;
      formProtein = item.protein || 15;
      formCarbs = item.carbs || 30;
      formFat = item.fat || 10;
      formIngredients = (item.ingredients || []).join('\n');
      formInstructions = (item.instructions || []).join('\n');
      formRecipeCategory = item.category || 'ana-yemek';
      formTags = (item.tags || []).join(', ');
    } else {
      formName = item.name || '';
      formAge = item.age || 30;
      formInitialWeight = item.initial_weight || 80;
      formCurrentWeight = item.current_weight || 65;
      formDuration = item.duration || '';
      formQuote = item.quote || '';
      formImageUrl = item.image_url || '';
      formProgram = item.program || '';
    }
    showModal = true;
  }

  function resetForm() {
    formTitle = ''; formSlug = ''; formExcerpt = ''; formContent = ''; formCategory = 'beslenme';
    formTags = ''; formImageUrl = ''; formReadingTime = 5; formDescription = '';
    formPrepTime = 10; formCookTime = 20; formServings = 4; formCalories = 300;
    formProtein = 15; formCarbs = 30; formFat = 10; formIngredients = ''; formInstructions = '';
    formRecipeCategory = 'ana-yemek'; formName = ''; formAge = 30; formInitialWeight = 80;
    formCurrentWeight = 65; formDuration = '3 ay'; formQuote = ''; formProgram = 'Kilo Yönetimi';
  }

  // ── Save ──
  async function handleSave() {
    saving = true;
    try {
      if (modalType === 'blog') {
        const payload = {
          title: formTitle,
          slug: formSlug || generateSlug(formTitle),
          excerpt: formExcerpt,
          content: formContent,
          category: formCategory,
          reading_time: formReadingTime,
          tags: formTags.split(',').map(t => t.trim()).filter(Boolean),
          image_url: formImageUrl || null
        };
        if (modalMode === 'create') {
          await createBlogPost({ slug: payload.slug, title: payload.title, excerpt: payload.excerpt, content: payload.content, category: payload.category, readingTime: payload.reading_time, tags: payload.tags });
          if (formImageUrl) await updateBlogPost((await getAllBlogPosts())[0].id, { imageUrl: formImageUrl });
        } else {
          await updateBlogPost(editingItem.id, { title: formTitle, slug: payload.slug, excerpt: formExcerpt, content: formContent, category: formCategory, readingTime: formReadingTime, tags: payload.tags, imageUrl: formImageUrl });
        }
        await loadBlogPosts();
        showNotification(modalMode === 'create' ? 'Blog yazısı oluşturuldu' : 'Blog yazısı güncellendi');
      } else if (modalType === 'recipe') {
        const payload = {
          title: formTitle,
          slug: formSlug || generateSlug(formTitle),
          description: formDescription,
          image_url: formImageUrl || null,
          prep_time: formPrepTime,
          cook_time: formCookTime,
          servings: formServings,
          calories: formCalories,
          protein: formProtein,
          carbs: formCarbs,
          fat: formFat,
          ingredients: formIngredients.split('\n').filter(Boolean),
          instructions: formInstructions.split('\n').filter(Boolean),
          category: formRecipeCategory,
          tags: formTags.split(',').map(t => t.trim()).filter(Boolean)
        };
        if (modalMode === 'create') {
          await createRecipe(payload);
        } else {
          await updateRecipe(editingItem.id, payload);
        }
        await loadRecipes();
        showNotification(modalMode === 'create' ? 'Tarif oluşturuldu' : 'Tarif güncellendi');
      } else {
        const payload = {
          name: formName,
          age: formAge,
          initial_weight: formInitialWeight,
          current_weight: formCurrentWeight,
          duration: formDuration,
          quote: formQuote,
          image_url: formImageUrl || null,
          program: formProgram
        };
        if (modalMode === 'create') {
          await createSuccessStory(payload);
        } else {
          await updateSuccessStory(editingItem.id, payload);
        }
        await loadStories();
        showNotification(modalMode === 'create' ? 'Başarı hikayesi oluşturuldu' : 'Başarı hikayesi güncellendi');
      }
      showModal = false;
      await loadStats();
    } catch (error) {
      showNotification('Hata: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata'));
    } finally {
      saving = false;
    }
  }

  // ── Delete ──
  async function handleDelete(type: 'blog' | 'recipe' | 'story', id: string) {
    if (!confirm('Silmek istediğinizden emin misiniz?')) return;
    try {
      if (type === 'blog') { await deleteBlogPost(id); await loadBlogPosts(); }
      else if (type === 'recipe') { await deleteRecipe(id); await loadRecipes(); }
      else { await deleteSuccessStory(id); await loadStories(); }
      await loadStats();
      showNotification('Silindi');
    } catch (e) { showNotification('Silinemedi'); }
  }

  function getStatusColor(status: string): string {
    const colors: Record<string, string> = { pending: '#f59e0b', confirmed: '#22c55e', cancelled: '#ef4444', completed: '#3b82f6' };
    return colors[status] || '#9ca3af';
  }
  function getStatusLabel(status: string): string {
    const labels: Record<string, string> = { pending: 'Beklemede', confirmed: 'Onaylandı', cancelled: 'İptal', completed: 'Tamamlandı' };
    return labels[status] || status;
  }

  const inputStyle = `width: 100%; padding: 10px 14px; border: 1px solid var(--color-border); border-radius: 8px; font-family: var(--font-body); font-size: 14px; outline: none; background: var(--color-surface);`;
  const labelStyle = `display: block; font-size: 13px; font-weight: 600; color: var(--color-text-secondary); margin-bottom: 4px;`;
</script>

<svelte:head>
  <title>Admin Panel — Filiz Diyet</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

{#if !data.authenticated}
  <!-- Login -->
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--color-surface-alt);">
    <div style="width: 100%; max-width: 400px; padding: 32px; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 16px;">
      <div class="text-center" style="margin-bottom: 32px;">
        <h1 class="font-display" style="font-size: 28px; margin-bottom: 6px;">
          Filiz<span style="color: var(--color-accent); font-style: italic;"> Diyet</span>
        </h1>
        <p style="font-size: 14px; color: var(--color-text-tertiary);">Yönetim Paneli</p>
      </div>
      <form onsubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <label style={labelStyle}>E-posta</label>
        <input type="email" value={loginEmail} oninput={(e) => loginEmail = e.currentTarget.value} placeholder="admin@example.com" style={inputStyle} />
        <label style="{labelStyle} margin-top: 16px;">Şifre</label>
        <input type="password" value={loginPassword} oninput={(e) => loginPassword = e.currentTarget.value} placeholder="Şifreniz" style={inputStyle} />
        {#if loginError}
          <p style="font-size: 13px; color: #ef4444; margin-top: 8px;">{loginError}</p>
        {/if}
        <button type="submit" disabled={isLoading} style="width: 100%; padding: 12px; background: var(--color-primary); color: #fff; border: none; border-radius: 999px; font-weight: 600; cursor: pointer; margin-top: 20px; font-size: 14px; opacity: {isLoading ? '0.7' : '1'};">
          {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
        </button>
      </form>
      <a href="/" style="display: block; text-align: center; margin-top: 16px; font-size: 13px; color: var(--color-text-tertiary); text-decoration: none;">← Siteye Dön</a>
    </div>
  </div>
{:else}
  <!-- Admin Panel -->
  <div style="min-height: 100vh; background: #f5f5f0; display: flex;">

    <!-- Sidebar -->
    <aside style="width: 240px; background: var(--color-surface); border-right: 1px solid var(--color-border); padding: 24px 0; display: flex; flex-direction: column; position: fixed; top: 0; left: 0; bottom: 0; z-index: 30;">
      <div style="padding: 0 24px; margin-bottom: 32px;">
        <h1 class="font-display" style="font-size: 20px;">
          Filiz<span style="color: var(--color-accent); font-style: italic;"> Diyet</span>
        </h1>
        <p style="font-size: 11px; color: var(--color-text-tertiary); margin-top: 2px;">Yönetim Paneli</p>
      </div>

      <nav style="flex: 1;">
        {#each [
          { key: 'dashboard', label: 'Genel Bakış', icon: '📊' },
          { key: 'appointments', label: 'Randevular', icon: '📅' },
          { key: 'blog', label: 'Blog Yazıları', icon: '📝' },
          { key: 'recipes', label: 'Tarifler', icon: '🍽️' },
          { key: 'stories', label: 'Başarı Hikayeleri', icon: '⭐' }
        ] as tab}
          <button
            onclick={() => activeTab = tab.key as TabKey}
            style="
              width: 100%; text-align: left; padding: 12px 24px; border: none; cursor: pointer;
              font-size: 14px; display: flex; align-items: center; gap: 10px;
              background: {activeTab === tab.key ? 'var(--color-primary-lighter, #e8f5e9)' : 'transparent'};
              color: {activeTab === tab.key ? 'var(--color-primary)' : 'var(--color-text-secondary)'};
              font-weight: {activeTab === tab.key ? '600' : '400'};
              border-right: 3px solid {activeTab === tab.key ? 'var(--color-primary)' : 'transparent'};
              transition: all 0.15s ease;
            "
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        {/each}
      </nav>

      <div style="padding: 0 24px; border-top: 1px solid var(--color-border); padding-top: 16px;">
        <a href="/" style="display: block; font-size: 13px; color: var(--color-text-tertiary); text-decoration: none; margin-bottom: 8px;">← Siteyi Gör</a>
        <button onclick={handleLogout} style="font-size: 13px; color: #ef4444; background: none; border: none; cursor: pointer; padding: 0;">Çıkış Yap</button>
      </div>
    </aside>

    <!-- Main Content -->
    <main style="flex: 1; margin-left: 240px; padding: 32px;">

      <!-- Notification -->
      {#if notification}
        <div style="position: fixed; top: 20px; right: 20px; background: var(--color-primary); color: #fff; padding: 12px 24px; border-radius: 10px; font-size: 14px; z-index: 100; box-shadow: 0 4px 12px rgba(0,0,0,0.15); animation: fadeIn 0.2s ease;">
          {notification}
        </div>
      {/if}

      <!-- DASHBOARD -->
      {#if activeTab === 'dashboard'}
        <h2 style="font-size: 24px; margin-bottom: 24px;">Genel Bakış</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style="margin-bottom: 32px;">
          {#each [
            { label: 'Toplam Randevu', value: stats.totalAppointments, color: 'var(--color-primary)', icon: '📅' },
            { label: 'Bekleyen', value: stats.pendingAppointments, color: '#f59e0b', icon: '⏳' },
            { label: 'Blog Yazıları', value: stats.totalBlogPosts, color: '#3b82f6', icon: '📝' },
            { label: 'Tarifler', value: stats.totalRecipes, color: '#22c55e', icon: '🍽️' }
          ] as stat}
            <div style="padding: 24px; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <p style="font-size: 12px; color: var(--color-text-tertiary); text-transform: uppercase; letter-spacing: 0.05em;">{stat.label}</p>
                  <p class="font-display" style="font-size: 36px; color: {stat.color}; margin-top: 4px;">{stat.value}</p>
                </div>
                <span style="font-size: 32px;">{stat.icon}</span>
              </div>
            </div>
          {/each}
        </div>

        <!-- Recent appointments -->
        <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; padding: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h3 style="font-size: 18px;">Son Randevular</h3>
            <button onclick={() => activeTab = 'appointments'} style="font-size: 13px; color: var(--color-primary); background: none; border: none; cursor: pointer;">Tümünü Gör →</button>
          </div>
          {#if appointments.length === 0}
            <p style="color: var(--color-text-tertiary); font-size: 14px;">Henüz randevu yok.</p>
          {:else}
            {#each appointments.slice(0, 5) as apt}
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--color-border);">
                <div>
                  <p style="font-weight: 500; font-size: 14px;">{apt.full_name}</p>
                  <p style="font-size: 12px; color: var(--color-text-tertiary);">{apt.service_type} — {apt.preferred_date}</p>
                </div>
                <span style="font-size: 12px; padding: 4px 12px; border-radius: 999px; background: {getStatusColor(apt.status)}15; color: {getStatusColor(apt.status)}; font-weight: 500;">
                  {getStatusLabel(apt.status)}
                </span>
              </div>
            {/each}
          {/if}
        </div>

      <!-- APPOINTMENTS -->
      {:else if activeTab === 'appointments'}
        <h2 style="font-size: 24px; margin-bottom: 24px;">Randevular</h2>
        <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; overflow: hidden;">
          {#if appointments.length === 0}
            <p style="padding: 32px; text-align: center; color: var(--color-text-tertiary);">Henüz randevu yok.</p>
          {:else}
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <thead>
                  <tr style="border-bottom: 1px solid var(--color-border); background: var(--color-surface-alt);">
                    {#each ['İsim', 'Telefon', 'Hizmet', 'Tarih', 'Saat', 'Mesaj', 'Durum'] as h}
                      <th style="padding: 12px 16px; text-align: left; font-size: 12px; font-weight: 600; color: var(--color-text-tertiary); text-transform: uppercase; letter-spacing: 0.05em;">{h}</th>
                    {/each}
                  </tr>
                </thead>
                <tbody>
                  {#each appointments as apt}
                    <tr style="border-bottom: 1px solid var(--color-border);">
                      <td style="padding: 12px 16px; font-weight: 500;">{apt.full_name}</td>
                      <td style="padding: 12px 16px; color: var(--color-text-secondary);">{apt.phone}</td>
                      <td style="padding: 12px 16px; color: var(--color-text-secondary);">{apt.service_type}</td>
                      <td style="padding: 12px 16px; color: var(--color-text-secondary);">{apt.preferred_date}</td>
                      <td style="padding: 12px 16px; color: var(--color-text-secondary);">{apt.preferred_time}</td>
                      <td style="padding: 12px 16px; color: var(--color-text-secondary); max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title={apt.message || ''}>
                        {apt.message ? apt.message.substring(0, 40) + (apt.message.length > 40 ? '...' : '') : '-'}
                      </td>
                      <td style="padding: 12px 16px;">
                        <select
                          value={apt.status}
                          onchange={(e) => handleStatusChange(apt.id, e.currentTarget.value)}
                          style="font-size: 12px; padding: 4px 8px; border-radius: 999px; border: 1px solid {getStatusColor(apt.status)}40; background: {getStatusColor(apt.status)}10; color: {getStatusColor(apt.status)}; cursor: pointer; font-weight: 500;"
                        >
                          <option value="pending">Beklemede</option>
                          <option value="confirmed">Onaylandı</option>
                          <option value="cancelled">İptal</option>
                          <option value="completed">Tamamlandı</option>
                        </select>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          {/if}
        </div>

      <!-- BLOG -->
      {:else if activeTab === 'blog'}
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <h2 style="font-size: 24px;">Blog Yazıları</h2>
          <button onclick={() => openCreate('blog')} style="padding: 10px 20px; background: var(--color-primary); color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer;">+ Yeni Yazı</button>
        </div>
        <div style="display: grid; gap: 12px;">
          {#each blogPosts as post}
            <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; padding: 20px; display: flex; gap: 16px; align-items: center;">
              {#if post.image_url}
                <img src={post.image_url} alt="" style="width: 80px; height: 60px; object-fit: cover; border-radius: 8px; flex-shrink: 0;" />
              {:else}
                <div style="width: 80px; height: 60px; background: var(--color-surface-alt); border-radius: 8px; flex-shrink: 0;"></div>
              {/if}
              <div style="flex: 1; min-width: 0;">
                <h3 style="font-size: 16px; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{post.title}</h3>
                <p style="font-size: 13px; color: var(--color-text-tertiary);">
                  <span style="background: var(--color-primary-lighter, #e8f5e9); color: var(--color-primary); padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; text-transform: uppercase;">{post.category}</span>
                  <span style="margin-left: 8px;">{post.reading_time} dk okuma</span>
                </p>
              </div>
              <div style="display: flex; gap: 8px; flex-shrink: 0;">
                <button onclick={() => openEdit('blog', post)} style="padding: 8px 16px; background: var(--color-surface-alt); border: 1px solid var(--color-border); border-radius: 8px; font-size: 13px; cursor: pointer;">Düzenle</button>
                <button onclick={() => handleDelete('blog', post.id)} style="padding: 8px 16px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; font-size: 13px; color: #ef4444; cursor: pointer;">Sil</button>
              </div>
            </div>
          {/each}
          {#if blogPosts.length === 0}
            <p style="text-align: center; color: var(--color-text-tertiary); padding: 32px;">Henüz blog yazısı yok. "Yeni Yazı" ile başlayın.</p>
          {/if}
        </div>

      <!-- RECIPES -->
      {:else if activeTab === 'recipes'}
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <h2 style="font-size: 24px;">Tarifler</h2>
          <button onclick={() => openCreate('recipe')} style="padding: 10px 20px; background: var(--color-primary); color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer;">+ Yeni Tarif</button>
        </div>
        <div style="display: grid; gap: 12px;">
          {#each recipes as recipe}
            <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; padding: 20px; display: flex; gap: 16px; align-items: center;">
              {#if recipe.image_url}
                <img src={recipe.image_url} alt="" style="width: 80px; height: 60px; object-fit: cover; border-radius: 8px; flex-shrink: 0;" />
              {:else}
                <div style="width: 80px; height: 60px; background: var(--color-surface-alt); border-radius: 8px; flex-shrink: 0;"></div>
              {/if}
              <div style="flex: 1; min-width: 0;">
                <h3 style="font-size: 16px; margin-bottom: 4px;">{recipe.title}</h3>
                <p style="font-size: 13px; color: var(--color-text-tertiary);">
                  {recipe.prep_time + recipe.cook_time} dk · {recipe.calories} kcal · {recipe.servings} porsiyon
                </p>
              </div>
              <div style="display: flex; gap: 8px; flex-shrink: 0;">
                <button onclick={() => openEdit('recipe', recipe)} style="padding: 8px 16px; background: var(--color-surface-alt); border: 1px solid var(--color-border); border-radius: 8px; font-size: 13px; cursor: pointer;">Düzenle</button>
                <button onclick={() => handleDelete('recipe', recipe.id)} style="padding: 8px 16px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; font-size: 13px; color: #ef4444; cursor: pointer;">Sil</button>
              </div>
            </div>
          {/each}
          {#if recipes.length === 0}
            <p style="text-align: center; color: var(--color-text-tertiary); padding: 32px;">Henüz tarif yok.</p>
          {/if}
        </div>

      <!-- SUCCESS STORIES -->
      {:else if activeTab === 'stories'}
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <h2 style="font-size: 24px;">Başarı Hikayeleri</h2>
          <button onclick={() => openCreate('story')} style="padding: 10px 20px; background: var(--color-primary); color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer;">+ Yeni Hikaye</button>
        </div>
        <div style="display: grid; gap: 12px;">
          {#each successStories as story}
            <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; padding: 20px; display: flex; gap: 16px; align-items: center;">
              <div style="flex: 1;">
                <h3 style="font-size: 16px; margin-bottom: 4px;">{story.name}, {story.age} yaş</h3>
                <p style="font-size: 13px; color: var(--color-text-tertiary);">
                  {story.initial_weight}kg → {story.current_weight}kg · {story.duration} · {story.program}
                </p>
              </div>
              <div style="display: flex; gap: 8px; flex-shrink: 0;">
                <button onclick={() => openEdit('story', story)} style="padding: 8px 16px; background: var(--color-surface-alt); border: 1px solid var(--color-border); border-radius: 8px; font-size: 13px; cursor: pointer;">Düzenle</button>
                <button onclick={() => handleDelete('story', story.id)} style="padding: 8px 16px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; font-size: 13px; color: #ef4444; cursor: pointer;">Sil</button>
              </div>
            </div>
          {/each}
          {#if successStories.length === 0}
            <p style="text-align: center; color: var(--color-text-tertiary); padding: 32px;">Henüz başarı hikayesi yok.</p>
          {/if}
        </div>
      {/if}
    </main>
  </div>

  <!-- MODAL -->
  {#if showModal}
    <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 50; display: flex; align-items: start; justify-content: center; padding: 40px 20px; overflow-y: auto;"
      onclick={(e) => { if (e.target === e.currentTarget) showModal = false; }}
      role="dialog"
    >
      <div style="background: var(--color-surface); border-radius: 16px; width: 100%; max-width: 640px; padding: 32px; position: relative;">
        <button onclick={() => showModal = false} style="position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 24px; cursor: pointer; color: var(--color-text-tertiary);">×</button>

        <h2 style="font-size: 22px; margin-bottom: 24px;">
          {modalMode === 'create' ? 'Yeni' : 'Düzenle'} — {modalType === 'blog' ? 'Blog Yazısı' : modalType === 'recipe' ? 'Tarif' : 'Başarı Hikayesi'}
        </h2>

        <form onsubmit={(e) => { e.preventDefault(); handleSave(); }} style="display: flex; flex-direction: column; gap: 16px;">

          {#if modalType === 'blog'}
            <div>
              <label style={labelStyle}>Başlık</label>
              <input type="text" value={formTitle} oninput={(e) => { formTitle = e.currentTarget.value; if (modalMode === 'create') formSlug = generateSlug(e.currentTarget.value); }} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Slug (URL)</label>
              <input type="text" value={formSlug} oninput={(e) => formSlug = e.currentTarget.value} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Özet</label>
              <textarea value={formExcerpt} oninput={(e) => formExcerpt = e.currentTarget.value} rows="2" style="{inputStyle} resize: vertical;"></textarea>
            </div>
            <div>
              <label style={labelStyle}>İçerik</label>
              <textarea value={formContent} oninput={(e) => formContent = e.currentTarget.value} rows="8" style="{inputStyle} resize: vertical;" required></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>Kategori</label>
                <select value={formCategory} onchange={(e) => formCategory = e.currentTarget.value} style={inputStyle}>
                  <option value="beslenme">Beslenme</option>
                  <option value="saglik">Sağlık</option>
                  <option value="tarif">Tarif</option>
                  <option value="yasam">Yaşam</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Okuma Süresi (dk)</label>
                <input type="number" value={formReadingTime} oninput={(e) => formReadingTime = parseInt(e.currentTarget.value)} min="1" style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Etiketler (virgülle ayırın)</label>
              <input type="text" value={formTags} oninput={(e) => formTags = e.currentTarget.value} placeholder="beslenme, sağlık, diyet" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Görsel URL</label>
              <input type="url" value={formImageUrl} oninput={(e) => formImageUrl = e.currentTarget.value} placeholder="https://images.unsplash.com/..." style={inputStyle} />
            </div>

          {:else if modalType === 'recipe'}
            <div>
              <label style={labelStyle}>Tarif Adı</label>
              <input type="text" value={formTitle} oninput={(e) => { formTitle = e.currentTarget.value; if (modalMode === 'create') formSlug = generateSlug(e.currentTarget.value); }} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Slug</label>
              <input type="text" value={formSlug} oninput={(e) => formSlug = e.currentTarget.value} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Açıklama</label>
              <textarea value={formDescription} oninput={(e) => formDescription = e.currentTarget.value} rows="2" style="{inputStyle} resize: vertical;"></textarea>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div>
                <label style={labelStyle}>Hazırlık (dk)</label>
                <input type="number" value={formPrepTime} oninput={(e) => formPrepTime = parseInt(e.currentTarget.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Pişirme (dk)</label>
                <input type="number" value={formCookTime} oninput={(e) => formCookTime = parseInt(e.currentTarget.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Porsiyon</label>
                <input type="number" value={formServings} oninput={(e) => formServings = parseInt(e.currentTarget.value)} style={inputStyle} />
              </div>
            </div>
            <div class="grid grid-cols-4 gap-4">
              <div>
                <label style={labelStyle}>Kalori</label>
                <input type="number" value={formCalories} oninput={(e) => formCalories = parseInt(e.currentTarget.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Protein (g)</label>
                <input type="number" value={formProtein} oninput={(e) => formProtein = parseInt(e.currentTarget.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Karb (g)</label>
                <input type="number" value={formCarbs} oninput={(e) => formCarbs = parseInt(e.currentTarget.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Yağ (g)</label>
                <input type="number" value={formFat} oninput={(e) => formFat = parseInt(e.currentTarget.value)} style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Kategori</label>
              <select value={formRecipeCategory} onchange={(e) => formRecipeCategory = e.currentTarget.value} style={inputStyle}>
                <option value="kahvalti">Kahvaltı</option>
                <option value="ana-yemek">Ana Yemek</option>
                <option value="atistirmalik">Atıştırmalık</option>
                <option value="icecek">İçecek</option>
                <option value="tatli">Tatlı</option>
                <option value="salata">Salata</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Malzemeler (her satıra bir tane)</label>
              <textarea value={formIngredients} oninput={(e) => formIngredients = e.currentTarget.value} rows="5" style="{inputStyle} resize: vertical;" placeholder="1 su bardağı yulaf&#10;2 yemek kaşığı bal&#10;..."></textarea>
            </div>
            <div>
              <label style={labelStyle}>Yapılış (her satıra bir adım)</label>
              <textarea value={formInstructions} oninput={(e) => formInstructions = e.currentTarget.value} rows="5" style="{inputStyle} resize: vertical;" placeholder="Malzemeleri karıştırın&#10;Orta ateşte pişirin&#10;..."></textarea>
            </div>
            <div>
              <label style={labelStyle}>Etiketler (virgülle ayırın)</label>
              <input type="text" value={formTags} oninput={(e) => formTags = e.currentTarget.value} placeholder="protein, glutensiz" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Görsel URL</label>
              <input type="url" value={formImageUrl} oninput={(e) => formImageUrl = e.currentTarget.value} style={inputStyle} />
            </div>

          {:else}
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>İsim</label>
                <input type="text" value={formName} oninput={(e) => formName = e.currentTarget.value} style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Yaş</label>
                <input type="number" value={formAge} oninput={(e) => formAge = parseInt(e.currentTarget.value)} style={inputStyle} />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>Başlangıç Kilosu (kg)</label>
                <input type="number" value={formInitialWeight} oninput={(e) => formInitialWeight = parseInt(e.currentTarget.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Şimdiki Kilo (kg)</label>
                <input type="number" value={formCurrentWeight} oninput={(e) => formCurrentWeight = parseInt(e.currentTarget.value)} style={inputStyle} />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>Süre</label>
                <input type="text" value={formDuration} oninput={(e) => formDuration = e.currentTarget.value} placeholder="3 ay" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Program</label>
                <input type="text" value={formProgram} oninput={(e) => formProgram = e.currentTarget.value} placeholder="Kilo Yönetimi" style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Danışan Yorumu</label>
              <textarea value={formQuote} oninput={(e) => formQuote = e.currentTarget.value} rows="3" style="{inputStyle} resize: vertical;"></textarea>
            </div>
            <div>
              <label style={labelStyle}>Fotoğraf URL</label>
              <input type="url" value={formImageUrl} oninput={(e) => formImageUrl = e.currentTarget.value} style={inputStyle} />
            </div>
          {/if}

          <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 8px;">
            <button type="button" onclick={() => showModal = false} style="padding: 10px 24px; background: var(--color-surface-alt); border: 1px solid var(--color-border); border-radius: 8px; font-size: 14px; cursor: pointer;">İptal</button>
            <button type="submit" disabled={saving} style="padding: 10px 24px; background: var(--color-primary); color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; opacity: {saving ? '0.7' : '1'};">
              {saving ? 'Kaydediliyor...' : modalMode === 'create' ? 'Oluştur' : 'Güncelle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  {/if}
{/if}

<style>
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
