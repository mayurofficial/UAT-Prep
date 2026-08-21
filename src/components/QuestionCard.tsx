'use client';

import React from 'react';
import { QuestionItem, AppMode, LanguageMode, UserAnswerState, TargetExam } from '@/types/utet';
import styles from './QuestionCard.module.css';
import { ConceptCardView } from './ConceptCardView';
import { Star, ChevronLeft, ChevronRight, Flag, RotateCcw, CheckCircle2, XCircle, Tag, AlertCircle } from 'lucide-react';

interface QuestionCardProps {
  question: QuestionItem;
  totalQuestions: number;
  targetExam: TargetExam;
  hasNegativeMarking: boolean;
  mode: AppMode;
  language: LanguageMode;
  userState: UserAnswerState;
  onSelectOption: (optionId: string) => void;
  onToggleMarkReview: () => void;
  onToggleBookmark: () => void;
  onClearResponse: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  fontSize: 'small' | 'normal' | 'large';
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  totalQuestions,
  targetExam,
  hasNegativeMarking,
  mode,
  language,
  userState,
  onSelectOption,
  onToggleMarkReview,
  onToggleBookmark,
  onClearResponse,
  onNext,
  onPrev,
  hasPrev,
  hasNext,
  fontSize,
}) => {
  const isPractice = mode === 'practice';
  const hasAnswered = userState.selectedOption !== null;
  const isCorrect = userState.selectedOption === question.correctAnswer;

  const sizeClass = fontSize === 'small' ? styles.fontSmall : fontSize === 'large' ? styles.fontLarge : '';

  return (
    <div className={styles.card}>
      {/* Top row: question number + part / topic + bookmark */}
      <div className={styles.topRow}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span className={styles.qNum}>
            Q {question.questionNumber} / {totalQuestions}
          </span>
          {question.part && (
            <span className={styles.partBadge}>{question.part}</span>
          )}
          <span className={styles.sectionBadge}>{question.section}</span>
          {question.difficulty && (
            <span className={`${styles.diffBadge} ${question.difficulty === 'Easy' ? styles.diffEasy : question.difficulty === 'Hard' ? styles.diffHard : styles.diffMed}`}>
              {question.difficulty}
            </span>
          )}
        </div>

        <button
          className={`${styles.bookmark} ${userState.isBookmarked ? styles.bookmarkActive : ''}`}
          onClick={onToggleBookmark}
          aria-label={userState.isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
        >
          <Star size={14} fill={userState.isBookmarked ? 'currentColor' : 'none'} />
          {userState.isBookmarked ? 'Saved' : 'Save'}
        </button>
      </div>

      {/* Question text */}
      <div className={`${styles.question} ${sizeClass}`}>
        {language !== 'hindi' && (
          <div className={styles.qEn}>{question.question.english}</div>
        )}
        {language !== 'english' && (
          <div className={styles.qHi}>{question.question.hindi}</div>
        )}
      </div>

      {/* Options */}
      <div className={styles.options}>
        {question.options.map((opt) => {
          const isSelected = userState.selectedOption === opt.id;
          const isCorrectOpt = opt.id === question.correctAnswer;

          let cls = styles.option;
          if (isSelected) cls += ` ${styles.optSelected}`;
          if (isPractice && hasAnswered) {
            if (isCorrectOpt) cls += ` ${styles.optCorrect}`;
            else if (isSelected) cls += ` ${styles.optWrong}`;
          }

          return (
            <button key={opt.id} className={cls} onClick={() => onSelectOption(opt.id)}>
              <div className={styles.circle}>{opt.id}</div>
              <div className={styles.optText}>
                {language !== 'hindi' && <div className={styles.optEn}>{opt.english}</div>}
                {language !== 'english' && <div className={styles.optHi}>{opt.hindi}</div>}
              </div>
              {isPractice && hasAnswered && isCorrectOpt && (
                <CheckCircle2 size={18} color="var(--green)" className={styles.statusIcon} />
              )}
              {isPractice && hasAnswered && isSelected && !isCorrectOpt && (
                <XCircle size={18} color="var(--red)" className={styles.statusIcon} />
              )}
            </button>
          );
        })}
      </div>

      {/* Practice Mode Live Scoring Feedback for Negative Marking */}
      {isPractice && hasAnswered && (
        <div style={{ marginTop: 10 }}>
          {isCorrect ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--green)', fontSize: '13px', fontWeight: 700 }}>
              <CheckCircle2 size={16} /> Correct! +1.00 Mark
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#d93025', fontSize: '13px', fontWeight: 700 }}>
              <AlertCircle size={16} />
              {hasNegativeMarking ? 'Incorrect! -0.25 Negative Penalty Applied' : 'Incorrect! (0 Mark in UTET)'}
            </div>
          )}
        </div>
      )}

      {/* Concept card in practice mode */}
      {isPractice && hasAnswered && (
        <ConceptCardView
          concept={question.conceptCard}
          explanation={question.explanation}
          correctOptionLetter={question.correctAnswer}
          language={language}
        />
      )}

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.leftControls}>
          <button
            className={`${styles.reviewBtn} ${userState.isMarkedForReview ? styles.reviewActive : ''}`}
            onClick={onToggleMarkReview}
          >
            <Flag size={13} />
            {userState.isMarkedForReview ? 'Marked' : 'Review'}
          </button>
          {hasAnswered && (
            <button className={styles.clearBtn} onClick={onClearResponse}>
              <RotateCcw size={12} style={{ display: 'inline', marginRight: 3 }} />
              Clear
            </button>
          )}
        </div>

        <div className={styles.rightControls}>
          <button className={styles.navBtn} onClick={onPrev} disabled={!hasPrev}>
            <ChevronLeft size={16} /> Previous
          </button>
          <button className={`${styles.navBtn} ${styles.navPrimary}`} onClick={onNext} disabled={!hasNext}>
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
