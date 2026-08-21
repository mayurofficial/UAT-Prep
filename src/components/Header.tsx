'use client';

import React from 'react';
import { AppMode, LanguageMode } from '@/types/utet';
import styles from './Header.module.css';
import { GraduationCap, BookOpen, Timer, FileText, Languages, Sun, Moon } from 'lucide-react';

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
}

export const Header: React.FC<HeaderProps> = ({
  mode, setMode, language, setLanguage, isDark, setIsDark,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}><GraduationCap size={18} /></div>
          <span className={styles.title}>UTET Prep</span>
        </div>

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
        </nav>

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

          <div className={styles.avatar} title="Anjali">A</div>
        </div>
      </div>
    </header>
  );
};
