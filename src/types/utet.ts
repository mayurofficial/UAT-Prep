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
}

export interface ExamData {
  exam: string;
  targetExam: string;
  candidate: string;
  totalQuestions: number;
  languages: string[];
  sections: ExamSection[];
  questions: QuestionItem[];
}

export type AppMode = 'practice' | 'exam' | 'handbook' | 'result';
export type LanguageMode = 'bilingual' | 'hindi' | 'english';

export interface UserAnswerState {
  selectedOption: string | null;
  isMarkedForReview: boolean;
  isBookmarked: boolean;
  visited: boolean;
  timeSpentSec: number;
}

export interface ExamResults {
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  skipped: number;
  score: number;
  percentage: number;
  timeTakenSec: number;
  sectionScores: {
    section: string;
    sectionHindi: string;
    total: number;
    correct: number;
    incorrect: number;
    skipped: number;
  }[];
}
