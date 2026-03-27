import React from 'react';
import { Brain, Eye, Ear, UserCheck, Focus, BookOpen, Languages, MapPin, Calendar, Layers } from 'lucide-react';

const DISABILITY_PROFILES = [
  { id: 'dyslexia', name: 'Dyslexia', icon: Brain, desc: 'Short sentences, open font' },
  { id: 'visual', name: 'Visual Impairment', icon: Eye, desc: 'Descriptive, audio-ready' },
  { id: 'cognitive', name: 'Cognitive', icon: UserCheck, desc: 'Emojis, simple words' },
  { id: 'adhd', name: 'ADHD', icon: Focus, desc: 'Chunked format' },
  { id: 'autism', name: 'Autism', icon: MapPin, desc: 'Literal language' },
  { id: 'hearing', name: 'Hearing Impairment', icon: Ear, desc: 'Visual narrative' },
];

const CLASS_LEVELS = ['1-5', '6-8', '9-10', '11-12', 'UG'];
const LANGUAGES = ['English', 'Hindi', 'Gujarati'];

const PersonalizationPanel = ({ 
  disability, setDisability,
  classLevel, setClassLevel,
  age, setAge,
  language, setLanguage 
}) => {
  return (
    <div className="glass-panel p-8 mb-8 relative overflow-hidden group">
      {/* Decorative gradient orb */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-accent/20 to-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-700"></div>

      <h2 className="text-2xl font-extrabold text-textMain mb-6 flex items-center gap-3 relative z-10">
        <div className="bg-primary/10 p-2 rounded-xl text-primary">
          <Layers className="w-6 h-6" />
        </div>
        Adaptive Profile Setup
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Profile Selection - 7 Columns */}
        <div className="lg:col-span-7 space-y-3">
          <label className="block text-xs uppercase tracking-widest font-bold text-secondary mb-4">Learning Profile</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {DISABILITY_PROFILES.map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setDisability(id)}
                className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-1 ${
                  disability === id 
                    ? 'border-primary bg-primary/10 text-primary shadow-[0_4px_20px_0_rgba(16,185,129,0.2)]' 
                    : 'border-white/40 bg-white/50 text-gray-500 hover:border-primary/30 hover:bg-white/80 hover:text-gray-700 shadow-sm'
                }`}
              >
                <Icon size={28} className={disability === id ? 'text-primary' : 'text-gray-400'} strokeWidth={disability === id ? 2.5 : 1.5} />
                <span className="text-sm font-bold tracking-tight">{name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden lg:block lg:col-span-1 border-l border-gray-200/60 mx-auto w-px h-full"></div>

        <div className="lg:col-span-4 flex flex-col justify-between gap-6">
          
          {/* Demographics Area */}
          <div className="space-y-5">
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-secondary mb-2 flex items-center gap-2">
                <BookOpen size={14} />
                Grade Level
              </label>
              <select
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value)}
                className="w-full bg-white/60 border border-white/60 text-textMain font-medium text-sm rounded-xl focus:ring-2 focus:ring-primary focus:border-primary block p-3 outline-none shadow-sm transition-all focus:bg-white"
              >
                {CLASS_LEVELS.map(level => (
                  <option key={level} value={level}>Class {level}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-secondary mb-2 flex items-center gap-2">
                <Calendar size={14} />
                Student Age
              </label>
              <input 
                type="number" 
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="5" max="30"
                className="w-full bg-white/60 border border-white/60 text-textMain font-medium text-sm rounded-xl focus:ring-2 focus:ring-primary focus:border-primary block p-3 outline-none shadow-sm transition-all focus:bg-white"
                placeholder="e.g. 12" 
              />
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

          {/* Language Selection */}
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-secondary mb-3 flex items-center gap-2">
              <Languages size={14} />
              Output Language
            </label>
            <div className="flex gap-2">
              {LANGUAGES.map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`flex-1 text-center py-2 px-1 rounded-xl border text-xs font-bold transition-all duration-300 ${
                    language === lang 
                      ? 'border-secondary bg-secondary text-white shadow-md' 
                      : 'border-white/50 bg-white/50 text-gray-600 hover:bg-white hover:text-gray-800'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PersonalizationPanel;
