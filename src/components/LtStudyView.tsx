'use client';

import React, { useState, useEffect } from 'react';
import { LT_SYLLABUS_MODULES, StudyModule, StudyTopic } from '@/data/lt_syllabus_data';
import styles from './LtStudyView.module.css';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Search,
  Sparkles,
  AlertTriangle,
  HelpCircle,
  Award,
  Printer,
  BookmarkCheck,
  BrainCircuit,
  Mountain,
  Binary,
  Atom,
  Eye,
  EyeOff
} from 'lucide-react';

interface LtStudyViewProps {
  onStartPractice?: () => void;
}

export const LtStudyView: React.FC<LtStudyViewProps> = ({ onStartPractice }) => {
  const [activeModuleId, setActiveModuleId] = useState<string>('pedagogy');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedTopicIds, setExpandedTopicIds] = useState<Record<string, boolean>>({
    'growth-development': true,
    'constructivist-theories': true
  });
  const [completedTopicIds, setCompletedTopicIds] = useState<Record<string, boolean>>({});
  const [quizResponses, setQuizResponses] = useState<Record<string, string>>({});

  // Load completed topics from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('anjali_lt_completed_topics');
      if (stored) {
        setCompletedTopicIds(JSON.parse(stored));
      }
    } catch {
      // noop
    }
  }, []);

  const toggleCompleteTopic = (topicId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCompletedTopicIds(prev => {
      const next = { ...prev, [topicId]: !prev[topicId] };
      try {
        localStorage.setItem('anjali_lt_completed_topics', JSON.stringify(next));
      } catch {
        // noop
      }
      return next;
    });
  };

  const toggleExpand = (topicId: string) => {
    setExpandedTopicIds(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    LT_SYLLABUS_MODULES.forEach(m => {
      m.topics.forEach(t => {
        all[t.id] = true;
      });
    });
    setExpandedTopicIds(all);
  };

  const collapseAll = () => {
    setExpandedTopicIds({});
  };

  const handleQuizSelect = (topicId: string, qIndex: number, optionId: string) => {
    const key = `${topicId}_q${qIndex}`;
    setQuizResponses(prev => ({
      ...prev,
      [key]: optionId
    }));
  };

  // Calculate overall stats
  const totalTopicsCount = LT_SYLLABUS_MODULES.reduce((acc, m) => acc + m.topics.length, 0);
  const completedTopicsCount = Object.values(completedTopicIds).filter(Boolean).length;
  const progressPercentage = Math.round((completedTopicsCount / Math.max(1, totalTopicsCount)) * 100);

  // Filter modules and topics based on search & active tab
  const activeModule = LT_SYLLABUS_MODULES.find(m => m.id === activeModuleId) || LT_SYLLABUS_MODULES[0];

  const filteredTopics = activeModule.topics.filter(topic => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      topic.title.toLowerCase().includes(q) ||
      topic.titleHindi.toLowerCase().includes(q) ||
      topic.overviewEn.toLowerCase().includes(q) ||
      topic.overviewHi.toLowerCase().includes(q) ||
      topic.keyPoints.some(kp =>
        kp.headingEn.toLowerCase().includes(q) ||
        kp.headingHi.toLowerCase().includes(q) ||
        kp.contentEn.toLowerCase().includes(q) ||
        kp.contentHi.toLowerCase().includes(q) ||
        (kp.mnemonic || '').toLowerCase().includes(q)
      )
    );
  });

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'BrainCircuit': return <BrainCircuit size={18} />;
      case 'Mountain': return <Mountain size={18} />;
      case 'Binary': return <Binary size={18} />;
      case 'Atom': return <Atom size={18} />;
      default: return <BookOpen size={18} />;
    }
  };

  return (
    <div className={styles.studyContainer}>
      {/* Hero Banner */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroMain}>
            <div className={styles.badgeRow}>
              <span className={styles.heroBadge}>
                <GraduationCap size={13} /> UKSSSC LT Assistant Teacher 2025
              </span>
              <span className={styles.subBadge}>
                <Award size={13} /> Official Master Syllabus
              </span>
            </div>
            <h1 className={styles.heroTitle}>
              उत्तराखंड LT सहायक अध्यापक संपूर्ण अध्ययन केंद्र
            </h1>
            <p className={styles.heroSub}>
              Detailed topic-by-topic study notes, pedagogical theories, Uttarakhand GK capsules, high-yield formulas, and unit checkpoint quizzes designed specifically for Anjali.
            </p>
          </div>

          {/* Progress Gauge */}
          <div className={styles.progressBox}>
            <div className={styles.progressLabelRow}>
              <span>Syllabus Mastery (पाठ्यक्रम प्रगति)</span>
              <span style={{ color: progressPercentage === 100 ? '#1e8e3e' : '#1a73e8' }}>
                {progressPercentage}%
              </span>
            </div>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressBar}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className={styles.progressSub}>
              {completedTopicsCount} of {totalTopicsCount} core topics mastered • Keep going Anjali!
            </div>
          </div>
        </div>
      </div>

      {/* Module Tabs Navigation */}
      <div className={styles.moduleNav}>
        {LT_SYLLABUS_MODULES.map(module => {
          const modCompleted = module.topics.filter(t => completedTopicIds[t.id]).length;
          const isActive = activeModuleId === module.id;
          return (
            <button
              key={module.id}
              className={`${styles.moduleTab} ${isActive ? styles.moduleTabActive : ''}`}
              onClick={() => setActiveModuleId(module.id)}
            >
              {getModuleIcon(module.iconName)}
              <span>{module.title}</span>
              <span className={styles.tabBadge}>
                {modCompleted}/{module.topics.length} Done • {module.totalMarks}
              </span>
            </button>
          );
        })}
      </div>

      {/* Controls Bar: Search & Action Buttons */}
      <div className={styles.controlsBar}>
        <div className={styles.searchWrapper}>
          <Search size={17} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder={`Search in ${activeModule.title} (e.g. Piaget, RTE 2009, Nanda Devi, Panch Prayag, Newton, Alloys...)`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.controlButtons}>
          <button className={styles.actionBtn} onClick={expandAll} title="Expand all units">
            <Eye size={15} />
            <span>Expand All</span>
          </button>
          <button className={styles.actionBtn} onClick={collapseAll} title="Collapse all units">
            <EyeOff size={15} />
            <span>Collapse All</span>
          </button>
          <button className={styles.actionBtn} onClick={() => window.print()} title="Print Study Notes">
            <Printer size={15} />
            <span>Print Notes</span>
          </button>
        </div>
      </div>

      {/* Topics List */}
      <div>
        {filteredTopics.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
            No topics matched your search &quot;{searchQuery}&quot;. Try clearing the search.
          </div>
        ) : (
          filteredTopics.map((topic) => {
            const isExpanded = !!expandedTopicIds[topic.id];
            const isCompleted = !!completedTopicIds[topic.id];

            return (
              <div key={topic.id} className={styles.topicCard}>
                {/* Header */}
                <div
                  className={styles.topicCardHeader}
                  onClick={() => toggleExpand(topic.id)}
                >
                  <div className={styles.topicHeaderLeft}>
                    <div
                      className={`${styles.topicCheckCircle} ${isCompleted ? styles.topicCheckCircleCompleted : ''}`}
                      onClick={(e) => toggleCompleteTopic(topic.id, e)}
                      title={isCompleted ? 'Completed! Click to unmark' : 'Click to mark as studied'}
                    >
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <div className={styles.topicTitleText}>
                        {topic.title}
                      </div>
                      <div className={styles.topicTitleSub}>
                        {topic.titleHindi}
                      </div>
                    </div>
                  </div>

                  <div className={styles.topicHeaderRight}>
                    <span className={styles.weightagePill}>
                      {topic.highYieldWeightage}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      ⏱️ {topic.estimatedMinutes} min
                    </span>
                    <div className={styles.chevronBtn}>
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                </div>

                {/* Expanded Body Content */}
                {isExpanded && (
                  <div className={styles.topicBody}>
                    {/* Overview Box */}
                    <div className={styles.overviewBox}>
                      <div className={styles.overviewText}>
                        <strong>Core Overview:</strong> {topic.overviewEn}
                      </div>
                      <div className={styles.overviewHi}>
                        <strong>मुख्य सारांश:</strong> {topic.overviewHi}
                      </div>
                    </div>

                    {/* Key Points */}
                    {topic.keyPoints.map((point, pIdx) => (
                      <div key={pIdx} className={styles.keyPoint}>
                        <div className={styles.keyPointHeading}>
                          {point.headingEn}
                        </div>
                        <div className={styles.keyPointHeadingHi}>
                          {point.headingHi}
                        </div>

                        <div className={styles.keyPointContent}>
                          {point.contentEn}
                        </div>
                        <div className={styles.keyPointContentHi}>
                          {point.contentHi}
                        </div>

                        {/* Optional Table */}
                        {point.tableData && (
                          <div className={styles.tableContainer}>
                            <table className={styles.studyTable}>
                              <thead>
                                <tr>
                                  {point.tableData.headers.map((h, hIdx) => (
                                    <th key={hIdx}>{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {point.tableData.rows.map((row, rIdx) => (
                                  <tr key={rIdx}>
                                    {row.map((cell, cIdx) => (
                                      <td key={cIdx}>{cell}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Mnemonic Spark */}
                        {point.mnemonic && (
                          <div className={styles.mnemonicCallout}>
                            <Sparkles size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                            <div>
                              <strong>Memory Spark (याद रखने की ट्रिक):</strong> {point.mnemonic}
                            </div>
                          </div>
                        )}

                        {/* Trap Alert */}
                        {point.trapAlert && (
                          <div className={styles.trapCallout}>
                            <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                            <div>
                              <strong>Exam Trap Alert (सावधानी):</strong> {point.trapAlert}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* High Yield Cheat Sheet */}
                    <div className={styles.cheatSheetBox}>
                      <div className={styles.cheatSheetTitle}>
                        <BookmarkCheck size={18} />
                        <span>High-Yield Revision Points (त्वरित परीक्षा बिंदु)</span>
                      </div>
                      <ul className={styles.cheatList}>
                        {topic.summaryCheatSheetEn.map((item, sIdx) => (
                          <li key={sIdx}>
                            <span>{item}</span>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', marginTop: 2 }}>
                              👉 {topic.summaryCheatSheetHi[sIdx]}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Checkpoint Self-Assessment Quiz */}
                    {topic.practiceCheckpoints && topic.practiceCheckpoints.length > 0 && (
                      <div className={styles.quizSection}>
                        <div className={styles.quizHeader}>
                          <HelpCircle size={18} />
                          <span>Self-Assessment Checkpoint (स्व-मूल्यांकन अभ्यास प्रश्न)</span>
                        </div>

                        {topic.practiceCheckpoints.map((cp, qIdx) => {
                          const answerKey = `${topic.id}_q${qIdx}`;
                          const selected = quizResponses[answerKey];
                          const hasAnswered = !!selected;

                          return (
                            <div key={qIdx} style={{ marginTop: qIdx > 0 ? '1.5rem' : 0 }}>
                              <div className={styles.quizQuestion}>
                                Q{qIdx + 1}. {cp.questionEn}
                              </div>
                              <div className={styles.quizQuestionHi}>
                                {cp.questionHi}
                              </div>

                              <div className={styles.quizOptionsGrid}>
                                {cp.options.map(opt => {
                                  const isSelected = selected === opt.id;
                                  const isCorrect = opt.id === cp.correctAnswer;
                                  let btnClass = styles.quizOptionBtn;

                                  if (hasAnswered) {
                                    if (isCorrect) {
                                      btnClass += ` ${styles.quizOptionCorrect}`;
                                    } else if (isSelected && !isCorrect) {
                                      btnClass += ` ${styles.quizOptionIncorrect}`;
                                    }
                                  }

                                  return (
                                    <button
                                      key={opt.id}
                                      className={btnClass}
                                      onClick={() => handleQuizSelect(topic.id, qIdx, opt.id)}
                                      disabled={hasAnswered}
                                    >
                                      <strong>({opt.id})</strong>
                                      <span>
                                        {opt.textEn}
                                        <small style={{ display: 'block', color: 'inherit', opacity: 0.8 }}>
                                          {opt.textHi}
                                        </small>
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>

                              {hasAnswered && (
                                <div className={styles.quizExplanation}>
                                  <strong>{selected === cp.correctAnswer ? '🎉 Correct!' : '⚠️ Explanation:'}</strong> {cp.explanationEn}
                                  <div style={{ marginTop: 4, color: 'var(--text-secondary)' }}>
                                    {cp.explanationHi}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Card Footer with Mastery Toggle */}
                    <div className={styles.cardFooter}>
                      <button
                        className={`${styles.masteredBtn} ${isCompleted ? styles.masteredBtnActive : ''}`}
                        onClick={() => toggleCompleteTopic(topic.id)}
                      >
                        <CheckCircle2 size={16} />
                        <span>{isCompleted ? '✓ Mastered (अध्ययन पूर्ण)' : 'Mark Topic as Mastered (पूर्ण चिह्नित करें)'}</span>
                      </button>

                      {onStartPractice && (
                        <button
                          className={styles.actionBtn}
                          onClick={onStartPractice}
                          style={{ borderColor: '#1a73e8', color: '#1a73e8' }}
                        >
                          <BookOpen size={14} />
                          <span>Practice Official PYQs</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
