import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { Cookie } from 'lucide-react';

interface CookieBannerProps {
  lang: Language;
}

const T: Record<Language, { message: string; learnMore: string; decline: string; accept: string }> = {
  en: { message: 'We use cookies to enhance your browsing experience. By continuing to use this site, you agree to our use of cookies.', learnMore: 'Learn more', decline: 'Decline', accept: 'Accept' },
  de: { message: 'Wir verwenden Cookies, um Ihre Browser-Erfahrung zu verbessern. Durch die weitere Nutzung dieser Website stimmen Sie unserer Verwendung von Cookies zu.', learnMore: 'Mehr erfahren', decline: 'Ablehnen', accept: 'Akzeptieren' },
  ar: { message: 'نستخدم ملفات تعريف الارتباط لتحسين تجربة تصفحك. بمواصلة استخدام هذا الموقع، فإنك توافق على استخدامنا لملفات تعريف الارتباط.', learnMore: 'اعرف المزيد', decline: 'رفض', accept: 'قبول' },
  ru: { message: 'Мы используем файлы cookie для улучшения вашего опыта просмотра. Продолжая использовать этот сайт, вы соглашаетесь с нашим использованием файлов cookie.', learnMore: 'Узнать больше', decline: 'Отклонить', accept: 'Принять' },
  uk: { message: 'Ми використовуємо файли cookie для покращення вашого досвіду. Продовжуючи використовувати цей сайт, ви погоджуєтесь з нашим використанням файлів cookie.', learnMore: 'Дізнатися більше', decline: 'Відхилити', accept: 'Прийняти' },
  zh: { message: '我们使用Cookie来提升您的浏览体验。继续使用本网站即表示您同意我们使用Cookie。', learnMore: '了解更多', decline: '拒绝', accept: '接受' },
  es: { message: 'Usamos cookies para mejorar su experiencia de navegación. Al continuar usando este sitio, acepta el uso de cookies.', learnMore: 'Más información', decline: 'Rechazar', accept: 'Aceptar' },
  fr: { message: 'Nous utilisons des cookies pour améliorer votre expérience de navigation. En continuant à utiliser ce site, vous acceptez notre utilisation des cookies.', learnMore: 'En savoir plus', decline: 'Refuser', accept: 'Accepter' },
  tr: { message: 'Tarama deneyiminizi iyileştirmek için çerez kullanıyoruz. Bu siteyi kullanmaya devam ederek çerez kullanımımızı kabul etmiş olursunuz.', learnMore: 'Daha fazla bilgi', decline: 'Reddet', accept: 'Kabul Et' },
};

const CookieBanner: React.FC<CookieBannerProps> = ({ lang }) => {
  const [visible, setVisible] = useState(false);
  const t = T[lang] ?? T.en;

  useEffect(() => {
    if (!localStorage.getItem('cookie_consent')) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie_consent', JSON.stringify({ accepted: true, date: new Date().toISOString() }));
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookie_consent', JSON.stringify({ accepted: false, date: new Date().toISOString() }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-navy-900 rounded-xl shadow-2xl border border-white/10 p-6 md:flex md:items-center md:gap-6">
          <div className="flex items-start gap-3 flex-1 mb-4 md:mb-0">
            <Cookie className="text-gold-400 flex-shrink-0 mt-0.5" size={22} />
            <p className="text-cream-100/90 text-sm leading-relaxed">
              {t.message}{' '}
              <a href="#/cookies" className="text-gold-400 hover:underline">{t.learnMore}</a>
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={decline}
              className="px-5 py-2 text-xs uppercase tracking-widest text-cream-100/60 hover:text-cream-100 border border-white/10 rounded-full transition-colors"
            >
              {t.decline}
            </button>
            <button
              onClick={accept}
              className="px-5 py-2 text-xs uppercase tracking-widest bg-gold-400 text-navy-900 font-bold rounded-full hover:bg-gold-500 transition-colors"
            >
              {t.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
