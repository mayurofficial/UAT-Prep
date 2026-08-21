'use client';

import React from 'react';
import { QuestionItem, AppMode, LanguageMode, UserAnswerState, TargetExam } from '@/types/utet';
import styles from './QuestionCard.module.css';
import { ConceptCardView } from './ConceptCardView';
import { Star, ChevronLeft, ChevronRight, Flag, RotateCcw, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { soundManager } from '@/utils/audioFeedback';

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

  const handleOptionClick = (optId: string) => {
    onSelectOption(optId);
    if (isPractice) {
      if (optId === question.correctAnswer) {
        soundManager.playCorrect();
      } else {
        soundManager.playIncorrect();
      }
    } else {
      soundManager.playClick();
    }
  };

  const handleNextClick = () => {
    soundManager.playNavigation();
    onNext();
  };

  const handlePrevClick = () => {
    soundManager.playNavigation();
    onPrev();
  };

  return (
    <div className={styles.card}>
      {/* Top row: question number + part / topic + bookmark */}
      <div className={styles.topRow}>
        <div className={styles.tagsGroup}>
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
          <Star size={13} fill={userState.isBookmarked ? 'currentColor' : 'none'} />
          <span>{userState.isBookmarked ? 'Saved' : 'Save'}</span>
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
            <button
              key={opt.id}
              className={cls}
              onClick={() => handleOptionClick(opt.id)}
              aria-label={`Option ${opt.id}: ${opt.english}`}
            >
              <div className={styles.circle}>{opt.id}</div>
              <div className={styles.optText}>
                {language !== 'hindi' && <div className={styles.optEn}>{opt.english}</div>}
                {language !== 'english' && <div className={styles.optHi}>{opt.hindi}</div>}
              </div>
              {isPractice && hasAnswered && isCorrectOpt && (
                <CheckCircle2 size={18} color="#10b981" className={styles.statusIcon} />
              )}
              {isPractice && hasAnswered && isSelected && !isCorrectOpt && (
                <XCircle size={18} color="#ef4444" className={styles.statusIcon} />
              )}
            </button>
          );
        })}
      </div>

      {/* Practice Mode Live Scoring Feedback */}
      {isPractice && hasAnswered && (
        <div className={styles.feedbackRow}>
          {isCorrect ? (
            <div className={styles.feedbackCorrect}>
              <CheckCircle2 size={16} />
              <span>Correct Answer! +1.00 Mark awarded</span>
            </div>
          ) : (
            <div className={styles.feedbackIncorrect}>
              <AlertCircle size={16} />
              <span>
                {hasNegativeMarking
                  ? 'Incorrect! -0.25 Negative penalty applied (LT Pattern)'
                  : 'Incorrect! (0 Mark penalty in UTET Eligibility Pattern)'}
              </span>
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

      {/* Desktop & Tablet In-Card Controls */}
      <div className={styles.controls}>
        <div className={styles.leftControls}>
          <button
            className={`${styles.reviewBtn} ${userState.isMarkedForReview ? styles.reviewActive : ''}`}
            onClick={onToggleMarkReview}
          >
            <Flag size={13} />
            <span>{userState.isMarkedForReview ? 'Marked for Review' : 'Mark for Review'}</span>
          </button>

          {hasAnswered && (
            <button className={styles.clearBtn} onClick={onClearResponse}>
              <RotateCcw size={12} />
              <span>Clear Choice</span>
            </button>
          )}
        </div>

        <div className={styles.rightControls}>
          <button
            className={styles.navBtn}
            onClick={handlePrevClick}
            disabled={!hasPrev}
            aria-label="Previous question"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>
          <button
            className={`${styles.navBtn} ${styles.navPrimary}`}
            onClick={handleNextClick}
            disabled={!hasNext}
            aria-label="Next question"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
