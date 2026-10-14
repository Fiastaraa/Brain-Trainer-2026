import React, { useState, useEffect } from 'react';

interface GameProps {
  onAnswer: (isCorrect: boolean, scoreDelta: number) => void;
}

export const ComparisonMath: React.FC<GameProps> = ({ onAnswer }) => {
  const [data, setData] = useState({ leftText: '', rightText: '', correctRelation: '=' });

  const generate = () => {
    const a1 = Math.floor(Math.random() * 15) + 3;
    const a2 = Math.floor(Math.random() * 15) + 3;
    const b1 = Math.floor(Math.random() * 15) + 3;
    const b2 = Math.floor(Math.random() * 15) + 3;

    const leftVal = a1 + a2;
    // 30% chance equal
    const makeEqual = Math.random() < 0.3;
    const rightVal = makeEqual ? leftVal : b1 + b2;

    let correct = '=';
    if (leftVal > rightVal) correct = '>';
    else if (leftVal < rightVal) correct = '<';

    setData({
      leftText: `${a1} + ${a2}`,
      rightText: makeEqual ? `${leftVal - 2} + 2` : `${b1} + ${b2}`,
      correctRelation: correct,
    });
  };

  useEffect(() => {
    generate();
  }, []);

  const handleSelect = (choice: string) => {
    const isCorrect = choice === data.correctRelation;
    onAnswer(isCorrect, isCorrect ? 90 : 0);
    generate();
  };

  return (
    <div className="space-y-8 text-center max-w-lg mx-auto">
      <div className="p-8 rounded-2xl bg-slate-800/80 border border-slate-700">
        <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-4">
          Tanda Perbandingan
        </p>
        <div className="flex items-center justify-center gap-4 text-3xl font-extrabold text-white">
          <span className="p-3 bg-slate-900 border border-slate-700 rounded-xl">
            {data.leftText}
          </span>
          <span className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-2xl font-bold">
            ?
          </span>
          <span className="p-3 bg-slate-900 border border-slate-700 rounded-xl">
            {data.rightText}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {['<', '=', '>'].map((symbol) => (
          <button
            key={symbol}
            onClick={() => handleSelect(symbol)}
            className="py-5 text-3xl font-black rounded-xl bg-slate-800 hover:bg-indigo-600 border border-slate-700 text-white transition hover:scale-105"
          >
            {symbol}
          </button>
        ))}
      </div>
    </div>
  );
};
