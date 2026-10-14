import api from './api';

export type QuestionTheme = 'space' | 'animals' | 'ocean' | 'cooking' | 'fantasy' | 'montessori';

export interface DynamicQuestion {
  id: string;
  type: 'rods' | 'beads' | 'speed' | 'missing_op' | 'sequence' | 'word_problem';
  theme: QuestionTheme;
  cpaStage: 'concrete' | 'pictorial' | 'abstract';
  promptId: string;
  promptEn: string;
  hintId: string;
  hintEn: string;
  storyContextId?: string;
  storyContextEn?: string;
  pictorialItemA?: { icon: string; count: number; nameId: string; nameEn: string };
  pictorialItemB?: { icon: string; count: number; nameId: string; nameEn: string };
  visualRodA?: number;
  visualRodB?: number;
  beadsUnits?: number;
  beadsTens?: number;
  beadsHundreds?: number;
  correctAnswer: number | string;
  options: (number | string)[];
  explanationId: string;
  explanationEn: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const THEME_CONFIG: Record<
  QuestionTheme,
  { nameId: string; nameEn: string; icon: string; badge: string; color: string }
> = {
  space: {
    nameId: '🚀 Galaksi Antariksa',
    nameEn: '🚀 Space Galaxy',
    icon: '🚀',
    badge: 'Space Explorer',
    color: 'from-blue-600 via-indigo-600 to-purple-600',
  },
  animals: {
    nameId: '🐾 Hutan & Hewan',
    nameEn: '🐾 Safari Animals',
    icon: '🐾',
    badge: 'Safari Ranger',
    color: 'from-emerald-600 via-teal-600 to-green-600',
  },
  ocean: {
    nameId: '🌊 Kerajaan Lautan',
    nameEn: '🌊 Ocean Kingdom',
    icon: '🌊',
    badge: 'Deep Diver',
    color: 'from-cyan-600 via-blue-600 to-sky-600',
  },
  cooking: {
    nameId: '🍕 Dapur Koki Cilik',
    nameEn: '🍕 Little Chef',
    icon: '🍕',
    badge: 'Master Baker',
    color: 'from-amber-500 via-orange-500 to-rose-500',
  },
  fantasy: {
    nameId: '🏰 Kerajaan Fantasi',
    nameEn: '🏰 Fantasy Realm',
    icon: '🏰',
    badge: 'Magic Knight',
    color: 'from-purple-600 via-fuchsia-600 to-pink-600',
  },
  montessori: {
    nameId: '🪵 Montessori Klasik',
    nameEn: '🪵 Classic Montessori',
    icon: '🪵',
    badge: 'Concrete CPA',
    color: 'from-indigo-600 via-violet-600 to-purple-600',
  },
};

// Client-side dynamic procedural engine (Guarantees infinite variation even if offline)
export const generateLocalProcedural = (
  type: string,
  count: number = 4,
  difficulty: 'easy' | 'medium' | 'hard' = 'easy',
  theme: QuestionTheme = 'animals'
): DynamicQuestion[] => {
  const list: DynamicQuestion[] = [];

  for (let i = 0; i < count; i++) {
    const qId = `loc-${Date.now()}-${i}-${Math.floor(Math.random() * 1000)}`;

    if (theme === 'space') {
      const a = Math.floor(Math.random() * 5) + 2;
      const b = Math.floor(Math.random() * 4) + 1;
      const sum = a + b;
      const distSet = new Set<number>([sum]);
      while (distSet.size < 4) {
        distSet.add(Math.max(2, sum + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1)));
      }

      list.push({
        id: qId,
        type: 'word_problem',
        theme: 'space',
        cpaStage: 'pictorial',
        promptId: `Astronaut melihat ${a} roket meluncur dan ${b} satelit di orbit. Berapa total wahana antariksa?`,
        promptEn: `Astronaut spotted ${a} rockets and ${b} satellites in orbit. What is the total count?`,
        hintId: `Hitung semua roket (🚀) dan satelit (🛰️) bersama-sama. ${a} + ${b} = ?`,
        hintEn: `Count all rockets (🚀) and satellites (🛰️) together. ${a} + ${b} = ?`,
        storyContextId: `Misi penjelajahan galaksi bintang di Stasiun Luar Angkasa Apollo.`,
        storyContextEn: `Galaxy exploration mission at Apollo Space Station.`,
        pictorialItemA: { icon: '🚀', count: a, nameId: 'Roket', nameEn: 'Rockets' },
        pictorialItemB: { icon: '🛰️', count: b, nameId: 'Satelit', nameEn: 'Satellites' },
        correctAnswer: sum,
        options: Array.from(distSet).sort((x, y) => Number(x) - Number(y)),
        explanationId: `${a} roket + ${b} satelit = ${sum} wahana luar angkasa.`,
        explanationEn: `${a} rockets + ${b} satellites = ${sum} space vehicles.`,
        difficulty,
      });
    } else if (theme === 'animals') {
      const a = Math.floor(Math.random() * 6) + 2;
      const b = Math.floor(Math.random() * 4) + 1;
      const sum = a + b;
      const distSet = new Set<number>([sum]);
      while (distSet.size < 4) {
        distSet.add(Math.max(2, sum + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1)));
      }

      list.push({
        id: qId,
        type: 'word_problem',
        theme: 'animals',
        cpaStage: 'pictorial',
        promptId: `Ada ${a} kelinci sedang makan wortel, lalu datang ${b} anak kelinci lagi. Berapa kelinci semuanya?`,
        promptEn: `There are ${a} bunnies eating carrots, then ${b} more bunnies hop in. How many bunnies in total?`,
        hintId: `Gabungkan kawanan kelinci pertama dan kedua. ${a} + ${b} = ?`,
        hintEn: `Combine the first group and second group of bunnies. ${a} + ${b} = ?`,
        storyContextId: `Padang rumput ceria di Hutan Rimba Ramah Anak.`,
        storyContextEn: `Sunny meadow at the Friendly Forest.`,
        pictorialItemA: { icon: '🐰', count: a, nameId: 'Kelinci', nameEn: 'Bunnies' },
        pictorialItemB: { icon: '🥕', count: b, nameId: 'Wortel/Kelinci Baru', nameEn: 'New Bunnies' },
        correctAnswer: sum,
        options: Array.from(distSet).sort((x, y) => Number(x) - Number(y)),
        explanationId: `${a} + ${b} = ${sum} anak kelinci melompat ceria.`,
        explanationEn: `${a} + ${b} = ${sum} happy hopping bunnies.`,
        difficulty,
      });
    } else if (theme === 'ocean') {
      const a = Math.floor(Math.random() * 5) + 3;
      const b = Math.floor(Math.random() * 4) + 2;
      const sum = a + b;
      const distSet = new Set<number>([sum]);
      while (distSet.size < 4) {
        distSet.add(Math.max(2, sum + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1)));
      }

