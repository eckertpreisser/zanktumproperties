import { Language } from './types';

export interface SanctumContent {
  why: {
    subtitle: string;
    title: string;
    intro: string;
    factors: { icon: string; title: string; desc: string }[];
  };
  artist: {
    subtitle: string;
    title: string;
    name: string;
    headline: string;
    intro: string[];
    techniques: { title: string; desc: string }[];
    highlight: string;
  };
  cleopatra: {
    subtitle: string;
    title: string;
    tagline: string;
    intro: string;
    specsTitle: string;
    specs: { label: string; value: string; note: string }[];
    featuresTitle: string;
    features: { icon: string; title: string; desc: string }[];
    visibilityTitle: string;
    visibilityIntro: string;
    visibilityHead: { point: string; distance: string; visibility: string };
    visibilityRows: { point: string; distance: string; visibility: string }[];
    harmony: string;
    visionTitle: string;
    visionText: string[];
    quote: string;
  };
  builder: {
    subtitle: string;
    title: string;
    name: string;
    headline: string;
    credentials: string[];
    intro: string[];
    expertise: string[];
    refTitle: string;
    refLocation: string;
    refDesc: string;
    refCta: string;
  };
  cta: {
    title: string;
    lines: string[];
    finalLine: string;
    btnPrimary: string;
    btnSecondary: string;
  };
  investment: {
    eyebrow: string;
    title: string;
    tagline: string;
    claims: string[];
    heroPrimary: string;
    heroSecondary: string;
    whyTitle: string;
    whyIntro: string;
    benefits: { icon: string; title: string; text: string }[];
    productsTitle: string;
    productsIntro: string;
    priceLabel: string;
    pointsTitle: string;
    products: {
      name: string;
      subtitle: string;
      price: string;
      pricePerM2: string;
      featuresTitle: string;
      points: string[];
      features: string[];
      cta: string;
    }[];
    marketTitle: string;
    marketIntro: string;
    marketHead: { city: string; y2020: string; y2026: string; cagr: string; status: string };
    marketRows: { city: string; y2020: string; y2026: string; cagr: string; status: string; hot?: boolean }[];
    thesisTitle: string;
    thesisText: string;
    contactTitle: string;
    contactIntro: string;
    contactEmailLabel: string;
    contactEmail: string;
    contactPhoneLabel: string;
    contactPhone: string;
    contactAddressLabel: string;
    contactAddress: string;
    footerLine: string;
  };
  nav: { why: string; villas: string; artist: string; builder: string };
}

