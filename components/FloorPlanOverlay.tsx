import React from 'react';
import { Language } from '../types';

// ============================================================================
// FloorPlanOverlay — übersetzt die (türkischen) Beschriftungen der Grundriss-
// Bilder live je nach Sprache. Das Originalbild bleibt unverändert; über die
// türkischen Texte werden weisse Masken mit der jeweiligen Übersetzung gelegt.
// Für Türkisch ('tr') wird nichts überlagert (Original ist bereits türkisch).
//
// Positionen sind in % des Bildes (das Overlay liegt deckungsgleich über dem
// <img>). Masken wachsen automatisch mit der Textlänge (minWidth deckt den
// türkischen Originaltext ab), daher passen auch lange Wörter (DE/RU) sauber.
// ============================================================================

type Dict = Partial<Record<Language, string>>;
const pick = (d: Dict, lang: Language) => d[lang] ?? d.en ?? '';

// --- Raum-Begriffe ---------------------------------------------------------
const ROOM: Record<string, Dict> = {
  entranceHall: { en: 'ENTRANCE HALL', de: 'EINGANGSHALLE', ar: 'قاعة المدخل', ru: 'ВХОДНОЙ ХОЛЛ', uk: 'ВХІДНИЙ ХОЛ', zh: '入口大厅', es: 'VESTÍBULO', fr: 'HALL D\'ENTRÉE' },
  bedroom: { en: 'BEDROOM', de: 'SCHLAFZIMMER', ar: 'غرفة النوم', ru: 'СПАЛЬНЯ', uk: 'СПАЛЬНЯ', zh: '卧室', es: 'DORMITORIO', fr: 'CHAMBRE' },
  bathroom: { en: 'BATHROOM', de: 'BADEZIMMER', ar: 'حمام', ru: 'ВАННАЯ', uk: 'ВАННА', zh: '浴室', es: 'BAÑO', fr: 'SALLE DE BAIN' },
  balcony: { en: 'BALCONY', de: 'BALKON', ar: 'شرفة', ru: 'БАЛКОН', uk: 'БАЛКОН', zh: '阳台', es: 'BALCÓN', fr: 'BALCON' },
  livingRoom: { en: 'LIVING ROOM', de: 'WOHNZIMMER', ar: 'غرفة المعيشة', ru: 'ГОСТИНАЯ', uk: 'ВІТАЛЬНЯ', zh: '客厅', es: 'SALA DE ESTAR', fr: 'SALON' },
  kitchen: { en: 'KITCHEN', de: 'KÜCHE', ar: 'مطبخ', ru: 'КУХНЯ', uk: 'КУХНЯ', zh: '厨房', es: 'COCINA', fr: 'CUISINE' },
  dressingRoom: { en: 'DRESSING ROOM', de: 'ANKLEIDE', ar: 'غرفة الملابس', ru: 'ГАРДЕРОБНАЯ', uk: 'ГАРДЕРОБНА', zh: '更衣室', es: 'VESTIDOR', fr: 'DRESSING' },
  terrace: { en: 'TERRACE', de: 'TERRASSE', ar: 'تراس', ru: 'ТЕРРАСА', uk: 'ТЕРАСА', zh: '露台', es: 'TERRAZA', fr: 'TERRASSE' },
  annex: { en: 'ANNEX', de: 'NEBENRAUM', ar: 'ملحق', ru: 'ПОДСОБНОЕ ПОМ.', uk: 'ПІДСОБНЕ ПРИМ.', zh: '附属用房', es: 'ANEXO', fr: 'ANNEXE' },
};

