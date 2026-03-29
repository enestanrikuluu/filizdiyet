import type { BlogPost } from '$lib/types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'besin-guvenliginin-5-ilkesi',
    title: 'Besin Güvenliğinin 5 Temel İlkesi',
    excerpt: 'Mutfağınızda sağlıklı ve güvenli gıda hazırlamak için bilmeniz gereken 5 temel ilke. Temizlikten saklama koşullarına kadar her şey.',
    content: `Besin güvenliği, sağlıklı beslenmenin temelini oluşturur. Doğru besinleri seçmek kadar, onları doğru şekilde hazırlamak ve saklamak da büyük önem taşır.

**1. Temizlik**
El yıkama, mutfak yüzeylerinin temizliği ve gıda ile temas eden tüm ekipmanların hijyeni besin güvenliğinin ilk adımıdır. Yemek hazırlamadan önce ve sonra ellerinizi en az 20 saniye sabunlu su ile yıkayın.

**2. Çiğ ve Pişmiş Besinlerin Ayrılması**
Çapraz kontaminasyonu önlemek için çiğ et, tavuk ve deniz ürünlerini diğer besinlerden ayrı tutun. Farklı kesme tahtaları ve bıçaklar kullanın.

**3. Uygun Pişirme**
Her besinin güvenli iç sıcaklığına ulaşması gerekir. Tavuk için 74°C, kıyma için 71°C, balık için 63°C minimum iç sıcaklık hedefleyin.

**4. Güvenilir Ham Madde ve Su Kullanımı**
Taze, mevsiminde ve güvenilir kaynaklardan temin edilen gıdaları tercih edin. İçme suyunun temizliğinden emin olun.

**5. Besinlerin Uygun Sıcaklıklarda Saklanması**
Soğuk besinleri 4°C altında, sıcak besinleri 60°C üzerinde tutun. "Tehlike bölgesi" olan 4-60°C arasında besinleri 2 saatten fazla bırakmayın.`,
    category: 'beslenme',
    imageUrl: '/images/blog/besin-guvenligi.jpg',
    publishedAt: '2025-12-15',
    readingTime: 5,
    tags: ['besin güvenliği', 'hijyen', 'mutfak']
  },
  {
    id: '2',
    slug: 'pcos-ve-beslenme',
    title: 'PCOS ile Yaşarken Doğru Beslenme',
    excerpt: 'Polikistik over sendromu olan kadınlarda beslenmenin önemi ve hormon dengesini destekleyen besinler hakkında bilmeniz gerekenler.',
    content: `Polikistik Over Sendromu (PCOS), kadınların yaklaşık %10'unu etkileyen hormonal bir bozukluktur. Beslenme, PCOS yönetiminde en güçlü araçlardan biridir.

**İnsülin Direnci ve Beslenme**
PCOS'lu kadınların büyük çoğunluğunda insülin direnci görülür. Düşük glisemik indeksli besinler tercih etmek, kan şekerini dengede tutmaya yardımcı olur.

**Tercih Edilmesi Gereken Besinler:**
- Tam tahıllar (yulaf, kinoa, bulgur)
- Yeşil yapraklı sebzeler
- Omega-3 açısından zengin balıklar
- Kuruyemişler ve tohumlar
- Baklagiller

**Sınırlandırılması Gereken Besinler:**
- İşlenmiş gıdalar ve rafine şeker
- Beyaz un ürünleri
- Şekerli içecekler
- Doymuş yağ açısından zengin besinler

**Anti-inflamatuar Beslenme**
PCOS'ta kronik inflamasyon yaygındır. Zerdeçal, zencefil, yeşil çay ve koyu renkli meyveler güçlü anti-inflamatuar etkiye sahiptir.`,
    category: 'saglik',
    imageUrl: '/images/blog/pcos.jpg',
    publishedAt: '2025-11-20',
    readingTime: 7,
    tags: ['PCOS', 'hormon dengesi', 'kadın sağlığı']
  },
  {
    id: '3',
    slug: 'duygusal-yeme-nedir',
    title: 'Duygusal Yeme Nedir ve Nasıl Başa Çıkılır?',
    excerpt: 'Stres, üzüntü veya sıkıntı anlarında yemeğe sığınıyor musunuz? Duygusal yeme döngüsünü kırmanın yollarını keşfedin.',
    content: `Duygusal yeme, fiziksel açlık yerine duygusal ihtiyaçları karşılamak için yemek yeme davranışıdır. Stres, üzüntü, yalnızlık ve hatta mutluluk bile duygusal yemeyi tetikleyebilir.

**Duygusal Açlık vs. Fiziksel Açlık**
- Duygusal açlık aniden gelir, fiziksel açlık yavaş yavaş gelişir
- Duygusal açlıkta belirli yiyecekler istenir
- Duygusal açlıkta tokluk hissedilmez
- Duygusal yeme sonrası suçluluk duyulur

**Başa Çıkma Stratejileri:**
1. Tetikleyicilerinizi tanıyın
2. Yeme günlüğü tutun
3. Alternatif başa çıkma yolları geliştirin (yürüyüş, nefes egzersizi)
4. Farkındalıklı yeme pratiği yapın
5. Profesyonel destek almaktan çekinmeyin

**Farkındalıklı Yeme (Mindful Eating)**
Her lokmayı fark ederek, yavaş yavaş ve tadını çıkararak yemek yiyin. Yemek yerken ekran karşısında olmaktan kaçının.`,
    category: 'saglik',
    imageUrl: '/images/blog/duygusal-yeme.jpg',
    publishedAt: '2025-10-08',
    readingTime: 6,
    tags: ['duygusal yeme', 'psikoloji', 'farkındalık']
  },
  {
    id: '4',
    slug: 'brat-diyeti-nedir',
    title: 'BRAT Diyeti: İshal ve Mide Sorunlarında Beslenme',
    excerpt: 'Mide bulantısı, ishal ve sindirim sorunlarında uygulanan BRAT diyeti hakkında bilmeniz gereken her şey.',
    content: `BRAT diyeti, sindirim sistemi sorunlarında önerilen, kolay sindirilen besinlerden oluşan bir beslenme programıdır.

**BRAT Ne Anlama Gelir?**
- **B**anana (Muz): Potasyum kaynağı, bağlayıcı etkisi
- **R**ice (Pirinç): Kolay sindirilir, düşük lif
- **A**pplesauce (Elma Püresi): Pektin içerir, yumuşatıcı
- **T**oast (Kızarmış Ekmek): Basit karbonhidrat, midede hafif

**Ne Zaman Uygulanmalı?**
- Akut ishal dönemlerinde
- Mide bulantısı ve kusma sonrasında
- Gastroenterit iyileşme sürecinde

**Önemli Notlar:**
- BRAT diyeti kısa süreli (24-48 saat) uygulanmalıdır
- Uzun süreli uygulamada besin eksiklikleri oluşabilir
- Bol sıvı tüketimi şarttır
- Belirtiler devam ederse mutlaka doktora başvurun`,
    category: 'beslenme',
    imageUrl: '/images/blog/brat-diyeti.jpg',
    publishedAt: '2025-09-15',
    readingTime: 4,
    tags: ['BRAT diyeti', 'sindirim', 'ishal']
  },
  {
    id: '5',
    slug: 'besin-etiketi-nasil-okunur',
    title: 'Besin Etiketi Nasıl Okunur?',
    excerpt: 'Market alışverişinde bilinçli tercihler yapmanın ilk adımı: besin etiketlerini doğru okumak.',
    content: `Besin etiketi okumak, sağlıklı beslenmenin en önemli adımlarından biridir. İşte dikkat etmeniz gereken noktalar:

**Porsiyon Büyüklüğü**
Tüm değerler porsiyon başınadır. Paketteki toplam porsiyon sayısını kontrol edin.

**Kalori**
Günlük kalori ihtiyacınıza göre değerlendirin. 2000 kalorilik bir diyet için referans değerler verilir.

**Dikkat Edilmesi Gereken Maddeler:**
- Doymuş yağ: Günlük %10'un altında tutun
- Trans yağ: Mümkün olduğunca sıfır olmalı
- Sodyum: Günlük 2300mg'ı aşmamalı
- Eklenen şeker: Günlük 25g'ı geçmemeli

**İçerik Listesi**
En baştaki madde en çok bulunan maddedir. İlk üç maddede şeker veya yağ varsa dikkatli olun.

**Sağlık Beyanları**
"Light", "az yağlı", "şekersiz" gibi ifadeler yanıltıcı olabilir. Her zaman besin değerleri tablosunu kontrol edin.`,
    category: 'beslenme',
    imageUrl: '/images/blog/besin-etiketi.jpg',
    publishedAt: '2025-08-22',
    readingTime: 5,
    tags: ['besin etiketi', 'market', 'bilinçli tüketim']
  },
  {
    id: '6',
    slug: 'kolajen-ve-anti-aging',
    title: 'Kolajen ve Anti-Aging: Beslenmeyle Yaşlanmayı Yavaşlatmak',
    excerpt: 'Kolajen üretimini destekleyen besinler ve beslenme stratejileriyle cilt sağlığınızı koruyun.',
    content: `Kolajen, vücudumuzun en bol bulunan proteinidir ve cilt elastikiyeti, eklem sağlığı ve kemik gücü için kritik öneme sahiptir.

**Kolajen Üretimini Destekleyen Besinler:**
- C vitamini açısından zengin meyveler (kivi, portakal, çilek)
- Kemik suyu
- Balık ve deniz ürünleri
- Yumurta beyazı
- Sarımsak ve soğan (kükürt kaynağı)

**Kolajeni Azaltan Faktörler:**
- Aşırı güneş maruziyeti
- Sigara ve alkol
- Rafine şeker tüketimi
- Uyku eksikliği
- Kronik stres

**Anti-Aging Beslenme Stratejileri:**
1. Antioksidan zengin beslenme (koyu renkli meyveler, yeşil çay)
2. Omega-3 yağ asitleri (balık, ceviz, keten tohumu)
3. Yeterli protein alımı
4. Bol su tüketimi (günde 2-2.5 litre)
5. Probiyotik ve prebiyotik besinler`,
    category: 'saglik',
    imageUrl: '/images/blog/kolajen.jpg',
    publishedAt: '2025-07-10',
    readingTime: 6,
    tags: ['kolajen', 'anti-aging', 'cilt sağlığı']
  }
];
