import type { NavLink, SiteSettings } from '$lib/types';

export const SITE_SETTINGS: SiteSettings = {
  siteName: 'Filiz Diyet',
  siteDescription: 'Diyetisyen Başak Filiz Tanrıkulu — Sağlıklı yaşamın anahtarı, bilimsel ve kişiye özel beslenme danışmanlığı. Tuzla, İstanbul.',
  phone: '+90 555 123 4567',
  email: 'filizdiyet@gmail.com',
  address: 'Tuzla, İstanbul',
  workingHours: 'Pazartesi - Cumartesi: 09:00 - 18:00',
  socialMedia: {
    instagram: 'https://www.instagram.com/filizdiyet/',
    linkedin: 'https://www.linkedin.com/in/ba%C8%99ak-filiz-tanr%C4%B1kulu-53422514b/'
  }
};

export const NAV_LINKS: NavLink[] = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Hakkımda', href: '/hakkimda' },
  { label: 'Hizmetler', href: '/hizmetler' },
  { label: 'Blog', href: '/blog' },
  { label: 'Araçlar', href: '/araclar' },
  { label: 'Başarı Hikayeleri', href: '/basari-hikayeleri' },
  { label: 'İletişim', href: '/iletisim' }
];
