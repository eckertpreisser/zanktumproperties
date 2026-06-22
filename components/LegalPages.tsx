import React from 'react';
import { Language } from '../types';
import { ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  page: 'impressum' | 'datenschutz' | 'cookies';
  lang: Language;
  onBack: () => void;
}

// ========== UI HELPERS ==========
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="text-2xl font-bold mb-4 text-navy-900">{title}</h2>
    {children}
  </section>
);

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-navy-900 p-6 rounded-lg">
    <div className="text-cream-100/80 leading-relaxed space-y-3">{children}</div>
  </div>
);

const SubSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-2 text-navy-900">{title}</h3>
    {children}
  </div>
);

// ========== TRANSLATIONS ==========
const T = {
  back: { en: 'Back', de: 'Zurück', ar: 'رجوع', ru: 'Назад', uk: 'Назад', zh: '返回', es: 'Volver', fr: 'Retour', tr: 'Geri' },

  // ---- IMPRESSUM ----
  impressum: {
    title:    { en: 'Legal Notice', de: 'Impressum', ar: 'البيانات القانونية', ru: 'Выходные данные', uk: 'Вихідні дані', zh: '法律声明', es: 'Aviso Legal', fr: 'Mentions Légales' },
    subtitle: { en: 'Information according to § 5 TMG (German Telemedia Act)', de: 'Angaben gemäß § 5 TMG', ar: 'معلومات وفقاً للمادة § 5 TMG (قانون الوسائط الإلكترونية الألماني)', ru: 'Информация согласно § 5 TMG (Закон о телемедиа Германии)', uk: 'Інформація відповідно до § 5 TMG (Закон про телемедіа Німеччини)', zh: '根据德国远程传媒法 § 5 TMG 提供的信息', es: 'Información según § 5 TMG (Ley alemana de medios)', fr: 'Informations selon § 5 TMG (Loi allemande sur les télémedias)' },
    provider: { en: 'Provider', de: 'Anbieter', ar: 'مزود الخدمة', ru: 'Провайдер', uk: 'Постачальник', zh: '服务提供商', es: 'Proveedor', fr: 'Prestataire' },
    contact:  { en: 'Contact', de: 'Kontakt', ar: 'التواصل', ru: 'Контакт', uk: 'Контакт', zh: '联系方式', es: 'Contacto', fr: 'Contact' },
    phone:    { en: 'Phone', de: 'Telefon', ar: 'الهاتف', ru: 'Телефон', uk: 'Телефон', zh: '电话', es: 'Teléfono', fr: 'Téléphone' },
    website:  { en: 'Website', de: 'Webseite', ar: 'الموقع الإلكتروني', ru: 'Веб-сайт', uk: 'Веб-сайт', zh: '网站', es: 'Sitio web', fr: 'Site web' },
    reps:     { en: 'Authorized Representatives', de: 'Vertretungsberechtigte Partner', ar: 'الممثلون المخولون', ru: 'Уполномоченные представители', uk: 'Уповноважені представники', zh: '授权代表', es: 'Representantes Autorizados', fr: 'Représentants autorisés' },
    regEntry: { en: 'Register Entry', de: 'Registereintrag', ar: 'السجل التجاري', ru: 'Регистрационная запись', uk: 'Реєстраційний запис', zh: '注册登记', es: 'Entrada en el registro', fr: 'Enregistrement' },
    regCourt: { en: 'Register Court', de: 'Registergericht', ar: 'محكمة التسجيل', ru: 'Регистрационный суд', uk: 'Реєстраційний суд', zh: '注册法院', es: 'Tribunal Registral', fr: 'Tribunal d\'enregistrement' },
    regNum:   { en: 'Register Number', de: 'Registernummer', ar: 'رقم التسجيل', ru: 'Регистрационный номер', uk: 'Реєстраційний номер', zh: '注册编号', es: 'Número de Registro', fr: 'Numéro d\'enregistrement' },
    vatId:    { en: 'VAT ID', de: 'Umsatzsteuer-ID', ar: 'رقم ضريبة القيمة المضافة', ru: 'Идентификатор НДС', uk: 'Ідентифікатор ПДВ', zh: '增值税编号', es: 'IVA', fr: 'TVA' },
    vatText:  { en: 'VAT identification number according to §27a of the German VAT law', de: 'Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz', ar: 'رقم تعريف ضريبة القيمة المضافة وفقاً للمادة §27a من قانون ضريبة المبيعات الألماني', ru: 'Идентификационный номер плательщика НДС согласно §27a Закона об НДС Германии', uk: 'Ідентифікаційний номер платника ПДВ відповідно до §27a Закону про ПДВ Німеччини', zh: '根据德国增值税法第27a条规定的增值税识别编号', es: 'Número de IVA según §27a de la ley alemana del IVA', fr: 'Numéro TVA selon §27a de la loi allemande sur la TVA' },
    respContent: { en: 'Responsible for Content', de: 'Verantwortlich für den Inhalt', ar: 'المسؤول عن المحتوى', ru: 'Ответственный за содержание', uk: 'Відповідальний за зміст', zh: '内容负责人', es: 'Responsable del Contenido', fr: 'Responsable du Contenu' },
    dispute:  { en: 'Dispute Resolution', de: 'Streitschlichtung', ar: 'تسوية النزاعات', ru: 'Разрешение споров', uk: 'Вирішення спорів', zh: '争议解决', es: 'Resolución de Conflictos', fr: 'Résolution des litiges' },
    disputeText1: { en: 'The European Commission provides a platform for online dispute resolution (ODR):', de: 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:', ar: 'توفر المفوضية الأوروبية منصة لتسوية النزاعات عبر الإنترنت (ODR):', ru: 'Европейская комиссия предоставляет платформу для онлайн-разрешения споров (ODR):', uk: 'Європейська комісія надає платформу для онлайн-вирішення спорів (ODR):', zh: '欧盟委员会提供在线争议解决（ODR）平台：', es: 'La Comisión Europea ofrece una plataforma de resolución de conflictos en línea (ODR):', fr: 'La Commission européenne fournit une plateforme de règlement en ligne des litiges (ODR):' },
    disputeText2: { en: 'We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.', de: 'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.', ar: 'نحن لسنا مستعدين أو ملزمين بالمشاركة في إجراءات تسوية النزاعات أمام هيئة تحكيم المستهلكين.', ru: 'Мы не готовы и не обязаны участвовать в процедурах разрешения споров перед арбитражем по защите прав потребителей.', uk: 'Ми не готові та не зобов\'язані брати участь у процедурах врегулювання спорів перед арбітражем захисту прав споживачів.', zh: '我们无意也无义务参与消费者仲裁委员会的争议解决程序。', es: 'No estamos dispuestos ni obligados a participar en procedimientos de resolución de conflictos ante una junta arbitral de consumidores.', fr: 'Nous ne sommes pas disposés ni obligés de participer à des procédures de règlement des litiges devant une commission d\'arbitrage des consommateurs.' },
    liabContent: { en: 'Liability for Content', de: 'Haftung für Inhalte', ar: 'المسؤولية عن المحتوى', ru: 'Ответственность за содержание', uk: 'Відповідальність за зміст', zh: '内容责任', es: 'Responsabilidad por el Contenido', fr: 'Responsabilité du contenu' },
    liabContentT1: { en: 'As a service provider, we are responsible for our own content on these pages according to § 7 para.1 TMG under general law. However, according to §§ 8 to 10 TMG, we are not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.', de: 'Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.', ar: 'بصفتنا مزودًا للخدمة، نحن مسؤولون عن محتوانا الخاص على هذه الصفحات وفقًا للمادة § 7 فقرة 1 من قانون TMG وفق القانون العام. ومع ذلك، وفقًا للمواد §§ 8 إلى 10 من قانون TMG، لسنا ملزمين بمراقبة معلومات الأطراف الثالثة المنقولة أو المخزنة أو التحقيق في الظروف التي تشير إلى نشاط غير قانوني.', ru: 'Как поставщик услуг, мы несём ответственность за собственный контент на этих страницах в соответствии с § 7 абз. 1 TMG в рамках общего законодательства. Однако согласно §§ 8–10 TMG мы не обязаны отслеживать передаваемую или хранимую информацию третьих лиц или расследовать обстоятельства, указывающие на незаконную деятельность.', uk: 'Як постачальник послуг, ми несемо відповідальність за власний контент на цих сторінках відповідно до § 7 абз. 1 TMG за загальним законодавством. Однак згідно з §§ 8–10 TMG ми не зобов\'язані відстежувати передану або збережену інформацію третіх сторін або розслідувати обставини, що вказують на незаконну діяльність.', zh: '作为服务提供商，根据德国远程传媒法第7条第1款，我们依据一般法律对本网站自有内容负责。但根据第8至10条，我们没有义务监控传输或存储的第三方信息，也无需调查违法行为相关情况。', es: 'Como proveedor de servicios, somos responsables del contenido propio en estas páginas según § 7 párr. 1 TMG. Sin embargo, según §§ 8 a 10 TMG, no estamos obligados a supervisar la información de terceros transmitida o almacenada ni a investigar actividades ilegales.', fr: 'En tant que prestataire de services, nous sommes responsables de notre propre contenu sur ces pages conformément au § 7 al. 1 TMG. Cependant, conformément aux §§ 8 à 10 TMG, nous ne sommes pas obligés de surveiller les informations de tiers transmises ou stockées ni d\'enquêter sur des activités illégales.' },
    liabContentT2: { en: 'Obligations to remove or block the use of information under general law remain unaffected. However, liability in this regard is only possible from the point in time at which knowledge of a specific infringement is obtained. Upon notification of corresponding violations, we will remove this content immediately.', de: 'Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.', ar: 'تظل الالتزامات بإزالة أو حظر استخدام المعلومات وفق القانون العام غير متأثرة. ومع ذلك، تكون المسؤولية في هذا الصدد ممكنة فقط من اللحظة التي يتم فيها الاطلاع على انتهاك محدد. عند الإخطار بالانتهاكات المقابلة، سنزيل هذا المحتوى فورًا.', ru: 'Обязательства по удалению или блокировке использования информации в соответствии с общим законодательством остаются в силе. Однако ответственность в этом отношении возможна только с момента получения информации о конкретном нарушении. При уведомлении о соответствующих нарушениях мы незамедлительно удалим этот контент.', uk: 'Зобов\'язання щодо видалення або блокування використання інформації відповідно до загального законодавства залишаються чинними. Проте відповідальність у цьому відношенні можлива лише з моменту отримання відомостей про конкретне порушення. При повідомленні про відповідні порушення ми негайно видалимо цей контент.', zh: '根据一般法律删除或封锁信息的义务不受影响。但只有在获悉具体侵权行为后，方可就此承担责任。一旦发现相关侵权行为，我们将立即删除该内容。', es: 'Las obligaciones de eliminar o bloquear el uso de información según la ley general no se ven afectadas. Sin embargo, la responsabilidad solo es posible a partir del conocimiento de una infracción específica. Tras la notificación, eliminaremos este contenido de inmediato.', fr: 'Les obligations de supprimer ou bloquer l\'utilisation des informations selon la loi générale restent inchangées. La responsabilité n\'est possible qu\'à partir de la connaissance d\'une violation spécifique. Dès notification, nous supprimerons ce contenu immédiatement.' },
    liabLinks: { en: 'Liability for Links', de: 'Haftung für Links', ar: 'المسؤولية عن الروابط', ru: 'Ответственность за ссылки', uk: 'Відповідальність за посилання', zh: '链接责任', es: 'Responsabilidad por enlaces', fr: 'Responsabilité pour les liens' },
    liabLinksT1: { en: 'Our offer contains links to external websites of third parties, on whose contents we have no influence. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the content of the linked pages.', de: 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.', ar: 'يحتوي عرضنا على روابط لمواقع خارجية لأطراف ثالثة لا يمكننا التأثير على محتواها. لذلك لا يمكننا تحمل أي مسؤولية عن هذا المحتوى الخارجي. يتحمل المزود أو المشغل المعني للصفحات دائمًا المسؤولية عن محتوى الصفحات المرتبطة.', ru: 'Наше предложение содержит ссылки на внешние веб-сайты третьих лиц, на содержание которых мы не имеем никакого влияния. Поэтому мы не можем нести ответственности за этот внешний контент. Ответственность за содержание связанных страниц всегда несёт соответствующий поставщик или оператор.', uk: 'Наша пропозиція містить посилання на зовнішні веб-сайти третіх сторін, на зміст яких ми не маємо жодного впливу. Тому ми не можемо нести жодної відповідальності за цей зовнішній зміст. Відповідальність за зміст пов\'язаних сторінок завжди несе відповідний провайдер або оператор.', zh: '我们的网站包含第三方外部网站的链接，我们对其内容没有影响力，因此对这些外部内容不承担任何责任。被链接页面的内容由各自的提供商负责。', es: 'Nuestra oferta contiene enlaces a sitios web externos de terceros, sobre cuyo contenido no tenemos ninguna influencia. Por tanto, no podemos asumir responsabilidad por estos contenidos. El proveedor respectivo es siempre responsable del contenido de las páginas enlazadas.', fr: 'Notre offre contient des liens vers des sites web externes de tiers, sur le contenu desquels nous n\'avons aucune influence. Par conséquent, nous ne pouvons assumer aucune responsabilité pour ces contenus. Le fournisseur respectif est toujours responsable du contenu des pages liées.' },
    liabLinksT2: { en: 'The linked pages were checked for possible legal violations at the time of linking. Illegal contents were not recognizable at the time of linking. However, a permanent control of the contents of the linked pages is not reasonable without concrete evidence of a violation. Upon notification of violations, we will remove such links immediately.', de: 'Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.', ar: 'تم فحص الصفحات المرتبطة بحثًا عن انتهاكات قانونية محتملة وقت الإضافة. لم تكن المحتويات غير القانونية قابلة للتعرف وقت الإضافة. ومع ذلك، فإن الرقابة الدائمة على محتوى الصفحات المرتبطة غير معقولة بدون أدلة ملموسة على الانتهاك. عند الإخطار بالانتهاكات، سنزيل هذه الروابط فورًا.', ru: 'Связанные страницы были проверены на наличие возможных правовых нарушений на момент размещения ссылок. В момент создания ссылок незаконный контент не был распознан. Постоянный контроль содержания связанных страниц без конкретных признаков нарушения невозможен. При уведомлении о нарушениях мы незамедлительно удалим такие ссылки.', uk: 'Пов\'язані сторінки були перевірені на наявність можливих правових порушень на момент додавання посилань. Незаконний зміст на момент додавання посилань не було виявлено. Постійний контроль вмісту пов\'язаних сторінок без конкретних ознак порушення є недоцільним. При повідомленні про порушення ми негайно видалимо такі посилання.', zh: '被链接的页面在链接时已检查是否存在可能的法律违规。链接时未发现违法内容。但在没有具体侵权证据的情况下，持续监控被链接页面是不合理的。一旦发现侵权行为，我们将立即删除此类链接。', es: 'Las páginas enlazadas fueron verificadas para detectar posibles infracciones legales en el momento del enlace. Los contenidos ilegales no eran reconocibles en ese momento. Sin embargo, una supervisión permanente sin evidencia concreta no es razonable. Tras la notificación, eliminaremos dichos enlaces de inmediato.', fr: 'Les pages liées ont été vérifiées pour détecter d\'éventuelles violations légales au moment de la mise en lien. Des contenus illégaux n\'étaient pas reconnaissables à ce moment. Un contrôle permanent sans preuve concrète n\'est pas raisonnable. Dès notification, nous supprimerons ces liens immédiatement.' },
    copyright:  { en: 'Copyright', de: 'Urheberrecht', ar: 'حقوق النشر', ru: 'Авторское право', uk: 'Авторське право', zh: '版权', es: 'Derechos de Autor', fr: 'Droits d\'auteur' },
    copyrightT1: { en: 'The content and works created by the site operators on these pages are subject to German copyright law. The reproduction, editing, distribution and any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator.', de: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.', ar: 'المحتوى والأعمال التي أنشأها مشغلو الموقع على هذه الصفحات تخضع لقانون حقوق النشر الألماني. يتطلب التكاثر والتحرير والتوزيع وأي نوع من الاستغلال خارج حدود قانون حقوق النشر الموافقة الخطية من المؤلف أو المنشئ المعني.', ru: 'Содержание и произведения, созданные операторами сайта на этих страницах, защищены немецким законодательством об авторском праве. Воспроизведение, редактирование, распространение и любой вид использования за пределами авторского права требуют письменного согласия соответствующего автора или создателя.', uk: 'Зміст та твори, створені операторами сайту на цих сторінках, захищені законодавством Німеччини про авторське право. Відтворення, редагування, розповсюдження та будь-який вид використання за межами авторського права вимагають письмової згоди відповідного автора або творця.', zh: '本网站运营商所创建的内容和作品受德国版权法保护。在版权范围之外的复制、编辑、发行和任何形式的使用均需获得相关作者或创作者的书面同意。', es: 'El contenido y las obras creados por los operadores del sitio en estas páginas están sujetos a la ley de derechos de autor alemana. La reproducción, edición y distribución fuera de los límites del derecho de autor requieren el consentimiento escrito del autor respectivo.', fr: 'Le contenu et les œuvres créés par les opérateurs du site sur ces pages sont soumis au droit d\'auteur allemand. La reproduction, l\'édition et la distribution en dehors des limites du droit d\'auteur nécessitent le consentement écrit de l\'auteur respectif.' },
    copyrightT2: { en: 'Downloads and copies of this site are only permitted for private, non-commercial use. Insofar as the content on this site was not created by the operator, the copyrights of third parties are observed. Should you become aware of a copyright infringement, please inform us accordingly. Upon notification of violations, we will remove such content immediately.', de: 'Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Sollten Sie auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.', ar: 'يُسمح بتنزيل ونسخ هذا الموقع للاستخدام الخاص غير التجاري فقط. يراعى حقوق النشر الخاصة بأطراف ثالثة للمحتوى غير المنشأ من قبل المشغل. إذا علمت بانتهاك لحقوق النشر، يرجى إعلامنا. عند الإخطار بالانتهاكات، سنزيل هذا المحتوى فورًا.', ru: 'Загрузки и копии этого сайта разрешены только для личного некоммерческого использования. Насколько контент на этом сайте не создан оператором, соблюдаются авторские права третьих лиц. Если вы обнаружите нарушение авторских прав, пожалуйста, сообщите нам. При уведомлении о нарушениях мы незамедлительно удалим такой контент.', uk: 'Завантаження та копії цього сайту дозволені лише для приватного некомерційного використання. Авторські права третіх сторін дотримуються для контенту, не створеного оператором. Якщо ви виявите порушення авторських прав, повідомте нас. При повідомленні про порушення ми негайно видалимо такий контент.', zh: '本网站的下载和副本仅供私人非商业用途。凡本网站上非由运营商创建的内容，均尊重第三方版权。如发现版权侵权问题，请及时告知我们。我们将立即删除相关内容。', es: 'Las descargas y copias de este sitio solo están permitidas para uso privado no comercial. Se respetan los derechos de autor de terceros. Si descubre una infracción de derechos de autor, le rogamos que nos informe. Eliminaremos dicho contenido de inmediato.', fr: 'Les téléchargements et copies de ce site ne sont autorisés qu\'à des fins privées non commerciales. Les droits d\'auteur de tiers sont respectés. Si vous constatez une violation du droit d\'auteur, veuillez nous en informer. Nous supprimerons ce contenu immédiatement.' },
    webDesign:  { en: 'Website Design & Development', de: 'Webdesign & Entwicklung', ar: 'تصميم وتطوير الموقع', ru: 'Дизайн и разработка сайта', uk: 'Дизайн та розробка сайту', zh: '网站设计与开发', es: 'Diseño y Desarrollo Web', fr: 'Conception et développement du site web' },
    webDesignLabel: { en: 'Website design, development, and implementation:', de: 'Webdesign, Entwicklung und Umsetzung:', ar: 'تصميم الموقع وتطويره وتنفيذه:', ru: 'Дизайн, разработка и реализация сайта:', uk: 'Дизайн, розробка та реалізація сайту:', zh: '网站设计、开发和实施：', es: 'Diseño, desarrollo e implementación del sitio web:', fr: 'Conception, développement et mise en œuvre du site web:' },
    webDesignRights: { en: 'All rights for design, concept, and implementation remain with Becker Limited.', de: 'Alle Rechte für Design, Konzept und Umsetzung verbleiben bei Becker Limited.', ar: 'جميع حقوق التصميم والمفهوم والتنفيذ تبقى مع Becker Limited.', ru: 'Все права на дизайн, концепцию и реализацию принадлежат Becker Limited.', uk: 'Всі права на дизайн, концепцію та реалізацію залишаються за Becker Limited.', zh: '设计、概念和实施的所有权利归Becker Limited所有。', es: 'Todos los derechos de diseño, concepto e implementación corresponden a Becker Limited.', fr: 'Tous les droits de conception, concept et mise en œuvre appartiennent à Becker Limited.' },
  },

  // ---- DATENSCHUTZ ----
  privacy: {
    title:    { en: 'Privacy Policy', de: 'Datenschutzerklärung', ar: 'سياسة الخصوصية', ru: 'Политика конфиденциальности', uk: 'Політика конфіденційності', zh: '隐私政策', es: 'Política de Privacidad', fr: 'Politique de Confidentialité' },
    lastUpdated: { en: 'Last updated', de: 'Zuletzt aktualisiert', ar: 'آخر تحديث', ru: 'Последнее обновление', uk: 'Останнє оновлення', zh: '最后更新', es: 'Última actualización', fr: 'Dernière mise à jour' },
    s1: { en: '1. Data Protection at a Glance', de: '1. Datenschutz auf einen Blick', ar: '1. حماية البيانات في لمحة', ru: '1. Защита данных в кратком изложении', uk: '1. Захист даних у двох словах', zh: '1. 数据保护概览', es: '1. Protección de Datos en Resumen', fr: '1. Protection des données en un coup d\'œil' },
    s1a: { en: 'General Information', de: 'Allgemeine Hinweise', ar: 'معلومات عامة', ru: 'Общая информация', uk: 'Загальна інформація', zh: '一般信息', es: 'Información General', fr: 'Informations générales' },
    s1aT: { en: 'The following information provides a simple overview of what happens to your personal data when you visit this website. Personal data is any data by which you can be personally identified.', de: 'Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.', ar: 'تقدم المعلومات التالية نظرة عامة بسيطة عما يحدث ببياناتك الشخصية عند زيارتك لهذا الموقع. البيانات الشخصية هي أي بيانات يمكن من خلالها التعرف عليك شخصيًا.', ru: 'Следующая информация даёт простой обзор того, что происходит с вашими персональными данными, когда вы посещаете этот сайт. Персональные данные — это любые данные, по которым вас можно идентифицировать.', uk: 'Наступна інформація дає простий огляд того, що відбувається з вашими персональними даними під час відвідування цього веб-сайту. Персональні дані — це будь-які дані, за якими вас можна ідентифікувати.', zh: '以下信息简要概述了您访问本网站时个人数据的处理情况。个人数据是指所有可用于个人识别的数据。', es: 'La siguiente información ofrece una visión general simple de lo que sucede con sus datos personales cuando visita este sitio web. Los datos personales son todos los datos con los que puede identificarse personalmente.', fr: 'Les informations suivantes donnent un aperçu simple de ce qui se passe avec vos données personnelles lorsque vous visitez ce site web. Les données personnelles sont toutes les données permettant de vous identifier personnellement.' },
    s1b: { en: 'Data Collection on this Website', de: 'Datenerfassung auf dieser Website', ar: 'جمع البيانات على هذا الموقع', ru: 'Сбор данных на этом сайте', uk: 'Збір даних на цьому сайті', zh: '本网站的数据收集', es: 'Recopilación de datos en este sitio web', fr: 'Collecte de données sur ce site web' },
    s1bQ1: { en: 'Who is responsible for data collection on this website?', de: 'Wer ist verantwortlich für die Datenerfassung auf dieser Website?', ar: 'من المسؤول عن جمع البيانات على هذا الموقع؟', ru: 'Кто несёт ответственность за сбор данных на этом сайте?', uk: 'Хто відповідає за збір даних на цьому сайті?', zh: '谁负责本网站的数据收集？', es: '¿Quién es responsable de la recopilación de datos en este sitio web?', fr: 'Qui est responsable de la collecte de données sur ce site web?' },
    s1bA1: { en: 'Data processing on this website is carried out by the website operator. You can find the operator\'s contact details in the section "Information about the responsible party" in this privacy policy.', de: 'Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.', ar: 'تتم معالجة البيانات على هذا الموقع من قبل مشغل الموقع. يمكنك العثور على تفاصيل الاتصال بالمشغل في قسم "معلومات الطرف المسؤول" في سياسة الخصوصية هذه.', ru: 'Обработка данных на этом веб-сайте осуществляется оператором сайта. Контактные данные оператора можно найти в разделе "Информация об ответственной стороне" данной политики конфиденциальности.', uk: 'Обробка даних на цьому веб-сайті здійснюється оператором сайту. Контактні дані оператора можна знайти в розділі "Інформація про відповідальну сторону" цієї політики конфіденційності.', zh: '本网站上的数据处理由网站运营商负责。您可以在本隐私政策中"责任方信息"部分找到运营商的联系方式。', es: 'El procesamiento de datos en este sitio web es realizado por el operador del sitio web. Los datos de contacto del operador se encuentran en la sección "Información sobre la parte responsable" de esta política de privacidad.', fr: 'Le traitement des données sur ce site web est effectué par l\'opérateur du site web. Vous pouvez trouver les coordonnées de l\'opérateur dans la section "Informations sur la partie responsable" de cette politique de confidentialité.' },
    s1bQ2: { en: 'How do we collect your data?', de: 'Wie erfassen wir Ihre Daten?', ar: 'كيف نجمع بياناتك؟', ru: 'Как мы собираем ваши данные?', uk: 'Як ми збираємо ваші дані?', zh: '我们如何收集您的数据？', es: '¿Cómo recopilamos sus datos?', fr: 'Comment collectons-nous vos données?' },
    s1bA2: { en: 'Your data is collected by you providing it to us (e.g. via a contact form) or collected automatically or with your consent by our IT systems when you visit the website (primarily technical data such as browser, operating system, time of access).', de: 'Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z.B. per Kontaktformular). Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst (v.a. technische Daten wie Browser, Betriebssystem, Uhrzeit).', ar: 'يتم جمع بياناتك عن طريق تقديمها لنا (مثل نموذج الاتصال) أو يتم جمعها تلقائيًا أو بموافقتك بواسطة أنظمتنا عند زيارة الموقع (البيانات التقنية مثل المتصفح ونظام التشغيل ووقت الوصول).', ru: 'Ваши данные собираются путём предоставления их вам нам (например, через контактную форму) или автоматически/с вашего согласия нашими IT-системами при посещении сайта (прежде всего технические данные: браузер, ОС, время доступа).', uk: 'Ваші дані збираються шляхом їх надання нам (наприклад, через контактну форму) або автоматично/за вашою згодою нашими IT-системами під час відвідування сайту (перш за все технічні дані: браузер, ОС, час доступу).', zh: '您的数据一部分是通过您向我们提供来收集的，另一部分是在您访问网站时由我们的IT系统自动或经您同意收集的（主要是技术数据，如浏览器、操作系统、访问时间）。', es: 'Sus datos se recopilan en parte cuando nos los proporciona (p. ej., a través de un formulario de contacto) o se recopilan automáticamente o con su consentimiento mediante nuestros sistemas informáticos cuando visita el sitio web.', fr: 'Vos données sont collectées en partie lorsque vous nous les fournissez (par exemple via un formulaire de contact) ou sont collectées automatiquement ou avec votre consentement par nos systèmes informatiques lorsque vous visitez le site web.' },
    s1bQ3: { en: 'What do we use your data for?', de: 'Wofür nutzen wir Ihre Daten?', ar: 'لماذا نستخدم بياناتك؟', ru: 'Для чего мы используем ваши данные?', uk: 'Для чого ми використовуємо ваші дані?', zh: '我们如何使用您的数据？', es: '¿Para qué utilizamos sus datos?', fr: 'À quoi servent vos données?' },
    s1bA3: { en: 'Some data is collected to ensure error-free provision of the website. Other data may be used to analyze your user behavior.', de: 'Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.', ar: 'يتم جمع بعض البيانات لضمان توفير الموقع بشكل خالٍ من الأخطاء. يمكن استخدام بيانات أخرى لتحليل سلوك المستخدم الخاص بك.', ru: 'Часть данных собирается для обеспечения безошибочной работы сайта. Другие данные могут использоваться для анализа вашего поведения как пользователя.', uk: 'Частина даних збирається для забезпечення безпомилкової роботи сайту. Інші дані можуть використовуватися для аналізу вашої поведінки як користувача.', zh: '部分数据是为了确保网站无错误运行而收集的，其他数据可能用于分析您的用户行为。', es: 'Algunos datos se recopilan para garantizar el funcionamiento sin errores del sitio web. Otros datos pueden utilizarse para analizar su comportamiento como usuario.', fr: 'Certaines données sont collectées pour garantir le bon fonctionnement du site web. D\'autres données peuvent être utilisées pour analyser votre comportement en tant qu\'utilisateur.' },
    s1bQ4: { en: 'What rights do you have regarding your data?', de: 'Welche Rechte haben Sie bezüglich Ihrer Daten?', ar: 'ما هي حقوقك فيما يتعلق ببياناتك؟', ru: 'Какие права у вас есть в отношении ваших данных?', uk: 'Які права ви маєте щодо своїх даних?', zh: '您对数据有哪些权利？', es: '¿Qué derechos tiene usted sobre sus datos?', fr: 'Quels droits avez-vous concernant vos données?' },
    s1bA4: { en: 'You have the right to receive information about the origin, recipient and purpose of your stored personal data free of charge at any time. You also have the right to request the correction or deletion of this data, and to revoke any consent given.', de: 'Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen und eine erteilte Einwilligung jederzeit zu widerrufen.', ar: 'يحق لك في أي وقت الحصول على معلومات مجانية حول مصدر بياناتك الشخصية المخزنة والمستلم والغرض منها. يحق لك أيضًا طلب تصحيح أو حذف هذه البيانات وإلغاء أي موافقة ممنوحة.', ru: 'Вы имеете право в любое время бесплатно получать информацию о происхождении, получателе и цели хранимых персональных данных. Вы также имеете право требовать исправления или удаления этих данных и отзывать данное согласие.', uk: 'Ви маєте право в будь-який час безкоштовно отримувати інформацію про походження, одержувача та мету збережених персональних даних. Ви також маєте право вимагати виправлення або видалення цих даних та відкликати надану згоду.', zh: '您有权随时免费获取有关您所存储的个人数据的来源、接收方和目的的信息。您还有权要求更正或删除这些数据，并随时撤销已给予的同意。', es: 'Tiene derecho a recibir información sobre el origen, el destinatario y el propósito de sus datos personales almacenados de forma gratuita en cualquier momento. También tiene derecho a solicitar la corrección o eliminación de estos datos y a revocar cualquier consentimiento dado.', fr: 'Vous avez le droit de recevoir gratuitement à tout moment des informations sur l\'origine, le destinataire et l\'objet de vos données personnelles stockées. Vous avez également le droit de demander la correction ou la suppression de ces données et de révoquer tout consentement donné.' },
    s2: { en: '2. Hosting', de: '2. Hosting', ar: '2. الاستضافة', ru: '2. Хостинг', uk: '2. Хостинг', zh: '2. 网站托管', es: '2. Hosting', fr: '2. Hébergement' },
    s2T1: { en: 'This website is hosted externally. The personal data collected on this website is stored on the servers of the hoster(s), including IP addresses, contact requests, meta and communication data, contract data, names, and website accesses.', de: 'Diese Website wird extern gehostet. Die auf dieser Website erfassten personenbezogenen Daten werden auf den Servern des Hosters gespeichert, darunter IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Namen und Websitezugriffe.', ar: 'يتم استضافة هذا الموقع خارجيًا. يتم تخزين البيانات الشخصية المجمعة على هذا الموقع على خوادم المضيف، بما في ذلك عناوين IP وطلبات الاتصال والبيانات الوصفية وبيانات الاتصالات وبيانات العقد والأسماء والوصول إلى الموقع.', ru: 'Этот сайт размещён на внешнем хостинге. Персональные данные, собранные на этом сайте, хранятся на серверах хостинг-провайдера, включая IP-адреса, контактные запросы, метаданные, коммуникационные данные, данные договоров, имена и доступы к сайту.', uk: 'Цей веб-сайт розміщений на зовнішньому хостингу. Персональні дані, зібрані на цьому сайті, зберігаються на серверах хостинг-провайдера, включаючи IP-адреси, контактні запити, метадані, комунікаційні дані, дані договорів, імена та доступи до сайту.', zh: '本网站托管于外部服务器。本网站收集的个人数据存储在托管服务商的服务器上，包括IP地址、联系请求、元数据和通信数据、合同数据、姓名和网站访问记录。', es: 'Este sitio web está alojado externamente. Los datos personales recopilados en este sitio web se almacenan en los servidores del proveedor de hosting, incluidas las direcciones IP, solicitudes de contacto, metadatos, datos contractuales, nombres y accesos al sitio web.', fr: 'Ce site web est hébergé en externe. Les données personnelles collectées sur ce site web sont stockées sur les serveurs de l\'hébergeur, notamment les adresses IP, les demandes de contact, les métadonnées, les données contractuelles, les noms et les accès au site web.' },
    s2T2: { en: 'External hosting is carried out for the purpose of fulfilling contracts (Art. 6 para. 1 lit. b GDPR) and in the interest of secure, fast and efficient provision of our online offer by a professional provider (Art. 6 para. 1 lit. f GDPR).', de: 'Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).', ar: 'يتم الاستضافة الخارجية لغرض تنفيذ العقود (المادة 6 فقرة 1 ب من اللائحة العامة لحماية البيانات) ولصالح توفير عرضنا عبر الإنترنت بشكل آمن وسريع وفعال من قبل مزود محترف (المادة 6 فقرة 1 و من اللائحة العامة لحماية البيانات).', ru: 'Внешний хостинг осуществляется в целях исполнения договоров (ст. 6 абз. 1 лит. б GDPR) и в интересах безопасного, быстрого и эффективного предоставления нашего онлайн-предложения профессиональным провайдером (ст. 6 абз. 1 лит. ф GDPR).', uk: 'Зовнішній хостинг здійснюється з метою виконання договорів (ст. 6 абз. 1 лит. б GDPR) та в інтересах безпечного, швидкого та ефективного надання нашої онлайн-пропозиції професійним провайдером (ст. 6 абз. 1 лит. ф GDPR).', zh: '外部托管是为了履行合同（GDPR第6条第1款b项）和在专业提供商的帮助下安全、快速、高效地提供我们的在线服务（GDPR第6条第1款f项）。', es: 'El alojamiento externo se realiza con el fin de cumplir contratos (Art. 6 párr. 1 lit. b GDPR) y en interés de una provisión segura, rápida y eficiente de nuestra oferta en línea por parte de un proveedor profesional (Art. 6 párr. 1 lit. f GDPR).', fr: 'L\'hébergement externe est effectué dans le but d\'exécuter des contrats (Art. 6 al. 1 lit. b RGPD) et dans l\'intérêt d\'une fourniture sûre, rapide et efficace de notre offre en ligne par un prestataire professionnel (Art. 6 al. 1 lit. f RGPD).' },
    s3: { en: '3. General Information and Mandatory Information', de: '3. Allgemeine Hinweise und Pflichtinformationen', ar: '3. المعلومات العامة والمعلومات الإلزامية', ru: '3. Общая информация и обязательные сведения', uk: '3. Загальна інформація та обов\'язкові відомості', zh: '3. 一般信息和必要说明', es: '3. Información General e Información Obligatoria', fr: '3. Informations générales et informations obligatoires' },
    s3a: { en: 'Data Protection', de: 'Datenschutz', ar: 'حماية البيانات', ru: 'Защита данных', uk: 'Захист даних', zh: '数据保护', es: 'Protección de Datos', fr: 'Protection des données' },
    s3aT: { en: 'The operators of this website take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with the statutory data protection regulations and this privacy policy.', de: 'Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.', ar: 'يولي مشغلو هذا الموقع أهمية كبيرة لحماية بياناتك الشخصية. نتعامل مع بياناتك الشخصية بسرية ووفقًا للوائح حماية البيانات القانونية وسياسة الخصوصية هذه.', ru: 'Операторы этого сайта серьёзно относятся к защите ваших персональных данных. Мы обрабатываем ваши персональные данные конфиденциально и в соответствии с законодательными требованиями по защите данных.', uk: 'Оператори цього сайту серйозно ставляться до захисту ваших персональних даних. Ми обробляємо ваші персональні дані конфіденційно та відповідно до законодавчих вимог щодо захисту даних.', zh: '本网站的运营商非常重视您个人数据的保护。我们将根据法定数据保护规定及本隐私政策对您的个人数据进行保密处理。', es: 'Los operadores de este sitio web toman muy en serio la protección de sus datos personales. Tratamos sus datos personales de forma confidencial y de acuerdo con las normas legales de protección de datos y esta política de privacidad.', fr: 'Les opérateurs de ce site web prennent très au sérieux la protection de vos données personnelles. Nous traitons vos données personnelles de manière confidentielle et conformément aux réglementations légales sur la protection des données et à cette politique de confidentialité.' },
    s3b: { en: 'Information about the Responsible Party', de: 'Hinweis zur verantwortlichen Stelle', ar: 'معلومات الجهة المسؤولة', ru: 'Информация об ответственной стороне', uk: 'Інформація про відповідальну сторону', zh: '责任方信息', es: 'Información sobre la Parte Responsable', fr: 'Informations sur la partie responsable' },
    s3bT: { en: 'The responsible party for data processing on this website is:', de: 'Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:', ar: 'الجهة المسؤولة عن معالجة البيانات على هذا الموقع هي:', ru: 'Ответственная сторона за обработку данных на этом сайте:', uk: 'Відповідальна сторона за обробку даних на цьому сайті:', zh: '本网站数据处理的责任方是：', es: 'La parte responsable del procesamiento de datos en este sitio web es:', fr: 'La partie responsable du traitement des données sur ce site web est:' },
    s3c: { en: 'Storage Duration', de: 'Speicherdauer', ar: 'مدة التخزين', ru: 'Срок хранения', uk: 'Термін зберігання', zh: '存储期限', es: 'Duración del Almacenamiento', fr: 'Durée de stockage' },
    s3cT: { en: 'Unless a specific storage period is stated, your personal data will remain with us until the purpose for data processing no longer applies. If you request deletion or revoke consent, your data will be deleted unless we have other legally permissible reasons for storing it.', de: 'Soweit keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein Löschersuchen geltend machen oder die Einwilligung widerrufen, werden Ihre Daten gelöscht, sofern keine anderen rechtlich zulässigen Gründe bestehen.', ar: 'ما لم يُذكر مدة تخزين محددة، ستبقى بياناتك الشخصية لدينا حتى انتفاء الغرض من معالجة البيانات. إذا طلبت الحذف أو سحبت موافقتك، سيتم حذف بياناتك ما لم تكن هناك أسباب قانونية أخرى لتخزينها.', ru: 'Если иной срок хранения не указан, ваши персональные данные хранятся у нас до тех пор, пока цель их обработки не отпадёт. При запросе об удалении или отзыве согласия данные будут удалены, если нет иных законных оснований для их хранения.', uk: 'Якщо не вказано конкретний термін зберігання, ваші персональні дані зберігаються у нас до тих пір, поки мета їх обробки не зникне. При запиті на видалення або відкликанні згоди дані будуть видалені, якщо немає інших законних підстав для їх зберігання.', zh: '除非指定了具体的存储期限，您的个人数据将在数据处理目的不再适用之前一直保存在我们这里。如果您要求删除或撤回同意，您的数据将被删除，除非有其他合法理由保存。', es: 'A menos que se indique un período de almacenamiento específico, sus datos personales permanecerán con nosotros hasta que deje de aplicarse el propósito del tratamiento de datos. Si solicita la eliminación o revoca el consentimiento, sus datos serán eliminados a menos que existan otras razones legalmente permisibles.', fr: 'Sauf indication d\'une durée de stockage spécifique, vos données personnelles resteront chez nous jusqu\'à ce que l\'objet du traitement des données ne s\'applique plus. Si vous demandez la suppression ou révoquez votre consentement, vos données seront supprimées sauf s\'il existe d\'autres raisons légalement autorisées.' },
    s3d: { en: 'Revocation of Your Consent', de: 'Widerruf Ihrer Einwilligung', ar: 'إلغاء موافقتك', ru: 'Отзыв вашего согласия', uk: 'Відкликання вашої згоди', zh: '撤销同意', es: 'Revocación de Su Consentimiento', fr: 'Révocation de votre consentement' },
    s3dT: { en: 'Many data processing operations are only possible with your express consent. You can revoke consent you have already given at any time. The legality of data processing carried out until the revocation remains unaffected.', de: 'Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.', ar: 'تتطلب العديد من عمليات معالجة البيانات موافقتك الصريحة. يمكنك سحب الموافقة الممنوحة في أي وقت. لا يتأثر مشروعية معالجة البيانات التي جرت قبل الإلغاء.', ru: 'Многие операции по обработке данных возможны только при вашем явном согласии. Вы можете отозвать данное согласие в любое время. Законность обработки данных до отзыва остаётся в силе.', uk: 'Багато операцій з обробки даних можливі лише за вашою явною згодою. Ви можете відкликати надану згоду в будь-який час. Законність обробки даних до відкликання залишається чинною.', zh: '许多数据处理操作只有在您明确同意的情况下才能进行。您可以随时撤销已给予的同意。撤销前的数据处理合法性不受影响。', es: 'Muchas operaciones de procesamiento de datos solo son posibles con su consentimiento expreso. Puede revocar el consentimiento que ya ha dado en cualquier momento. La legalidad del procesamiento de datos realizado hasta la revocación no se ve afectada.', fr: 'De nombreuses opérations de traitement de données ne sont possibles qu\'avec votre consentement exprès. Vous pouvez révoquer à tout moment le consentement déjà donné. La légalité du traitement des données effectué jusqu\'à la révocation n\'est pas affectée.' },
    s3e: { en: 'Right to Lodge a Complaint', de: 'Beschwerderecht bei der Aufsichtsbehörde', ar: 'حق تقديم شكوى', ru: 'Право на подачу жалобы', uk: 'Право на подання скарги', zh: '投诉权利', es: 'Derecho a Presentar una Reclamación', fr: 'Droit de déposer une plainte' },
    s3eT: { en: 'In the event of GDPR violations, data subjects have the right to lodge a complaint with a supervisory authority, in particular in the Member State of their habitual residence, place of work, or place of the alleged violation.', de: 'Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde zu, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, Arbeitsplatzes oder des mutmaßlichen Verstoßes.', ar: 'في حالة انتهاكات اللائحة العامة لحماية البيانات، يحق للمتضررين تقديم شكوى إلى سلطة إشرافية، ولا سيما في الدولة العضو التي يقيمون فيها عادةً أو مكان عملهم أو مكان الانتهاك المزعوم.', ru: 'В случае нарушений GDPR субъекты данных имеют право подать жалобу в надзорный орган, в частности в государстве-члене их постоянного проживания, места работы или предполагаемого нарушения.', uk: 'У разі порушень GDPR суб\'єкти даних мають право подати скаргу до наглядового органу, зокрема в державі-члені їх звичайного місця проживання, місця роботи або передбачуваного порушення.', zh: '如违反GDPR，数据主体有权向监管机构提出投诉，特别是在其惯常居住地、工作地点或涉嫌违规地点的成员国。', es: 'En caso de infracciones del GDPR, los interesados tienen derecho a presentar una reclamación ante una autoridad supervisora, en particular en el Estado miembro de su residencia habitual, lugar de trabajo o lugar de la presunta infracción.', fr: 'En cas de violations du RGPD, les personnes concernées ont le droit de déposer une plainte auprès d\'une autorité de contrôle, notamment dans l\'État membre de leur résidence habituelle, de leur lieu de travail ou du lieu de la violation présumée.' },
    s3f: { en: 'Right to Data Portability', de: 'Recht auf Datenübertragbarkeit', ar: 'حق نقل البيانات', ru: 'Право на перенос данных', uk: 'Право на перенесення даних', zh: '数据可携性权利', es: 'Derecho a la Portabilidad de Datos', fr: 'Droit à la portabilité des données' },
    s3fT: { en: 'You have the right to have data that we process automatically based on your consent or in fulfillment of a contract handed over to you or a third party in a common, machine-readable format.', de: 'Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen.', ar: 'يحق لك الحصول على البيانات التي نعالجها تلقائيًا بناءً على موافقتك أو تنفيذًا لعقد، وتسليمها لك أو لطرف ثالث بتنسيق شائع قابل للقراءة آليًا.', ru: 'Вы имеете право получить данные, которые мы автоматически обрабатываем на основании вашего согласия или во исполнение договора, и передать их вам или третьей стороне в общепринятом машиночитаемом формате.', uk: 'Ви маєте право отримати дані, які ми автоматично обробляємо на підставі вашої згоди або на виконання договору, та передати їх вам або третій стороні у загальноприйнятому машиночитаному форматі.', zh: '您有权以通用的、机器可读的格式获取我们基于您的同意或合同履行而自动处理的数据，并可传输给您本人或第三方。', es: 'Tiene derecho a recibir los datos que procesamos automáticamente en base a su consentimiento o en cumplimiento de un contrato, entregados a usted o a un tercero en un formato común y legible por máquina.', fr: 'Vous avez le droit de recevoir les données que nous traitons automatiquement sur la base de votre consentement ou en exécution d\'un contrat, remises à vous ou à un tiers dans un format courant et lisible par machine.' },
    s3g: { en: 'Information, Correction and Deletion', de: 'Auskunft, Berichtigung und Löschung', ar: 'الاستفسار والتصحيح والحذف', ru: 'Информация, исправление и удаление', uk: 'Інформація, виправлення та видалення', zh: '信息、更正和删除', es: 'Información, Corrección y Eliminación', fr: 'Information, correction et suppression' },
    s3gT: { en: 'Within the framework of applicable legal provisions, you have the right to free information about your stored personal data, its origin, recipients and purpose, and the right to correction or deletion at any time.', de: 'Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ggf. ein Recht auf Berichtigung oder Löschung.', ar: 'في إطار الأحكام القانونية المعمول بها، يحق لك في أي وقت الحصول على معلومات مجانية حول بياناتك الشخصية المخزنة ومصدرها والمستلمين والغرض منها، وكذلك الحق في التصحيح أو الحذف.', ru: 'В рамках применимых правовых норм вы имеете право в любое время бесплатно получать информацию о хранимых персональных данных, их происхождении, получателях и цели обработки, а также право на исправление или удаление.', uk: 'У межах чинних правових норм ви маєте право в будь-який час безкоштовно отримувати інформацію про збережені персональні дані, їх походження, одержувачів та мету обробки, а також право на виправлення або видалення.', zh: '在适用法律规定的框架内，您随时有权免费获取有关您所存储的个人数据、其来源、接收方和目的的信息，以及在适当情况下有权更正或删除。', es: 'En el marco de las disposiciones legales aplicables, tiene en todo momento el derecho a información gratuita sobre sus datos personales almacenados, su origen y destinatarios y el propósito del procesamiento de datos, así como el derecho a la corrección o eliminación.', fr: 'Dans le cadre des dispositions légales applicables, vous avez à tout moment le droit d\'accéder gratuitement à vos données personnelles stockées, à leur origine, leurs destinataires et l\'objet du traitement des données, ainsi que le droit à la correction ou à la suppression.' },
    s4: { en: '4. Data Collection on this Website', de: '4. Datenerfassung auf dieser Website', ar: '4. جمع البيانات على هذا الموقع', ru: '4. Сбор данных на этом сайте', uk: '4. Збір даних на цьому сайті', zh: '4. 本网站上的数据收集', es: '4. Recopilación de Datos en este Sitio Web', fr: '4. Collecte de données sur ce site web' },
    s4a: { en: 'Cookies', de: 'Cookies', ar: 'ملفات تعريف الارتباط', ru: 'Файлы cookie', uk: 'Файли cookie', zh: 'Cookie', es: 'Cookies', fr: 'Cookies' },
    s4aT: { en: 'For detailed information about cookies used on this website, please refer to our', de: 'Für detaillierte Informationen über die auf dieser Website verwendeten Cookies lesen Sie bitte unsere', ar: 'للحصول على معلومات تفصيلية حول ملفات تعريف الارتباط المستخدمة على هذا الموقع، يرجى الرجوع إلى', ru: 'Для получения подробной информации о файлах cookie, используемых на этом сайте, обратитесь к нашей', uk: 'Для отримання детальної інформації про файли cookie, що використовуються на цьому сайті, зверніться до нашої', zh: '有关本网站所使用Cookie的详细信息，请参阅我们的', es: 'Para obtener información detallada sobre las cookies utilizadas en este sitio web, consulte nuestra', fr: 'Pour des informations détaillées sur les cookies utilisés sur ce site web, veuillez consulter notre' },
    cookiePolicyLink: { en: 'Cookie Policy', de: 'Cookie-Richtlinie', ar: 'سياسة ملفات الارتباط', ru: 'Политике cookies', uk: 'Політики cookies', zh: 'Cookie政策', es: 'Política de Cookies', fr: 'Politique des cookies' },
    s4b: { en: 'Server Log Files', de: 'Server-Log-Dateien', ar: 'ملفات سجل الخادم', ru: 'Лог-файлы сервера', uk: 'Лог-файли сервера', zh: '服务器日志文件', es: 'Archivos de Registro del Servidor', fr: 'Fichiers journaux du serveur' },
    s4bT: { en: 'The provider automatically collects and stores information in server log files transmitted by your browser:', de: 'Der Provider erhebt und speichert automatisch Informationen in Server-Log-Dateien, die Ihr Browser automatisch übermittelt:', ar: 'يجمع المزود ويخزن تلقائيًا المعلومات في ملفات سجل الخادم التي يرسلها متصفحك:', ru: 'Провайдер автоматически собирает и хранит информацию в лог-файлах сервера, которые передаёт ваш браузер:', uk: 'Провайдер автоматично збирає та зберігає інформацію у лог-файлах сервера, які передає ваш браузер:', zh: '提供商自动收集并存储您的浏览器传送的服务器日志文件中的信息：', es: 'El proveedor recopila y almacena automáticamente información en los archivos de registro del servidor que transmite su navegador:', fr: 'Le fournisseur collecte et stocke automatiquement des informations dans les fichiers journaux du serveur transmis par votre navigateur:' },
    logItems: {
      en: ['Browser type and version', 'Operating system used', 'Referrer URL', 'Host name of the accessing computer', 'Time of the server request', 'IP address'],
      de: ['Browsertyp und Browserversion', 'Verwendetes Betriebssystem', 'Referrer URL', 'Hostname des zugreifenden Rechners', 'Uhrzeit der Serveranfrage', 'IP-Adresse'],
      ar: ['نوع المتصفح وإصداره', 'نظام التشغيل المستخدم', 'عنوان URL المرجعي', 'اسم المضيف للكمبيوتر الذي يتصل', 'وقت طلب الخادم', 'عنوان IP'],
      ru: ['Тип и версия браузера', 'Используемая операционная система', 'URL реферера', 'Имя хоста обращающегося компьютера', 'Время запроса к серверу', 'IP-адрес'],
      uk: ['Тип і версія браузера', 'Використовувана операційна система', 'URL реферера', 'Ім\'я хоста комп\'ютера, що звертається', 'Час запиту до сервера', 'IP-адреса'],
      zh: ['浏览器类型和版本', '所用操作系统', '来源URL', '访问计算机的主机名', '服务器请求时间', 'IP地址'],
      es: ['Tipo y versión del navegador', 'Sistema operativo utilizado', 'URL de referencia', 'Nombre del host del equipo que accede', 'Hora de la solicitud al servidor', 'Dirección IP'],
      fr: ['Type et version du navigateur', 'Système d\'exploitation utilisé', 'URL de référence', 'Nom d\'hôte de l\'ordinateur accédant', 'Heure de la requête au serveur', 'Adresse IP'],
      tr: ['Tarayıcı türü ve sürümü', 'Kullanılan işletim sistemi', 'Yönlendiren URL', 'Erişen bilgisayarın ana bilgisayar adı', 'Sunucu isteğinin saati', 'IP adresi'],
    },
    s4bT2: { en: 'This data will not be merged with other data sources. The data is collected on the basis of Art. 6 (1) lit. f GDPR.', de: 'Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.', ar: 'لن يتم دمج هذه البيانات مع مصادر بيانات أخرى. يتم جمع البيانات على أساس المادة 6 (1) و من اللائحة العامة لحماية البيانات.', ru: 'Эти данные не объединяются с другими источниками данных. Данные собираются на основании ст. 6 абз. 1 лит. ф GDPR.', uk: 'Ці дані не об\'єднуються з іншими джерелами даних. Дані збираються на підставі ст. 6 абз. 1 лит. ф GDPR.', zh: '这些数据不会与其他数据源合并。数据的收集基于GDPR第6条第1款f项。', es: 'Estos datos no se fusionarán con otras fuentes de datos. Los datos se recopilan sobre la base del Art. 6 (1) lit. f GDPR.', fr: 'Ces données ne seront pas fusionnées avec d\'autres sources de données. La collecte s\'effectue sur la base de l\'Art. 6 al. 1 lit. f RGPD.' },
    s4c: { en: 'Contact Form', de: 'Kontaktformular', ar: 'نموذج التواصل', ru: 'Контактная форма', uk: 'Контактна форма', zh: '联系表单', es: 'Formulario de Contacto', fr: 'Formulaire de contact' },
    s4cT1: { en: 'If you send us inquiries via the contact form, your data from the inquiry form, including the contact data provided, will be stored by us for the purpose of processing the inquiry and any follow-up questions. We do not pass on this data without your consent.', de: 'Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der Kontaktdaten zwecks Bearbeitung der Anfrage und für Anschlussfragen gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.', ar: 'إذا أرسلت لنا استفسارات عبر نموذج الاتصال، ستُخزَّن بياناتك من نموذج الاستفسار، بما في ذلك بيانات الاتصال المقدمة، لأغراض معالجة الاستفسار وأي أسئلة متابعة. لا نمرر هذه البيانات دون موافقتك.', ru: 'Если вы отправляете нам запросы через контактную форму, ваши данные из формы, включая предоставленные контактные данные, будут храниться нами для целей обработки запроса и возможных последующих вопросов. Мы не передаём эти данные без вашего согласия.', uk: 'Якщо ви надсилаєте нам запити через контактну форму, ваші дані з форми, включаючи надані контактні дані, зберігатимуться нами для обробки запиту та можливих подальших питань. Ми не передаємо ці дані без вашої згоди.', zh: '如果您通过联系表单向我们发送询问，您的询问表单数据（包括所提供的联系数据）将被我们存储，用于处理询问和后续问题。未经您的同意，我们不会转发这些数据。', es: 'Si nos envía consultas a través del formulario de contacto, sus datos del formulario, incluidos los datos de contacto proporcionados, serán almacenados por nosotros para el procesamiento de la consulta y preguntas de seguimiento. No transmitimos estos datos sin su consentimiento.', fr: 'Si vous nous envoyez des demandes via le formulaire de contact, vos données du formulaire, y compris les coordonnées fournies, seront stockées par nous pour traiter la demande et toute question de suivi. Nous ne transmettons pas ces données sans votre consentement.' },
    s4cT2: { en: 'The processing of this data is based on Art. 6 (1) lit. b GDPR. The data will remain with us until you request deletion, revoke consent, or the purpose for storage no longer applies.', de: 'Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO. Die Daten verbleiben bei uns, bis Sie zur Löschung auffordern, die Einwilligung widerrufen oder der Zweck entfällt.', ar: 'تتم معالجة هذه البيانات على أساس المادة 6 (1) ب من اللائحة العامة لحماية البيانات. ستبقى البيانات لدينا حتى تطلب الحذف أو تسحب الموافقة أو ينتفي الغرض من التخزين.', ru: 'Обработка этих данных осуществляется на основании ст. 6 абз. 1 лит. б GDPR. Данные хранятся у нас до тех пор, пока вы не запросите удаление, не отзовёте согласие или не отпадёт цель хранения.', uk: 'Обробка цих даних здійснюється на підставі ст. 6 абз. 1 лит. б GDPR. Дані зберігаються у нас до тих пір, поки ви не запросите видалення, не відкличете згоду або мета зберігання не відпаде.', zh: '这些数据的处理基于GDPR第6条第1款b项。数据将在我们这里保留，直到您要求删除、撤回同意或存储目的不再适用。', es: 'El procesamiento de estos datos se basa en el Art. 6 (1) lit. b GDPR. Los datos permanecerán con nosotros hasta que solicite la eliminación, revoque el consentimiento o deje de aplicarse el propósito del almacenamiento.', fr: 'Le traitement de ces données est basé sur l\'Art. 6 al. 1 lit. b RGPD. Les données resteront chez nous jusqu\'à ce que vous demandiez la suppression, révoquez le consentement ou que l\'objet du stockage ne s\'applique plus.' },
    s5: { en: '5. SSL/TLS Encryption', de: '5. SSL-/TLS-Verschlüsselung', ar: '5. تشفير SSL/TLS', ru: '5. Шифрование SSL/TLS', uk: '5. Шифрування SSL/TLS', zh: '5. SSL/TLS加密', es: '5. Cifrado SSL/TLS', fr: '5. Chiffrement SSL/TLS' },
    s5T: { en: 'This site uses SSL or TLS encryption for security reasons and to protect the transmission of confidential content. You can recognise an encrypted connection by "https://" in the address bar and the lock symbol in your browser.', de: 'Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie am „https://" in der Adresszeile und am Schloss-Symbol im Browser.', ar: 'يستخدم هذا الموقع تشفير SSL أو TLS لأسباب أمنية وحماية نقل المحتوى السري. يمكنك التعرف على اتصال مشفر بـ "https://" في شريط العنوان ورمز القفل في متصفحك.', ru: 'Этот сайт использует шифрование SSL или TLS в целях безопасности и защиты передачи конфиденциального контента. Зашифрованное соединение можно распознать по "https://" в адресной строке и значку замка в браузере.', uk: 'Цей сайт використовує шифрування SSL або TLS з міркувань безпеки та захисту передачі конфіденційного контенту. Зашифроване з\'єднання можна розпізнати за "https://" в адресному рядку та значком замка у браузері.', zh: '出于安全原因，本网站使用SSL或TLS加密来保护机密内容的传输。您可以通过地址栏中的"https://"和浏览器中的锁形符号识别加密连接。', es: 'Este sitio utiliza cifrado SSL o TLS por razones de seguridad y para proteger la transmisión de contenido confidencial. Puede reconocer una conexión cifrada por "https://" en la barra de direcciones y el símbolo de candado en su navegador.', fr: 'Ce site utilise le chiffrement SSL ou TLS pour des raisons de sécurité et pour protéger la transmission de contenu confidentiel. Vous pouvez reconnaître une connexion chiffrée par "https://" dans la barre d\'adresse et le symbole de cadenas dans votre navigateur.' },
    s6: { en: '6. Changes to this Privacy Policy', de: '6. Änderungen dieser Datenschutzerklärung', ar: '6. التغييرات على سياسة الخصوصية هذه', ru: '6. Изменения в данной политике', uk: '6. Зміни до цієї політики', zh: '6. 本隐私政策的变更', es: '6. Cambios en esta Política de Privacidad', fr: '6. Modifications de cette politique de confidentialité' },
    s6T: { en: 'We reserve the right to update this privacy policy from time to time to ensure compliance with current legal requirements or to implement changes to our services.', de: 'Wir behalten uns vor, diese Datenschutzerklärung von Zeit zu Zeit zu aktualisieren, um sicherzustellen, dass sie den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen umzusetzen.', ar: 'نحتفظ بالحق في تحديث سياسة الخصوصية هذه من وقت لآخر لضمان الامتثال للمتطلبات القانونية الحالية أو لتنفيذ تغييرات في خدماتنا.', ru: 'Мы оставляем за собой право периодически обновлять данную политику конфиденциальности для обеспечения соответствия актуальным правовым требованиям или реализации изменений в наших услугах.', uk: 'Ми залишаємо за собою право час від часу оновлювати цю політику конфіденційності для забезпечення відповідності актуальним правовим вимогам або реалізації змін у наших послугах.', zh: '我们保留不时更新本隐私政策的权利，以确保符合当前法律要求或实施我们服务的变更。', es: 'Nos reservamos el derecho de actualizar esta política de privacidad de vez en cuando para garantizar el cumplimiento de los requisitos legales actuales o para implementar cambios en nuestros servicios.', fr: 'Nous nous réservons le droit de mettre à jour cette politique de confidentialité de temps en temps pour garantir la conformité aux exigences légales actuelles ou pour mettre en œuvre des changements dans nos services.' },
    phone: { en: 'Phone', de: 'Telefon', ar: 'الهاتف', ru: 'Телефон', uk: 'Телефон', zh: '电话', es: 'Teléfono', fr: 'Téléphone' },
  },

  // ---- COOKIE POLICY ----
  cookie: {
    title:    { en: 'Cookie Policy', de: 'Cookie-Richtlinie', ar: 'سياسة ملفات تعريف الارتباط', ru: 'Политика файлов cookie', uk: 'Політика файлів cookie', zh: 'Cookie政策', es: 'Política de Cookies', fr: 'Politique des cookies' },
    lastUpdated: { en: 'Last updated', de: 'Zuletzt aktualisiert', ar: 'آخر تحديث', ru: 'Последнее обновление', uk: 'Останнє оновлення', zh: '最后更新', es: 'Última actualización', fr: 'Dernière mise à jour' },
    what:     { en: 'What are Cookies?', de: 'Was sind Cookies?', ar: 'ما هي ملفات تعريف الارتباط؟', ru: 'Что такое файлы cookie?', uk: 'Що таке файли cookie?', zh: '什么是Cookie？', es: '¿Qué son las Cookies?', fr: 'Que sont les cookies?' },
    whatT1:   { en: 'Cookies are small text files stored on your device (computer, tablet, smartphone) when you visit a website. They allow the website to recognize your device and remember certain information.', de: 'Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, wenn Sie eine Website besuchen. Sie ermöglichen es der Website, Ihr Gerät wiederzuerkennen und bestimmte Informationen zu speichern.', ar: 'ملفات تعريف الارتباط هي ملفات نصية صغيرة تُخزَّن على جهازك (كمبيوتر أو جهاز لوحي أو هاتف ذكي) عند زيارة موقع إلكتروني. إنها تسمح للموقع بالتعرف على جهازك وتذكر معلومات معينة.', ru: 'Файлы cookie — это небольшие текстовые файлы, хранящиеся на вашем устройстве (компьютер, планшет, смартфон) при посещении сайта. Они позволяют сайту распознавать ваше устройство и запоминать определённую информацию.', uk: 'Файли cookie — це невеликі текстові файли, що зберігаються на вашому пристрої (комп\'ютер, планшет, смартфон) під час відвідування веб-сайту. Вони дозволяють сайту розпізнавати ваш пристрій та запам\'ятовувати певну інформацію.', zh: 'Cookie是当您访问网站时存储在您的设备（电脑、平板、智能手机）上的小型文本文件。它们允许网站识别您的设备并记住某些信息。', es: 'Las cookies son pequeños archivos de texto almacenados en su dispositivo (ordenador, tableta, smartphone) cuando visita un sitio web. Permiten que el sitio web reconozca su dispositivo y recuerde cierta información.', fr: 'Les cookies sont de petits fichiers texte stockés sur votre appareil (ordinateur, tablette, smartphone) lorsque vous visitez un site web. Ils permettent au site web de reconnaître votre appareil et de mémoriser certaines informations.' },
    whatT2:   { en: 'Cookies can be "session cookies" (deleted when you close the browser) or "persistent cookies" (remain until they expire or you delete them).', de: 'Cookies können „Session-Cookies" (werden beim Schließen des Browsers gelöscht) oder „persistente Cookies" sein (verbleiben bis sie ablaufen oder Sie sie löschen).', ar: 'يمكن أن تكون ملفات تعريف الارتباط "ملفات جلسة" (تُحذف عند إغلاق المتصفح) أو "ملفات دائمة" (تبقى حتى تنتهي صلاحيتها أو تحذفها).', ru: 'Файлы cookie могут быть "сессионными" (удаляются при закрытии браузера) или "постоянными" (остаются до истечения срока или удаления вами).', uk: 'Файли cookie можуть бути "сесійними" (видаляються при закритті браузера) або "постійними" (залишаються до закінчення терміну або видалення вами).', zh: 'Cookie可以是"会话Cookie"（关闭浏览器时删除）或"持久Cookie"（保留到过期或您删除为止）。', es: 'Las cookies pueden ser "cookies de sesión" (se eliminan al cerrar el navegador) o "cookies persistentes" (permanecen hasta que expiran o las elimina).', fr: 'Les cookies peuvent être des "cookies de session" (supprimés à la fermeture du navigateur) ou des "cookies persistants" (restent jusqu\'à leur expiration ou leur suppression).' },
    how:      { en: 'How Do We Use Cookies?', de: 'Wie verwenden wir Cookies?', ar: 'كيف نستخدم ملفات تعريف الارتباط؟', ru: 'Как мы используем файлы cookie?', uk: 'Як ми використовуємо файли cookie?', zh: '我们如何使用Cookie？', es: '¿Cómo Usamos las Cookies?', fr: 'Comment utilisons-nous les cookies?' },
    howT:     { en: 'We use cookies for various purposes:', de: 'Wir verwenden Cookies für verschiedene Zwecke:', ar: 'نستخدم ملفات تعريف الارتباط لأغراض متعددة:', ru: 'Мы используем файлы cookie в различных целях:', uk: 'Ми використовуємо файли cookie для різних цілей:', zh: '我们将Cookie用于各种目的：', es: 'Usamos cookies para diversos fines:', fr: 'Nous utilisons les cookies à diverses fins:' },
    howItems: {
      en: ['To ensure the basic functionality of our website', 'To remember your preferences and settings', 'To analyze how visitors use our website', 'To improve the user experience', 'To provide security features'],
      de: ['Um die grundlegende Funktionalität unserer Website zu gewährleisten', 'Um Ihre Einstellungen und Präferenzen zu speichern', 'Um zu analysieren, wie Besucher unsere Website nutzen', 'Um die Benutzererfahrung zu verbessern', 'Um Sicherheitsfunktionen bereitzustellen'],
      ar: ['لضمان الوظائف الأساسية لموقعنا', 'لتذكر تفضيلاتك وإعداداتك', 'لتحليل كيفية استخدام الزوار لموقعنا', 'لتحسين تجربة المستخدم', 'لتوفير ميزات الأمان'],
      ru: ['Для обеспечения базовой функциональности нашего сайта', 'Для запоминания ваших предпочтений и настроек', 'Для анализа использования сайта посетителями', 'Для улучшения пользовательского опыта', 'Для обеспечения функций безопасности'],
      uk: ['Для забезпечення базової функціональності нашого сайту', 'Для запам\'ятовування ваших уподобань та налаштувань', 'Для аналізу використання сайту відвідувачами', 'Для покращення користувацького досвіду', 'Для забезпечення функцій безпеки'],
      zh: ['确保网站的基本功能', '记住您的偏好和设置', '分析访客如何使用我们的网站', '改善用户体验', '提供安全功能'],
      es: ['Para garantizar la funcionalidad básica de nuestro sitio web', 'Para recordar sus preferencias y configuraciones', 'Para analizar cómo los visitantes usan nuestro sitio web', 'Para mejorar la experiencia del usuario', 'Para proporcionar funciones de seguridad'],
      fr: ['Pour assurer la fonctionnalité de base de notre site web', 'Pour mémoriser vos préférences et paramètres', 'Pour analyser comment les visiteurs utilisent notre site web', 'Pour améliorer l\'expérience utilisateur', 'Pour fournir des fonctionnalités de sécurité'],
      tr: ['Web sitemizin temel işlevselliğini sağlamak için', 'Tercihlerinizi ve ayarlarınızı hatırlamak için', 'Ziyaretçilerin sitemizi nasıl kullandığını analiz etmek için', 'Kullanıcı deneyimini iyileştirmek için', 'Güvenlik özellikleri sağlamak için'],
    },
    types:    { en: 'Types of Cookies We Use', de: 'Arten von Cookies, die wir verwenden', ar: 'أنواع ملفات تعريف الارتباط التي نستخدمها', ru: 'Типы используемых нами файлов cookie', uk: 'Типи файлів cookie, які ми використовуємо', zh: '我们使用的Cookie类型', es: 'Tipos de Cookies que Usamos', fr: 'Types de cookies que nous utilisons' },
    necessary: { en: '1. Strictly Necessary Cookies', de: '1. Unbedingt erforderliche Cookies', ar: '1. ملفات الارتباط الضرورية تمامًا', ru: '1. Строго необходимые файлы cookie', uk: '1. Суворо необхідні файли cookie', zh: '1. 严格必要Cookie', es: '1. Cookies Estrictamente Necesarias', fr: '1. Cookies strictement nécessaires' },
    necessaryT: { en: 'These cookies are essential for the operation of our website. Without them, services you have requested cannot be provided. They do not store personally identifiable information.', de: 'Diese Cookies sind für den Betrieb unserer Website unerlässlich. Ohne sie können angeforderte Dienste nicht bereitgestellt werden. Sie speichern keine personenbezogenen Daten.', ar: 'هذه الملفات ضرورية لتشغيل موقعنا. بدونها لا يمكن تقديم الخدمات المطلوبة. لا تخزن معلومات تعريفية شخصية.', ru: 'Эти файлы cookie необходимы для работы нашего сайта. Без них запрошенные услуги не могут быть предоставлены. Они не хранят личные идентификационные данные.', uk: 'Ці файли cookie необхідні для роботи нашого сайту. Без них запитані послуги не можуть бути надані. Вони не зберігають особисті ідентифікаційні дані.', zh: '这些Cookie对于我们网站的运行至关重要。没有它们，所请求的服务将无法提供。它们不存储个人识别信息。', es: 'Estas cookies son esenciales para el funcionamiento de nuestro sitio web. Sin ellas, los servicios solicitados no pueden proporcionarse. No almacenan información de identificación personal.', fr: 'Ces cookies sont essentiels au fonctionnement de notre site web. Sans eux, les services demandés ne peuvent pas être fournis. Ils ne stockent pas d\'informations personnelles identifiables.' },
    functional: { en: '2. Functional Cookies', de: '2. Funktionale Cookies', ar: '2. ملفات الارتباط الوظيفية', ru: '2. Функциональные файлы cookie', uk: '2. Функціональні файли cookie', zh: '2. 功能性Cookie', es: '2. Cookies Funcionales', fr: '2. Cookies fonctionnels' },
    functionalT: { en: 'These cookies enable enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.', de: 'Diese Cookies ermöglichen erweiterte Funktionalität und Personalisierung. Sie können von uns oder Drittanbietern gesetzt werden.', ar: 'تتيح هذه الملفات وظائف محسّنة وتخصيصًا. قد يتم تعيينها من قبلنا أو من قبل مزودين خارجيين.', ru: 'Эти файлы cookie обеспечивают расширенную функциональность и персонализацию. Могут устанавливаться нами или сторонними провайдерами.', uk: 'Ці файли cookie забезпечують розширену функціональність та персоналізацію. Можуть встановлюватися нами або сторонніми провайдерами.', zh: '这些Cookie可实现增强功能和个性化。它们可能由我们或我们在页面中添加其服务的第三方提供商设置。', es: 'Estas cookies permiten una funcionalidad mejorada y la personalización. Pueden ser establecidas por nosotros o por proveedores de terceros cuyos servicios hemos añadido a nuestras páginas.', fr: 'Ces cookies permettent des fonctionnalités améliorées et la personnalisation. Ils peuvent être définis par nous ou par des fournisseurs tiers dont nous avons ajouté les services à nos pages.' },
    analytics:  { en: '3. Analytics Cookies', de: '3. Analyse-Cookies', ar: '3. ملفات ارتباط التحليلات', ru: '3. Аналитические файлы cookie', uk: '3. Аналітичні файли cookie', zh: '3. 分析Cookie', es: '3. Cookies de Análisis', fr: '3. Cookies analytiques' },
    analyticsT: { en: 'These cookies allow us to count visits and traffic sources so we can measure and improve site performance. All information collected is aggregated and therefore anonymous.', de: 'Diese Cookies ermöglichen es uns, Besuche und Zugriffsquellen zu zählen, um die Leistung unserer Website zu messen und zu verbessern. Alle gesammelten Informationen sind aggregiert und daher anonym.', ar: 'تسمح لنا هذه الملفات بعد الزيارات ومصادر الزيارات لقياس أداء الموقع وتحسينه. جميع المعلومات المجمعة مجمعة ومجهولة الهوية.', ru: 'Эти файлы cookie позволяют нам считать посещения и источники трафика для измерения и улучшения производительности сайта. Все собранные данные агрегированы и анонимны.', uk: 'Ці файли cookie дозволяють нам підраховувати відвідування та джерела трафіку для вимірювання та покращення продуктивності сайту. Всі зібрані дані агреговані та анонімні.', zh: '这些Cookie允许我们统计访问量和流量来源，从而衡量和提升网站性能。收集的所有信息都是汇总的，因此是匿名的。', es: 'Estas cookies nos permiten contar las visitas y las fuentes de tráfico para medir y mejorar el rendimiento del sitio. Toda la información recopilada es agregada y por lo tanto anónima.', fr: 'Ces cookies nous permettent de compter les visites et les sources de trafic afin de mesurer et d\'améliorer les performances du site. Toutes les informations collectées sont agrégées et donc anonymes.' },
    marketing:  { en: '4. Marketing / Advertising Cookies', de: '4. Marketing- / Werbe-Cookies', ar: '4. ملفات ارتباط التسويق / الإعلان', ru: '4. Маркетинговые / рекламные файлы cookie', uk: '4. Маркетингові / рекламні файли cookie', zh: '4. 营销/广告Cookie', es: '4. Cookies de Marketing / Publicidad', fr: '4. Cookies de marketing / publicité' },
    marketingT: { en: 'These cookies may be set by our advertising partners to build a profile of your interests and show you relevant ads on other sites.', de: 'Diese Cookies können von unseren Werbepartnern gesetzt werden, um ein Interessenprofil zu erstellen und relevante Werbung auf anderen Websites anzuzeigen.', ar: 'قد يتم تعيين هذه الملفات من قبل شركاء الإعلان لدينا لبناء ملف تعريف لاهتماماتك وعرض إعلانات ذات صلة على مواقع أخرى.', ru: 'Эти файлы cookie могут устанавливаться нашими рекламными партнёрами для создания профиля ваших интересов и показа релевантной рекламы на других сайтах.', uk: 'Ці файли cookie можуть встановлюватися нашими рекламними партнерами для створення профілю ваших інтересів та показу відповідної реклами на інших сайтах.', zh: '这些Cookie可能由我们的广告合作伙伴设置，以建立您的兴趣档案并在其他网站上向您展示相关广告。', es: 'Estas cookies pueden ser establecidas por nuestros socios publicitarios para crear un perfil de sus intereses y mostrarle anuncios relevantes en otros sitios.', fr: 'Ces cookies peuvent être définis par nos partenaires publicitaires pour créer un profil de vos intérêts et vous montrer des publicités pertinentes sur d\'autres sites.' },
    legalBasis: { en: 'Legal Basis', de: 'Rechtsgrundlage', ar: 'الأساس القانوني', ru: 'Правовая основа', uk: 'Правова основа', zh: '法律依据', es: 'Base Legal', fr: 'Base légale' },
    legalBasisConsent: { en: 'Legal Basis: User consent required', de: 'Rechtsgrundlage: Einwilligung erforderlich', ar: 'الأساس القانوني: مطلوب موافقة المستخدم', ru: 'Правовая основа: требуется согласие пользователя', uk: 'Правова основа: потрібна згода користувача', zh: '法律依据：需要用户同意', es: 'Base Legal: Se requiere consentimiento del usuario', fr: 'Base légale: Consentement de l\'utilisateur requis' },
    storageDuration: { en: 'Storage Duration: Session', de: 'Speicherdauer: Sitzung', ar: 'مدة التخزين: الجلسة', ru: 'Срок хранения: Сессия', uk: 'Термін зберігання: Сесія', zh: '存储期限：会话', es: 'Duración del almacenamiento: Sesión', fr: 'Durée de stockage: Session' },
    storage30: { en: 'Storage Duration: 30 days to 1 year', de: 'Speicherdauer: 30 Tage bis 1 Jahr', ar: 'مدة التخزين: 30 يومًا إلى سنة', ru: 'Срок хранения: от 30 дней до 1 года', uk: 'Термін зберігання: від 30 днів до 1 року', zh: '存储期限：30天至1年', es: 'Duración del almacenamiento: 30 días a 1 año', fr: 'Durée de stockage: 30 jours à 1 an' },
    storage2y: { en: 'Storage Duration: Up to 2 years', de: 'Speicherdauer: Bis zu 2 Jahre', ar: 'مدة التخزين: حتى سنتين', ru: 'Срок хранения: До 2 лет', uk: 'Термін зберігання: До 2 років', zh: '存储期限：最多2年', es: 'Duración del almacenamiento: Hasta 2 años', fr: 'Durée de stockage: Jusqu\'à 2 ans' },
    storage1y: { en: 'Storage Duration: Up to 1 year', de: 'Speicherdauer: Bis zu 1 Jahr', ar: 'مدة التخزين: حتى سنة', ru: 'Срок хранения: До 1 года', uk: 'Термін зберігання: До 1 року', zh: '存储期限：最多1年', es: 'Duración del almacenamiento: Hasta 1 año', fr: 'Durée de stockage: Jusqu\'à 1 an' },
    overview:  { en: 'Cookie Overview', de: 'Cookie-Übersicht', ar: 'نظرة عامة على ملفات الارتباط', ru: 'Обзор файлов cookie', uk: 'Огляд файлів cookie', zh: 'Cookie概览', es: 'Resumen de Cookies', fr: 'Aperçu des cookies' },
    colPurpose: { en: 'Purpose', de: 'Zweck', ar: 'الغرض', ru: 'Цель', uk: 'Мета', zh: '目的', es: 'Propósito', fr: 'Objectif' },
    colType:   { en: 'Type', de: 'Typ', ar: 'النوع', ru: 'Тип', uk: 'Тип', zh: '类型', es: 'Tipo', fr: 'Type' },
    colDur:    { en: 'Duration', de: 'Dauer', ar: 'المدة', ru: 'Срок', uk: 'Термін', zh: '期限', es: 'Duración', fr: 'Durée' },
    rowConsent: { en: 'Stores cookie preferences', de: 'Speichert Cookie-Einstellungen', ar: 'يخزن تفضيلات ملفات الارتباط', ru: 'Хранит настройки cookie', uk: 'Зберігає налаштування cookie', zh: '存储Cookie偏好', es: 'Almacena preferencias de cookies', fr: 'Stocke les préférences de cookies' },
    rowLang:   { en: 'Stores language preference', de: 'Speichert Spracheinstellung', ar: 'يخزن تفضيل اللغة', ru: 'Хранит языковые настройки', uk: 'Зберігає мовні налаштування', zh: '存储语言偏好', es: 'Almacena la preferencia de idioma', fr: 'Stocke la préférence de langue' },
    typeNecessary: { en: 'Necessary', de: 'Erforderlich', ar: 'ضروري', ru: 'Необходимый', uk: 'Необхідний', zh: '必要', es: 'Necesario', fr: 'Nécessaire' },
    typeFunctional: { en: 'Functional', de: 'Funktional', ar: 'وظيفي', ru: 'Функциональный', uk: 'Функціональний', zh: '功能性', es: 'Funcional', fr: 'Fonctionnel' },
    year: { en: 'year', de: 'Jahr', ar: 'سنة', ru: 'год', uk: 'рік', zh: '年', es: 'año', fr: 'an' },
    management: { en: 'Cookie Management', de: 'Cookie-Verwaltung', ar: 'إدارة ملفات تعريف الارتباط', ru: 'Управление файлами cookie', uk: 'Управління файлами cookie', zh: 'Cookie管理', es: 'Gestión de Cookies', fr: 'Gestion des cookies' },
    browser:   { en: 'Browser Settings', de: 'Browsereinstellungen', ar: 'إعدادات المتصفح', ru: 'Настройки браузера', uk: 'Налаштування браузера', zh: '浏览器设置', es: 'Configuración del Navegador', fr: 'Paramètres du navigateur' },
    chromeT:   { en: 'Settings > Privacy and security > Cookies and other site data', de: 'Einstellungen > Datenschutz und Sicherheit > Cookies und andere Websitedaten', ar: 'الإعدادات > الخصوصية والأمان > ملفات تعريف الارتباط وبيانات الموقع', ru: 'Настройки > Конфиденциальность и безопасность > Файлы cookie', uk: 'Налаштування > Конфіденційність і безпека > Файли cookie', zh: '设置 > 隐私和安全 > Cookie及其他网站数据', es: 'Configuración > Privacidad y seguridad > Cookies y otros datos de sitios', fr: 'Paramètres > Confidentialité et sécurité > Cookies et autres données des sites' },
    firefoxT:  { en: 'Options > Privacy & Security > Cookies and Site Data', de: 'Einstellungen > Datenschutz & Sicherheit > Cookies und Website-Daten', ar: 'الخيارات > الخصوصية والأمان > ملفات تعريف الارتباط وبيانات الموقع', ru: 'Параметры > Приватность и защита > Куки и данные сайтов', uk: 'Параметри > Приватність і захист > Файли cookie та дані сайту', zh: '选项 > 隐私和安全 > Cookie和网站数据', es: 'Opciones > Privacidad y Seguridad > Cookies y datos del sitio', fr: 'Options > Vie privée et sécurité > Cookies et données des sites' },
    safariT:   { en: 'Preferences > Privacy > Manage Website Data', de: 'Einstellungen > Datenschutz > Websitedaten verwalten', ar: 'التفضيلات > الخصوصية > إدارة بيانات الموقع', ru: 'Настройки > Конфиденциальность > Управление данными сайтов', uk: 'Налаштування > Конфіденційність > Керування даними сайту', zh: '偏好设置 > 隐私 > 管理网站数据', es: 'Preferencias > Privacidad > Gestionar datos del sitio web', fr: 'Préférences > Confidentialité > Gérer les données des sites web' },
    edgeT:     { en: 'Settings > Cookies and site permissions > Manage and delete cookies and site data', de: 'Einstellungen > Cookies und Websiteberechtigungen > Cookies und Websitedaten verwalten und löschen', ar: 'الإعدادات > ملفات الارتباط وأذونات الموقع > إدارة وحذف ملفات الارتباط', ru: 'Настройки > Файлы cookie и разрешения > Управление и удаление файлов cookie', uk: 'Налаштування > Файли cookie та дозволи > Керування та видалення файлів cookie', zh: '设置 > Cookie和网站权限 > 管理和删除Cookie及网站数据', es: 'Configuración > Cookies y permisos del sitio > Administrar y eliminar cookies y datos del sitio', fr: 'Paramètres > Cookies et autorisations du site > Gérer et supprimer les cookies et les données du site' },
    blocking:  { en: 'Blocking Cookies', de: 'Cookies blockieren', ar: 'حظر ملفات الارتباط', ru: 'Блокировка файлов cookie', uk: 'Блокування файлів cookie', zh: '阻止Cookie', es: 'Bloquear Cookies', fr: 'Bloquer les cookies' },
    blockingT: { en: 'Please note that if you block certain cookies, some features of our website may not function properly.', de: 'Bitte beachten Sie, dass bei der Blockierung bestimmter Cookies einige Funktionen möglicherweise nicht ordnungsgemäß funktionieren.', ar: 'يرجى ملاحظة أنه إذا قمت بحظر ملفات معينة، فقد لا تعمل بعض ميزات موقعنا بشكل صحيح.', ru: 'Обратите внимание, что блокировка определённых файлов cookie может привести к некорректной работе некоторых функций сайта.', uk: 'Зверніть увагу, що блокування певних файлів cookie може призвести до некоректної роботи деяких функцій сайту.', zh: '请注意，如果您阻止某些Cookie，我们网站的某些功能可能无法正常运行。', es: 'Tenga en cuenta que si bloquea ciertas cookies, algunas funciones de nuestro sitio web pueden no funcionar correctamente.', fr: 'Veuillez noter que si vous bloquez certains cookies, certaines fonctionnalités de notre site web peuvent ne pas fonctionner correctement.' },
    further:   { en: 'Further Information', de: 'Weitere Informationen', ar: 'مزيد من المعلومات', ru: 'Дополнительная информация', uk: 'Додаткова інформація', zh: '更多信息', es: 'Más Información', fr: 'Informations supplémentaires' },
    furtherT:  { en: 'If you have questions about our use of cookies, please contact us:', de: 'Wenn Sie Fragen zur Verwendung von Cookies haben, kontaktieren Sie uns bitte:', ar: 'إذا كانت لديك أسئلة حول استخدامنا لملفات تعريف الارتباط، يرجى التواصل معنا:', ru: 'Если у вас есть вопросы об использовании нами файлов cookie, свяжитесь с нами:', uk: 'Якщо у вас є питання щодо використання нами файлів cookie, будь ласка, зв\'яжіться з нами:', zh: '如果您对我们使用Cookie有任何问题，请联系我们：', es: 'Si tiene preguntas sobre nuestro uso de cookies, contáctenos:', fr: 'Si vous avez des questions sur notre utilisation des cookies, veuillez nous contacter:' },
    furtherPrivacy: { en: 'For more information about data protection, please see our', de: 'Weitere Informationen zum Datenschutz finden Sie in unserer', ar: 'للمزيد من المعلومات حول حماية البيانات، راجع', ru: 'Дополнительную информацию о защите данных см. в нашей', uk: 'Для отримання додаткової інформації про захист даних дивіться нашу', zh: '有关数据保护的更多信息，请参阅我们的', es: 'Para más información sobre protección de datos, consulte nuestra', fr: 'Pour plus d\'informations sur la protection des données, veuillez consulter notre' },
    privacyPolicyLink: { en: 'Privacy Policy', de: 'Datenschutzerklärung', ar: 'سياسة الخصوصية', ru: 'Политике конфиденциальности', uk: 'Політиці конфіденційності', zh: '隐私政策', es: 'Política de Privacidad', fr: 'Politique de confidentialité' },
    updates:   { en: 'Updates to this Policy', de: 'Aktualisierungen dieser Richtlinie', ar: 'تحديثات هذه السياسة', ru: 'Обновления данной политики', uk: 'Оновлення цієї політики', zh: '政策更新', es: 'Actualizaciones de esta Política', fr: 'Mises à jour de cette politique' },
    updatesT:  { en: 'We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please revisit this page regularly to stay informed.', de: 'Wir können diese Cookie-Richtlinie von Zeit zu Zeit aktualisieren, um Änderungen in unserer Praxis oder aus anderen Gründen widerzuspiegeln. Bitte besuchen Sie diese Seite regelmäßig.', ar: 'قد نحدّث سياسة ملفات تعريف الارتباط هذه من وقت لآخر لتعكس التغييرات في ممارساتنا أو لأسباب تشغيلية أو قانونية أو تنظيمية أخرى. يرجى مراجعة هذه الصفحة بانتظام.', ru: 'Мы можем периодически обновлять данную политику cookie для отражения изменений в наших практиках или по другим операционным, правовым или нормативным причинам. Пожалуйста, регулярно посещайте эту страницу.', uk: 'Ми можемо час від часу оновлювати цю політику cookie для відображення змін у наших практиках або з інших операційних, правових чи нормативних причин. Будь ласка, регулярно переглядайте цю сторінку.', zh: '我们可能会不时更新本Cookie政策以反映我们实践的变化或出于其他运营、法律或监管原因。请定期访问本页面以了解最新信息。', es: 'Podemos actualizar esta Política de Cookies periódicamente para reflejar cambios en nuestras prácticas u otras razones operativas, legales o regulatorias. Por favor, vuelva a visitar esta página regularmente para mantenerse informado.', fr: 'Nous pouvons mettre à jour cette Politique de cookies de temps en temps pour refléter les changements dans nos pratiques ou pour d\'autres raisons opérationnelles, légales ou réglementaires. Veuillez revisiter régulièrement cette page pour rester informé.' },
  },
} as const;

// Helper: get text for a language from a translation leaf
type Leaf = Partial<Record<Language, string>>;
const g = (leaf: Leaf, lang: Language): string => (leaf[lang] ?? leaf['en']) as string;

// ========== IMPRESSUM PAGE ==========
const ImpressumPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const i = T.impressum;
  const localeMap: Record<Language, string> = { en: 'en-US', de: 'de-DE', ar: 'ar', ru: 'ru-RU', uk: 'uk-UA', zh: 'zh-CN', es: 'es-ES', fr: 'fr-FR', tr: 'tr-TR' };
  return (
    <>
      <h1 className="text-4xl font-serif font-bold mb-2 text-navy-900">{g(i.title, lang)}</h1>
      <p className="text-navy-900/60 mb-12">{g(i.subtitle, lang)}</p>

      <Section title={g(i.provider, lang)}>
        <Card>
          <p className="font-semibold text-white">ECKERTPREISSER Personalberatung Partnerschaft</p>
          <p>Im Burgstall 25 · 74343 Sachsenheim · Deutschland</p>
        </Card>
      </Section>

      <Section title={g(i.contact, lang)}>
        <Card>
          <p>{g(i.phone, lang)}: +49 (0) 7147 960210</p>
          <p>E-Mail: kontakt@eckertpreisser.de</p>
          <p>{g(i.website, lang)}: www.eckertpreisser.de</p>
        </Card>
      </Section>

      <Section title={g(i.reps, lang)}>
        <Card>
          <p>Peter Eckert</p>
          <p>Margarete Eckert-Preisser</p>
        </Card>
      </Section>

      <Section title={g(i.regEntry, lang)}>
        <Card>
          <p>{g(i.regCourt, lang)}: Amtsgericht Stuttgart</p>
          <p>{g(i.regNum, lang)}: PR 720497</p>
        </Card>
      </Section>

      <Section title={g(i.vatId, lang)}>
        <Card>
          <p>{g(i.vatText, lang)}: DE298681715</p>
        </Card>
      </Section>

      <Section title={g(i.respContent, lang)}>
        <Card>
          <p className="font-semibold text-white">Peter Eckert</p>
          <p>Im Burgstall 25 · 74343 Sachsenheim</p>
        </Card>
      </Section>

      <Section title={g(i.dispute, lang)}>
        <Card>
          <p>{g(i.disputeText1, lang)}{' '}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:underline">
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p>{g(i.disputeText2, lang)}</p>
        </Card>
      </Section>

      <Section title={g(i.liabContent, lang)}>
        <Card>
          <p>{g(i.liabContentT1, lang)}</p>
          <p>{g(i.liabContentT2, lang)}</p>
        </Card>
      </Section>

      <Section title={g(i.liabLinks, lang)}>
        <Card>
          <p>{g(i.liabLinksT1, lang)}</p>
          <p>{g(i.liabLinksT2, lang)}</p>
        </Card>
      </Section>

      <Section title={g(i.copyright, lang)}>
        <Card>
          <p>{g(i.copyrightT1, lang)}</p>
          <p>{g(i.copyrightT2, lang)}</p>
        </Card>
      </Section>

      <Section title={g(i.webDesign, lang)}>
        <Card>
          <p>{g(i.webDesignLabel, lang)}</p>
          <p className="font-semibold text-white">Moritz F. Becker</p>
          <p>Becker Limited</p>
          <p><a href="https://www.becker.limited" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:underline">www.becker.limited</a></p>
          <p className="mt-2 text-cream-100/60 text-sm">{g(i.webDesignRights, lang)}</p>
        </Card>
      </Section>
    </>
  );
};

