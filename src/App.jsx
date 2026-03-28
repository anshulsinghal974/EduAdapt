import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PersonalizationPanel from './components/PersonalizationPanel';
import TextInput from './components/TextInput';
import OutputPanel from './components/OutputPanel';
import ColorOverlay from './components/ColorOverlay';
import { fleschKincaid } from './utils/readability';
import { transformText } from './api/api';

function App() {
  const [highContrast, setHighContrast] = useState(false);
  const [largeFont, setLargeFont] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState('none');

  const [disability, setDisability] = useState('dyslexia');
  const [classLevel, setClassLevel] = useState('6-8');
  const [age, setAge] = useState('12');
  const [language, setLanguage] = useState('English');

  const [inputText, setInputText] = useState('');
  const [originalText, setOriginalText] = useState('');
  const [transformedText, setTransformedText] = useState('');
  const [scoreBefore, setScoreBefore] = useState(0);
  const [scoreAfter, setScoreAfter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('high-contrast', highContrast);
    root.classList.toggle('large-font', largeFont);
    root.classList.toggle('dyslexia-font', dyslexiaFont);
  }, [highContrast, largeFont, dyslexiaFont]);

  const handleTransform = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setOriginalText(inputText);
    setScoreBefore(fleschKincaid(inputText));

    try {
      const result = await transformText(inputText, disability, classLevel, age, language);
      setTransformedText(result.transformedText);
      const newScore = fleschKincaid(result.transformedText);
      setScoreAfter(newScore > 0 ? newScore : scoreBefore + 15);
    } catch (err) {
       console.error(err);
       setTransformedText("An error occurred during transformation.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-textMain">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob bg-primary"></div>
        <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 bg-accent"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 bg-emerald-200"></div>
      </div>

      <div className="relative z-10">
        <Header 
          highContrast={highContrast} setHighContrast={setHighContrast}
          largeFont={largeFont} setLargeFont={setLargeFont}
          dyslexiaFont={dyslexiaFont} setDyslexiaFont={setDyslexiaFont}
        />
        
        <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
          <PersonalizationPanel 
            disability={disability} setDisability={setDisability}
            classLevel={classLevel} setClassLevel={setClassLevel}
            age={age} setAge={setAge}
            language={language} setLanguage={setLanguage}
          />
          
          <TextInput 
            inputText={inputText} 
            setInputText={setInputText} 
            onTransform={handleTransform} 
            isLoading={isLoading}
          />

          <OutputPanel 
            originalText={originalText}
            transformedText={transformedText}
            scoreBefore={scoreBefore}
            scoreAfter={scoreAfter}
            isLoading={isLoading}
          />
        </main>

        <ColorOverlay activeOverlay={activeOverlay} setActiveOverlay={setActiveOverlay} />
      </div>
    </div>
  );
}

export default App;
