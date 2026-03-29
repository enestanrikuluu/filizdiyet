import type { Service } from '$lib/types';

export const SERVICES: Service[] = [
  {
    id: 'kisisel-diyet',
    title: 'Kişiye Özel Diyet Programı',
    description: 'Yaşam tarzınıza, sağlık durumunuza ve hedeflerinize göre tamamen size özel hazırlanan beslenme programları. Her birey farklıdır ve beslenme planınız da öyle olmalı.',
    icon: 'leaf',
    features: [
      'Detaylı sağlık ve beslenme analizi',
      'Kişiye özel makro ve mikro besin hesaplaması',
      'Haftalık menü planlaması',
      'Alışveriş listesi desteği',
      'Düzenli takip ve program güncelleme'
    ]
  },
  {
    id: 'online-diyet',
    title: 'Online Diyet Danışmanlığı',
    description: 'Nerede olursanız olun, online görüşmelerle profesyonel diyet danışmanlığı hizmeti. Video görüşme ile yüz yüze danışmanlık kalitesinde hizmet.',
    icon: 'video',
    features: [
      'Video görüşme ile detaylı değerlendirme',
      'WhatsApp üzerinden sürekli destek',
      'Dijital beslenme planı',
      'Haftalık online takip',
      'Türkiye\'nin her yerinden erişim'
    ]
  },
  {
    id: 'pcos-beslenme',
    title: 'PCOS Beslenme Programı',
    description: 'Polikistik over sendromu ile yaşayan kadınlara özel, hormon dengesini destekleyen, insülin direncini yönetmeye yardımcı beslenme programları.',
    icon: 'heart-pulse',
    features: [
      'Hormon dengesini destekleyen beslenme',
      'İnsülin direnci yönetimi',
      'Anti-inflamatuar beslenme planı',
      'Kilo yönetimi desteği',
      'Yaşam tarzı önerileri'
    ]
  },
  {
    id: 'duygusal-yeme',
    title: 'Duygusal Yeme Danışmanlığı',
    description: 'Yemekle olan ilişkinizi yeniden şekillendirin. Duygusal açlık ile gerçek açlığı ayırt etmeyi öğrenin ve sağlıklı bir beslenme alışkanlığı geliştirin.',
    icon: 'brain',
    features: [
      'Yeme davranışı analizi',
      'Farkındalık temelli beslenme',
      'Tetikleyici belirleme ve yönetim',
      'Sağlıklı başa çıkma stratejileri',
      'Uzun vadeli davranış değişikliği'
    ]
  },
  {
    id: 'kurumsal-beslenme',
    title: 'Kurumsal Beslenme Eğitimi',
    description: 'İşyerlerinde sağlıklı beslenme kültürü oluşturmak için seminer, workshop ve eğitim programları. Çalışan sağlığına yatırım yapın.',
    icon: 'presentation',
    features: [
      'Besin güvenliği eğitimi',
      'Sağlıklı beslenme seminerleri',
      'Kurum içi workshop\'lar',
      'Menü danışmanlığı',
      'Çalışan sağlığı programları'
    ]
  },
  {
    id: 'sporcu-beslenmesi',
    title: 'Sporcu Beslenmesi',
    description: 'Antrenman performansınızı en üst düzeye çıkarmak için spor türünüze ve hedeflerinize uygun beslenme stratejileri.',
    icon: 'dumbbell',
    features: [
      'Performans odaklı beslenme planı',
      'Antrenman öncesi ve sonrası beslenme',
      'Supplement danışmanlığı',
      'Vücut kompozisyonu yönetimi',
      'Yarışma dönemi beslenme stratejisi'
    ]
  }
];