const de: SanctumContent = {
  why: {
    subtitle: 'Warum ZANKTUM VILLAS',
    title: 'Mehr als Quadratmeter',
    intro:
      'Sie kaufen nicht nur Luxus. Sie kaufen Flucht, Kontrolle, Identität, Familie, Vermögensschutz und eine Geschichte, die Sie lebenslang erzählen werden.',
    factors: [
      { icon: '🏔️', title: 'Die Flucht', desc: '250 Meter Höhe = mentale Distanz von der Welt. Der Sonnenuntergang wird zu Ihrem täglichen Ritual. Sie sind nicht IN Alanya – Sie thronen ÜBER Alanya.' },
      { icon: '👁️', title: 'Die Kontrolle', desc: 'Panoptisches Sichtfeld: Burg, Hafen, Cleopatrastrand – alles im Blick. Privatsphäre durch räumliche Trennung. Sie sehen die Stadt, nicht die Stadt Sie.' },
      { icon: '✨', title: 'Die Identität', desc: '„Ich wohne neben der Burg" erzählt eine ganz andere Geschichte als „Ich bin in Alanya". Sie wohnen neben der Geschichte selbst.' },
      { icon: '👨‍👩‍👧‍👦', title: 'Die Familie', desc: '468 m² für Multi-Generationen-Treffen. Der Ort, wohin Ihre Familie jedes Jahr zurückkehrt. Sicher, exklusiv, bedeutungsvoll.' },
      { icon: '💰', title: 'Der Vermögensschutz', desc: 'Inflationsschutz in konkrete Geometrie. Die Burg wird in 50 Jahren noch da sein. 7–13 % Airbnb-Rendite möglich. Diversifikation in EUR.' },
      { icon: '🧘', title: 'Die Wellness', desc: 'Sonnenaufgang über dem Mittelmeer = biologische Medizin. Meerblick = Serotonin-Boost. Eukalyptus + Salzluft = blutdrucksenkend.' },
    ],
  },
  artist: {
    subtitle: 'Die künstlerische Vision',
    title: 'Margarete Eckert-Preisser',
    name: 'Margarete Eckert-Preisser',
    headline: 'Ein integriertes künstlerisches Universum',
    intro: [
      'Margarete Eckert-Preisser ist ein singuläres Phänomen der zeitgenössischen europäischen Kunst: eine umfassende, über vier Jahrzehnte gewachsene Praxis, geprägt von der radikalen Synthese mehrerer Medien – und von einer kompromisslosen kritischen Haltung gegenüber der Kommerzialisierung von Luxus und Designkultur.',
      'Anders als die meisten zeitgenössischen Künstler, die über Spezialisierung Anerkennung finden, verfolgt sie einen bewusst integrativen Ansatz: Encaustic-Malerei, Textiltradition, fotografische Praxis und monumentale Skulptur werden konzeptionell und materiell miteinander verbunden – nicht als aufeinanderfolgende Phasen, sondern als parallele Untersuchungen eines gemeinsamen philosophischen Anliegens.',
    ],
    techniques: [
      { title: 'Encaustic-Malerei (2018–2025)', desc: 'Wachsbasierte Schichttechnik in der Tradition antiker Verfahren. Die zeitliche Eigenart des Materials – seine Empfindlichkeit gegenüber Wärme, Alterung und Wandel – wird zur philosophischen Metapher für Zeit und Vergänglichkeit.' },
      { title: 'Handgeknüpfte Waldteppiche (2017–2025)', desc: 'Künstlerisch gestaltete Meisterwerke, die architektonische Form und Textilkunst verbinden. Jeder Teppich erzählt eine Geschichte – eine Fusion aus Architektur- und Textiltradition im europäischen Handwerkserbe.' },
      { title: 'Cyanotypie-Fotografie (2018–2026)', desc: 'Fotografische Technik mit lichtempfindlichen Chemikalien. Die allmähliche chemische Transformation schreibt der Cyanotypie ein zeitliches Bewusstsein ein – sie spiegelt die Auseinandersetzung mit Vergänglichkeit und materiellem Wandel.' },
      { title: 'Portable Sculptures (fortlaufend)', desc: 'Ein neues künstlerisches Genre, das alle vorangegangenen Medien zusammenführt: einzigartige, tragbare Kunstplastiken – eine komprimierte Welt der Kunst mit spiritueller Präsenz. Margaretes Signatur-Technik.' },
    ],
    highlight:
      'Das Gesamtwerk: Eine Villa, die nicht nur bewohnt, sondern erlebt wird. Jeder Raum atmet Kunst. Jeder Moment ist ästhetisch durchdacht.',
  },
  builder: {
    subtitle: 'Die Baumeisterschaft',
    title: 'Bilgin Aykurt',
    name: 'Bilgin Aykurt',
    headline: 'Meisterhafte Qualität in jedem Detail',
    credentials: [
      'Seit 1990: Bauleiter und Baumeister',
      'Zahllose Luxus-Villen-Projekte erfolgreich realisiert',
      'Kompetenz in allen Gewerken',
      'Garantor für exquisite Qualität',
      'Persönliche Überwachung jeder Phase',
    ],
    intro: [
      'Bilgin Aykurt hat das Vertrauen von hunderten wohlhabenden Kunden gewonnen – nicht durch Marketing, sondern durch Perfektion. Er wählt jedes Baumaterial mit künstlerischem Blick und überwacht jede Bauausführung mit meisterlicher Strenge.',
    ],
    expertise: [
      'Materialwahl – nur hochwertige, langlebige Materialien',
      'Handwerkskunst – erfahrene Fachleute, keine Kompromisse',
      'Timing – exakte Planung, verlässliche Lieferung',
      'Detailorientierung – der Unterschied zwischen gut und meisterhaft',
      'Zusammenarbeit mit Margarete Eckert-Preisser, nahtlos',
    ],
    refTitle: 'Referenzobjekt – Besichtigung möglich',
    refLocation: 'Bektas Tepe Malessi No 121 · ~150 m Luftlinie',
    refDesc:
      'Bilgin Aykurt hat gerade ein Referenzbauwerk in unmittelbarer Nähe fertiggestellt. Sie können vor Ort einen eigenen Eindruck über die Wertigkeit erlangen. Das ist nicht nur ein Haus – das ist ein Beweis von Meisterschaft.',
    refCta: 'Besichtigung vereinbaren',
  },
  cta: {
    title: 'Das Zeitfenster ist JETZT',
    lines: [
      'TRY ist schwach – 27 % günstiger für EUR-Käufer als 2022.',
      'Airbnb-Lizenzen sind klar geregelt seit 01.01.2024.',
      'Geopolitik ist unsicher – Safe-Haven-Nachfrage steigt.',
    ],
    finalLine: 'In drei Jahren werden Sie diese Preise nicht mehr sehen.',
    btnPrimary: 'Noch heute Kontakt aufnehmen',
    btnSecondary: 'Villen ansehen',
  },
  investment: {
    eyebrow: 'Investment',
    title: 'Luxus-Investitionen an der Türkischen Riviera',
    tagline: 'Dokumentierte Wertspeicher in der Premiumlage Bektaş, Alanya.',
    claims: ['Marktvalidiert', '7–8 % CAGR dokumentiert', 'Premium-Qualität'],
    heroPrimary: 'Jetzt entdecken',
    heroSecondary: 'Kostenlose Beratung',
    whyTitle: 'Warum ZANKTUM VILLAS?',
    whyIntro: 'ZANKTUM VILLAS bietet nicht einfach Immobilien. Wir schaffen dokumentierte Wertspeicher in der Premiumlage Bektaş, Alanya.',
    benefits: [
      { icon: '🏗️', title: 'Premium-Architektur', text: 'Moderne, zeitlose Designs von Bilgin Aykurt – 30+ Jahre Erfahrung im Luxusbau.' },
      { icon: '📈', title: '7–8 % CAGR', text: 'Dokumentierte Wertsteigerung basierend auf 18 Monaten Marktdaten von 10+ Vergleichsobjekten.' },
      { icon: '€', title: 'EUR-Fixpreis', text: 'Keine TRY-Volatilität. Inflationsschutz. Europäische Käufer ohne Währungsrisiko.' },
      { icon: '🎨', title: 'Kunstobjekte (BETA)', text: 'Optional: Werke von Margarete Eckert-Preisser – weltbekannte Künstlerin.' },
      { icon: '🏖️', title: 'Prime Location', text: '250 m über Alanya, Burg-Sicht, Cleopatra-Strand, kein Touristentrubel.' },
      { icon: '🛡️', title: 'Erdbebensicher', text: 'Neueste Ingenieurnormen, flexible Rahmenstrukturen, 50+ Jahre Lebensdauer.' },
    ],
    productsTitle: 'Unsere Investmentprodukte',
    productsIntro: 'Zwei exklusive 468 m²-Villen in Bektaş. Beide marktvalidiert, realistische Preise, dokumentierte Renditen.',
    priceLabel: 'Kaufpreis 2026',
    pointsTitle: 'Investment-Eckpunkte',
    products: [
      {
        name: 'ZANKTUM ALPHA',
        subtitle: 'Premium Innenarchitektur Edition',
        price: '€2.600.640',
        pricePerM2: '€5.557/m²',
        featuresTitle: 'Ausstattung',
        points: [
          'Verkaufspreis 2031: ~€3.800.000',
          'Wertsteigerung: €1.200.000 (+46 %)',
          'CAGR: +7,9 %',
          'Mietrendite: 3,0 % p.a. (€78.000)',
          '6-Jahres Gewinn: €1.532.000',
          'ROI gesamt: +59 %',
        ],
        features: [
          '468 m² Wohnfläche',
          'Modernes Premium-Design',
          'Privater Pool & Terrasse',
          'Smart Home Integration',
          'Vollmöbliert',
          'Erdbebensicher',
        ],
        cta: 'Infos anfordern',
      },
      {
        name: 'ZANKTUM BETA',
        subtitle: 'Kunstmeisterwerk Edition',
        price: '€4.274.400',
        pricePerM2: '€9.133/m² (mit Kunstobjekten)',
        featuresTitle: 'Besonderheiten',
        points: [
          'Verkaufspreis 2031: ~€6.411.000',
          'Wertsteigerung: €2.137.000 (+50 %)',
          'CAGR: +8,3 %',
          'Mietrendite: 2,8 % p.a. (€119.700)',
          '6-Jahres Gewinn: €2.257.000',
          'ROI gesamt: +70 %',
        ],
        features: [
          '468 m² Wohnfläche (wie ALPHA)',
          'Ultra-Premium Ausstattung',
          'Kunstobjekte von Margarete Eckert-Preisser',
          'Weltbekannte Künstlerin (78 Jahre)',
          'Legacy-Kunstsammlung',
          'Wertstabilität durch Kunstobjekte',
        ],
        cta: 'Exklusive Anfrage',
      },
    ],
    marketTitle: 'Marktanalyse: Bektaş ist unterbewertet',
    marketIntro: 'Bektaş wird zum nächsten Belek. Heute noch 21 % unter Belek bewertet – in 3 Jahren 30–40 % teurer.',
    marketHead: { city: 'Stadt', y2020: '2020 €/m²', y2026: '2026 €/m²', cagr: 'CAGR', status: 'Status' },
    marketRows: [
      { city: 'Belek', y2020: '€1.200', y2026: '€2.600', cagr: '+14,2 %', status: 'Reif (zukünftig +5–6 %)' },
      { city: 'Bektaş (ZANKTUM)', y2020: '€950', y2026: '€2.050', cagr: '+12,8 %', status: '🚀 Emporkömmling (+14–18 %)', hot: true },
      { city: 'Kemer', y2020: '€1.100', y2026: '€2.360', cagr: '+13,3 %', status: 'Reif' },
      { city: 'Side', y2020: '€1.050', y2026: '€2.270', cagr: '+13,2 %', status: 'Reif' },
    ],
    thesisTitle: 'Die Bektaş-These',
    thesisText: 'Bektaş zeigt +12,8 % CAGR bei 21 % Discount vs. Belek. Das ist ein klassisches Catch-up-Szenario. Während Belek nur noch +5–6 % CAGR wächst (gesättigt), wird Bektaş in 3 Jahren „entdeckt" sein.',
    contactTitle: 'Exklusive Beratung',
    contactIntro: 'Interessiert? Unsere Experten beraten Sie gerne.',
    contactEmailLabel: 'E-Mail',
    contactEmail: 'info@sanctumvillas.com',
    contactPhoneLabel: 'Telefon',
    contactPhone: '+90 (242) 511 0000',
    contactAddressLabel: 'Adresse',
    contactAddress: 'Bektaş, Alanya 07400, Türkei',
    footerLine: 'ZANKTUM VILLAS | Bektaş, Alanya | Marktvalidierte Investitionsanalyse',
  },
  cleopatra: {
    subtitle: 'Das Wahrzeichen-Kunstwerk',
    title: 'Die Z-Cleopatra',
    tagline: 'Eine 4,5 Meter hohe Wahrzeichen-Skulptur, die Alanya von der Grenze der VILLA BETA aus begrüßt.',
    intro:
      'Die Z-Cleopatra ist nicht nur eine Skulptur, die ein Anwesen schmückt. Sie ist ein monumentales Kunstwerk in der Tradition Christos – eine Transformation klassischer Form durch zeitgenössische Farbe und Material. Entworfen von Margarete Eckert-Preisser und konstruiert von Bilgin Aykurt, ist sie als Wahrzeichen positioniert, sichtbar von Hafen, Burg und Stränden Alanyas – und verkündet ZANKTUM als die Verbindung von Luxus, Kultur und künstlerischer Vision.',
    specsTitle: 'Technische Daten',
    specs: [
      { label: 'Höhe', value: '4,5 m', note: '+ 0,5 m Sockel = 5 m gesamt' },
      { label: 'Form', value: 'Klassisch', note: 'Vollständige Cleopatra-Büste, Oberkörper' },
      { label: 'Material', value: 'Komposit', note: 'Fiberglas-Komposit, Hochglanz-Epoxid' },
      { label: 'Farben', value: 'Pop-Art', note: 'Magenta, Cyan, Gold und Orange' },
      { label: 'Akzent', value: 'Z-Krone', note: 'Geometrisch-pharaonische Fusion' },
      { label: 'Beleuchtung', value: 'Gold-LED', note: 'Anstrahlung für Sichtbarkeit bei Nacht' },
    ],
    featuresTitle: 'Gestaltungsmerkmale',
    features: [
      { icon: '👑', title: 'Z-Kronen-Integration', desc: 'Die Krone ist nicht aufgesetzt – sie ist geometrisch mit der klassischen Form verschmolzen und vereint die ZANKTUM-Markenidentität mit pharaonischer Architektur.' },
      { icon: '🎨', title: 'Pop-Art-Transformation', desc: 'Eine von Warhol inspirierte Farbpalette feiert die zeitgenössische Vision und ehrt zugleich die klassische Form. Kein Spott – künstlerische Neuinterpretation.' },
      { icon: '✨', title: 'Nacht-Illumination', desc: 'Gold-LED-Anstrahlung sorgt für Sichtbarkeit von Hafen und Stränden bei Nacht und schafft eine ätherische, unverwechselbare Silhouette.' },
      { icon: '🔧', title: 'Erdbebensichere Technik', desc: 'Erdbebensichere Konstruktion nach türkischen Baunormen. Statik konstruiert von Bilgin Aykurt.' },
      { icon: '🌍', title: 'Öffentlich-private Grenze', desc: 'Die Skulptur steht an der Grundstücksgrenze und wendet sich doch an die ganze Stadt. Schönheit ist öffentlich; Kunst gehört allen.' },
      { icon: '🏛️', title: 'Klassisches Fundament', desc: 'Eine vollständige Cleopatra-Büste ehrt die Antike – transformiert, nicht ausgelöscht, durch zeitgenössische Farbe und den transparenten Schleier der 1930er.' },
    ],
    visibilityTitle: 'Sichtbarkeit als Wahrzeichen',
    visibilityIntro: 'Die Höhe von 4,5 Metern wurde berechnet, um optimale Sichtbarkeit von wichtigen Aussichtspunkten Alanyas zu gewährleisten, ohne die Architektur der VILLA BETA zu erdrücken.',
    visibilityHead: { point: 'Aussichtspunkt', distance: 'Entfernung', visibility: 'Sichtbarkeit' },
    visibilityRows: [
      { point: 'Hafen Alanya', distance: '8–10 km', visibility: 'Sichtbar' },
      { point: 'Cleopatra-Strand', distance: '6–7 km', visibility: 'Ausgezeichnet' },
      { point: 'Burg von Alanya', distance: '3 km', visibility: 'Markant' },
      { point: 'Mittelmeer (Boote)', distance: '10–12 km vor der Küste', visibility: 'Ausgezeichnet' },
    ],
    harmony: 'Proportionale Harmonie: Das Verhältnis von 43 % (4,5 m Skulptur zu 10,5 m Villa) folgt dem Prinzip des Goldenen Schnitts – die Skulptur bereichert die VILLA BETA, ohne sie zu überwältigen.',
    visionTitle: 'Künstlerische Vision von Margarete Eckert-Preisser',
    visionText: [
      'Die Z-Cleopatra ist Margaretes monumentale Antwort auf eine einzige Frage: „Was geschieht, wenn wir die Antike in zeitgenössische Farbe hüllen?"',
      'Wie Christos verhüllte Monumente zerstört diese Skulptur die klassische Form nicht – sie enthüllt sie. Die Pop-Art-Palette ist Feier, nicht Spott; der transparente Schleier verleiht kulturelle Raffinesse und erzählerische Tiefe.',
    ],
    quote: 'Schönheit ist nicht nur innen. Schönheit ist öffentlich. Schönheit ist jetzt.',
  },
  nav: { why: 'Warum Zanktum', villas: 'Villen', artist: 'Künstler', builder: 'Baumeister' },
};

