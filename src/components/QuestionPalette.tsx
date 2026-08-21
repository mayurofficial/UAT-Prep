'use client';

import React, { useState } from 'react';
import { QuestionItem, UserAnswerState } from '@/types/utet';
import styles from './QuestionPalette.module.css';
import { LayoutGrid, Star } from 'lucide-react';

interface QuestionPaletteProps {
  questions: QuestionItem[];
  currentIndex: number;
  userStates: Record<number, UserAnswerState>;
  onSelectQuestion: (index: number) => void;
}

type Filter = 'all' | 'unanswered' | 'marked' | 'bookmarked';

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  questions, currentIndex, userStates, onSelectQuestion,
}) => {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = questions.map((q, idx) => ({ q, idx })).filter(({ idx }) => {
    const s = userStates[idx];
    if (!s) return filter === 'all' || filter === 'unanswered';
    if (filter === 'unanswered') return s.selectedOption === null;
    if (filter === 'marked') return s.isMarkedForReview;
    if (filter === 'bookmarked') return s.isBookmarked;
    return true;
  });

  return (
    <div className={styles.palette}>
      <div className={styles.paletteTitle}>
        <LayoutGrid size={14} /> Questions
      </div>

      <div className={styles.filters}>
        {(['all', 'unanswered', 'marked', 'bookmarked'] as Filter[]).map((f) => (
          <button
            key={f}
            className={`${styles.chip} ${filter === f ? styles.chipActive : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : f === 'unanswered' ? 'Pending' : f === 'marked' ? 'Review' : 'Saved'}
          </button>
        ))}
      </div>

      <div className={styles.legend}>
        <span className={styles.legendItem}><span className={`${styles.dot} ${styles.dotAnswered}`} /> Answered</span>
        <span className={styles.legendItem}><span className={`${styles.dot} ${styles.dotMarked}`} /> Review</span>
        <span className={styles.legendItem}><span className={`${styles.dot} ${styles.dotVisited}`} /> Skipped</span>
      </div>

      <div className={styles.grid}>
        {filtered.map(({ q, idx }) => {
          const s = userStates[idx] || { selectedOption: null, isMarkedForReview: false, isBookmarked: false, visited: false, timeSpentSec: 0 };
          let cls = styles.qBtn;
          if (currentIndex === idx) cls += ` ${styles.current}`;
          if (s.isMarkedForReview) cls += ` ${styles.marked}`;
          else if (s.selectedOption) cls += ` ${styles.answered}`;
          else if (s.visited) cls += ` ${styles.visited}`;
          else cls += ` ${styles.unvisited}`;

          return (
            <button key={q.id} className={cls} onClick={() => onSelectQuestion(idx)}>
              {q.questionNumber}
              {s.isBookmarked && <Star size={8} className={styles.star} fill="currentColor" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
