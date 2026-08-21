'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  getAllFlashcards,
  ConceptFlashcard,
  FlashcardSubjectFilter,
} from '@/data/flashcardRegistry';
import { MathRenderer } from './MathRenderer';
import { aiVoice } from '@/utils/aiSpeech';
import { soundManager } from '@/utils/audioFeedback';
import styles from './FlashcardsModal.module.css';
import {
  Sparkles,
  RotateCw,
  Volume2,
  Pause,
  X,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Trophy,
  Star,
  RefreshCcw,
  Zap
} from 'lucide-react';

interface FlashcardsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_MASTERED_KEY = 'anjali_flashcards_mastered';
const STORAGE_BOOKMARKS_KEY = 'anjali_flashcards_bookmarks';

export const FlashcardsModal: React.FC<FlashcardsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const allCards = useMemo(() => getAllFlashcards(), []);
  const [selectedFilter, setSelectedFilter] = useState<FlashcardSubjectFilter>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState<boolean>(false);
  const [isQuickDrill, setIsQuickDrill] = useState<boolean>(false);

  // Persistence State
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [sessionCompleted, setSessionCompleted] = useState<boolean>(false);

  // Load mastered state from localStorage
  useEffect(() => {
    try {
      const savedMastered = localStorage.getItem(STORAGE_MASTERED_KEY);
      if (savedMastered) setMasteredIds(JSON.parse(savedMastered));

      const savedBookmarks = localStorage.getItem(STORAGE_BOOKMARKS_KEY);
      if (savedBookmarks) setBookmarkedIds(JSON.parse(savedBookmarks));
    } catch {}
  }, []);

  // Save mastered state to localStorage
  const saveMastered = (ids: string[]) => {
    setMasteredIds(ids);
    try {
      localStorage.setItem(STORAGE_MASTERED_KEY, JSON.stringify(ids));
    } catch {}
  };

  // Filtered Cards Deck
  const filteredCards = useMemo(() => {
    let list = allCards;
    if (selectedFilter !== 'All') {
      list = list.filter((c) => c.subject === selectedFilter);
    }
    return list;
  }, [allCards, selectedFilter]);

  const [activeDeck, setActiveDeck] = useState<ConceptFlashcard[]>(filteredCards);

  useEffect(() => {
    setActiveDeck(filteredCards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionCompleted(false);
    aiVoice.stop();
    setIsPlayingVoice(false);
  }, [filteredCards]);

  const currentCard = activeDeck[currentIndex] || activeDeck[0];

  // Quick 10-Card Random Drill
  const handleStartQuickDrill = () => {
    soundManager.playClick();
    const shuffled = [...filteredCards].sort(() => 0.5 - Math.random()).slice(0, 10);
    setActiveDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsQuickDrill(true);
    setSessionCompleted(false);
  };

  const handleResetToAll = () => {
    soundManager.playClick();
    setActiveDeck(filteredCards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsQuickDrill(false);
    setSessionCompleted(false);
  };

  // Card Flip Toggle
  const handleFlipCard = useCallback(() => {
    soundManager.playClick();
    setIsFlipped((prev) => !prev);
  }, []);

  // Voice Narration (TTS)
  const handleToggleVoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentCard) return;

    if (isPlayingVoice) {
      aiVoice.stop();
      setIsPlayingVoice(false);
    } else {
      const speechText = isFlipped
        ? `${currentCard.back.coreConceptHindi}. ${currentCard.back.mnemonicOrTrick || ''}`
        : `${currentCard.front.title}. ${currentCard.front.questionOrPromptHindi}`;

      aiVoice.speak(
        speechText,
        () => setIsPlayingVoice(false),
        () => setIsPlayingVoice(true)
      );
      setIsPlayingVoice(true);
    }
  };

  // Bookmark Toggle
  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentCard) return;
    soundManager.playClick();

    const isBookmarked = bookmarkedIds.includes(currentCard.id);
    const updated = isBookmarked
      ? bookmarkedIds.filter((id) => id !== currentCard.id)
      : [...bookmarkedIds, currentCard.id];

    setBookmarkedIds(updated);
    try {
      localStorage.setItem(STORAGE_BOOKMARKS_KEY, JSON.stringify(updated));
    } catch {}
  };

  // Navigation & Spaced Repetition Actions
  const handleNext = useCallback(() => {
    aiVoice.stop();
    setIsPlayingVoice(false);
    setIsFlipped(false);

    if (currentIndex < activeDeck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setSessionCompleted(true);
      soundManager.playSuccess();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {}
    }
  }, [currentIndex, activeDeck.length]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      aiVoice.stop();
      setIsPlayingVoice(false);
      setIsFlipped(false);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Rating 1: Review Again (Pushes back into deck)
  const handleRateAgain = () => {
    soundManager.playIncorrect();
    if (!currentCard) return;

    // Push card to 3 positions ahead or end of deck
    const newDeck = [...activeDeck];
    const targetIdx = Math.min(currentIndex + 3, newDeck.length);
    newDeck.splice(targetIdx, 0, currentCard);
    setActiveDeck(newDeck);

    handleNext();
  };

  // Rating 2: Good
  const handleRateGood = () => {
    soundManager.playClick();
    handleNext();
  };

  // Rating 3: Mastered
  const handleRateMastered = () => {
    soundManager.playCorrect();
    if (currentCard && !masteredIds.includes(currentCard.id)) {
      saveMastered([...masteredIds, currentCard.id]);
    }
    handleNext();
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleFlipCard();
      } else if (e.key === '1' || e.key === 'ArrowLeft') {
        e.preventDefault();
        handleRateAgain();
      } else if (e.key === '2' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleRateGood();
      } else if (e.key === '3' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleRateMastered();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleFlipCard, handleNext, onClose]);

  const handleCloseModal = () => {
    aiVoice.stop();
    setIsPlayingVoice(false);
    onClose();
  };

  if (!isOpen) return null;

  const totalInDeck = activeDeck.length;
  const isCardMastered = currentCard && masteredIds.includes(currentCard.id);
  const isCardBookmarked = currentCard && bookmarkedIds.includes(currentCard.id);
  const progressPercent = totalInDeck > 0 ? Math.round(((currentIndex + 1) / totalInDeck) * 100) : 0;

  return (
    <div className={styles.backdrop} onClick={handleCloseModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* 1. Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>
              <Flame size={22} />
            </div>
            <div>
              <div className={styles.headerTitle}>
                <span>Daily Concept Flashcards</span>
                <span className={styles.dailyBadge}>5-Min Revision</span>
              </div>
              <div className={styles.headerSubtitle}>
                3D Flip Cards • Mnemonic Hooks • Formula Shortcuts
              </div>
            </div>
          </div>

          <div className={styles.headerRight}>
            {!isQuickDrill ? (
              <button
                className={styles.quickDrillBtn}
                onClick={handleStartQuickDrill}
                title="Start 10-Card Random Quick Warm-up"
              >
                <Zap size={14} />
                <span>10-Card Drill</span>
              </button>
            ) : (
              <button
                className={styles.quickDrillBtn}
                onClick={handleResetToAll}
                title="Show all flashcards"
              >
                <BookOpen size={14} />
                <span>All Cards</span>
              </button>
            )}

            <button
              className={styles.closeBtn}
              onClick={handleCloseModal}
              aria-label="Close Flashcards"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* 2. Subject Filter Bar */}
        <div className={styles.filterBar}>
          {(['All', 'Pedagogy', 'Mathematics', 'Science', 'Language', 'LT Aptitude'] as FlashcardSubjectFilter[]).map(
            (filter) => (
              <button
                key={filter}
                className={`${styles.filterChip} ${
                  selectedFilter === filter ? styles.filterChipActive : ''
                }`}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedFilter(filter);
                }}
              >
                {filter === 'All'
                  ? '🌟 All Subjects'
                  : filter === 'Pedagogy'
                  ? '🧠 Pedagogy & CDP'
                  : filter === 'Mathematics'
                  ? '📐 Mathematics'
                  : filter === 'Science'
                  ? '🔬 Science'
                  : filter === 'Language'
                  ? '📖 Languages'
                  : '🎯 LT Aptitude'}
              </button>
            )
          )}
        </div>

        {/* 3. Progress Track & Stats */}
        <div className={styles.progressBarRow}>
          <div className={styles.progressInfo}>
            <span>
              Card {currentIndex + 1} of {totalInDeck}
            </span>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className={styles.statsRow}>
            <div className={styles.masteredCount}>
              <CheckCircle2 size={13} />
              <span>{masteredIds.length} Mastered</span>
            </div>
            {isQuickDrill && <span style={{ color: 'var(--warning-dark)', fontWeight: 700 }}>⚡ 10-Card Sprint</span>}
          </div>
        </div>

        {/* 4. Main 3D Card Scene */}
        {!sessionCompleted && currentCard ? (
          <div className={styles.cardScene} onClick={handleFlipCard}>
            <div
              className={`${styles.cardObject} ${
                isFlipped ? styles.isFlipped : ''
              }`}
            >
              {/* === CARD FRONT === */}
              <div className={`${styles.cardFace} ${styles.cardFront}`}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={styles.subjectBadge}>
                      {currentCard.subject} • {currentCard.sourcePaperYear}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {isCardMastered && (
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            color: 'var(--success)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 3,
                          }}
                        >
                          <CheckCircle2 size={13} /> Mastered
                        </span>
                      )}
                      <button
                        onClick={handleToggleBookmark}
                        style={{
                          color: isCardBookmarked ? '#f59e0b' : 'var(--text-tertiary)',
                          padding: '4px',
                        }}
                        title={isCardBookmarked ? 'Bookmarked' : 'Bookmark card'}
                      >
                        <Star
                          size={18}
                          fill={isCardBookmarked ? '#f59e0b' : 'none'}
                        />
                      </button>
                    </div>
                  </div>

                  <div className={styles.topicTitle}>{currentCard.topic}</div>

                  <div className={styles.questionHindi}>
                    <MathRenderer content={currentCard.front.questionOrPromptHindi} />
                  </div>

                  {currentCard.front.questionOrPromptEnglish && (
                    <div className={styles.questionEng}>
                      <MathRenderer content={currentCard.front.questionOrPromptEnglish} />
                    </div>
                  )}

                  {currentCard.front.trapAlert && (
                    <div className={styles.trapWarningBox}>
                      <AlertTriangle size={15} color="#d97706" style={{ flexShrink: 0 }} />
                      <div>
                        <strong>परीक्षा भ्रम (Exam Trap Alert):</strong>{' '}
                        <MathRenderer content={currentCard.front.trapAlert} inline />
                      </div>
                    </div>
                  )}
                </div>

                <div className={styles.flipHint}>
                  <RotateCw size={14} />
                  <span>Tap card or press Space to reveal answer & trick</span>
                </div>
              </div>

              {/* === CARD BACK === */}
              <div className={`${styles.cardFace} ${styles.cardBack}`}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={styles.subjectBadge} style={{ background: 'var(--warning-light)', color: 'var(--warning-dark)' }}>
                      💡 Solution & Mnemonic Hook
                    </span>

                    <button
                      onClick={handleToggleBookmark}
                      style={{
                        color: isCardBookmarked ? '#f59e0b' : 'var(--text-tertiary)',
                        padding: '4px',
                      }}
                      title={isCardBookmarked ? 'Bookmarked' : 'Bookmark card'}
                    >
                      <Star
                        size={18}
                        fill={isCardBookmarked ? '#f59e0b' : 'none'}
                      />
                    </button>
                  </div>

                  {currentCard.back.correctAnswerText && (
                    <div className={styles.solutionAnswerBadge}>
                      <CheckCircle2 size={14} />
                      <span>{currentCard.back.correctAnswerText}</span>
                    </div>
                  )}

                  <div className={styles.coreConceptText}>
                    <MathRenderer content={currentCard.back.coreConceptHindi} />
                  </div>

                  {currentCard.back.mnemonicOrTrick && (
                    <div className={styles.mnemonicBox}>
                      <Sparkles size={16} color="#d97706" style={{ flexShrink: 0 }} />
                      <div>
                        <strong style={{ color: '#b45309' }}>मेमोरी ट्रिक / नियम:</strong>{' '}
                        <MathRenderer content={currentCard.back.mnemonicOrTrick} inline />
                      </div>
                    </div>
                  )}

                  {currentCard.back.classroomExampleOrFormula && (
                    <div className={styles.classroomBox}>
                      <strong>कक्षा उदाहरण / सूत्र:</strong>{' '}
                      <MathRenderer content={currentCard.back.classroomExampleOrFormula} inline />
                    </div>
                  )}
                </div>

                <div className={styles.cardAudioRow}>
                  <button
                    className={styles.listenBtn}
                    onClick={handleToggleVoice}
                    title="Listen in Hindi"
                  >
                    {isPlayingVoice ? <Pause size={13} /> : <Volume2 size={13} />}
                    <span>{isPlayingVoice ? 'Pause Voice' : 'Listen Explanation'}</span>
                  </button>

                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                    Press 1/2/3 to Rate Mastery
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Deck Complete Screen */
          <div className={styles.completeCard}>
            <div className={styles.trophyIcon}>
              <Trophy size={32} />
            </div>
            <div className={styles.completeTitle}>शानदार! Revision Completed!</div>
            <div className={styles.completeSub}>
              You have completed this revision session of {totalInDeck} concept cards. Keep up the daily streak to secure top marks in UTET & LT Assistant Teacher exam!
            </div>
            <button className={styles.restartBtn} onClick={handleResetToAll}>
              <RefreshCcw size={15} style={{ marginRight: 6, verticalAlign: 'middle' }} />
              Restart Full Deck
            </button>
          </div>
        )}

        {/* 5. Footer Rating Controls */}
        {!sessionCompleted && (
          <div className={styles.footer}>
            <div className={styles.navControls}>
              <button
                className={styles.navArrowBtn}
                onClick={handlePrev}
                disabled={currentIndex === 0}
                title="Previous Card"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                className={styles.navArrowBtn}
                onClick={handleNext}
                disabled={currentIndex >= totalInDeck - 1}
                title="Next Card"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className={styles.ratingGroup}>
              <button
                className={styles.rateBtnAgain}
                onClick={handleRateAgain}
                title="Review Again (Key 1)"
              >
                <RotateCw size={13} />
                <span>Again (1)</span>
              </button>

              <button
                className={styles.rateBtnGood}
                onClick={handleRateGood}
                title="Good (Key 2)"
              >
                <span>Good (2)</span>
              </button>

              <button
                className={styles.rateBtnMastered}
                onClick={handleRateMastered}
                title="Mastered (Key 3)"
              >
                <CheckCircle2 size={14} />
                <span>Mastered (3)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
