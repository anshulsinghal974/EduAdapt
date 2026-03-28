import React, { useState } from 'react';
import { Palette, X } from 'lucide-react';

const OVERLAYS = [
  { id: 'none', name: 'None', class: '' },
  { id: 'yellow', name: 'Yellow', class: 'overlay-yellow', bg: 'bg-yellow-200' },
  { id: 'blue', name: 'Blue', class: 'overlay-blue', bg: 'bg-blue-300' },
  { id: 'green', name: 'Green', class: 'overlay-green', bg: 'bg-green-300' },
  { id: 'pink', name: 'Pink', class: 'overlay-pink', bg: 'bg-pink-300' },
];

const ColorOverlay = ({ activeOverlay, setActiveOverlay }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className={`color-overlay-container ${
          OVERLAYS.find(o => o.id === activeOverlay)?.class || ''
        }`} 
      />
      
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
        {isOpen && (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(16,185,129,0.3)] border border-white/60 p-4 flex flex-col gap-2 w-56 animate-in fade-in slide-in-from-bottom-8 duration-300">
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-100">
              <span className="text-[11px] font-black text-textMain uppercase tracking-widest pl-2">Irlen Overlays</span>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
              >
                <X size={14} strokeWidth={3} />
              </button>
            </div>
            
            {OVERLAYS.map(overlay => (
              <button
                key={overlay.id}
                onClick={() => setActiveOverlay(overlay.id)}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  activeOverlay === overlay.id 
                    ? 'bg-primary/10 text-primary border-primary/20 scale-[0.98]' 
                    : 'hover:bg-gray-50 text-gray-600 border-transparent hover:scale-[1.02]'
                } border`}
              >
                {overlay.name}
                {overlay.id !== 'none' && (
                  <div className={`w-5 h-5 rounded-full shadow-inner border border-white/50 ${overlay.bg}`}></div>
                )}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative p-5 rounded-full shadow-[0_10px_30px_rgba(16,185,129,0.3)] border-2 transition-all duration-300 hover:scale-110 active:scale-95 z-50 ${
            isOpen 
              ? 'bg-textMain border-textMain text-white rotate-12' 
              : 'bg-gradient-to-br from-primary to-accent border-white text-white hover:rotate-12'
          }`}
          title="Color Settings for Irlen Syndrome"
        >
          {/* Subtle pulse ring behind the button */}
          {!isOpen && activeOverlay !== 'none' && (
            <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-40 mix-blend-screen -z-10"></div>
          )}
          <Palette size={26} strokeWidth={2.5} />
        </button>
      </div>
    </>
  );
};

export default ColorOverlay;
