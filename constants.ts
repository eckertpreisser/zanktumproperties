import { Villa, Language } from './types';
import { getSanctumContent } from './sanctumContent';

const IMG = `${import.meta.env.BASE_URL}images`;
const IMG2 = `${import.meta.env.BASE_URL}images/villa2`;

// ========== ROOM FEATURES (all 5 languages) ==========
const FEATURES: Record<Language, Record<string, string[]>> = {
  en: {
    'entrance-hall': ['Private Elevator Access', 'Marble Floor Tiles', 'Decorative Glass Doors', 'Coffered Ceiling', 'Fluted Wall Panelling', 'Copper-Tone Entry Door'],
    'basement-livingroom': ['Modular Designer Sofa', 'Gold Sculptural Accents', 'Marble Feature Wall', 'Integrated Kitchen Island', 'Gold Pendant Chandelier', 'Illuminated Coffered Ceiling'],
    'basement-bathroom': ['Glass-Enclosed Shower', 'Brass Rainfall Showerhead', 'Bronze Wall Tiles', 'Floating Black Vanity', 'Illuminated Display Niches', 'Wall-Mounted Toilet'],
    'master-bedroom': ['Upholstered King-Size Bed', 'Marble Headboard Wall', 'Glass Walk-In Wardrobe', 'Wall-Mounted TV', 'Designer Vanity Area', 'Herringbone Wood Flooring'],
    'master-bathroom': ['Green Marble Accent Wall', 'Vessel Basin Vanity', 'Brass Fixtures Throughout', 'Frameless Glass Shower', 'Panoramic Window View', 'Wall-Hung Toilet'],
    'bedroom': ['Grey Marble Feature Wall', 'Walnut-Frame Double Bed', 'Glass Built-In Wardrobe', 'Designer Lounge Chair', 'Recessed Display Shelving', 'Herringbone Wood Flooring'],
    'bedroom-bathroom': ['Brown Marble Shower', 'Sculptural Organic Mirror', 'Vessel Basin on Stone', 'Brass Wall-Mounted Faucet', 'Illuminated Wooden Niches', 'Green Lacquered Vanity'],
    'first-bedroom': ['Tufted King-Size Bed', 'Globe Cluster Chandelier', 'Gold Inlay Wall Accents', 'Full-Height Mirror Panels', 'Sculptural Green Armchairs', 'Designer Art Pieces'],
    'first-bathroom': ['Freestanding Clawfoot Tub', 'Dual Gold Vessel Basins', 'Walnut Arched Mirror', 'Brass Rain Shower System', 'Floor-to-Ceiling Garden View', 'White Marble Cladding'],
    'dressing-room': ['Central Storage Island', 'Smoked Glass Wardrobe Doors', 'Full-Length Arched Mirror', 'Built-In Vanity Station', 'Floor-to-Ceiling Cabinetry', 'Upholstered Ottoman Seating'],
    'attic-livingroom': ['L-Shaped Sectional Sofa', 'Built-In Electric Fireplace', 'Marble-Top Coffee Table', 'Fluted TV Feature Wall', 'Sculptural Wall Art', 'Integrated Dining Area'],
    'attic-kitchen': ['Handle-Less White Cabinetry', 'Marble Backsplash', 'Built-In Oven & Coffee Machine', 'Stainless Steel Refrigerator', 'Induction Cooktop', 'Brass Single-Lever Faucet'],
    'attic-bathroom': ['Frameless Glass Shower', 'Floating Timber Vanity', 'Rectangular Vessel Basin', 'Globe Pendant Lights', 'Wall-Mounted Toilet', 'Recessed Storage Shelving'],
  },
  de: {
    'entrance-hall': ['Privater Aufzugzugang', 'Marmor-Bodenfliesen', 'Dekorative Glastueren', 'Kassettendecke', 'Geriffelte Wandpaneele', 'Kupferfarbene Eingangstuer'],
    'basement-livingroom': ['Modulares Designersofa', 'Goldene Skulptur-Akzente', 'Marmor-Akzentwand', 'Integrierte Kuecheninsel', 'Goldener Kronleuchter', 'Beleuchtete Kassettendecke'],
    'basement-bathroom': ['Glasduschkabine', 'Messing-Regendusche', 'Bronze-Wandfliesen', 'Schwebender Waschtisch', 'Beleuchtete Nischen', 'Wand-WC'],
    'master-bedroom': ['Gepolstertes Kingsize-Bett', 'Marmor-Kopfteilwand', 'Glas-Ankleidezimmer', 'Wandmontierter TV', 'Designer-Schminktisch', 'Fischgrat-Holzboden'],
    'master-bathroom': ['Gruene Marmor-Akzentwand', 'Aufsatzwaschbecken', 'Messingarmaturen', 'Rahmenlose Glasdusche', 'Panoramafenster', 'Wand-WC'],
    'bedroom': ['Graue Marmor-Akzentwand', 'Nussbaum-Doppelbett', 'Glas-Einbauschrank', 'Designer-Loungesessel', 'Eingelassene Regale', 'Fischgrat-Holzboden'],
    'bedroom-bathroom': ['Braune Marmordusche', 'Organischer Spiegel', 'Aufsatzbecken auf Stein', 'Messing-Wandarmatur', 'Beleuchtete Holznischen', 'Gruen lackierter Waschtisch'],
    'first-bedroom': ['Getuftetes Kingsize-Bett', 'Kugel-Kronleuchter', 'Gold-Intarsien-Wand', 'Raumhohe Spiegelpaneele', 'Designer-Sessel in Gruen', 'Kunstwerke'],
    'first-bathroom': ['Freistehende Badewanne', 'Doppelte Gold-Waschbecken', 'Nussbaum-Bogenspiegel', 'Messing-Regenduscsystem', 'Raumhoher Gartenblick', 'Weisse Marmorverkleidung'],
    'dressing-room': ['Zentrale Aufbewahrungsinsel', 'Rauchglas-Schranktueren', 'Raumhoher Bogenspiegel', 'Eingebauter Schminktisch', 'Deckenhohe Einbauschraenke', 'Gepolsterter Sitzhocker'],
    'attic-livingroom': ['L-foermige Sitzlandschaft', 'Einbau-Elektrokamin', 'Marmor-Couchtisch', 'Geriffelte TV-Wand', 'Skulpturale Wandkunst', 'Integrierter Essbereich'],
    'attic-kitchen': ['Grifflose Einbaukueche', 'Marmor-Rueckwand', 'Einbauofen & Kaffeemaschine', 'Edelstahl-Kuehlschrank', 'Induktionskochfeld', 'Messing-Einhebelmischer'],
    'attic-bathroom': ['Rahmenlose Glasdusche', 'Schwebender Holz-Waschtisch', 'Rechteckiges Aufsatzbecken', 'Kugel-Wandleuchten', 'Wand-WC', 'Eingelassene Ablagen'],
  },
  ar: {
    'entrance-hall': ['وصول خاص بالمصعد', 'بلاط أرضي رخامي', 'أبواب زجاجية زخرفية', 'سقف مقبب', 'ألواح جدارية مضلعة', 'باب مدخل بلون نحاسي'],
    'basement-livingroom': ['أريكة مصمم معيارية', 'لمسات نحتية ذهبية', 'جدار رخامي بارز', 'جزيرة مطبخ متكاملة', 'ثريا معلقة ذهبية', 'سقف مقبب مضيء'],
    'basement-bathroom': ['دش مغلق بالزجاج', 'رأس دش مطري نحاسي', 'بلاط جداري برونزي', 'خزانة حمام عائمة سوداء', 'ألواح عرض مضاءة', 'مرحاض معلق'],
    'master-bedroom': ['سرير ملكي مبطن', 'جدار رأس سرير رخامي', 'خزانة ملابس زجاجية', 'تلفزيون معلق', 'طاولة تجميل مصممة', 'أرضية خشبية بنمط السمكة'],
    'master-bathroom': ['جدار رخام أخضر', 'خزانة حوض علوي', 'تجهيزات نحاسية', 'دش زجاجي بدون إطار', 'إطلالة بانورامية', 'مرحاض معلق'],
    'bedroom': ['جدار رخامي رمادي', 'سرير مزدوج بإطار الجوز', 'خزانة زجاجية مدمجة', 'كرسي صالة مصمم', 'رفوف عرض مدمجة', 'أرضية خشبية بنمط السمكة'],
    'bedroom-bathroom': ['دش رخام بني', 'مرآة عضوية نحتية', 'حوض علوي على الحجر', 'صنبور نحاسي على الجدار', 'ألواح خشبية مضيئة', 'خزانة خضراء مطلية'],
    'first-bedroom': ['سرير ملكي محشو', 'ثريا كروية', 'لمسات جدارية ذهبية', 'ألواح مرايا كاملة الارتفاع', 'كراسي خضراء نحتية', 'قطع فنية مصممة'],
    'first-bathroom': ['حوض استحمام قائم', 'أحواض ذهبية مزدوجة', 'مرآة قوسية من الجوز', 'نظام دش مطري نحاسي', 'إطلالة على الحديقة', 'كسوة رخامية بيضاء'],
    'dressing-room': ['جزيرة تخزين مركزية', 'أبواب خزانة زجاجية مدخنة', 'مرآة قوسية كاملة الارتفاع', 'طاولة تجميل مدمجة', 'خزائن من الأرض للسقف', 'مقعد أوتوماني مبطن'],
    'attic-livingroom': ['أريكة قطاعية على شكل L', 'مدفأة كهربائية مدمجة', 'طاولة قهوة رخامية', 'جدار تلفزيون مضلع', 'فن جداري نحتي', 'منطقة طعام متكاملة'],
    'attic-kitchen': ['خزائن بيضاء بدون مقابض', 'جدار خلفي رخامي', 'فرن وماكينة قهوة مدمجة', 'ثلاجة فولاذية', 'موقد حثي', 'صنبور نحاسي أحادي'],
    'attic-bathroom': ['دش زجاجي بدون إطار', 'خزانة خشبية عائمة', 'حوض علوي مستطيل', 'إضاءة كروية معلقة', 'مرحاض معلق', 'أرفف تخزين مدمجة'],
  },
  ru: {
    'entrance-hall': ['Частный лифтовой доступ', 'Мраморная плитка пола', 'Декоративные стеклянные двери', 'Кессонный потолок', 'Рифлёные настенные панели', 'Входная дверь в медном тоне'],
    'basement-livingroom': ['Модульный дизайнерский диван', 'Золотые скульптурные акценты', 'Мраморная акцентная стена', 'Встроенный кухонный остров', 'Золотая подвесная люстра', 'Освещённый кессонный потолок'],
    'basement-bathroom': ['Душевая кабина со стеклом', 'Латунный тропический душ', 'Бронзовая настенная плитка', 'Подвесная чёрная тумба', 'Подсвечиваемые ниши', 'Навесной унитаз'],
    'master-bedroom': ['Мягкая кровать «кинг-сайз»', 'Мраморная стена изголовья', 'Стеклянная гардеробная', 'Настенный телевизор', 'Дизайнерский туалетный столик', 'Паркет «ёлочка»'],
    'master-bathroom': ['Зелёная мраморная акцентная стена', 'Умывальник-чаша', 'Латунная фурнитура', 'Безрамный душ со стеклом', 'Панорамный вид из окна', 'Навесной унитаз'],
    'bedroom': ['Серая мраморная акцентная стена', 'Двуспальная кровать в раме из ореха', 'Встроенный шкаф со стеклом', 'Дизайнерское лаунж-кресло', 'Встроенные полки', 'Паркет «ёлочка»'],
    'bedroom-bathroom': ['Коричневый мраморный душ', 'Скульптурное органическое зеркало', 'Раковина-чаша на камне', 'Настенный смеситель из латуни', 'Подсвеченные деревянные ниши', 'Зелёная лакированная тумба'],
    'first-bedroom': ['Мягкая кровать «кинг-сайз»', 'Шаровидная люстра', 'Золотые настенные акценты', 'Зеркальные панели в полный рост', 'Скульптурные зелёные кресла', 'Дизайнерские арт-объекты'],
    'first-bathroom': ['Отдельностоящая ванна на ножках', 'Двойные золотые раковины-чаши', 'Зеркало в ореховой арке', 'Система тропического душа из латуни', 'Вид на сад в полную высоту', 'Облицовка белым мрамором'],
    'dressing-room': ['Центральный остров для хранения', 'Двери шкафа из тонированного стекла', 'Зеркало-арка в полный рост', 'Встроенный туалетный столик', 'Шкафы от пола до потолка', 'Мягкий пуф'],
    'attic-livingroom': ['L-образный секционный диван', 'Встроенный электрический камин', 'Журнальный столик с мраморной столешницей', 'Рифлёная телевизионная стена', 'Скульптурное настенное искусство', 'Встроенная обеденная зона'],
    'attic-kitchen': ['Кухня без ручек', 'Мраморный фартук', 'Встроенная духовка и кофемашина', 'Холодильник из нержавеющей стали', 'Индукционная варочная панель', 'Латунный смеситель'],
    'attic-bathroom': ['Безрамный душ со стеклом', 'Подвесная деревянная тумба', 'Прямоугольная раковина-чаша', 'Шаровидные подвесные светильники', 'Навесной унитаз', 'Встроенные полки'],
  },
  uk: {
    'entrance-hall': ['Приватний ліфтовий доступ', 'Мармурова підлогова плитка', 'Декоративні скляні двері', 'Кесонна стеля', 'Рифлені настінні панелі', 'Вхідні двері мідного тону'],
    'basement-livingroom': ['Модульний дизайнерський диван', 'Золоті скульптурні акценти', 'Мармурова акцентна стіна', 'Вбудований кухонний острів', 'Золота підвісна люстра', 'Підсвічена кесонна стеля'],
    'basement-bathroom': ['Душова кабіна зі склом', 'Латунний тропічний душ', 'Бронзова настінна плитка', 'Підвісна чорна тумба', 'Підсвічені ніші', 'Підвісний унітаз'],
    'master-bedroom': ['М\'яке ліжко «кінг-сайз»', 'Мармурова стіна узголів\'я', 'Скляна гардеробна', 'Настінний телевізор', 'Дизайнерський туалетний столик', 'Паркет «ялинка»'],
    'master-bathroom': ['Зелена мармурова акцентна стіна', 'Умивальник-чаша', 'Латунна фурнітура', 'Безрамний душ зі склом', 'Панорамний вид з вікна', 'Підвісний унітаз'],
    'bedroom': ['Сіра мармурова акцентна стіна', 'Двоспальне ліжко в рамі з горіха', 'Вбудована шафа зі склом', 'Дизайнерське лаунж-крісло', 'Вбудовані полиці', 'Паркет «ялинка»'],
    'bedroom-bathroom': ['Коричневий мармуровий душ', 'Скульптурне органічне дзеркало', 'Раковина-чаша на камені', 'Настінний змішувач з латуні', 'Підсвічені дерев\'яні ніші', 'Зелена лакована тумба'],
    'first-bedroom': ['М\'яке ліжко «кінг-сайз»', 'Кулеподібна люстра', 'Золоті настінні акценти', 'Дзеркальні панелі на повний зріст', 'Скульптурні зелені крісла', 'Дизайнерські арт-об\'єкти'],
    'first-bathroom': ['Окрема ванна на ніжках', 'Подвійні золоті раковини-чаші', 'Дзеркало в горіховій арці', 'Система тропічного душу з латуні', 'Вид на сад на повну висоту', 'Облицювання білим мармуром'],
    'dressing-room': ['Центральний острів для зберігання', 'Двері шафи з тонованого скла', 'Дзеркало-арка на повний зріст', 'Вбудований туалетний столик', 'Шафи від підлоги до стелі', 'М\'який пуф'],
    'attic-livingroom': ['L-подібний секційний диван', 'Вбудований електричний камін', 'Журнальний столик з мармуровою стільницею', 'Рифлена телевізійна стіна', 'Скульптурне настінне мистецтво', 'Вбудована обідня зона'],
    'attic-kitchen': ['Кухня без ручок', 'Мармуровий фартух', 'Вбудована духовка та кавоварка', 'Холодильник з нержавіючої сталі', 'Індукційна варильна панель', 'Латунний змішувач'],
    'attic-bathroom': ['Безрамний душ зі склом', 'Підвісна дерев\'яна тумба', 'Прямокутна раковина-чаша', 'Кулеподібні підвісні світильники', 'Підвісний унітаз', 'Вбудовані полиці'],
  },
  zh: {
    'entrance-hall': ['私人电梯入口', '大理石地板砖', '装饰玻璃门', '格形天花板', '凹槽墙板', '铜色入口门'],
    'basement-livingroom': ['模块化设计沙发', '金色雕塑装饰', '大理石特色墙', '内置厨房岛台', '金色吊灯', '照明格形天花板'],
    'basement-bathroom': ['玻璃围合淋浴间', '黄铜雨淋莲蓬头', '青铜墙砖', '悬浮式黑色梳妆台', '照明展示壁龛', '悬挂式马桶'],
    'master-bedroom': ['软垫特大床', '大理石床头墙', '玻璃步入式衣柜', '壁挂式电视', '设计师梳妆台', '人字形木地板'],
    'master-bathroom': ['绿色大理石装饰墙', '台上盆梳妆台', '黄铜配件', '无框玻璃淋浴', '全景窗景', '壁挂式马桶'],
    'bedroom': ['灰色大理石特色墙', '胡桃木框双人床', '玻璃嵌入式衣柜', '设计师休闲椅', '嵌入式展示架', '人字形木地板'],
    'bedroom-bathroom': ['棕色大理石淋浴', '雕塑有机镜子', '石台上盆', '黄铜壁挂式水龙头', '照明木质壁龛', '绿色烤漆梳妆台'],
    'first-bedroom': ['簇绒特大床', '球形吊灯', '金色嵌入墙面装饰', '全高镜面板', '雕塑绿色扶手椅', '设计师艺术品'],
    'first-bathroom': ['独立爪脚浴缸', '双金色台上盆', '胡桃木拱形镜子', '黄铜雨淋花洒系统', '落地花园景观', '白色大理石饰面'],
    'dressing-room': ['中央储物岛台', '烟熏玻璃衣柜门', '全高拱形镜子', '内置梳妆台', '顶天立地柜', '软垫脚凳'],
    'attic-livingroom': ['L形组合沙发', '内置电壁炉', '大理石茶几', '凹槽电视特色墙', '雕塑墙面艺术', '内置餐厅区域'],
    'attic-kitchen': ['无把手白色橱柜', '大理石后挡板', '内置烤箱和咖啡机', '不锈钢冰箱', '电磁炉灶', '黄铜单柄水龙头'],
    'attic-bathroom': ['无框玻璃淋浴', '悬浮木质梳妆台', '矩形台上盆', '球形吊灯', '壁挂式马桶', '嵌入式储物架'],
  },
  es: {
    'entrance-hall': ['Acceso privado al ascensor', 'Suelos de mármol', 'Puertas decorativas de cristal', 'Techo artesonado', 'Paneles de pared acanalados', 'Puerta de entrada en tono cobre'],
    'basement-livingroom': ['Sofá de diseño modular', 'Acentos dorados escultóricos', 'Pared de mármol característica', 'Isla de cocina integrada', 'Lámpara colgante dorada', 'Techo artesonado iluminado'],
    'basement-bathroom': ['Ducha cerrada de cristal', 'Alcachofa de ducha lluvia latón', 'Azulejos de pared bronce', 'Mueble negro suspendido', 'Nichos iluminados', 'Inodoro suspendido'],
    'master-bedroom': ['Cama dosel king-size tapizada', 'Pared cabecero de mármol', 'Armario walk-in de cristal', 'TV montado en pared', 'Tocador de diseño', 'Suelo de madera en espiga'],
    'master-bathroom': ['Pared de acento mármol verde', 'Lavabo sobre encimera', 'Griferías en latón', 'Ducha de cristal sin marco', 'Vista panorámica', 'Inodoro suspendido'],
    'bedroom': ['Pared de mármol gris', 'Cama doble marco nogal', 'Armario integrado de cristal', 'Sillón lounge de diseño', 'Estanterías empotradas', 'Suelo de madera en espiga'],
    'bedroom-bathroom': ['Ducha de mármol marrón', 'Espejo orgánico escultórico', 'Lavabo sobre piedra', 'Grifo mural de latón', 'Nichos de madera iluminados', 'Mueble lacado verde'],
    'first-bedroom': ['Cama king-size acolchada', 'Lámpara de araña globo', 'Acentos dorados en pared', 'Paneles de espejo de altura completa', 'Sillones verdes escultóricos', 'Piezas de arte de diseño'],
    'first-bathroom': ['Bañera exenta con patas', 'Doble lavabo sobre encimera dorado', 'Espejo de arco en nogal', 'Sistema de ducha lluvia latón', 'Vista al jardín de suelo a techo', 'Revestimiento de mármol blanco'],
    'dressing-room': ['Isla de almacenamiento central', 'Puertas de armario en cristal ahumado', 'Espejo de arco de altura completa', 'Tocador integrado', 'Armarios hasta el techo', 'Puf tapizado'],
    'attic-livingroom': ['Sofá seccional en L', 'Chimenea eléctrica integrada', 'Mesa de centro de mármol', 'Pared TV acanalada', 'Arte mural escultórico', 'Zona de comedor integrada'],
    'attic-kitchen': ['Armarios blancos sin tiradores', 'Salpicadero de mármol', 'Horno y cafetera integrados', 'Nevera de acero inoxidable', 'Placa de inducción', 'Grifo monomando en latón'],
    'attic-bathroom': ['Ducha de cristal sin marco', 'Mueble de madera suspendido', 'Lavabo rectangular sobre encimera', 'Lámparas colgantes globo', 'Inodoro suspendido', 'Estanterías empotradas'],
  },
  fr: {
    'entrance-hall': ['Accès privé par ascenseur', 'Carrelage en marbre', 'Portes vitrées décoratives', 'Plafond à caissons', 'Lambris muraux cannelés', 'Porte d\'entrée cuivrée'],
    'basement-livingroom': ['Canapé design modulaire', 'Accents sculptés dorés', 'Mur en marbre caractéristique', 'Îlot de cuisine intégré', 'Lustre suspendu doré', 'Plafond à caissons éclairé'],
    'basement-bathroom': ['Douche en verre', 'Pomme de douche pluie en laiton', 'Carrelage mural bronze', 'Meuble vasque noir suspendu', 'Niches d\'exposition éclairées', 'WC suspendu'],
    'master-bedroom': ['Lit king-size capitonné', 'Mur de tête de lit en marbre', 'Dressing en verre', 'TV murale', 'Coiffeuse design', 'Parquet à chevrons'],
    'master-bathroom': ['Mur accent marbre vert', 'Vasque à poser', 'Robinetterie en laiton', 'Douche en verre sans cadre', 'Vue panoramique', 'WC suspendu'],
    'bedroom': ['Mur en marbre gris', 'Lit double cadre noyer', 'Armoire encastrée en verre', 'Fauteuil lounge design', 'Étagères encastrées', 'Parquet à chevrons'],
    'bedroom-bathroom': ['Douche en marbre brun', 'Miroir organique sculpté', 'Vasque sur pierre', 'Robinet mural en laiton', 'Niches en bois éclairées', 'Meuble laqué vert'],
    'first-bedroom': ['Lit king-size touffeté', 'Lustre en globe', 'Accents dorés incrustés', 'Panneaux miroirs pleine hauteur', 'Fauteuils verts sculptés', 'Œuvres d\'art design'],
    'first-bathroom': ['Baignoire sur pieds', 'Double vasque à poser dorée', 'Miroir en arc en noyer', 'Système de douche pluie en laiton', 'Vue jardin sol-plafond', 'Revêtement marbre blanc'],
    'dressing-room': ['Îlot de rangement central', 'Portes d\'armoire en verre fumé', 'Miroir en arc pleine hauteur', 'Coiffeuse intégrée', 'Armoires sol-plafond', 'Pouf capitonné'],
    'attic-livingroom': ['Canapé sectionnel en L', 'Cheminée électrique intégrée', 'Table basse en marbre', 'Mur TV cannelé', 'Art mural sculpté', 'Espace repas intégré'],
    'attic-kitchen': ['Armoires blanches sans poignées', 'Crédence en marbre', 'Four et machine à café intégrés', 'Réfrigérateur en acier inoxydable', 'Plaque à induction', 'Robinet mitigeur en laiton'],
    'attic-bathroom': ['Douche en verre sans cadre', 'Meuble vasque en bois suspendu', 'Vasque rectangulaire à poser', 'Suspensions globe', 'WC suspendu', 'Étagères encastrées'],
  },
  tr: {
    'entrance-hall': ['Özel Asansör Erişimi', 'Mermer Zemin Döşemesi', 'Dekoratif Cam Kapılar', 'Kaset Tavan', 'Yivli Duvar Paneli', 'Bakır Tonlu Giriş Kapısı'],
    'basement-livingroom': ['Modüler Tasarım Kanepe', 'Altın Heykelsi Aksanlar', 'Mermer Vurgu Duvarı', 'Entegre Mutfak Adası', 'Altın Sarkıt Avize', 'Aydınlatmalı Kaset Tavan'],
    'basement-bathroom': ['Cam Kapalı Duş', 'Pirinç Yağmur Duş Başlığı', 'Bronz Duvar Karoları', 'Askılı Siyah Lavabo Dolabı', 'Aydınlatmalı Vitrin Nişleri', 'Asma Klozet'],
    'master-bedroom': ['Döşemeli King-Size Yatak', 'Mermer Başlık Duvarı', 'Cam Giyinme Odası', 'Duvara Monte TV', 'Tasarım Makyaj Alanı', 'Balıksırtı Ahşap Zemin'],
    'master-bathroom': ['Yeşil Mermer Vurgu Duvarı', 'Tezgah Üstü Lavabo', 'Boydan Boya Pirinç Armatürler', 'Çerçevesiz Cam Duş', 'Panoramik Pencere Manzarası', 'Asma Klozet'],
    'bedroom': ['Gri Mermer Vurgu Duvarı', 'Ceviz Çerçeveli Çift Kişilik Yatak', 'Cam Ankastre Dolap', 'Tasarım Dinlenme Koltuğu', 'Gömme Vitrin Rafları', 'Balıksırtı Ahşap Zemin'],
    'bedroom-bathroom': ['Kahverengi Mermer Duş', 'Heykelsi Organik Ayna', 'Taş Üzeri Tezgah Lavabo', 'Pirinç Duvar Bataryası', 'Aydınlatmalı Ahşap Nişler', 'Yeşil Lake Lavabo Dolabı'],
    'first-bedroom': ['Kapitone King-Size Yatak', 'Küre Kümeli Avize', 'Altın Kakma Duvar Aksanları', 'Boy Aynası Panelleri', 'Heykelsi Yeşil Koltuklar', 'Tasarım Sanat Eserleri'],
    'first-bathroom': ['Ayaklı Bağımsız Küvet', 'Çift Altın Tezgah Lavabo', 'Ceviz Kemerli Ayna', 'Pirinç Yağmur Duş Sistemi', 'Tabandan Tavana Bahçe Manzarası', 'Beyaz Mermer Kaplama'],
    'dressing-room': ['Merkezi Depolama Adası', 'Füme Cam Dolap Kapakları', 'Boydan Boya Kemerli Ayna', 'Ankastre Makyaj İstasyonu', 'Tabandan Tavana Dolaplar', 'Döşemeli Puf Oturma'],
    'attic-livingroom': ['L Şeklinde Köşe Kanepe', 'Ankastre Elektrikli Şömine', 'Mermer Tablalı Sehpa', 'Yivli TV Duvarı', 'Heykelsi Duvar Sanatı', 'Entegre Yemek Alanı'],
    'attic-kitchen': ['Kulpsuz Beyaz Dolaplar', 'Mermer Tezgah Arası', 'Ankastre Fırın ve Kahve Makinesi', 'Paslanmaz Çelik Buzdolabı', 'İndüksiyonlu Ocak', 'Pirinç Tek Kollu Batarya'],
    'attic-bathroom': ['Çerçevesiz Cam Duş', 'Askılı Ahşap Lavabo Dolabı', 'Dikdörtgen Tezgah Lavabo', 'Küre Sarkıt Aydınlatma', 'Asma Klozet', 'Gömme Depolama Rafları'],
  },
};