const en: SanctumContent = {
  why: {
    subtitle: 'Why ZANKTUM VILLAS',
    title: 'More than Square Metres',
    intro:
      'You are not just buying luxury. You are buying escape, control, identity, family, wealth preservation and a story you will tell for the rest of your life.',
    factors: [
      { icon: '🏔️', title: 'The Escape', desc: '250 metres of altitude = mental distance from the world. Sunset becomes your daily ritual. You are not IN Alanya – you reign ABOVE Alanya.' },
      { icon: '👁️', title: 'The Control', desc: 'Panoptic view: castle, harbour, Cleopatra Beach – all in sight. Privacy through spatial separation. You see the city, not the other way around.' },
      { icon: '✨', title: 'The Identity', desc: '"I live next to the castle" tells a very different story than "I’m in Alanya". You live next to history itself.' },
      { icon: '👨‍👩‍👧‍👦', title: 'The Family', desc: '468 m² for multi-generational gatherings. The place your family returns to every year. Secure, exclusive, meaningful.' },
      { icon: '💰', title: 'Wealth Preservation', desc: 'Inflation hedge in concrete geometry. The castle will still stand in 50 years. 7–13% Airbnb yield possible. Diversification in EUR.' },
      { icon: '🧘', title: 'The Wellness', desc: 'Sunrise over the Mediterranean = biological medicine. Sea view = serotonin boost. Eucalyptus + salt air = blood-pressure lowering.' },
    ],
  },
  artist: {
    subtitle: 'The Artistic Vision',
    title: 'Margarete Eckert-Preisser',
    name: 'Margarete Eckert-Preisser',
    headline: 'An integrated artistic universe',
    intro: [
      'Margarete Eckert-Preisser represents a singular phenomenon in contemporary European art: a comprehensive, four-decade practice characterised by radical synthesis across multiple mediums, coupled with an uncompromising critical stance toward luxury commodification and design culture.',
      'Unlike most contemporary artists who achieve recognition through specialisation, Eckert-Preisser pursues a deliberately integrative approach – connecting encaustic painting, textile tradition, photographic practice and monumental sculpture conceptually and materially. These are not sequential career phases but parallel investigations of unified philosophical concerns.',
    ],
    techniques: [
      { title: 'Encaustic Painting (2018–2025)', desc: 'Wax-based layering technique drawing on ancient traditions. The material\'s inherent temporality – its susceptibility to heat, aging and transformation – becomes a philosophical metaphor for time and impermanence.' },
      { title: 'Hand-Knotted Waldteppiche (2017–2025)', desc: 'Artistically designed masterpieces synthesising architectonic form and textile art. Each carpet tells a story – a fusion of architectural and textile traditions rooted in European craftwork heritage.' },
      { title: 'Cyanotype Photography (2018–2026)', desc: 'A photographic technique using light-sensitive chemicals. The gradual chemical transformation embeds a temporal consciousness, mirroring a concern with impermanence and material change.' },
      { title: 'Portable Sculptures (ongoing)', desc: 'A new artistic genre synthesising all prior mediums: unique portable art-sculptures – a compressed world of art with a spiritual presence. Margarete\'s signature technique.' },
    ],
    highlight:
      'The total work: a villa that is not just inhabited but experienced. Every room breathes art. Every moment is aesthetically considered.',
  },
  builder: {
    subtitle: 'The Master Builder',
    title: 'Bilgin Aykurt',
    name: 'Bilgin Aykurt',
    headline: 'Masterful quality in every detail',
    credentials: [
      'Since 1990: site manager and master builder',
      'Countless luxury villa projects successfully delivered',
      'Competence across every trade',
      'Guarantor of exquisite quality',
      'Personal supervision at every stage',
    ],
    intro: [
      'Bilgin Aykurt has earned the trust of hundreds of wealthy clients – not through marketing, but through perfection. He selects each building material with an artist\'s eye and oversees every construction step with masterful rigour.',
    ],
    expertise: [
      'Material choice – only premium, durable materials',
      'Craftsmanship – experienced specialists, no compromises',
      'Timing – exact planning, reliable delivery',
      'Detail orientation – the difference between good and masterful',
      'Seamless collaboration with Margarete Eckert-Preisser',
    ],
    refTitle: 'Reference project – visit possible',
    refLocation: 'Bektas Tepe Malessi No 121 · ~150 m as the crow flies',
    refDesc:
      'Bilgin Aykurt has just completed a reference building nearby. You can form your own impression of the build quality on site. This is not just a house – it is a proof of mastery.',
    refCta: 'Arrange a viewing',
  },
  cta: {
    title: 'The Window is NOW',
    lines: [
      'TRY is weak – 27% cheaper for EUR buyers than in 2022.',
      'Airbnb licences have been clearly regulated since 01.01.2024.',
      'Geopolitics are uncertain – safe-haven demand is rising.',
    ],
    finalLine: 'In three years these prices will be gone.',
    btnPrimary: 'Get in touch today',
    btnSecondary: 'View the villas',
  },
  investment: {
    eyebrow: 'Investment',
    title: 'Luxury investments on the Turkish Riviera',
    tagline: 'Documented stores of value in the prime location of Bektaş, Alanya.',
    claims: ['Market-validated', '7–8% CAGR documented', 'Premium quality'],
    heroPrimary: 'Discover now',
    heroSecondary: 'Free consultation',
    whyTitle: 'Why ZANKTUM VILLAS?',
    whyIntro: 'ZANKTUM VILLAS does not simply offer real estate. We create documented stores of value in the prime location of Bektaş, Alanya.',
    benefits: [
      { icon: '🏗️', title: 'Premium architecture', text: 'Modern, timeless designs by Bilgin Aykurt – 30+ years of experience in luxury construction.' },
      { icon: '📈', title: '7–8% CAGR', text: 'Documented appreciation based on 18 months of market data from 10+ comparable properties.' },
      { icon: '€', title: 'Fixed EUR price', text: 'No TRY volatility. Inflation protection. European buyers with no currency risk.' },
      { icon: '🎨', title: 'Art objects (BETA)', text: 'Optional: works by Margarete Eckert-Preisser – world-renowned artist.' },
      { icon: '🏖️', title: 'Prime location', text: '250 m above Alanya, castle view, Cleopatra Beach, no tourist bustle.' },
      { icon: '🛡️', title: 'Earthquake-safe', text: 'Latest engineering standards, flexible frame structures, 50+ years of service life.' },
    ],
    productsTitle: 'Our investment products',
    productsIntro: 'Two exclusive 468 m² villas in Bektaş. Both market-validated, realistic prices, documented returns.',
    priceLabel: 'Purchase price 2026',
    pointsTitle: 'Investment highlights',
    products: [
      {
        name: 'ZANKTUM ALPHA',
        subtitle: 'Premium Interior Architecture Edition',
        price: '€2,600,640',
        pricePerM2: '€5,557/m²',
        featuresTitle: 'Features',
        points: [
          'Sale price 2031: ~€3,800,000',
          'Appreciation: €1,200,000 (+46%)',
          'CAGR: +7.9%',
          'Rental yield: 3.0% p.a. (€78,000)',
          '6-year profit: €1,532,000',
          'Total ROI: +59%',
        ],
        features: [
          '468 m² living space',
          'Modern premium design',
          'Private pool & terrace',
          'Smart home integration',
          'Fully furnished',
          'Earthquake-safe',
        ],
        cta: 'Request information',
      },
      {
        name: 'ZANKTUM BETA',
        subtitle: 'Art Masterpiece Edition',
        price: '€4,274,400',
        pricePerM2: '€9,133/m² (with art objects)',
        featuresTitle: 'Distinctive features',
        points: [
          'Sale price 2031: ~€6,411,000',
          'Appreciation: €2,137,000 (+50%)',
          'CAGR: +8.3%',
          'Rental yield: 2.8% p.a. (€119,700)',
          '6-year profit: €2,257,000',
          'Total ROI: +70%',
        ],
        features: [
          '468 m² living space (like ALPHA)',
          'Ultra-premium fittings',
          'Art objects by Margarete Eckert-Preisser',
          'World-renowned artist (age 78)',
          'Legacy art collection',
          'Value stability through art objects',
        ],
        cta: 'Exclusive enquiry',
      },
    ],
    marketTitle: 'Market analysis: Bektaş is undervalued',
    marketIntro: 'Bektaş is becoming the next Belek. Still 21% below Belek today – 30–40% more expensive in 3 years.',
    marketHead: { city: 'City', y2020: '2020 €/m²', y2026: '2026 €/m²', cagr: 'CAGR', status: 'Status' },
    marketRows: [
      { city: 'Belek', y2020: '€1,200', y2026: '€2,600', cagr: '+14.2%', status: 'Mature (going forward +5–6%)' },
      { city: 'Bektaş (ZANKTUM)', y2020: '€950', y2026: '€2,050', cagr: '+12.8%', status: '🚀 Up-and-comer (+14–18%)', hot: true },
      { city: 'Kemer', y2020: '€1,100', y2026: '€2,360', cagr: '+13.3%', status: 'Mature' },
      { city: 'Side', y2020: '€1,050', y2026: '€2,270', cagr: '+13.2%', status: 'Mature' },
    ],
    thesisTitle: 'The Bektaş thesis',
    thesisText: 'Bektaş shows +12.8% CAGR at a 21% discount vs. Belek. This is a classic catch-up scenario. While Belek now grows only +5–6% CAGR (saturated), Bektaş will be "discovered" within 3 years.',
    contactTitle: 'Exclusive consultation',
    contactIntro: 'Interested? Our experts will be glad to advise you.',
    contactEmailLabel: 'Email',
    contactEmail: 'info@sanctumvillas.com',
    contactPhoneLabel: 'Phone',
    contactPhone: '+90 (242) 511 0000',
    contactAddressLabel: 'Address',
    contactAddress: 'Bektaş, Alanya 07400, Turkey',
    footerLine: 'ZANKTUM VILLAS | Bektaş, Alanya | Market-validated investment analysis',
  },
  cleopatra: {
    subtitle: 'The Landmark Artwork',
    title: 'The Z-Cleopatra',
    tagline: 'A 4.5-metre landmark sculpture that greets Alanya from the boundary of VILLA BETA.',
    intro:
      'The Z-Cleopatra is not merely a sculpture adorning a property. It is a monumental artwork in the Christo tradition — a transformation of classical form through contemporary colour and material. Designed by Margarete Eckert-Preisser and engineered by Bilgin Aykurt, it is positioned as a landmark visible from Alanya\'s harbour, castle and beaches, announcing ZANKTUM as the integration of luxury, culture and artistic vision.',
    specsTitle: 'Technical Specifications',
    specs: [
      { label: 'Height', value: '4.5 m', note: '+ 0.5 m pedestal = 5 m total' },
      { label: 'Form', value: 'Classical', note: 'Complete Cleopatra bust, upper torso' },
      { label: 'Material', value: 'Composite', note: 'Fibreglass composite, high-gloss epoxy' },
      { label: 'Colours', value: 'Pop-Art', note: 'Magenta, cyan, gold and orange palette' },
      { label: 'Accent', value: 'Z-Crown', note: 'Geometric and pharaonic fusion' },
      { label: 'Lighting', value: 'Gold LED', note: 'Uplighting for night visibility' },
    ],
    featuresTitle: 'Design Features',
    features: [
      { icon: '👑', title: 'Z-Crown Integration', desc: 'The crown is not appended — it is geometrically integrated with the classical form, merging ZANKTUM branding with pharaonic architecture.' },
      { icon: '🎨', title: 'Pop-Art Transformation', desc: 'A Warhol-inspired palette celebrates contemporary vision while honouring the classical form. Not mockery — artistic reinterpretation.' },
      { icon: '✨', title: 'Night Illumination', desc: 'Gold LED uplighting ensures visibility from harbour and beaches at night, creating an ethereal, unmistakable silhouette.' },
      { icon: '🔧', title: 'Seismic Engineering', desc: 'Earthquake-resistant design following Turkish building codes. Structural integrity engineered by Bilgin Aykurt.' },
      { icon: '🌍', title: 'Public-Private Boundary', desc: 'The sculpture stands at the property boundary yet addresses the entire city. Beauty is public; art belongs to everyone.' },
      { icon: '🏛️', title: 'Classical Foundation', desc: 'A complete Cleopatra bust honours antiquity — transformed, not erased, by contemporary colour and the transparent 1930s veil.' },
    ],
    visibilityTitle: 'Landmark Visibility',
    visibilityIntro: 'The 4.5-metre height was calculated to ensure optimal visibility from key vantage points across Alanya without overwhelming the architecture of VILLA BETA.',
    visibilityHead: { point: 'Viewing Point', distance: 'Distance', visibility: 'Visibility' },
    visibilityRows: [
      { point: 'Alanya Harbour', distance: '8–10 km', visibility: 'Visible' },
      { point: 'Cleopatra Beach', distance: '6–7 km', visibility: 'Excellent' },
      { point: 'Alanya Castle', distance: '3 km', visibility: 'Prominent' },
      { point: 'Mediterranean (boats)', distance: '10–12 km offshore', visibility: 'Excellent' },
    ],
    harmony: 'Proportional harmony: the 43% ratio (4.5 m sculpture to 10.5 m villa) follows the golden-section principle — the sculpture enhances VILLA BETA without overwhelming it.',
    visionTitle: 'Artistic Vision by Margarete Eckert-Preisser',
    visionText: [
      'The Z-Cleopatra is Margarete\'s monumental response to a single question: "What happens when we wrap antiquity in contemporary colour?"',
      'Like Christo\'s wrapped monuments, this sculpture does not destroy the classical form — it reveals it. The Pop-Art palette is celebration, not mockery; the transparent veil adds cultural sophistication and narrative depth.',
    ],
    quote: 'Beauty is not just inside. Beauty is public. Beauty is now.',
  },
  nav: { why: 'Why Zanktum', villas: 'Villas', artist: 'Artist', builder: 'Builder' },
};

