import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';
import { getSanctumContent } from '../sanctumContent';
import {
  Building2, TrendingUp, Euro, Palette, MapPin, ShieldCheck,
  ArrowUpRight, Mail, Phone, type LucideIcon,
} from 'lucide-react';

interface Props { lang: Language; }

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};

// Benefit icons, matched by index to content.benefits (replaces the emoji).
const BENEFIT_ICONS: LucideIcon[] = [Building2, TrendingUp, Euro, Palette, MapPin, ShieldCheck];

// Split a "Label: value" point into its two parts for a clean value table.
const splitPoint = (s: string): [string, string] => {
  const i = s.indexOf(':');
  return i === -1 ? [s, ''] : [s.slice(0, i).trim(), s.slice(i + 1).trim()];
};

// Centered section header, matching the rest of the site (eyebrow + serif title + gold rule).
const SectionHeader: React.FC<{ eyebrow: string; title: string; intro?: string; light?: boolean }> = ({ eyebrow, title, intro, light }) => (
  <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="mb-14 text-center">
    <span className={`font-display text-sm uppercase tracking-widest ${light ? 'text-gold-400' : 'text-navy-800'}`}>{eyebrow}</span>
    <h2 className={`mt-2 font-serif text-4xl md:text-5xl leading-tight ${light ? 'text-cream-50' : 'text-navy-900'}`}>{title}</h2>
    <div className="mx-auto mt-6 w-24 border-b border-gold-500" />
    {intro && <p className={`mx-auto mt-8 max-w-2xl font-light leading-relaxed text-lg ${light ? 'text-cream-100/75' : 'text-navy-900/65'}`}>{intro}</p>}
  </motion.div>
);

