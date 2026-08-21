'use client';

import React from 'react';
import styles from './TimerBar.module.css';
import { Timer, Pause, Play, Send, AlertCircle } from 'lucide-react';
import { TargetExam } from '@/types/utet';

interface TimerBarProps {
  secondsLeft: number;
  isPaused: boolean;
  onTogglePause: () => void;
  onSubmitExam: () => void;
  answeredCount: number;
  markedCount: number;
  totalQuestions: number;
  targetExam: TargetExam;
  hasNegativeMarking: boolean;
}

export const TimerBar: React.FC<TimerBarProps> = ({
  secondsLeft,
  isPaused,
  onTogglePause,
  onSubmitExam,
  answeredCount,
  totalQuestions,
  targetExam,
  hasNegativeMarking
}) => {
  const h = Math.floor(secondsLeft / 3600);
  const m = Math.floor((secondsLeft % 3600) / 60);
  const s = secondsLeft % 60;
  const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  const isLow = secondsLeft <= 600;

  return (
    <div className={styles.timer}>
      <div className={styles.timerInner}>
        <div className={styles.left}>
          <div className={`${styles.clock} ${isLow ? styles.clockWarning : ''}`}>
            <Timer size={16} /> {time}
          </div>
          <button className={styles.pauseBtn} onClick={onTogglePause}>
            {isPaused ? <Play size={13} /> : <Pause size={13} />}
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          {hasNegativeMarking && (
            <div className={styles.negativeMarkingBadge}>
              <AlertCircle size={13} />
              <span>-0.25 Negative Marking Active</span>
            </div>
          )}
        </div>

        <div className={styles.stats}>
          <span className={`${styles.stat} ${styles.statGreen}`}>
            {answeredCount} answered
          </span>
          <span className={styles.stat}>
            {totalQuestions - answeredCount} remaining
          </span>
          <span className={styles.examIndicator}>
            {targetExam === 'UTET' ? 'UTET-II Test' : 'UKSSSC LT Mock'}
          </span>
        </div>

        <button className={styles.submitBtn} onClick={onSubmitExam}>
          <Send size={14} /> Submit Test
        </button>
      </div>
    </div>
  );
};