// Compact translations for the remaining languages. We translate the headings,
// short factor lines and CTA; longer paragraphs fall back to the English originals
// (acceptable for a v1 launch; can be polished later).
const compactFromEn = (override: Partial<SanctumContent>): SanctumContent => ({ ...en, ...override });

const ar: SanctumContent = compactFromEn({
  why: { ...en.why,
    subtitle: 'لماذا زانكتم فيلاز',
    title: 'أكثر من مجرد أمتار مربعة',
    intro: 'أنتم لا تشترون فقط فخامة – بل تشترون الهروب، السيطرة، الهوية، العائلة، حماية الثروة، وقصة سترونها مدى الحياة.',
    factors: en.why.factors.map((f, i) => ({
      icon: f.icon,
      title: ['الهروب','السيطرة','الهوية','العائلة','حماية الثروة','العافية'][i],
      desc: f.desc,
    })),
  },
  artist: { ...en.artist, subtitle: 'الرؤية الفنية', headline: 'عالم فني متكامل' },
  builder: { ...en.builder, subtitle: 'أستاذ البناء', headline: 'جودة بارعة في كل تفصيل' },
  cta: { ...en.cta, title: 'الوقت المناسب هو الآن', btnPrimary: 'تواصل معنا اليوم', btnSecondary: 'استعرض الفيلات' },
  investment: { ...en.investment,
    eyebrow: 'الاستثمار',
    title: 'استثمارات فاخرة على الريفيرا التركية',
    tagline: 'مخازن قيمة موثّقة في موقع بكتاش المتميز، ألانيا.',
    claims: ['مُثبَت سوقيًا', 'نمو سنوي موثّق 7–8٪', 'جودة فاخرة'],
    heroPrimary: 'اكتشف الآن',
    heroSecondary: 'استشارة مجانية',
    whyTitle: 'لماذا زانكتم فيلاز؟',
    productsTitle: 'منتجاتنا الاستثمارية',
    marketTitle: 'تحليل السوق: بكتاش مُقوَّمة بأقل من قيمتها',
    thesisTitle: 'أطروحة بكتاش',
    contactTitle: 'استشارة حصرية',
  },
  nav: { why: 'لماذا زانكتم', villas: 'الفيلات', artist: 'الفنانة', builder: 'البنّاء' },
});

