// Gemini AI & Dynamic Question Generator Service for Montessori Math Trainer
export interface GeneratedQuestion {
  id: string;
  type: 'rods' | 'beads' | 'speed' | 'missing_op' | 'sequence' | 'word_problem';
  cpaStage: 'concrete' | 'pictorial' | 'abstract';
  promptId: string;
  promptEn: string;
  hintId: string;
  hintEn: string;
  storyContextId?: string;
  storyContextEn?: string;
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

export class GeminiMathService {
  private static apiKey = process.env.GEMINI_API_KEY || '';

  // Procedural generator when Gemini API key is not provided or network is offline
  public static generateProceduralQuestions(
    type: string = 'rods',
    count: number = 4,
    difficulty: 'easy' | 'medium' | 'hard' = 'easy'
  ): GeneratedQuestion[] {
    const list: GeneratedQuestion[] = [];

    for (let i = 0; i < count; i++) {
      const qId = `gen-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`;

      if (type === 'rods') {
        // Concrete Montessori Rods (1 to 10 units each)
        const max = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 8 : 10;
        const rodA = Math.floor(Math.random() * max) + 1;
        const rodB = Math.floor(Math.random() * max) + 1;
        const sum = rodA + rodB;

        // Generate 3 plausible distractors
        const distSet = new Set<number>([sum]);
        while (distSet.size < 4) {
          const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
          const candidate = Math.max(2, sum + delta);
          distSet.add(candidate);
        }
        const options = Array.from(distSet).sort(() => Math.random() - 0.5);

        list.push({
          id: qId,
          type: 'rods',
          cpaStage: 'concrete',
          promptId: `Hitung gabungan Batang ${rodA} (merah-biru) dan Batang ${rodB}:`,
          promptEn: `Count the sum of Rod ${rodA} (red-blue) and Rod ${rodB}:`,
          hintId: `Hitung total segmen warna merah dan biru bergantian. ${rodA} ditambah ${rodB}.`,
          hintEn: `Count the alternating red and blue sections. ${rodA} plus ${rodB}.`,
          storyContextId: `Kelinci Petualang menemukan dua batang kayu ajaib di Hutan Sensorik.`,
          storyContextEn: `The Adventurer Bunny found two magical rods in the Sensory Forest.`,
          visualRodA: rodA,
          visualRodB: rodB,
          correctAnswer: sum,
          options,
          explanationId: `Batang ${rodA} ditambah Batang ${rodB} menghasilkan tepat ${sum} segmen satuan.`,
          explanationEn: `Rod ${rodA} plus Rod ${rodB} equals exactly ${sum} unit segments.`,
          difficulty,
        });
      } else if (type === 'beads') {
        // Golden Beads Place Value
        const hundreds = difficulty === 'easy' ? 1 : Math.floor(Math.random() * 4) + 1;
        const tens = Math.floor(Math.random() * 7) + 1;
        const units = Math.floor(Math.random() * 9) + 1;
        const total = hundreds * 100 + tens * 10 + units;

        const distSet = new Set<number>([total]);
        while (distSet.size < 4) {
          const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 4) + 1) * 10;
          distSet.add(Math.max(10, total + delta));
        }
        const options = Array.from(distSet).sort(() => Math.random() - 0.5);

        list.push({
          id: qId,
          type: 'beads',
          cpaStage: 'concrete',
          promptId: `Berapa nilai total dari ${hundreds} Lempeng Ratusan, ${tens} Batang Puluhan, dan ${units} Manik Satuan?`,
          promptEn: `What is the total value of ${hundreds} Hundred square, ${tens} Ten bars, and ${units} Unit beads?`,
          hintId: `${hundreds}×100 + ${tens}×10 + ${units}×1 = ?`,
          hintEn: `${hundreds}×100 + ${tens}×10 + ${units}×1 = ?`,
          storyContextId: `Di peti harta karun kuil, tersimpan kumpulan manik emas berkilau.`,
          storyContextEn: `In the temple treasure chest, golden beads are glowing.`,
          beadsHundreds: hundreds,
          beadsTens: tens,
          beadsUnits: units,
          correctAnswer: total,
          options,
          explanationId: `${hundreds}00 + ${tens}0 + ${units} = ${total}`,
          explanationEn: `${hundreds}00 + ${tens}0 + ${units} = ${total}`,
          difficulty,
        });
      } else if (type === 'missing_op') {
        // Missing Operator: +, -, *
        const ops = ['+', '-', '×'];
        const chosenOp = ops[Math.floor(Math.random() * ops.length)];
        let a = 0;
        let b = 0;
        let result = 0;

        if (chosenOp === '+') {
          a = Math.floor(Math.random() * 30) + 10;
          b = Math.floor(Math.random() * 20) + 5;
          result = a + b;
        } else if (chosenOp === '-') {
          a = Math.floor(Math.random() * 40) + 20;
          b = Math.floor(Math.random() * 15) + 5;
          result = a - b;
        } else {
          a = Math.floor(Math.random() * 9) + 2;
          b = Math.floor(Math.random() * 8) + 2;
          result = a * b;
        }

        list.push({
          id: qId,
          type: 'missing_op',
          cpaStage: 'abstract',
          promptId: `Tentukan operator yang hilang: ${a} [ ? ] ${b} = ${result}`,
          promptEn: `Determine the missing operator: ${a} [ ? ] ${b} = ${result}`,
          hintId: `Uji coba apakah nilai ${a} membesar atau mengecil menjadi ${result}.`,
          hintEn: `Check if ${a} becomes larger or smaller to reach ${result}.`,
          correctAnswer: chosenOp,
          options: ['+', '-', '×', '÷'],
          explanationId: `Operasi yang benar adalah ${a} ${chosenOp} ${b} = ${result}`,
          explanationEn: `The correct operation is ${a} ${chosenOp} ${b} = ${result}`,
          difficulty,
        });
      } else if (type === 'sequence') {
        // Arithmetic Progression: e.g. 3, 7, 11, 15, [ ? ]
        const start = Math.floor(Math.random() * 10) + 2;
        const step = Math.floor(Math.random() * 6) + 2;
        const seq = [start, start + step, start + step * 2, start + step * 3];
        const nextVal = start + step * 4;

        const distSet = new Set<number>([nextVal]);
        while (distSet.size < 4) {
          const delta = (Math.random() > 0.5 ? 1 : -1) * step;
          distSet.add(nextVal + delta + Math.floor(Math.random() * 3) - 1);
        }
        const options = Array.from(distSet).sort(() => Math.random() - 0.5);

        list.push({
          id: qId,
          type: 'sequence',
          cpaStage: 'abstract',
          promptId: `Lengkapi pola deret: ${seq.join(', ')}, [ ? ]`,
          promptEn: `Complete the sequence: ${seq.join(', ')}, [ ? ]`,
          hintId: `Setiap angka selalu bertambah ${step} dari angka sebelumnya!`,
          hintEn: `Each number increases by ${step} from the previous one!`,
          correctAnswer: nextVal,
          options,
          explanationId: `Pola lompatan adalah +${step}. Jadi ${seq[3]} + ${step} = ${nextVal}.`,
          explanationEn: `The pattern is +${step}. Therefore ${seq[3]} + ${step} = ${nextVal}.`,
          difficulty,
        });
      } else {
        // Speed Math / Word Problem
        const a = Math.floor(Math.random() * 25) + 5;
        const b = Math.floor(Math.random() * 25) + 5;
        const isAdd = Math.random() > 0.4;
        const ans = isAdd ? a + b : a * 2;

        const distSet = new Set<number>([ans]);
        while (distSet.size < 4) {
          distSet.add(ans + (Math.floor(Math.random() * 7) - 3) * 2);
        }
        const options = Array.from(distSet).sort(() => Math.random() - 0.5);

        list.push({
          id: qId,
          type: 'speed',
          cpaStage: 'abstract',
          promptId: isAdd ? `Hitung cepat: ${a} + ${b} = ?` : `Dua kali lipat dari ${a} adalah:`,
          promptEn: isAdd ? `Quick math: ${a} + ${b} = ?` : `Double of ${a} is:`,
          hintId: `Gunakan strategi pembulatan ke puluhan terdekat.`,
          hintEn: `Use rounding strategy to the nearest ten.`,
          correctAnswer: ans,
          options,
          explanationId: `${a} + ${b} = ${ans}`,
          explanationEn: `${a} + ${b} = ${ans}`,
          difficulty,
        });
      }
    }

