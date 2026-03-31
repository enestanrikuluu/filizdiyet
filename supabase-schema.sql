-- =============================================
-- Filiz Diyet — Supabase Database Schema
-- =============================================

-- 1. Blog Posts
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('beslenme', 'saglik', 'yasam', 'tarif')),
  image_url TEXT,
  published_at TIMESTAMPTZ DEFAULT now(),
  reading_time INT DEFAULT 5,
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Recipes
CREATE TABLE recipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  prep_time INT NOT NULL,
  cook_time INT DEFAULT 0,
  servings INT NOT NULL,
  calories INT NOT NULL,
  protein NUMERIC(5,1) NOT NULL,
  carbs NUMERIC(5,1) NOT NULL,
  fat NUMERIC(5,1) NOT NULL,
  ingredients TEXT[] NOT NULL,
  instructions TEXT[] NOT NULL,
  tags TEXT[] DEFAULT '{}',
  category TEXT NOT NULL CHECK (category IN ('kahvalti', 'ana-yemek', 'atistirmalik', 'icecek', 'tatli', 'salata')),
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Success Stories
CREATE TABLE success_stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  age INT NOT NULL,
  initial_weight NUMERIC(5,1) NOT NULL,
  current_weight NUMERIC(5,1) NOT NULL,
  duration TEXT NOT NULL,
  quote TEXT NOT NULL,
  image_url TEXT,
  program TEXT NOT NULL,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Testimonials
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  program TEXT NOT NULL,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Appointments
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  service_type TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Contact Messages (general inquiries)
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- Row Level Security (RLS)
-- =============================================

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Public read for published content
CREATE POLICY "Public can read published blog posts"
  ON blog_posts FOR SELECT
  USING (is_published = true);

CREATE POLICY "Public can read published recipes"
  ON recipes FOR SELECT
  USING (is_published = true);

CREATE POLICY "Public can read published success stories"
  ON success_stories FOR SELECT
  USING (is_published = true);

CREATE POLICY "Public can read published testimonials"
  ON testimonials FOR SELECT
  USING (is_published = true);

-- Public can insert appointments and contact messages
CREATE POLICY "Public can create appointments"
  ON appointments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can create contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

-- Authenticated users (admin) can do everything
CREATE POLICY "Admin full access blog_posts"
  ON blog_posts FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access recipes"
  ON recipes FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access success_stories"
  ON success_stories FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access testimonials"
  ON testimonials FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access appointments"
  ON appointments FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access contact_messages"
  ON contact_messages FOR ALL
  USING (auth.role() = 'authenticated');

-- =============================================
-- Updated_at trigger
-- =============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER recipes_updated_at
  BEFORE UPDATE ON recipes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- Seed Data — Blog Posts
-- =============================================

INSERT INTO blog_posts (slug, title, excerpt, content, category, reading_time, tags) VALUES
('besin-guvenliginin-5-ilkesi',
 'Besin Güvenliğinin 5 Temel İlkesi',
 'Mutfağınızda sağlıklı ve güvenli gıda hazırlamak için bilmeniz gereken 5 temel ilke.',
 E'Besin güvenliği, sağlıklı beslenmenin temelini oluşturur. Doğru besinleri seçmek kadar, onları doğru şekilde hazırlamak ve saklamak da büyük önem taşır.\n\n**1. Temizlik**\nEl yıkama, mutfak yüzeylerinin temizliği ve gıda ile temas eden tüm ekipmanların hijyeni besin güvenliğinin ilk adımıdır. Yemek hazırlamadan önce ve sonra ellerinizi en az 20 saniye sabunlu su ile yıkayın.\n\n**2. Çiğ ve Pişmiş Besinlerin Ayrılması**\nÇapraz kontaminasyonu önlemek için çiğ et, tavuk ve deniz ürünlerini diğer besinlerden ayrı tutun. Farklı kesme tahtaları ve bıçaklar kullanın.\n\n**3. Uygun Pişirme**\nHer besinin güvenli iç sıcaklığına ulaşması gerekir. Tavuk için 74°C, kıyma için 71°C, balık için 63°C minimum iç sıcaklık hedefleyin.\n\n**4. Güvenilir Ham Madde ve Su Kullanımı**\nTaze, mevsiminde ve güvenilir kaynaklardan temin edilen gıdaları tercih edin. İçme suyunun temizliğinden emin olun.\n\n**5. Besinlerin Uygun Sıcaklıklarda Saklanması**\nSoğuk besinleri 4°C altında, sıcak besinleri 60°C üzerinde tutun. "Tehlike bölgesi" olan 4-60°C arasında besinleri 2 saatten fazla bırakmayın.',
 'beslenme', 5, ARRAY['besin güvenliği', 'hijyen', 'mutfak']),

