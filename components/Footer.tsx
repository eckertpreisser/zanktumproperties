import React from 'react';
import { Language } from '../types';
import { getTranslations } from '../constants';

interface FooterProps {
  lang: Language;
}

const LEGAL_LABELS: Record<string, { legal: string; imprint: string; privacy: string; cookies: string }> = {
  en: { legal: 'Legal', imprint: 'Imprint', privacy: 'Privacy Policy', cookies: 'Cookie Policy' },
  de: { legal: 'Rechtliches', imprint: 'Impressum', privacy: 'Datenschutz', cookies: 'Cookie-Richtlinie' },
  ar: { legal: 'قانوني', imprint: 'بيانات النشر', privacy: 'سياسة الخصوصية', cookies: 'سياسة ملفات الارتباط' },
  ru: { legal: 'Правовая информация', imprint: 'Выходные данные', privacy: 'Политика конфиденциальности', cookies: 'Политика cookies' },
  uk: { legal: 'Правова інформація', imprint: 'Вихідні дані', privacy: 'Політика конфіденційності', cookies: 'Політика cookies' },
  zh: { legal: '法律', imprint: '版权声明', privacy: '隐私政策', cookies: 'Cookie政策' },
  es: { legal: 'Legal', imprint: 'Aviso Legal', privacy: 'Política de Privacidad', cookies: 'Política de Cookies' },
  fr: { legal: 'Mentions légales', imprint: 'Mentions légales', privacy: 'Politique de confidentialité', cookies: 'Politique des cookies' },
  tr: { legal: 'Yasal', imprint: 'Künye', privacy: 'Gizlilik Politikası', cookies: 'Çerez Politikası' },
};

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const content = getTranslations(lang).footer;
  const legal = LEGAL_LABELS[lang] ?? LEGAL_LABELS.en;

  return (
    <footer className="bg-navy-900 text-cream-100 py-16 px-4 border-t border-white/10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        <div>
          <div className="mb-6 flex flex-col leading-none">
            <span className="font-display text-2xl font-bold tracking-[0.2em] uppercase text-gold-400">ZANKTUM</span>
            <span className="text-xs tracking-[0.3em] uppercase text-white/60 mt-1">Villas</span>
          </div>
          <p className="text-sm text-cream-100/60 leading-loose">
            {content.desc}
          </p>
        </div>

        <div>
          <h3 className="font-display text-xs tracking-widest uppercase mb-6 text-gold-400">{content.contact}</h3>
          <ul className="space-y-4 text-sm text-cream-100/80">
            <li>+49 (0) 7147 960210</li>
            <li>kontakt@eckertpreisser.de</li>
            <li>Im Burgstall 25</li>
            <li>74343 Sachsenheim</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-xs tracking-widest uppercase mb-6 text-gold-400">
            {legal.legal}
          </h3>
          <ul className="space-y-4 text-sm text-cream-100/80">
            <li>
              <a href="#/impressum" className="hover:text-gold-400 transition-colors">
                {legal.imprint}
              </a>
            </li>
            <li>
              <a href="#/datenschutz" className="hover:text-gold-400 transition-colors">
                {legal.privacy}
              </a>
            </li>
            <li>
              <a href="#/cookies" className="hover:text-gold-400 transition-colors">
                {legal.cookies}
              </a>
            </li>
          </ul>
        </div>

      </div>
      <div className="mt-16 text-center text-xs text-white/20 border-t border-white/5 pt-8">
        {content.rights}
      </div>
    </footer>
  );
};

export default Footer;