// ========== VILLA 2 ROOM FEATURES (overrides — art-curated rooms) ==========
const FEATURES_VILLA2: Record<Language, Record<string, string[]>> = {
  en: {
    'entrance-hall': ['Curated Statement Artwork', 'Bronze-Tone Elevator', 'Marble Floor Tiles', 'Stained-Glass Entry Doors', 'Coffered Ceiling', 'Sculptural Wall Accent'],
    'basement-livingroom': ['Curated Gallery Artworks', 'Modular Designer Sofa', 'Marble Surfaces Throughout', 'Open-Plan Dining & Kitchen', 'Gold Pendant Lighting', 'Illuminated Coffered Ceiling'],
    'first-bedroom': ['Curated Statement Artworks', 'Tufted Velvet Headboard', 'Glass-Globe Cluster Chandelier', 'Designer Green Armchairs', 'Gold Inlay Wall Accents', 'Mirrored Wall Panels'],
    'first-bathroom': ['Vibrant Statement Artwork', 'Freestanding Clawfoot Tub', 'White Marble Cladding', 'Brass Floor-Mounted Faucet', 'Garden View Window', 'Potted Indoor Greenery'],
    'dressing-room': ['Vibrant Statement Artwork', 'Built-In Vanity Station', 'Floor-to-Ceiling Sheer Curtains', 'Open Display Shelving', 'Decorative Floral Display', 'Light Wood Flooring'],
  },
  de: {
    'entrance-hall': ['Kuratiertes Statement-Kunstwerk', 'Aufzug in Bronzeoptik', 'Marmor-Bodenfliesen', 'Buntglas-Eingangstueren', 'Kassettendecke', 'Skulpturales Wandobjekt'],
    'basement-livingroom': ['Kuratierte Galerie-Kunstwerke', 'Modulares Designersofa', 'Marmorflaechen durchgaengig', 'Offene Wohn-Ess-Kueche', 'Goldene Pendelleuchten', 'Beleuchtete Kassettendecke'],
    'first-bedroom': ['Kuratierte Statement-Kunstwerke', 'Getuftete Samt-Kopfteilwand', 'Glaskugel-Kronleuchter', 'Designer-Sessel in Gruen', 'Gold-Intarsien-Wandakzente', 'Spiegelwand-Paneele'],
    'first-bathroom': ['Lebendiges Statement-Kunstwerk', 'Freistehende Vintage-Badewanne', 'Weisse Marmorverkleidung', 'Boden-Standarmatur in Messing', 'Fenster mit Gartenblick', 'Topfpflanze als Akzent'],
    'dressing-room': ['Lebendiges Statement-Kunstwerk', 'Eingebauter Schminktisch', 'Raumhohe Voile-Vorhaenge', 'Offene Displayregale', 'Dekoratives Blumenarrangement', 'Heller Holzboden'],
  },
  ar: {
    'entrance-hall': ['عمل فني مميز منسق', 'مصعد بلون البرونز', 'بلاط أرضي رخامي', 'أبواب مدخل بزجاج ملون', 'سقف مقبب', 'لمسة جدارية نحتية'],
    'basement-livingroom': ['أعمال فنية معرضية منسقة', 'أريكة مصمم معيارية', 'أسطح رخامية شاملة', 'مطبخ وطعام بتصميم مفتوح', 'إضاءة معلقة ذهبية', 'سقف مقبب مضيء'],
    'first-bedroom': ['أعمال فنية مميزة منسقة', 'لوح رأس سرير مبطن مخملي', 'ثريا كرات زجاجية', 'كراسي خضراء مصممة', 'لمسات جدارية ذهبية', 'ألواح جدارية مرآوية'],
    'first-bathroom': ['عمل فني نابض بالحياة', 'حوض استحمام كلاسيكي حر', 'كسوة رخامية بيضاء', 'صنبور أرضي نحاسي', 'نافذة بإطلالة على الحديقة', 'نبات داخلي بأصيص'],
    'dressing-room': ['عمل فني نابض بالحياة', 'طاولة تجميل مدمجة', 'ستائر شفافة من الأرض للسقف', 'رفوف عرض مفتوحة', 'تنسيق زهور زخرفي', 'أرضية خشبية فاتحة'],
  },
  ru: {
    'entrance-hall': ['Кураторское акцентное произведение искусства', 'Лифт в бронзовом тоне', 'Мраморная плитка пола', 'Входные двери с витражами', 'Кессонный потолок', 'Скульптурный настенный акцент'],
    'basement-livingroom': ['Кураторские произведения галерейного уровня', 'Модульный дизайнерский диван', 'Сплошная мраморная отделка', 'Открытая кухня-столовая', 'Золотые подвесные светильники', 'Освещённый кессонный потолок'],
    'first-bedroom': ['Кураторские акцентные произведения', 'Мягкое бархатное изголовье', 'Люстра из стеклянных шаров', 'Дизайнерские зелёные кресла', 'Золотые настенные акценты', 'Зеркальные настенные панели'],
    'first-bathroom': ['Яркое акцентное произведение', 'Отдельностоящая ванна на ножках', 'Облицовка белым мрамором', 'Напольный смеситель из латуни', 'Окно с видом на сад', 'Комнатное растение в горшке'],
    'dressing-room': ['Яркое акцентное произведение', 'Встроенный туалетный столик', 'Тюлевые шторы во всю высоту', 'Открытые декоративные полки', 'Декоративная цветочная композиция', 'Светлый деревянный пол'],
  },
  uk: {
    'entrance-hall': ['Кураторський акцентний витвір мистецтва', 'Ліфт у бронзовому тоні', 'Мармурова підлогова плитка', 'Вхідні двері з вітражами', 'Кесонна стеля', 'Скульптурний настінний акцент'],
    'basement-livingroom': ['Кураторські галерейні витвори мистецтва', 'Модульний дизайнерський диван', 'Суцільне мармурове оздоблення', 'Відкрита кухня-їдальня', 'Золоті підвісні світильники', 'Підсвічена кесонна стеля'],
    'first-bedroom': ['Кураторські акцентні витвори', 'М\'яке оксамитове узголів\'я', 'Люстра зі скляних куль', 'Дизайнерські зелені крісла', 'Золоті настінні акценти', 'Дзеркальні настінні панелі'],
    'first-bathroom': ['Яскравий акцентний витвір', 'Окрема ванна на ніжках', 'Облицювання білим мармуром', 'Підлоговий змішувач з латуні', 'Вікно з видом на сад', 'Кімнатна рослина в горщику'],
    'dressing-room': ['Яскравий акцентний витвір', 'Вбудований туалетний столик', 'Тюлеві штори на всю висоту', 'Відкриті декоративні полиці', 'Декоративна квіткова композиція', 'Світла дерев\'яна підлога'],
  },
  zh: {
    'entrance-hall': ['精选标志性艺术品', '青铜色调电梯', '大理石地板砖', '彩绘玻璃入口门', '格形天花板', '雕塑墙面装饰'],
    'basement-livingroom': ['精选画廊艺术品', '模块化设计沙发', '大理石饰面贯穿', '开放式餐厨', '金色吊灯', '照明格形天花板'],
    'first-bedroom': ['精选标志性艺术品', '簇绒天鹅绒床头板', '玻璃球簇灯', '设计师绿色扶手椅', '金色嵌入墙面装饰', '镜面墙板'],
    'first-bathroom': ['充满活力的艺术品', '独立爪脚浴缸', '白色大理石饰面', '黄铜地面立式龙头', '花园景观窗', '室内盆栽植物'],
    'dressing-room': ['充满活力的艺术品', '内置梳妆台', '落地纱帘', '开放式展示架', '装饰花艺', '浅色木地板'],
  },
  es: {
    'entrance-hall': ['Obra de arte de autor', 'Ascensor en tono bronce', 'Suelos de mármol', 'Puertas de entrada con vidriera', 'Techo artesonado', 'Acento mural escultórico'],
    'basement-livingroom': ['Obras de galería seleccionadas', 'Sofá de diseño modular', 'Superficies de mármol integrales', 'Cocina-comedor abierta', 'Lámparas colgantes doradas', 'Techo artesonado iluminado'],
    'first-bedroom': ['Obras de arte de autor', 'Cabecero acolchado de terciopelo', 'Lámpara de globos de cristal', 'Sillones verdes de diseño', 'Acentos dorados en pared', 'Paneles murales en espejo'],
    'first-bathroom': ['Obra de arte vibrante', 'Bañera exenta con patas', 'Revestimiento mármol blanco', 'Grifería de pie en latón', 'Ventana con vista al jardín', 'Planta de interior decorativa'],
    'dressing-room': ['Obra de arte vibrante', 'Tocador integrado', 'Cortinas vaporosas hasta el techo', 'Estanterías abiertas', 'Composición floral decorativa', 'Suelo de madera clara'],
  },
  fr: {
    'entrance-hall': ['Œuvre d\'art signature', 'Ascenseur ton bronze', 'Carrelage en marbre', 'Portes d\'entrée en vitrail', 'Plafond à caissons', 'Accent mural sculpté'],
    'basement-livingroom': ['Œuvres de galerie sélectionnées', 'Canapé design modulaire', 'Surfaces en marbre intégrales', 'Cuisine-salle à manger ouverte', 'Suspensions dorées', 'Plafond à caissons éclairé'],
    'first-bedroom': ['Œuvres d\'art signature', 'Tête de lit capitonnée velours', 'Lustre à globes de verre', 'Fauteuils verts design', 'Accents dorés muraux', 'Panneaux muraux en miroir'],
    'first-bathroom': ['Œuvre d\'art vibrante', 'Baignoire sur pieds', 'Revêtement marbre blanc', 'Robinetterie au sol en laiton', 'Fenêtre vue jardin', 'Plante d\'intérieur décorative'],
    'dressing-room': ['Œuvre d\'art vibrante', 'Coiffeuse intégrée', 'Voilages du sol au plafond', 'Étagères d\'exposition ouvertes', 'Composition florale décorative', 'Parquet bois clair'],
  },
  tr: {
    'entrance-hall': ['Özenle Seçilmiş İmza Sanat Eseri', 'Bronz Tonlu Asansör', 'Mermer Zemin Döşemesi', 'Vitray Giriş Kapıları', 'Kaset Tavan', 'Heykelsi Duvar Aksanı'],
    'basement-livingroom': ['Özenle Seçilmiş Galeri Eserleri', 'Modüler Tasarım Kanepe', 'Boydan Boya Mermer Yüzeyler', 'Açık Plan Yemek ve Mutfak', 'Altın Sarkıt Aydınlatma', 'Aydınlatmalı Kaset Tavan'],
    'first-bedroom': ['Özenle Seçilmiş İmza Eserleri', 'Kapitone Kadife Yatak Başlığı', 'Cam Küre Kümeli Avize', 'Tasarım Yeşil Koltuklar', 'Altın Kakma Duvar Aksanları', 'Aynalı Duvar Panelleri'],
    'first-bathroom': ['Canlı İmza Sanat Eseri', 'Ayaklı Bağımsız Küvet', 'Beyaz Mermer Kaplama', 'Pirinç Yerden Batarya', 'Bahçe Manzaralı Pencere', 'Saksıda İç Mekan Bitkisi'],
    'dressing-room': ['Canlı İmza Sanat Eseri', 'Ankastre Makyaj İstasyonu', 'Tabandan Tavana Tül Perdeler', 'Açık Vitrin Rafları', 'Dekoratif Çiçek Düzenlemesi', 'Açık Renk Ahşap Zemin'],
  },
};

