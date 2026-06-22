import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';
import { getSanctumContent } from '../sanctumContent';
import { Palette } from 'lucide-react';

interface Props { lang: Language; }

const ArtistSection: React.FC<Props> = ({ lang }) => {
  const c = getSanctumContent(lang).artist;
  return (
    <section id="artist" className="bg-gradient-to-b from-white to-cream-50 py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="font-display text-xs tracking-[0.25em] text-bronze-500 uppercase">
            {c.subtitle}
          </span>
          <h2 className="mt-3 font-serif text-3xl md:text-5xl text-navy-900 italic leading-tight">
            {c.title}
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gold-500" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Visual / Artist Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="relative h-[400px] md:h-[480px] rounded-sm overflow-hidden shadow-2xl bg-gradient-to-br from-bronze-500 to-bronze-600"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_60%)]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-cream-50 px-8 text-center">
              <Palette size={64} className="mb-6 opacity-90" strokeWidth={1} />
              <div className="font-display text-xs tracking-[0.3em] text-cream-50/80 uppercase mb-3">{c.subtitle}</div>
              <div className="font-serif text-2xl md:text-3xl italic leading-tight">{c.name}</div>
              <div className="mt-6 h-px w-16 bg-gold-400" />
              <div className="mt-4 text-sm font-light text-cream-50/85 max-w-xs leading-relaxed">{c.headline}</div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h3 className="font-serif text-2xl md:text-3xl text-navy-800 mb-5">{c.headline}</h3>
            {c.intro.map((p, i) => (
              <p key={i} className="text-navy-900/75 leading-relaxed font-light mb-4">{p}</p>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {c.techniques.map(t => (
                <div key={t.title} className="bg-white p-5 rounded-sm border-l-4 border-bronze-500 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <h4 className="font-serif text-lg text-navy-800 mb-2">{t.title}</h4>
                  <p className="text-xs text-navy-900/70 leading-relaxed font-light">{t.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-cream-100 to-cream-50 border-l-4 border-gold-400 rounded-sm">
              <p className="text-sm text-navy-900/85 italic leading-relaxed">{c.highlight}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ArtistSection;
