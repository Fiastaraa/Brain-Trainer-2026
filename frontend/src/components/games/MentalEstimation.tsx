import React, { useState, useEffect } from 'react';

interface GameProps {
  onAnswer: (isCorrect: boolean, scoreDelta: number) => void;
}

export const MentalEstimation: React.FC<GameProps> = ({ onAnswer }) => {
  const [data, setData] = useState({ problem: '', answer: 0, options: [0, 0, 0, 0] });

  const generate = () => {
    // Generate approximation problem like 49 * 31 (exact 1519, choices: 900, 1500, 2200, 3100)
    const a = Math.floor(Math.random() * 50) + 21;
    const b = Math.floor(Math.random() * 50) + 11;
    const exact = a * b;

    // Nearest round options
    const roundApprox = Math.round(exact / 100) * 100;
    const w1 = roundApprox - 500;
    const w2 = roundApprox + 500;
    const w3 = roundApprox + 1000;

    const options = [roundApprox, w1, w2, w3].sort(() => Math.random() - 0.5);
    setData({
      problem: `${a} × ${b} ≈ ?`,
      answer: roundApprox,
      options,
    });
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
        <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
          Estimasi Mental Cepat
        </p>
        <h2 className="text-4xl font-extrabold text-white">{data.problem}</h2>
        <p className="text-xs text-indigo-400 mt-2 font-medium">
          Pilih angka estimasi paling mendekati
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {data.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(opt)}
            className="py-4 text-xl font-bold rounded-xl bg-slate-800 hover:bg-indigo-600 border border-slate-700 text-white transition hover:scale-105"
          >
            ≈ {opt}
          </button>
        ))}
      </div>
    </div>
  );
};