// --- sonstige Begriffe -----------------------------------------------------
const T = {
  reinfConcrete: { en: 'REINF. CONCRETE', de: 'STAHLBETON', ar: 'خرسانة مسلحة', ru: 'ЖЕЛЕЗОБЕТОН', uk: 'ЗАЛІЗОБЕТОН', zh: '钢筋混凝土', es: 'HORMIGÓN ARM.', fr: 'BÉTON ARMÉ' } as Dict,
  plan: { en: 'PLAN', de: 'GRUNDRISS', ar: 'مخطط', ru: 'ПЛАН', uk: 'ПЛАН', zh: '平面图', es: 'PLANO', fr: 'PLAN' } as Dict,
  scale: { en: 'SCALE', de: 'MASSSTAB', ar: 'مقياس', ru: 'МАСШТАБ', uk: 'МАСШТАБ', zh: '比例', es: 'ESCALA', fr: 'ÉCHELLE' } as Dict,
  rainwater: { en: 'Rainwater downpipe to be concealed.', de: 'Regenfallrohr wird verdeckt geführt.', ar: 'سيتم إخفاء أنبوب تصريف مياه الأمطار.', ru: 'Водосточная труба будет скрыта.', uk: 'Водостічна труба буде прихована.', zh: '雨水落水管将被隐藏。', es: 'La bajante pluvial quedará oculta.', fr: 'La descente d\'eau pluviale sera dissimulée.' } as Dict,
  floorW: { en: 'Floor', de: 'Boden', ar: 'الأرضية', ru: 'Пол', uk: 'Підлога', zh: '地面', es: 'Suelo', fr: 'Sol' } as Dict,
  wallW: { en: 'Wall', de: 'Wand', ar: 'الجدار', ru: 'Стена', uk: 'Стіна', zh: '墙面', es: 'Pared', fr: 'Mur' } as Dict,
  ceilingW: { en: 'Ceiling', de: 'Decke', ar: 'السقف', ru: 'Потолок', uk: 'Стеля', zh: '天花板', es: 'Techo', fr: 'Plafond' } as Dict,
  ceramic: { en: 'Ceramic', de: 'Keramik', ar: 'سيراميك', ru: 'Керамика', uk: 'Кераміка', zh: '陶瓷', es: 'Cerámica', fr: 'Céramique' } as Dict,
  plasterPaint: { en: 'Plaster + Paint', de: 'Putz + Farbe', ar: 'جص + دهان', ru: 'Штукатурка + краска', uk: 'Штукатурка + фарба', zh: '石膏+涂料', es: 'Yeso + Pintura', fr: 'Plâtre + Peinture' } as Dict,
  laminate: { en: 'Laminate Parquet', de: 'Laminat', ar: 'باركيه لامينيت', ru: 'Ламинат', uk: 'Ламінат', zh: '复合地板', es: 'Parquet Laminado', fr: 'Parquet Stratifié' } as Dict,
  foyer: { en: 'Foyer', de: 'Diele', ar: 'ردهة', ru: 'Прихожая', uk: 'Передпокій', zh: '门厅', es: 'Recibidor', fr: 'Entrée' } as Dict,
  childrensRoom: { en: "Children's Room", de: 'Kinderzimmer', ar: 'غرفة الأطفال', ru: 'Детская', uk: 'Дитяча', zh: '儿童房', es: 'Hab. Infantil', fr: 'Chambre Enfant' } as Dict,
};

const FLOOR_TITLE: Record<string, Dict> = {
  basement: { en: 'BASEMENT FLOOR', de: 'UNTERGESCHOSS', ar: 'الطابق السفلي', ru: 'ЦОКОЛЬНЫЙ ЭТАЖ', uk: 'ЦОКОЛЬНИЙ ПОВЕРХ', zh: '地下室', es: 'PLANTA BAJA', fr: 'SOUS-SOL' },
  ground: { en: 'GROUND FLOOR', de: 'ERDGESCHOSS', ar: 'الطابق الأرضي', ru: 'ПЕРВЫЙ ЭТАЖ', uk: 'ПЕРШИЙ ПОВЕРХ', zh: '一楼', es: 'PLANTA PRINCIPAL', fr: 'REZ-DE-CHAUSSÉE' },
  first: { en: 'FIRST FLOOR', de: 'OBERGESCHOSS', ar: 'الطابق الأول', ru: 'ВТОРОЙ ЭТАЖ', uk: 'ДРУГИЙ ПОВЕРХ', zh: '二楼', es: 'PRIMERA PLANTA', fr: 'PREMIER ÉTAGE' },
  attic: { en: 'ATTIC FLOOR', de: 'DACHGESCHOSS', ar: 'العلية', ru: 'МАНСАРДА', uk: 'МАНСАРДА', zh: '阁楼', es: 'ÁTICO', fr: 'GRENIER' },
};

