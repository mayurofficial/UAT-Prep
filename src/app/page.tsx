'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  ExamData, AppMode, LanguageMode, UserAnswerState, ExamResults, TargetExam,
} from '@/types/utet';
import { getPapersForExam, getPaperData } from '@/data/paperRegistry';

import { Header } from '@/components/Header';
import { SectionTabs } from '@/components/SectionTabs';
import { TimerBar } from '@/components/TimerBar';
import { QuestionCard } from '@/components/QuestionCard';
import { QuestionPalette } from '@/components/QuestionPalette';
import { HandbookView } from '@/components/HandbookView';
import { ExamGuideView } from '@/components/ExamGuideView';
import { ResultDashboard } from '@/components/ResultDashboard';
import { PrintWorksheet } from '@/components/PrintWorksheet';

import styles from './page.module.css';
import { LayoutGrid, Heart } from 'lucide-react';

export default function Home() {
  const [selectedExam, setSelectedExam] = useState<TargetExam>('UTET');
  const [selectedPaperId, setSelectedPaperId] = useState<string>('utet_2025');
  const [mode, setMode] = useState<AppMode>('practice');
  const [language, setLanguage] = useState<LanguageMode>('bilingual');
  const [isDark, setIsDark] = useState(false);
  const [fontSize, setFontSize] = useState<'small' | 'normal' | 'large'>('normal');
  const [idx, setIdx] = useState(0);
  const [states, setStates] = useState<Record<number, UserAnswerState>>({});
  const [timerSec, setTimerSec] = useState(150 * 60);
  const [paused, setPaused] = useState(false);
  const [results, setResults] = useState<ExamResults | null>(null);
  const [showPalette, setShowPalette] = useState(false);

  const activeExamData: ExamData = getPaperData(selectedPaperId);
  const TOTAL = activeExamData.questions.length;
  const EXAM_TIMER = (activeExamData.durationMinutes || 150) * 60;
  const availablePapers = getPapersForExam(selectedExam);

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

  // Handle Target Exam Change
  const handleExamChange = (newExam: TargetExam) => {
    if (newExam === selectedExam) return;
    setSelectedExam(newExam);
    const newPapers = getPapersForExam(newExam);
    const newDefaultPaper = newPapers[0]?.id || (newExam === 'LT' ? 'lt_2025' : 'utet_2025');
    handlePaperChange(newDefaultPaper);
    try { localStorage.setItem('anjali_target_exam', newExam); } catch {}
  };

  // Handle Specific Paper Change (e.g. 2025 vs 2023 vs 2022 vs 2021 vs 2020)
  const handlePaperChange = (newPaperId: string) => {
    setSelectedPaperId(newPaperId);
    setIdx(0);
    setResults(null);
    setShowPalette(false);

    try {
      localStorage.setItem('anjali_selected_paper', newPaperId);
      const storageKey = `anjali_paper_${newPaperId}_states`;
      const stored = localStorage.getItem(storageKey);
      setStates(stored ? JSON.parse(stored) : {});
    } catch {
      setStates({});
    }

    const paperData = getPaperData(newPaperId);
    setTimerSec((paperData.durationMinutes || 150) * 60);
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

  // Timer countdown
  useEffect(() => {
    if (mode !== 'exam' || paused || timerSec <= 0) return;
    const t = setInterval(() => {
      setTimerSec(p => {
        if (p <= 1) {
          clearInterval(t);
          submitExam();
          return 0;
        }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [mode, paused, timerSec]);

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
      timeTakenSec: EXAM_TIMER - timerSec,
      isQualifiedOrTopTier: selectedExam === 'LT' ? netScore >= 60 : grossScore >= 90,
      sectionScores: secStats,
    });
    setMode('result');
  };

  const retake = () => {
    setStates({});
    setTimerSec(EXAM_TIMER);
    setIdx(0);
    setResults(null);
    setMode('exam');
  };

  const answered = Object.values(states).filter(s => s.selectedOption !== null).length;
  const marked = Object.values(states).filter(s => s.isMarkedForReview).length;
  const cur = states[idx] || { selectedOption: null, isMarkedForReview: false, isBookmarked: false, visited: true, timeSpentSec: 0 };

  return (
    <div className={styles.wrapper}>
      <Header
        mode={mode}
        setMode={setMode}
        language={language}
        setLanguage={setLanguage}
        isDark={isDark}
        setIsDark={setIsDark}
        onPrint={() => window.print()}
        fontSize={fontSize}
        setFontSize={setFontSize}
        selectedExam={selectedExam}
        setSelectedExam={handleExamChange}
        selectedPaperId={selectedPaperId}
        setSelectedPaperId={handlePaperChange}
        availablePapers={availablePapers}
      />

      {(mode === 'practice' || mode === 'exam') && (
        <SectionTabs
          sections={activeExamData.sections}
          activeSectionId={secId}
          onSelectSection={jumpSection}
          language={language}
        />
      )}

      {mode === 'exam' && (
        <TimerBar
          secondsLeft={timerSec}
          isPaused={paused}
          onTogglePause={() => setPaused(!paused)}
          onSubmitExam={submitExam}
          answeredCount={answered}
          markedCount={marked}
          totalQuestions={TOTAL}
          targetExam={selectedExam}
          hasNegativeMarking={activeExamData.hasNegativeMarking}
        />
      )}

      <main className={styles.main}>
        {mode === 'handbook' && <HandbookView />}

        {mode === 'guide' && (
          <ExamGuideView
            currentExam={selectedExam}
            onSelectExam={handleExamChange}
            onStartPractice={() => setMode('practice')}
          />
        )}

        {mode === 'result' && results && (
          <ResultDashboard
            results={results}
            onRetake={retake}
            onGoToPractice={() => setMode('practice')}
          />
        )}

        {(mode === 'practice' || mode === 'exam') && (
          <>
            <button className={styles.paletteToggle} onClick={() => setShowPalette(!showPalette)}>
              <LayoutGrid size={14} />
              {showPalette ? 'Hide question palette' : 'Show question palette'}
            </button>

            <div className={styles.layout}>
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
              <div className={!showPalette ? styles.sidebarHidden : ''}>
                <QuestionPalette
                  questions={activeExamData.questions}
                  currentIndex={idx}
                  userStates={states}
                  onSelectQuestion={i => { setIdx(i); setShowPalette(false); }}
                />
              </div>
            </div>
          </>
        )}
      </main>

      <PrintWorksheet questions={activeExamData.questions} />

      <footer className={styles.footer}>
        Made with <Heart size={11} fill="#d93025" color="#d93025" style={{ verticalAlign: 'middle' }} /> for Anjali Teacher — UTET & UKSSSC LT Grade (2020–2025 PYQs)
      </footer>
    </div>
  );
}
