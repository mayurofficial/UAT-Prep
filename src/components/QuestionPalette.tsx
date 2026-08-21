'use client';

import React, { useState, useMemo } from 'react';
import { QuestionItem, UserAnswerState } from '@/types/utet';
import styles from './QuestionPalette.module.css';
import {
  LayoutGrid, Star, CheckCircle2, Flag, AlertCircle, Circle, Bookmark,
  Layers, ChevronRight, Zap
} from 'lucide-react';

interface QuestionPaletteProps {
  questions: QuestionItem[];
  currentIndex: number;
  userStates: Record<number, UserAnswerState>;
  onSelectQuestion: (index: number) => void;
  sections?: { id: string; name: string; nameHindi: string; questionRange: string; total: number; color?: string }[];
}

type Filter = 'all' | 'unanswered' | 'answered' | 'marked' | 'bookmarked';

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  questions,
  currentIndex,
  userStates,
  onSelectQuestion,
  sections,
}) => {
  const [filter, setFilter] = useState<Filter>('all');
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>('all');

  // Compute live statistics
  const stats = useMemo(() => {
    let answered = 0;
    let marked = 0;
    let answeredAndMarked = 0;
    let visitedSkipped = 0;
    let bookmarked = 0;

    questions.forEach((_, idx) => {
      const s = userStates[idx];
      if (s) {
        if (s.isBookmarked) bookmarked++;
        if (s.selectedOption && s.isMarkedForReview) answeredAndMarked++;
        else if (s.selectedOption) answered++;
        else if (s.isMarkedForReview) marked++;
        else if (s.visited) visitedSkipped++;
      }
    });

    const notVisited = questions.length - (answered + marked + answeredAndMarked + visitedSkipped);
    const totalAnswered = answered + answeredAndMarked;
    const progressPercent = Math.round((totalAnswered / Math.max(1, questions.length)) * 100);

    return {
      answered,
      marked,
      answeredAndMarked,
      visitedSkipped,
      notVisited: Math.max(0, notVisited),
      bookmarked,
      totalAnswered,
      progressPercent,
    };
  }, [questions, userStates]);

  // Extract sections if not passed
  const derivedSections = useMemo(() => {
    if (sections && sections.length > 0) return sections;
    const map = new Map<string, { id: string; name: string; total: number; startIdx: number }>();
    questions.forEach((q, idx) => {
      if (!map.has(q.section)) {
        map.set(q.section, { id: q.section, name: q.section, total: 1, startIdx: idx });
      } else {
        map.get(q.section)!.total++;
      }
    });
    return Array.from(map.values()).map(s => ({
      id: s.id,
      name: s.name,
      nameHindi: s.name,
      questionRange: `${s.startIdx + 1}-${s.startIdx + s.total}`,
      total: s.total,
    }));
  }, [questions, sections]);

  // Filtered items
  const filtered = useMemo(() => {
    return questions.map((q, idx) => ({ q, idx })).filter(({ q, idx }) => {
      // Section filter
      if (selectedSectionFilter !== 'all' && q.section !== selectedSectionFilter) {
        return false;
      }

      const s = userStates[idx];
      if (filter === 'all') return true;
      if (filter === 'answered') return !!s?.selectedOption;
      if (filter === 'unanswered') return !s?.selectedOption;
      if (filter === 'marked') return !!s?.isMarkedForReview;
      if (filter === 'bookmarked') return !!s?.isBookmarked;
      return true;
    });
  }, [questions, userStates, filter, selectedSectionFilter]);

  // Helper to jump to section
  const handleSectionJump = (sectionName: string) => {
    if (sectionName === 'all') {
      setSelectedSectionFilter('all');
      return;
    }
    setSelectedSectionFilter(sectionName);
    const firstIdx = questions.findIndex(q => q.section === sectionName);
    if (firstIdx !== -1) {
      onSelectQuestion(firstIdx);
    }
  };

  return (
    <aside className={styles.paletteContainer}>
      {/* 1. Header with Progress Indicator */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <div className={styles.title}>
            <div className={styles.titleIcon}>
              <LayoutGrid size={15} />
            </div>
            <span>Question Navigator</span>
          </div>
          <span className={styles.badgeProgress}>
            <Zap size={12} className={styles.zapIcon} /> {stats.progressPercent}% Done
          </span>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressBarWrapper}>
          <div
            className={styles.progressBarFill}
            style={{ width: `${stats.progressPercent}%` }}
          />
        </div>
        <div className={styles.progressLabel}>
          <span>{stats.totalAnswered} of {questions.length} Attempted</span>
          <span>{questions.length - stats.totalAnswered} Remaining</span>
        </div>
      </div>

      {/* 2. Interactive Status Badges Summary */}
      <div className={styles.statusGrid}>
        <div
          className={`${styles.statusCard} ${styles.cardAnswered} ${filter === 'answered' ? styles.statusActive : ''}`}
          onClick={() => setFilter(filter === 'answered' ? 'all' : 'answered')}
          title="Filter by Answered"
        >
          <div className={styles.statusTop}>
            <span className={styles.statusDotGreen} />
            <span className={styles.statusCount}>{stats.totalAnswered}</span>
          </div>
          <span className={styles.statusText}>Answered</span>
        </div>

        <div
          className={`${styles.statusCard} ${styles.cardMarked} ${filter === 'marked' ? styles.statusActive : ''}`}
          onClick={() => setFilter(filter === 'marked' ? 'all' : 'marked')}
          title="Filter by Marked for Review"
        >
          <div className={styles.statusTop}>
            <span className={styles.statusDotPurple} />
            <span className={styles.statusCount}>{stats.marked + stats.answeredAndMarked}</span>
          </div>
          <span className={styles.statusText}>Review</span>
        </div>

        <div
          className={`${styles.statusCard} ${styles.cardSkipped} ${filter === 'unanswered' ? styles.statusActive : ''}`}
          onClick={() => setFilter(filter === 'unanswered' ? 'all' : 'unanswered')}
          title="Filter by Skipped / Pending"
        >
          <div className={styles.statusTop}>
            <span className={styles.statusDotRed} />
            <span className={styles.statusCount}>{stats.visitedSkipped}</span>
          </div>
          <span className={styles.statusText}>Skipped</span>
        </div>

        <div
          className={`${styles.statusCard} ${styles.cardUnvisited} ${filter === 'all' ? styles.statusActive : ''}`}
          onClick={() => setFilter('all')}
          title="Total Questions"
        >
          <div className={styles.statusTop}>
            <span className={styles.statusDotGray} />
            <span className={styles.statusCount}>{stats.notVisited}</span>
          </div>
          <span className={styles.statusText}>Unvisited</span>
        </div>
      </div>

      {/* 3. Section & Category Filters Container */}
      <div className={styles.controlsSection}>
        {/* Section Filter Pills */}
        {derivedSections.length > 1 && (
          <div className={styles.sectionTabsWrapper}>
            <div className={styles.sectionTabs}>
              <button
                className={`${styles.sectionTab} ${selectedSectionFilter === 'all' ? styles.sectionTabActive : ''}`}
                onClick={() => handleSectionJump('all')}
              >
                All Sections
              </button>
              {derivedSections.map((sec) => {
                const isSecActive = selectedSectionFilter === sec.name;
                const shortName = sec.name
                  .replace('Child Development and Pedagogy', 'CDP')
                  .replace('First Language - English/Hindi', 'Lang I')
                  .replace('First Language - English', 'Lang I')
                  .replace('First Language - Hindi', 'Hindi')
                  .replace('Second Language - English', 'Lang II')
                  .replace('Second Language - Hindi', 'Hindi')
                  .replace('Science & Mathematics', 'Math/Sci')
                  .replace('Mathematics and Science', 'Math/Sci')
                  .replace('Teaching Aptitude & Pedagogy', 'Pedagogy')
                  .replace('Uttarakhand General Knowledge', 'UK GK')
                  .replace('General Science & Specialized Subject', 'Science');

                return (
                  <button
                    key={sec.id}
                    className={`${styles.sectionTab} ${isSecActive ? styles.sectionTabActive : ''}`}
                    onClick={() => handleSectionJump(sec.name)}
                    title={`${sec.name} (${sec.questionRange})`}
                  >
                    {shortName}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Status Filter Chips */}
        <div className={styles.filterPills}>
          <button
            className={`${styles.pill} ${filter === 'all' && selectedSectionFilter === 'all' ? styles.pillActive : ''}`}
            onClick={() => { setFilter('all'); setSelectedSectionFilter('all'); }}
          >
            All ({questions.length})
          </button>
          <button
            className={`${styles.pill} ${filter === 'unanswered' ? styles.pillActive : ''}`}
            onClick={() => setFilter(filter === 'unanswered' ? 'all' : 'unanswered')}
          >
            Pending ({questions.length - stats.totalAnswered})
          </button>
          <button
            className={`${styles.pill} ${filter === 'marked' ? styles.pillActive : ''}`}
            onClick={() => setFilter(filter === 'marked' ? 'all' : 'marked')}
          >
            Marked ({stats.marked + stats.answeredAndMarked})
          </button>
          {stats.bookmarked > 0 && (
            <button
              className={`${styles.pill} ${filter === 'bookmarked' ? styles.pillActive : ''}`}
              onClick={() => setFilter(filter === 'bookmarked' ? 'all' : 'bookmarked')}
            >
              ⭐ Saved ({stats.bookmarked})
            </button>
          )}
        </div>
      </div>

      {/* 5. Modern Question Number Button Grid */}
      <div className={styles.gridWrapper}>
        <div className={styles.grid}>
          {filtered.map(({ q, idx }) => {
            const s = userStates[idx] || {
              selectedOption: null,
              isMarkedForReview: false,
              isBookmarked: false,
              visited: false,
              timeSpentSec: 0,
            };

            const isCurrent = currentIndex === idx;
            const hasAns = s.selectedOption !== null;
            const isMarked = s.isMarkedForReview;
            const isVisited = s.visited;

            let buttonStatusClass = styles.btnUnvisited;
            if (hasAns && isMarked) {
              buttonStatusClass = styles.btnAnsAndMarked;
            } else if (hasAns) {
              buttonStatusClass = styles.btnAnswered;
            } else if (isMarked) {
              buttonStatusClass = styles.btnMarked;
            } else if (isVisited) {
              buttonStatusClass = styles.btnVisited;
            }

            return (
              <button
                key={q.id}
                className={`${styles.qBtn} ${buttonStatusClass} ${isCurrent ? styles.btnCurrent : ''}`}
                onClick={() => onSelectQuestion(idx)}
                aria-label={`Question ${q.questionNumber}`}
                title={`Q${q.questionNumber}: ${q.section}`}
              >
                <span className={styles.qNumText}>{q.questionNumber}</span>
                {s.isBookmarked && (
                  <span className={styles.bookmarkBadge} title="Bookmarked">
                    <Star size={7} fill="currentColor" />
                  </span>
                )}
                {isMarked && !s.isBookmarked && (
                  <span className={styles.reviewDot} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Refined Footer Legend */}
      <div className={styles.legendBar}>
        <div className={styles.legendItem}>
          <span className={styles.legendSampleAnswered} /> Answered
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendSampleMarked} /> Review
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendSampleSkipped} /> Skipped
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendSampleUnvisited} /> Not Visited
        </div>
      </div>
    </aside>
  );
};