// ========== FLOOR & ROOM NAME LOOKUP TABLES ==========
const FLOOR_NAMES: Record<Language, Record<string, string>> = {
  en: { basement: 'Basement Floor', 'ground-floor': 'Ground Floor', 'first-floor': 'First Floor', attic: 'Attic Floor' },
  de: { basement: 'Untergeschoss', 'ground-floor': 'Erdgeschoss', 'first-floor': 'Obergeschoss', attic: 'Dachgeschoss' },
  ar: { basement: 'الطابق السفلي', 'ground-floor': 'الطابق الأرضي', 'first-floor': 'الطابق الأول', attic: 'العلية' },
  ru: { basement: 'Подвальный этаж', 'ground-floor': 'Первый этаж', 'first-floor': 'Второй этаж', attic: 'Мансарда' },
  uk: { basement: 'Підвальний поверх', 'ground-floor': 'Перший поверх', 'first-floor': 'Другий поверх', attic: 'Мансарда' },
  zh: { basement: '地下室', 'ground-floor': '一楼', 'first-floor': '二楼', attic: '阁楼' },
  es: { basement: 'Planta Baja', 'ground-floor': 'Planta Principal', 'first-floor': 'Primera Planta', attic: 'Ático' },
  fr: { basement: 'Sous-sol', 'ground-floor': 'Rez-de-chaussée', 'first-floor': 'Premier Étage', attic: 'Grenier' },
  tr: { basement: 'Bodrum Katı', 'ground-floor': 'Zemin Kat', 'first-floor': 'Birinci Kat', attic: 'Çatı Katı' },
};