const NOTE: Record<Language, string[]> = {
  en: ['NOTE: After the building permit, a separate modification', 'permit will be issued for the elevator construction.', '(Included in the calculation at 30%.)'],
  de: ['HINWEIS: Nach der Baugenehmigung wird für den Aufzugbau', 'eine separate Änderungsgenehmigung erstellt.', '(Zu 30% in die Berechnung einbezogen.)'],
  ar: ['ملاحظة: بعد رخصة البناء، سيتم إصدار رخصة تعديل', 'منفصلة لإنشاء المصعد.', '(مُدرَج في الحساب بنسبة 30%.)'],
  ru: ['ПРИМЕЧАНИЕ: После разрешения на строительство для лифта', 'будет оформлено отдельное разрешение на изменение.', '(Включено в расчёт на 30%.)'],
  uk: ['ПРИМІТКА: Після дозволу на будівництво для ліфта', 'буде оформлено окремий дозвіл на зміну.', '(Включено в розрахунок на 30%.)'],
  zh: ['注意：取得建筑许可后，将为电梯施工', '单独办理改建许可。', '（已按30%计入计算。）'],
  es: ['NOTA: Tras la licencia de obra, se emitirá un permiso', 'de modificación independiente para el ascensor.', '(Incluido en el cálculo al 30%.)'],
  fr: ['REMARQUE : Après le permis de construire, un permis de', 'modification distinct sera délivré pour l\'ascenseur.', '(Inclus dans le calcul à 30%.)'],
  tr: [],
};

// --- Layout pro Etage (Positionen in % des Bildes) -------------------------
type Room = { x: number; y: number; w: number; key: string; area: string };
type Layout = { rooms: Room[]; beton: { x: number; y: number }[]; floor: string };

const LAYOUT: Record<string, Layout> = {
  basement: {
    floor: 'basement', beton: [],
    rooms: [
      { x: 40, y: 46.5, w: 13, key: 'entranceHall', area: '19 m²' },
      { x: 63.5, y: 47.5, w: 12, key: 'annex', area: '82 m²' },
    ],
  },
  'ground-floor': {
    floor: 'ground', beton: [{ x: 69, y: 22 }, { x: 37, y: 73.2 }],
    rooms: [
      { x: 41, y: 44, w: 13, key: 'entranceHall', area: '21.5 m²' },
      { x: 63, y: 43.5, w: 10.5, key: 'bedroom', area: '20.5 m²' },
      { x: 47, y: 57.5, w: 10.5, key: 'bedroom', area: '42 m²' },
      { x: 55, y: 34.5, w: 9.5, key: 'bathroom', area: '4.5 m²' },
      { x: 33, y: 51.5, w: 9.5, key: 'bathroom', area: '5 m²' },
      { x: 45, y: 25.5, w: 8, key: 'balcony', area: '9 m²' },
      { x: 33, y: 70, w: 8, key: 'balcony', area: '19 m²' },
    ],
  },
  'first-floor': {
    floor: 'first', beton: [{ x: 47, y: 22 }, { x: 40, y: 74 }],
    rooms: [
      { x: 67, y: 25.5, w: 8, key: 'balcony', area: '9 m²' },
      { x: 42, y: 46.8, w: 13, key: 'entranceHall', area: '21.5 m²' },
      { x: 66, y: 40.6, w: 13, key: 'dressingRoom', area: '20 m²' },
      { x: 48, y: 54.2, w: 12, key: 'bedroom', area: '36 m²' },
      { x: 66, y: 60, w: 9.5, key: 'bathroom', area: '12 m²' },
      { x: 33, y: 69.5, w: 8, key: 'balcony', area: '19 m²' },
    ],
  },
  attic: {
    floor: 'attic', beton: [],
    rooms: [
      { x: 63, y: 32.5, w: 9.5, key: 'bathroom', area: '7 m²' },
      { x: 44, y: 44.5, w: 13, key: 'entranceHall', area: '17 m²' },
      { x: 61, y: 44.5, w: 12, key: 'livingRoom', area: '36 m²' },
      { x: 38, y: 52.5, w: 9, key: 'kitchen', area: '7.5 m²' },
      { x: 37, y: 64, w: 8, key: 'terrace', area: '21.5 m²' },
      { x: 69.5, y: 64, w: 10, key: 'terrace', area: '6.5 m²' },
    ],
  },
};

