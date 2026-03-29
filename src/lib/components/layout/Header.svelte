<script lang="ts">
  import { page } from '$app/stores';
  import { NAV_LINKS } from '$lib/data/site-config';
  import { isMobileMenuOpen, isHeaderScrolled, scrollY, toggleMobileMenu, closeMobileMenu } from '$lib/stores';
  import { onMount } from 'svelte';
  import { slide, fade } from 'svelte/transition';

  onMount(() => {
    const handleScroll = () => {
      scrollY.set(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function handleNavClick() {
    closeMobileMenu();
  }
</script>

<header
  class="fixed top-0 left-0 right-0 z-50 transition-all"
  class:header-scrolled={$isHeaderScrolled}
  style="transition-duration: var(--duration-normal); transition-timing-function: var(--ease-out-quart);"
>
  <div class="container flex items-center justify-between" style="height: 4.5rem;">
    <!-- Logo -->
    <a href="/" class="logo" on:click={handleNavClick}>
      <span class="font-display text-2xl" style="font-size: var(--text-xl); color: var(--color-primary-dark); font-weight: 500; letter-spacing: -0.02em;">
        Filiz<span style="color: var(--color-accent); font-style: italic;"> Diyet</span>
      </span>
    </a>

    <!-- Desktop Navigation -->
    <nav class="hidden lg:flex items-center gap-1">
      {#each NAV_LINKS as link}
        <a
          href={link.href}
          class="nav-link"
          class:active={$page.url.pathname === link.href || ($page.url.pathname.startsWith(link.href) && link.href !== '/')}
          style="
            padding: var(--space-2) var(--space-4);
            font-size: var(--text-sm);
            font-weight: 500;
            color: var(--color-text-secondary);
            transition: color var(--duration-fast) var(--ease-out-quart);
            position: relative;
          "
        >
          {link.label}
        </a>
      {/each}
    </nav>

    <!-- CTA + Mobile Toggle -->
    <div class="flex items-center gap-4">
      <a
        href="/iletisim"
        class="hidden sm:inline-flex items-center justify-center"
        style="
          padding: var(--space-2) var(--space-6);
          background: var(--color-primary);
          color: var(--color-text-inverse);
          font-size: var(--text-sm);
          font-weight: 600;
          border-radius: var(--radius-full);
          transition: all var(--duration-fast) var(--ease-out-quart);
        "
        on:mouseenter={(e) => e.currentTarget.style.background = 'var(--color-primary-dark)'}
        on:mouseleave={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
      >
        Randevu Al
      </a>

      <!-- Mobile menu button -->
      <button
        class="lg:hidden flex flex-col justify-center items-center w-10 h-10"
        on:click={toggleMobileMenu}
        aria-label="Menüyü aç/kapat"
        aria-expanded={$isMobileMenuOpen}
      >
        <span
          class="block w-5 h-0.5 transition-all"
          style="
            background: var(--color-text-primary);
            transition-duration: var(--duration-normal);
            transition-timing-function: var(--ease-out-expo);
            transform: {$isMobileMenuOpen ? 'rotate(45deg) translate(2px, 2px)' : 'none'};
          "
        ></span>
        <span
          class="block w-5 h-0.5 mt-1.5 transition-all"
          style="
            background: var(--color-text-primary);
            transition-duration: var(--duration-normal);
            transition-timing-function: var(--ease-out-expo);
            opacity: {$isMobileMenuOpen ? '0' : '1'};
          "
        ></span>
        <span
          class="block w-5 h-0.5 mt-1.5 transition-all"
          style="
            background: var(--color-text-primary);
            transition-duration: var(--duration-normal);
            transition-timing-function: var(--ease-out-expo);
            transform: {$isMobileMenuOpen ? 'rotate(-45deg) translate(2px, -2px)' : 'none'};
          "
        ></span>
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  {#if $isMobileMenuOpen}
    <div
      class="lg:hidden absolute top-full left-0 right-0"
      transition:slide={{ duration: 300, easing: (t) => 1 - Math.pow(1 - t, 4) }}
      style="background: var(--color-surface); border-bottom: 1px solid var(--color-border); box-shadow: var(--shadow-lg);"
    >
      <nav class="container flex flex-col" style="padding-block: var(--space-6);">
        {#each NAV_LINKS as link, i}
          <a
            href={link.href}
            class="mobile-nav-link"
            class:active={$page.url.pathname === link.href}
            on:click={handleNavClick}
            style="
              padding: var(--space-3) 0;
              font-size: var(--text-lg);
              font-family: var(--font-display);
              color: var(--color-text-secondary);
              border-bottom: 1px solid var(--color-border);
              animation: fadeInUp var(--duration-normal) var(--ease-out-expo) both;
              animation-delay: {i * 50}ms;
            "
          >
            {link.label}
          </a>
        {/each}
        <a
          href="/iletisim"
          class="mt-4 inline-flex items-center justify-center"
          on:click={handleNavClick}
          style="
            padding: var(--space-3) var(--space-6);
            background: var(--color-primary);
            color: var(--color-text-inverse);
            font-weight: 600;
            border-radius: var(--radius-full);
            text-align: center;
          "
        >
          Randevu Al
        </a>
      </nav>
    </div>
  {/if}
</header>

<style>
  .header-scrolled {
    background: oklch(98.5% 0.005 90 / 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 1px 3px oklch(22% 0.01 90 / 0.06);
  }

  .nav-link:hover {
    color: var(--color-primary) !important;
  }

  .nav-link.active {
    color: var(--color-primary) !important;
  }

  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1.5rem;
    height: 2px;
    background: var(--color-primary);
    border-radius: var(--radius-full);
  }

  .mobile-nav-link.active {
    color: var(--color-primary) !important;
    font-weight: 500;
  }

  .logo {
    text-decoration: none;
  }
</style>