const ROOM_NAMES: Record<Language, Record<string, string>> = {
  en: {
    'entrance-hall': 'Entrance Hall', 'basement-livingroom': 'Living Room', 'basement-bathroom': 'Bathroom',
    'master-bedroom': 'Master Bedroom', 'master-bathroom': 'Master Bathroom', 'bedroom': 'Bedroom',
    'bedroom-bathroom': 'Bedroom Bathroom', 'first-bedroom': 'Bedroom', 'first-bathroom': 'Bathroom',
    'dressing-room': 'Dressing Room', 'attic-livingroom': 'Living Room', 'attic-kitchen': 'Kitchen', 'attic-bathroom': 'Bathroom',
  },
  de: {
    'entrance-hall': 'Eingangshalle', 'basement-livingroom': 'Wohnzimmer', 'basement-bathroom': 'Badezimmer',
    'master-bedroom': 'Hauptschlafzimmer', 'master-bathroom': 'Hauptbadezimmer', 'bedroom': 'Schlafzimmer',
    'bedroom-bathroom': 'Schlafzimmer-Bad', 'first-bedroom': 'Schlafzimmer', 'first-bathroom': 'Badezimmer',
    'dressing-room': 'Ankleideraum', 'attic-livingroom': 'Wohnzimmer', 'attic-kitchen': 'Kueche', 'attic-bathroom': 'Badezimmer',
  },
  ar: {
    'entrance-hall': 'قاعة المدخل', 'basement-livingroom': 'غرفة المعيشة', 'basement-bathroom': 'الحمام',
    'master-bedroom': 'غرفة النوم الرئيسية', 'master-bathroom': 'الحمام الرئيسي', 'bedroom': 'غرفة النوم',
    'bedroom-bathroom': 'حمام غرفة النوم', 'first-bedroom': 'غرفة النوم', 'first-bathroom': 'الحمام',
    'dressing-room': 'غرفة الملابس', 'attic-livingroom': 'غرفة المعيشة', 'attic-kitchen': 'المطبخ', 'attic-bathroom': 'الحمام',
  },
  ru: {
    'entrance-hall': 'Входной холл', 'basement-livingroom': 'Гостиная', 'basement-bathroom': 'Ванная',
    'master-bedroom': 'Главная спальня', 'master-bathroom': 'Главная ванная', 'bedroom': 'Спальня',
    'bedroom-bathroom': 'Ванная при спальне', 'first-bedroom': 'Спальня', 'first-bathroom': 'Ванная',
    'dressing-room': 'Гардеробная', 'attic-livingroom': 'Гостиная', 'attic-kitchen': 'Кухня', 'attic-bathroom': 'Ванная',
  },
  uk: {
    'entrance-hall': 'Вхідний хол', 'basement-livingroom': 'Вітальня', 'basement-bathroom': 'Ванна кімната',
    'master-bedroom': 'Головна спальня', 'master-bathroom': 'Головна ванна', 'bedroom': 'Спальня',
    'bedroom-bathroom': 'Ванна при спальні', 'first-bedroom': 'Спальня', 'first-bathroom': 'Ванна кімната',
    'dressing-room': 'Гардеробна', 'attic-livingroom': 'Вітальня', 'attic-kitchen': 'Кухня', 'attic-bathroom': 'Ванна кімната',
  },
  zh: {
    'entrance-hall': '入口大厅', 'basement-livingroom': '客厅', 'basement-bathroom': '浴室',
    'master-bedroom': '主卧室', 'master-bathroom': '主浴室', 'bedroom': '卧室',
    'bedroom-bathroom': '卧室浴室', 'first-bedroom': '卧室', 'first-bathroom': '浴室',
    'dressing-room': '更衣室', 'attic-livingroom': '客厅', 'attic-kitchen': '厨房', 'attic-bathroom': '浴室',
  },
  es: {
    'entrance-hall': 'Vestíbulo', 'basement-livingroom': 'Sala de Estar', 'basement-bathroom': 'Baño',
    'master-bedroom': 'Dormitorio Principal', 'master-bathroom': 'Baño Principal', 'bedroom': 'Dormitorio',
    'bedroom-bathroom': 'Baño de Habitación', 'first-bedroom': 'Dormitorio', 'first-bathroom': 'Baño',
    'dressing-room': 'Vestidor', 'attic-livingroom': 'Sala de Estar', 'attic-kitchen': 'Cocina', 'attic-bathroom': 'Baño',
  },
  fr: {
    'entrance-hall': 'Hall d\'Entrée', 'basement-livingroom': 'Salon', 'basement-bathroom': 'Salle de Bain',
    'master-bedroom': 'Chambre Principale', 'master-bathroom': 'Salle de Bain Principale', 'bedroom': 'Chambre',
    'bedroom-bathroom': 'Salle de Bain de Chambre', 'first-bedroom': 'Chambre', 'first-bathroom': 'Salle de Bain',
    'dressing-room': 'Dressing', 'attic-livingroom': 'Salon', 'attic-kitchen': 'Cuisine', 'attic-bathroom': 'Salle de Bain',
  },
  tr: {
    'entrance-hall': 'Giriş Holü', 'basement-livingroom': 'Oturma Odası', 'basement-bathroom': 'Banyo',
    'master-bedroom': 'Ebeveyn Yatak Odası', 'master-bathroom': 'Ebeveyn Banyosu', 'bedroom': 'Yatak Odası',
    'bedroom-bathroom': 'Yatak Odası Banyosu', 'first-bedroom': 'Yatak Odası', 'first-bathroom': 'Banyo',
    'dressing-room': 'Giyinme Odası', 'attic-livingroom': 'Oturma Odası', 'attic-kitchen': 'Mutfak', 'attic-bathroom': 'Banyo',
  },
};