// ========== DATENSCHUTZ PAGE ==========
const DatenschutzPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const p = T.privacy;
  const localeMap: Record<Language, string> = { en: 'en-US', de: 'de-DE', ar: 'ar', ru: 'ru-RU', uk: 'uk-UA', zh: 'zh-CN', es: 'es-ES', fr: 'fr-FR', tr: 'tr-TR' };
  return (
    <>
      <h1 className="text-4xl font-serif font-bold mb-2 text-navy-900">{g(p.title, lang)}</h1>
      <p className="text-navy-900/60 mb-12">
        {g(p.lastUpdated, lang)}: {new Date().toLocaleDateString(localeMap[lang])}
      </p>

      <Section title={g(p.s1, lang)}>
        <SubSection title={g(p.s1a, lang)}>
          <Card><p>{g(p.s1aT, lang)}</p></Card>
        </SubSection>
        <SubSection title={g(p.s1b, lang)}>
          <Card>
            <p className="font-semibold text-white">{g(p.s1bQ1, lang)}</p>
            <p>{g(p.s1bA1, lang)}</p>
            <p className="font-semibold text-white mt-4">{g(p.s1bQ2, lang)}</p>
            <p>{g(p.s1bA2, lang)}</p>
            <p className="font-semibold text-white mt-4">{g(p.s1bQ3, lang)}</p>
            <p>{g(p.s1bA3, lang)}</p>
            <p className="font-semibold text-white mt-4">{g(p.s1bQ4, lang)}</p>
            <p>{g(p.s1bA4, lang)}</p>
          </Card>
        </SubSection>
      </Section>

      <Section title={g(p.s2, lang)}>
        <Card>
          <p>{g(p.s2T1, lang)}</p>
          <p>{g(p.s2T2, lang)}</p>
        </Card>
      </Section>

      <Section title={g(p.s3, lang)}>
        <SubSection title={g(p.s3a, lang)}>
          <Card><p>{g(p.s3aT, lang)}</p></Card>
        </SubSection>
        <SubSection title={g(p.s3b, lang)}>
          <Card>
            <p>{g(p.s3bT, lang)}</p>
            <p className="font-semibold text-white mt-2">ECKERTPREISSER Personalberatung Partnerschaft</p>
            <p>Im Burgstall 25 · 74343 Sachsenheim · Deutschland</p>
            <p className="mt-2">{g(p.phone, lang)}: +49 (0) 7147 960210</p>
            <p>E-Mail: kontakt@eckertpreisser.de</p>
          </Card>
        </SubSection>
        <SubSection title={g(p.s3c, lang)}>
          <Card><p>{g(p.s3cT, lang)}</p></Card>
        </SubSection>
        <SubSection title={g(p.s3d, lang)}>
          <Card><p>{g(p.s3dT, lang)}</p></Card>
        </SubSection>
        <SubSection title={g(p.s3e, lang)}>
          <Card><p>{g(p.s3eT, lang)}</p></Card>
        </SubSection>
        <SubSection title={g(p.s3f, lang)}>
          <Card><p>{g(p.s3fT, lang)}</p></Card>
        </SubSection>
        <SubSection title={g(p.s3g, lang)}>
          <Card><p>{g(p.s3gT, lang)}</p></Card>
        </SubSection>
      </Section>

      <Section title={g(p.s4, lang)}>
        <SubSection title={g(p.s4a, lang)}>
          <Card>
            <p>{g(p.s4aT, lang)}{' '}
              <a href="#/cookies" className="text-gold-400 hover:underline">{g(p.cookiePolicyLink, lang)}</a>.
            </p>
          </Card>
        </SubSection>
        <SubSection title={g(p.s4b, lang)}>
          <Card>
            <p>{g(p.s4bT, lang)}</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {p.logItems[lang].map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p className="mt-3">{g(p.s4bT2, lang)}</p>
          </Card>
        </SubSection>
        <SubSection title={g(p.s4c, lang)}>
          <Card>
            <p>{g(p.s4cT1, lang)}</p>
            <p>{g(p.s4cT2, lang)}</p>
          </Card>
        </SubSection>
      </Section>

      <Section title={g(p.s5, lang)}>
        <Card><p>{g(p.s5T, lang)}</p></Card>
      </Section>

      <Section title={g(p.s6, lang)}>
        <Card><p>{g(p.s6T, lang)}</p></Card>
      </Section>
    </>
  );
};

