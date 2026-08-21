'use client';

import React, { useState, useEffect, useRef } from 'react';
import { QuestionItem } from '@/types/utet';
import { aiVoice } from '@/utils/aiSpeech';
import styles from './AiTutorModal.module.css';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Send,
  X,
  Bot,
  User,
  ShieldAlert,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  GraduationCap
} from 'lucide-react';
import { soundManager } from '@/utils/audioFeedback';

interface AiTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: QuestionItem;
  userSelected: string | null;
  section?: string;
}

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export const AiTutorModal: React.FC<AiTutorModalProps> = ({
  isOpen,
  onClose,
  question,
  userSelected,
  section,
}) => {
  const [explanation, setExplanation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isPlayingVoice, setIsPlayingVoice] = useState<boolean>(false);
  const [voiceRate, setVoiceRate] = useState<number>(1.0);
  const [chatInput, setChatInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [sendingChat, setSendingChat] = useState<boolean>(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Fetch AI explanation on modal open / question change
  useEffect(() => {
    if (!isOpen || !question) return;

    let isMounted = true;
    setLoading(true);
    setExplanation('');
    setChatHistory([]);
    aiVoice.stop();
    setIsPlayingVoice(false);

    const fetchExplanation = async () => {
      try {
        const res = await fetch('/api/ai/explain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            questionNumber: question.id,
            questionText: question.question,
            options: question.options,
            correctAnswer: question.correctAnswer,
            userSelected,
            section,
            conceptCard: question.conceptCard,
          }),
        });

        const data = await res.json();
        if (isMounted) {
          if (res.ok && data.explanation) {
            setExplanation(data.explanation);
          } else {
            setExplanation('Could not generate explanation at this moment.');
          }
        }
      } catch {
        if (isMounted) {
          setExplanation('Network error fetching AI explanation.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchExplanation();

    return () => {
      isMounted = false;
      aiVoice.stop();
    };
  }, [isOpen, question, userSelected, section]);

  // Voice narration toggle
  const handleToggleVoice = () => {
    if (isPlayingVoice) {
      aiVoice.stop();
      setIsPlayingVoice(false);
    } else {
      if (!explanation) return;
      aiVoice.speak(
        explanation,
        () => setIsPlayingVoice(false),
        () => setIsPlayingVoice(true)
      );
      setIsPlayingVoice(true);
    }
  };

  const handleSpeedChange = (rate: number) => {
    setVoiceRate(rate);
    aiVoice.setRate(rate);
  };

  // Follow-up question submission
  const handleSendFollowUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || sendingChat) return;

    const query = chatInput.trim();
    setChatInput('');
    soundManager.playClick();

    const newHistory: ChatMessage[] = [
      ...chatHistory,
      { role: 'user', content: query },
    ];
    setChatHistory(newHistory);
    setSendingChat(true);

    try {
      const res = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionNumber: question.id,
          questionText: question.question,
          options: question.options,
          correctAnswer: question.correctAnswer,
          userSelected,
          section,
          followUpQuery: query,
          chatHistory: newHistory,
        }),
      });

      const data = await res.json();
      if (res.ok && data.explanation) {
        setChatHistory([
          ...newHistory,
          { role: 'model', content: data.explanation },
        ]);
        // Auto speak response
        aiVoice.speak(
          data.explanation,
          () => setIsPlayingVoice(false),
          () => setIsPlayingVoice(true)
        );
      }
    } catch {
      setChatHistory([
        ...newHistory,
        { role: 'model', content: 'क्षमा करें, आपके प्रश्न का उत्तर प्राप्त करने में त्रुटि हुई।' },
      ]);
    } finally {
      setSendingChat(false);
      setTimeout(() => {
        if (bodyRef.current) {
          bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
      }, 100);
    }
  };

  const handleClose = () => {
    aiVoice.stop();
    setIsPlayingVoice(false);
    onClose();
  };

  if (!isOpen || !question) return null;

  const isCorrect = userSelected === question.correctAnswer;
  const isAnswered = userSelected !== null;

  return (
    <div className={styles.backdrop} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* 1. Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.aiAvatar}>
              <Sparkles size={20} />
            </div>
            <div>
              <div className={styles.headerTitle}>
                <span>AI Guruji (एआई गुरुजी)</span>
                <span className={styles.geminiBadge}>Gemini 2.0</span>
              </div>
              <div className={styles.headerSubtitle}>
                Socratic Doubt Solver & Bilingual Voice Explainer
              </div>
            </div>
          </div>
          <button
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Close AI Tutor"
          >
            <X size={20} />
          </button>
        </div>

        {/* 2. Voice Audio Narration Bar */}
        <div className={styles.audioBar}>
          <div className={styles.audioControlsLeft}>
            <button
              className={`${styles.playVoiceBtn} ${
                isPlayingVoice ? styles.playingActive : ''
              }`}
              onClick={handleToggleVoice}
              disabled={loading || !explanation}
            >
              {isPlayingVoice ? <Pause size={14} /> : <Volume2 size={14} />}
              <span>{isPlayingVoice ? 'Pause Voice' : 'Listen in Hindi/English'}</span>
            </button>

            {isPlayingVoice && (
              <div className={styles.waveform} title="Voice Speaking">
                <div className={styles.waveBar} />
                <div className={styles.waveBar} />
                <div className={styles.waveBar} />
                <div className={styles.waveBar} />
                <div className={styles.waveBar} />
              </div>
            )}
          </div>

          <div className={styles.audioControlsRight}>
            <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Voice Speed:</span>
            {[0.9, 1.0, 1.25, 1.5].map((rate) => (
              <button
                key={rate}
                className={`${styles.speedBtn} ${
                  voiceRate === rate ? styles.speedBtnActive : ''
                }`}
                onClick={() => handleSpeedChange(rate)}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>

        {/* 3. Modal Body */}
        <div className={styles.body} ref={bodyRef}>
          {/* Question Context Card */}
          <div className={styles.questionContextBox}>
            <div className={styles.qHeaderRow}>
              <span className={styles.qNumBadge}>
                Question #{question.id} • {section || 'Exam Question'}
              </span>
              {isAnswered && (
                <span
                  className={styles.qStatusBadge}
                  style={{
                    background: isCorrect ? 'var(--success-light)' : 'var(--error-light)',
                    color: isCorrect ? 'var(--success)' : 'var(--error)',
                  }}
                >
                  {isCorrect ? '✓ Correct Choice' : '✗ Selected Incorrectly'}
                </span>
              )}
            </div>
            <div className={styles.qSnippetHindi}>{question.question.hindi}</div>
            <div className={styles.qSnippetEng}>{question.question.english}</div>
          </div>

          {/* AI Explanation Card */}
          {loading ? (
            <div className={styles.loadingPulse}>
              <Sparkles size={20} className={styles.spinIcon} />
              <span>AI Guruji is analyzing question pedagogy & exam traps...</span>
            </div>
          ) : (
            <div className={styles.aiOutputCard}>
              <div className={styles.aiOutputContent}>
                {explanation}
              </div>
            </div>
          )}

          {/* Interactive Follow-up Chat History */}
          {chatHistory.length > 0 && (
            <div className={styles.chatHistory}>
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={msg.role === 'user' ? styles.chatMsgUser : styles.chatMsgAi}
                >
                  {msg.role === 'model' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4, color: '#9334e6', fontWeight: 700, fontSize: '11px' }}>
                      <Bot size={13} /> AI Guruji
                    </div>
                  )}
                  {msg.content}
                </div>
              ))}
            </div>
          )}

          {sendingChat && (
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={14} /> AI Guruji is thinking...
            </div>
          )}
        </div>

        {/* 4. Footer Interactive Chat Input */}
        <form onSubmit={handleSendFollowUp} className={styles.footer}>
          <input
            type="text"
            className={styles.chatInput}
            placeholder="Ask a follow-up doubt... (e.g. 'Explain in simpler words', 'Give another example')"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            disabled={loading || sendingChat}
          />
          <button
            type="submit"
            className={styles.sendBtn}
            disabled={!chatInput.trim() || loading || sendingChat}
            title="Send Doubt to Gemini"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
