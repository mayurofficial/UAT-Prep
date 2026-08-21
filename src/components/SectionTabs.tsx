'use client';

import React from 'react';
import { ExamSection, LanguageMode } from '@/types/utet';
import styles from './SectionTabs.module.css';

interface SectionTabsProps {
  sections: ExamSection[];
  activeSectionId: string;
  onSelectSection: (id: string) => void;
  language: LanguageMode;
}

export const SectionTabs: React.FC<SectionTabsProps> = ({
  sections, activeSectionId, onSelectSection, language,
}) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.tabs}>
        {sections.map((sec) => {
          const isActive = activeSectionId === sec.id;
          const label = language === 'english' ? sec.name : sec.nameHindi;
          return (
            <button
              key={sec.id}
              className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
              onClick={() => onSelectSection(sec.id)}
            >
              {label}
              <span className={styles.count}>{sec.total}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