// ========== FLOOR BUILDERS ==========
const createFloors = (lang: Language) => {
  const f = FEATURES[lang];
  const fn = FLOOR_NAMES[lang];
  const rn = ROOM_NAMES[lang];
  return [
    {
      id: 'basement', name: fn.basement, level: -1,
      birdEyeImage: `${IMG}/basement/livingroom/1.png?v=2`,
      floorPlanImage: `${IMG}/floorplans/basement.webp`,
      rooms: [
        { id: 'entrance-hall', name: rn['entrance-hall'], images: [`${IMG}/basement/entrance/1.png`, `${IMG}/basement/entrance/2.png`, `${IMG}/basement/entrance/3.png`], features: f['entrance-hall'] },
        { id: 'basement-livingroom', name: rn['basement-livingroom'], images: [`${IMG}/basement/livingroom/1.png?v=2`, `${IMG}/basement/livingroom/2.png?v=2`, `${IMG}/basement/livingroom/3.png?v=2`, `${IMG}/basement/livingroom/4.png`, `${IMG}/basement/livingroom/5.png`, `${IMG}/basement/livingroom/6.png`, `${IMG}/basement/livingroom/7.png`], features: f['basement-livingroom'] },
        { id: 'basement-bathroom', name: rn['basement-bathroom'], images: [`${IMG}/basement/bathroom/1.png`, `${IMG}/basement/bathroom/2.png`], features: f['basement-bathroom'] },
      ],
    },
    {
      id: 'ground-floor', name: fn['ground-floor'], level: 0,
      birdEyeImage: `${IMG}/ground-floor/master-bedroom/1.png?v=2`,
      floorPlanImage: `${IMG}/floorplans/ground-floor.webp`,
      rooms: [
        { id: 'master-bedroom', name: rn['master-bedroom'], images: [`${IMG}/ground-floor/master-bedroom/1.png?v=2`, `${IMG}/ground-floor/master-bedroom/2.png?v=2`, `${IMG}/ground-floor/master-bedroom/3.png`, `${IMG}/ground-floor/master-bedroom/4.png`], features: f['master-bedroom'] },
        { id: 'master-bathroom', name: rn['master-bathroom'], images: [`${IMG}/ground-floor/master-bathroom/1.png`, `${IMG}/ground-floor/master-bathroom/2.png`], features: f['master-bathroom'] },
        { id: 'bedroom', name: rn['bedroom'], images: [`${IMG}/ground-floor/bedroom/1.png?v=2`, `${IMG}/ground-floor/bedroom/2.png`, `${IMG}/ground-floor/bedroom/3.png`], features: f['bedroom'] },
        { id: 'bedroom-bathroom', name: rn['bedroom-bathroom'], images: [`${IMG}/ground-floor/bedroom-bathroom/1.png`, `${IMG}/ground-floor/bedroom-bathroom/2.png`], features: f['bedroom-bathroom'] },
      ],
    },
    {
      id: 'first-floor', name: fn['first-floor'], level: 1,
      birdEyeImage: `${IMG}/first-floor/bedroom/1.png`,
      floorPlanImage: `${IMG}/floorplans/first-floor.webp`,
      rooms: [
        { id: 'first-bedroom', name: rn['first-bedroom'], images: [`${IMG}/first-floor/bedroom/1.png`, `${IMG}/first-floor/bedroom/2.png`, `${IMG}/first-floor/bedroom/3.png`, `${IMG}/first-floor/bedroom/4.png`, `${IMG}/first-floor/bedroom/5.png`, `${IMG}/first-floor/bedroom/6.png`], features: f['first-bedroom'] },
        { id: 'first-bathroom', name: rn['first-bathroom'], images: [`${IMG}/first-floor/bathroom/1.png`, `${IMG}/first-floor/bathroom/2.png`, `${IMG}/first-floor/bathroom/3.png`], features: f['first-bathroom'] },
        { id: 'dressing-room', name: rn['dressing-room'], images: [`${IMG}/first-floor/dressing-room/1.png`, `${IMG}/first-floor/dressing-room/2.png`, `${IMG}/first-floor/dressing-room/3.png`], features: f['dressing-room'] },
      ],
    },
    {
      id: 'attic', name: fn.attic, level: 2,
      birdEyeImage: `${IMG}/attic/livingroom/1.png`,
      floorPlanImage: `${IMG}/floorplans/attic.webp`,
      rooms: [
        { id: 'attic-livingroom', name: rn['attic-livingroom'], images: [`${IMG}/attic/livingroom/1.png`, `${IMG}/attic/livingroom/2.png`, `${IMG}/attic/livingroom/3.png`, `${IMG}/attic/livingroom/4.png?v=2`], features: f['attic-livingroom'] },
        { id: 'attic-kitchen', name: rn['attic-kitchen'], images: [`${IMG}/attic/kitchen/1.png`, `${IMG}/attic/kitchen/2.png`, `${IMG}/attic/kitchen/3.png`], features: f['attic-kitchen'] },
        { id: 'attic-bathroom', name: rn['attic-bathroom'], images: [`${IMG}/attic/bathroom/1.png`], features: f['attic-bathroom'] },
      ],
    },
  ];
};

const createFloorsVilla2 = (lang: Language) => {
  const f = { ...FEATURES[lang], ...FEATURES_VILLA2[lang] };
  const fn = FLOOR_NAMES[lang];
  const rn = ROOM_NAMES[lang];
  return [
    {
      id: 'basement', name: fn.basement, level: -1,
      birdEyeImage: `${IMG2}/basement/livingroom/3.png`,
      floorPlanImage: `${IMG}/floorplans/basement.webp`,
      rooms: [
        { id: 'entrance-hall', name: rn['entrance-hall'], images: [`${IMG2}/basement/entrance/4.png`, `${IMG2}/basement/entrance/2.png`, `${IMG2}/basement/entrance/3.png`], features: f['entrance-hall'] },
        { id: 'basement-livingroom', name: rn['basement-livingroom'], images: [`${IMG2}/basement/livingroom/2.jpg`, `${IMG2}/basement/livingroom/3.png`, `${IMG2}/basement/livingroom/4.png`, `${IMG2}/basement/livingroom/5.png`, `${IMG2}/basement/livingroom/7.jpeg`], features: f['basement-livingroom'] },
        { id: 'basement-bathroom', name: rn['basement-bathroom'], images: [`${IMG}/basement/bathroom/1.png`, `${IMG}/basement/bathroom/2.png`], features: f['basement-bathroom'] },
      ],
    },
    {
      id: 'ground-floor', name: fn['ground-floor'], level: 0,
      birdEyeImage: `${IMG}/ground-floor/master-bedroom/1.png?v=2`,
      floorPlanImage: `${IMG}/floorplans/ground-floor.webp`,
      rooms: [
        { id: 'master-bedroom', name: rn['master-bedroom'], images: [`${IMG}/ground-floor/master-bedroom/1.png?v=2`, `${IMG}/ground-floor/master-bedroom/2.png?v=2`, `${IMG}/ground-floor/master-bedroom/3.png`, `${IMG}/ground-floor/master-bedroom/4.png`], features: f['master-bedroom'] },
        { id: 'master-bathroom', name: rn['master-bathroom'], images: [`${IMG}/ground-floor/master-bathroom/1.png`, `${IMG}/ground-floor/master-bathroom/2.png`], features: f['master-bathroom'] },
        { id: 'bedroom', name: rn['bedroom'], images: [`${IMG}/ground-floor/bedroom/1.png?v=2`, `${IMG}/ground-floor/bedroom/2.png`, `${IMG}/ground-floor/bedroom/3.png`], features: f['bedroom'] },
        { id: 'bedroom-bathroom', name: rn['bedroom-bathroom'], images: [`${IMG}/ground-floor/bedroom-bathroom/1.png`, `${IMG}/ground-floor/bedroom-bathroom/2.png`], features: f['bedroom-bathroom'] },
      ],
    },
    {
      id: 'first-floor', name: fn['first-floor'], level: 1,
      birdEyeImage: `${IMG2}/first-floor/bedroom/1.png`,
      floorPlanImage: `${IMG}/floorplans/first-floor.webp`,
      rooms: [
        { id: 'first-bedroom', name: rn['first-bedroom'], images: [`${IMG2}/first-floor/bedroom/1.png`, `${IMG2}/first-floor/bedroom/2.png`], features: f['first-bedroom'] },
        { id: 'first-bathroom', name: rn['first-bathroom'], images: [`${IMG2}/first-floor/bathroom/1.png`], features: f['first-bathroom'] },
        { id: 'dressing-room', name: rn['dressing-room'], images: [`${IMG2}/first-floor/dressing-room/1.png`], features: f['dressing-room'] },
      ],
    },
    {
      id: 'attic', name: fn.attic, level: 2,
      birdEyeImage: `${IMG}/attic/livingroom/1.png`,
      floorPlanImage: `${IMG}/floorplans/attic.webp`,
      rooms: [
        { id: 'attic-livingroom', name: rn['attic-livingroom'], images: [`${IMG}/attic/livingroom/1.png`, `${IMG}/attic/livingroom/2.png`, `${IMG}/attic/livingroom/3.png`, `${IMG}/attic/livingroom/4.png?v=2`], features: f['attic-livingroom'] },
        { id: 'attic-kitchen', name: rn['attic-kitchen'], images: [`${IMG}/attic/kitchen/1.png`, `${IMG}/attic/kitchen/2.png`, `${IMG}/attic/kitchen/3.png`], features: f['attic-kitchen'] },
        { id: 'attic-bathroom', name: rn['attic-bathroom'], images: [`${IMG}/attic/bathroom/1.png`], features: f['attic-bathroom'] },
      ],
    },
  ];
};

