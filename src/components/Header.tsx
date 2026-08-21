'use client';

import React from 'react';
import { AppMode, LanguageMode, TargetExam } from '@/types/utet';
import styles from './Header.module.css';
import {
  GraduationCap,
  BookOpen,
  Timer,
  FileText,
  Compass,
  Languages,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  language: LanguageMode;
  setLanguage: (lang: LanguageMode) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  onPrint: () => void;
  fontSize: 'small' | 'normal' | 'large';
  setFontSize: (size: 'small' | 'normal' | 'large') => void;
  selectedExam: TargetExam;
  setSelectedExam: (exam: TargetExam) => void;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  setMode,
  language,
  setLanguage,
  isDark,
  setIsDark,
  selectedExam,
  setSelectedExam
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Brand & Exam Switcher */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <GraduationCap size={18} />
          </div>
          <div className={styles.brandInfo}>
            <span className={styles.title}>Anjali Teacher Hub</span>
            <div className={styles.examToggleContainer}>
              <button
                className={`${styles.examPill} ${selectedExam === 'UTET' ? styles.examPillActiveUtet : ''}`}
                onClick={() => setSelectedExam('UTET')}
                title="Switch to UTET-II Eligibility Paper"
              >
                UTET-II (150Q)
              </button>
              <button
                className={`${styles.examPill} ${selectedExam === 'LT' ? styles.examPillActiveLt : ''}`}
                onClick={() => setSelectedExam('LT')}
                title="Switch to UKSSSC LT Assistant Teacher Exam"
              >
                LT Grade (100Q)
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Modes */}
        <nav className={styles.modes}>
          <button
            className={`${styles.modeBtn} ${mode === 'practice' ? styles.modeBtnActive : ''}`}
            onClick={() => setMode('practice')}
          >
            <BookOpen size={15} />
            <span>अभ्यास (Practice)</span>
          </button>
          <button
            className={`${styles.modeBtn} ${mode === 'exam' ? styles.modeBtnActive : ''}`}
            onClick={() => setMode('exam')}
          >
            <Timer size={15} />
            <span>मॉक टेस्ट (Exam)</span>
          </button>
          <button
            className={`${styles.modeBtn} ${mode === 'handbook' ? styles.modeBtnActive : ''}`}
            onClick={() => setMode('handbook')}
          >
            <FileText size={15} />
            <span>नोट्स (Notes)</span>
          </button>
          <button
            className={`${styles.modeBtn} ${mode === 'guide' ? styles.modeBtnActive : ''}`}
            onClick={() => setMode('guide')}
          >
            <Compass size={15} />
            <span>रणनीति (Guide)</span>
          </button>
        </nav>

        {/* Controls */}
        <div className={styles.actions}>
          <div className={styles.langSelect}>
            <Languages size={14} />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageMode)}
              aria-label="Language"
            >
              <option value="bilingual">द्विभाषी</option>
              <option value="hindi">हिन्दी</option>
              <option value="english">English</option>
            </select>
          </div>

          <button className={styles.iconBtn} onClick={() => setIsDark(!isDark)} aria-label="Toggle theme">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div
            className={styles.avatar}
            title={`Anjali - Preparing for ${selectedExam === 'UTET' ? 'UTET-II' : 'UKSSSC LT Grade'}`}
          >
            A
          </div>
        </div>
      </div>
    </header>
  );
};
