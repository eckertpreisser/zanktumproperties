import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';
import { getTranslations } from '../constants';

interface HeroProps {
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const content = getTranslations(lang).hero;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={`${import.meta.env.BASE_URL}images/exterior/3.png`}
          alt="ZANKTUM VILLAS Alanya"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-900/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-90" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
        <motion.div
          key={lang}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <span className="mb-4 block font-display text-sm tracking-[0.3em] text-gold-400 uppercase">
            {content.subtitle}
          </span>
          <h1 className="mb-6 font-serif text-5xl md:text-7xl lg:text-8xl text-cream-50 leading-tight">
            {content.titleMain} <br /> <span className="italic text-gold-400">{content.titleSub}</span>
          </h1>
          <p className="mx-auto max-w-lg font-sans text-lg font-light text-cream-100/90 tracking-wide mb-12">
            {content.description}
          </p>

          <motion.a
            href="#/villas"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col items-center gap-4 cursor-pointer group"
          >
            <span className="px-8 py-3 border border-gold-400/60 rounded-full text-sm uppercase tracking-[0.25em] text-gold-400 font-display group-hover:bg-gold-400 group-hover:text-navy-900 transition-all duration-500 animate-pulse">
              {content.discover}
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="text-gold-400/70"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;