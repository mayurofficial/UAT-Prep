'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ExamResults } from '@/types/utet';
import styles from './ResultDashboard.module.css';
import { Trophy, RotateCcw, BookOpen, AlertTriangle, CheckCircle2, TrendingUp, Award } from 'lucide-react';

interface ResultDashboardProps {
  results: ExamResults;
  onRetake: () => void;
  onGoToPractice: () => void;
}

export const ResultDashboard: React.FC<ResultDashboardProps> = ({ results, onRetake, onGoToPractice }) => {
  const isLt = results.targetExam === 'LT';
  const qualified = isLt ? results.netScore >= 60 : results.grossScore >= 90;

  useEffect(() => {
    if (qualified) {
      try { confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } }); } catch {}
    }
  }, [qualified]);

  const timeMins = Math.round(results.timeTakenSec / 60);
  const accuracy = results.attempted > 0 ? Math.round((results.correct / results.attempted) * 100) : 0;
  const colors = ['#1a73e8', '#e37400', '#9334e6', '#0284c7', '#059669', '#16a34a'];

  const getLtPerformanceBadge = (net: number) => {
    if (net >= 75) return { title: 'Excellent! High Selection Probability (Top Merit Tier)', color: '#16a34a' };
    if (net >= 60) return { title: 'Good! Competitive Score for Selection', color: '#e37400' };
    return { title: 'Scope for Improvement — Focus on Negative Control & Subject Core', color: '#d93025' };
  };

  const ltStatus = isLt ? getLtPerformanceBadge(results.netScore) : null;

  return (
    <div className={styles.result}>
      <div className={styles.scoreCard}>
        <div className={styles.badge} style={{ background: qualified ? 'rgba(22, 163, 74, 0.12)' : 'rgba(227, 116, 0, 0.12)', color: qualified ? 'var(--green)' : '#b05c00' }}>
          <Trophy size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
          {isLt
            ? ltStatus?.title
            : qualified
            ? 'Congratulations Anjali! You cleared the UTET-II Cutoff (≥ 60%)! 🎉'
            : 'Keep practicing! Target 90+ marks to qualify UTET! 💪'}
        </div>

        <div className={styles.examTitleHead}>
          {results.paperTitle || (isLt ? 'UKSSSC LT Grade Assistant Teacher Exam' : 'UTET-II Paper Exam')}
        </div>

        {results.category && (
          <div style={{ marginTop: -8, marginBottom: 12 }}>
            {results.category === 'OFFICIAL_PYQ' ? (
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#16a34a', background: 'rgba(22, 163, 74, 0.12)', padding: '2px 8px', borderRadius: '4px' }}>
                🏛️ Official Previous Year Paper
              </span>
            ) : (
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#9334e6', background: 'rgba(147, 51, 234, 0.12)', padding: '2px 8px', borderRadius: '4px' }}>
                ⚡ Practice Model Mock Test
              </span>
            )}
          </div>
        )}

        <div className={styles.scoreRing}>
          <span className={styles.scoreBig}>{isLt ? results.netScore.toFixed(2) : results.grossScore}</span>
          <span className={styles.scoreOf}>/ {results.totalMarks} Marks</span>
        </div>

        {/* Negative marking breakdown for LT */}
        {isLt && results.hasNegativeMarking && (
          <div className={styles.negativeBreakdown}>
            <div className={styles.subScoreItem}>
              <span className={styles.subLabel}>Gross Positive (+1.0):</span>
              <span className={styles.subValGreen}>+{results.correct.toFixed(2)}</span>
            </div>
            <div className={styles.subScoreItem}>
              <span className={styles.subLabel}>Negative Penalty (-0.25 × {results.incorrect}):</span>
              <span className={styles.subValRed}>-{results.negativeDeduction.toFixed(2)}</span>
            </div>
            <div className={styles.subScoreItem} style={{ borderTop: '1px dashed var(--border)', paddingTop: 4 }}>
              <span className={styles.subLabel}><strong>Net Total Score:</strong></span>
              <span className={styles.subValBlue}><strong>{results.netScore.toFixed(2)}</strong></span>
            </div>
          </div>
        )}

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
            <div className={styles.metricLabel}>Attempted / Skipped</div>
            <div className={styles.metricVal}>
              <span>{results.attempted}</span>
              {' / '}
              <span style={{ color: 'var(--text-hint)' }}>{results.skipped}</span>
            </div>
          </div>
          <div className={styles.metric}>
            <div className={styles.metricLabel}>Time Taken</div>
            <div className={styles.metricVal}>{timeMins} mins</div>
          </div>
        </div>
      </div>

      <div className={styles.sections}>
        <div className={styles.secTitle}>Section-Wise Performance Breakdown</div>
        <div className={styles.secList}>
          {results.sectionScores.map((s, i) => {
            const pct = Math.round((s.correct / s.total) * 100);
            return (
              <div key={s.section} className={styles.secItem}>
                <div className={styles.secHead}>
                  <div>
                    <span style={{ fontWeight: 700 }}>{s.sectionHindi}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>{s.section}</span>
                  </div>
                  <span style={{ fontWeight: 700 }}>{s.correct}/{s.total} ({pct}%)</span>
                </div>
                <div className={styles.bar}>
                  <div className={styles.barFill} style={{ width: `${pct}%`, background: colors[i % colors.length] }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.primaryBtn} onClick={onGoToPractice}>
          <BookOpen size={16} /> Review Answers & Detailed Solutions
        </button>
        <button className={styles.secondaryBtn} onClick={onRetake}>
          <RotateCcw size={16} /> Retake Full Test
        </button>
      </div>
    </div>
  );
};