// ========== VILLA CONTENT (language-specific text) ==========
const VILLA_CONTENT: Record<Language, { alpha: { tagline: string; description: string; amenities: string[] }; beta: { tagline: string; description: string; amenities: string[] } }> = {
  en: {
    alpha: {
      tagline: 'Modern Luxury on the Mediterranean',
      description: 'A stunning contemporary villa perched on the hills of Alanya, offering breathtaking panoramic views of the turquoise Mediterranean. Clean geometric lines meet lush tropical landscaping in this architectural masterpiece.',
      amenities: ['Private Pool', 'Smart Home', 'Panorama Terrace', 'Modern Kitchen', 'Dressing Room', 'Rooftop Lounge'],
    },
    beta: {
      tagline: 'Your Mirror Image of Paradise',
      description: 'The perfect twin to Villa Alpha, mirrored in layout but identical in luxury. Enjoy the same world-class finishes, private pool, and Mediterranean vistas from a unique perspective.',
      amenities: ['Private Pool', 'Smart Home', 'Panorama Terrace', 'Modern Kitchen', 'Dressing Room', 'Rooftop Lounge'],
    },
  },
  de: {
    alpha: {
      tagline: 'Moderner Luxus am Mittelmeer',
      description: 'Eine atemberaubende zeitgenoessische Villa auf den Huegeln von Alanya mit spektakulaarem Panoramablick auf das tuerkisfarbene Mittelmeer. Klare geometrische Linien treffen auf ueppige tropische Landschaft in diesem architektonischen Meisterwerk.',
      amenities: ['Privater Pool', 'Smart Home', 'Panorama-Terrasse', 'Moderne Kueche', 'Ankleideraum', 'Dachlounge'],
    },
    beta: {
      tagline: 'Dein Spiegelbild des Paradieses',
      description: 'Der perfekte Zwilling zu Villa Alpha, gespiegelt im Grundriss aber identisch im Luxus. Geniessen Sie die gleichen erstklassigen Ausstattungen, den privaten Pool und den Mittelmeerblick aus einer einzigartigen Perspektive.',
      amenities: ['Privater Pool', 'Smart Home', 'Panorama-Terrasse', 'Moderne Kueche', 'Ankleideraum', 'Dachlounge'],
    },
  },
  ar: {
    alpha: {
      tagline: 'فخامة عصرية على البحر الأبيض المتوسط',
      description: 'فيلا عصرية مذهلة على تلال ألانيا، تقدم إطلالات بانورامية خلابة على البحر الأبيض المتوسط الفيروزي. خطوط هندسية نظيفة تلتقي مع المناظر الطبيعية الاستوائية في هذه التحفة المعمارية.',
      amenities: ['مسبح خاص', 'منزل ذكي', 'تراس بانورامي', 'مطبخ حديث', 'غرفة ملابس', 'صالة على السطح'],
    },
    beta: {
      tagline: 'صورتك المرآة للفردوس',
      description: 'التوأم المثالي لفيلا ألفا، معكوس في التصميم لكن متطابق في الرفاهية. استمتع بنفس التشطيبات العالمية المستوى والمسبح الخاص والإطلالات المتوسطية من منظور فريد.',
      amenities: ['مسبح خاص', 'منزل ذكي', 'تراس بانورامي', 'مطبخ حديث', 'غرفة ملابس', 'صالة على السطح'],
    },
  },
  ru: {
    alpha: {
      tagline: 'Современная роскошь на Средиземноморье',
      description: 'Потрясающая современная вилла на холмах Алании с захватывающим панорамным видом на бирюзовое Средиземное море. Чёткие геометрические линии встречаются с пышным тропическим озеленением в этом архитектурном шедевре.',
      amenities: ['Частный бассейн', 'Умный дом', 'Панорамная терраса', 'Современная кухня', 'Гардеробная', 'Лаунж на крыше'],
    },
    beta: {
      tagline: 'Ваше зеркальное отражение рая',
      description: 'Идеальный близнец Виллы Альфа, зеркальный по планировке, но идентичный по роскоши. Наслаждайтесь той же отделкой мирового класса, частным бассейном и средиземноморскими видами с уникальной перспективы.',
      amenities: ['Частный бассейн', 'Умный дом', 'Панорамная терраса', 'Современная кухня', 'Гардеробная', 'Лаунж на крыше'],
    },
  },
  uk: {
    alpha: {
      tagline: 'Сучасна розкіш на Середземномор\'ї',
      description: 'Вражаюча сучасна вілла на пагорбах Аланії з приголомшливими панорамними видами на бірюзове Середземне море. Чіткі геометричні лінії поєднуються з буйним тропічним озелененням у цьому архітектурному шедеврі.',
      amenities: ['Приватний басейн', 'Розумний будинок', 'Панорамна тераса', 'Сучасна кухня', 'Гардеробна', 'Лаунж на даху'],
    },
    beta: {
      tagline: 'Ваше дзеркальне відображення раю',
      description: 'Ідеальний близнюк Вілли Альфа, дзеркальний за плануванням, але ідентичний у розкоші. Насолоджуйтеся тими ж оздобленнями світового класу, приватним басейном і середземноморськими видами з унікальної перспективи.',
      amenities: ['Приватний басейн', 'Розумний будинок', 'Панорамна тераса', 'Сучасна кухня', 'Гардеробна', 'Лаунж на даху'],
    },
  },
  zh: {
    alpha: {
      tagline: '地中海现代奢华',
      description: '这座令人叹为观止的当代别墅坐落在阿拉尼亚山丘之上，俯瞰土耳其石蓝地中海的壮丽全景。清晰的几何线条与郁郁葱葱的热带园林相融合，成就这一建筑杰作。',
      amenities: ['私人泳池', '智能家居', '全景露台', '现代厨房', '更衣室', '屋顶休闲区'],
    },
    beta: {
      tagline: '您的天堂镜像',
      description: '阿尔法别墅的完美孪生，布局镜像但奢华相同。从独特视角欣赏同等的世界级精装修、私人泳池和地中海美景。',
      amenities: ['私人泳池', '智能家居', '全景露台', '现代厨房', '更衣室', '屋顶休闲区'],
    },
  },
  es: {
    alpha: {
      tagline: 'Lujo Moderno en el Mediterráneo',
      description: 'Una impresionante villa contemporánea encaramada en las colinas de Alanya, con impresionantes vistas panorámicas del turquesa Mediterráneo. Líneas geométricas limpias se mezclan con exuberante paisajismo tropical en esta obra maestra arquitectónica.',
      amenities: ['Piscina Privada', 'Casa Inteligente', 'Terraza Panorámica', 'Cocina Moderna', 'Vestidor', 'Lounge en Azotea'],
    },
    beta: {
      tagline: 'Tu Reflejo del Paraíso',
      description: 'El gemelo perfecto de Villa Alpha, con distribución en espejo pero idéntico en lujo. Disfruta de los mismos acabados de clase mundial, piscina privada y vistas mediterráneas desde una perspectiva única.',
      amenities: ['Piscina Privada', 'Casa Inteligente', 'Terraza Panorámica', 'Cocina Moderna', 'Vestidor', 'Lounge en Azotea'],
    },
  },
  fr: {
    alpha: {
      tagline: 'Luxe Moderne en Méditerranée',
      description: 'Une villa contemporaine époustouflante perchée sur les collines d\'Alanya, offrant des vues panoramiques à couper le souffle sur la Méditerranée turquoise. Des lignes géométriques épurées rencontrent un paysage tropical luxuriant dans ce chef-d\'œuvre architectural.',
      amenities: ['Piscine Privée', 'Maison Connectée', 'Terrasse Panoramique', 'Cuisine Moderne', 'Dressing', 'Lounge en Toiture'],
    },
    beta: {
      tagline: 'Votre Miroir du Paradis',
      description: 'Le jumeau parfait de Villa Alpha, en miroir dans la disposition mais identique dans le luxe. Profitez des mêmes finitions de classe mondiale, de la piscine privée et des vistas méditerranéennes depuis une perspective unique.',
      amenities: ['Piscine Privée', 'Maison Connectée', 'Terrasse Panoramique', 'Cuisine Moderne', 'Dressing', 'Lounge en Toiture'],
    },
  },
  tr: {
    alpha: {
      tagline: 'Akdeniz\'de Modern Lüks',
      description: 'Alanya\'nın tepelerinde yükselen, firuze Akdeniz\'in nefes kesen panoramik manzarasını sunan çarpıcı, çağdaş bir villa. Bu mimari başyapıtta net geometrik çizgiler, yemyeşil tropik peyzajla buluşuyor.',
      amenities: ['Özel Havuz', 'Akıllı Ev', 'Panoramik Teras', 'Modern Mutfak', 'Giyinme Odası', 'Çatı Lounge'],
    },
    beta: {
      tagline: 'Cennetin Aynadaki Yansıması',
      description: 'Villa Alpha\'nın kusursuz ikizi; yerleşimde aynalanmış ama lükste birebir aynı. Aynı dünya standardındaki işçiliğin, özel havuzun ve Akdeniz manzarasının keyfini benzersiz bir perspektiften çıkarın.',
      amenities: ['Özel Havuz', 'Akıllı Ev', 'Panoramik Teras', 'Modern Mutfak', 'Giyinme Odası', 'Çatı Lounge'],
    },
  },
};