('pcos-ve-beslenme',
 'PCOS ile Yaşarken Doğru Beslenme',
 'Polikistik over sendromu olan kadınlarda beslenmenin önemi ve hormon dengesini destekleyen besinler.',
 E'Polikistik Over Sendromu (PCOS), kadınların yaklaşık %10''unu etkileyen hormonal bir bozukluktur. Beslenme, PCOS yönetiminde en güçlü araçlardan biridir.\n\n**İnsülin Direnci ve Beslenme**\nPCOS''lu kadınların büyük çoğunluğunda insülin direnci görülür. Düşük glisemik indeksli besinler tercih etmek, kan şekerini dengede tutmaya yardımcı olur.\n\n**Tercih Edilmesi Gereken Besinler:**\n- Tam tahıllar (yulaf, kinoa, bulgur)\n- Yeşil yapraklı sebzeler\n- Omega-3 açısından zengin balıklar\n- Kuruyemişler ve tohumlar\n- Baklagiller\n\n**Anti-inflamatuar Beslenme**\nPCOS''ta kronik inflamasyon yaygındır. Zerdeçal, zencefil, yeşil çay ve koyu renkli meyveler güçlü anti-inflamatuar etkiye sahiptir.',
 'saglik', 7, ARRAY['PCOS', 'hormon dengesi', 'kadın sağlığı']),

('duygusal-yeme-nedir',
 'Duygusal Yeme Nedir ve Nasıl Başa Çıkılır?',
 'Stres, üzüntü veya sıkıntı anlarında yemeğe sığınıyor musunuz? Duygusal yeme döngüsünü kırmanın yolları.',
 E'Duygusal yeme, fiziksel açlık yerine duygusal ihtiyaçları karşılamak için yemek yeme davranışıdır.\n\n**Duygusal Açlık vs. Fiziksel Açlık**\n- Duygusal açlık aniden gelir, fiziksel açlık yavaş yavaş gelişir\n- Duygusal açlıkta belirli yiyecekler istenir\n- Duygusal açlıkta tokluk hissedilmez\n- Duygusal yeme sonrası suçluluk duyulur\n\n**Başa Çıkma Stratejileri:**\n1. Tetikleyicilerinizi tanıyın\n2. Yeme günlüğü tutun\n3. Alternatif başa çıkma yolları geliştirin\n4. Farkındalıklı yeme pratiği yapın\n5. Profesyonel destek almaktan çekinmeyin',
 'saglik', 6, ARRAY['duygusal yeme', 'psikoloji', 'farkındalık']),

('brat-diyeti-nedir',
 'BRAT Diyeti: İshal ve Mide Sorunlarında Beslenme',
 'Mide bulantısı, ishal ve sindirim sorunlarında uygulanan BRAT diyeti hakkında her şey.',
 E'BRAT diyeti, sindirim sistemi sorunlarında önerilen, kolay sindirilen besinlerden oluşan bir beslenme programıdır.\n\n**BRAT Ne Anlama Gelir?**\n- Banana (Muz): Potasyum kaynağı\n- Rice (Pirinç): Kolay sindirilir\n- Applesauce (Elma Püresi): Pektin içerir\n- Toast (Kızarmış Ekmek): Basit karbonhidrat\n\n**Önemli Notlar:**\n- BRAT diyeti kısa süreli (24-48 saat) uygulanmalıdır\n- Uzun süreli uygulamada besin eksiklikleri oluşabilir\n- Bol sıvı tüketimi şarttır\n- Belirtiler devam ederse mutlaka doktora başvurun',
 'beslenme', 4, ARRAY['BRAT diyeti', 'sindirim', 'ishal']),

