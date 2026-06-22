import React, { useState, useRef, useEffect } from 'react';
import { Villa, Language } from '../types';
import { getTranslations } from '../constants';
import { Move, Compass } from 'lucide-react';

interface VirtualTourProps {
  villas: Villa[];
  lang: Language;
}

const VirtualTour: React.FC<VirtualTourProps> = ({ villas, lang }) => {
  const [activeVilla, setActiveVilla] = useState<Villa>(villas[0]);
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const content = getTranslations(lang).tour;
  
  // Ensure we display the villa from the current language props, matching ID
  useEffect(() => {
    const currentLangVilla = villas.find(v => v.id === activeVilla.id) || villas[0];
    setActiveVilla(currentLangVilla);
  }, [villas, activeVilla.id]);

  const currentRoom = activeVilla.rooms[activeRoomIndex];

  // Reset view when room changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
    }
  }, [activeRoomIndex, activeVilla]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div id="tour" className="bg-navy-900 py-24 text-cream-50">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-2 font-display text-xs tracking-[0.2em] text-gold-500 uppercase">
            {content.subtitle}
          </span>
          <h2 className="font-serif text-4xl italic md:text-5xl text-white">
            {content.title}
          </h2>
          <p className="mt-4 max-w-xl text-cream-100/60 font-light">
            {content.description}
          </p>
        </div>

        {/* Villa Selector */}
        <div className="flex justify-center gap-6 mb-8">
          {villas.map((villa) => (
            <button
              key={villa.id}
              onClick={() => {
                setActiveVilla(villa);
                setActiveRoomIndex(0);
              }}
              className={`pb-2 text-sm uppercase tracking-widest transition-all ${
                activeVilla.id === villa.id
                  ? 'border-b border-gold-400 text-gold-400'
                  : 'text-cream-100/40 hover:text-cream-100'
              }`}
            >
              {villa.name}
            </button>
          ))}
        </div>

        {/* Tour Viewport */}
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-sm shadow-2xl border border-white/10 bg-black">
          
          {/* Controls Overlay */}
          <div className="absolute top-6 left-6 z-20 flex gap-2">
             <div className="flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 backdrop-blur-md border border-white/10">
                <Compass className="h-4 w-4 text-gold-400" />
                <span className="text-xs font-bold tracking-widest uppercase">{currentRoom.name}</span>
             </div>
          </div>

          <div className="absolute bottom-6 right-6 z-20 flex gap-2">
            <div className="hidden md:flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 backdrop-blur-md text-xs border border-white/10">
              <Move className="h-4 w-4 text-white/70" />
              <span className="text-white/70">{content.dragLabel}</span>
            </div>
          </div>

          {/* Panoramic Image Stage */}
          <div
            ref={containerRef}
            className={`h-[500px] w-full cursor-grab overflow-x-hidden ${isDragging ? 'cursor-grabbing' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {/* We force the image to be much wider than container to allow scrolling/panning simulation */}
            <img
              ref={imageRef}
              src={currentRoom.panoramaUrl}
              alt={currentRoom.name}
              className="h-full max-w-none w-[200%] object-cover select-none pointer-events-none"
              draggable={false}
            />
          </div>

          {/* Room Navigation Hotspots (Simulated UI) */}
          <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 to-transparent p-6">
            <div className="flex justify-center gap-4 overflow-x-auto pt-4">
              {activeVilla.rooms.map((room, idx) => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoomIndex(idx)}
                  className={`group relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-sm border transition-all ${
                    idx === activeRoomIndex ? 'border-gold-400 opacity-100' : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={room.panoramaUrl} alt={room.name} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-transparent transition-colors">
                     <span className="text-[10px] font-bold uppercase tracking-wider text-white drop-shadow-md">{idx + 1}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTour;