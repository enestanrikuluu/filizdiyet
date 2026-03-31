<script lang="ts">
  let { variant = 'primary', size = 'md', href, type = 'button', disabled = false, fullWidth = false, children } = $props();

  const baseStyles = `
    inline-flex items-center justify-center font-semibold transition-all
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: 'bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-dark)]',
    secondary: 'bg-[var(--color-surface-alt)] text-[var(--color-text-primary)] hover:bg-[var(--color-border)]',
    ghost: 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-lighter)]',
    outline: 'border border-[var(--color-border-strong)] text-[var(--color-text-primary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
  };

  const sizes = {
    sm: 'text-sm px-4 py-1.5 rounded-full',
    md: 'text-sm px-6 py-2.5 rounded-full',
    lg: 'text-base px-8 py-3 rounded-full'
  };

  let classes = $derived(`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''}`);
</script>

{#if href}
  <a {href} class={classes} style="transition-duration: var(--duration-fast); transition-timing-function: var(--ease-out-quart); text-decoration: none;">
    {@render children?.()}
  </a>
{:else}
  <button {type} {disabled} class={classes} style="transition-duration: var(--duration-fast); transition-timing-function: var(--ease-out-quart);">
    {@render children?.()}
  </button>
{/if}
