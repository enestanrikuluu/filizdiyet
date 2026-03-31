<script lang="ts">
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { calculateBmi, calculateCalories, formatNumber } from '$lib/utils/calculations';
  import type { BmiResult, CalorieResult } from '$lib/types';

  // BMI Calculator state
  let bmiWeight = $state(70);
  let bmiHeight = $state(170);
  let bmiResult: BmiResult | null = $state(null);

  function handleBmiCalculation() {
    if (bmiWeight > 0 && bmiHeight > 0) {
      bmiResult = calculateBmi(bmiWeight, bmiHeight);
    }
  }

  // Calorie Calculator state
  let calWeight = $state(70);
  let calHeight = $state(170);
  let calAge = $state(30);
  let calGender: 'male' | 'female' = $state('female');
  let calActivity = $state(1.55);
  let calResult: CalorieResult | null = $state(null);

  const activityLevels = [
    { value: 1.2, label: 'Hareketsiz', desc: 'Masa başı iş, egzersiz yok' },
    { value: 1.375, label: 'Az Aktif', desc: 'Hafif egzersiz (haftada 1-3 gün)' },
    { value: 1.55, label: 'Orta Aktif', desc: 'Orta düzey egzersiz (haftada 3-5 gün)' },
    { value: 1.725, label: 'Çok Aktif', desc: 'Yoğun egzersiz (haftada 6-7 gün)' },
    { value: 1.9, label: 'Ekstra Aktif', desc: 'Çok yoğun egzersiz veya fiziksel iş' }
  ];

  function handleCalorieCalculation() {
    if (calWeight > 0 && calHeight > 0 && calAge > 0) {
      calResult = calculateCalories(calWeight, calHeight, calAge, calGender, calActivity);
    }
  }

  // Input style helper
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

  const labelStyle = `
    display: block;
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--color-text-secondary);
    margin-bottom: var(--space-2);
  `;
</script>

