import React, { useState, useEffect } from 'react';

interface GameProps {
  onAnswer: (isCorrect: boolean, scoreDelta: number) => void;
}

export const NumberSequence: React.FC<GameProps> = ({ onAnswer }) => {
  const [data, setData] = useState({ sequence: [] as string[], answer: 0, options: [0, 0, 0, 0] });

  const generate = () => {
    const isGeometric = Math.random() > 0.7;
    let seqNumbers: number[] = [];
    let nextVal = 0;

    if (isGeometric) {
      const start = Math.floor(Math.random() * 3) + 2;
      const ratio = Math.floor(Math.random() * 2) + 2; // 2 or 3
      seqNumbers = [start, start * ratio, start * ratio * ratio, start * ratio * ratio * ratio];
      nextVal = seqNumbers[3] * ratio;
    } else {
      const start = Math.floor(Math.random() * 20) + 1;
      const diff = Math.floor(Math.random() * 7) + 2;
      seqNumbers = [start, start + diff, start + diff * 2, start + diff * 3];
      nextVal = seqNumbers[3] + diff;
    }

    const wrong1 = nextVal + 2;
    const wrong2 = nextVal - 2;
    const wrong3 = nextVal + 4;
    const options = [nextVal, wrong1, wrong2, wrong3].sort(() => Math.random() - 0.5);

    const display = [...seqNumbers.map(String), '?'];
    setData({ sequence: display, answer: nextVal, options });
  };

  useEffect(() => {
    generate();
  }, []);

  const handleSelect = (choice: number) => {
    const isCorrect = choice === data.answer;
    onAnswer(isCorrect, isCorrect ? 100 : 0);
    generate();
  };

  return (
    <div className="space-y-8 text-center max-w-md mx-auto">
      <div className="p-8 rounded-2xl bg-slate-800/80 border border-slate-700">
        <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
          Deret & Pola Angka
        </p>
        <div className="flex items-center justify-center gap-3 text-2xl sm:text-3xl font-extrabold text-white">
          {data.sequence.map((num, i) => (
            <span
              key={i}
              className={`px-3 py-1.5 rounded-lg ${
                num === '?'
                  ? 'bg-indigo-500/20 border border-indigo-500 text-indigo-400'
                  : 'bg-slate-900 border border-slate-700'
              }`}
            >
              {num}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {data.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(opt)}
            className="py-4 text-xl font-bold rounded-xl bg-slate-800 hover:bg-indigo-600 border border-slate-700 text-white transition hover:scale-105"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};
