import { ExamData, TargetExam } from '@/types/utet';

import utet2024Data from './papers/utet_2024_2025.json';
import utet2023Data from './papers/utet_2023.json';
import utet2022Data from './papers/utet_2022.json';
import utet2021Data from './papers/utet_2021.json';
import utet2020Data from './papers/utet_2020.json';
import lt2024Data from './papers/lt_2024_2025.json';
import lt2021Data from './papers/lt_2021.json';

export interface PaperMeta {
  id: string;
  targetExam: TargetExam;
  year: string;
  title: string;
  badge: string;
  totalQuestions: number;
  durationMinutes: number;
  hasNegativeMarking: boolean;
  negativePenalty: number;
}

export const PAPERS_REGISTRY: Record<string, ExamData> = {
  utet_2024_2025: utet2024Data as unknown as ExamData,
  utet_2023: utet2023Data as unknown as ExamData,
  utet_2022: utet2022Data as unknown as ExamData,
  utet_2021: utet2021Data as unknown as ExamData,
  utet_2020: utet2020Data as unknown as ExamData,
  lt_2024_2025: lt2024Data as unknown as ExamData,
  lt_2021: lt2021Data as unknown as ExamData,
};

export const PAPERS_LIST: PaperMeta[] = [
  {
    id: 'utet_2024_2025',
    targetExam: 'UTET',
    year: '2024–2025',
    title: 'UTET-II 2024–2025 (Official Exam Paper)',
    badge: 'Latest Official',
    totalQuestions: 150,
    durationMinutes: 150,
    hasNegativeMarking: false,
    negativePenalty: 0,
  },
  {
    id: 'utet_2023',
    targetExam: 'UTET',
    year: '2023',
    title: 'UTET-II 2023 (Official PYQ Paper)',
    badge: 'PYQ 2023',
    totalQuestions: 150,
    durationMinutes: 150,
    hasNegativeMarking: false,
    negativePenalty: 0,
  },
  {
    id: 'utet_2022',
    targetExam: 'UTET',
    year: '2022',
    title: 'UTET-II 2022 (Official PYQ Paper)',
    badge: 'PYQ 2022',
    totalQuestions: 150,
    durationMinutes: 150,
    hasNegativeMarking: false,
    negativePenalty: 0,
  },
  {
    id: 'utet_2021',
    targetExam: 'UTET',
    year: '2021',
    title: 'UTET-II 2021 (Official PYQ Paper)',
    badge: 'PYQ 2021',
    totalQuestions: 150,
    durationMinutes: 150,
    hasNegativeMarking: false,
    negativePenalty: 0,
  },
  {
    id: 'utet_2020',
    targetExam: 'UTET',
    year: '2020',
    title: 'UTET-II 2020 (Official PYQ Paper)',
    badge: 'PYQ 2020',
    totalQuestions: 150,
    durationMinutes: 150,
    hasNegativeMarking: false,
    negativePenalty: 0,
  },
  {
    id: 'lt_2024_2025',
    targetExam: 'LT',
    year: '2024–2025',
    title: 'UKSSSC LT Grade 2024–2025 (Pattern Model)',
    badge: 'Latest Model',
    totalQuestions: 100,
    durationMinutes: 120,
    hasNegativeMarking: true,
    negativePenalty: 0.25,
  },
  {
    id: 'lt_2021',
    targetExam: 'LT',
    year: '2021',
    title: 'UKSSSC LT Grade 2021 (Official Selection PYQ)',
    badge: 'PYQ 2021',
    totalQuestions: 100,
    durationMinutes: 120,
    hasNegativeMarking: true,
    negativePenalty: 0.25,
  },
];

export function getPapersForExam(exam: TargetExam): PaperMeta[] {
  return PAPERS_LIST.filter(p => p.targetExam === exam);
}

export function getPaperData(paperId: string): ExamData {
  return PAPERS_REGISTRY[paperId] || PAPERS_REGISTRY['utet_2024_2025'];
}
