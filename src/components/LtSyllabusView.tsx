'use client';

import React, { useState, useMemo } from 'react';
import syllabusDataRaw from '@/data/uksssc_lt_subject_syllabus.json';
import { LtCompleteSyllabusData, LanguageMode } from '@/types/utet';
import styles from './LtSyllabusView.module.css';
import {
  BookOpen,
  Search,
  FileText,
  Printer,
  ChevronDown,
  ChevronUp,
  Layers,
  Sparkles,
  ShieldCheck,
  Atom,
  Binary,
  FlaskConical,
  Globe,
  Landmark,
  Scale,
  TrendingUp,
  ScrollText,
  Activity,
  Home,
  Building2,
  Music,
  Sprout,
  Fish,
  Languages
} from 'lucide-react';

const syllabusData = syllabusDataRaw as LtCompleteSyllabusData;

interface LtSyllabusViewProps {
  language?: LanguageMode;
  onStartPractice?: () => void;
}

export const LtSyllabusView: React.FC<LtSyllabusViewProps> = ({
  language = 'bilingual',
  onStartPractice
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('hindi');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'units' | 'source'>('units');
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({});

  const subjects = syllabusData.subjects;

  // Icon mapping helper
  const getSubjectIcon = (id: string) => {
    switch (id) {
      case 'hindi':
      case 'english':
        return <Languages size={16} />;
      case 'sanskrit':
        return <ScrollText size={16} />;
      case 'mathematics':
        return <Binary size={16} />;
      case 'physics':
        return <Atom size={16} />;
      case 'chemistry':
        return <FlaskConical size={16} />;
      case 'botany':
        return <Sprout size={16} />;
      case 'zoology':
        return <Fish size={16} />;
      case 'geography':
        return <Globe size={16} />;
      case 'history':
        return <Landmark size={16} />;
      case 'political_science':
        return <Scale size={16} />;
      case 'economics':
        return <TrendingUp size={16} />;
      case 'physical_education':
        return <Activity size={16} />;
      case 'home_science':
        return <Home size={16} />;
      case 'commerce':
        return <Building2 size={16} />;
      case 'music':
        return <Music size={16} />;
      default:
        return <BookOpen size={16} />;
    }
  };

  // Filter subjects by category & search query
  const filteredSubjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return subjects.filter(sub => {
      // Category filter
      if (categoryFilter === 'science') {
        if (!['mathematics', 'physics', 'chemistry', 'botany', 'zoology'].includes(sub.id)) return false;
      } else if (categoryFilter === 'languages') {
        if (!['hindi', 'english', 'sanskrit'].includes(sub.id)) return false;
      } else if (categoryFilter === 'humanities') {
        if (!['geography', 'history', 'political_science', 'economics'].includes(sub.id)) return false;
      } else if (categoryFilter === 'vocational') {
        if (!['physical_education', 'home_science', 'commerce', 'music'].includes(sub.id)) return false;
      }

      // Search filter
      if (!q) return true;

      const subMatch =
        sub.subject.english.toLowerCase().includes(q) ||
        sub.subject.hindi.toLowerCase().includes(q) ||
        sub.page_range.includes(q);

      const unitMatch = sub.units.some(u =>
        u.title.english.toLowerCase().includes(q) ||
        u.title.hindi.toLowerCase().includes(q) ||
        u.topics.some(t => t.english.toLowerCase().includes(q) || t.hindi.toLowerCase().includes(q))
      );

      const sourceMatch = sub.source_pages.some(sp => sp.source_text.toLowerCase().includes(q));

      return subMatch || unitMatch || sourceMatch;
    });
  }, [subjects, categoryFilter, searchQuery]);

  const activeSubject =
    subjects.find(s => s.id === selectedSubjectId) ||
    filteredSubjects[0] ||
    subjects[0];

  const toggleUnit = (unitId: string) => {
    setExpandedUnits(prev => ({
      ...prev,
      [unitId]: !prev[unitId]
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    activeSubject.units.forEach((u, i) => {
      all[u.id || `u_${i}`] = true;
    });
    setExpandedUnits(all);
  };

  const collapseAll = () => {
    setExpandedUnits({});
  };

  return (
    <div className={styles.container}>
      {/* 1. Hero Header */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroMain}>
            <div className={styles.badgeRow}>
              <span className={styles.heroBadge}>
                <ShieldCheck size={12} /> Official Syllabus 2024
              </span>
              <span className={styles.subBadge}>
                <FileText size={12} /> 84 Scanned PDF Pages
              </span>
              <span className={styles.subBadge}>
                <Layers size={12} /> 14 Subjects Covered
              </span>
            </div>
            <h1 className={styles.heroTitle}>
              {language === 'hindi'
                ? syllabusData.title.hindi
                : language === 'english'
                ? syllabusData.title.english
                : `${syllabusData.title.hindi} (${syllabusData.title.english})`}
            </h1>
            <p className={styles.heroSub}>
              Full official unit-by-unit syllabus, topic breakdowns, and scanned original page transcripts for UKSSSC Assistant Teacher (LT Grade).
            </p>
          </div>

          <div className={styles.heroActions}>
            <button className={styles.actionPill} onClick={() => window.print()} title="Print Syllabus">
              <Printer size={14} />
              <span>Print / Save PDF</span>
            </button>
            {onStartPractice && (
              <button
                className={styles.actionPill}
                style={{ background: 'var(--blue)', color: '#fff', borderColor: 'var(--blue)' }}
                onClick={onStartPractice}
              >
                <Sparkles size={14} />
                <span>Practice PYQs</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Filter Bar & Search */}
      <div className={styles.filterRow}>
        <div className={styles.searchBox}>
          <Search size={15} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search subjects, units, topics, keywords (e.g. Optics, Matrices, अलंकार)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.categoryPills}>
          <button
            className={`${styles.catPill} ${categoryFilter === 'all' ? styles.catPillActive : ''}`}
            onClick={() => setCategoryFilter('all')}
          >
            All Subjects ({subjects.length})
          </button>
          <button
            className={`${styles.catPill} ${categoryFilter === 'science' ? styles.catPillActive : ''}`}
            onClick={() => setCategoryFilter('science')}
          >
            Science & Maths (5)
          </button>
          <button
            className={`${styles.catPill} ${categoryFilter === 'languages' ? styles.catPillActive : ''}`}
            onClick={() => setCategoryFilter('languages')}
          >
            Languages (3)
          </button>
          <button
            className={`${styles.catPill} ${categoryFilter === 'humanities' ? styles.catPillActive : ''}`}
            onClick={() => setCategoryFilter('humanities')}
          >
            Social Science (4)
          </button>
          <button
            className={`${styles.catPill} ${categoryFilter === 'vocational' ? styles.catPillActive : ''}`}
            onClick={() => setCategoryFilter('vocational')}
          >
            PE, Music, Home Sci, Commerce (4)
          </button>
        </div>
      </div>

      {/* 3. Main Layout: Left Subject List + Right Subject Details */}
      <div className={styles.layout}>
        {/* Left: Subject List */}
        <aside className={styles.subjectListCard}>
          <div className={styles.subjectListTitle}>Available Subjects ({filteredSubjects.length})</div>
          {filteredSubjects.map(sub => {
            const isActive = sub.id === activeSubject.id;
            return (
              <button
                key={sub.id}
                className={`${styles.subjectItem} ${isActive ? styles.subjectItemActive : ''}`}
                onClick={() => setSelectedSubjectId(sub.id)}
              >
                <div className={styles.subjectItemLeft}>
                  <div
                    className={styles.subjectIcon}
                    style={{ background: sub.color || 'var(--blue)' }}
                  >
                    {getSubjectIcon(sub.id)}
                  </div>
                  <div className={styles.subjectItemText}>
                    <span className={styles.subjectName}>
                      {language === 'hindi' ? sub.subject.hindi : sub.subject.english}
                    </span>
                    <span className={styles.subjectPage}>
                      Pages {sub.page_range} • {sub.units.length} Units
                    </span>
                  </div>
                </div>
                <span className={styles.subjectBadge}>
                  {sub.subject.hindi}
                </span>
              </button>
            );
          })}
        </aside>

        {/* Right: Active Subject Content */}
        <main className={styles.detailArea}>
          {/* Header Card */}
          <div className={styles.detailHeaderCard}>
            <div className={styles.detailHeaderMain}>
              <div
                className={styles.detailIconLarge}
                style={{ background: activeSubject.color || 'var(--blue)' }}
              >
                {getSubjectIcon(activeSubject.id)}
              </div>
              <div>
                <h2 className={styles.detailTitle}>
                  {activeSubject.subject.hindi} ({activeSubject.subject.english})
                </h2>
                <div className={styles.detailSubtitle}>
                  <span>PDF Page Range: {activeSubject.page_range}</span>
                  <span>•</span>
                  <span>{activeSubject.units.length} Prescribed Units</span>
                  <span>•</span>
                  <span>{activeSubject.source_pages.length} Scanned Pages</span>
                </div>
              </div>
            </div>

            {/* View Mode Toggle: Units vs Scanned Source */}
            <div className={styles.viewModeToggle}>
              <button
                className={`${styles.viewModeBtn} ${viewMode === 'units' ? styles.viewModeBtnActive : ''}`}
                onClick={() => setViewMode('units')}
              >
                Structured Units ({activeSubject.units.length})
              </button>
              <button
                className={`${styles.viewModeBtn} ${viewMode === 'source' ? styles.viewModeBtnActive : ''}`}
                onClick={() => setViewMode('source')}
              >
                Original Scanned Text
              </button>
            </div>
          </div>

          {/* View 1: Structured Units & Topics */}
          {viewMode === 'units' && (
            <div className={styles.unitsContainer}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 4 }}>
                <button
                  className={styles.actionPill}
                  style={{ fontSize: '11px', padding: '4px 10px' }}
                  onClick={expandAll}
                >
                  Expand All Units
                </button>
                <button
                  className={styles.actionPill}
                  style={{ fontSize: '11px', padding: '4px 10px' }}
                  onClick={collapseAll}
                >
                  Collapse All
                </button>
              </div>

              {activeSubject.units.map((unit, uIdx) => {
                const uKey = unit.id || `unit_${uIdx}`;
                const isExpanded = expandedUnits[uKey] !== false; // Default expanded

                return (
                  <div key={uKey} className={styles.unitCard}>
                    <div className={styles.unitHeader} onClick={() => toggleUnit(uKey)}>
                      <div className={styles.unitHeaderLeft}>
                        <span style={{ color: activeSubject.color || 'var(--blue)', fontWeight: 800 }}>
                          #{uIdx + 1}
                        </span>
                        <span className={styles.unitTitle}>
                          {language === 'hindi'
                            ? unit.title.hindi
                            : language === 'english'
                            ? unit.title.english
                            : `${unit.title.hindi} (${unit.title.english})`}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className={styles.unitTopicCount}>
                          {unit.topics.length} Topic Areas
                        </span>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className={styles.unitBody}>
                        {unit.topics.map((topic, tIdx) => (
                          <div key={tIdx} className={styles.topicItem}>
                            <div className={styles.topicBullet} />
                            <div className={styles.topicText}>
                              {language !== 'hindi' && (
                                <div className={styles.topicEn}>{topic.english}</div>
                              )}
                              {language !== 'english' && (
                                <div className={styles.topicHi}>{topic.hindi}</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* View 2: Scanned Original Page Transcript */}
          {viewMode === 'source' && (
            <div className={styles.unitsContainer}>
              {activeSubject.source_pages.map((sp, idx) => (
                <div key={idx} className={styles.sourceCard}>
                  <div className={styles.sourcePageHeader}>
                    <span className={styles.sourcePageTitle}>
                      <FileText size={14} /> Official Scanned Page {sp.page}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-hint)' }}>
                      Source: UKSSSC 2024 LT Syllabus
                    </span>
                  </div>
                  <pre className={styles.sourcePageText}>
                    {sp.source_text || "(Scanned content preserved under standard syllabus curriculum)"}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
