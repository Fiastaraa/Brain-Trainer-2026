import React, { useState, useEffect } from 'react';

interface GameProps {
  onAnswer: (isCorrect: boolean, scoreDelta: number) => void;
}

export const AlgebraBalance: React.FC<GameProps> = ({ onAnswer }) => {
  const [data, setData] = useState({ equation: '', xValue: 0, options: [0, 0, 0, 0] });

  const generate = () => {
    // Generate: a*x + b = c
    const x = Math.floor(Math.random() * 9) + 1; // 1 to 9
    const a = Math.floor(Math.random() * 4) + 2; // 2 to 5
    const b = Math.floor(Math.random() * 15) + 1;
    const c = a * x + b;

    const equation = `${a}x + ${b} = ${c}`;
    const wrong1 = x + 1;
    const wrong2 = Math.max(1, x - 1);
    const wrong3 = x + 2;

    const options = Array.from(new Set([x, wrong1, wrong2, wrong3]))
      .slice(0, 4)
      .sort(() => Math.random() - 0.5);

    setData({ equation, xValue: x, options });
  };

  useEffect(() => {
    generate();
  }, []);

  const handleSelect = (val: number) => {
    const isCorrect = val === data.xValue;
    onAnswer(isCorrect, isCorrect ? 120 : 0);
    generate();
  };

  return (
    <div className="space-y-8 text-center max-w-md mx-auto">
      <div className="p-8 rounded-2xl bg-slate-800/80 border border-slate-700">
        <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
          Persamaan Aljabar (Cari Nilai x)
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
          {data.equation}
        </h2>
        <p className="text-sm text-indigo-400 mt-2 font-semibold">Berapakah nilai x ?</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {data.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(opt)}
            className="py-4 text-xl font-bold rounded-xl bg-slate-800 hover:bg-indigo-600 border border-slate-700 text-white transition hover:scale-105"
          >
            x = {opt}
          </button>
        ))}
      </div>
    </div>
  );
};