// ========== VILLA DATA BUILDER ==========
const buildVillas = (lang: Language): Villa[] => [
  {
    id: 'villa-a', name: 'Villa Alpha',
    tagline: VILLA_CONTENT[lang].alpha.tagline,
    description: VILLA_CONTENT[lang].alpha.description,
    bedrooms: 3, bathrooms: 4, sqMeters: 468,
    amenities: VILLA_CONTENT[lang].alpha.amenities,
    heroImages: [`${IMG}/exterior/3.png?v=3`, `${IMG}/exterior/5.png?v=3`],
    exteriorImages: [`${IMG}/exterior/3.png?v=3`, `${IMG}/exterior/5.png?v=3`, `${IMG}/exterior/9.png?v=2`, `${IMG}/exterior/10.png?v=2`, `${IMG}/exterior/11.png?v=2`, `${IMG}/exterior/12.png?v=2`, `${IMG}/exterior/13.png?v=2`, `${IMG}/exterior/14.png?v=2`],
    interiorCutawayImage: `${IMG}/exterior/aerial.jpg?v=2`,
    floors: createFloorsVilla2(lang),
  },
  {
    id: 'villa-b', name: 'Villa Beta',
    tagline: VILLA_CONTENT[lang].beta.tagline,
    description: VILLA_CONTENT[lang].beta.description,
    bedrooms: 3, bathrooms: 4, sqMeters: 468,
    amenities: VILLA_CONTENT[lang].beta.amenities,
    heroImages: [`${IMG}/exterior/1.png?v=2`, `${IMG}/exterior/7.png?v=2`],
    exteriorImages: [`${IMG}/exterior/1.png?v=2`, `${IMG}/exterior/2.png?v=2`, `${IMG}/exterior/3.png?v=3`, `${IMG}/exterior/4.png?v=2`, `${IMG}/exterior/5.png?v=3`, `${IMG}/exterior/6.png?v=2`, `${IMG}/exterior/7.png?v=2`, `${IMG}/exterior/8.png?v=2`, `${IMG}/exterior/9.png?v=2`, `${IMG}/exterior/10.png?v=2`, `${IMG}/exterior/11.png?v=2`, `${IMG}/exterior/12.png?v=2`, `${IMG}/exterior/13.png?v=2`, `${IMG}/exterior/14.png?v=2`],
    interiorCutawayImage: `${IMG}/exterior/aerial.jpg?v=2`,
    floors: createFloors(lang),
  },
];

