import React, { useState, useEffect, useRef } from 'react';
import Hero from './components/Hero';
import VillaShowcase from './components/VillaShowcase';
import VillaExplorer from './components/VillaExplorer';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import LegalPage from './components/LegalPages';
import CookieBanner from './components/CookieBanner';
import WhySanctum from './components/WhySanctum';
import ArtistSection from './components/ArtistSection';
import CleopatraSection from './components/CleopatraSection';
import BuilderSection from './components/BuilderSection';
import CTASection from './components/CTASection';
import InvestmentSection from './components/InvestmentSection';
import { getNavLinks } from './constants';
import { Language } from './types';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';

type Route = 'home' | 'why' | 'villas' | 'collection' | 'explore' | 'artist' | 'sculpture' | 'builder' | 'investment' | 'contact' | 'impressum' | 'datenschutz' | 'cookies';

const LANG_OPTIONS: { code: Language; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'EN', nativeLabel: 'English' },
  { code: 'de', label: 'DE', nativeLabel: 'Deutsch' },
  { code: 'ar', label: 'AR', nativeLabel: 'العربية' },
  { code: 'ru', label: 'RU', nativeLabel: 'Русский' },
  { code: 'uk', label: 'UK', nativeLabel: 'Українська' },
  { code: 'zh', label: 'ZH', nativeLabel: '中文' },
  { code: 'es', label: 'ES', nativeLabel: 'Español' },
  { code: 'fr', label: 'FR', nativeLabel: 'Français' },
  { code: 'tr', label: 'TR', nativeLabel: 'Türkçe' },
];

const getRoute = (): Route => {
  const hash = window.location.hash.split('?')[0];
  if (hash === '#/why') return 'why';
  if (hash === '#/villas' || hash === '#/collection') return 'villas';
  if (hash === '#/explore') return 'explore';
  if (hash === '#/artist') return 'artist';
  if (hash === '#/sculpture') return 'sculpture';
  if (hash === '#/builder') return 'builder';
  if (hash === '#/investment') return 'investment';
  if (hash === '#/contact') return 'contact';
  if (hash === '#/impressum') return 'impressum';
  if (hash === '#/datenschutz') return 'datenschutz';
  if (hash === '#/cookies') return 'cookies';
  return 'home';
};