const ru: SanctumContent = compactFromEn({
  why: { ...en.why,
    subtitle: 'Почему ZANKTUM VILLAS',
    title: 'Больше, чем квадратные метры',
    intro: 'Вы покупаете не только роскошь. Вы покупаете побег, контроль, идентичность, семью, защиту капитала и историю, которую будете рассказывать всю жизнь.',
    factors: en.why.factors.map((f, i) => ({
      icon: f.icon,
      title: ['Побег','Контроль','Идентичность','Семья','Защита капитала','Велнес'][i],
      desc: f.desc,
    })),
  },
  artist: { ...en.artist, subtitle: 'Художественное видение', headline: 'Целостная художественная вселенная' },
  builder: { ...en.builder, subtitle: 'Мастерство строительства', headline: 'Виртуозное качество в каждой детали' },
  cta: { ...en.cta, title: 'Время — сейчас', btnPrimary: 'Связаться сегодня', btnSecondary: 'Посмотреть виллы' },
  investment: { ...en.investment,
    eyebrow: 'Инвестиции',
    title: 'Премиальные инвестиции на Турецкой Ривьере',
    tagline: 'Документированные средства сбережения в премиальной локации Бекташ, Алания.',
    claims: ['Подтверждено рынком', 'Документированный CAGR 7–8 %', 'Премиальное качество'],
    heroPrimary: 'Узнать больше',
    heroSecondary: 'Бесплатная консультация',
    whyTitle: 'Почему ZANKTUM VILLAS?',
    productsTitle: 'Наши инвестиционные продукты',
    marketTitle: 'Анализ рынка: Бекташ недооценён',
    thesisTitle: 'Тезис о Бекташе',
    contactTitle: 'Эксклюзивная консультация',
  },
  nav: { why: 'Почему Zanktum', villas: 'Виллы', artist: 'Художница', builder: 'Строитель' },
});

const uk: SanctumContent = compactFromEn({
  why: { ...en.why,
    subtitle: 'Чому ZANKTUM VILLAS',
    title: 'Більше, ніж квадратні метри',
    intro: 'Ви купуєте не лише розкіш. Ви купуєте втечу, контроль, ідентичність, родину, захист капіталу та історію, яку розповідатимете все життя.',
    factors: en.why.factors.map((f, i) => ({
      icon: f.icon,
      title: ['Втеча','Контроль','Ідентичність','Родина','Захист капіталу','Велнес'][i],
      desc: f.desc,
    })),
  },
  artist: { ...en.artist, subtitle: 'Художня візія', headline: 'Цілісний мистецький всесвіт' },
  builder: { ...en.builder, subtitle: 'Майстерність будівництва', headline: 'Віртуозна якість у кожній деталі' },
  cta: { ...en.cta, title: 'Час — зараз', btnPrimary: 'Зв\'язатися сьогодні', btnSecondary: 'Переглянути вілли' },
  investment: { ...en.investment,
    eyebrow: 'Інвестиції',
    title: 'Преміальні інвестиції на Турецькій Рив\'єрі',
    tagline: 'Документовані засоби збереження вартості в преміальній локації Бекташ, Аланія.',
    claims: ['Підтверджено ринком', 'Документований CAGR 7–8 %', 'Преміальна якість'],
    heroPrimary: 'Дізнатися більше',
    heroSecondary: 'Безкоштовна консультація',
    whyTitle: 'Чому ZANKTUM VILLAS?',
    productsTitle: 'Наші інвестиційні продукти',
    marketTitle: 'Аналіз ринку: Бекташ недооцінений',
    thesisTitle: 'Теза про Бекташ',
    contactTitle: 'Ексклюзивна консультація',
  },
  nav: { why: 'Чому Zanktum', villas: 'Вілли', artist: 'Художниця', builder: 'Будівничий' },
});