<svelte:head>
  <title>Sağlık Araçları — Filiz Diyet</title>
  <meta name="description" content="Ücretsiz sağlık araçları. BMI hesaplayıcı ve günlük kalori ihtiyacı hesaplama. Sağlığınızı takip edin ve kişisel beslenme planı başlayın." />
  <meta name="keywords" content="BMI hesapla, kalori hesaplayıcı, vücut kitle indeksi, günlük kalori ihtiyacı, sağlık araçları" />
  <meta property="og:title" content="Sağlık Araçları — Filiz Diyet" />
  <meta property="og:description" content="Ücretsiz BMI ve kalori hesaplayıcı araçları. Sağlığınızı takip edin." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="/araclar" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<section class="section" style="padding-top: var(--space-16);">
  <div class="container">
    <SectionHeading
      label="Sağlık Araçları"
      title="Kendinizi Tanıyın"
      description="Bu araçlar genel bilgi amaçlıdır. Kişiye özel değerlendirme için mutlaka bir diyetisyene danışın."
    />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- BMI Calculator -->
      <div style="padding: var(--space-8); border: 1px solid var(--color-border); border-radius: var(--radius-lg); background: var(--color-surface);">
        <p style="font-size: var(--text-xs); font-weight: 600; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-2);">
          Hesaplayıcı 01
        </p>
        <h3 style="font-size: var(--text-2xl); margin-bottom: var(--space-6);">Vücut Kütle İndeksi</h3>

        <div class="grid grid-cols-2 gap-4" style="margin-bottom: var(--space-6);">
          <div>
            <label style={labelStyle}>Kilo (kg)</label>
            <input type="number" value={bmiWeight} onchange={(e) => bmiWeight = parseFloat(e.currentTarget.value)} min="30" max="250" style={inputStyle} onfocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'} onblur={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'} />
          </div>
          <div>
            <label style={labelStyle}>Boy (cm)</label>
            <input type="number" value={bmiHeight} onchange={(e) => bmiHeight = parseFloat(e.currentTarget.value)} min="100" max="250" style={inputStyle} onfocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'} onblur={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'} />
          </div>
        </div>

        <button
          onclick={handleBmiCalculation}
          style="
            width: 100%;
            padding: var(--space-3);
            background: var(--color-primary);
            color: var(--color-text-inverse);
            font-weight: 600;
            border: none;
            border-radius: var(--radius-full);
            cursor: pointer;
            font-size: var(--text-sm);
            transition: background var(--duration-fast) var(--ease-out-quart);
          "
          onmouseenter={(e) => e.currentTarget.style.background = 'var(--color-primary-dark)'}
          onmouseleave={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
        >
          Hesapla
        </button>

        {#if bmiResult}
          <div style="margin-top: var(--space-6); padding: var(--space-6); background: var(--color-surface-alt); border-radius: var(--radius-md);">
            <div class="flex items-baseline gap-3" style="margin-bottom: var(--space-3);">
              <span class="font-display" style="font-size: var(--text-4xl); color: var(--color-text-primary);">
                {bmiResult.bmi}
              </span>
              <span style="font-size: var(--text-sm); font-weight: 600; color: {bmiResult.color};">
                {bmiResult.category}
              </span>
            </div>
            <p style="font-size: var(--text-sm); color: var(--color-text-secondary); line-height: 1.6;">
              {bmiResult.recommendation}
            </p>
          </div>
        {/if}
      </div>

      <!-- Calorie Calculator -->
      <div style="padding: var(--space-8); border: 1px solid var(--color-border); border-radius: var(--radius-lg); background: var(--color-surface);">
        <p style="font-size: var(--text-xs); font-weight: 600; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-2);">
          Hesaplayıcı 02
        </p>
        <h3 style="font-size: var(--text-2xl); margin-bottom: var(--space-6);">Günlük Kalori İhtiyacı</h3>

        <!-- Gender -->
        <div style="margin-bottom: var(--space-4);">
          <label style={labelStyle}>Cinsiyet</label>
          <div class="flex gap-3">
            <button
              onclick={() => calGender = 'female'}
              style="
                flex: 1;
                padding: var(--space-2);
                border: 1px solid {calGender === 'female' ? 'var(--color-primary)' : 'var(--color-border)'};
                background: {calGender === 'female' ? 'var(--color-primary-lighter)' : 'transparent'};
                color: {calGender === 'female' ? 'var(--color-primary)' : 'var(--color-text-secondary)'};
                border-radius: var(--radius-md);
                font-size: var(--text-sm);
                font-weight: 500;
                cursor: pointer;
                transition: all var(--duration-fast) var(--ease-out-quart);
              "
            >
              Kadın
            </button>
            <button
              onclick={() => calGender = 'male'}
              style="
                flex: 1;
                padding: var(--space-2);
                border: 1px solid {calGender === 'male' ? 'var(--color-primary)' : 'var(--color-border)'};
                background: {calGender === 'male' ? 'var(--color-primary-lighter)' : 'transparent'};
                color: {calGender === 'male' ? 'var(--color-primary)' : 'var(--color-text-secondary)'};
                border-radius: var(--radius-md);
                font-size: var(--text-sm);
                font-weight: 500;
                cursor: pointer;
                transition: all var(--duration-fast) var(--ease-out-quart);
              "
            >
              Erkek
            </button>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3" style="margin-bottom: var(--space-4);">
          <div>
            <label style={labelStyle}>Yaş</label>
            <input type="number" value={calAge} onchange={(e) => calAge = parseFloat(e.currentTarget.value)} min="15" max="80" style={inputStyle} onfocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'} onblur={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'} />
          </div>
          <div>
            <label style={labelStyle}>Kilo (kg)</label>
            <input type="number" value={calWeight} onchange={(e) => calWeight = parseFloat(e.currentTarget.value)} min="30" max="250" style={inputStyle} onfocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'} onblur={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'} />
          </div>
          <div>
            <label style={labelStyle}>Boy (cm)</label>
            <input type="number" value={calHeight} onchange={(e) => calHeight = parseFloat(e.currentTarget.value)} min="100" max="250" style={inputStyle} onfocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'} onblur={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'} />
          </div>
        </div>

        <!-- Activity Level -->
        <div style="margin-bottom: var(--space-6);">
          <label style={labelStyle}>Aktivite Düzeyi</label>
          <select
            value={calActivity}
            onchange={(e) => calActivity = parseFloat(e.currentTarget.value)}
            style="{inputStyle} cursor: pointer;"
            onfocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
            onblur={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
          >
            {#each activityLevels as level}
              <option value={level.value}>{level.label} — {level.desc}</option>
            {/each}
          </select>
        </div>

        <button
          onclick={handleCalorieCalculation}
          style="
            width: 100%;
            padding: var(--space-3);
            background: var(--color-primary);
            color: var(--color-text-inverse);
            font-weight: 600;
            border: none;
            border-radius: var(--radius-full);
            cursor: pointer;
            font-size: var(--text-sm);
            transition: background var(--duration-fast) var(--ease-out-quart);
          "
          onmouseenter={(e) => e.currentTarget.style.background = 'var(--color-primary-dark)'}
          onmouseleave={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
        >
          Hesapla
        </button>

        {#if calResult}
          <div style="margin-top: var(--space-6); padding: var(--space-6); background: var(--color-surface-alt); border-radius: var(--radius-md);">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p style="font-size: var(--text-xs); color: var(--color-text-tertiary); text-transform: uppercase; letter-spacing: 0.05em;">Bazal Metabolizma</p>
                <p class="font-display" style="font-size: var(--text-2xl); color: var(--color-text-primary);">{formatNumber(calResult.bmr)}</p>
                <p style="font-size: var(--text-xs); color: var(--color-text-tertiary);">kcal/gün</p>
              </div>
              <div>
                <p style="font-size: var(--text-xs); color: var(--color-text-tertiary); text-transform: uppercase; letter-spacing: 0.05em;">Günlük İhtiyaç</p>
                <p class="font-display" style="font-size: var(--text-2xl); color: var(--color-primary);">{formatNumber(calResult.tdee)}</p>
                <p style="font-size: var(--text-xs); color: var(--color-text-tertiary);">kcal/gün</p>
              </div>
              <div>
                <p style="font-size: var(--text-xs); color: var(--color-text-tertiary); text-transform: uppercase; letter-spacing: 0.05em;">Kilo Vermek İçin</p>
                <p class="font-display" style="font-size: var(--text-2xl); color: var(--color-success);">{formatNumber(calResult.deficit)}</p>
                <p style="font-size: var(--text-xs); color: var(--color-text-tertiary);">kcal/gün</p>
              </div>
              <div>
                <p style="font-size: var(--text-xs); color: var(--color-text-tertiary); text-transform: uppercase; letter-spacing: 0.05em;">Kilo Almak İçin</p>
                <p class="font-display" style="font-size: var(--text-2xl); color: var(--color-warning);">{formatNumber(calResult.surplus)}</p>
                <p style="font-size: var(--text-xs); color: var(--color-text-tertiary);">kcal/gün</p>
              </div>
            </div>
            <p style="font-size: var(--text-xs); color: var(--color-text-tertiary); margin-top: var(--space-4); line-height: 1.5;">
              * Bu değerler Mifflin-St Jeor denklemi ile hesaplanmıştır. Kişiye özel beslenme planı için bir diyetisyene danışın.
            </p>
          </div>
        {/if}
      </div>
    </div>

    <!-- Disclaimer + CTA -->
    <div class="text-center" style="margin-top: var(--space-16);">
      <p style="font-size: var(--text-sm); color: var(--color-text-tertiary); margin-bottom: var(--space-6); max-width: 50ch; margin-inline: auto;">
        Bu hesaplayıcılar genel bilgi amaçlıdır ve tıbbi tavsiye yerine geçmez. Kişiselleştirilmiş beslenme planı için profesyonel destek alın.
      </p>
      <Button href="/iletisim">Kişisel Değerlendirme İçin Randevu Al</Button>
    </div>
  </div>
</section>
