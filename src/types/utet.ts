export type TargetExam = 'UTET' | 'LT';

export interface QuestionOption {
  id: string; // 'A' | 'B' | 'C' | 'D'
  english: string;
  hindi: string;
}

export interface ConceptCard {
  topic: string;
  keyConceptEnglish: string;
  keyConceptHindi: string;
  mnemonicOrTrick: string;
  trapAlert: string;
}

export interface QuestionItem {
  id: string;
  questionNumber: number;
  section: string;
  sectionHindi: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  part?: 'Part 1 (General)' | 'Part 2 (Subject)';
  question: {
    english: string;
    hindi: string;
  };
  options: QuestionOption[];
  correctAnswer: string;
  explanation: {
    english: string;
    hindi: string;
  };
  conceptCard: ConceptCard;
}

export interface ExamSection {
  id: string;
  name: string;
  nameHindi: string;
  questionRange: string;
  total: number;
  color: string;
  part?: string;
}

export interface ExamData {
  paperId?: string;
  year?: string;
  exam: string;
  targetExam: TargetExam;
  examTitle: string;
  examSubtitle: string;
  candidate: string;
  totalQuestions: number;
  totalMarks: number;
  durationMinutes: number;
  hasNegativeMarking: boolean;
  negativeMarkingPenalty: number;
  languages: string[];
  sections: ExamSection[];
  questions: QuestionItem[];
}

export type AppMode = 'practice' | 'exam' | 'handbook' | 'guide' | 'result';
export type LanguageMode = 'bilingual' | 'hindi' | 'english';

export interface UserAnswerState {
  selectedOption: string | null;
  isMarkedForReview: boolean;
  isBookmarked: boolean;
  visited: boolean;
  timeSpentSec: number;
}

export interface ExamResults {
  paperId?: string;
  year?: string;
  paperTitle?: string;
  targetExam: TargetExam;
  totalQuestions: number;
  totalMarks: number;
  hasNegativeMarking: boolean;
  negativeMarkingPenalty: number;
  attempted: number;
  correct: number;
  incorrect: number;
  skipped: number;
  grossScore: number;
  negativeDeduction: number;
  netScore: number;
  percentage: number;
  timeTakenSec: number;
  isQualifiedOrTopTier: boolean;
  sectionScores: {
    section: string;
    sectionHindi: string;
    total: number;
    correct: number;
    incorrect: number;
    skipped: number;
    score: number;
  }[];
}

