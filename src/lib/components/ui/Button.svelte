<script lang="ts">
  import type { Snippet } from 'svelte';

  let { variant = 'primary', size = 'md', href, type = 'button', disabled = false, fullWidth = false, children }: {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    type?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    children?: Snippet;
  } = $props();

  const variantStyles: Record<string, string> = {
    primary: 'background: var(--color-primary); color: #fff;',
    secondary: 'background: var(--color-surface-alt); color: var(--color-text-primary);',
    ghost: 'background: transparent; color: var(--color-text-secondary);',
    outline: 'background: transparent; color: var(--color-text-primary); border: 1px solid var(--color-border-strong);'
  };

  const sizeStyles: Record<string, string> = {
    sm: 'font-size: var(--text-sm); padding: 0.375rem 1rem; border-radius: 9999px;',
    md: 'font-size: var(--text-sm); padding: 0.625rem 1.5rem; border-radius: 9999px;',
    lg: 'font-size: var(--text-base); padding: 0.75rem 2rem; border-radius: 9999px;'
  };

  let buttonStyle = $derived(
    `display: inline-flex; align-items: center; justify-content: center; font-weight: 600; font-family: var(--font-body); cursor: pointer; transition: all var(--duration-fast) var(--ease-out-quart); text-decoration: none; border: none; ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'width: 100%;' : ''} ${disabled ? 'opacity: 0.5; cursor: not-allowed;' : ''}`
  );
</script>

{#if href}
  <a {href} style={buttonStyle}
    onmouseenter={(e) => {
      if (variant === 'primary') e.currentTarget.style.background = 'var(--color-primary-dark)';
      if (variant === 'outline') { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary)'; }
      if (variant === 'ghost') { e.currentTarget.style.color = 'var(--color-primary)'; e.currentTarget.style.background = 'var(--color-primary-lighter)'; }
    }}
    onmouseleave={(e) => {
      if (variant === 'primary') e.currentTarget.style.background = 'var(--color-primary)';
      if (variant === 'outline') { e.currentTarget.style.borderColor = 'var(--color-border-strong)'; e.currentTarget.style.color = 'var(--color-text-primary)'; }
      if (variant === 'ghost') { e.currentTarget.style.color = 'var(--color-text-secondary)'; e.currentTarget.style.background = 'transparent'; }
    }}
  >
    {@render children?.()}
  </a>
{:else}
  <button {type} {disabled} style={buttonStyle}
    onmouseenter={(e) => {
      if (variant === 'primary') e.currentTarget.style.background = 'var(--color-primary-dark)';
      if (variant === 'outline') { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary)'; }
      if (variant === 'ghost') { e.currentTarget.style.color = 'var(--color-primary)'; e.currentTarget.style.background = 'var(--color-primary-lighter)'; }
    }}
    onmouseleave={(e) => {
      if (variant === 'primary') e.currentTarget.style.background = 'var(--color-primary)';
      if (variant === 'outline') { e.currentTarget.style.borderColor = 'var(--color-border-strong)'; e.currentTarget.style.color = 'var(--color-text-primary)'; }
      if (variant === 'ghost') { e.currentTarget.style.color = 'var(--color-text-secondary)'; e.currentTarget.style.background = 'transparent'; }
    }}
  >
    {@render children?.()}
  </button>
{/if}
