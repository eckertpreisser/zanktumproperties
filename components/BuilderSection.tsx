import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';
import { getSanctumContent } from '../sanctumContent';
import { Hammer, Check, MapPin } from 'lucide-react';

interface Props { lang: Language; }

const BuilderSection: React.FC<Props> = ({ lang }) => {
  const c = getSanctumContent(lang).builder;
  return (
    <section id="builder" className="bg-white py-20 md:py-28 px-4">
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
          {/* Content (left on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:order-1"
          >
            <h3 className="font-serif text-2xl md:text-3xl text-navy-800 mb-5">{c.headline}</h3>

            <div className="bg-gradient-to-br from-cream-50 to-cream-100 p-6 rounded-sm border-l-4 border-bronze-500 mb-6 shadow-sm">
              <div className="font-display text-sm uppercase tracking-widest text-navy-900 mb-4">{c.name}</div>
              <ul className="space-y-2">
                {c.credentials.map(cr => (
                  <li key={cr} className="flex items-start gap-2 text-sm text-navy-900/75 font-light">
                    <Check size={16} className="text-bronze-500 mt-0.5 flex-shrink-0" />
                    <span>{cr}</span>
                  </li>
                ))}
              </ul>
            </div>

            {c.intro.map((p, i) => (
              <p key={i} className="text-navy-900/75 leading-relaxed font-light mb-4">{p}</p>
            ))}

            <ul className="space-y-2 mt-6">
              {c.expertise.map(e => (
                <li key={e} className="flex items-start gap-2 text-sm text-navy-900/75 font-light">
                  <Check size={16} className="text-bronze-500 mt-0.5 flex-shrink-0" />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Visual + Reference (right on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:order-2 flex flex-col gap-6"
          >
            <div className="relative h-[300px] rounded-sm overflow-hidden shadow-2xl bg-gradient-to-br from-navy-800 to-bronze-600">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.15),transparent_60%)]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-cream-50 px-8 text-center">
                <Hammer size={56} className="mb-5 opacity-90" strokeWidth={1} />
                <div className="font-display text-xs tracking-[0.3em] text-cream-50/80 uppercase mb-3">{c.subtitle}</div>
                <div className="font-serif text-xl md:text-2xl italic">{c.name}</div>
                <div className="mt-4 text-xs tracking-widest uppercase text-gold-400">since 1990</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-sm border border-cream-100 hover:border-bronze-500 transition-colors shadow-sm">
              <div className="text-bronze-500 font-display text-xs tracking-[0.2em] uppercase mb-2">{c.refTitle}</div>
              <div className="flex items-center gap-2 text-xs text-navy-900/60 uppercase tracking-widest mb-3">
                <MapPin size={12} />
                <span>{c.refLocation}</span>
              </div>
              <p className="text-sm text-navy-900/75 leading-relaxed font-light mb-5">{c.refDesc}</p>
              <a
                href="#/contact"
                className="inline-block px-5 py-2.5 bg-bronze-500 text-white text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-bronze-600 transition-colors"
              >
                {c.refCta}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BuilderSection;
