import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';
import { getSanctumContent } from '../sanctumContent';

interface Props { lang: Language; }

const CTASection: React.FC<Props> = ({ lang }) => {
  const c = getSanctumContent(lang).cta;
  return (
    <section className="relative bg-gradient-to-br from-navy-900 to-navy-800 py-20 md:py-24 px-4 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gold-400/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-bronze-500/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7 }}
        className="relative max-w-3xl mx-auto text-center"
      >
        <h2 className="font-serif text-3xl md:text-5xl text-cream-50 mb-8 leading-tight">
          {c.title}
        </h2>

        <div className="space-y-3 mb-6">
          {c.lines.map(line => (
            <p key={line} className="text-cream-100/85 font-light leading-relaxed">
              <span className="text-gold-400 font-medium">{line}</span>
            </p>
          ))}
        </div>

        <p className="text-cream-50 font-medium text-lg md:text-xl mt-8 mb-10">
          {c.finalLine}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#/contact"
            className="px-8 py-4 bg-bronze-500 text-white text-xs uppercase tracking-widest font-bold rounded-sm hover:bg-bronze-600 hover:-translate-y-0.5 transition-all shadow-lg"
          >
            {c.btnPrimary}
          </a>
          <a
            href="#/villas"
            className="px-8 py-4 border-2 border-cream-50 text-cream-50 text-xs uppercase tracking-widest font-bold rounded-sm hover:bg-cream-50 hover:text-navy-900 transition-all"
          >
            {c.btnSecondary}
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