const isLegalPage = (route: Route) => route === 'impressum' || route === 'datenschutz' || route === 'cookies';
const isNotHome = (route: Route) => route !== 'home';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [route, setRoute] = useState<Route>(getRoute);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const newRoute = getRoute();
      const isRouteHash = window.location.hash.startsWith('#/') || window.location.hash === '';
      setRoute(newRoute);
      // Only reset scroll for route-style hashes (#/...). Section anchors (#why) let the
      // browser handle scrolling to the anchor.
      if (isRouteHash) window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // RTL support for Arabic
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const navLinks = getNavLinks(lang);
  const currentLang = LANG_OPTIONS.find(l => l.code === lang)!;

  const selectLang = (code: Language) => {
    setLang(code);
    setLangDropdownOpen(false);
  };

  const navigateHome = () => {
    window.location.hash = '';
    setRoute('home');
  };

  const navSolid = isScrolled || isNotHome(route);

  return (
    <div className="min-h-screen bg-cream-50 font-sans selection:bg-gold-500 selection:text-white">

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          navSolid ? 'bg-white/95 backdrop-blur-md shadow-sm py-4 text-navy-900' : 'bg-transparent py-6 text-white'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); navigateHome(); }}
            className="z-50 flex flex-col leading-none"
          >
            <span className="font-display text-xl sm:text-2xl font-bold tracking-[0.2em] uppercase text-gold-400">ZANKTUM</span>
            <span className={`text-[10px] tracking-[0.3em] uppercase ${navSolid ? 'text-navy-900/60' : 'text-cream-50/70'}`}>Villas</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className={`text-xs uppercase tracking-widest hover:text-gold-400 transition-colors ${navSolid ? 'text-navy-900' : 'text-cream-50'}`}
              >
                {link.label}
              </a>
            ))}

            {/* Language Dropdown – Desktop */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangDropdownOpen(prev => !prev)}
                className={`flex items-center gap-1.5 text-xs uppercase tracking-widest transition-colors hover:text-gold-400 ${navSolid ? 'text-navy-900 border-navy-900/20' : 'text-cream-50 border-white/20'} border px-3 py-1.5 rounded-full`}
              >
                <Globe size={13} />
                <span>{currentLang.label}</span>
                <ChevronDown size={12} className={`transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute top-full mt-2 right-0 w-40 rounded-lg border border-white/10 bg-navy-900 shadow-xl overflow-hidden z-50">
                  {LANG_OPTIONS.map(opt => (
                    <button
                      key={opt.code}
                      onClick={() => selectLang(opt.code)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-xs transition-colors hover:bg-gold-500/20 hover:text-gold-400 ${
                        lang === opt.code ? 'bg-gold-500/10 text-gold-400' : 'text-cream-50/80'
                      }`}
                    >
                      <span className="font-bold tracking-widest uppercase">{opt.label}</span>
                      <span className="font-light opacity-70">{opt.nativeLabel}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-3 z-50">
            {/* Language Dropdown – Mobile */}
            <div ref={langDropdownOpen ? undefined : undefined} className="relative">
              <button
                onClick={() => setLangDropdownOpen(prev => !prev)}
                className={`flex items-center gap-1 text-xs font-bold uppercase border px-2.5 py-1 rounded-full ${navSolid ? 'text-navy-900 border-navy-900/30' : 'text-white border-white/30'}`}
              >
                <Globe size={12} />
                <span>{currentLang.label}</span>
                <ChevronDown size={10} className={`transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute top-full mt-2 right-0 w-36 rounded-lg border border-white/10 bg-navy-900 shadow-xl overflow-hidden z-50">
                  {LANG_OPTIONS.map(opt => (
                    <button
                      key={opt.code}
                      onClick={() => selectLang(opt.code)}
                      className={`w-full flex items-center gap-2 px-3 py-2.5 text-xs transition-colors hover:bg-gold-500/20 hover:text-gold-400 ${
                        lang === opt.code ? 'bg-gold-500/10 text-gold-400' : 'text-cream-50/80'
                      }`}
                    >
                      <span className="font-bold tracking-widest uppercase">{opt.label}</span>
                      <span className="font-light opacity-70 truncate">{opt.nativeLabel}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen
                ? <X className={navSolid ? "text-navy-900" : "text-white"} />
                : <Menu className={navSolid ? "text-navy-900" : "text-white"} />
              }
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-navy-900 z-40 flex items-center justify-center">
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-3xl text-white hover:text-gold-400 italic"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Page Content */}
      {route === 'home' && (
        <main>
          <Hero lang={lang} />
          <CTASection lang={lang} />
        </main>
      )}

      {route === 'why' && (
        <div className="pt-24">
          <WhySanctum lang={lang} />
        </div>
      )}

      {route === 'villas' && (
        <div className="pt-24">
          <VillaShowcase lang={lang} />
        </div>
      )}

      {route === 'explore' && (
        <div className="pt-24">
          <VillaExplorer lang={lang} />
        </div>
      )}

      {route === 'artist' && (
        <div className="pt-24">
          <ArtistSection lang={lang} />
        </div>
      )}

      {route === 'sculpture' && (
        <div className="pt-24">
          <CleopatraSection lang={lang} />
        </div>
      )}

      {route === 'builder' && (
        <div className="pt-24">
          <BuilderSection lang={lang} />
        </div>
      )}

      {route === 'investment' && (
        <div className="pt-24">
          <InvestmentSection lang={lang} />
        </div>
      )}

      {route === 'contact' && (
        <div className="pt-24">
          <ContactForm lang={lang} />
        </div>
      )}

      {isLegalPage(route) && (
        <LegalPage
          page={route as 'impressum' | 'datenschutz' | 'cookies'}
          lang={lang}
          onBack={navigateHome}
        />
      )}

      <Footer lang={lang} />
      <CookieBanner lang={lang} />
    </div>
  );
};

export default App;
