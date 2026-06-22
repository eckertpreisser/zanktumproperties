import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';
import { getSanctumContent } from '../sanctumContent';
import { Crown } from 'lucide-react';
import sculptureImg from '../assets/cleopatra-sculpture.png';

interface Props { lang: Language; }

const CleopatraSection: React.FC<Props> = ({ lang }) => {
  const c = getSanctumContent(lang).cleopatra;
  const img = sculptureImg;

  return (
    <section id="sculpture" className="bg-gradient-to-b from-navy-900 to-navy-800 text-cream-50">
      {/* Hero */}
      <div className="container mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
          >
            <span className="font-display text-xs tracking-[0.3em] text-gold-400 uppercase">{c.subtitle}</span>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl italic leading-tight">{c.title}</h2>
            <div className="mt-6 h-px w-24 bg-gold-500" />
            <p className="mt-6 text-lg font-light text-cream-50/85 leading-relaxed">{c.tagline}</p>
            <p className="mt-5 text-cream-50/70 leading-relaxed font-light">{c.intro}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative h-[420px] md:h-[540px] rounded-sm overflow-hidden shadow-2xl bg-gradient-to-br from-navy-800 to-gold-500/40"
          >
            <img
              src={img}
              alt={c.title}
              className="absolute inset-0 h-full w-full object-contain"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,55,0.18),transparent_65%)] pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* Light content block */}
      <div className="bg-cream-50 text-navy-900">
        <div className="container mx-auto max-w-6xl px-4 py-20 md:py-24">

          {/* Specs */}
          <h3 className="font-serif text-2xl md:text-3xl text-navy-900 mb-8 text-center">{c.specsTitle}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20">
            {c.specs.map(s => (
              <div key={s.label} className="bg-white p-5 rounded-sm border-t-2 border-gold-400 shadow-sm text-center">
                <div className="font-display text-[11px] tracking-[0.2em] text-bronze-500 uppercase">{s.label}</div>
                <div className="font-serif text-2xl text-navy-900 my-1">{s.value}</div>
                <div className="text-xs text-navy-900/60 font-light leading-snug">{s.note}</div>
              </div>
            ))}
          </div>

          {/* Features */}
          <h3 className="font-serif text-2xl md:text-3xl text-navy-900 mb-8 text-center">{c.featuresTitle}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
            {c.features.map(f => (
              <div key={f.title} className="bg-white p-6 rounded-sm border-l-4 border-gold-400 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h4 className="font-serif text-lg text-navy-800 mb-2">{f.title}</h4>
                <p className="text-sm text-navy-900/70 leading-relaxed font-light">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Visibility table */}
          <h3 className="font-serif text-2xl md:text-3xl text-navy-900 mb-4 text-center">{c.visibilityTitle}</h3>
          <p className="text-center text-navy-900/70 font-light max-w-2xl mx-auto mb-8">{c.visibilityIntro}</p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-navy-900/15 text-xs uppercase tracking-wider text-bronze-500 font-display">
                  <th className="py-3 pr-4">{c.visibilityHead.point}</th>
                  <th className="py-3 pr-4">{c.visibilityHead.distance}</th>
                  <th className="py-3">{c.visibilityHead.visibility}</th>
                </tr>
              </thead>
              <tbody>
                {c.visibilityRows.map(r => (
                  <tr key={r.point} className="border-b border-navy-900/10">
                    <td className="py-3 pr-4 font-serif text-navy-900">{r.point}</td>
                    <td className="py-3 pr-4 text-navy-900/70 font-light">{r.distance}</td>
                    <td className="py-3 text-gold-600 font-medium">✓ {r.visibility}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-navy-900/70 italic font-light max-w-3xl mx-auto text-center mb-4">{c.harmony}</p>
        </div>
      </div>

      {/* Vision + quote */}
      <div className="container mx-auto max-w-3xl px-4 py-20 md:py-24 text-center">
        <Crown size={40} className="mx-auto mb-6 text-gold-400" strokeWidth={1} />
        <h3 className="font-serif text-2xl md:text-3xl italic mb-6">{c.visionTitle}</h3>
        {c.visionText.map((p, i) => (
          <p key={i} className="text-cream-50/80 leading-relaxed font-light mb-4">{p}</p>
        ))}
        <blockquote className="mt-8 font-serif text-2xl md:text-3xl italic text-gold-400 leading-snug">
          “{c.quote}”
        </blockquote>
      </div>
    </section>
  );
};

export default CleopatraSection;
