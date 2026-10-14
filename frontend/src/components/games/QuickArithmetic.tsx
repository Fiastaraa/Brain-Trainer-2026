import React, { useState, useEffect } from 'react';

interface GameProps {
  onAnswer: (isCorrect: boolean, scoreDelta: number) => void;
}

export const QuickArithmetic: React.FC<GameProps> = ({ onAnswer }) => {
  const [question, setQuestion] = useState({ text: '', answer: 0, options: [0, 0, 0, 0] });
  const [feedback, setFeedback] = useState<'CORRECT' | 'WRONG' | null>(null);

  const generateQuestion = () => {
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a = Math.floor(Math.random() * 20) + 2;
    let b = Math.floor(Math.random() * 20) + 2;
    let ans = 0;

    if (op === '+') ans = a + b;
    else if (op === '-') {
      if (a < b) [a, b] = [b, a];
      ans = a - b;
    } else {
      a = Math.floor(Math.random() * 12) + 2;
      b = Math.floor(Math.random() * 12) + 2;
      ans = a * b;
    }

    const wrong1 = ans + (Math.random() > 0.5 ? 2 : -2);
    const wrong2 = ans + (Math.random() > 0.5 ? 5 : -5);
    const wrong3 = ans + (Math.random() > 0.5 ? 10 : -10);

    const options = [ans, wrong1, wrong2, wrong3].sort(() => Math.random() - 0.5);
    setQuestion({ text: `${a} ${op} ${b} = ?`, answer: ans, options });
    setFeedback(null);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleSelect = (choice: number) => {
    const isCorrect = choice === question.answer;
    setFeedback(isCorrect ? 'CORRECT' : 'WRONG');
    onAnswer(isCorrect, isCorrect ? 100 : 0);
    setTimeout(generateQuestion, 300);
  };

  return (
    <div className="space-y-8 text-center">
      <div className="p-8 rounded-2xl bg-slate-800/80 border border-slate-700 max-w-md mx-auto">
        <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
          Hitung Cepat
        </p>
        <h2 className="text-4xl font-extrabold text-white">{question.text}</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(opt)}
            className={`py-4 px-6 text-xl font-bold rounded-xl border transition shadow-lg ${
              feedback === 'CORRECT' && opt === question.answer
                ? 'bg-emerald-600 border-emerald-400 text-white'
                : 'bg-slate-800/90 hover:bg-indigo-600/80 border-slate-700 text-slate-100 hover:border-indigo-400'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};
