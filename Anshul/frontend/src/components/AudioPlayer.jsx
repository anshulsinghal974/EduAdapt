import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Headphones, FastForward } from 'lucide-react';

const AudioPlayer = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rate, setRate] = useState(1);
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);

  useEffect(() => {
    synthRef.current.cancel();
    setIsPlaying(false);
    return () => synthRef.current.cancel();
  }, [text]);

  const togglePlay = () => {
    if (isPlaying) {
      synthRef.current.pause();
      setIsPlaying(false);
    } else {
      if (synthRef.current.paused) {
        synthRef.current.resume();
      } else {
        utteranceRef.current = new SpeechSynthesisUtterance(text);
        utteranceRef.current.rate = rate;
        utteranceRef.current.lang = 'en-IN';
        
        utteranceRef.current.onend = () => setIsPlaying(false);
        utteranceRef.current.onerror = () => setIsPlaying(false);
        
        synthRef.current.speak(utteranceRef.current);
      }
      setIsPlaying(true);
    }
  };

  const stopAudio = () => {
    synthRef.current.cancel();
    setIsPlaying(false);
  };

  const changeRate = () => {
    const newRate = rate === 1 ? 1.5 : rate === 1.5 ? 2 : rate === 2 ? 0.8 : 1;
    setRate(newRate);
    
    if (isPlaying) {
      synthRef.current.cancel();
      setTimeout(() => {
        utteranceRef.current = new SpeechSynthesisUtterance(text);
        utteranceRef.current.rate = newRate;
        utteranceRef.current.lang = 'en-IN';
        utteranceRef.current.onend = () => setIsPlaying(false);
        synthRef.current.speak(utteranceRef.current);
      }, 50);
    }
  };

  return (
    <div className="glass-panel p-6 flex flex-col justify-center min-h-[160px] group transition-all duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full group-hover:bg-primary/10 transition-colors pointer-events-none"></div>

      <h3 className="font-extrabold text-lg text-textMain flex items-center gap-2 mb-5 relative z-10">
        <Headphones className="text-primary w-5 h-5 shadow-sm" />
        Immersive Read-Aloud
      </h3>
      
      <div className="flex items-center gap-5 p-2 bg-white/40 rounded-full border border-white/60 relative z-10 shadow-inner">
        <button
          onClick={togglePlay}
          className={`w-14 h-14 flex items-center justify-center rounded-full text-white shadow-[0_5px_15px_rgba(16,185,129,0.3)] transition-all ${
            isPlaying ? 'bg-primary hover:bg-secondary animate-pulse-slow scale-105' : 'bg-textMain hover:bg-gray-800 hover:scale-105'
          }`}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={24} className="fill-current" /> : <Play size={24} className="fill-current ml-1" />}
        </button>

        <button
          onClick={stopAudio}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-100 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors shadow-sm"
          title="Stop"
        >
          <Square size={16} className="fill-current" />
        </button>

        <div className="flex-1 h-3 bg-white border border-white rounded-full overflow-hidden shadow-inner relative">
          {isPlaying && (
            <div className="absolute inset-0 bg-primary/40 animate-pulse rounded-full w-full before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent before:animate-[shimmer_2s_infinite]"></div>
          )}
        </div>

        <button
          onClick={changeRate}
          className="flex items-center justify-center gap-1 text-xs font-black bg-white shadow-sm border border-gray-100 px-4 py-2.5 rounded-full hover:bg-primary hover:text-white hover:border-primary text-gray-500 w-24 transition-colors"
          title="Change Speed"
        >
          <FastForward size={14} />
          {rate}x Speed
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
