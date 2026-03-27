import React from 'react';
import { Eye, Type, BookOpen } from 'lucide-react';

const Header = ({ 
  highContrast, setHighContrast, 
  largeFont, setLargeFont, 
  dyslexiaFont, setDyslexiaFont 
}) => {
  return (
    <header className="sticky top-4 z-50 mx-4 sm:mx-8 mt-4">
      <div className="glass-pill max-w-6xl mx-auto px-6 py-3 flex flex-col sm:flex-row justify-between items-center gap-4 transition-all duration-300">
        
        {/* Logo and App Name */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-primary to-accent text-white p-2 rounded-full shadow-lg shadow-primary/30">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-textMain leading-none mb-1">EduAdapt<span className="text-primary">.ai</span></h1>
            <p className="text-[10px] uppercase font-bold text-secondary tracking-widest leading-none">Inclusive Education</p>
          </div>
        </div>

        {/* Accessibility Toggles */}
        <div className="flex items-center gap-2 bg-white/50 p-1.5 rounded-full border border-white/60 shadow-inner">
          <button
            onClick={() => setHighContrast(!highContrast)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
              highContrast ? 'bg-textMain text-white shadow-md' : 'bg-transparent text-gray-600 hover:bg-white hover:shadow-sm'
            }`}
            title="Toggle High Contrast"
            aria-pressed={highContrast}
          >
            <Eye size={16} />
            <span className="hidden sm:inline">Contrast</span>
          </button>
          
          <button
            onClick={() => setLargeFont(!largeFont)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
              largeFont ? 'bg-textMain text-white shadow-md' : 'bg-transparent text-gray-600 hover:bg-white hover:shadow-sm'
            }`}
            title="Toggle Large Font"
            aria-pressed={largeFont}
          >
            <span className="text-sm leading-none font-black">A+</span>
            <span className="hidden sm:inline">Text Size</span>
          </button>

          <button
            onClick={() => setDyslexiaFont(!dyslexiaFont)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
              dyslexiaFont ? 'bg-textMain text-white shadow-md' : 'bg-transparent text-gray-600 hover:bg-white hover:shadow-sm'
            }`}
            title="Toggle Dyslexia Font"
            aria-pressed={dyslexiaFont}
          >
            <Type size={16} />
            <span className="hidden sm:inline">Dyslexic Font</span>
          </button>
        </div>
        
      </div>
    </header>
  );
};

export default Header;
