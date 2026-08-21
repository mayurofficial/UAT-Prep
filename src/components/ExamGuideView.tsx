'use client';

import React from 'react';
import { TargetExam } from '@/types/utet';
import styles from './ExamGuideView.module.css';
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  Award,
  Sparkles,
  ArrowRightLeft,
  Clock,
  BookOpen,
  Briefcase,
  GraduationCap
} from 'lucide-react';

interface ExamGuideViewProps {
  currentExam: TargetExam;
  onSelectExam: (exam: TargetExam) => void;
  onStartPractice: () => void;
}

export const ExamGuideView: React.FC<ExamGuideViewProps> = ({
  currentExam,
  onSelectExam,
  onStartPractice
}) => {
  return (
    <div className={styles.guideContainer}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroBadge}>
          <Compass size={13} />
          Anjali's Exam Strategy & Roadmap
        </div>
        <h1 className={styles.heroTitle}>UTET-II vs UKSSSC LT Grade Exam Guide</h1>
        <p className={styles.heroSub}>
          Understand the exact difference between the eligibility qualifying examination (UTET) and the direct government teacher recruitment examination (LT Grade), along with targeted preparation strategies.
        </p>
      </div>

      {/* Quick Cards */}
      <div className={styles.cardGrid}>
        {/* UTET Card */}
        <div className={styles.examCard}>
          <div className={styles.examCardHeader}>
            <div className={styles.examName}>
              <GraduationCap size={20} color="var(--blue)" />
              UTET-II (Paper II)
            </div>
            <span className={`${styles.examTag} ${styles.tagBlue}`}>पात्रता परीक्षा (Qualifying)</span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
            Conducted by UBSE Ramnagar for certifying eligibility to teach Upper Primary classes (Classes 6 to 8).
          </p>
          <div className={styles.specsList}>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Total Questions:</span>
              <span className={styles.specVal}>150 Questions</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Exam Duration:</span>
              <span className={styles.specVal}>150 Minutes (2.5 Hours)</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Negative Marking:</span>
              <span className={styles.specVal} style={{ color: '#16a34a' }}>0 (No Negative Marking)</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Target Qualifying Score:</span>
              <span className={styles.specVal}>≥ 60% (90 / 150 Marks)</span>
            </div>
          </div>
          <button
            className={styles.switchExamBtn}
            onClick={() => { onSelectExam('UTET'); onStartPractice(); }}
            style={{ background: currentExam === 'UTET' ? 'var(--blue)' : 'var(--text-primary)' }}
          >
            {currentExam === 'UTET' ? 'Currently Active • Practice UTET' : 'Switch to UTET Mode'}
          </button>
        </div>

        {/* LT Card */}
        <div className={styles.examCard}>
          <div className={styles.examCardHeader}>
            <div className={styles.examName}>
              <Briefcase size={20} color="#e37400" />
              UKSSSC LT Grade Teacher
            </div>
            <span className={`${styles.examTag} ${styles.tagOrange}`}>सीधी चयन भर्ती (Recruitment)</span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
            Conducted by UKSSSC for direct appointment as Assistant Teacher (LT Grade, Pay Level 7) for secondary classes (9-10).
          </p>
          <div className={styles.specsList}>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Total Questions:</span>
              <span className={styles.specVal}>100 Questions (100 Marks)</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Exam Duration:</span>
              <span className={styles.specVal}>120 Minutes (2 Hours)</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Negative Marking:</span>
              <span className={styles.specVal} style={{ color: '#d93025' }}>-0.25 Mark per wrong answer</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Selection Basis:</span>
              <span className={styles.specVal}>State Merit Rank (Target 75+)</span>
            </div>
          </div>
          <button
            className={styles.switchExamBtn}
            onClick={() => { onSelectExam('LT'); onStartPractice(); }}
            style={{ background: currentExam === 'LT' ? '#e37400' : 'var(--text-primary)' }}
          >
            {currentExam === 'LT' ? 'Currently Active • Practice LT Grade' : 'Switch to LT Grade Mode'}
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className={styles.tableSection}>
        <div className={styles.sectionHeading}>
          <ArrowRightLeft size={18} color="var(--blue)" />
          Comprehensive Syllabus & Pattern Comparison
        </div>
        <table className={styles.compareTable}>
          <thead>
            <tr>
              <th style={{ width: '22%' }}>Parameter</th>
              <th style={{ width: '39%' }}>UTET-II (Upper Primary)</th>
              <th style={{ width: '39%' }}>UKSSSC LT Grade (Assistant Teacher)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.highlightText}>Exam Level & Role</td>
              <td>Class 6–8 Elementary Teacher Eligibility</td>
              <td>Class 9–10 Secondary Teacher Direct Appointment (Pay Level 7)</td>
            </tr>
            <tr>
              <td className={styles.highlightText}>Structure / Sections</td>
              <td>
                • Child Dev & Pedagogy (30 Qs)<br />
                • Language I Hindi (20 Qs)<br />
                • Language II English (40 Qs)<br />
                • Science & Mathematics (60 Qs)
              </td>
              <td>
                • <strong>Part 1 (30 Qs):</strong> Teaching Aptitude, Uttarakhand GK, Reasoning & ICT<br />
                • <strong>Part 2 (70 Qs):</strong> Core Subject Specialization (Graduation-level Science/Maths)
              </td>
            </tr>
            <tr>
              <td className={styles.highlightText}>Marking System</td>
              <td>
                <span style={{ color: '#16a34a', fontWeight: 700 }}>+1 per correct answer</span><br />
                No penalty for wrong or skipped answers
              </td>
              <td>
                <span style={{ color: '#16a34a', fontWeight: 700 }}>+1 per correct answer</span><br />
                <span style={{ color: '#d93025', fontWeight: 700 }}>-0.25 penalty</span> for each incorrect answer
              </td>
            </tr>
            <tr>
              <td className={styles.highlightText}>Strategy Focus</td>
              <td>
                <strong>100% Question Attempt:</strong> Attempt all 150 questions. Use elimination tricks even when unsure.
              </td>
              <td>
                <strong>High Accuracy & Precision:</strong> Skip high-doubt questions to prevent negative score erosion.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Strategy Grid */}
      <div className={styles.strategyBox}>
        <div className={styles.strategyTitle}>
          <Sparkles size={18} color="#e37400" />
          Anjali's Preparation Blueprint
        </div>
        <div className={styles.strategyGrid}>
          <div className={styles.strategyItem}>
            <strong>1. Master Part 1 for LT (30 Marks Foundation)</strong>
            Focus on Action Research (क्रियात्मक अनुसंधान), Microteaching 36-min cycle, Bloom's Revised Taxonomy, and Uttarakhand State GK facts (Rivers, Peaks, Parks, and Schemes).
          </div>
          <div className={styles.strategyItem}>
            <strong>2. Deep Dive into Science Specialization (70 Marks)</strong>
            Revise Graduation-level organic reaction mechanisms, physical chemistry formulas, ray optics, thermodynamics, genetics, and plant/animal physiology.
          </div>
          <div className={styles.strategyItem}>
            <strong>3. Practice with Negative Marking Engine</strong>
            Use the LT Exam Mode in this app regularly to build calculated risk intuition and achieve &gt;85% accuracy under timed pressure.
          </div>
          <div className={styles.strategyItem}>
            <strong>4. UTET Guarantee: Secure 120+ Score</strong>
            Ensure solid command over CDP (Piaget, Vygotsky, Kohlberg) and Hindi/English grammar to comfortably surpass the 90-mark qualifying line.
          </div>
        </div>
      </div>

      {/* Switch Banner */}
      <div className={styles.actionBanner}>
        <div className={styles.bannerText}>
          Currently studying for: <strong>{currentExam === 'UTET' ? 'UTET-II (150 Questions)' : 'UKSSSC LT Grade (100 Questions)'}</strong>
        </div>
        <button
          className={styles.switchExamBtn}
          onClick={onStartPractice}
        >
          <BookOpen size={14} />
          Start {currentExam} Practice
        </button>
      </div>
    </div>
  );
};