('besin-etiketi-nasil-okunur',
 'Besin Etiketi Nasıl Okunur?',
 'Market alışverişinde bilinçli tercihler yapmanın ilk adımı: besin etiketlerini doğru okumak.',
 E'Besin etiketi okumak, sağlıklı beslenmenin en önemli adımlarından biridir.\n\n**Porsiyon Büyüklüğü**\nTüm değerler porsiyon başınadır. Paketteki toplam porsiyon sayısını kontrol edin.\n\n**Dikkat Edilmesi Gereken Maddeler:**\n- Doymuş yağ: Günlük %10''un altında tutun\n- Trans yağ: Mümkün olduğunca sıfır olmalı\n- Sodyum: Günlük 2300mg''ı aşmamalı\n- Eklenen şeker: Günlük 25g''ı geçmemeli\n\n**İçerik Listesi**\nEn baştaki madde en çok bulunan maddedir. İlk üç maddede şeker veya yağ varsa dikkatli olun.',
 'beslenme', 5, ARRAY['besin etiketi', 'market', 'bilinçli tüketim']),

('kolajen-ve-anti-aging',
 'Kolajen ve Anti-Aging: Beslenmeyle Yaşlanmayı Yavaşlatmak',
 'Kolajen üretimini destekleyen besinler ve beslenme stratejileriyle cilt sağlığınızı koruyun.',
 E'Kolajen, vücudumuzun en bol bulunan proteinidir ve cilt elastikiyeti, eklem sağlığı ve kemik gücü için kritik öneme sahiptir.\n\n**Kolajen Üretimini Destekleyen Besinler:**\n- C vitamini açısından zengin meyveler\n- Kemik suyu\n- Balık ve deniz ürünleri\n- Yumurta beyazı\n- Sarımsak ve soğan\n\n**Anti-Aging Beslenme Stratejileri:**\n1. Antioksidan zengin beslenme\n2. Omega-3 yağ asitleri\n3. Yeterli protein alımı\n4. Bol su tüketimi\n5. Probiyotik ve prebiyotik besinler',
 'saglik', 6, ARRAY['kolajen', 'anti-aging', 'cilt sağlığı']);

-- =============================================
-- Seed Data — Recipes
-- =============================================

INSERT INTO recipes (slug, title, description, prep_time, cook_time, servings, calories, protein, carbs, fat, ingredients, instructions, tags, category) VALUES
('spor-oncesi-smoothie',
 'Spor Öncesi Kardiyo Smoothie',
 'Kardiyo ve dayanıklılık antrenmanları öncesi enerji veren, sindirimi kolay smoothie tarifi.',
 5, 0, 1, 185, 8, 32, 3,
 ARRAY['1 orta boy muz', '1/2 su bardağı dondurulmuş böğürtlen', '1/2 su bardağı dondurulmuş çilek', '1 yemek kaşığı yulaf ezmesi', '150 ml badem sütü', '1 tatlı kaşığı bal'],
 ARRAY['Tüm malzemeleri blender''a ekleyin.', 'Pürüzsüz bir kıvam elde edene kadar 1-2 dakika blend edin.', 'Antrenman öncesi 30-45 dakika önce tüketin.', 'İsteğe bağlı olarak üzerine chia tohumu serpin.'],
 ARRAY['smoothie', 'dusuk-kalorili'], 'icecek'),