const zh: SanctumContent = compactFromEn({
  why: { ...en.why,
    subtitle: '为什么选择 ZANKTUM VILLAS',
    title: '远不止于平方米',
    intro: '您购买的不仅是奢华，而是逃离、掌控、身份、家庭、财富守护，以及一段值得讲一辈子的故事。',
    factors: en.why.factors.map((f, i) => ({
      icon: f.icon,
      title: ['逃离','掌控','身份','家庭','财富守护','身心健康'][i],
      desc: f.desc,
    })),
  },
  artist: { ...en.artist, subtitle: '艺术愿景', headline: '一个整合的艺术宇宙' },
  builder: { ...en.builder, subtitle: '建造大师', headline: '每一处细节都精湛非凡' },
  cta: { ...en.cta, title: '机遇就在当下', btnPrimary: '立即联系我们', btnSecondary: '查看别墅' },
  investment: { ...en.investment,
    eyebrow: '投资',
    title: '土耳其里维埃拉的奢华投资',
    tagline: '在贝克塔什（阿拉尼亚）黄金地段打造有据可查的价值储藏。',
    claims: ['市场验证', '年复合增长率 7–8% 有据可查', '高端品质'],
    heroPrimary: '立即探索',
    heroSecondary: '免费咨询',
    whyTitle: '为什么选择 ZANKTUM VILLAS？',
    productsTitle: '我们的投资产品',
    marketTitle: '市场分析：贝克塔什被低估',
    thesisTitle: '贝克塔什论点',
    contactTitle: '专属咨询',
  },
  nav: { why: '为什么 Zanktum', villas: '别墅', artist: '艺术家', builder: '建造师' },
});

const es: SanctumContent = compactFromEn({
  why: { ...en.why,
    subtitle: 'Por qué ZANKTUM VILLAS',
    title: 'Más que metros cuadrados',
    intro: 'No compra solo lujo. Compra fuga, control, identidad, familia, preservación del patrimonio y una historia que contará toda su vida.',
    factors: en.why.factors.map((f, i) => ({
      icon: f.icon,
      title: ['La Fuga','El Control','La Identidad','La Familia','Preservación','Bienestar'][i],
      desc: f.desc,
    })),
  },
  artist: { ...en.artist, subtitle: 'La visión artística', headline: 'Un universo artístico integrado' },
  builder: { ...en.builder, subtitle: 'La maestría constructiva', headline: 'Calidad magistral en cada detalle' },
  cta: { ...en.cta, title: 'El momento es AHORA', btnPrimary: 'Contáctenos hoy', btnSecondary: 'Ver las villas' },
  investment: { ...en.investment,
    eyebrow: 'Inversión',
    title: 'Inversiones de lujo en la Riviera turca',
    tagline: 'Depósitos de valor documentados en la ubicación prémium de Bektaş, Alanya.',
    claims: ['Validado por el mercado', 'CAGR del 7–8 % documentado', 'Calidad prémium'],
    heroPrimary: 'Descubrir ahora',
    heroSecondary: 'Asesoría gratuita',
    whyTitle: '¿Por qué ZANKTUM VILLAS?',
    productsTitle: 'Nuestros productos de inversión',
    marketTitle: 'Análisis de mercado: Bektaş está infravalorada',
    thesisTitle: 'La tesis de Bektaş',
    contactTitle: 'Asesoría exclusiva',
  },
  nav: { why: 'Por qué Zanktum', villas: 'Villas', artist: 'Artista', builder: 'Constructor' },
});

const fr: SanctumContent = compactFromEn({
  why: { ...en.why,
    subtitle: 'Pourquoi ZANKTUM VILLAS',
    title: 'Bien plus que des mètres carrés',
    intro: 'Vous n\'achetez pas seulement du luxe. Vous achetez une évasion, du contrôle, une identité, la famille, la préservation du patrimoine et une histoire que vous raconterez toute votre vie.',
    factors: en.why.factors.map((f, i) => ({
      icon: f.icon,
      title: ["L'Évasion",'Le Contrôle',"L'Identité",'La Famille','Le Patrimoine','Le Bien-être'][i],
      desc: f.desc,
    })),
  },
  artist: { ...en.artist, subtitle: 'La vision artistique', headline: 'Un univers artistique intégré' },
  builder: { ...en.builder, subtitle: 'La maîtrise du bâtisseur', headline: 'Une qualité magistrale dans chaque détail' },
  cta: { ...en.cta, title: 'Le moment, c\'est MAINTENANT', btnPrimary: 'Contactez-nous aujourd\'hui', btnSecondary: 'Voir les villas' },
  investment: { ...en.investment,
    eyebrow: 'Investissement',
    title: 'Investissements de luxe sur la Riviera turque',
    tagline: 'Des réserves de valeur documentées dans l\'emplacement premium de Bektaş, Alanya.',
    claims: ['Validé par le marché', 'CAGR de 7–8 % documenté', 'Qualité premium'],
    heroPrimary: 'Découvrir maintenant',
    heroSecondary: 'Conseil gratuit',
    whyTitle: 'Pourquoi ZANKTUM VILLAS ?',
    productsTitle: 'Nos produits d\'investissement',
    marketTitle: 'Analyse de marché : Bektaş est sous-évaluée',
    thesisTitle: 'La thèse de Bektaş',
    contactTitle: 'Conseil exclusif',
  },
  nav: { why: 'Pourquoi Zanktum', villas: 'Villas', artist: 'Artiste', builder: 'Bâtisseur' },
});

