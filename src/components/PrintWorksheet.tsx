'use client';

import React from 'react';
import { QuestionItem } from '@/types/utet';
import styles from './PrintWorksheet.module.css';

interface PrintWorksheetProps {
  questions: QuestionItem[];
}

export const PrintWorksheet: React.FC<PrintWorksheetProps> = ({ questions }) => {
  const isLt = questions.length === 100;
  const examTitle = isLt
    ? 'UKSSSC सहायक अध्यापक L.T. (Assistant Teacher) • सम्पूर्ण प्रश्नपत्र एवं व्याख्या तालिका'
    : 'UTET-II Paper • सम्पूर्ण प्रश्नपत्र एवं व्याख्या सहित उत्तर तालिका';

  return (
    <div className={styles.printContainer}>
      <div className={styles.printHeader}>
        <div className={styles.printTitle}>{examTitle}</div>
        <div className={styles.printSub}>
          Candidate: Anjali Teacher | Total Questions: {questions.length} (Bilingual: Hindi & English)
          {isLt && ' | -0.25 Negative Marking Scheme'}
        </div>
      </div>

      {questions.map((q) => (
        <div key={q.id} className={styles.printQuestionItem}>
          <div className={styles.printQNum}>
            Q{q.questionNumber}. [{q.sectionHindi} / {q.section}]
            {q.part && ` — ${q.part}`}
          </div>

          <div><strong>English:</strong> {q.question.english}</div>
          <div style={{ marginTop: '2px' }}><strong>हिन्दी:</strong> {q.question.hindi}</div>

          <div className={styles.printOptionsGrid}>
            {q.options.map((opt) => (
              <div key={opt.id} className={styles.printOption}>
                <strong>({opt.id})</strong> {opt.english} / {opt.hindi}
              </div>
            ))}
          </div>

          <div className={styles.printSolution}>
            <span className={styles.printCorrectAns}>सही उत्तर: ({q.correctAnswer})</span>
            <div style={{ marginTop: '4px' }}>
              <strong>हल:</strong> {q.explanation.hindi || q.explanation.english}
            </div>
            {q.conceptCard?.mnemonicOrTrick && (
              <div style={{ marginTop: '4px', fontStyle: 'italic' }}>
                {q.conceptCard.mnemonicOrTrick}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
