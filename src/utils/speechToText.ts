'use client';

// Web Speech Recognition API Wrapper with bilingual (Hindi & English) support

export interface SpeechRecognitionResultState {
  transcript: string;
  isListening: boolean;
  error: string | null;
  isSupported: boolean;
}

export type SpeechLang = 'hi-IN' | 'en-IN' | 'en-US';

class SpeechToTextService {
  private recognition: any = null;
  private isListening: boolean = false;
  private onTranscriptCallback: ((text: string, isFinal: boolean) => void) | null = null;
  private onStateChangeCallback: ((isListening: boolean) => void) | null = null;
  private onErrorCallback: ((err: string) => void) | null = null;
  private currentLang: SpeechLang = 'hi-IN';

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          this.recognition = new SpeechRecognition();
          this.recognition.continuous = true;
          this.recognition.interimResults = true;
          this.recognition.lang = this.currentLang;
          this.recognition.maxAlternatives = 1;

          this.recognition.onresult = (event: any) => {
            let finalTranscript = '';
            let interimTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
              } else {
                interimTranscript += event.results[i][0].transcript;
              }
            }

            const currentText = finalTranscript || interimTranscript;
            if (this.onTranscriptCallback && currentText) {
              this.onTranscriptCallback(currentText, Boolean(finalTranscript));
            }
          };

          this.recognition.onstart = () => {
            this.isListening = true;
            this.onStateChangeCallback?.(true);
          };

          this.recognition.onend = () => {
            this.isListening = false;
            this.onStateChangeCallback?.(false);
          };

          this.recognition.onerror = (event: any) => {
            this.isListening = false;
            this.onStateChangeCallback?.(false);
            let errorMessage = 'आवाज पहचानने में समस्या हुई (Speech error)';
            if (event.error === 'not-allowed') {
              errorMessage = 'कृपया माइक्रोफ़ोन की अनुमति दें (Microphone permission denied)';
            } else if (event.error === 'no-speech') {
              errorMessage = 'कोई आवाज़ सुनाई नहीं दी (No speech detected)';
            } else if (event.error === 'network') {
              errorMessage = 'नेटवर्क समस्या (Speech network issue)';
            }
            this.onErrorCallback?.(errorMessage);
          };
        } catch {
          this.recognition = null;
        }
      }
    }
  }

  public isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return Boolean(
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    );
  }

  public setLanguage(lang: SpeechLang): void {
    this.currentLang = lang;
    if (this.recognition) {
      this.recognition.lang = lang;
    }
  }

  public getLanguage(): SpeechLang {
    return this.currentLang;
  }

  public start(
    onTranscript: (text: string, isFinal: boolean) => void,
    onStateChange?: (isListening: boolean) => void,
    onError?: (err: string) => void,
    lang?: SpeechLang
  ): boolean {
    if (!this.recognition) {
      onError?.('इस ब्राउज़र में स्पीच रिकग्निशन समर्थित नहीं है (Speech recognition not supported in this browser)');
      return false;
    }

    if (this.isListening) {
      this.stop();
      return false;
    }

    if (lang) {
      this.setLanguage(lang);
    }

    this.onTranscriptCallback = onTranscript;
    this.onStateChangeCallback = onStateChange || null;
    this.onErrorCallback = onError || null;

    try {
      this.recognition.start();
      return true;
    } catch {
      this.stop();
      try {
        this.recognition.start();
        return true;
      } catch (err: any) {
        onError?.(err?.message || 'Could not start microphone');
        return false;
      }
    }
  }

  public stop(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch {}
    }
    this.isListening = false;
    this.onStateChangeCallback?.(false);
  }

  public toggle(
    onTranscript: (text: string, isFinal: boolean) => void,
    onStateChange?: (isListening: boolean) => void,
    onError?: (err: string) => void,
    lang?: SpeechLang
  ): boolean {
    if (this.isListening) {
      this.stop();
      return false;
    } else {
      return this.start(onTranscript, onStateChange, onError, lang);
    }
  }
}

export const speechToText = new SpeechToTextService();
