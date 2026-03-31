<script lang="ts">
  import '../app.css';
  import Header from '$lib/components/layout/Header.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import WhatsAppButton from '$lib/components/ui/WhatsAppButton.svelte';
  import { page } from '$app/stores';
  import { closeMobileMenu } from '$lib/stores';
  import { afterNavigate } from '$app/navigation';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();

  // Close mobile menu on navigation
  afterNavigate(() => {
    closeMobileMenu();
    window.scrollTo({ top: 0 });
  });

  // Check if admin route (no header/footer)
  let isAdmin = $derived($page.url.pathname.startsWith('/admin'));
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="Diyetisyen Başak Filiz Tanrıkulu — Sağlıklı yaşamın anahtarı, bilimsel ve kişiye özel beslenme danışmanlığı. Tuzla, İstanbul." />
  <link rel="icon" href="/favicon.png" />
</svelte:head>

{#if !isAdmin}
  <Header />
  <main style="min-height: 100vh; padding-top: 4.5rem;">
    {@render children()}
  </main>
  <Footer />
  <WhatsAppButton />
{:else}
  {@render children()}
{/if}
