'use client';

import React from 'react';
import { AppMode, LanguageMode } from '@/types/utet';
import { PaperMeta } from '@/data/paperRegistry';
import styles from './TopNavbar.module.css';
import {
  Menu,
  Languages,
  LayoutGrid,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface TopNavbarProps {
  onToggleSidebar: () => void;
  activePaper: PaperMeta;
  mode: AppMode;
  language: LanguageMode;
  setLanguage: (lang: LanguageMode) => void;
  fontSize: 'small' | 'normal' | 'large';
  setFontSize: (size: 'small' | 'normal' | 'large') => void;
  onTogglePalette: () => void;
  currentIndex: number;
  totalQuestions: number;
  syncStatus?: 'synced' | 'saving' | 'offline';
  onOpenFlashcards?: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onToggleSidebar,
  activePaper,
  mode,
  language,
  setLanguage,
  fontSize,
  setFontSize,
  onTogglePalette,
  currentIndex,
  totalQuestions,
  syncStatus = 'synced',
  onOpenFlashcards,
}) => {
  const isOfficial = activePaper?.category === 'OFFICIAL_PYQ';

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        {/* Left: Mobile Menu Trigger & Paper Pill & Cloud Sync */}
        <div className={styles.leftGroup}>
          <button
            className={styles.menuBtn}
            onClick={onToggleSidebar}
            aria-label="Toggle Navigation Menu"
          >
            <Menu size={18} />
          </button>

          <div className={styles.paperPill}>
            <span className={styles.paperPillBadge}>
              {activePaper.year}
            </span>
            <span>{activePaper.title}</span>
          </div>

          {onOpenFlashcards && (
            <button
              onClick={onOpenFlashcards}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(239, 68, 68, 0.08))',
                border: '1px solid rgba(245, 158, 11, 0.35)',
                borderRadius: 'var(--radius-full)',
                color: '#b45309',
                fontSize: 'var(--text-2xs)',
                fontWeight: 700,
                cursor: 'pointer',
              }}
              title="Open 5-Minute Daily Concept Flashcards (Key: F)"
            >
              <Sparkles size={12} color="#f59e0b" />
              <span>Flashcards (5-Min)</span>
            </button>
          )}

          <div
            className={`${styles.cloudSyncBadge} ${
              syncStatus === 'saving' ? styles.cloudSyncSaving : ''
            }`}
            title="Cloud Database Sync (Netlify Blobs)"
          >
            <span className={styles.cloudDot} />
            <span>{syncStatus === 'saving' ? 'Syncing...' : 'Cloud Synced'}</span>
          </div>
        </div>

        {/* Right: Language & Text Size & Question Palette Trigger */}
        <div className={styles.rightGroup}>
          {/* Language Selector */}
          <div className={styles.langSelectWrap}>
            <Languages size={13} />
            <select
              className={styles.langSelect}
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageMode)}
              aria-label="Language Mode"
            >
              <option value="bilingual">द्विभाषी (Bi)</option>
              <option value="hindi">हिन्दी (HI)</option>
              <option value="english">English (EN)</option>
            </select>
          </div>

          {/* Font Size Adjuster */}
          <div className={styles.fontBtnGroup} title="Adjust question text size">
            <button
              className={`${styles.fontBtn} ${fontSize === 'small' ? styles.fontBtnActive : ''}`}
              onClick={() => setFontSize('small')}
            >
              A-
            </button>
            <button
              className={`${styles.fontBtn} ${fontSize === 'normal' ? styles.fontBtnActive : ''}`}
              onClick={() => setFontSize('normal')}
            >
              A
            </button>
            <button
              className={`${styles.fontBtn} ${fontSize === 'large' ? styles.fontBtnActive : ''}`}
              onClick={() => setFontSize('large')}
            >
              A+
            </button>
          </div>

          {/* Palette button for mobile/tablet in Practice mode */}
          {mode === 'practice' && (
            <button
              className={styles.navPaletteBtn}
              onClick={onTogglePalette}
              aria-label="Toggle Question Navigator"
            >
              <LayoutGrid size={13} />
              <span>{currentIndex + 1}/{totalQuestions}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