// ========== COOKIE POLICY PAGE ==========
const CookiePolicyPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const c = T.cookie;
  const localeMap: Record<Language, string> = { en: 'en-US', de: 'de-DE', ar: 'ar', ru: 'ru-RU', uk: 'uk-UA', zh: 'zh-CN', es: 'es-ES', fr: 'fr-FR', tr: 'tr-TR' };
  return (
    <>
      <h1 className="text-4xl font-serif font-bold mb-2 text-navy-900">{g(c.title, lang)}</h1>
      <p className="text-navy-900/60 mb-12">
        {g(c.lastUpdated, lang)}: {new Date().toLocaleDateString(localeMap[lang])}
      </p>

      <Section title={g(c.what, lang)}>
        <Card>
          <p>{g(c.whatT1, lang)}</p>
          <p>{g(c.whatT2, lang)}</p>
        </Card>
      </Section>

      <Section title={g(c.how, lang)}>
        <Card>
          <p>{g(c.howT, lang)}</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            {c.howItems[lang].map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </Card>
      </Section>

      <Section title={g(c.types, lang)}>
        <SubSection title={g(c.necessary, lang)}>
          <Card>
            <p>{g(c.necessaryT, lang)}</p>
            <p className="mt-2 text-cream-100/60 text-sm">{g(c.legalBasis, lang)}: Art. 6 Abs. 1 lit. f DSGVO</p>
            <p className="text-cream-100/60 text-sm">{g(c.storageDuration, lang)}</p>
          </Card>
        </SubSection>
        <SubSection title={g(c.functional, lang)}>
          <Card>
            <p>{g(c.functionalT, lang)}</p>
            <p className="mt-2 text-cream-100/60 text-sm">{g(c.legalBasis, lang)}: Art. 6 Abs. 1 lit. f / a DSGVO</p>
            <p className="text-cream-100/60 text-sm">{g(c.storage30, lang)}</p>
          </Card>
        </SubSection>
        <SubSection title={g(c.analytics, lang)}>
          <Card>
            <p>{g(c.analyticsT, lang)}</p>
            <p className="mt-2 text-cream-100/60 text-sm">{g(c.legalBasisConsent, lang)} (Art. 6 Abs. 1 lit. a DSGVO)</p>
            <p className="text-cream-100/60 text-sm">{g(c.storage2y, lang)}</p>
          </Card>
        </SubSection>
        <SubSection title={g(c.marketing, lang)}>
          <Card>
            <p>{g(c.marketingT, lang)}</p>
            <p className="mt-2 text-cream-100/60 text-sm">{g(c.legalBasisConsent, lang)} (Art. 6 Abs. 1 lit. a DSGVO)</p>
            <p className="text-cream-100/60 text-sm">{g(c.storage1y, lang)}</p>
          </Card>
        </SubSection>
      </Section>

      <Section title={g(c.overview, lang)}>
        <div className="bg-navy-900 p-6 rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-2 font-semibold text-white">Cookie</th>
                <th className="text-left py-3 px-2 font-semibold text-white">{g(c.colPurpose, lang)}</th>
                <th className="text-left py-3 px-2 font-semibold text-white">{g(c.colType, lang)}</th>
                <th className="text-left py-3 px-2 font-semibold text-white">{g(c.colDur, lang)}</th>
              </tr>
            </thead>
            <tbody className="text-cream-100/80">
              <tr className="border-b border-white/5">
                <td className="py-3 px-2">cookie_consent</td>
                <td className="py-3 px-2">{g(c.rowConsent, lang)}</td>
                <td className="py-3 px-2">{g(c.typeNecessary, lang)}</td>
                <td className="py-3 px-2">1 {g(c.year, lang)}</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-2">language</td>
                <td className="py-3 px-2">{g(c.rowLang, lang)}</td>
                <td className="py-3 px-2">{g(c.typeFunctional, lang)}</td>
                <td className="py-3 px-2">1 {g(c.year, lang)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title={g(c.management, lang)}>
        <SubSection title={g(c.browser, lang)}>
          <Card>
            <p className="font-semibold text-white">Google Chrome</p>
            <p className="mb-3">{g(c.chromeT, lang)}</p>
            <p className="font-semibold text-white">Mozilla Firefox</p>
            <p className="mb-3">{g(c.firefoxT, lang)}</p>
            <p className="font-semibold text-white">Safari</p>
            <p className="mb-3">{g(c.safariT, lang)}</p>
            <p className="font-semibold text-white">Microsoft Edge</p>
            <p>{g(c.edgeT, lang)}</p>
          </Card>
        </SubSection>
        <SubSection title={g(c.blocking, lang)}>
          <Card><p>{g(c.blockingT, lang)}</p></Card>
        </SubSection>
      </Section>

      <Section title={g(c.further, lang)}>
        <Card>
          <p>{g(c.furtherT, lang)}</p>
          <p className="mt-2">E-Mail: kontakt@eckertpreisser.de</p>
          <p>{g(T.impressum.phone, lang)}: +49 (0) 7147 960210</p>
          <p className="mt-3">{g(c.furtherPrivacy, lang)}{' '}
            <a href="#/datenschutz" className="text-gold-400 hover:underline">{g(c.privacyPolicyLink, lang)}</a>.
          </p>
        </Card>
      </Section>

      <Section title={g(c.updates, lang)}>
        <Card><p>{g(c.updatesT, lang)}</p></Card>
      </Section>
    </>
  );
};

// ========== MAIN EXPORT ==========
const LegalPage: React.FC<LegalPageProps> = ({ page, lang, onBack }) => {
  return (
    <div className="min-h-screen bg-cream-50 pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-navy-900/60 hover:text-gold-400 transition-colors mb-8 text-sm uppercase tracking-widest"
        >
          <ArrowLeft size={16} />
          {T.back[lang]}
        </button>

        {page === 'impressum' && <ImpressumPage lang={lang} />}
        {page === 'datenschutz' && <DatenschutzPage lang={lang} />}
        {page === 'cookies' && <CookiePolicyPage lang={lang} />}
      </div>
    </div>
  );
};

export default LegalPage;