('glutensiz-dereotlu-pogaca',
 'Glutensiz Dereotlu Poğaça',
 'Çölyak hastaları ve gluten hassasiyeti olanlar için özel, lezzetli poğaça tarifi.',
 20, 25, 8, 145, 6, 18, 5,
 ARRAY['2 su bardağı glutensiz un karışımı', '1 adet yumurta', '1/2 su bardağı yoğurt', '3 yemek kaşığı zeytinyağı', '1 paket kabartma tozu', '1 demet taze dereotu', '100g beyaz peynir', 'Tuz', 'Üzeri için çörekotu ve susam'],
 ARRAY['Fırını 180°C''ye ısıtın.', 'Kuru malzemeleri bir kapta karıştırın.', 'Yumurta, yoğurt ve zeytinyağını ekleyip yoğurun.', 'İnce kıyılmış dereotu ve ufalanmış peyniri ekleyin.', 'Hamuru 8 eşit parçaya bölüp şekil verin.', 'Üzerine yumurta sarısı sürüp çörekotu ve susam serpin.', 'Önceden ısıtılmış fırında 20-25 dakika pişirin.'],
 ARRAY['glutensiz', 'atistirmalik'], 'atistirmalik'),

('protein-bar',
 'Ev Yapımı Protein Bar',
 '21g protein içeren, fırın gerektirmeyen, sağlıklı atıştırmalık.',
 15, 0, 6, 210, 21, 15, 8,
 ARRAY['2 ölçek vanilya proteintozu', '1/2 su bardağı yulaf ezmesi', '2 yemek kaşığı fıstık ezmesi', '2 yemek kaşığı bal', '1/4 su bardağı badem sütü', '30g bitter çikolata (eritilmiş)', 'Kabak çekirdeği ve ayçekirdeği'],
 ARRAY['Protein tozu ve yulaf ezmesini bir kapta karıştırın.', 'Fıstık ezmesi, bal ve badem sütünü ekleyin.', 'Elle sıkı bir hamur kıvamına getirin.', 'Pişirme kağıdı serili bir kaba bastırarak yayın.', 'Üzerine eritilmiş çikolatayı gezdirin.', 'Kabak ve ayçekirdeği serpin.', 'Buzdolabında 2 saat bekletin, dilimleyin.'],
 ARRAY['protein', 'atistirmalik'], 'atistirmalik'),

('dusuk-kalorili-browni',
 'Düşük Kalorili Browni',
 'Bir dilimi sadece 125 kalori! Diyet yaparken tatlı krizlerinize çözüm.',
 10, 20, 8, 125, 5, 16, 4,
 ARRAY['1 orta boy kabak (rendelenmiş)', '3 yemek kaşığı kakao', '2 yemek kaşığı bal veya hurma pekmezi', '1 adet yumurta', '1/2 su bardağı yulaf unu', '1/2 tatlı kaşığı kabartma tozu', '1 tutam tuz', 'Üzeri için ceviz'],
 ARRAY['Fırını 175°C''ye ısıtın.', 'Rendelenmiş kabağı bir kapta suyunu sıkarak bekletin.', 'Kakao, yumurta ve balı çırpın.', 'Kabak, yulaf unu ve kabartma tozunu ekleyin.', 'Yağlanmış kalıba dökün.', 'Üzerine ceviz kırıkları yerleştirin.', '18-20 dakika pişirin.'],
 ARRAY['dusuk-kalorili', 'tatli'], 'tatli'),

('yesil-detox-smoothie',
 'Yeşil Detox Smoothie',
 'Vücudunuzu arındıran, bağışıklık sistemini güçlendiren yeşil smoothie.',
 5, 0, 1, 120, 4, 22, 2,
 ARRAY['1 avuç ıspanak', '1/2 salatalık', '1/2 yeşil elma', '1 dilim zencefil', '1/2 limon suyu', '200 ml su', '1 tatlı kaşığı chia tohumu'],
 ARRAY['Ispanak ve salatalığı yıkayıp doğrayın.', 'Elmayı çekirdeklerini çıkarıp ekleyin.', 'Zencefil, limon suyu ve suyu ekleyin.', 'Pürüzsüz olana kadar blend edin.', 'Chia tohumunu ekleyip karıştırın.', 'Hemen tüketin.'],
 ARRAY['smoothie', 'vegan', 'dusuk-kalorili'], 'icecek'),

