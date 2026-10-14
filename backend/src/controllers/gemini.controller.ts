import { Request, Response } from 'express';
import { GeminiMathService } from '../services/gemini.service';

export const generateMathQuestions = async (req: Request, res: Response) => {
  try {
    const { type = 'rods', count = 4, difficulty = 'easy', theme = 'animals', apiKey } = req.body;

    const result = await GeminiMathService.generateWithGemini(
      String(type),
      Number(count) || 4,
      (difficulty as any) || 'easy',
      String(theme),
      apiKey ? String(apiKey) : undefined
    );

    return res.status(200).json({
      success: true,
      fromAi: result.fromAi,
      count: result.questions.length,
      data: result.questions,
    });
  } catch (error: any) {
    // Graceful fallback to guaranteed procedural questions
    const fallback = GeminiMathService.generateProceduralQuestions('rods', 4, 'easy');
    return res.status(200).json({
      success: true,
      fromAi: false,
      data: fallback,
      message: 'Generated using Montessori Procedural Math Engine',
    });
  }
};
