import type { Recipe } from '$lib/types';

export const RECIPES: Recipe[] = [
  {
    id: '1',
    slug: 'spor-oncesi-smoothie',
    title: 'Spor Öncesi Kardiyo Smoothie',
    description: 'Kardiyo ve dayanıklılık antrenmanları öncesi enerji veren, sindirimi kolay smoothie tarifi.',
    imageUrl: '/images/recipes/smoothie-pink.jpg',
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    calories: 185,
    protein: 8,
    carbs: 32,
    fat: 3,
    ingredients: [
      '1 orta boy muz',
      '1/2 su bardağı dondurulmuş böğürtlen',
      '1/2 su bardağı dondurulmuş çilek',
      '1 yemek kaşığı yulaf ezmesi',
      '150 ml badem sütü',
      '1 tatlı kaşığı bal'
    ],
    instructions: [
      'Tüm malzemeleri blender\'a ekleyin.',
      'Pürüzsüz bir kıvam elde edene kadar 1-2 dakika blend edin.',
      'Antrenman öncesi 30-45 dakika önce tüketin.',
      'İsteğe bağlı olarak üzerine chia tohumu serpin.'
    ],
    tags: ['smoothie', 'dusuk-kalorili'],
    category: 'icecek'
  },
  {
    id: '2',
    slug: 'glutensiz-dereotlu-pogaca',
    title: 'Glutensiz Dereotlu Poğaça',
    description: 'Çölyak hastaları ve gluten hassasiyeti olanlar için özel, lezzetli ve doyurucu poğaça tarifi.',
    imageUrl: '/images/recipes/pogaca.jpg',
    prepTime: 20,
    cookTime: 25,
    servings: 8,
    calories: 145,
    protein: 6,
    carbs: 18,
    fat: 5,
    ingredients: [
      '2 su bardağı glutensiz un karışımı',
      '1 adet yumurta',
      '1/2 su bardağı yoğurt',
      '3 yemek kaşığı zeytinyağı',
      '1 paket kabartma tozu',
      '1 demet taze dereotu',
      '100g beyaz peynir',
      'Tuz',
      'Üzeri için çörekotu ve susam'
    ],
    instructions: [
      'Fırını 180°C\'ye ısıtın.',
      'Kuru malzemeleri bir kapta karıştırın.',
      'Yumurta, yoğurt ve zeytinyağını ekleyip yoğurun.',
      'İnce kıyılmış dereotu ve ufalanmış peyniri ekleyin.',
      'Hamuru 8 eşit parçaya bölüp şekil verin.',
      'Üzerine yumurta sarısı sürüp çörekotu ve susam serpin.',
      'Önceden ısıtılmış fırında 20-25 dakika pişirin.'
    ],
    tags: ['glutensiz', 'atistirmalik'],
    category: 'atistirmalik'
  },
  {
    id: '3',
    slug: 'protein-bar',
    title: 'Ev Yapımı Protein Bar',
    description: '21g protein içeren, fırın gerektirmeyen, sağlıklı atıştırmalık. Spor sonrası veya öğün arası için ideal.',
    imageUrl: '/images/recipes/protein-bar.jpg',
    prepTime: 15,
    cookTime: 0,
    servings: 6,
    calories: 210,
    protein: 21,
    carbs: 15,
    fat: 8,
    ingredients: [
      '2 ölçek vanilya proteintozu',
      '1/2 su bardağı yulaf ezmesi',
      '2 yemek kaşığı fıstık ezmesi',
      '2 yemek kaşığı bal',
      '1/4 su bardağı badem sütü',
      '30g bitter çikolata (eritilmiş)',
      'Kabak çekirdeği ve ayçekirdeği'
    ],
    instructions: [
      'Protein tozu ve yulaf ezmesini bir kapta karıştırın.',
      'Fıstık ezmesi, bal ve badem sütünü ekleyin.',
      'Elle sıkı bir hamur kıvamına getirin.',
      'Pişirme kağıdı serili bir kaba bastırarak yayın.',
      'Üzerine eritilmiş çikolatayı gezdirin.',
      'Kabak ve ayçekirdeği serpin.',
      'Buzdolabında 2 saat bekletin, dilimleyin.'
    ],
    tags: ['protein', 'atistirmalik'],
    category: 'atistirmalik'
  },
  {
    id: '4',
    slug: 'dusuk-kalorili-browni',
    title: 'Düşük Kalorili Browni',
    description: 'Bir dilimi sadece 125 kalori! Diyet yaparken tatlı krizlerinize çözüm olan sağlıklı browni tarifi.',
    imageUrl: '/images/recipes/browni.jpg',
    prepTime: 10,
    cookTime: 20,
    servings: 8,
    calories: 125,
    protein: 5,
    carbs: 16,
    fat: 4,
    ingredients: [
      '1 orta boy kabak (rendelenmiş)',
      '3 yemek kaşığı kakao',
      '2 yemek kaşığı bal veya hurma pekmezi',
      '1 adet yumurta',
      '1/2 su bardağı yulaf unu',
      '1/2 tatlı kaşığı kabartma tozu',
      '1 tutam tuz',
      'Üzeri için ceviz'
    ],
    instructions: [
      'Fırını 175°C\'ye ısıtın.',
      'Rendelenmiş kabağı bir kapta suyunu sıkarak bekletin.',
      'Kakao, yumurta ve balı çırpın.',
      'Kabak, yulaf unu ve kabartma tozunu ekleyin.',
      'Yağlanmış kalıba dökün.',
      'Üzerine ceviz kırıkları yerleştirin.',
      '18-20 dakika pişirin. Ortası hafif nemli kalmalı.'
    ],
    tags: ['dusuk-kalorili', 'tatli'],
    category: 'tatli'
  },
  {
    id: '5',
    slug: 'yesil-detox-smoothie',
    title: 'Yeşil Detox Smoothie',
    description: 'Vücudunuzu arındıran, bağışıklık sistemini güçlendiren yeşil smoothie. Günün enerjik başlangıcı.',
    imageUrl: '/images/recipes/green-smoothie.jpg',
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    calories: 120,
    protein: 4,
    carbs: 22,
    fat: 2,
    ingredients: [
      '1 avuç ıspanak',
      '1/2 salatalık',
      '1/2 yeşil elma',
      '1 dilim zencefil',
      '1/2 limon suyu',
      '200 ml su',
      '1 tatlı kaşığı chia tohumu'
    ],
    instructions: [
      'Ispanak ve salatalığı yıkayıp doğrayın.',
      'Elmayı çekirdeklerini çıkarıp ekleyin.',
      'Zencefil, limon suyu ve suyu ekleyin.',
      'Pürüzsüz olana kadar blend edin.',
      'Chia tohumunu ekleyip karıştırın.',
      'Hemen tüketin, beklettikçe besin değeri azalır.'
    ],
    tags: ['smoothie', 'vegan', 'dusuk-kalorili'],
    category: 'icecek'
  },
  {
    id: '6',
    slug: 'kabizliga-cozum-tarifi',
    title: 'Kabızlığa Çözüm Tarifi',
    description: 'Doğal lifli besinlerle hazırlanan, bağırsak sağlığını destekleyen özel karışım.',
    imageUrl: '/images/recipes/fiber-mix.jpg',
    prepTime: 10,
    cookTime: 0,
    servings: 4,
    calories: 95,
    protein: 3,
    carbs: 18,
    fat: 2,
    ingredients: [
      '4 adet kuru incir',
      '4 adet kuru kayısı',
      '2 adet kuru erik',
      '1 yemek kaşığı keten tohumu',
      '1 yemek kaşığı zeytinyağı',
      '200 ml ılık su'
    ],
    instructions: [
      'Kuru meyveleri bir gece önceden ılık suda bekletin.',
      'Sabah blender ile püre haline getirin.',
      'Keten tohumu ve zeytinyağını ekleyin.',
      'Kahvaltıdan 30 dakika önce aç karnına tüketin.',
      'Günde en az 8 bardak su içmeyi unutmayın.'
    ],
    tags: ['vegan', 'dusuk-kalorili'],
    category: 'kahvalti'
  }
];
