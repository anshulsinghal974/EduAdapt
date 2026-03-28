import React, { useRef } from 'react';
import { Type, Upload, FileText, Sparkles, Loader2 } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const TextInput = ({ inputText, setInputText, onTransform, isLoading }) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type === 'application/pdf') {
      try {
        const buffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
        let extractedText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          extractedText += content.items.map(item => item.str).join(' ') + '\n';
        }
        
        setInputText(extractedText);
      } catch (err) {
        console.error('Error extracting PDF:', err);
        alert('Could not extract text from the PDF. Please try pasting instead.');
      }
    } else if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setInputText(event.target.result);
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a PDF or TXT file.');
    }
  };

  const wordCount = inputText.trim().split(/\s+/).filter(w => w.length > 0).length;

  return (
    <div className="glass-panel p-8 mb-8 relative group transform transition-all">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-extrabold text-textMain flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-xl text-primary">
            <Type className="w-6 h-6" />
          </div>
          Input Content
        </h2>
        
        <div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept=".pdf,.txt" 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current.click()}
            className="flex items-center gap-2 text-sm font-bold text-accent hover:text-white transition-all duration-300 bg-white shadow-sm border border-accent/20 px-4 py-2 rounded-full hover:bg-accent hover:shadow-md hover:shadow-accent/40"
          >
            <Upload size={16} />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl pointer-events-none transition-opacity opacity-0 group-hover:opacity-100 duration-500"></div>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste educational text or drop a chapter here..."
          className="w-full h-48 sm:h-72 p-6 bg-white/80 border border-white/60 rounded-2xl shadow-inner focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none resize-y text-gray-800 font-medium leading-relaxed transition-all placeholder-gray-400"
        />
        <div className="absolute bottom-4 right-6 text-xs font-extrabold tracking-widest text-primary/60 bg-white/80 px-3 py-1.5 rounded-full shadow-sm border border-white backdrop-blur-sm">
          {wordCount} WORDS
        </div>
      </div>

      <div className="flex justify-center sm:justify-end">
        <button
          onClick={onTransform}
          disabled={isLoading || inputText.trim().length === 0}
          className={`relative group flex items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-4 font-extrabold text-lg text-white transition-all duration-300 ${
            isLoading || inputText.trim().length === 0 
              ? 'bg-gray-300 cursor-not-allowed shadow-none' 
              : 'bg-gradient-to-r from-primary to-accent hover:shadow-[0_8px_30px_rgba(16,185,129,0.4)] hover:scale-[1.03] active:scale-95'
          }`}
        >
          {/* Subtle button sweep animation */}
          {!(isLoading || inputText.trim().length === 0) && (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
          )}

          {isLoading ? (
            <>
              <Loader2 size={24} className="animate-spin relative z-10" />
              <span className="relative z-10">Adapting Content...</span>
            </>
          ) : (
            <>
              <Sparkles size={24} className={`relative z-10 ${inputText.length > 0 && 'animate-pulse'}`} />
              <span className="relative z-10">Transform Automatically</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TextInput;
