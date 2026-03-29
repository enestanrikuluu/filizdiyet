import type { SuccessStory, Testimonial } from '$lib/types';

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: '1',
    name: 'Ayşe K.',
    age: 34,
    initialWeight: 89,
    currentWeight: 72,
    duration: '4 ay',
    quote: 'Filiz Hanım sayesinde sadece kilo vermedim, yemekle olan ilişkim tamamen değişti. Artık ne yediğimi bilerek ve severek yiyorum.',
    imageUrl: '/images/stories/story-1.jpg',
    program: 'Kişiye Özel Diyet'
  },
  {
    id: '2',
    name: 'Mehmet T.',
    age: 42,
    initialWeight: 105,
    currentWeight: 88,
    duration: '6 ay',
    quote: 'Online danışmanlık ile İstanbul dışından takip edilebildim. Program çok pratik ve uygulanabilirdi. 17 kilo verdim!',
    imageUrl: '/images/stories/story-2.jpg',
    program: 'Online Diyet'
  },
  {
    id: '3',
    name: 'Zeynep A.',
    age: 28,
    initialWeight: 78,
    currentWeight: 65,
    duration: '3 ay',
    quote: 'PCOS tanısı aldıktan sonra Filiz Hanım\'a başvurdum. Hem kilolarımdan kurtuldum hem de hormon değerlerim düzeldi.',
    imageUrl: '/images/stories/story-3.jpg',
    program: 'PCOS Beslenme'
  },
  {
    id: '4',
    name: 'Elif S.',
    age: 31,
    initialWeight: 68,
    currentWeight: 58,
    duration: '2.5 ay',
    quote: 'Duygusal yeme sorunum vardı. Stresli zamanlarda kontrolsüz yiyordum. Artık yemekle barışığım.',
    imageUrl: '/images/stories/story-4.jpg',
    program: 'Duygusal Yeme Danışmanlığı'
  },
  {
    id: '5',
    name: 'Ahmet B.',
    age: 38,
    initialWeight: 95,
    currentWeight: 82,
    duration: '5 ay',
    quote: 'Sporcu beslenmesi programı ile hem performansım arttı hem de vücut yağ oranım %22\'den %15\'e düştü.',
    imageUrl: '/images/stories/story-5.jpg',
    program: 'Sporcu Beslenmesi'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Ayşe K.',
    text: 'Filiz Hanım çok ilgili ve bilgili. Her soruya anında dönüş yapıyor. Kesinlikle tavsiye ederim.',
    rating: 5,
    program: 'Kişiye Özel Diyet'
  },
  {
    id: '2',
    name: 'Mehmet T.',
    text: 'Online danışmanlık ile hiç fark etmedi. Süreç çok profesyonel yürütüldü.',
    rating: 5,
    program: 'Online Diyet'
  },
  {
    id: '3',
    name: 'Zeynep A.',
    text: 'PCOS konusunda çok yetkin. Sadece diyet değil, yaşam tarzı değişikliği de önerdi.',
    rating: 5,
    program: 'PCOS Beslenme'
  },
  {
    id: '4',
    name: 'Selin D.',
    text: 'Programlar çok uygulanabilir. Aç kalmadım, sıkılmadım, sonuç aldım.',
    rating: 5,
    program: 'Kişiye Özel Diyet'
  },
  {
    id: '5',
    name: 'Burak Y.',
    text: 'Besin güvenliği eğitimi aldık iş yerimizde. Çok faydalı ve akılda kalıcıydı.',
    rating: 5,
    program: 'Kurumsal Eğitim'
  },
  {
    id: '6',
    name: 'Deniz M.',
    text: 'Duygusal yeme danışmanlığı hayatımı değiştirdi. Artık yemek düşmanım değil, dostum.',
    rating: 5,
    program: 'Duygusal Yeme'
  }
];
