<script lang="ts">
  export let label: string = '';
  export let title: string;
  export let description: string = '';
  export let align: 'left' | 'center' = 'left';
</script>

<div class={align === 'center' ? 'text-center' : ''} style="margin-bottom: var(--space-12);">
  {#if label}
    <p style="
      font-size: var(--text-xs);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--color-primary);
      margin-bottom: var(--space-3);
      font-family: var(--font-body);
    ">
      {label}
    </p>
  {/if}
  <h2 style="margin-bottom: {description ? 'var(--space-4)' : '0'};">
    {title}
  </h2>
  {#if description}
    <p style="
      font-size: var(--text-lg);
      color: var(--color-text-tertiary);
      max-width: 55ch;
      {align === 'center' ? 'margin-inline: auto;' : ''}
    ">
      {description}
    </p>
  {/if}
</div>
