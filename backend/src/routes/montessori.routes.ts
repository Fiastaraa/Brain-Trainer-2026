import { Router } from 'express';
import { getModules, getBadges } from '../controllers/module.controller';
import {
  saveRecord,
  getStudentProgress,
  togglePreferences,
} from '../controllers/record.controller';
import { generateMathQuestions } from '../controllers/gemini.controller';

const router = Router();

// Core endpoints from Montessori blueprint
router.get('/modules', getModules);
router.get('/badges', getBadges);
router.post('/records', saveRecord);
router.get('/progress', getStudentProgress);
router.get('/progress/:student_id', getStudentProgress);
router.put('/preferences/toggle', togglePreferences);

// AI Gemini Dynamic Question Generator Endpoint
router.post('/gemini/generate-questions', generateMathQuestions);
router.get('/gemini/questions', generateMathQuestions);

export default router;