    return list;
  }

  // Generate with Google Gemini API
  public static async generateWithGemini(
    type: string = 'rods',
    count: number = 4,
    difficulty: 'easy' | 'medium' | 'hard' = 'easy',
    theme: string = 'animals',
    apiKeyOverride?: string
  ): Promise<{ questions: GeneratedQuestion[]; fromAi: boolean }> {
    const key = apiKeyOverride || this.apiKey || process.env.GEMINI_API_KEY;

    if (!key) {
      // Fallback directly to procedural generator if no key configured
      return {
        questions: this.generateProceduralQuestions(type, count, difficulty),
        fromAi: false,
      };
    }

    try {
      const prompt = `You are an educational AI specialized in Early Math (Ages 4-9) using the Montessori Concrete-Pictorial-Abstract (CPA) methodology.
Generate exactly ${count} diverse and creative math challenge questions for children in JSON format.
Topic type: "${type}".
Thematic Realm: "${theme}" (space = rockets, stars, astronauts, planets; animals = safari bunnies, lions, birds; ocean = clownfish, turtles, pearls; cooking = pizza, cupcakes, cookies; fantasy = wizards, dragon gems, magic potions; montessori = classic colored rods and golden beads).
Difficulty: "${difficulty}".
Language: Bilingual (Indonesian and English). Zero math anxiety, playful RPG adventure tone with emojis.

Return ONLY a valid raw JSON array of objects with the exact schema:
[
  {
    "id": "gemini-1",
    "type": "${type}",
    "cpaStage": "${type === 'rods' || type === 'beads' ? 'concrete' : 'pictorial'}",
    "promptId": "Pertanyaan dalam Bahasa Indonesia yang ramah anak sesuai tema ${theme}",
    "promptEn": "Question in English for young learners matching ${theme}",
    "hintId": "Petunjuk membantu tanpa memberi jawaban langsung",
    "hintEn": "Supportive hint without giving away the direct answer",
    "storyContextId": "Konteks cerita petualangan seru sesuai tema ${theme} (1 kalimat)",
    "storyContextEn": "Short 1-sentence adventure story context",
    "visualRodA": 4, // integer if type is rods (1-10)
    "visualRodB": 3, // integer if type is rods (1-10)
    "beadsHundreds": 1, // integer if type is beads
    "beadsTens": 2, // integer if type is beads
    "beadsUnits": 5, // integer if type is beads
    "correctAnswer": 7, // the exact correct answer (number or string)
    "options": [5, 6, 7, 8], // array of 4 options containing the correctAnswer
    "explanationId": "Penjelasan singkat langkah pemecahan",
    "explanationEn": "Short step-by-step solution explanation",
    "difficulty": "${difficulty}"
  }
]`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.7,
              responseMimeType: 'application/json',
            },
          }),
        }
      );

      if (!response.ok) {
        console.warn(`Gemini API returned status ${response.status}. Using procedural generator.`);
        return {
          questions: this.generateProceduralQuestions(type, count, difficulty),
          fromAi: false,
        };
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        return {
          questions: this.generateProceduralQuestions(type, count, difficulty),
          fromAi: false,
        };
      }

      const parsed: GeneratedQuestion[] = JSON.parse(rawText);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return { questions: parsed, fromAi: true };
      }

      return {
        questions: this.generateProceduralQuestions(type, count, difficulty),
        fromAi: false,
      };
    } catch (error) {
      console.warn('Gemini generateContent error:', error);
      return {
        questions: this.generateProceduralQuestions(type, count, difficulty),
        fromAi: false,
      };
    }
  }
}
