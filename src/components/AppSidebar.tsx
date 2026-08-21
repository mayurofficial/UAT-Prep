'use client';

import React from 'react';
import { AppMode, TargetExam } from '@/types/utet';
import { PaperMeta } from '@/data/paperRegistry';
import styles from './AppSidebar.module.css';
import {
  BookOpen,
  GraduationCap,
  BarChart3,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Keyboard,
  X,
  Layers
} from 'lucide-react';

interface AppSidebarProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  selectedExam: TargetExam;
  setSelectedExam: (exam: TargetExam) => void;
  selectedPaperId: string;
  setSelectedPaperId: (paperId: string) => void;
  availablePapers: PaperMeta[];
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  isSoundEnabled: boolean;
  setIsSoundEnabled: (enabled: boolean) => void;
  onOpenShortcuts: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  mode,
  setMode,
  selectedExam,
  setSelectedExam,
  selectedPaperId,
  setSelectedPaperId,
  availablePapers,
  isOpen,
  onClose,
  isDark,
  setIsDark,
  isSoundEnabled,
  setIsSoundEnabled,
  onOpenShortcuts
}) => {
  const officialPyqs = availablePapers.filter(p => p.category === 'OFFICIAL_PYQ');
  const modelTests = availablePapers.filter(p => p.category === 'MODEL_TEST');
  const activePaperMeta = availablePapers.find(p => p.id === selectedPaperId) || availablePapers[0];
  const isOfficial = activePaperMeta?.category === 'OFFICIAL_PYQ';

  const handleNavClick = (targetMode: AppMode) => {
    setMode(targetMode);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />}

      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        {/* 1. Header Brand */}
        <div className={styles.brandHeader}>
          <div className={styles.brandMain}>
            <div className={styles.logoIcon}>
              <GraduationCap size={20} />
            </div>
            <div className={styles.brandText}>
              <span className={styles.brandTitle}>Anjali Teacher Hub</span>
              <span className={styles.brandSubtitle}>UTET & LT Preparation</span>
            </div>
          </div>
          <button className={styles.closeMobileBtn} onClick={onClose} aria-label="Close sidebar">
            <X size={18} />
          </button>
        </div>

        {/* 2. Target Exam Switcher */}
        <div className={styles.sectionBlock}>
          <div className={styles.blockLabel}>Target Exam (लक्षित परीक्षा)</div>
          <div className={styles.examSwitchPills}>
            <button
              className={`${styles.examPill} ${selectedExam === 'UTET' ? styles.examPillActiveUtet : ''}`}
              onClick={() => setSelectedExam('UTET')}
            >
              <span>UTET-II</span>
            </button>
            <button
              className={`${styles.examPill} ${selectedExam === 'LT' ? styles.examPillActiveLt : ''}`}
              onClick={() => setSelectedExam('LT')}
            >
              <span>LT Grade</span>
            </button>
          </div>

          {/* Paper Selector Dropdown */}
          <div className={styles.paperSelectContainer}>
            {isOfficial ? (
              <span className={`${styles.paperTypeTag} ${styles.tagOfficial}`}>
                <ShieldCheck size={11} /> PYQ
              </span>
            ) : (
              <span className={`${styles.paperTypeTag} ${styles.tagModel}`}>
                <Sparkles size={11} /> Mock
              </span>
            )}

            <select
              className={styles.paperSelect}
              value={selectedPaperId}
              onChange={(e) => setSelectedPaperId(e.target.value)}
              aria-label="Select Question Paper"
            >
              {officialPyqs.length > 0 && (
                <optgroup label="🏛️ Official Previous Year Papers (PYQ)">
                  {officialPyqs.map((paper) => (
                    <option key={paper.id} value={paper.id}>
                      {paper.year} • {paper.title} ({paper.totalQuestions}Q)
                    </option>
                  ))}
                </optgroup>
              )}

              {modelTests.length > 0 && (
                <optgroup label="⚡ Model & Practice Mock Papers">
                  {modelTests.map((paper) => (
                    <option key={paper.id} value={paper.id}>
                      {paper.year} • {paper.title} ({paper.totalQuestions}Q)
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
            <ChevronDown size={13} className={styles.selectChevron} />
          </div>
        </div>

        {/* 3. Navigation Links */}
        <div className={styles.navContainer}>
          <div className={styles.blockLabel}>Main Modes (मुख्य अनुभाग)</div>

          <button
            className={`${styles.navItem} ${mode === 'practice' ? styles.navItemActive : ''}`}
            onClick={() => handleNavClick('practice')}
          >
            <div className={styles.navItemLeft}>
              <span className={styles.navItemIcon}><BookOpen size={16} /></span>
              <span>Practice (अभ्यास मोड)</span>
            </div>
            <span className={styles.navBadge}>Instant Key</span>
          </button>

          <button
            className={`${styles.navItem} ${mode === 'syllabus' ? styles.navItemActive : ''}`}
            onClick={() => handleNavClick('syllabus')}
          >
            <div className={styles.navItemLeft}>
              <span className={styles.navItemIcon}><Layers size={16} /></span>
              <span>LT Syllabus (पाठ्यक्रम)</span>
            </div>
            <span className={styles.navBadge}>16 Subjects</span>
          </button>

          {mode === 'result' && (
            <button
              className={`${styles.navItem} ${styles.navItemActive}`}
              onClick={() => handleNavClick('result')}
            >
              <div className={styles.navItemLeft}>
                <span className={styles.navItemIcon}><BarChart3 size={16} /></span>
                <span>Results & Analytics</span>
              </div>
              <span className={styles.navBadge}>Active</span>
            </button>
          )}
        </div>

        {/* 4. Bottom Utility Toolbar & Profile */}
        <div className={styles.sidebarFooter}>
          <div className={styles.utilityRow}>
            <button
              className={styles.utilBtn}
              onClick={() => setIsDark(!isDark)}
              title="Toggle Dark / Light Theme"
            >
              {isDark ? <Sun size={13} /> : <Moon size={13} />}
              <span>{isDark ? 'Light' : 'Dark'}</span>
            </button>

            <button
              className={styles.utilBtn}
              onClick={() => setIsSoundEnabled(!isSoundEnabled)}
              title="Toggle Audio Feedback"
            >
              {isSoundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
              <span>{isSoundEnabled ? 'Audio On' : 'Muted'}</span>
            </button>

            <button
              className={styles.utilBtn}
              onClick={onOpenShortcuts}
              title="Keyboard Shortcuts Guide"
            >
              <Keyboard size={13} />
              <span>Keys</span>
            </button>
          </div>

          <div className={styles.profileChip}>
            <div className={styles.avatar}>A</div>
            <div className={styles.profileInfo}>
              <span className={styles.profileName}>Anjali Teacher</span>
              <span className={styles.profileStatus}>
                <span className={styles.statusDot}></span>
                {selectedExam === 'UTET' ? 'UTET-II Aspirant' : 'LT Grade Science/Maths'}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