      list.push({
        id: qId,
        type: 'word_problem',
        theme: 'ocean',
        cpaStage: 'pictorial',
        promptId: `Penyelam menemukan ${a} ikan badut dan ${b} kura-kura laut di terumbu karang. Berapa total biota laut?`,
        promptEn: `A diver found ${a} clownfish and ${b} sea turtles on the reef. How many marine creatures in total?`,
        hintId: `Hitung ikan (🐠) dan penyu laut (🐢) bersama-sama. ${a} + ${b} = ?`,
        hintEn: `Count fish (🐠) and turtles (🐢) together. ${a} + ${b} = ?`,
        storyContextId: `Petualangan dasar samudera di Terumbu Karang Pelangi.`,
        storyContextEn: `Deep ocean journey at Rainbow Coral Reef.`,
        pictorialItemA: { icon: '🐠', count: a, nameId: 'Ikan Badut', nameEn: 'Clownfish' },
        pictorialItemB: { icon: '🐢', count: b, nameId: 'Penyu Laut', nameEn: 'Turtles' },
        correctAnswer: sum,
        options: Array.from(distSet).sort((x, y) => Number(x) - Number(y)),
        explanationId: `${a} ikan + ${b} penyu = ${sum} makhluk laut.`,
        explanationEn: `${a} fish + ${b} turtles = ${sum} sea creatures.`,
        difficulty,
      });
    } else if (theme === 'cooking') {
      const a = Math.floor(Math.random() * 5) + 3;
      const b = Math.floor(Math.random() * 5) + 2;
      const sum = a + b;
      const distSet = new Set<number>([sum]);
      while (distSet.size < 4) {
        distSet.add(Math.max(2, sum + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1)));
      }

      list.push({
        id: qId,
        type: 'word_problem',
        theme: 'cooking',
        cpaStage: 'pictorial',
        promptId: `Koki Cilik membuat ${a} potong pizza keju dan ${b} mangkuk es krim. Berapa jumlah hidangan lezat ini?`,
        promptEn: `The Little Chef baked ${a} pizza slices and scooped ${b} ice creams. What is the total dessert count?`,
        hintId: `Jumlahkan irisan pizza (🍕) dan es krim (🍨). ${a} + ${b} = ?`,
        hintEn: `Add pizza slices (🍕) and ice cream (🍨). ${a} + ${b} = ?`,
        storyContextId: `Aroma harum kue dan roti di Dapur Koki Cilik!`,
        storyContextEn: `Delicious bakery smell at the Little Chef Kitchen!`,
        pictorialItemA: { icon: '🍕', count: a, nameId: 'Pizza', nameEn: 'Pizza' },
        pictorialItemB: { icon: '🍨', count: b, nameId: 'Es Krim', nameEn: 'Ice Cream' },
        correctAnswer: sum,
        options: Array.from(distSet).sort((x, y) => Number(x) - Number(y)),
        explanationId: `${a} pizza + ${b} es krim = ${sum} hidangan lezat.`,
        explanationEn: `${a} pizzas + ${b} ice creams = ${sum} tasty treats.`,
        difficulty,
      });
    } else if (theme === 'fantasy') {
      const a = Math.floor(Math.random() * 6) + 3;
      const b = Math.floor(Math.random() * 5) + 2;
      const sum = a + b;
      const distSet = new Set<number>([sum]);
      while (distSet.size < 4) {
        distSet.add(Math.max(2, sum + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1)));
      }

      list.push({
        id: qId,
        type: 'word_problem',
        theme: 'fantasy',
        cpaStage: 'pictorial',
        promptId: `Penyihir menemukan ${a} botol ramuan sihir dan ${b} kristal naga. Berapa total artefak sihir?`,
        promptEn: `The wizard found ${a} magic potion bottles and ${b} dragon crystals. How many magic artifacts in total?`,
        hintId: `Gabungkan botol ramuan (🧪) dan kristal (💎). ${a} + ${b} = ?`,
        hintEn: `Combine potion bottles (🧪) and crystals (💎). ${a} + ${b} = ?`,
        storyContextId: `Kuil Sihir Kuno di Puncak Gunung Kristal.`,
        storyContextEn: `Ancient Magic Temple on Mount Crystal.`,
        pictorialItemA: { icon: '🧪', count: a, nameId: 'Ramuan', nameEn: 'Potions' },
        pictorialItemB: { icon: '💎', count: b, nameId: 'Kristal', nameEn: 'Crystals' },
        correctAnswer: sum,
        options: Array.from(distSet).sort((x, y) => Number(x) - Number(y)),
        explanationId: `${a} + ${b} = ${sum} artefak sihir berhasil diamankan.`,
        explanationEn: `${a} + ${b} = ${sum} magical artifacts secured.`,
        difficulty,
      });
    } else if (type === 'algebra') {
      const xVal = Math.floor(Math.random() * 9) + 2;
      const b = Math.floor(Math.random() * 12) + 3;
      const sum = xVal + b;
      const distSet = new Set<number>([xVal]);
      while (distSet.size < 4) {
        distSet.add(Math.max(1, xVal + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1)));
      }

      list.push({
        id: qId,
        type: 'word_problem',
        theme,
        cpaStage: 'abstract',
        promptId: `Timbangan Seimbang: x + ${b} = ${sum}. Berapa nilai x?`,
        promptEn: `Balanced Scale: x + ${b} = ${sum}. What is the value of x?`,
        hintId: `Kurangkan ${sum} dengan ${b} untuk mencari nilai x (${sum} - ${b} = ?).`,
        hintEn: `Subtract ${b} from ${sum} to find x (${sum} - ${b} = ?).`,
        storyContextId: `Di Kuil Kuno, timbangan kristal emas harus seimbang agar pintu terbuka.`,
        storyContextEn: `At the Ancient Temple, the golden crystal scale must be balanced to open the gate.`,
        correctAnswer: xVal,
        options: Array.from(distSet).sort((a, b) => Number(a) - Number(b)),
        explanationId: `Nilai x adalah ${xVal}, karena ${xVal} + ${b} = ${sum}.`,
        explanationEn: `The value of x is ${xVal}, because ${xVal} + ${b} = ${sum}.`,
        difficulty,
      });
    } else if (type === 'estimation') {
      const a = (Math.floor(Math.random() * 8) + 2) * 10 - 1; // e.g. 29, 39, 49
      const mult = Math.floor(Math.random() * 4) + 2; // e.g. 3
      const approx = (a + 1) * mult;
      const distSet = new Set<number>([approx]);
      distSet.add(approx + 50);
      distSet.add(Math.max(20, approx - 50));
      distSet.add(approx + 100);

      list.push({
        id: qId,
        type: 'speed',
        theme,
        cpaStage: 'abstract',
        promptId: `Estimasi Cepat: ${a} × ${mult} paling mendekati angka:`,
        promptEn: `Quick Estimation: ${a} × ${mult} is closest to:`,
        hintId: `Bulatkan ${a} ke angka ${a + 1}, lalu kalikan dengan ${mult}.`,
        hintEn: `Round ${a} to ${a + 1}, then multiply by ${mult}.`,
        storyContextId: `Kapal selam navigasi harus mengukur kedalaman palung dengan cepat!`,
        storyContextEn: `The submarine navigation needs a fast depth approximation!`,
        correctAnswer: approx,
        options: Array.from(distSet).sort((a, b) => Number(a) - Number(b)),
        explanationId: `${a} mendekati ${a + 1}. Jadi ${a + 1} × ${mult} = ${approx}.`,
        explanationEn: `${a} is close to ${a + 1}. So ${a + 1} × ${mult} = ${approx}.`,
        difficulty,
      });
    } else if (type === 'matrix') {
      const a = Math.floor(Math.random() * 8) + 2;
      const missing = Math.floor(Math.random() * 9) + 1;
      const c = Math.floor(Math.random() * 8) + 2;
      const targetSum = a + missing + c;
      const distSet = new Set<number>([missing]);
      while (distSet.size < 4) {
        distSet.add(Math.max(1, missing + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1)));
      }

      list.push({
        id: qId,
        type: 'word_problem',
        theme,
        cpaStage: 'abstract',
        promptId: `Matriks Ajaib: [ ${a} ] + [ ? ] + [ ${c} ] = ${targetSum}. Angka berapakah yang hilang?`,
        promptEn: `Magic Grid: [ ${a} ] + [ ? ] + [ ${c} ] = ${targetSum}. What is the missing number?`,
        hintId: `Jumlahkan ${a} + ${c} = ${a + c}. Selisihnya dengan ${targetSum} adalah jawabannya.`,
        hintEn: `Add ${a} + ${c} = ${a + c}. The difference with ${targetSum} is the answer.`,
        storyContextId: `Kunci pintu rahasia laboratorium membutuhkan angka matriks yang pas!`,
        storyContextEn: `The secret lab door lock requires the exact matrix grid number!`,
        correctAnswer: missing,
        options: Array.from(distSet).sort((a, b) => Number(a) - Number(b)),
        explanationId: `${a} + ${missing} + ${c} = ${targetSum}. Jadi angka yang hilang adalah ${missing}.`,
        explanationEn: `${a} + ${missing} + ${c} = ${targetSum}. So the missing number is ${missing}.`,
        difficulty,
      });
    } else {
      // Classic Montessori Rods / Beads
      if (type === 'beads') {
        const hundreds = Math.floor(Math.random() * 3) + 1;
        const tens = Math.floor(Math.random() * 6) + 1;
        const units = Math.floor(Math.random() * 8) + 1;
        const total = hundreds * 100 + tens * 10 + units;
        const distSet = new Set<number>([total]);
        while (distSet.size < 4) {
          distSet.add(Math.max(10, total + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 4) + 1) * 10));
        }

        list.push({
          id: qId,
          type: 'beads',
          theme: 'montessori',
          cpaStage: 'concrete',
          promptId: `Berapa nilai: ${hundreds} Ratusan + ${tens} Puluhan + ${units} Satuan?`,
          promptEn: `What is: ${hundreds} Hundreds + ${tens} Tens + ${units} Units?`,
          hintId: `Gabungkan nilai tempat: ${hundreds}00 + ${tens}0 + ${units}`,
          hintEn: `Combine place values: ${hundreds}00 + ${tens}0 + ${units}`,
          storyContextId: `Koleksi manik emas konkret Montessori di ruang kelas.`,
          storyContextEn: `Classic Montessori golden beads collection in the classroom.`,
          beadsHundreds: hundreds,
          beadsTens: tens,
          beadsUnits: units,
          correctAnswer: total,
          options: Array.from(distSet).sort((x, y) => Number(x) - Number(y)),
          explanationId: `${hundreds}00 + ${tens}0 + ${units} = ${total}`,
          explanationEn: `${hundreds}00 + ${tens}0 + ${units} = ${total}`,
          difficulty,
        });
      } else {
        const rodA = Math.floor(Math.random() * 6) + 1;
        const rodB = Math.floor(Math.random() * 5) + 1;
        const sum = rodA + rodB;
        const distSet = new Set<number>([sum]);
        while (distSet.size < 4) {
          distSet.add(Math.max(2, sum + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1)));
        }

        list.push({
          id: qId,
          type: 'rods',
          theme: 'montessori',
          cpaStage: 'concrete',
          promptId: `Hitung gabungan Batang ${rodA} dan Batang ${rodB}:`,
          promptEn: `Count the sum of Rod ${rodA} and Rod ${rodB}:`,
          hintId: `Hitung segmen merah dan biru bergantian. ${rodA} + ${rodB} = ?`,
          hintEn: `Count alternating red and blue units. ${rodA} + ${rodB} = ?`,
          storyContextId: `Batang kayu bernomor konkret merah-biru Montessori 1 sampai 10.`,
          storyContextEn: `Montessori alternating red-blue wooden rods 1 to 10.`,
          visualRodA: rodA,
          visualRodB: rodB,
          correctAnswer: sum,
          options: Array.from(distSet).sort((x, y) => Number(x) - Number(y)),
          explanationId: `Batang ${rodA} + Batang ${rodB} = ${sum} satuan segmen.`,
          explanationEn: `Rod ${rodA} + Rod ${rodB} = ${sum} unit segments.`,
          difficulty,
        });
      }
    }
  }

  return list;
};

// Fetch questions from backend Gemini AI endpoint or fallback to procedural with theme
export const fetchDiverseQuestions = async (
  type: string,
  count: number = 5,
  difficulty: 'easy' | 'medium' | 'hard' = 'easy',
  theme: QuestionTheme = 'animals',
  apiKey?: string
): Promise<{ questions: DynamicQuestion[]; isAiGenerated: boolean }> => {
  try {
    const res = await api.post('/gemini/generate-questions', {
      type,
      count: count || 5,
      difficulty,
      theme,
      apiKey: apiKey || localStorage.getItem('gemini_api_key') || undefined,
    });

    if (res.data?.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
      return {
        questions: res.data.data,
        isAiGenerated: res.data.fromAi ?? false,
      };
    }
  } catch (err) {
    // Fallback to local generator
  }

  return {
    questions: generateLocalProcedural(type, count || 5, difficulty, theme),
    isAiGenerated: false,
  };
};
