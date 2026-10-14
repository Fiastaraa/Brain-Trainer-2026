import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

// Fallback seed modules if database is initializing
const DEFAULT_MODULES = [
  {
    id: 'mod-1',
    code: 'number_rods',
    nameId: 'Batang Angka - Penjumlahan',
    nameEn: 'Number Rods - Addition',
    descriptionId: 'Sensori konkret batang warna bergantian untuk memahami kuantitas 1-10 dan penjumlahan visual.',
    descriptionEn: 'Sensory concrete colored alternating rods for understanding quantities 1-10 and visual addition.',
    category: 'concrete_montessori',
    level: 1,
    icon: 'Ruler',
  },
  {
    id: 'mod-2',
    code: 'golden_beads',
    nameId: 'Manik Emas - Nilai Tempat',
    nameEn: 'Golden Beads - Place Value',
    descriptionId: 'Konsep nilai tempat: Satuan, Puluhan, Ratusan, dan Ribuan dengan manik emas interaktif.',
    descriptionEn: 'Place value concept: Units, Tens, Hundreds, and Thousands with interactive golden beads.',
    category: 'concrete_montessori',
    level: 2,
    icon: 'Coins',
  },
  {
    id: 'mod-3',
    code: 'mental_math',
    nameId: 'Latihan Berhitung Mental',
    nameEn: 'Mental Math Challenge',
    descriptionId: 'Pengembangan kelincahan berhitung cepat deduksi matematika tingkat 1 hingga 3.',
    descriptionEn: 'Fast mental calculation agility development across levels 1 to 3.',
    category: 'mental_math',
    level: 3,
    icon: 'Zap',
  },
  {
    id: 'mod-4',
    code: 'sandbox_canvas',
    nameId: 'Sandbox Eksplorasi Bebas',
    nameEn: 'Math Sandbox Canvas',
    descriptionId: 'Ruang eksplorasi bebas memanipulasi manik dan batang angka tanpa batasan waktu.',
    descriptionEn: 'Freeform exploratory canvas to manipulate beads and number rods without time pressure.',
    category: 'sandbox',
    level: 1,
    icon: 'Palette',
  },
];

export const getModules = async (req: Request, res: Response) => {
  try {
    const modules = await prisma.gameModule.findMany({
      where: { isActive: true },
      orderBy: { level: 'asc' },
    });
    return res.status(200).json({
      success: true,
      data: modules.length > 0 ? modules : DEFAULT_MODULES,
    });
  } catch (error) {
    // Graceful fallback to default seed data if DB table is empty/connecting
    return res.status(200).json({
      success: true,
      data: DEFAULT_MODULES,
      fromFallback: true,
    });
  }
};

export const getBadges = async (req: Request, res: Response) => {
  const DEFAULT_BADGES = [
    {
      id: 'badge-1',
      code: 'first_step',
      nameId: 'Langkah Pertama',
      nameEn: 'First Step',
      descriptionId: 'Menyelesaikan sesi latihan matematika pertama.',
      descriptionEn: 'Completed the first math training session.',
      icon: 'Sparkles',
      rewardPoints: 50,
    },
    {
      id: 'badge-2',
      code: 'streak_master',
      nameId: 'Konsistensi 5 Hari',
      nameEn: '5-Day Streak Master',
      descriptionId: 'Berlatih konsisten setiap hari selama 5 hari berturut-turut.',
      descriptionEn: 'Trained consistently every day for 5 days.',
      icon: 'Flame',
      rewardPoints: 150,
    },
    {
      id: 'badge-3',
      code: 'accuracy_ace',
      nameId: 'Akurasi 100%',
      nameEn: 'Accuracy Ace',
      descriptionId: 'Menyelesaikan satu modul penuh dengan akurasi 100%.',
      descriptionEn: 'Completed an entire module with 100% accuracy.',
      icon: 'Award',
      rewardPoints: 200,
    },
    {
      id: 'badge-4',
      code: 'montessori_expert',
      nameId: 'Master Batang Angka',
      nameEn: 'Number Rods Master',
      descriptionId: 'Menguasai seluruh level penjumlahan batang angka konkret.',
      descriptionEn: 'Mastered all levels of concrete number rod additions.',
      icon: 'Trophy',
      rewardPoints: 300,
    },
  ];

  try {
    const badges = await prisma.badgeAchievement.findMany();
    return res.status(200).json({
      success: true,
      data: badges.length > 0 ? badges : DEFAULT_BADGES,
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      data: DEFAULT_BADGES,
      fromFallback: true,
    });
  }
};
