'use client';

import React from 'react';
import styles from './ShortcutsModal.module.css';
import { Keyboard, X } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <div className={styles.iconWrap}>
              <Keyboard size={16} />
            </div>
            <div>
              <div className={styles.title}>Keyboard Shortcuts</div>
              <div className={styles.subtitle}>Supercharge your exam practice with rapid keys</div>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close shortcuts">
            <X size={16} />
          </button>
        </div>

        <div className={styles.body}>
          <div>
            <div className={styles.categoryTitle}>Answering Options</div>
            <div className={styles.shortcutGrid}>
              <div className={styles.shortcutItem}>
                <span className={styles.label}>Select Option A</span>
                <div className={styles.keyWrap}><kbd className={styles.key}>A</kbd> or <kbd className={styles.key}>1</kbd></div>
              </div>
              <div className={styles.shortcutItem}>
                <span className={styles.label}>Select Option B</span>
                <div className={styles.keyWrap}><kbd className={styles.key}>B</kbd> or <kbd className={styles.key}>2</kbd></div>
              </div>
              <div className={styles.shortcutItem}>
                <span className={styles.label}>Select Option C</span>
                <div className={styles.keyWrap}><kbd className={styles.key}>C</kbd> or <kbd className={styles.key}>3</kbd></div>
              </div>
              <div className={styles.shortcutItem}>
                <span className={styles.label}>Select Option D</span>
                <div className={styles.keyWrap}><kbd className={styles.key}>D</kbd> or <kbd className={styles.key}>4</kbd></div>
              </div>
            </div>
          </div>

          <div>
            <div className={styles.categoryTitle}>Navigation & Actions</div>
            <div className={styles.shortcutGrid}>
              <div className={styles.shortcutItem}>
                <span className={styles.label}>Next Question</span>
                <div className={styles.keyWrap}><kbd className={styles.key}>→</kbd> or <kbd className={styles.key}>N</kbd></div>
              </div>
              <div className={styles.shortcutItem}>
                <span className={styles.label}>Previous Question</span>
                <div className={styles.keyWrap}><kbd className={styles.key}>←</kbd> or <kbd className={styles.key}>P</kbd></div>
              </div>
              <div className={styles.shortcutItem}>
                <span className={styles.label}>Mark for Review</span>
                <div className={styles.keyWrap}><kbd className={styles.key}>M</kbd></div>
              </div>
              <div className={styles.shortcutItem}>
                <span className={styles.label}>Bookmark Question</span>
                <div className={styles.keyWrap}><kbd className={styles.key}>B</kbd></div>
              </div>
              <div className={styles.shortcutItem}>
                <span className={styles.label}>Clear Selection</span>
                <div className={styles.keyWrap}><kbd className={styles.key}>Backspace</kbd></div>
              </div>
              <div className={styles.shortcutItem}>
                <span className={styles.label}>Toggle Navigator</span>
                <div className={styles.keyWrap}><kbd className={styles.key}>Q</kbd></div>
              </div>
            </div>
          </div>

          <div>
            <div className={styles.categoryTitle}>App Views & Flashcards</div>
            <div className={styles.shortcutGrid}>
              <div className={styles.shortcutItem}>
                <span className={styles.label}>Daily Flashcards (5-Min)</span>
                <div className={styles.keyWrap}><kbd className={styles.key}>F</kbd></div>
              </div>
              <div className={styles.shortcutItem}>
                <span className={styles.label}>Flip Flashcard / Space</span>
                <div className={styles.keyWrap}><kbd className={styles.key}>Space</kbd></div>
              </div>
              <div className={styles.shortcutItem}>
                <span className={styles.label}>LT Study Hub</span>
                <div className={styles.keyWrap}><kbd className={styles.key}>S</kbd></div>
              </div>
              <div className={styles.shortcutItem}>
                <span className={styles.label}>Help / Shortcuts</span>
                <div className={styles.keyWrap}><kbd className={styles.key}>?</kbd></div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          Press <kbd className={styles.key}>Esc</kbd> anytime to close this modal.
        </div>
      </div>
    </div>
  );
};
