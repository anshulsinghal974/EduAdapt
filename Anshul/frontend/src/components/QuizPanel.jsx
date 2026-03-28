import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle2, XCircle, BrainCircuit } from 'lucide-react';

const MOCK_QUIZ_DATA = [
  {
    id: 1,
    question: "What is the main topic of the given text?",
    options: ["Understanding gravity", "Photosynthesis in plants", "The water cycle", "Historical events"],
    answer: "The water cycle"
  },
  {
    id: 2,
    question: "Which of these is a key element mentioned?",
    options: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"],
    answer: "Oxygen"
  },
  {
    id: 3,
    question: "What conclusion can be drawn from the passage?",
    options: ["It is too complex", "It shows a continuous process", "It only happens in summer", "It is rarely observed"],
    answer: "It shows a continuous process"
  }
];

const QuizPanel = ({ text }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (text) {
      setQuestions(MOCK_QUIZ_DATA);
      setSelectedAnswers({});
      setShowResults(false);
    }
  }, [text]);

  const handleSelect = (qId, option) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  if (!questions.length) return null;

  const score = Object.keys(selectedAnswers).reduce((acc, qId) => {
    const q = questions.find(q => q.id === Number(qId));
    return acc + (q.answer === selectedAnswers[qId] ? 1 : 0);
  }, 0);

  return (
    <div className="glass-panel p-8 h-full relative overflow-hidden group">
      
      {/* Decorative BG */}
      <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/20 transition-all duration-1000"></div>

      <h3 className="font-extrabold text-xl text-textMain flex items-center gap-3 mb-6 relative z-10">
        <div className="bg-primary/10 p-2 rounded-xl text-primary">
          <BrainCircuit className="w-6 h-6" />
        </div>
        Knowledge Check
      </h3>

      <div className="space-y-8 relative z-10">
        {questions.map((q, idx) => (
          <div key={q.id} className="bg-white/50 rounded-2xl p-6 border border-white shadow-sm hover:shadow-md transition-shadow">
            <p className="font-extrabold text-textMain mb-4 flex items-start gap-3">
              <span className="text-white bg-primary w-6 h-6 flex items-center justify-center rounded-full text-xs shrink-0 mt-0.5 shadow-sm">
                {idx + 1}
              </span>
              <span className="leading-snug">{q.question}</span>
            </p>
            <div className="space-y-3">
              {q.options.map((opt) => {
                const isSelected = selectedAnswers[q.id] === opt;
                const isCorrect = q.answer === opt;
                
                let btnStyle = `w-full text-left px-5 py-3.5 rounded-xl transition-all border outline-none font-medium ${
                  isSelected ? 'border-primary bg-primary/10 text-primary shadow-[0_4px_15px_rgba(16,185,129,0.15)] ring-2 ring-primary/20' : 'border-transparent bg-white/70 hover:bg-white text-gray-600 hover:shadow-sm'
                }`;

                if (showResults) {
                  if (isSelected && isCorrect) {
                    btnStyle = "w-full text-left px-5 py-3.5 rounded-xl border-2 border-primary bg-emerald-50 text-textMain font-extrabold flex justify-between items-center shadow-md";
                  } else if (isSelected && !isCorrect) {
                    btnStyle = "w-full text-left px-5 py-3.5 rounded-xl border-2 border-red-400 bg-red-50 text-red-500 font-bold flex justify-between items-center opacity-90";
                  } else if (!isSelected && isCorrect) {
                    btnStyle = "w-full text-left px-5 py-3.5 rounded-xl border-2 border-emerald-300 border-dashed bg-emerald-50/50 text-emerald-700 font-bold flex justify-between items-center";
                  } else {
                    btnStyle = "w-full text-left px-5 py-3.5 rounded-xl border border-transparent bg-white/40 text-gray-400 opacity-50";
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelect(q.id, opt)}
                    disabled={showResults}
                    className={btnStyle}
                  >
                    <span>{opt}</span>
                    {showResults && isSelected && isCorrect && <CheckCircle2 size={20} className="text-primary shrink-0 drop-shadow-sm" />}
                    {showResults && isSelected && !isCorrect && <XCircle size={20} className="text-red-500 shrink-0 drop-shadow-sm" />}
                    {showResults && !isSelected && isCorrect && <CheckCircle2 size={20} className="text-emerald-400 shrink-0 opacity-50" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {!showResults && Object.keys(selectedAnswers).length === questions.length && (
          <button 
            onClick={handleSubmit}
            className="w-full bg-textMain hover:bg-black text-white font-extrabold py-4 rounded-xl mt-6 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
          >
            Submit Answers
          </button>
        )}

        {showResults && (
          <div className={`p-6 rounded-2xl flex items-center justify-between shadow-lg border-2 animate-in slide-in-from-bottom-4 ${
            score === questions.length ? 'bg-gradient-to-r from-emerald-100 to-white border-primary/50' : 'bg-white border-gray-200'
          }`}>
            <div>
              <h4 className="font-black text-xl text-textMain">Score Result</h4>
              <p className="text-sm font-medium text-gray-500 mt-1">
                {score === questions.length ? 'Perfect! Amazing comprehension.' : 'Good effort! Review the material above.'}
              </p>
            </div>
            <div className="text-center rounded-2xl bg-white px-6 py-4 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
              <span className={`text-3xl font-black block leading-none ${score === questions.length ? 'text-primary' : 'text-textMain'}`}>
                {score}/{questions.length}
              </span>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Points</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPanel;
