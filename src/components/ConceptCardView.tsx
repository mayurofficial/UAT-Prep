'use client';

import React from 'react';
import { ConceptCard, LanguageMode } from '@/types/utet';
import styles from './ConceptCardView.module.css';
import { Lightbulb, CheckCircle2, Sparkles, AlertTriangle } from 'lucide-react';

interface ConceptCardViewProps {
  concept: ConceptCard;
  explanation: { english: string; hindi: string };
  correctOptionLetter: string;
  language: LanguageMode;
}

export const ConceptCardView: React.FC<ConceptCardViewProps> = ({
  concept, explanation, correctOptionLetter, language,
}) => {
  return (
    <div className={styles.concept}>
      <div className={styles.conceptHeader}>
        <span><Lightbulb size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />Concept Card</span>
        {concept.topic && <span className={styles.topicTag}>{concept.topic}</span>}
      </div>

      <div className={styles.conceptBody}>
        {/* Solution */}
        <div className={styles.section}>
          <div className={`${styles.sectionLabel} ${styles.labelSolution}`}>
            <CheckCircle2 size={14} />
            Answer: ({correctOptionLetter})
          </div>
          <div className={styles.content}>
            {language !== 'hindi' && <div>{explanation.english}</div>}
            {language !== 'english' && (
              <div className={language === 'bilingual' ? styles.contentHi : ''}>{explanation.hindi}</div>
            )}
          </div>
        </div>

        {/* Theory */}
        {concept.keyConceptEnglish && (
          <div className={styles.section}>
            <div className={`${styles.sectionLabel} ${styles.labelTheory}`}>
              <Lightbulb size={14} />
              Core Concept
            </div>
            <div className={styles.content}>
              {language !== 'hindi' && <div>{concept.keyConceptEnglish}</div>}
              {language !== 'english' && concept.keyConceptHindi && (
                <div className={language === 'bilingual' ? styles.contentHi : ''}>{concept.keyConceptHindi}</div>
              )}
            </div>
          </div>
        )}

        {/* Trick */}
        {concept.mnemonicOrTrick && (
          <div className={`${styles.section} ${styles.trickBox}`}>
            <div className={`${styles.sectionLabel} ${styles.labelTrick}`}>
              <Sparkles size={14} />
              Memory Trick
            </div>
            <div className={styles.content}>{concept.mnemonicOrTrick}</div>
          </div>
        )}

        {/* Trap */}
        {concept.trapAlert && (
          <div className={`${styles.section} ${styles.trapBox}`}>
            <div className={`${styles.sectionLabel} ${styles.labelTrap}`}>
              <AlertTriangle size={14} />
              Trap Alert
            </div>
            <div className={styles.content}>{concept.trapAlert}</div>
          </div>
        )}
      </div>
    </div>
  );
};