('kabizliga-cozum-tarifi',
 'Kabızlığa Çözüm Tarifi',
 'Doğal lifli besinlerle hazırlanan, bağırsak sağlığını destekleyen özel karışım.',
 10, 0, 4, 95, 3, 18, 2,
 ARRAY['4 adet kuru incir', '4 adet kuru kayısı', '2 adet kuru erik', '1 yemek kaşığı keten tohumu', '1 yemek kaşığı zeytinyağı', '200 ml ılık su'],
 ARRAY['Kuru meyveleri bir gece önceden ılık suda bekletin.', 'Sabah blender ile püre haline getirin.', 'Keten tohumu ve zeytinyağını ekleyin.', 'Kahvaltıdan 30 dakika önce aç karnına tüketin.', 'Günde en az 8 bardak su içmeyi unutmayın.'],
 ARRAY['vegan', 'dusuk-kalorili'], 'kahvalti');

-- =============================================
-- Seed Data — Success Stories
-- =============================================

INSERT INTO success_stories (name, age, initial_weight, current_weight, duration, quote, program) VALUES
('Ayşe K.', 34, 82, 65, '4 ay', 'Başak Hanım sayesinde sadece kilo vermekle kalmadım, yeme alışkanlıklarımı tamamen değiştirdim. Artık yemekle savaşmıyorum.', 'Kişiye Özel Diyet'),
('Mehmet Y.', 28, 105, 88, '6 ay', 'Sporcu beslenmesi programıyla hem kilo verdim hem performansım arttı. Antrenman öncesi ve sonrası beslenme düzenim mükemmel.', 'Sporcu Beslenmesi'),
('Zeynep A.', 42, 78, 64, '5 ay', 'PCOS tanısı aldıktan sonra Başak Hanım''a başvurdum. Hormon dengem düzeldi, kilolarım eridi. Hayatım değişti.', 'PCOS Beslenme'),
('Fatma D.', 31, 70, 58, '3 ay', 'Online diyet programıyla İstanbul dışından takip edilebildim. Her hafta düzenli kontrol ve motivasyon desteği aldım.', 'Online Diyet'),
('Can B.', 25, 95, 80, '5 ay', 'Duygusal yeme sorunumu fark etmem ve çözmem konusunda inanılmaz destek aldım. Artık stresle yemek yemeden başa çıkabiliyorum.', 'Duygusal Yeme Terapisi');

-- =============================================
-- Seed Data — Testimonials
-- =============================================

INSERT INTO testimonials (name, text, rating, program) VALUES
('Selin M.', 'Başak Hanım çok sabırlı ve anlayışlı. Hiçbir zaman yargılamadan, sevgiyle yaklaştı. Beslenme planları çok pratik ve uygulanabilir.', 5, 'Kişiye Özel Diyet'),
('Ahmet T.', 'İlk kez bir diyetisyenle çalışıyorum ve keşke daha önce başlasaymışım. Her şey bilimsel temelli, saçma sapan diyetler yok.', 5, 'Online Diyet'),
('Elif S.', 'Hamilelik döneminde beslenme danışmanlığı aldım. Hem ben hem bebeğim sağlıklı bir süreç geçirdik. Çok teşekkür ederim.', 5, 'Kişiye Özel Diyet'),
('Burak K.', 'Kurumsal eğitim programı ofisimizde büyük fark yarattı. Çalışanlar daha bilinçli beslenmeye başladı.', 4, 'Kurumsal Beslenme Eğitimi'),
('Deniz Ö.', 'Tarifler harika! Hem sağlıklı hem lezzetli yemekler yapmayı öğrendim. Ailecek uyguluyoruz.', 5, 'Kişiye Özel Diyet'),
('Gül A.', 'PCOS ile mücadelemde en büyük destekçim oldu. İlaçsız, sadece beslenme düzeniyle hormon değerlerim normale döndü.', 5, 'PCOS Beslenme');
