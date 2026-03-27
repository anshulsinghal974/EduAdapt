import React from 'react';
import { Download, Copy, LayoutPanelLeft, MousePointerClick, TrendingUp, Sparkles } from 'lucide-react';
import AudioPlayer from './AudioPlayer';
import QuizPanel from './QuizPanel';

const OutputPanel = ({ 
  originalText, 
  transformedText, 
  scoreBefore, 
  scoreAfter,
  isLoading
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(transformedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([transformedText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "EduAdapt-Content.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  if (!transformedText && !isLoading) {
    return (
      <div className="glass-panel p-16 text-center text-primary/40 my-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="bg-white/50 p-6 rounded-full blur-md absolute"></div>
        <Sparkles size={64} className="mb-6 relative z-10 text-primary stroke-1 drop-shadow-sm" />
        <p className="text-2xl font-bold text-textMain relative z-10">Awaiting Material</p>
        <p className="text-sm mt-3 font-medium max-w-sm text-gray-500 relative z-10">Upload or paste educational content and click transform to generate personalized disability-accessible formats.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 font-sans">
      
      {/* Readability Score Dashboard */}
      <div className="glass-panel p-6 mt-6 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/10 to-transparent pointer-events-none"></div>
        
        <h3 className="font-extrabold text-2xl text-textMain flex items-center gap-3 relative z-10">
          <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-xl text-white shadow-lg shadow-primary/30">
            <TrendingUp className="w-6 h-6" />
          </div>
          Readability Metrics
        </h3>
        
        <div className="flex items-center gap-8 w-full sm:w-auto p-4 bg-white/60 rounded-2xl border border-white/60 shadow-sm relative z-10">
          <div className="flex flex-col items-center w-24">
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Before Target</span>
            <div className="text-3xl font-black text-gray-400 line-through decoration-red-300 drop-shadow-sm">
              {scoreBefore || 0}
            </div>
          </div>
          
          <div className="h-10 w-px bg-gray-200"></div>
          
          <div className="flex flex-col items-center w-24">
            <span className="text-[10px] font-black uppercase text-primary tracking-widest mb-1">Adapted</span>
            <div className="text-4xl font-extrabold text-primary drop-shadow-[0_2px_10px_rgba(16,185,129,0.3)]">
              {scoreAfter || 0}
            </div>
          </div>
          
          {scoreAfter > scoreBefore && (
            <div className="hidden sm:flex bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30 text-white text-xs font-black px-4 py-2 rounded-full items-center gap-1 uppercase tracking-wider animate-pulse-slow">
              +{Math.round(scoreAfter - scoreBefore)} Gain
            </div>
          )}
        </div>
      </div>

      {/* Split Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Left Side: Original */}
        <div className="glass-panel border-white/40 flex flex-col shadow-none">
          <div className="bg-white/40 p-4 border-b border-white/40 text-center">
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Original Reference</span>
          </div>
          <div className="p-8 overflow-y-auto max-h-[600px] text-gray-600 font-medium whitespace-pre-wrap leading-relaxed opacity-60 bg-gray-50/30">
            {originalText}
          </div>
        </div>

        {/* Right Side: Transformed Magic */}
        <div className="glass-panel flex flex-col relative overflow-hidden transform transition-all shadow-[0_10px_40px_-10px_rgba(16,185,129,0.2)] border-primary/20">
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xl z-20 flex flex-col items-center justify-center animate-in fade-in duration-300">
               <div className="w-20 h-20 border-[6px] border-emerald-100 border-t-primary rounded-full animate-spin shadow-[0_0_30px_rgba(16,185,129,0.4)]"></div>
               <p className="mt-6 font-extrabold text-xl text-primary tracking-tight">Synthesizing Profile...</p>
            </div>
          )}
          
          <div className="bg-gradient-to-r from-primary/10 to-accent/5 p-3 px-5 border-b border-primary/20 flex justify-between items-center relative z-10">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="text-[11px] font-black text-primary uppercase tracking-widest">Live Output</span>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 text-primary bg-white shadow-sm border border-primary/10 rounded-full hover:bg-primary hover:text-white transition-all font-bold text-xs"
              >
                <Copy size={14} />
                {copied ? <span>Copied!</span> : <span>Copy</span>}
              </button>
              <button 
                onClick={handleDownload}
                className="flex items-center gap-2 px-3 py-1.5 text-primary bg-white shadow-sm border border-primary/10 rounded-full hover:bg-primary hover:text-white transition-all font-bold text-xs"
              >
                <Download size={14} />
              </button>
            </div>
          </div>
          
          <div className="p-8 overflow-y-auto max-h-[600px] text-textMain whitespace-pre-wrap leading-[2.2] text-lg font-medium selection:bg-primary selection:text-white relative bg-white/60">
            {transformedText}
          </div>
        </div>
        
      </div>

      {/* Add-on Panels below Output */}
      {transformedText && !isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-2 animate-in slide-in-from-bottom-8 duration-500">
          <AudioPlayer text={transformedText} />
          <QuizPanel text={transformedText} />
        </div>
      )}

    </div>
  );
};

export default OutputPanel;