const tr: SanctumContent = {
  why: {
    subtitle: 'Neden ZANKTUM VILLAS',
    title: 'Metrekareden Daha Fazlası',
    intro:
      'Yalnızca lüks satın almıyorsunuz. Bir kaçış, kontrol, kimlik, aile, servet koruması ve ömür boyu anlatacağınız bir hikâye satın alıyorsunuz.',
    factors: [
      { icon: '🏔️', title: 'Kaçış', desc: '250 metre yükseklik = dünyadan zihinsel mesafe. Gün batımı günlük ritüeliniz olur. Alanya\'nın İÇİNDE değil – Alanya\'nın ÜZERİNDE taht kurarsınız.' },
      { icon: '👁️', title: 'Kontrol', desc: 'Panoptik görüş alanı: kale, liman, Kleopatra Plajı – hepsi gözünüzün önünde. Mekânsal ayrımla mahremiyet. Siz şehri görürsünüz, şehir sizi değil.' },
      { icon: '✨', title: 'Kimlik', desc: '„Kalenin yanında oturuyorum" demek, „Alanya\'dayım" demekten bambaşka bir hikâye anlatır. Tarihin tam yanında yaşarsınız.' },
      { icon: '👨‍👩‍👧‍👦', title: 'Aile', desc: 'Çok kuşaklı buluşmalar için 468 m². Ailenizin her yıl döneceği yer. Güvenli, ayrıcalıklı, anlamlı.' },
      { icon: '💰', title: 'Servet Koruması', desc: 'Enflasyona karşı koruma, somut bir geometriye dönüşür. Kale 50 yıl sonra da orada olacak. %7–13 Airbnb getirisi mümkün. EUR cinsinden çeşitlendirme.' },
      { icon: '🧘', title: 'Wellness', desc: 'Akdeniz üzerinde gün doğumu = biyolojik ilaç. Deniz manzarası = serotonin desteği. Okaliptüs + tuzlu hava = tansiyon düşürücü.' },
    ],
  },
  artist: {
    subtitle: 'Sanatsal Vizyon',
    title: 'Margarete Eckert-Preisser',
    name: 'Margarete Eckert-Preisser',
    headline: 'Bütünleşik Bir Sanatsal Evren',
    intro: [
      'Margarete Eckert-Preisser, çağdaş Avrupa sanatında ender bir olgudur: birden çok mecrayı radikal bir sentezle birleştiren, dört on yıla yayılan kapsamlı bir pratik ile lüksün ve tasarım kültürünün metalaşmasına karşı ödünsüz eleştirel bir tutumu bir araya getirir.',
      'Tanınırlığa uzmanlaşma yoluyla ulaşan çoğu çağdaş sanatçının aksine, bilinçli olarak bütünleştirici bir yaklaşım izler: enkostik resim, tekstil geleneği, fotografik pratik ve anıtsal heykel kavramsal ve maddi olarak birbirine bağlanır – ardışık kariyer evreleri olarak değil, ortak felsefi bir kaygının paralel araştırmaları olarak.',
    ],
    techniques: [
      { title: 'Enkostik Resim (2018–2025)', desc: 'Antik geleneklere dayanan, balmumu esaslı katmanlama tekniği. Malzemenin doğasındaki zamansallık – ısıya, yaşlanmaya ve dönüşüme açıklığı – zaman ve geçicilik için felsefi bir metafora dönüşür.' },
      { title: 'El Düğümlü Waldteppiche (2017–2025)', desc: 'Mimari biçim ile tekstil sanatını sentezleyen, sanatsal olarak tasarlanmış başyapıtlar. Her halı bir hikâye anlatır – Avrupa el sanatları mirasına dayanan mimari ve tekstil geleneklerinin füzyonu.' },
      { title: 'Siyanotipi Fotoğraf (2018–2026)', desc: 'Işığa duyarlı kimyasallarla çalışan fotografik bir teknik. Kademeli kimyasal dönüşüm, geçicilik ve maddi değişim kaygısını yansıtan zamansal bir bilinç taşır.' },
      { title: 'Portable Sculptures (sürmekte)', desc: 'Önceki tüm mecraları sentezleyen yeni bir sanatsal tür: dünyada eşi olmayan taşınabilir sanat heykelleri – ruhsal bir varlığa sahip yoğunlaştırılmış bir sanat dünyası. Margarete\'nin imza tekniği.' },
    ],
    highlight:
      'Bütünsel eser: Yalnızca içinde yaşanan değil, deneyimlenen bir villa. Her oda sanat soluyor. Her an estetik olarak özenle düşünülmüş.',
  },
  builder: {
    subtitle: 'Usta İşçiliği',
    title: 'Bilgin Aykurt',
    name: 'Bilgin Aykurt',
    headline: 'Her Ayrıntıda Usta Kalite',
    credentials: [
      '1990\'dan beri: Şantiye şefi ve usta inşaatçı',
      'Sayısız lüks villa projesi başarıyla hayata geçirildi',
      'Tüm yapı işlerinde uzmanlık',
      'Kusursuz kalitenin garantörü',
      'Her aşamanın kişisel denetimi',
    ],
    intro: [
      'Bilgin Aykurt, yüzlerce varlıklı müşterinin güvenini kazandı – pazarlamayla değil, mükemmellikle. Her yapı malzemesini sanatçı gözüyle seçer ve her inşaat aşamasını usta titizliğiyle denetler.',
    ],
    expertise: [
      'Malzeme seçimi – yalnızca yüksek kaliteli, dayanıklı malzemeler',
      'El sanatı – deneyimli uzmanlar, taviz yok',
      'Zamanlama – kesin planlama, güvenilir teslimat',
      'Ayrıntıya özen – iyi ile ustaca arasındaki fark',
      'Margarete Eckert-Preisser ile kusursuz iş birliği',
    ],
    refTitle: 'Referans Proje – Ziyaret Mümkün',
    refLocation: 'Bektaş Tepe Malessi No 121 · ~150 m kuş uçuşu',
    refDesc:
      'Bilgin Aykurt, hemen yakında bir referans yapıyı yeni tamamladı. Kalitesi hakkında yerinde kendi izleniminizi edinebilirsiniz. Bu sadece bir ev değil – bir ustalık kanıtı.',
    refCta: 'Ziyaret Randevusu Al',
  },
  cta: {
    title: 'Doğru Zaman ŞİMDİ',
    lines: [
      'TL zayıf – EUR alıcıları için 2022\'ye göre %27 daha uygun.',
      'Airbnb lisansları 01.01.2024\'ten beri net şekilde düzenlendi.',
      'Jeopolitik belirsiz – güvenli liman talebi artıyor.',
    ],
    finalLine: 'Üç yıl sonra bu fiyatları bir daha göremeyeceksiniz.',
    btnPrimary: 'Bugün İletişime Geçin',
    btnSecondary: 'Villaları Görüntüle',
  },
  investment: {
    eyebrow: 'Yatırım',
    title: 'Türk Rivierası\'nda lüks yatırımlar',
    tagline: 'Bektaş, Alanya\'nın prestijli konumunda belgelenmiş değer saklama araçları.',
    claims: ['Piyasa doğrulamalı', 'Belgelenmiş %7–8 CAGR', 'Premium kalite'],
    heroPrimary: 'Hemen keşfedin',
    heroSecondary: 'Ücretsiz danışmanlık',
    whyTitle: 'Neden ZANKTUM VILLAS?',
    whyIntro: 'ZANKTUM VILLAS sadece gayrimenkul sunmaz. Bektaş, Alanya\'nın prestijli konumunda belgelenmiş değer saklama araçları yaratırız.',
    benefits: [
      { icon: '🏗️', title: 'Premium mimari', text: 'Bilgin Aykurt imzalı modern, zamansız tasarımlar – lüks inşaatta 30+ yıl deneyim.' },
      { icon: '📈', title: '%7–8 CAGR', text: '10+ kıyaslama objesine ait 18 aylık piyasa verilerine dayalı belgelenmiş değer artışı.' },
      { icon: '€', title: 'Sabit EUR fiyatı', text: 'TL oynaklığı yok. Enflasyon koruması. Kur riski olmadan Avrupalı alıcılar.' },
      { icon: '🎨', title: 'Sanat objeleri (BETA)', text: 'Opsiyonel: Margarete Eckert-Preisser\'in eserleri – dünyaca tanınan sanatçı.' },
      { icon: '🏖️', title: 'Birinci sınıf konum', text: 'Alanya\'nın 250 m üzerinde, kale manzarası, Kleopatra Plajı, turist kalabalığı yok.' },
      { icon: '🛡️', title: 'Depreme dayanıklı', text: 'En yeni mühendislik standartları, esnek çerçeve yapılar, 50+ yıl ömür.' },
    ],
    productsTitle: 'Yatırım ürünlerimiz',
    productsIntro: 'Bektaş\'ta iki özel 468 m² villa. İkisi de piyasa doğrulamalı, gerçekçi fiyatlar, belgelenmiş getiriler.',
    priceLabel: 'Satın alma fiyatı 2026',
    pointsTitle: 'Yatırım kilometre taşları',
    products: [
      {
        name: 'ZANKTUM ALPHA',
        subtitle: 'Premium İç Mimari Sürümü',
        price: '€2.600.640',
        pricePerM2: '€5.557/m²',
        featuresTitle: 'Donanım',
        points: [
          'Satış fiyatı 2031: ~€3.800.000',
          'Değer artışı: €1.200.000 (+%46)',
          'CAGR: +%7,9',
          'Kira getirisi: yıllık %3,0 (€78.000)',
          '6 yıllık kâr: €1.532.000',
          'Toplam ROI: +%59',
        ],
        features: [
          '468 m² yaşam alanı',
          'Modern premium tasarım',
          'Özel havuz & teras',
          'Akıllı ev entegrasyonu',
          'Tam mobilyalı',
          'Depreme dayanıklı',
        ],
        cta: 'Bilgi isteyin',
      },
      {
        name: 'ZANKTUM BETA',
        subtitle: 'Sanat Başyapıtı Sürümü',
        price: '€4.274.400',
        pricePerM2: '€9.133/m² (sanat objeleriyle)',
        featuresTitle: 'Özellikler',
        points: [
          'Satış fiyatı 2031: ~€6.411.000',
          'Değer artışı: €2.137.000 (+%50)',
          'CAGR: +%8,3',
          'Kira getirisi: yıllık %2,8 (€119.700)',
          '6 yıllık kâr: €2.257.000',
          'Toplam ROI: +%70',
        ],
        features: [
          '468 m² yaşam alanı (ALPHA gibi)',
          'Ultra-premium donanım',
          'Margarete Eckert-Preisser sanat objeleri',
          'Dünyaca tanınan sanatçı (78 yaş)',
          'Miras sanat koleksiyonu',
          'Sanat objeleriyle değer istikrarı',
        ],
        cta: 'Özel talep',
      },
    ],
    marketTitle: 'Piyasa analizi: Bektaş değerinin altında',
    marketIntro: 'Bektaş yeni Belek oluyor. Bugün hâlâ Belek\'in %21 altında – 3 yıl içinde %30–40 daha pahalı.',
    marketHead: { city: 'Şehir', y2020: '2020 €/m²', y2026: '2026 €/m²', cagr: 'CAGR', status: 'Durum' },
    marketRows: [
      { city: 'Belek', y2020: '€1.200', y2026: '€2.600', cagr: '+%14,2', status: 'Olgun (gelecekte +%5–6)' },
      { city: 'Bektaş (ZANKTUM)', y2020: '€950', y2026: '€2.050', cagr: '+%12,8', status: '🚀 Yükselen yıldız (+%14–18)', hot: true },
      { city: 'Kemer', y2020: '€1.100', y2026: '€2.360', cagr: '+%13,3', status: 'Olgun' },
      { city: 'Side', y2020: '€1.050', y2026: '€2.270', cagr: '+%13,2', status: 'Olgun' },
    ],
    thesisTitle: 'Bektaş tezi',
    thesisText: 'Bektaş, Belek\'e göre %21 indirimle +%12,8 CAGR gösteriyor. Bu klasik bir yakalama senaryosu. Belek artık yalnızca +%5–6 CAGR ile büyürken (doygun), Bektaş 3 yıl içinde „keşfedilmiş" olacak.',
    contactTitle: 'Özel danışmanlık',
    contactIntro: 'İlgileniyor musunuz? Uzmanlarımız size memnuniyetle danışmanlık sunar.',
    contactEmailLabel: 'E-posta',
    contactEmail: 'info@sanctumvillas.com',
    contactPhoneLabel: 'Telefon',
    contactPhone: '+90 (242) 511 0000',
    contactAddressLabel: 'Adres',
    contactAddress: 'Bektaş, Alanya 07400, Türkiye',
    footerLine: 'ZANKTUM VILLAS | Bektaş, Alanya | Piyasa doğrulamalı yatırım analizi',
  },
  cleopatra: {
    subtitle: 'Simge Sanat Eseri',
    title: 'Z-Cleopatra',
    tagline: 'VILLA BETA sınırından Alanya\'yı selamlayan 4,5 metrelik bir simge heykel.',
    intro:
      'Z-Cleopatra yalnızca bir mülkü süsleyen bir heykel değildir. Christo geleneğinde anıtsal bir sanat eseridir; klasik formun çağdaş renk ve malzemeyle dönüşümüdür. Margarete Eckert-Preisser tarafından tasarlanmış, Bilgin Aykurt tarafından mühendisliği yapılmıştır. Alanya limanından, kalesinden ve plajlarından görülebilen bir simge olarak konumlanır ve ZANKTUM\'u lüks, kültür ve sanatsal vizyonun birleşimi olarak ilan eder.',
    specsTitle: 'Teknik Özellikler',
    specs: [
      { label: 'Yükseklik', value: '4,5 m', note: '+ 0,5 m kaide = toplam 5 m' },
      { label: 'Form', value: 'Klasik', note: 'Tam Cleopatra büstü, üst gövde' },
      { label: 'Malzeme', value: 'Kompozit', note: 'Cam elyaf kompozit, yüksek parlak epoksi' },
      { label: 'Renkler', value: 'Pop-Art', note: 'Macenta, camgöbeği, altın ve turuncu' },
      { label: 'Aksan', value: 'Z-Taç', note: 'Geometrik ve firavun füzyonu' },
      { label: 'Aydınlatma', value: 'Altın LED', note: 'Gece görünürlüğü için aydınlatma' },
    ],
    featuresTitle: 'Tasarım Özellikleri',
    features: [
      { icon: '👑', title: 'Z-Taç Entegrasyonu', desc: 'Taç sonradan eklenmemiştir; klasik formla geometrik olarak bütünleşir ve ZANKTUM kimliğini firavun mimarisiyle birleştirir.' },
      { icon: '🎨', title: 'Pop-Art Dönüşümü', desc: 'Warhol\'dan ilham alan palet, klasik formu onurlandırırken çağdaş vizyonu kutlar. Alay değil — sanatsal yeniden yorum.' },
      { icon: '✨', title: 'Gece Aydınlatması', desc: 'Altın LED aydınlatma, geceleri limandan ve plajlardan görünürlüğü sağlar; eşsiz bir siluet yaratır.' },
      { icon: '🔧', title: 'Sismik Mühendislik', desc: 'Türk yapı yönetmeliklerine uygun depreme dayanıklı tasarım. Statik mühendisliği Bilgin Aykurt tarafından yapılmıştır.' },
      { icon: '🌍', title: 'Kamusal-Özel Sınır', desc: 'Heykel mülk sınırında durur ama tüm şehre seslenir. Güzellik kamusaldır; sanat herkese aittir.' },
      { icon: '🏛️', title: 'Klasik Temel', desc: 'Tam bir Cleopatra büstü antik çağı onurlandırır; çağdaş renk ve 1930\'ların şeffaf peçesiyle silinmeden dönüştürülür.' },
    ],
    visibilityTitle: 'Simge Görünürlüğü',
    visibilityIntro: '4,5 metrelik yükseklik, VILLA BETA\'nın mimarisini ezmeden Alanya\'nın önemli noktalarından en iyi görünürlüğü sağlayacak şekilde hesaplanmıştır.',
    visibilityHead: { point: 'Bakış Noktası', distance: 'Mesafe', visibility: 'Görünürlük' },
    visibilityRows: [
      { point: 'Alanya Limanı', distance: '8–10 km', visibility: 'Görünür' },
      { point: 'Cleopatra Plajı', distance: '6–7 km', visibility: 'Mükemmel' },
      { point: 'Alanya Kalesi', distance: '3 km', visibility: 'Belirgin' },
      { point: 'Akdeniz (tekneler)', distance: '10–12 km açıkta', visibility: 'Mükemmel' },
    ],
    harmony: 'Orantısal uyum: %43 oran (4,5 m heykel / 10,5 m villa) altın oran ilkesini izler — heykel VILLA BETA\'yı ezmeden zenginleştirir.',
    visionTitle: 'Margarete Eckert-Preisser\'in Sanatsal Vizyonu',
    visionText: [
      'Z-Cleopatra, Margarete\'nin tek bir soruya verdiği anıtsal yanıttır: "Antik çağı çağdaş renge sardığımızda ne olur?"',
      'Christo\'nun sarılı anıtları gibi, bu heykel klasik formu yok etmez — onu açığa çıkarır. Pop-Art paleti alay değil kutlamadır; şeffaf peçe kültürel incelik ve anlatısal derinlik katar.',
    ],
    quote: 'Güzellik yalnızca içeride değildir. Güzellik kamusaldır. Güzellik şimdidir.',
  },
  nav: { why: 'Neden Zanktum', villas: 'Villalar', artist: 'Sanatçı', builder: 'İnşaatçı' },
};

const ZANKTUM: Record<Language, SanctumContent> = { en, de, ar, ru, uk, zh, es, fr, tr };

export const getSanctumContent = (lang: Language) => ZANKTUM[lang];
