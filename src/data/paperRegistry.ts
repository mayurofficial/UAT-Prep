import { ExamData, TargetExam } from '@/types/utet';

import utet2025Data from './papers/utet_2025.json';
import utet2024Data from './papers/utet_2024.json';
import utet2023Data from './papers/utet_2023.json';
import utet2022Data from './papers/utet_2022.json';
import utet2021Data from './papers/utet_2021.json';
import utet2020Data from './papers/utet_2020.json';
import utet2019Data from './papers/utet_2019.json';
import lt2025Data from './papers/lt_2025.json';
import lt2021Data from './papers/lt_2021.json';

export type PaperCategory = 'OFFICIAL_PYQ' | 'MODEL_TEST';

export interface PaperMeta {
  id: string;
  targetExam: TargetExam;
  category: PaperCategory;
  year: string;
  title: string;
  badge: string;
  totalQuestions: number;
  durationMinutes: number;
  hasNegativeMarking: boolean;
  negativePenalty: number;
  sourceNote: string;
}

export const PAPERS_REGISTRY: Record<string, ExamData> = {
  // ==========================================
  // 1. OFFICIAL PREVIOUS YEAR PAPERS (PYQ)
  // (Authentic verified papers provided from real exams)
  // ==========================================
  utet_2025: {
    ...(utet2025Data as unknown as ExamData),
    category: 'OFFICIAL_PYQ',
    sourceNote: 'Official UBSE UTET-II Exam Paper (Set A - 2025 Exam)',
  },
  utet_2024: {
    ...(utet2024Data as unknown as ExamData),
    category: 'OFFICIAL_PYQ',
    sourceNote: 'Official UBSE UTET-II 2024 Exam Paper (Set C - 2024)',
  },
  utet_2023: {
    ...(utet2023Data as unknown as ExamData),
    category: 'OFFICIAL_PYQ',
    sourceNote: 'Official UBSE UTET-II 2023 Exam Paper (Set C - 2023)',
  },
  utet_2022: {
    ...(utet2022Data as unknown as ExamData),
    category: 'OFFICIAL_PYQ',
    sourceNote: 'Official UBSE UTET-II 2022 Exam Paper (Set B - 2022)',
  },
  utet_2021: {
    ...(utet2021Data as unknown as ExamData),
    category: 'OFFICIAL_PYQ',
    sourceNote: 'Official UBSE UTET-II 2021 Exam Paper (Set C - 2021)',
  },
  utet_2020: {
    ...(utet2020Data as unknown as ExamData),
    category: 'OFFICIAL_PYQ',
    sourceNote: 'Official UBSE UTET-II 2020 Exam Paper (Set A - 2020)',
  },
  utet_2019: {
    ...(utet2019Data as unknown as ExamData),
    category: 'OFFICIAL_PYQ',
    sourceNote: 'Official UBSE UTET-II 2019 Exam Paper (Set A - Nov 2019)',
  },

  // ==========================================
  // 2. MODEL MOCK TESTS & PRACTICE PAPERS
  // (Full-length practice tests for mock exam simulation)
  // ==========================================
  lt_2025: {
    ...(lt2025Data as unknown as ExamData),
    category: 'MODEL_TEST',
    sourceNote: 'UKSSSC LT Assistant Teacher 2025 Full Model Test (Latest Pattern)',
  },
  lt_2021_model: {
    ...(lt2021Data as unknown as ExamData),
    category: 'MODEL_TEST',
    sourceNote: 'UKSSSC LT Grade Model Test (Based on 2021 Selection Pattern)',
  },
};

