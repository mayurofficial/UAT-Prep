'use client';

import React from 'react';
import styles from './TimerBar.module.css';
import { Timer, Pause, Play, Send } from 'lucide-react';

interface TimerBarProps {
  secondsLeft: number;
  isPaused: boolean;
  onTogglePause: () => void;
  onSubmitExam: () => void;
  answeredCount: number;
  markedCount: number;
  totalQuestions: number;
}

export const TimerBar: React.FC<TimerBarProps> = ({
  secondsLeft, isPaused, onTogglePause, onSubmitExam,
  answeredCount, totalQuestions,
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
        </div>

        <div className={styles.stats}>
          <span className={`${styles.stat} ${styles.statGreen}`}>
            {answeredCount} answered
          </span>
          <span className={styles.stat}>
            {totalQuestions - answeredCount} remaining
          </span>
        </div>

        <button className={styles.submitBtn} onClick={onSubmitExam}>
          <Send size={14} /> Submit Test
        </button>
      </div>
    </div>
  );
};
