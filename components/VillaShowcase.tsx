import React from 'react';
import { getVillas, getTranslations } from '../constants';
import { Language } from '../types';
import { BedDouble, Bath, Square } from 'lucide-react';
import { motion } from 'framer-motion';

// Maps amenity index (0–5) → explorer deep-link query param
// Order: Private Pool, Smart Home, Panorama Terrace, Modern Kitchen, Dressing Room, Rooftop Lounge
const AMENITY_TARGETS = [
  'view=exterior',
  'room=basement-livingroom',
  'room=attic-livingroom',
  'room=attic-kitchen',
  'room=dressing-room',
  'room=attic-livingroom',
];

interface VillaShowcaseProps {
  lang: Language;
}

const VillaShowcase: React.FC<VillaShowcaseProps> = ({ lang }) => {
  const villas = getVillas(lang);
  const content = getTranslations(lang).showcase;

  return (
    <div id="collection" className="bg-cream-50 py-24 px-4 lg:px-12">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <span className="font-display text-sm tracking-widest text-navy-800 uppercase">{content.subtitle}</span>
          <h2 className="mt-2 font-serif text-4xl text-navy-900 md:text-5xl">{content.title}</h2>
          <div className="mt-6 mx-auto w-24 border-b border-gold-500"></div>
        </div>

        <div className="flex flex-col gap-16 md:gap-32">
          {villas.map((villa, idx) => (
            <motion.div
              key={villa.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col gap-12 lg:flex-row ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Two Images Side by Side */}
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="overflow-hidden group">
                  <img
                    src={villa.heroImages[0]}
                    alt={`${villa.name} 1`}
                    className="h-[200px] sm:h-[340px] lg:h-[500px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="overflow-hidden group">
                  <img
                    src={villa.heroImages[1]}
                    alt={`${villa.name} 2`}
                    className="h-[200px] sm:h-[340px] lg:h-[500px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Details Section */}
              <div className="flex-1 flex flex-col justify-center lg:max-w-md">
                <h3 className="font-display text-xs tracking-[0.2em] text-gold-600 uppercase mb-2">{villa.tagline}</h3>
                <h2 className="font-serif text-4xl text-navy-900 mb-6">{villa.name}</h2>
                <p className="font-sans text-stone-600 leading-relaxed mb-8 font-light text-lg">
                  {villa.description}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-3 gap-6 border-y border-stone-200 py-6 mb-8">
                  <div className="flex flex-col items-center text-center">
                    <BedDouble className="mb-2 text-navy-800" strokeWidth={1.5} />
                    <span className="text-sm font-bold text-navy-900">{villa.bedrooms} {content.bedrooms}</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Bath className="mb-2 text-navy-800" strokeWidth={1.5} />
                    <span className="text-sm font-bold text-navy-900">{villa.bathrooms} {content.bathrooms}</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Square className="mb-2 text-navy-800" strokeWidth={1.5} />
                    <span className="text-sm font-bold text-navy-900">{villa.sqMeters} m&sup2;</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {villa.amenities.map((am, amIdx) => (
                    <a
                      key={am}
                      href={`#/explore?villa=${idx}&${AMENITY_TARGETS[amIdx] ?? 'view=exterior'}`}
                      className="text-xs uppercase tracking-wider px-3 py-1 border border-stone-300 text-stone-500 rounded-full hover:border-gold-500 hover:text-gold-600 hover:bg-gold-50 transition-colors"
                    >
                      {am}
                    </a>
                  ))}
                </div>

                <a
                  href="#/explore"
                  className="self-start bg-navy-900 text-white px-8 py-4 font-display text-sm tracking-widest hover:bg-gold-500 transition-colors duration-300 uppercase"
                >
                  {content.details}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VillaShowcase;
