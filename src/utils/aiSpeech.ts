// Studio-grade Neural Speech Engine with High-Fidelity Audio Stream & Fallback

export class AiVoiceSynthesizer {
  private currentAudio: HTMLAudioElement | null = null;
  private currentObjectUrl: string | null = null;
  private rate: number = 1.0;
  private isSpeaking: boolean = false;
  private isPaused: boolean = false;
  private audioCache = new Map<string, string>();
  private onEndCallback: (() => void) | null = null;
  private onStartCallback: (() => void) | null = null;

  public async speak(
    text: string,
    onEnd?: () => void,
    onStart?: () => void
  ): Promise<void> {
    this.stop();

    if (!text || !text.trim()) return;
    this.onEndCallback = onEnd || null;
    this.onStartCallback = onStart || null;

    // 1. Try High-Fidelity Studio Neural Audio via Serverless API
    try {
      let audioUrl = this.audioCache.get(text.slice(0, 100));

      if (!audioUrl) {
        const res = await fetch('/api/ai/speech', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, lang: 'hi' }),
        });

        if (res.ok) {
          const blob = await res.blob();
          if (blob && blob.size > 1000) {
            audioUrl = URL.createObjectURL(blob);
            this.audioCache.set(text.slice(0, 100), audioUrl);
          }
        }
      }

      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.playbackRate = this.rate;

        audio.onplay = () => {
          this.isSpeaking = true;
          this.isPaused = false;
          if (this.onStartCallback) this.onStartCallback();
        };

        audio.onended = () => {
          this.isSpeaking = false;
          this.isPaused = false;
          if (this.onEndCallback) this.onEndCallback();
        };

        audio.onerror = () => {
          this.isSpeaking = false;
          this.isPaused = false;
          if (this.onEndCallback) this.onEndCallback();
        };

        this.currentAudio = audio;
        this.currentObjectUrl = audioUrl;
        await audio.play();
        return;
      }
    } catch {
      // Fall through to browser speech synthesis fallback
    }

    // 2. Fallback: Browser Web Speech API with Cleaned Text
    this.speakFallback(text);
  }

  private speakFallback(text: string): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const synth = window.speechSynthesis;
    synth.cancel();

    const clean = text
      .replace(/###/g, '')
      .replace(/##/g, '')
      .replace(/#/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/>/g, '')
      .replace(/[-–—_]/g, ' ')
      .replace(/🎯|⚠️|💡|🏫|📘|✨|🎉|💪|🏛️|⚡|🏆|🔍/g, '')
      .replace(/\n+/g, '. ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = this.rate;
    utterance.pitch = 1.0;

    const voices = synth.getVoices();
    const naturalVoice = voices.find(
      v =>
        v.lang.startsWith('hi') ||
        v.name.includes('Hindi') ||
        v.name.includes('Google') ||
        v.name.includes('Natural') ||
        v.name.includes('Swara') ||
        v.name.includes('Neerja')
    );
    if (naturalVoice) {
      utterance.voice = naturalVoice;
      utterance.lang = naturalVoice.lang || 'hi-IN';
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.isPaused = false;
      if (this.onStartCallback) this.onStartCallback();
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

    synth.speak(utterance);
  }

  public pause(): void {
    if (this.currentAudio && this.isSpeaking) {
      this.currentAudio.pause();
      this.isPaused = true;
    } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
      this.isPaused = true;
    }
  }

  public resume(): void {
    if (this.currentAudio && this.isPaused) {
      this.currentAudio.play();
      this.isPaused = false;
    } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
      this.isPaused = false;
    }
  }

  public stop(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.isPaused = false;
  }

  public setRate(rate: number): void {
    this.rate = rate;
    if (this.currentAudio) {
      this.currentAudio.playbackRate = rate;
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
