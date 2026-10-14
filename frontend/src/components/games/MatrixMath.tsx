import React, { useState, useEffect } from 'react';

interface GameProps {
  onAnswer: (isCorrect: boolean, scoreDelta: number) => void;
}

export const MatrixMath: React.FC<GameProps> = ({ onAnswer }) => {
  const [data, setData] = useState({
    grid: [0, 0, 0, 0],
    targetSum: 0,
    missingIndex: 0,
    answer: 0,
    options: [0, 0, 0, 0],
  });

  const generate = () => {
    // 2x2 grid where row 1 sum = target, row 2 sum = target
    const target = Math.floor(Math.random() * 15) + 12; // 12 - 26
    const a = Math.floor(Math.random() * (target - 3)) + 1;
    const b = target - a;
    const c = Math.floor(Math.random() * (target - 3)) + 1;
    const d = target - c;

    const fullGrid = [a, b, c, d];
    const missing = Math.floor(Math.random() * 4);
    const ans = fullGrid[missing];

    const w1 = ans + 2;
    const w2 = Math.max(1, ans - 2);
    const w3 = ans + 4;
    const options = [ans, w1, w2, w3].sort(() => Math.random() - 0.5);

    setData({
      grid: fullGrid,
      targetSum: target,
      missingIndex: missing,
      answer: ans,
      options,
    });
  };

  useEffect(() => {
    generate();
  }, []);

  const handleSelect = (choice: number) => {
    const isCorrect = choice === data.answer;
    onAnswer(isCorrect, isCorrect ? 130 : 0);
    generate();
  };

  return (
    <div className="space-y-6 text-center max-w-sm mx-auto">
      <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
        <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
          Matriks Angka
        </p>
        <p className="text-xs text-indigo-400 mb-4 font-medium">
          Setiap baris horizontal harus berjumlah: <b className="text-emerald-400 text-sm">{data.targetSum}</b>
        </p>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-2 gap-3 max-w-[220px] mx-auto">
          {data.grid.map((val, idx) => (
            <div
              key={idx}
              className={`h-20 rounded-xl flex items-center justify-center text-2xl font-bold border ${
                idx === data.missingIndex
                  ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300 animate-pulse'
                  : 'bg-slate-900 border-slate-700 text-white'
              }`}
            >
              {idx === data.missingIndex ? '?' : val}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {data.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(opt)}
            className="py-3 text-lg font-bold rounded-xl bg-slate-800 hover:bg-indigo-600 border border-slate-700 text-white transition hover:scale-105"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};
