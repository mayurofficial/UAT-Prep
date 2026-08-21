'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { QuestionItem, UserAnswerState, LanguageMode } from '@/types/utet';
import styles from './QuestionPalette.module.css';
import {
  LayoutGrid,
  Star,
  Search,
  X,
  Zap
} from 'lucide-react';
import { soundManager } from '@/utils/audioFeedback';

interface SectionInfo {
  id: string;
  name: string;
  nameHindi: string;
  questionRange: string;
  total: number;
  color?: string;
}

interface QuestionPaletteProps {
  questions: QuestionItem[];
  currentIndex: number;
  userStates: Record<number, UserAnswerState>;
  onSelectQuestion: (index: number) => void;
  sections?: SectionInfo[];
  activeSectionId?: string;
  language?: LanguageMode;
  isMobileDrawer?: boolean;
  onCloseDrawer?: () => void;
}

type Filter = 'all' | 'unanswered' | 'answered' | 'marked' | 'bookmarked';

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  questions,
  currentIndex,
  userStates,
  onSelectQuestion,
  isMobileDrawer = false,
  onCloseDrawer,
}) => {
  const [filter, setFilter] = useState<Filter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Reset search when questions array / paper changes
  useEffect(() => {
    setSearchQuery('');
  }, [questions]);

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

  // Filtered question items
  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return questions.map((q, idx) => ({ q, idx })).filter(({ q, idx }) => {
      // 1. Search filter
      if (query) {
        const textMatch =
          q.question.english.toLowerCase().includes(query) ||
          q.question.hindi.toLowerCase().includes(query) ||
          (q.topic && q.topic.toLowerCase().includes(query)) ||
          (q.section && q.section.toLowerCase().includes(query)) ||
          String(q.questionNumber).includes(query);
        if (!textMatch) return false;
      }

      // 2. Status filter
      const s = userStates[idx];
      if (filter === 'all') return true;
      if (filter === 'answered') return !!s?.selectedOption;
      if (filter === 'unanswered') return !s?.selectedOption;
      if (filter === 'marked') return !!s?.isMarkedForReview;
      if (filter === 'bookmarked') return !!s?.isBookmarked;
      return true;
    });
  }, [questions, userStates, filter, searchQuery]);

  const handleSelectQuestion = (idx: number) => {
    soundManager.playNavigation();
    onSelectQuestion(idx);
    if (onCloseDrawer) {
      onCloseDrawer();
    }
  };

  const content = (
    <div className={styles.paletteContainer}>
      {/* 1. Header with Progress Indicator */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <div className={styles.title}>
            <div className={styles.titleIcon}>
              <LayoutGrid size={16} />
            </div>
            <span>Question Navigator</span>
          </div>
          <span className={styles.badgeProgress}>
            <Zap size={11} /> {stats.progressPercent}% Done
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
          <span>{questions.length - stats.totalAnswered} Left</span>
        </div>
      </div>

      {/* 2. Status Summary Grid */}
      <div className={styles.statusGrid}>
        <div
          className={`${styles.statusCard} ${filter === 'answered' ? styles.statusActive : ''}`}
          onClick={() => setFilter(filter === 'answered' ? 'all' : 'answered')}
          title="Filter Answered Questions"
        >
          <div className={styles.statusLabel}>
            <span className={`${styles.dot} ${styles.dotAnswered}`} />
            <span>Answered</span>
          </div>
          <span className={styles.statusCount}>{stats.answered}</span>
        </div>

        <div
          className={`${styles.statusCard} ${filter === 'marked' ? styles.statusActive : ''}`}
          onClick={() => setFilter(filter === 'marked' ? 'all' : 'marked')}
          title="Filter Marked for Review Questions"
        >
          <div className={styles.statusLabel}>
            <span className={`${styles.dot} ${styles.dotMarked}`} />
            <span>Review</span>
          </div>
          <span className={styles.statusCount}>{stats.marked + stats.answeredAndMarked}</span>
        </div>

        <div
          className={`${styles.statusCard} ${filter === 'unanswered' ? styles.statusActive : ''}`}
          onClick={() => setFilter(filter === 'unanswered' ? 'all' : 'unanswered')}
          title="Filter Unanswered Questions"
        >
          <div className={styles.statusLabel}>
            <span className={`${styles.dot} ${styles.dotSkipped}`} />
            <span>Skipped</span>
          </div>
          <span className={styles.statusCount}>{stats.visitedSkipped}</span>
        </div>

        <div
          className={`${styles.statusCard} ${filter === 'bookmarked' ? styles.statusActive : ''}`}
          onClick={() => setFilter(filter === 'bookmarked' ? 'all' : 'bookmarked')}
          title="Filter Saved Bookmarks"
        >
          <div className={styles.statusLabel}>
            <Star size={11} color="#f59e0b" fill="#f59e0b" />
            <span>Saved</span>
          </div>
          <span className={styles.statusCount}>{stats.bookmarked}</span>
        </div>
      </div>

      {/* 3. Live Question Search */}
      <div className={styles.controlsRow}>
        <div className={styles.searchBox}>
          <Search size={13} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search question # or keyword (e.g. 15, Piaget, संधि)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search question text"
          />
        </div>
      </div>

      {/* 4. Question Buttons Grid (All 150Q readily accessible) */}
      <div className={styles.gridScroll}>
        <div className={styles.questionGrid}>
          {filtered.map(({ q, idx }) => {
            const s = userStates[idx];
            const isCurrent = idx === currentIndex;
            const isAnswered = s && !!s.selectedOption;
            const isMarked = s && s.isMarkedForReview;
            const isBookmarked = s && s.isBookmarked;
            const isVisitedSkipped = s && s.visited && !s.selectedOption && !s.isMarkedForReview;

            let btnCls = styles.qBtn;
            if (isCurrent) btnCls += ` ${styles.qCurrent}`;
            if (isAnswered && isMarked) btnCls += ` ${styles.qAnsweredAndMarked}`;
            else if (isAnswered) btnCls += ` ${styles.qAnswered}`;
            else if (isMarked) btnCls += ` ${styles.qMarked}`;
            else if (isVisitedSkipped) btnCls += ` ${styles.qVisitedSkipped}`;

            return (
              <button
                key={q.id || idx}
                className={btnCls}
                onClick={() => handleSelectQuestion(idx)}
                aria-label={`Jump to Question ${q.questionNumber}`}
                title={`Q${q.questionNumber}: ${q.section}`}
              >
                {q.questionNumber}
                {isBookmarked && (
                  <Star size={8} className={styles.qBookmarkIndicator} fill="currentColor" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  if (isMobileDrawer) {
    return (
      <div className={styles.mobileDrawerOverlay} onClick={onCloseDrawer}>
        <div className={styles.mobileDrawerSheet} onClick={(e) => e.stopPropagation()}>
          <div className={styles.mobileDrawerCloseRow}>
            <span style={{ fontSize: '14px', fontWeight: 700 }}>Question Navigator</span>
            <button className={styles.closeDrawerBtn} onClick={onCloseDrawer} aria-label="Close navigator">
              <X size={18} />
            </button>
          </div>
          {content}
        </div>
      </div>
    );
  }

  return content;
};