// ========== UI TRANSLATIONS ==========
const TRANSLATIONS: Record<Language, {
  nav: { collection: string; explore: string; concierge: string; contact: string };
  hero: { subtitle: string; titleMain: string; titleSub: string; description: string; discover: string };
  showcase: { subtitle: string; title: string; bedrooms: string; bathrooms: string; details: string };
  explorer: { subtitle: string; title: string; description: string; exterior: string; interior: string; selectFloor: string; backToOverview: string; backToFloor: string; basement: string; groundFloor: string; firstFloor: string; attic: string; view3D: string; floorPlan: string };
  concierge: { greeting: string; placeholder: string; online: string; unavailable: string };
  footer: { desc: string; contact: string; follow: string; rights: string };
}> = {
  en: {
    nav: { collection: 'Collection', explore: 'Explore', concierge: 'Concierge', contact: 'Contact' },
    hero: { subtitle: 'Exclusive Luxury Villa Collection', titleMain: 'Zanktum', titleSub: 'Villas', description: 'A private sanctuary. 250 metres above the everyday. Where history whispers from the castle. Where the sea breathes below. Where you belong.', discover: 'Discover' },
    showcase: { subtitle: 'Your Villas at the Zanktum', title: 'Two Masterpieces. Unrepeatable.', bedrooms: 'Bedrooms', bathrooms: 'Bathrooms', details: 'Explore Villa' },
    explorer: { subtitle: 'Interactive Experience', title: 'Explore The Villas', description: 'Discover every detail of our luxury twin villas from the outside in.', exterior: 'Exterior', interior: 'Interior', selectFloor: 'Click to explore', backToOverview: 'Back to Overview', backToFloor: 'Back to Floor Plan', basement: 'Basement', groundFloor: 'Ground Floor', firstFloor: 'First Floor', attic: 'Attic', view3D: '3D View', floorPlan: 'Floor Plan' },
    concierge: { greeting: 'Good day. I am Aria, your personal concierge. How may I assist you with your Alanya experience today?', placeholder: 'Ask about availability or amenities...', online: 'Online', unavailable: 'I apologize, but I am momentarily unable to access the network.' },
    footer: { desc: 'Two exclusive villas at 250m above Alanya. A total work of art of architecture, master craftsmanship and world-class artistry.', contact: 'Contact', follow: 'Follow', rights: '\u00a9 2026 ZANKTUM VILLAS Alanya. All Rights Reserved.' },
  },
  de: {
    nav: { collection: 'Kollektion', explore: 'Erkunden', concierge: 'Concierge', contact: 'Kontakt' },
    hero: { subtitle: 'Exklusive Luxusvilla-Kollektion', titleMain: 'Zanktum', titleSub: 'Villas', description: 'Eine private Zuflucht. 250 Meter über der alltäglichen Welt. Wo Geschichte aus der Burg flüstert. Wo das Meer unter Ihnen atmet. Wo Sie hingehören.', discover: 'Villen Entdecken' },
    showcase: { subtitle: 'Ihre Villen im Zanktum', title: 'Zwei Meisterwerke. Unwiederholbar.', bedrooms: 'Schlafzimmer', bathrooms: 'Badezimmer', details: 'Villa Erkunden' },
    explorer: { subtitle: 'Interaktives Erlebnis', title: 'Die Villen Erkunden', description: 'Entdecken Sie jedes Detail unserer Luxus-Zwillingsvillen von aussen nach innen.', exterior: 'Exterieur', interior: 'Interieur', selectFloor: 'Klicken zum Erkunden', backToOverview: 'Zurueck zur Uebersicht', backToFloor: 'Zurueck zum Grundriss', basement: 'Untergeschoss', groundFloor: 'Erdgeschoss', firstFloor: 'Obergeschoss', attic: 'Dachgeschoss', view3D: '3D-Ansicht', floorPlan: 'Grundriss' },
    concierge: { greeting: 'Guten Tag. Ich bin Aria, Ihr persoenlicher Concierge. Wie kann ich Ihnen heute bei Ihrem Alanya-Erlebnis behilflich sein?', placeholder: 'Fragen Sie nach Verfuegbarkeit oder Ausstattung...', online: 'Online', unavailable: 'Ich bitte um Entschuldigung, aber ich kann momentan keine Verbindung zum Netzwerk herstellen.' },
    footer: { desc: 'Zwei exklusive Villen, 250m \u00fcber Alanya. Ein Gesamtkunstwerk aus Architektur, meisterhafter Bauausf\u00fchrung und weltbekannter K\u00fcnstlerschaft.', contact: 'Kontakt', follow: 'Folgen', rights: '\u00a9 2026 ZANKTUM VILLAS Alanya. Alle Rechte vorbehalten.' },
  },
  ar: {
    nav: { collection: 'المجموعة', explore: 'استكشاف', concierge: 'الكونسيرج', contact: 'اتصل بنا' },
    hero: { subtitle: 'مجموعة فيلات فاخرة حصرية', titleMain: 'Zanktum', titleSub: 'Villas', description: 'ملاذ خاص. 250 متراً فوق العالم اليومي. حيث تهمس الحكايات من القلعة. حيث يتنفس البحر تحتك. حيث تنتمي.', discover: 'اكتشف الفيلات' },
    showcase: { subtitle: 'فيلتاك في زانكتم', title: 'تحفتان فنيتان لا تتكرران', bedrooms: 'غرف النوم', bathrooms: 'الحمامات', details: 'استكشف الفيلا' },
    explorer: { subtitle: 'تجربة تفاعلية', title: 'استكشف الفيلتين', description: 'اكتشف كل تفصيل في فيلتينا الفاخرتين من الخارج إلى الداخل.', exterior: 'خارجي', interior: 'داخلي', selectFloor: 'انقر للاستكشاف', backToOverview: 'العودة للنظرة العامة', backToFloor: 'العودة لمخطط الطابق', basement: 'الطابق السفلي', groundFloor: 'الطابق الأرضي', firstFloor: 'الطابق الأول', attic: 'العلية', view3D: 'منظور ثلاثي', floorPlan: 'مخطط الطابق' },
    concierge: { greeting: 'مرحباً. أنا آريا، مديرة الخدمات الشخصية. كيف يمكنني مساعدتك في تجربتك في ألانيا اليوم؟', placeholder: 'اسأل عن التوفر أو المرافق...', online: 'متصل', unavailable: 'أعتذر، لكنني غير قادرة على الاتصال بالشبكة في الوقت الحالي.' },
    footer: { desc: 'فيلتان حصريتان على ارتفاع 250 متراً فوق ألانيا. تحفة شاملة من العمارة والحرفية وفن الفنانين العالميين.', contact: 'اتصل بنا', follow: 'تابعنا', rights: '\u00a9 2026 ZANKTUM VILLAS Alanya. جميع الحقوق محفوظة.' },
  },
  ru: {
    nav: { collection: 'Коллекция', explore: 'Исследовать', concierge: 'Консьерж', contact: 'Контакт' },
    hero: { subtitle: 'Эксклюзивная коллекция люкс-вилл', titleMain: 'Zanktum', titleSub: 'Villas', description: 'Частное убежище. На 250 метров над повседневным миром. Где история шепчет из крепости. Где море дышит под вами. Где ваше место.', discover: 'Открыть виллы' },
    showcase: { subtitle: 'Ваши виллы в Zanktum', title: 'Два шедевра. Неповторимы.', bedrooms: 'Спальни', bathrooms: 'Ванные', details: 'Изучить виллу' },
    explorer: { subtitle: 'Интерактивный опыт', title: 'Исследовать виллы', description: 'Откройте каждую деталь наших роскошных вилл-двойников снаружи и внутри.', exterior: 'Экстерьер', interior: 'Интерьер', selectFloor: 'Нажмите для исследования', backToOverview: 'Назад к обзору', backToFloor: 'Назад к плану этажа', basement: 'Подвал', groundFloor: 'Первый этаж', firstFloor: 'Второй этаж', attic: 'Мансарда', view3D: '3D вид', floorPlan: 'План этажа' },
    concierge: { greeting: 'Добрый день. Я Ария, ваш персональный консьерж. Чем могу помочь вам с вашим пребыванием в Алании?', placeholder: 'Спросите о наличии мест или удобствах...', online: 'Онлайн', unavailable: 'Приношу извинения, но в данный момент я не могу подключиться к сети.' },
    footer: { desc: 'Две эксклюзивные виллы на высоте 250м над Аланией. Целостное произведение архитектуры, мастерства и мирового искусства.', contact: 'Контакт', follow: 'Подписаться', rights: '\u00a9 2026 ZANKTUM VILLAS Alanya. Все права защищены.' },
  },
  uk: {
    nav: { collection: 'Колекція', explore: 'Дослідити', concierge: 'Консьєрж', contact: 'Контакт' },
    hero: { subtitle: 'Ексклюзивна колекція люкс-вілл', titleMain: 'Zanktum', titleSub: 'Villas', description: 'Приватний прихисток. На 250 метрів над повсякденним світом. Де історія шепоче з фортеці. Де море дихає під вами. Де ваше місце.', discover: 'Дослідити вілли' },
    showcase: { subtitle: 'Ваші вілли в Zanktum', title: 'Два шедеври. Неповторні.', bedrooms: 'Спальні', bathrooms: 'Ванні', details: 'Дослідити віллу' },
    explorer: { subtitle: 'Інтерактивний досвід', title: 'Дослідити вілли', description: 'Відкрийте кожну деталь наших розкішних вілл-близнюків зовні та всередині.', exterior: 'Екстер\'єр', interior: 'Інтер\'єр', selectFloor: 'Натисніть для дослідження', backToOverview: 'Назад до огляду', backToFloor: 'Назад до плану поверху', basement: 'Підвал', groundFloor: 'Перший поверх', firstFloor: 'Другий поверх', attic: 'Мансарда', view3D: '3D вигляд', floorPlan: 'План поверху' },
    concierge: { greeting: 'Добрий день. Я Арія, ваш персональний консьєрж. Чим можу допомогти вам з перебуванням в Аланії?', placeholder: 'Запитайте про наявність або зручності...', online: 'Онлайн', unavailable: 'Перепрошую, але зараз я не можу підключитися до мережі.' },
    footer: { desc: 'Дві ексклюзивні вілли на висоті 250м над Аланією. Цілісний витвір архітектури, майстерності та світового мистецтва.', contact: 'Контакт', follow: 'Підписатись', rights: '\u00a9 2026 ZANKTUM VILLAS Alanya. Всі права захищені.' },
  },
  zh: {
    nav: { collection: '系列', explore: '探索', concierge: '礼宾', contact: '联系' },
    hero: { subtitle: '专属奢华别墅系列', titleMain: 'Zanktum', titleSub: 'Villas', description: '私人庇护所。在日常世界之上250米。古堡低语历史。脚下大海呼吸。这是您的归属。', discover: '探索别墅' },
    showcase: { subtitle: 'Zanktum的两栋别墅', title: '两件杰作，独一无二', bedrooms: '卧室', bathrooms: '浴室', details: '探索别墅' },
    explorer: { subtitle: '互动体验', title: '探索别墅', description: '从外到内探索我们豪华双子别墅的每一个细节。', exterior: '外观', interior: '内部', selectFloor: '点击探索', backToOverview: '返回概览', backToFloor: '返回平面图', basement: '地下室', groundFloor: '一楼', firstFloor: '二楼', attic: '阁楼', view3D: '3D视图', floorPlan: '平面图' },
    concierge: { greeting: '您好。我是Aria，您的私人礼宾。今天我可以为您的阿拉尼亚体验提供什么帮助？', placeholder: '询问房间情况或设施...', online: '在线', unavailable: '抱歉，我暂时无法连接到网络。' },
    footer: { desc: '两栋专属别墅，矗立于阿拉尼亚之上250米。融合建筑、精湛工艺与世界级艺术的完整作品。', contact: '联系', follow: '关注', rights: '\u00a9 2026 ZANKTUM VILLAS Alanya. 版权所有。' },
  },
  es: {
    nav: { collection: 'Colección', explore: 'Explorar', concierge: 'Conserjería', contact: 'Contacto' },
    hero: { subtitle: 'Colección Exclusiva de Villas de Lujo', titleMain: 'Zanktum', titleSub: 'Villas', description: 'Un refugio privado. 250 metros sobre el mundo cotidiano. Donde la historia susurra desde el castillo. Donde el mar respira bajo usted. Donde usted pertenece.', discover: 'Descubrir Villas' },
    showcase: { subtitle: 'Sus Villas en el Zanktum', title: 'Dos Obras Maestras. Irrepetibles.', bedrooms: 'Dormitorios', bathrooms: 'Baños', details: 'Explorar Villa' },
    explorer: { subtitle: 'Experiencia Interactiva', title: 'Explora Las Villas', description: 'Descubre cada detalle de nuestras lujosas villas gemelas de afuera hacia adentro.', exterior: 'Exterior', interior: 'Interior', selectFloor: 'Haz clic para explorar', backToOverview: 'Volver al resumen', backToFloor: 'Volver al plano', basement: 'Planta Baja', groundFloor: 'Planta Principal', firstFloor: 'Primera Planta', attic: 'Ático', view3D: 'Vista 3D', floorPlan: 'Plano' },
    concierge: { greeting: 'Buenos días. Soy Aria, su conserje personal. ¿En qué puedo ayudarle con su experiencia en Alanya hoy?', placeholder: 'Pregunte sobre disponibilidad o comodidades...', online: 'En línea', unavailable: 'Me disculpo, pero actualmente no puedo acceder a la red.' },
    footer: { desc: 'Dos villas exclusivas a 250m sobre Alanya. Una obra integral de arquitectura, maestría artesanal y arte de renombre mundial.', contact: 'Contacto', follow: 'Seguir', rights: '\u00a9 2026 ZANKTUM VILLAS Alanya. Todos los derechos reservados.' },
  },
  fr: {
    nav: { collection: 'Collection', explore: 'Explorer', concierge: 'Conciergerie', contact: 'Contact' },
    hero: { subtitle: 'Collection Exclusive de Villas de Luxe', titleMain: 'Zanktum', titleSub: 'Villas', description: 'Un refuge privé. À 250 mètres au-dessus du monde quotidien. Où l\'histoire chuchote depuis le château. Où la mer respire sous vous. Où vous appartenez.', discover: 'Découvrir les Villas' },
    showcase: { subtitle: 'Vos Villas au Zanktum', title: 'Deux Chefs-d\'Œuvre. Inégalables.', bedrooms: 'Chambres', bathrooms: 'Salles de bain', details: 'Explorer la Villa' },
    explorer: { subtitle: 'Expérience Interactive', title: 'Explorez les Villas', description: 'Découvrez chaque détail de nos villas jumelles de luxe de l\'extérieur vers l\'intérieur.', exterior: 'Extérieur', interior: 'Intérieur', selectFloor: 'Cliquez pour explorer', backToOverview: 'Retour à l\'aperçu', backToFloor: 'Retour au plan', basement: 'Sous-sol', groundFloor: 'Rez-de-chaussée', firstFloor: 'Premier Étage', attic: 'Grenier', view3D: 'Vue 3D', floorPlan: 'Plan d\'étage' },
    concierge: { greeting: 'Bonjour. Je suis Aria, votre concierge personnelle. Comment puis-je vous aider dans votre expérience à Alanya aujourd\'hui?', placeholder: 'Renseignez-vous sur la disponibilité ou les équipements...', online: 'En ligne', unavailable: 'Je m\'excuse, mais je suis momentanément incapable d\'accéder au réseau.' },
    footer: { desc: 'Deux villas exclusives à 250m au-dessus d\'Alanya. Une œuvre totale d\'architecture, de savoir-faire et d\'art de renommée mondiale.', contact: 'Contact', follow: 'Suivre', rights: '\u00a9 2026 ZANKTUM VILLAS Alanya. Tous droits réservés.' },
  },
  tr: {
    nav: { collection: 'Koleksiyon', explore: 'Keşfet', concierge: 'Konsiyerj', contact: 'İletişim' },
    hero: { subtitle: 'Özel Lüks Villa Koleksiyonu', titleMain: 'Zanktum', titleSub: 'Villas', description: 'Özel bir sığınak. Gündelik dünyanın 250 metre üzerinde. Tarihin kaleden fısıldadığı yer. Denizin altınızda nefes aldığı yer. Ait olduğunuz yer.', discover: 'Villaları Keşfet' },
    showcase: { subtitle: 'Zanktum\'daki Villalarınız', title: 'İki Başyapıt. Eşsiz.', bedrooms: 'Yatak Odası', bathrooms: 'Banyo', details: 'Villayı Keşfet' },
    explorer: { subtitle: 'Etkileşimli Deneyim', title: 'Villaları Keşfedin', description: 'Lüks ikiz villalarımızın her ayrıntısını dıştan içe keşfedin.', exterior: 'Dış Mekan', interior: 'İç Mekan', selectFloor: 'Keşfetmek için tıklayın', backToOverview: 'Genel Bakışa Dön', backToFloor: 'Kat Planına Dön', basement: 'Bodrum Katı', groundFloor: 'Zemin Kat', firstFloor: 'Birinci Kat', attic: 'Çatı Katı', view3D: '3B Görünüm', floorPlan: 'Kat Planı' },
    concierge: { greeting: 'İyi günler. Ben Aria, kişisel konsiyerjiniz. Bugün Alanya deneyiminizde size nasıl yardımcı olabilirim?', placeholder: 'Müsaitlik veya olanaklar hakkında sorun...', online: 'Çevrimiçi', unavailable: 'Özür dilerim, şu anda ağa bağlanamıyorum.' },
    footer: { desc: 'Alanya\'nın 250 m üzerinde iki özel villa. Mimari, usta işçilik ve dünyaca ünlü sanatın bütünsel bir başyapıtı.', contact: 'İletişim', follow: 'Takip Et', rights: '© 2026 ZANKTUM VILLAS Alanya. Tüm Hakları Saklıdır.' },
  },
};

// ========== EXPORTS ==========
export const getVillas = (lang: Language): Villa[] => buildVillas(lang);

export const getTranslations = (lang: Language) => TRANSLATIONS[lang];

const INVESTMENT_NAV_LABEL: Record<Language, string> = {
  en: 'Investment',
  de: 'Investment',
  ar: 'الاستثمار',
  ru: 'Инвестиции',
  uk: 'Інвестиції',
  zh: '投资',
  es: 'Inversión',
  fr: 'Investissement',
  tr: 'Yatırım',
};

const SCULPTURE_NAV_LABEL: Record<Language, string> = {
  en: 'Sculpture',
  de: 'Skulptur',
  ar: 'المنحوتة',
  ru: 'Скульптура',
  uk: 'Скульптура',
  zh: '雕塑',
  es: 'Escultura',
  fr: 'Sculpture',
  tr: 'Heykel',
};

export const getNavLinks = (lang: Language) => {
  const sn = getSanctumContent(lang).nav;
  return [
    { label: sn.why, href: '#/why' },
    { label: sn.villas, href: '#/villas' },
    { label: TRANSLATIONS[lang].nav.explore, href: '#/explore' },
    { label: sn.artist, href: '#/artist' },
    { label: SCULPTURE_NAV_LABEL[lang], href: '#/sculpture' },
    { label: sn.builder, href: '#/builder' },
    { label: INVESTMENT_NAV_LABEL[lang], href: '#/investment' },
    { label: TRANSLATIONS[lang].nav.contact, href: '#/contact' },
  ];
};
