'use client';

import React, { useState } from 'react';
import handbookData from '@/data/theory_handbook.json';
import styles from './HandbookView.module.css';
import { BookMarked, Search, Sparkles, Filter } from 'lucide-react';

export const HandbookView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Notes (सभी नोट्स)' },
    { id: 'lt-teaching-aptitude', label: 'LT & UTET Pedagogy' },
    { id: 'uttarakhand-gk-capsule', label: 'Uttarakhand GK' },
    { id: 'cdp-theories', label: 'Child Psychology' },
    { id: 'physics-chemistry-formulas', label: 'Physics & Chemistry' },
    { id: 'biology-ecology-capsule', label: 'Biology & Ecology' },
  ];

  const filtered = handbookData.modules
    .filter(m => activeCategory === 'all' || m.id === activeCategory)
    .map(m => {
      const items = m.items.filter(i => {
        const q = query.toLowerCase();
        return (
          !q ||
          i.topic.toLowerCase().includes(q) ||
          i.summaryEn.toLowerCase().includes(q) ||
          i.summaryHi.toLowerCase().includes(q) ||
          (i.mnemonic || '').toLowerCase().includes(q) ||
          (i.keyTerms || []).some(t => t.toLowerCase().includes(q))
        );
      });
      return { ...m, items };
    })
    .filter(m => m.items.length > 0);

  return (
    <div className={styles.handbook}>
      <div className={styles.hero}>
        <div className={styles.heroTitle}>
          <BookMarked size={22} color="var(--blue)" style={{ verticalAlign: 'middle', marginRight: 8 }} />
          UTET & LT Grade Quick Revision Handbook
        </div>
        <p className={styles.heroSub}>
          High-yield theories, formulas, Uttarakhand state facts, and mnemonics curated for Anjali's teacher exam preparation.
        </p>
      </div>

      {/* Category Pills */}
      <div className={styles.categoryFilters}>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`${styles.catPill} ${activeCategory === cat.id ? styles.catPillActive : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className={styles.search}>
        <Search size={18} color="var(--text-hint)" />
        <input
          className={styles.searchInput}
          placeholder="Search: Action Research, Microteaching, Piaget, Nanda Devi, Carnot, Insulin..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      {filtered.map(m => (
        <div key={m.id} className={styles.module}>
          <div className={styles.moduleHead} style={{ borderLeft: `4px solid ${m.color}` }}>
            {m.title}
          </div>
          <div className={styles.items}>
            {m.items.map((item, i) => (
              <div key={i} className={styles.item}>
                <div className={styles.itemTitle}>{item.topic}</div>
                <div className={styles.itemText}>{item.summaryEn}</div>
                <div className={styles.itemHi}>{item.summaryHi}</div>
                {item.mnemonic && (
                  <div className={styles.mnemonic}>
                    <Sparkles size={12} /> {item.mnemonic}
                  </div>
                )}
                {item.keyTerms?.length > 0 && (
                  <div className={styles.tags}>
                    {item.keyTerms.map((t, j) => (
                      <span key={j} className={styles.tag}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
