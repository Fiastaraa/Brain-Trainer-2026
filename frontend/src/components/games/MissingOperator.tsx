import React, { useState, useEffect } from 'react';

interface GameProps {
  onAnswer: (isCorrect: boolean, scoreDelta: number) => void;
}

export const MissingOperator: React.FC<GameProps> = ({ onAnswer }) => {
  const [data, setData] = useState({ a: 0, b: 0, result: 0, operator: '+' });
  const operators = ['+', '-', '×', '÷'];

  const generate = () => {
    const rawOps = ['+', '-', '*', '/'];
    const selected = rawOps[Math.floor(Math.random() * rawOps.length)];
    let a = Math.floor(Math.random() * 15) + 3;
    let b = Math.floor(Math.random() * 12) + 2;
    let res = 0;
    let symbol = '+';

    if (selected === '+') {
      res = a + b;
      symbol = '+';
    } else if (selected === '-') {
      if (a < b) [a, b] = [b, a];
      res = a - b;
      symbol = '-';
    } else if (selected === '*') {
      a = Math.floor(Math.random() * 9) + 2;
      b = Math.floor(Math.random() * 9) + 2;
      res = a * b;
      symbol = '×';
    } else {
      b = Math.floor(Math.random() * 8) + 2;
      res = Math.floor(Math.random() * 9) + 2;
      a = b * res;
      symbol = '÷';
    }

    setData({ a, b, result: res, operator: symbol });
  };

  useEffect(() => {
    generate();
  }, []);

  const handleSelect = (op: string) => {
    const isCorrect = op === data.operator;
    onAnswer(isCorrect, isCorrect ? 100 : 0);
    generate();
  };

  return (
    <div className="space-y-8 text-center max-w-md mx-auto">
      <div className="p-8 rounded-2xl bg-slate-800/80 border border-slate-700">
        <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
          Cari Operator
        </p>
        <div className="text-3xl sm:text-4xl font-extrabold text-white flex items-center justify-center gap-3">
          <span>{data.a}</span>
          <span className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center text-2xl font-bold">
            ?
          </span>
          <span>{data.b}</span>
          <span>=</span>
          <span className="text-emerald-400">{data.result}</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {operators.map((op) => (
          <button
            key={op}
            onClick={() => handleSelect(op)}
            className="py-4 text-2xl font-bold rounded-xl bg-slate-800 hover:bg-indigo-600 border border-slate-700 text-white transition hover:scale-105"
          >
            {op}
          </button>
        ))}
      </div>
    </div>
  );
};
