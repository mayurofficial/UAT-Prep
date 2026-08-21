'use client';

import React, { useState, useEffect, useCallback } from 'react';
import examDataRaw from '@/data/utet_full_150_solved.json';
import {
  ExamData, AppMode, LanguageMode, UserAnswerState, ExamResults,
} from '@/types/utet';

import { Header } from '@/components/Header';
import { SectionTabs } from '@/components/SectionTabs';
import { TimerBar } from '@/components/TimerBar';
import { QuestionCard } from '@/components/QuestionCard';
import { QuestionPalette } from '@/components/QuestionPalette';
import { HandbookView } from '@/components/HandbookView';
import { ResultDashboard } from '@/components/ResultDashboard';
import { PrintWorksheet } from '@/components/PrintWorksheet';

import styles from './page.module.css';
import { LayoutGrid, Heart } from 'lucide-react';

const examData = examDataRaw as unknown as ExamData;
const TOTAL = examData.questions.length;
const TIMER = 150 * 60;

export default function Home() {
  const [mode, setMode] = useState<AppMode>('practice');
  const [language, setLanguage] = useState<LanguageMode>('bilingual');
  const [isDark, setIsDark] = useState(false);
  const [fontSize, setFontSize] = useState<'small' | 'normal' | 'large'>('normal');
  const [idx, setIdx] = useState(0);
  const [states, setStates] = useState<Record<number, UserAnswerState>>({});
  const [timerSec, setTimerSec] = useState(TIMER);
  const [paused, setPaused] = useState(false);
  const [results, setResults] = useState<ExamResults | null>(null);
  const [showPalette, setShowPalette] = useState(false);

  // Load saved state
  useEffect(() => {
    try {
      const t = localStorage.getItem('utet_theme');
      if (t === 'dark') { setIsDark(true); document.documentElement.setAttribute('data-theme', 'dark'); }
      const l = localStorage.getItem('utet_lang') as LanguageMode;
      if (l) setLanguage(l);
      const s = localStorage.getItem('utet_states');
      if (s) setStates(JSON.parse(s));
    } catch { /* noop */ }
  }, []);

  // Sync theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      try { localStorage.setItem('utet_theme', 'dark'); } catch {}
    } else {
      document.documentElement.removeAttribute('data-theme');
      try { localStorage.setItem('utet_theme', 'light'); } catch {}
    }
  }, [isDark]);

  useEffect(() => { try { localStorage.setItem('utet_lang', language); } catch {} }, [language]);

  const persist = useCallback((s: Record<number, UserAnswerState>) => {
    setStates(s);
    try { localStorage.setItem('utet_states', JSON.stringify(s)); } catch {}
  }, []);

  // Mark visited
  useEffect(() => {
    setStates(prev => {
      const c = prev[idx] || { selectedOption: null, isMarkedForReview: false, isBookmarked: false, visited: false, timeSpentSec: 0 };
      if (!c.visited) {
        const u = { ...prev, [idx]: { ...c, visited: true } };
        try { localStorage.setItem('utet_states', JSON.stringify(u)); } catch {}
        return u;
      }
      return prev;
    });
  }, [idx]);

  // Timer
  useEffect(() => {
    if (mode !== 'exam' || paused || timerSec <= 0) return;
    const t = setInterval(() => {
      setTimerSec(p => { if (p <= 1) { clearInterval(t); submitExam(); return 0; } return p - 1; });
    }, 1000);
    return () => clearInterval(t);
  }, [mode, paused, timerSec]);

  const currentQ = examData.questions[idx];
  const secId = idx < 30 ? 'cdp' : idx < 50 ? 'hindi' : idx < 90 ? 'english' : 'math_science';

  const jumpSection = (id: string) => {
    setIdx(id === 'cdp' ? 0 : id === 'hindi' ? 30 : id === 'english' ? 50 : 90);
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
    const secStats = examData.sections.map(s => ({
      section: s.name, sectionHindi: s.nameHindi, total: s.total, correct: 0, incorrect: 0, skipped: 0,
    }));

    examData.questions.forEach((q, i) => {
      const s = states[i];
      const si = i < 30 ? 0 : i < 50 ? 1 : i < 90 ? 2 : 3;
      if (s?.selectedOption) {
        attempted++;
        if (s.selectedOption === q.correctAnswer) { correct++; secStats[si].correct++; }
        else { incorrect++; secStats[si].incorrect++; }
      } else { secStats[si].skipped++; }
    });

    setResults({
      totalQuestions: TOTAL, attempted, correct, incorrect, skipped: TOTAL - attempted,
      score: correct, percentage: Math.round((correct / TOTAL) * 100),
      timeTakenSec: TIMER - timerSec, sectionScores: secStats,
    });
    setMode('result');
  };

  const retake = () => {
    setStates({}); setTimerSec(TIMER); setIdx(0); setResults(null); setMode('exam');
  };

  const answered = Object.values(states).filter(s => s.selectedOption !== null).length;
  const marked = Object.values(states).filter(s => s.isMarkedForReview).length;
  const cur = states[idx] || { selectedOption: null, isMarkedForReview: false, isBookmarked: false, visited: true, timeSpentSec: 0 };

  return (
    <div className={styles.wrapper}>
      <Header mode={mode} setMode={setMode} language={language} setLanguage={setLanguage}
        isDark={isDark} setIsDark={setIsDark} onPrint={() => window.print()} fontSize={fontSize} setFontSize={setFontSize} />

      {(mode === 'practice' || mode === 'exam') && (
        <SectionTabs sections={examData.sections} activeSectionId={secId}
          onSelectSection={jumpSection} language={language} />
      )}

      {mode === 'exam' && (
        <TimerBar secondsLeft={timerSec} isPaused={paused} onTogglePause={() => setPaused(!paused)}
          onSubmitExam={submitExam} answeredCount={answered} markedCount={marked} totalQuestions={TOTAL} />
      )}

      <main className={styles.main}>
        {mode === 'handbook' && <HandbookView />}

        {mode === 'result' && results && (
          <ResultDashboard results={results} onRetake={retake} onGoToPractice={() => setMode('practice')} />
        )}

        {(mode === 'practice' || mode === 'exam') && (
          <>
            <button className={styles.paletteToggle} onClick={() => setShowPalette(!showPalette)}>
              <LayoutGrid size={14} />
              {showPalette ? 'Hide palette' : 'Show question palette'}
            </button>

            <div className={styles.layout}>
              <div>
                <QuestionCard question={currentQ} mode={mode} language={language} userState={cur}
                  onSelectOption={select} onToggleMarkReview={toggleReview} onToggleBookmark={toggleBookmark}
                  onClearResponse={clearResponse} onNext={() => idx < TOTAL - 1 && setIdx(idx + 1)}
                  onPrev={() => idx > 0 && setIdx(idx - 1)} hasPrev={idx > 0} hasNext={idx < TOTAL - 1}
                  fontSize={fontSize} />
              </div>
              <div className={!showPalette ? styles.sidebarHidden : ''}>
                <QuestionPalette questions={examData.questions} currentIndex={idx} userStates={states}
                  onSelectQuestion={i => { setIdx(i); setShowPalette(false); }} />
              </div>
            </div>
          </>
        )}
      </main>

      <PrintWorksheet questions={examData.questions} />

      <footer className={styles.footer}>
        Made with <Heart size={11} fill="#d93025" color="#d93025" style={{ verticalAlign: 'middle' }} /> for Anjali Teacher — UTET 2026/2027
      </footer>
    </div>
  );
}