const InvestmentSection: React.FC<Props> = ({ lang }) => {
  const c = getSanctumContent(lang).investment;

  return (
    <div className="bg-cream-50">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 to-navy-800 px-4 py-28 md:py-36">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-bronze-500/10 blur-3xl" />

        <motion.div {...fadeUp} transition={{ duration: 0.8 }} className="relative mx-auto max-w-4xl text-center">
          <span className="font-display text-sm uppercase tracking-[0.3em] text-gold-400">{c.eyebrow}</span>
          <h1 className="mx-auto mt-6 max-w-3xl font-serif text-4xl md:text-6xl leading-[1.1] text-cream-50">{c.title}</h1>
          <p className="mx-auto mt-6 max-w-xl text-cream-100/70 font-light leading-relaxed text-lg">{c.tagline}</p>

          {/* claims — subtle soft chips */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {c.claims.map(claim => (
              <span key={claim} className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-medium uppercase tracking-widest text-cream-100/80 backdrop-blur-sm">
                {claim}
              </span>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="#/contact" className="group inline-flex items-center gap-2 rounded-full bg-gold-400 px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] text-navy-900 shadow-lg transition-all hover:bg-gold-300 hover:-translate-y-0.5">
              {c.heroSecondary}
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#villen-produkte" className="rounded-full border border-cream-50/40 px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] text-cream-50 transition-all hover:bg-cream-50 hover:text-navy-900">
              {c.heroPrimary}
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="mx-auto max-w-6xl px-4 py-24 md:py-28">
        <SectionHeader eyebrow={c.eyebrow} title={c.whyTitle} intro={c.whyIntro} />

        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {c.benefits.map((b, idx) => {
            const Icon = BENEFIT_ICONS[idx % BENEFIT_ICONS.length];
            return (
              <motion.div
                key={b.title} {...fadeUp} transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="group rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1.5"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold-400/10 transition-colors group-hover:bg-gold-400/20">
                  <Icon size={24} strokeWidth={1.5} className="text-gold-600" />
                </span>
                <h3 className="mt-6 font-serif text-xl text-navy-900">{b.title}</h3>
                <p className="mt-3 text-sm text-navy-900/60 font-light leading-relaxed">{b.text}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="villen-produkte" className="bg-gradient-to-b from-cream-50 to-white px-4 py-24 md:py-28 scroll-mt-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader eyebrow={c.eyebrow} title={c.productsTitle} intro={c.productsIntro} />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {c.products.map((p, idx) => {
              const isBeta = idx === 1;
              return (
                <motion.div
                  key={p.name} {...fadeUp} transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 transition-all hover:shadow-2xl hover:-translate-y-1.5 ${
                    isBeta ? 'ring-gold-400/60' : 'ring-navy-900/10'
                  }`}
                >
                  {/* header */}
                  <div className={`px-8 py-8 ${isBeta ? 'bg-gradient-to-br from-gold-400 to-gold-500 text-navy-900' : 'bg-gradient-to-br from-navy-900 to-navy-800 text-cream-50'}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-display text-2xl tracking-[0.15em]">{p.name}</div>
                        <div className={`mt-1.5 text-sm ${isBeta ? 'text-navy-900/65' : 'text-cream-100/75'}`}>{p.subtitle}</div>
                      </div>
                      {isBeta && (
                        <span className="shrink-0 rounded-full border border-navy-900/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest">
                          Art Edition
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-8">
                    {/* price */}
                    <div className={`rounded-2xl px-6 py-5 text-center ${isBeta ? 'bg-gold-400/10' : 'bg-cream-100'}`}>
                      <div className="text-[11px] uppercase tracking-[0.2em] text-navy-900/45">{c.priceLabel}</div>
                      <div className="mt-1.5 font-serif text-4xl font-medium tabular-nums text-navy-900">{p.price}</div>
                      <div className="mt-1 text-sm text-navy-900/45">{p.pricePerM2}</div>
                    </div>

                    {/* key figures */}
                    <div className="mt-7 text-[11px] uppercase tracking-[0.2em] text-navy-900/45">{c.pointsTitle}</div>
                    <dl className="mt-3 divide-y divide-navy-900/8">
                      {p.points.map(pt => {
                        const [label, value] = splitPoint(pt);
                        return (
                          <div key={pt} className="flex items-center justify-between gap-4 py-2.5">
                            <dt className="text-sm text-navy-900/55 font-light">{label}</dt>
                            <dd className="text-right text-sm font-semibold tabular-nums text-navy-900">{value}</dd>
                          </div>
                        );
                      })}
                    </dl>

                    {/* features */}
                    <div className="mt-7 text-[11px] uppercase tracking-[0.2em] text-navy-900/45">{p.featuresTitle}</div>
                    <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                      {p.features.map(f => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-navy-900/65 font-light">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />{f}
                        </li>
                      ))}
                    </ul>

                    <a href="#/contact"
                      className={`group mt-8 flex items-center justify-center gap-2 rounded-full px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] shadow-sm transition-all hover:-translate-y-0.5 ${
                        isBeta ? 'bg-gold-400 text-navy-900 hover:bg-gold-300' : 'bg-navy-900 text-cream-50 hover:bg-navy-800'
                      }`}>
                      {p.cta}
                      <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MARKET ── */}
      <section className="mx-auto max-w-6xl px-4 py-24 md:py-28">
        <SectionHeader eyebrow={c.eyebrow} title={c.marketTitle} intro={c.marketIntro} />

        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-navy-900 text-cream-50">
                  <th className="px-6 py-4 text-left font-display text-xs uppercase tracking-widest">{c.marketHead.city}</th>
                  <th className="px-6 py-4 text-right font-display text-xs uppercase tracking-widest">{c.marketHead.y2020}</th>
                  <th className="px-6 py-4 text-right font-display text-xs uppercase tracking-widest">{c.marketHead.y2026}</th>
                  <th className="px-6 py-4 text-right font-display text-xs uppercase tracking-widest">{c.marketHead.cagr}</th>
                  <th className="px-6 py-4 text-left font-display text-xs uppercase tracking-widest">{c.marketHead.status}</th>
                </tr>
              </thead>
              <tbody>
                {c.marketRows.map((row, i) => {
                  const status = row.status.replace(/^\p{Extended_Pictographic}+\s*/u, '');
                  return (
                    <tr key={row.city} className={`border-b border-navy-900/8 last:border-0 ${row.hot ? 'bg-gold-400/[0.08]' : i % 2 ? 'bg-cream-100/50' : 'bg-white'}`}>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-2 font-medium ${row.hot ? 'text-gold-700' : 'text-navy-900'}`}>
                          {row.hot && <ArrowUpRight size={15} className="text-gold-600" />}
                          {row.city}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right tabular-nums text-navy-900/55">{row.y2020}</td>
                      <td className="px-6 py-4 text-right tabular-nums text-navy-900/55">{row.y2026}</td>
                      <td className={`px-6 py-4 text-right tabular-nums font-semibold ${row.hot ? 'text-gold-700' : 'text-navy-900'}`}>{row.cagr}</td>
                      <td className="px-6 py-4 text-navy-900/55">{status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* thesis — soft card with gold accent, like WhySanctum */}
        <motion.div {...fadeUp} transition={{ duration: 0.6 }}
          className="mt-10 rounded-2xl border-l-4 border-gold-500 bg-white p-8 md:p-10 shadow-sm">
          <h3 className="font-serif text-2xl text-navy-900">{c.thesisTitle}</h3>
          <p className="mt-4 max-w-3xl text-navy-900/70 font-light leading-relaxed text-lg">{c.thesisText}</p>
        </motion.div>
      </section>

      {/* ── CONTACT ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 to-navy-800 px-4 py-24 md:py-28">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-bronze-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-5xl">
          <SectionHeader eyebrow={c.eyebrow} title={c.contactTitle} intro={c.contactIntro} light />

          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <a href={`mailto:${c.contactEmail}`} className="group rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-all hover:bg-white/10 hover:-translate-y-1">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold-400/15">
                <Mail size={22} strokeWidth={1.5} className="text-gold-400" />
              </span>
              <div className="mt-5 text-[11px] uppercase tracking-[0.25em] text-cream-100/50">{c.contactEmailLabel}</div>
              <div className="mt-2 text-cream-50 group-hover:text-gold-400 transition-colors break-words">{c.contactEmail}</div>
            </a>
            <a href={`tel:${c.contactPhone.replace(/[^+\d]/g, '')}`} className="group rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-all hover:bg-white/10 hover:-translate-y-1">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold-400/15">
                <Phone size={22} strokeWidth={1.5} className="text-gold-400" />
              </span>
              <div className="mt-5 text-[11px] uppercase tracking-[0.25em] text-cream-100/50">{c.contactPhoneLabel}</div>
              <div className="mt-2 text-cream-50 group-hover:text-gold-400 transition-colors">{c.contactPhone}</div>
            </a>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold-400/15">
                <MapPin size={22} strokeWidth={1.5} className="text-gold-400" />
              </span>
              <div className="mt-5 text-[11px] uppercase tracking-[0.25em] text-cream-100/50">{c.contactAddressLabel}</div>
              <div className="mt-2 text-cream-50">{c.contactAddress}</div>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mt-12 text-center">
            <a href="#/contact" className="group inline-flex items-center gap-2 rounded-full bg-gold-400 px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] text-navy-900 shadow-lg transition-all hover:bg-gold-300 hover:-translate-y-0.5">
              {c.heroSecondary}
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>
      </section>

      <footer className="bg-navy-900 px-4 pb-10 text-center">
        <div className="mx-auto h-px max-w-5xl bg-white/10" />
        <p className="pt-8 text-xs tracking-wide text-cream-50/40">{c.footerLine}</p>
      </footer>
    </div>
  );
};

export default InvestmentSection;
