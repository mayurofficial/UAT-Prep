'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ExamResults } from '@/types/utet';
import styles from './ResultDashboard.module.css';
import { Trophy, RotateCcw, BookOpen } from 'lucide-react';

interface ResultDashboardProps {
  results: ExamResults;
  onRetake: () => void;
  onGoToPractice: () => void;
}

export const ResultDashboard: React.FC<ResultDashboardProps> = ({ results, onRetake, onGoToPractice }) => {
  useEffect(() => {
    try { confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } }); } catch {}
  }, []);

  const qualified = results.score >= 90;
  const timeMins = Math.round(results.timeTakenSec / 60);
  const accuracy = results.attempted > 0 ? Math.round((results.correct / results.attempted) * 100) : 0;
  const colors = ['var(--blue)', 'var(--orange)', 'var(--green)', 'var(--red)'];

  return (
    <div className={styles.result}>
      <div className={styles.scoreCard}>
        <div className={styles.badge}>
          <Trophy size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
          {qualified ? 'Congratulations! You qualify! 🎉' : 'Keep practicing! You\'re getting there! 💪'}
        </div>

        <div className={styles.scoreRing}>
          <span className={styles.scoreBig}>{results.score}</span>
          <span className={styles.scoreOf}>/ {results.totalQuestions}</span>
        </div>

        <div className={styles.metrics}>
          <div className={styles.metric}>
            <div className={styles.metricLabel}>Accuracy</div>
            <div className={styles.metricVal}>{accuracy}%</div>
          </div>
          <div className={styles.metric}>
            <div className={styles.metricLabel}>Correct / Wrong</div>
            <div className={styles.metricVal}>
              <span style={{ color: 'var(--green)' }}>{results.correct}</span>
              {' / '}
              <span style={{ color: 'var(--red)' }}>{results.incorrect}</span>
            </div>
          </div>
          <div className={styles.metric}>
            <div className={styles.metricLabel}>Time</div>
            <div className={styles.metricVal}>{timeMins}m</div>
          </div>
        </div>
      </div>

      <div className={styles.sections}>
        <div className={styles.secTitle}>Section Breakdown</div>
        <div className={styles.secList}>
          {results.sectionScores.map((s, i) => {
            const pct = Math.round((s.correct / s.total) * 100);
            return (
              <div key={s.section} className={styles.secItem}>
                <div className={styles.secHead}>
                  <span>{s.sectionHindi}</span>
                  <span>{s.correct}/{s.total} ({pct}%)</span>
                </div>
                <div className={styles.bar}>
                  <div className={styles.barFill} style={{ width: `${pct}%`, background: colors[i] }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.primaryBtn} onClick={onGoToPractice}>
          <BookOpen size={16} /> Review Solutions
        </button>
        <button className={styles.secondaryBtn} onClick={onRetake}>
          <RotateCcw size={16} /> Retake Test
        </button>
      </div>
    </div>
  );
};
