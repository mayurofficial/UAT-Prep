// High-fidelity speech synthesizer for natural Gemini-style bilingual explanations

export interface SpeechController {
  isPlaying: boolean;
  isPaused: boolean;
  rate: number;
  play: (text: string, onEnd?: () => void) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  setRate: (rate: number) => void;
}

export class AiVoiceSynthesizer {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private rate: number = 1.0;
  private isSpeaking: boolean = false;
  private isPaused: boolean = false;
  private onEndCallback: (() => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  private cleanTextForSpeech(text: string): string {
    return text
      // Remove markdown headings, symbols, and bolding
      .replace(/###/g, '')
      .replace(/##/g, '')
      .replace(/#/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/>/g, '')
      .replace(/[-–—]/g, ' ')
      .replace(/🎯|⚠️|💡|🏫|📘|✨|🎉|💪|🏛️|⚡/g, '')
      .replace(/\n+/g, '. ')
      .trim();
  }

  private getBestVoice(): SpeechSynthesisVoice | null {
    if (!this.synth) return null;
    const voices = this.synth.getVoices();

    // Prefer high-quality Hindi/Indian English neural voices
    const hindiVoice = voices.find(
      v =>
        v.lang.startsWith('hi') ||
        v.name.includes('Hindi') ||
        v.name.includes('Google हिन्दी') ||
        v.name.includes('Swara')
    );

    const indianEngVoice = voices.find(
      v =>
        v.lang === 'en-IN' ||
        v.name.includes('India') ||
        v.name.includes('Neerja') ||
        v.name.includes('Prabhat')
    );

    const generalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural')));

    return hindiVoice || indianEngVoice || generalVoice || voices[0] || null;
  }

  public speak(text: string, onEnd?: () => void, onStart?: () => void): void {
    if (!this.synth) return;

    this.stop();

    const cleanText = this.cleanTextForSpeech(text);
    if (!cleanText) return;

    this.onEndCallback = onEnd || null;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = this.rate;
    utterance.pitch = 1.0;

    const voice = this.getBestVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang || 'hi-IN';
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.isPaused = false;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.isPaused = false;
      if (this.onEndCallback) this.onEndCallback();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.isPaused = false;
      if (this.onEndCallback) this.onEndCallback();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pause(): void {
    if (this.synth && this.isSpeaking && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
    }
  }

  public resume(): void {
    if (this.synth && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
    }
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.isPaused = false;
    }
  }

  public setRate(rate: number): void {
    this.rate = rate;
    if (this.isSpeaking && this.currentUtterance) {
      // Re-apply rate
      const currentText = this.currentUtterance.text;
      this.speak(currentText, this.onEndCallback || undefined);
    }
  }

  public getRate(): number {
    return this.rate;
  }

  public getIsPlaying(): boolean {
    return this.isSpeaking && !this.isPaused;
  }

  public getIsPaused(): boolean {
    return this.isPaused;
  }
}

export const aiVoice = new AiVoiceSynthesizer();
