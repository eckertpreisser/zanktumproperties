import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';
import { getSanctumContent } from '../sanctumContent';

interface Props { lang: Language; }

const WhySanctum: React.FC<Props> = ({ lang }) => {
  const c = getSanctumContent(lang).why;
  return (
    <section id="why" className="bg-gradient-to-b from-cream-50 to-white py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="font-display text-xs tracking-[0.25em] text-bronze-500 uppercase">
            {c.subtitle}
          </span>
          <h2 className="mt-3 font-serif text-3xl md:text-5xl text-navy-900 leading-tight">
            {c.title}
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gold-500" />
          <p className="mx-auto mt-8 max-w-2xl text-navy-900/70 leading-relaxed font-light">
            {c.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {c.factors.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="group relative overflow-hidden rounded-sm bg-white p-7 md:p-8 shadow-sm border-l-4 border-bronze-500 hover:border-gold-400 transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gold-400/5 group-hover:bg-gold-400/10 transition-colors" />
              <div className="relative">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-serif text-xl text-navy-900 mb-3">{f.title}</h3>
                <p className="text-sm text-navy-900/70 leading-relaxed font-light">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySanctum;