export const PAPERS_LIST: PaperMeta[] = [
  // ==========================================
  // 1. OFFICIAL PREVIOUS YEAR PAPERS (PYQ)
  // ==========================================
  {
    id: 'utet_2025',
    targetExam: 'UTET',
    category: 'OFFICIAL_PYQ',
    year: '2025',
    title: 'UTET-II 2025 (Official Exam Paper)',
    badge: 'Official PYQ (Set A)',
    totalQuestions: 150,
    durationMinutes: 150,
    hasNegativeMarking: false,
    negativePenalty: 0,
    sourceNote: 'Authentic UBSE Exam Paper 2025 (Set A)',
  },
  {
    id: 'utet_2024',
    targetExam: 'UTET',
    category: 'OFFICIAL_PYQ',
    year: '2024',
    title: 'UTET-II 2024 (Official Exam Paper)',
    badge: 'Official PYQ (Set C)',
    totalQuestions: 150,
    durationMinutes: 150,
    hasNegativeMarking: false,
    negativePenalty: 0,
    sourceNote: 'Authentic UBSE Exam Paper from 2024 (Set C)',
  },
  {
    id: 'utet_2023',
    targetExam: 'UTET',
    category: 'OFFICIAL_PYQ',
    year: '2023',
    title: 'UTET-II 2023 (Official Exam Paper)',
    badge: 'Official PYQ (Set C)',
    totalQuestions: 150,
    durationMinutes: 150,
    hasNegativeMarking: false,
    negativePenalty: 0,
    sourceNote: 'Authentic UBSE Exam Paper from 2023 (Set C)',
  },
  {
    id: 'utet_2022',
    targetExam: 'UTET',
    category: 'OFFICIAL_PYQ',
    year: '2022',
    title: 'UTET-II 2022 (Official Exam Paper)',
    badge: 'Official PYQ (Set B)',
    totalQuestions: 150,
    durationMinutes: 150,
    hasNegativeMarking: false,
    negativePenalty: 0,
    sourceNote: 'Authentic UBSE Exam Paper from 2022 (Set B)',
  },
  {
    id: 'utet_2021',
    targetExam: 'UTET',
    category: 'OFFICIAL_PYQ',
    year: '2021',
    title: 'UTET-II 2021 (Official Exam Paper)',
    badge: 'Official PYQ (Set C)',
    totalQuestions: 150,
    durationMinutes: 150,
    hasNegativeMarking: false,
    negativePenalty: 0,
    sourceNote: 'Authentic UBSE Exam Paper from 2021 (Set C)',
  },
  {
    id: 'utet_2020',
    targetExam: 'UTET',
    category: 'OFFICIAL_PYQ',
    year: '2020',
    title: 'UTET-II 2020 (Official Exam Paper)',
    badge: 'Official PYQ (Set A)',
    totalQuestions: 150,
    durationMinutes: 150,
    hasNegativeMarking: false,
    negativePenalty: 0,
    sourceNote: 'Authentic UBSE Exam Paper from 2020',
  },
  {
    id: 'utet_2019',
    targetExam: 'UTET',
    category: 'OFFICIAL_PYQ',
    year: '2019',
    title: 'UTET-II 2019 (Official Exam Paper)',
    badge: 'Official PYQ (Set A)',
    totalQuestions: 150,
    durationMinutes: 150,
    hasNegativeMarking: false,
    negativePenalty: 0,
    sourceNote: 'Authentic UBSE Exam Paper from Nov 2019',
  },

  // ==========================================
  // 2. MODEL MOCK TESTS & PRACTICE PAPERS
  // ==========================================
  {
    id: 'lt_2025',
    targetExam: 'LT',
    category: 'MODEL_TEST',
    year: '2025',
    title: 'UKSSSC LT Grade 2025 Model Test (Latest Pattern)',
    badge: 'Model Test',
    totalQuestions: 100,
    durationMinutes: 120,
    hasNegativeMarking: true,
    negativePenalty: 0.25,
    sourceNote: '100Q Model Mock Paper with -0.25 Negative Marking',
  },
  {
    id: 'lt_2021_model',
    targetExam: 'LT',
    category: 'MODEL_TEST',
    year: '2021',
    title: 'UKSSSC LT Grade Model Test (2021 Pattern)',
    badge: 'Model Test',
    totalQuestions: 100,
    durationMinutes: 120,
    hasNegativeMarking: true,
    negativePenalty: 0.25,
    sourceNote: 'Pedagogy, UK GK & Science Specialization Mock Paper',
  },
];

export function getPapersForExam(exam: TargetExam): PaperMeta[] {
  return PAPERS_LIST.filter(p => p.targetExam === exam);
}

export function getOfficialPyqs(exam: TargetExam): PaperMeta[] {
  return PAPERS_LIST.filter(p => p.targetExam === exam && p.category === 'OFFICIAL_PYQ');
}

export function getModelTests(exam: TargetExam): PaperMeta[] {
  return PAPERS_LIST.filter(p => p.targetExam === exam && p.category === 'MODEL_TEST');
}

export function getPaperData(paperId: string): ExamData {
  return PAPERS_REGISTRY[paperId] || PAPERS_REGISTRY['utet_2025'];
}
