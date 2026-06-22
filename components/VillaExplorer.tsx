import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, Villa, Floor, RoomDetail } from '../types';
import { getVillas, getTranslations } from '../constants';
import FloorPlanOverlay from './FloorPlanOverlay';

// Natürliche Pixelmasse der Grundriss-Bilder (für aspektgenaue Darstellung + Overlay)
const FLOORPLAN_DIMS: Record<string, [number, number]> = {
  basement: [2000, 2447], 'ground-floor': [2000, 2457], 'first-floor': [2000, 2453], attic: [2000, 2387],
};
import { ArrowLeft, ChevronLeft, ChevronRight, Layers, Eye, Home, Sparkles, Map } from 'lucide-react';

// ========== REUSABLE IMAGE GALLERY WITH ARROWS + KEYBOARD ==========
const ImageGallery: React.FC<{
  images: string[];
  activeIndex: number;
  onChangeIndex: (idx: number) => void;
  alt: string;
  overlay?: React.ReactNode;
}> = ({ images, activeIndex, onChangeIndex, alt, overlay }) => {
  const total = images.length;

  const goPrev = useCallback(() => {
    onChangeIndex((activeIndex - 1 + total) % total);
  }, [activeIndex, total, onChangeIndex]);

  const goNext = useCallback(() => {
    onChangeIndex((activeIndex + 1) % total);
  }, [activeIndex, total, onChangeIndex]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goPrev, goNext]);

  return (
    <div className="relative h-[280px] sm:h-[420px] md:h-[550px] group/gallery">
      <AnimatePresence mode="wait">
        <motion.img
          key={activeIndex}
          src={images[activeIndex]}
          alt={`${alt} ${activeIndex + 1}`}
          className="h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>

      {/* Overlay content (back button, room name, etc.) */}
      {overlay}

      {/* Left Arrow */}
      {total > 1 && (
        <button
          onClick={goPrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white opacity-100 md:opacity-0 md:group-hover/gallery:opacity-100 transition-opacity hover:bg-black/70 hover:border-gold-400"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Right Arrow */}
      {total > 1 && (
        <button
          onClick={goNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white opacity-100 md:opacity-0 md:group-hover/gallery:opacity-100 transition-opacity hover:bg-black/70 hover:border-gold-400"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Image Counter */}
      {total > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 rounded-full bg-black/50 px-4 py-1.5 backdrop-blur-md border border-white/10">
          <span className="text-xs font-bold tracking-widest text-white">
            {activeIndex + 1} / {total}
          </span>
        </div>
      )}
    </div>
  );
};

// ========== THUMBNAIL STRIP ==========
const ThumbnailStrip: React.FC<{
  images: string[];
  activeIndex: number;
  onSelect: (idx: number) => void;
}> = ({ images, activeIndex, onSelect }) => (
  <div className="bg-black/80 p-2 sm:p-4">
    <div className="flex justify-center gap-1.5 sm:gap-3 overflow-x-auto">
      {images.map((img, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          className={`h-12 w-16 sm:h-16 sm:w-24 flex-shrink-0 overflow-hidden rounded-sm border-2 transition-all ${
            idx === activeIndex
              ? 'border-gold-400 opacity-100'
              : 'border-transparent opacity-50 hover:opacity-80'
          }`}
        >
          <img src={img} alt="" className="h-full w-full object-cover" />
        </button>
      ))}
    </div>
  </div>
);

// ========== MAIN COMPONENT ==========
interface VillaExplorerProps {
  lang: Language;
}

type ViewMode = 'exterior' | 'interior';
type InteriorState = 'cutaway' | 'floor' | 'room';

// Parse deep-link params from hash (e.g. #/explore?villa=1&room=attic-kitchen)
const getDeepLink = () => {
  const hash = window.location.hash;
  const qIndex = hash.indexOf('?');
  if (qIndex === -1) return null;
  return new URLSearchParams(hash.slice(qIndex + 1));
};

const VillaExplorer: React.FC<VillaExplorerProps> = ({ lang }) => {
  const villas = getVillas(lang);
  const content = getTranslations(lang).explorer;

  const [activeVillaIndex, setActiveVillaIndex] = useState<number>(() => {
    const p = getDeepLink();
    return p?.get('villa') ? Number(p.get('villa')) : 0;
  });

  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const p = getDeepLink();
    if (p?.get('room')) return 'interior';
    return 'exterior';
  });

  const [interiorState, setInteriorState] = useState<InteriorState>(() => {
    const p = getDeepLink();
    return p?.get('room') ? 'room' : 'cutaway';
  });

  const [selectedFloor, setSelectedFloor] = useState<Floor | null>(() => {
    const p = getDeepLink();
    const roomParam = p?.get('room');
    if (!roomParam) return null;
    const villaIndex = p?.get('villa') ? Number(p.get('villa')) : 0;
    const villa = getVillas(lang)[villaIndex];
    for (const floor of villa.floors) {
      if (floor.rooms.find(r => r.id === roomParam)) return floor;
    }
    return null;
  });

  const [selectedRoom, setSelectedRoom] = useState<RoomDetail | null>(() => {
    const p = getDeepLink();
    const roomParam = p?.get('room');
    if (!roomParam) return null;
    const villaIndex = p?.get('villa') ? Number(p.get('villa')) : 0;
    const villa = getVillas(lang)[villaIndex];
    for (const floor of villa.floors) {
      const room = floor.rooms.find(r => r.id === roomParam);
      if (room) return room;
    }
    return null;
  });

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeVilla = villas[activeVillaIndex];

  const handleVillaSwitch = (idx: number) => {
    setActiveVillaIndex(idx);
    setInteriorState('cutaway');
    setSelectedFloor(null);
    setSelectedRoom(null);
    setActiveImageIndex(0);
  };

  const handleViewModeSwitch = (mode: ViewMode) => {
    setViewMode(mode);
    setInteriorState('cutaway');
    setSelectedFloor(null);
    setSelectedRoom(null);
    setActiveImageIndex(0);
  };

  const handleFloorClick = (floor: Floor) => {
    setSelectedFloor(floor);
    setInteriorState('floor');
    setSelectedRoom(null);
  };

  const handleRoomClick = (room: RoomDetail) => {
    setSelectedRoom(room);
    setInteriorState('room');
    setActiveImageIndex(0);
  };

  const handleBackToOverview = () => {
    setInteriorState('cutaway');
    setSelectedFloor(null);
    setSelectedRoom(null);
  };

  const handleBackToFloor = () => {
    setInteriorState('floor');
    setSelectedRoom(null);
  };

  const floorLabelMap: Record<string, string> = {
    'basement': content.basement,
    'ground-floor': content.groundFloor,
    'first-floor': content.firstFloor,
    'attic': content.attic,
  };

  return (
    <div id="explore" className="bg-navy-900 py-16 md:py-24 text-cream-50">
      <div className="container mx-auto px-4 lg:px-12">
        {/* Section Header */}
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
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
          {villas.map((villa, idx) => (
            <button
              key={villa.id}
              onClick={() => handleVillaSwitch(idx)}
              className={`pb-2 text-sm uppercase tracking-widest transition-all ${
                activeVillaIndex === idx
                  ? 'border-b border-gold-400 text-gold-400'
                  : 'text-cream-100/40 hover:text-cream-100'
              }`}
            >
              {villa.name}
            </button>
          ))}
        </div>

        {/* Exterior / Interior Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full border border-white/20 overflow-hidden">
            <button
              onClick={() => handleViewModeSwitch('exterior')}
              className={`px-5 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm uppercase tracking-widest transition-all flex items-center gap-2 ${
                viewMode === 'exterior'
                  ? 'bg-gold-500 text-white'
                  : 'text-cream-100/60 hover:text-white'
              }`}
            >
              <Eye size={16} />
              {content.exterior}
            </button>
            <button
              onClick={() => handleViewModeSwitch('interior')}
              className={`px-5 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm uppercase tracking-widest transition-all flex items-center gap-2 ${
                viewMode === 'interior'
                  ? 'bg-gold-500 text-white'
                  : 'text-cream-100/60 hover:text-white'
              }`}
            >
              <Home size={16} />
              {content.interior}
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-sm border border-white/10 bg-black shadow-2xl">
          <AnimatePresence mode="wait">
            {viewMode === 'exterior' ? (
              <ExteriorView key="exterior" villa={activeVilla} />
            ) : (
              <InteriorView
                key={`interior-${activeVilla.id}`}
                villa={activeVilla}
                interiorState={interiorState}
                selectedFloor={selectedFloor}
                selectedRoom={selectedRoom}
                activeImageIndex={activeImageIndex}
                setActiveImageIndex={setActiveImageIndex}
                floorLabelMap={floorLabelMap}
                content={content}
                lang={lang}
                onFloorClick={handleFloorClick}
                onRoomClick={handleRoomClick}
                onBackToOverview={handleBackToOverview}
                onBackToFloor={handleBackToFloor}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ========== EXTERIOR VIEW ==========
const ExteriorView: React.FC<{ villa: Villa }> = ({ villa }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <ImageGallery
        images={villa.exteriorImages}
        activeIndex={activeIdx}
        onChangeIndex={setActiveIdx}
        alt={`${villa.name} exterior`}
      />
      <ThumbnailStrip
        images={villa.exteriorImages}
        activeIndex={activeIdx}
        onSelect={setActiveIdx}
      />
    </motion.div>
  );
};

// ========== INTERIOR VIEW ==========
interface InteriorViewProps {
  villa: Villa;
  interiorState: InteriorState;
  selectedFloor: Floor | null;
  selectedRoom: RoomDetail | null;
  activeImageIndex: number;
  setActiveImageIndex: (idx: number) => void;
  floorLabelMap: Record<string, string>;
  content: any;
  lang: Language;
  onFloorClick: (floor: Floor) => void;
  onRoomClick: (room: RoomDetail) => void;
  onBackToOverview: () => void;
  onBackToFloor: () => void;
}

const InteriorView: React.FC<InteriorViewProps> = ({
  villa,
  interiorState,
  selectedFloor,
  selectedRoom,
  activeImageIndex,
  setActiveImageIndex,
  floorLabelMap,
  content,
  lang,
  onFloorClick,
  onRoomClick,
  onBackToOverview,
  onBackToFloor,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <AnimatePresence mode="wait">
        {interiorState === 'cutaway' && (
          <CutawayView
            key="cutaway"
            villa={villa}
            floorLabelMap={floorLabelMap}
            content={content}
            onFloorClick={onFloorClick}
          />
        )}
        {interiorState === 'floor' && selectedFloor && (
          <FloorView
            key={`floor-${selectedFloor.id}`}
            floor={selectedFloor}
            content={content}
            lang={lang}
            onRoomClick={onRoomClick}
            onBack={onBackToOverview}
          />
        )}
        {interiorState === 'room' && selectedRoom && (
          <RoomView
            key={`room-${selectedRoom.id}`}
            room={selectedRoom}
            activeImageIndex={activeImageIndex}
            setActiveImageIndex={setActiveImageIndex}
            content={content}
            onBack={onBackToFloor}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ========== CUTAWAY VIEW (Cross-section with clickable floors) ==========
const CutawayView: React.FC<{
  villa: Villa;
  floorLabelMap: Record<string, string>;
  content: any;
  onFloorClick: (floor: Floor) => void;
}> = ({ villa, floorLabelMap, content, onFloorClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="relative h-[280px] sm:h-[420px] md:h-[550px]">
        <img
          src={villa.interiorCutawayImage}
          alt={`${villa.name} cutaway`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

        <div className="absolute inset-0 flex flex-col">
          {[...villa.floors].reverse().map((floor) => (
            <button
              key={floor.id}
              onClick={() => onFloorClick(floor)}
              className="flex-1 group relative border-b border-white/10 last:border-b-0 transition-all hover:bg-white/10"
            >
              <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2 rounded-full bg-black/60 px-3 sm:px-5 py-1.5 sm:py-2.5 backdrop-blur-md border border-white/20 group-hover:border-gold-400 group-hover:bg-gold-500/20 transition-all">
                  <Layers size={14} className="text-gold-400" />
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white">
                    {floorLabelMap[floor.id] || floor.name}
                  </span>
                </div>
              </div>
              <div className="hidden sm:block absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs uppercase tracking-widest text-gold-400">
                  {content.selectFloor} &rarr;
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ========== FLOOR VIEW (Bird's eye with clickable rooms) ==========
type FloorViewMode = '3d' | 'plan';

const FloorView: React.FC<{
  floor: Floor;
  content: any;
  lang: Language;
  onRoomClick: (room: RoomDetail) => void;
  onBack: () => void;
}> = ({ floor, content, lang, onRoomClick, onBack }) => {
  const [viewMode, setViewMode] = useState<FloorViewMode>('3d');
  const hasPlan = !!floor.floorPlanImage;
  const [pw, ph] = FLOORPLAN_DIMS[floor.id] ?? [2000, 2457];
  // If switching floors, fall back to 3D
  useEffect(() => { setViewMode('3d'); }, [floor.id]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="relative"
    >
      <div
        className={`relative h-[280px] sm:h-[420px] md:h-[550px] ${
          viewMode === 'plan' ? 'bg-cream-50' : ''
        }`}
      >
        <AnimatePresence mode="wait">
          {viewMode === '3d' ? (
            <motion.img
              key="3d"
              src={floor.birdEyeImage}
              alt={`${floor.name} bird's eye view`}
              className="h-full w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.div
              key="plan"
              className="absolute inset-0 flex items-center justify-center p-3 sm:p-6"
              style={{ containerType: 'size' } as React.CSSProperties}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="relative"
                style={{
                  aspectRatio: `${pw} / ${ph}`,
                  height: `min(100cqh, ${((100 * ph) / pw).toFixed(2)}cqw)`,
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
              >
                <img
                  src={floor.floorPlanImage}
                  alt={`${floor.name} floor plan`}
                  className="block w-full h-full"
                />
                <FloorPlanOverlay floorId={floor.id} lang={lang} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {viewMode === '3d' && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />
        )}

        <button
          onClick={onBack}
          className="absolute top-6 left-6 z-20 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 backdrop-blur-md border border-white/10 hover:border-gold-400 transition-all"
        >
          <ArrowLeft size={16} className="text-gold-400" />
          <span className="hidden sm:inline text-xs font-bold tracking-widest uppercase text-white">{content.backToOverview}</span>
        </button>

        <div className="absolute top-6 right-6 z-20 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 backdrop-blur-md border border-white/10">
          <Layers size={14} className="text-gold-400" />
          <span className="text-xs font-bold tracking-widest uppercase text-white">{floor.name}</span>
        </div>

        {/* 3D / Floor Plan toggle */}
        {hasPlan && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 inline-flex rounded-full border border-white/20 bg-black/60 backdrop-blur-md overflow-hidden">
            <button
              onClick={() => setViewMode('3d')}
              className={`flex items-center gap-1.5 px-3 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs uppercase tracking-widest transition-all ${
                viewMode === '3d'
                  ? 'bg-gold-500 text-white'
                  : 'text-cream-100/70 hover:text-white'
              }`}
            >
              <Eye size={12} />
              {content.view3D}
            </button>
            <button
              onClick={() => setViewMode('plan')}
              className={`flex items-center gap-1.5 px-3 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs uppercase tracking-widest transition-all ${
                viewMode === 'plan'
                  ? 'bg-gold-500 text-white'
                  : 'text-cream-100/70 hover:text-white'
              }`}
            >
              <Map size={12} />
              {content.floorPlan}
            </button>
          </div>
        )}
      </div>

      <div className="bg-navy-800 p-6">
        <div className="flex flex-wrap justify-center gap-4">
          {floor.rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => onRoomClick(room)}
              className="group flex items-center gap-2 sm:gap-3 rounded-lg border border-white/10 bg-navy-900/50 px-4 sm:px-6 py-2.5 sm:py-4 transition-all hover:border-gold-400 hover:bg-gold-500/10"
            >
              <Home size={18} className="text-gold-400" />
              <span className="text-sm font-bold uppercase tracking-wider text-white group-hover:text-gold-400 transition-colors">
                {room.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ========== ROOM VIEW (Room images gallery with arrows) ==========
const RoomView: React.FC<{
  room: RoomDetail;
  activeImageIndex: number;
  setActiveImageIndex: (idx: number) => void;
  content: any;
  onBack: () => void;
}> = ({ room, activeImageIndex, setActiveImageIndex, content, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="relative"
    >
      <ImageGallery
        images={room.images}
        activeIndex={activeImageIndex}
        onChangeIndex={setActiveImageIndex}
        alt={room.name}
        overlay={
          <>
            <button
              onClick={onBack}
              className="absolute top-6 left-6 z-20 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 backdrop-blur-md border border-white/10 hover:border-gold-400 transition-all"
            >
              <ArrowLeft size={16} className="text-gold-400" />
              <span className="hidden sm:inline text-xs font-bold tracking-widest uppercase text-white">{content.backToFloor}</span>
            </button>
            <div className="absolute top-6 right-6 z-20 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 backdrop-blur-md border border-white/10">
              <Home size={14} className="text-gold-400" />
              <span className="text-xs font-bold tracking-widest uppercase text-white">{room.name}</span>
            </div>
          </>
        }
      />

      {/* Feature Tags */}
      {room.features.length > 0 && (
        <div className="bg-navy-800/90 border-t border-white/5 px-6 py-4">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles size={14} className="text-gold-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">Features</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {room.features.map((feature) => (
              <span
                key={feature}
                className="text-[11px] uppercase tracking-wider px-3 py-1.5 border border-white/10 text-cream-100/80 rounded-full bg-white/5 hover:border-gold-400/50 hover:text-gold-400 transition-colors"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}

      {room.images.length > 1 && (
        <ThumbnailStrip
          images={room.images}
          activeIndex={activeImageIndex}
          onSelect={setActiveImageIndex}
        />
      )}
    </motion.div>
  );
};

export default VillaExplorer;
