import type { BmiResult, CalorieResult } from '$lib/types';

/**
 * Calculates Body Mass Index and returns categorized result
 */
export function calculateBmi(weightKg: number, heightCm: number): BmiResult {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const rounded = Math.round(bmi * 10) / 10;

  if (rounded < 18.5) {
    return {
      bmi: rounded,
      category: 'Zayıf',
      color: 'var(--color-info)',
      recommendation: 'Vücut kütle indeksiniz normal aralığın altında. Sağlıklı kilo almak için bir diyetisyene danışmanız önerilir.'
    };
  } else if (rounded < 25) {
    return {
      bmi: rounded,
      category: 'Normal',
      color: 'var(--color-success)',
      recommendation: 'Tebrikler! Vücut kütle indeksiniz normal aralıkta. Sağlıklı beslenme ve düzenli egzersizle bu dengeyi koruyun.'
    };
  } else if (rounded < 30) {
    return {
      bmi: rounded,
      category: 'Fazla Kilolu',
      color: 'var(--color-warning)',
      recommendation: 'Vücut kütle indeksiniz normal aralığın üzerinde. Kişiye özel bir beslenme programı ile sağlıklı kilonuza ulaşabilirsiniz.'
    };
  } else {
    return {
      bmi: rounded,
      category: 'Obez',
      color: 'var(--color-error)',
      recommendation: 'Vücut kütle indeksiniz obezite sınıfında. Sağlığınız için profesyonel beslenme desteği almanız önemlidir.'
    };
  }
}

/**
 * Calculates Basal Metabolic Rate using Mifflin-St Jeor equation
 * and Total Daily Energy Expenditure
 */
export function calculateCalories(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: 'male' | 'female',
  activityLevel: number
): CalorieResult {
  let bmr: number;

  if (gender === 'male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }

  bmr = Math.round(bmr);
  const tdee = Math.round(bmr * activityLevel);
  const deficit = Math.round(tdee - 500);
  const surplus = Math.round(tdee + 300);

  return { bmr, tdee, deficit, surplus };
}

/**
 * Formats a number with Turkish locale
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('tr-TR').format(num);
}

/**
 * Formats a date string to Turkish locale
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Generates available appointment time slots
 */
export function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let hour = 9; hour <= 17; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    if (hour < 17) {
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
  }
  return slots;
}

/**
 * Validates Turkish phone number
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\s/g, '');
  return /^(\+90|0)?5\d{9}$/.test(cleaned);
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
