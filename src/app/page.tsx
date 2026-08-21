'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  ExamData, AppMode, LanguageMode, UserAnswerState, ExamResults, TargetExam,
} from '@/types/utet';
import { getPapersForExam, getPaperData } from '@/data/paperRegistry';

import { AppSidebar } from '@/components/AppSidebar';
import { TopNavbar } from '@/components/TopNavbar';
import { SectionTabs } from '@/components/SectionTabs';
import { QuestionCard } from '@/components/QuestionCard';
import { QuestionPalette } from '@/components/QuestionPalette';
import { ResultDashboard } from '@/components/ResultDashboard';
import { PrintWorksheet } from '@/components/PrintWorksheet';
import { LtSyllabusView } from '@/components/LtSyllabusView';
import { ShortcutsModal } from '@/components/ShortcutsModal';
import { soundManager } from '@/utils/audioFeedback';

import styles from './page.module.css';
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  LayoutGrid,
  Heart
} from 'lucide-react';

export default function Home() {
  const [selectedExam, setSelectedExam] = useState<TargetExam>('UTET');
  const [selectedPaperId, setSelectedPaperId] = useState<string>('utet_2025');
  const [mode, setMode] = useState<AppMode>('practice');
  const [language, setLanguage] = useState<LanguageMode>('bilingual');
  const [isDark, setIsDark] = useState(false);
  const [fontSize, setFontSize] = useState<'small' | 'normal' | 'large'>('normal');
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  // Question & Navigation State
  const [idx, setIdx] = useState(0);
  const [states, setStates] = useState<Record<number, UserAnswerState>>({});
  const [results, setResults] = useState<ExamResults | null>(null);

  // Responsive Drawer & Modal States
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPaletteDrawerOpen, setIsPaletteDrawerOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  const activeExamData: ExamData = getPaperData(selectedPaperId);
  const TOTAL = activeExamData.questions.length;
  const availablePapers = getPapersForExam(selectedExam);
  const activePaperMeta = availablePapers.find(p => p.id === selectedPaperId) || availablePapers[0];

  // Load initial settings & states from localStorage
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('anjali_theme') || localStorage.getItem('utet_theme');
      if (savedTheme === 'dark') {
        setIsDark(true);
        document.documentElement.setAttribute('data-theme', 'dark');
      }
      const savedLang = localStorage.getItem('anjali_lang') as LanguageMode;
      if (savedLang) setLanguage(savedLang);

      const savedTarget = localStorage.getItem('anjali_target_exam') as TargetExam;
      if (savedTarget === 'LT' || savedTarget === 'UTET') {
        setSelectedExam(savedTarget);
        const defaultPaper = savedTarget === 'LT' ? 'lt_2025' : 'utet_2025';
        const savedPaper = localStorage.getItem('anjali_selected_paper') || defaultPaper;
        setSelectedPaperId(savedPaper);
      }

      const activePaper = localStorage.getItem('anjali_selected_paper') || 'utet_2025';
      const storageKey = `anjali_paper_${activePaper}_states`;
      const savedStates = localStorage.getItem(storageKey);
      if (savedStates) setStates(JSON.parse(savedStates));

      const soundPref = localStorage.getItem('anjali_sound');
      if (soundPref !== null) {
        const enabled = soundPref === 'true';
        setIsSoundEnabled(enabled);
        soundManager.setSoundEnabled(enabled);
      }
    } catch { /* noop */ }
  }, []);

  // Sync theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      try { localStorage.setItem('anjali_theme', 'dark'); } catch {}
    } else {
      document.documentElement.removeAttribute('data-theme');
      try { localStorage.setItem('anjali_theme', 'light'); } catch {}
    }
  }, [isDark]);

  useEffect(() => {
    try { localStorage.setItem('anjali_lang', language); } catch {}
  }, [language]);

  const handleSoundToggle = (enabled: boolean) => {
    setIsSoundEnabled(enabled);
    soundManager.setSoundEnabled(enabled);
    try { localStorage.setItem('anjali_sound', String(enabled)); } catch {}
  };

  // Handle Target Exam Change
  const handleExamChange = (newExam: TargetExam) => {
    if (newExam === selectedExam) return;
    setSelectedExam(newExam);
    const newPapers = getPapersForExam(newExam);
    const newDefaultPaper = newPapers[0]?.id || (newExam === 'LT' ? 'lt_2025' : 'utet_2025');
    handlePaperChange(newDefaultPaper);
    try { localStorage.setItem('anjali_target_exam', newExam); } catch {}
  };

  // Handle Specific Paper Change
  const handlePaperChange = (newPaperId: string) => {
    setSelectedPaperId(newPaperId);
    setIdx(0);
    setResults(null);
    setIsPaletteDrawerOpen(false);

    try {
      localStorage.setItem('anjali_selected_paper', newPaperId);
      const storageKey = `anjali_paper_${newPaperId}_states`;
      const stored = localStorage.getItem(storageKey);
      setStates(stored ? JSON.parse(stored) : {});
    } catch {
      setStates({});
    }
  };

  const persist = useCallback((s: Record<number, UserAnswerState>) => {
    setStates(s);
    try {
      const storageKey = `anjali_paper_${selectedPaperId}_states`;
      localStorage.setItem(storageKey, JSON.stringify(s));
    } catch {}
  }, [selectedPaperId]);

  // Mark visited
  useEffect(() => {
    setStates(prev => {
      const c = prev[idx] || { selectedOption: null, isMarkedForReview: false, isBookmarked: false, visited: false, timeSpentSec: 0 };
      if (!c.visited) {
        const u = { ...prev, [idx]: { ...c, visited: true } };
        persist(u);
        return u;
      }
      return prev;
    });
  }, [idx, persist]);



  const currentQ = activeExamData.questions[idx] || activeExamData.questions[0];

  // Determine active section dynamically
  const activeSection = activeExamData.sections.find(sec => {
    const [start, end] = sec.questionRange.split('-').map(Number);
    return (idx + 1) >= start && (idx + 1) <= end;
  }) || activeExamData.sections[0];

  const secId = activeSection ? activeSection.id : activeExamData.sections[0].id;

  const jumpSection = (id: string) => {
    const target = activeExamData.sections.find(s => s.id === id);
    if (target) {
      const [start] = target.questionRange.split('-').map(Number);
      setIdx(Math.max(0, start - 1));
      soundManager.playNavigation();
    }
  };

  const select = (optId: string) => {
    setStates(prev => {
      const c = prev[idx] || { selectedOption: null, isMarkedForReview: false, isBookmarked: false, visited: true, timeSpentSec: 0 };
      const u = { ...prev, [idx]: { ...c, selectedOption: optId, visited: true } };
      persist(u);
      return u;
    });
  };

  const toggleReview = () => {
    setStates(prev => {
      const c = prev[idx] || { selectedOption: null, isMarkedForReview: false, isBookmarked: false, visited: true, timeSpentSec: 0 };
      const u = { ...prev, [idx]: { ...c, isMarkedForReview: !c.isMarkedForReview } };
      persist(u);
      return u;
    });
  };

  const toggleBookmark = () => {
    setStates(prev => {
      const c = prev[idx] || { selectedOption: null, isMarkedForReview: false, isBookmarked: false, visited: true, timeSpentSec: 0 };
      const u = { ...prev, [idx]: { ...c, isBookmarked: !c.isBookmarked } };
      persist(u);
      return u;
    });
  };

  const clearResponse = () => {
    setStates(prev => {
      const c = prev[idx] || { selectedOption: null, isMarkedForReview: false, isBookmarked: false, visited: true, timeSpentSec: 0 };
      const u = { ...prev, [idx]: { ...c, selectedOption: null } };
      persist(u);
      return u;
    });
  };

  const submitExam = () => {
    let correct = 0, incorrect = 0, attempted = 0;
    const secStats = activeExamData.sections.map(s => ({
      section: s.name,
      sectionHindi: s.nameHindi,
      total: s.total,
      correct: 0,
      incorrect: 0,
      skipped: 0,
      score: 0
    }));

    activeExamData.questions.forEach((q, i) => {
      const s = states[i];
      const sIndex = activeExamData.sections.findIndex(sec => {
        const [start, end] = sec.questionRange.split('-').map(Number);
        return (i + 1) >= start && (i + 1) <= end;
      });
      const validIndex = sIndex >= 0 ? sIndex : 0;

      if (s?.selectedOption) {
        attempted++;
        if (s.selectedOption === q.correctAnswer) {
          correct++;
          secStats[validIndex].correct++;
        } else {
          incorrect++;
          secStats[validIndex].incorrect++;
        }
      } else {
        secStats[validIndex].skipped++;
      }
    });

    const penaltyRate = activeExamData.hasNegativeMarking ? (activeExamData.negativeMarkingPenalty || 0.25) : 0;
    const negativeDeduction = Number((incorrect * penaltyRate).toFixed(2));
    const grossScore = correct;
    const netScore = Number(Math.max(0, grossScore - negativeDeduction).toFixed(2));
    const totalMarks = activeExamData.totalMarks || TOTAL;
    const percentage = Math.round((netScore / totalMarks) * 100);

    secStats.forEach(s => {
      const secNeg = Number((s.incorrect * penaltyRate).toFixed(2));
      s.score = Number(Math.max(0, s.correct - secNeg).toFixed(2));
    });

    setResults({
      paperId: selectedPaperId,
      year: activeExamData.year,
      category: activeExamData.category,
      paperTitle: activeExamData.examTitle,
      targetExam: selectedExam,
      totalQuestions: TOTAL,
      totalMarks,
      hasNegativeMarking: activeExamData.hasNegativeMarking,
      negativeMarkingPenalty: penaltyRate,
      attempted,
      correct,
      incorrect,
      skipped: TOTAL - attempted,
      grossScore,
      negativeDeduction,
      netScore,
      percentage,
      timeTakenSec: Object.values(states).reduce((acc, s) => acc + (s.timeSpentSec || 0), 0),
      isQualifiedOrTopTier: selectedExam === 'LT' ? netScore >= 60 : grossScore >= 90,
      sectionScores: secStats,
    });
    setMode('result');
  };

  const retake = () => {
    setStates({});
    setIdx(0);
    setResults(null);
    setMode('practice');
  };

  // Keyboard Hotkeys Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when user is typing in input or select
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      const key = e.key.toUpperCase();

      if (key === 'ESCAPE') {
        setIsShortcutsOpen(false);
        setIsPaletteDrawerOpen(false);
        setIsSidebarOpen(false);
        return;
      }

      if (e.key === '?') {
        setIsShortcutsOpen(prev => !prev);
        return;
      }

      if (key === 'Q') {
        setIsPaletteDrawerOpen(prev => !prev);
        return;
      }

      // Hotkeys for Question Card
      if (mode === 'practice') {
        if (key === 'A' || key === '1') {
          select('A');
          soundManager.playClick();
        } else if (key === 'B' || key === '2') {
          select('B');
          soundManager.playClick();
        } else if (key === 'C' || key === '3') {
          select('C');
          soundManager.playClick();
        } else if (key === 'D' || key === '4') {
          select('D');
          soundManager.playClick();
        } else if (key === 'ARROWLEFT' || key === 'P') {
          if (idx > 0) {
            setIdx(idx - 1);
            soundManager.playNavigation();
          }
        } else if (key === 'ARROWRIGHT' || key === 'N') {
          if (idx < TOTAL - 1) {
            setIdx(idx + 1);
            soundManager.playNavigation();
          }
        } else if (key === 'M') {
          toggleReview();
        } else if (key === 'BACKSPACE') {
          clearResponse();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [idx, TOTAL, mode, states]);

  const answered = Object.values(states).filter(s => s.selectedOption !== null).length;
  const marked = Object.values(states).filter(s => s.isMarkedForReview).length;
  const cur = states[idx] || { selectedOption: null, isMarkedForReview: false, isBookmarked: false, visited: true, timeSpentSec: 0 };

  return (
    <div className={styles.appContainer}>
      {/* 1. App Sidebar (Desktop Fixed / Mobile Drawer) */}
      <AppSidebar
        mode={mode}
        setMode={setMode}
        selectedExam={selectedExam}
        setSelectedExam={handleExamChange}
        selectedPaperId={selectedPaperId}
        setSelectedPaperId={handlePaperChange}
        availablePapers={availablePapers}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isDark={isDark}
        setIsDark={setIsDark}
        isSoundEnabled={isSoundEnabled}
        setIsSoundEnabled={handleSoundToggle}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      {/* 2. Main Content Workspace */}
      <div className={styles.contentArea}>
        {/* Top Navbar */}
        <TopNavbar
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          activePaper={activePaperMeta}
          mode={mode}
          language={language}
          setLanguage={setLanguage}
          fontSize={fontSize}
          setFontSize={setFontSize}
          onTogglePalette={() => setIsPaletteDrawerOpen(true)}
          currentIndex={idx}
          totalQuestions={TOTAL}
        />

        {/* Section Tabs in Practice */}
        {mode === 'practice' && (
          <SectionTabs
            sections={activeExamData.sections}
            activeSectionId={secId}
            onSelectSection={jumpSection}
            language={language}
          />
        )}

        {/* Main Canvas Views */}
        <main className={styles.mainWorkspace}>
          {mode === 'syllabus' && (
            <LtSyllabusView
              language={language}
              onStartPractice={() => setMode('practice')}
            />
          )}

          {mode === 'result' && results && (
            <ResultDashboard
              results={results}
              onRetake={() => {
                setStates({});
                setIdx(0);
                setResults(null);
                setMode('practice');
              }}
              onGoToPractice={() => setMode('practice')}
            />
          )}

          {mode === 'practice' && (
            <div className={styles.examGrid}>
              {/* Center: Question Card */}
              <div>
                <QuestionCard
                  question={currentQ}
                  totalQuestions={TOTAL}
                  targetExam={selectedExam}
                  hasNegativeMarking={activeExamData.hasNegativeMarking}
                  mode={mode}
                  language={language}
                  userState={cur}
                  onSelectOption={select}
                  onToggleMarkReview={toggleReview}
                  onToggleBookmark={toggleBookmark}
                  onClearResponse={clearResponse}
                  onNext={() => idx < TOTAL - 1 && setIdx(idx + 1)}
                  onPrev={() => idx > 0 && setIdx(idx - 1)}
                  hasPrev={idx > 0}
                  hasNext={idx < TOTAL - 1}
                  fontSize={fontSize}
                />
              </div>

              {/* Right: Docked Question Palette on Desktop */}
              <div className={styles.desktopPalette}>
                <QuestionPalette
                  questions={activeExamData.questions}
                  currentIndex={idx}
                  userStates={states}
                  onSelectQuestion={i => setIdx(i)}
                  sections={activeExamData.sections}
                  activeSectionId={secId}
                  language={language}
                />
              </div>
            </div>
          )}
        </main>

        {/* 3. Mobile / Tablet Slide-Over Question Navigator Drawer */}
        {isPaletteDrawerOpen && (
          <QuestionPalette
            questions={activeExamData.questions}
            currentIndex={idx}
            userStates={states}
            onSelectQuestion={i => setIdx(i)}
            sections={activeExamData.sections}
            activeSectionId={secId}
            language={language}
            isMobileDrawer={true}
            onCloseDrawer={() => setIsPaletteDrawerOpen(false)}
          />
        )}

        {/* 4. Mobile Sticky Bottom Action Bar */}
        {mode === 'practice' && (
          <div className={styles.mobileBottomBar}>
            <button
              className={styles.mobileBtn}
              onClick={() => {
                if (idx > 0) {
                  soundManager.playNavigation();
                  setIdx(idx - 1);
                }
              }}
              disabled={idx === 0}
              aria-label="Previous question"
            >
              <ChevronLeft size={16} />
              <span>Prev</span>
            </button>

            <button
              className={`${styles.mobileBtn} ${cur.isMarkedForReview ? styles.mobileBtnActiveReview : ''}`}
              onClick={toggleReview}
              aria-label="Mark for review"
            >
              <Flag size={15} />
              <span>{cur.isMarkedForReview ? 'Marked' : 'Review'}</span>
            </button>

            <button
              className={styles.mobileBtn}
              onClick={() => setIsPaletteDrawerOpen(true)}
              aria-label="Open question navigator"
            >
              <LayoutGrid size={15} />
              <span>{idx + 1}/{TOTAL}</span>
            </button>

            <button
              className={`${styles.mobileBtn} ${styles.mobileBtnPrimary}`}
              onClick={() => {
                if (idx < TOTAL - 1) {
                  soundManager.playNavigation();
                  setIdx(idx + 1);
                }
              }}
              disabled={idx === TOTAL - 1}
              aria-label="Next question"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        <PrintWorksheet questions={activeExamData.questions} />

        <footer className={styles.footer}>
          Made with <Heart size={11} fill="#d93025" color="#d93025" style={{ verticalAlign: 'middle' }} /> for Anjali Teacher — UTET-II & UKSSSC LT Assistant Teacher Preparation
        </footer>
      </div>

      {/* 5. Keyboard Shortcuts Help Modal */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
}