const mask: React.CSSProperties = { position: 'absolute', background: '#ffffff', color: '#141414' };

const FloorPlanOverlay: React.FC<{ floorId: string; lang: Language }> = ({ floorId, lang }) => {
  if (lang === 'tr') return null;
  const layout = LAYOUT[floorId];
  if (!layout) return null;

  const rtl = lang === 'ar';
  const title = `${pick(FLOOR_TITLE[layout.floor], lang)}  ${pick(T.plan, lang)}   ·   ${pick(T.scale, lang)}: 1/50`;
  const rows: [string, string][] = [
    [pick(ROOM.kitchen, lang), `${pick(T.floorW, lang)}: ${pick(T.ceramic, lang)}`],
    [pick(ROOM.bathroom, lang), `${pick(T.wallW, lang)}: ${pick(T.plasterPaint, lang)}`],
    [pick(T.foyer, lang), `${pick(T.ceilingW, lang)}: ${pick(T.plasterPaint, lang)}`],
    [pick(ROOM.livingRoom, lang), `${pick(T.floorW, lang)}: ${pick(T.laminate, lang)}`],
    [pick(T.childrensRoom, lang), `${pick(T.wallW, lang)}: ${pick(T.plasterPaint, lang)}`],
    [pick(ROOM.bedroom, lang), `${pick(T.ceilingW, lang)}: ${pick(T.plasterPaint, lang)}`],
  ];

  return (
    <div
      aria-hidden
      style={{ position: 'absolute', inset: 0, containerType: 'size', fontFamily: 'Arial, Helvetica, sans-serif', pointerEvents: 'none' } as React.CSSProperties}
    >
      {/* Raum-Labels */}
      {layout.rooms.map((r, i) => (
        <div
          key={i}
          style={{
            ...mask,
            left: `${r.x}%`, top: `${r.y}%`, transform: 'translate(-50%,-50%)',
            minWidth: `${r.w}%`, minHeight: '5cqh',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            lineHeight: 1.05, padding: '0 0.4cqw', textTransform: 'uppercase',
          }}
        >
          <span style={{ fontSize: '1.55cqw', fontWeight: 700, whiteSpace: 'nowrap' }}>{pick(ROOM[r.key], lang)}</span>
          <span style={{ fontSize: '1.25cqw', whiteSpace: 'nowrap' }}>{r.area}</span>
        </div>
      ))}

      {/* Stahlbeton-Hinweise */}
      {layout.beton.map((b, i) => (
        <div key={`b${i}`} style={{ ...mask, left: `${b.x}%`, top: `${b.y}%`, transform: 'translate(-50%,-50%)', minWidth: '8.5%', textAlign: 'center', padding: '0 0.3cqw' }}>
          <span style={{ fontSize: '1.0cqw', whiteSpace: 'nowrap' }}>{pick(T.reinfConcrete, lang)}</span>
        </div>
      ))}

      {/* Plantitel (unten) */}
      <div style={{ ...mask, left: '45.5%', right: '0.3%', top: '96.7%', bottom: '0.6%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '1.75cqw', fontWeight: 700, whiteSpace: 'nowrap' }}>{title}</span>
      </div>

      {/* Fussnote */}
      <div style={{ ...mask, left: '48%', right: '0.6%', top: '90.8%', bottom: '3.7%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 1cqw', textAlign: rtl ? 'right' : 'left' }}>
        {(NOTE[lang] ?? NOTE.en).map((l, i) => (
          <span key={i} style={{ fontSize: '1.0cqw', whiteSpace: 'nowrap' }}>{l}</span>
        ))}
      </div>

      {/* Ausstattungs-Legende (oben rechts) */}
      <div style={{ ...mask, left: '70.3%', right: '15%', top: '0.6%', bottom: '90.6%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0.2cqw 0.4cqw' }}>
        <span style={{ fontSize: '0.82cqw', whiteSpace: 'nowrap', marginBottom: '0.2cqw' }}>{pick(T.rainwater, lang)}</span>
        {rows.map(([l, rr], i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5cqw' }}>
            <span style={{ fontSize: '0.82cqw', fontWeight: 600, whiteSpace: 'nowrap' }}>{l}</span>
            <span style={{ fontSize: '0.82cqw', whiteSpace: 'nowrap' }}>{rr}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloorPlanOverlay;
