import React, { useState, useEffect } from 'react';

interface GameProps {
  onAnswer: (isCorrect: boolean, scoreDelta: number) => void;
}

export const PrimeFactor: React.FC<GameProps> = ({ onAnswer }) => {
  const [data, setData] = useState({ number: 0, isPrime: true });

  const isNumberPrime = (n: number) => {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  };

  const generate = () => {
    // Generate a number between 11 and 99
    const primes = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
    const pickPrime = Math.random() > 0.5;

    let num = 0;
    if (pickPrime) {
      num = primes[Math.floor(Math.random() * primes.length)];
    } else {
      // Pick odd composite to make it non-trivial
      const composites = [15, 21, 25, 27, 33, 35, 39, 45, 49, 51, 55, 57, 63, 65, 69, 75, 77, 81, 85, 87, 91, 93, 95];
      num = composites[Math.floor(Math.random() * composites.length)];
    }

    setData({ number: num, isPrime: isNumberPrime(num) });
  };

  useEffect(() => {
    generate();
  }, []);

  const handleChoice = (selectedPrime: boolean) => {
    const isCorrect = selectedPrime === data.isPrime;
    onAnswer(isCorrect, isCorrect ? 100 : 0);
    generate();
  };

  return (
    <div className="space-y-8 text-center max-w-md mx-auto">
      <div className="p-8 rounded-2xl bg-slate-800/80 border border-slate-700">
        <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
          Tantangan Bilangan Prima
        </p>
        <h2 className="text-6xl font-black text-white my-3">{data.number}</h2>
        <p className="text-sm text-slate-300">Apakah angka di atas bilangan prima?</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleChoice(true)}
          className="py-4 text-lg font-bold rounded-xl bg-emerald-600/80 hover:bg-emerald-600 border border-emerald-500 text-white transition hover:scale-105 shadow-lg shadow-emerald-600/20"
        >
          Ya, Prima ✅
        </button>
        <button
          onClick={() => handleChoice(false)}
          className="py-4 text-lg font-bold rounded-xl bg-rose-600/80 hover:bg-rose-600 border border-rose-500 text-white transition hover:scale-105 shadow-lg shadow-rose-600/20"
        >
          Bukan Prima ❌
        </button>
      </div>
    </div>
  );
};
