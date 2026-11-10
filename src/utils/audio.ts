/**
 * Web Audio API synthesizer for ambient birthday music box and interactive sound effects.
 * Requires no external audio files, ensuring 100% offline and reliable playback.
 */

class BirthdayAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private melodyTimeout: number | null = null;
  private onStateChangeCallbacks: Array<(isPlaying: boolean) => void> = [];

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(cb: (isPlaying: boolean) => void) {
    this.onStateChangeCallbacks.push(cb);
    return () => {
      this.onStateChangeCallbacks = this.onStateChangeCallbacks.filter((c) => c !== cb);
    };
  }

  private notify() {
    this.onStateChangeCallbacks.forEach((cb) => cb(this.isPlaying));
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  public play() {
    this.initContext();
    if (!this.ctx) return;
    this.isPlaying = true;
    this.notify();
    this.startMusicBoxLoop();
  }

  public stop() {
    this.isPlaying = false;
    if (this.melodyTimeout) {
      clearTimeout(this.melodyTimeout);
      this.melodyTimeout = null;
    }
    this.notify();
  }

  /**
   * Play a bell/music box chime note
   */
  private playNote(freq: number, startTime: number, duration = 1.2, volume = 0.15) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Soft sine with a hint of warm triangle for a music box / celesta tone
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(volume, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    // Subtle gentle lowpass filter for warmth
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, startTime);

    osc.connect(gain);
    gain.connect(filter);
    filter.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  /**
   * "Happy Birthday" melody frequencies (C4, D4, E4, F4, G4, A4, B4, C5)
   */
  private startMusicBoxLoop() {
    if (!this.isPlaying || !this.ctx) return;

    // Frequencies (Hz) in C Major:
    const G3 = 196.0;
    const C4 = 261.63;
    const D4 = 293.66;
    const E4 = 329.63;
    const F4 = 349.23;
    const G4 = 392.0;
    const A4 = 440.0;
    const B4 = 493.88;
    const C5 = 523.25;
    const D5 = 587.33;

    // Happy Birthday notes and rhythmic beats
    const notes: Array<{ note: number; beat: number; chord?: number[] }> = [
      // Hap-py Birth-day to you
      { note: G4, beat: 0.75, chord: [C4, E4] },
      { note: G4, beat: 0.25 },
      { note: A4, beat: 1.0, chord: [F4] },
      { note: G4, beat: 1.0, chord: [C4] },
      { note: C5, beat: 1.0, chord: [E4] },
      { note: B4, beat: 2.0, chord: [G3, D4] },

      // Hap-py Birth-day to you
      { note: G4, beat: 0.75, chord: [G3] },
      { note: G4, beat: 0.25 },
      { note: A4, beat: 1.0, chord: [F4] },
      { note: G4, beat: 1.0, chord: [G3] },
      { note: D5, beat: 1.0, chord: [B4] },
      { note: C5, beat: 2.0, chord: [C4, E4] },

      // Hap-py Birth-day dear Sa-hil
      { note: G4, beat: 0.75, chord: [C4] },
      { note: G4, beat: 0.25 },
      { note: G4 * 2, beat: 1.0, chord: [C5, E4] },
      { note: E4 * 2, beat: 1.0, chord: [A4] },
      { note: C5, beat: 1.0, chord: [F4] },
      { note: B4, beat: 1.0, chord: [D4] },
      { note: A4, beat: 2.0, chord: [F4, C4] },

      // Hap-py Birth-day to you!
      { note: F4 * 2, beat: 0.75, chord: [F4] },
      { note: F4 * 2, beat: 0.25 },
      { note: E4 * 2, beat: 1.0, chord: [C5] },
      { note: C5, beat: 1.0, chord: [G4] },
      { note: D5, beat: 1.0, chord: [B4] },
      { note: C5, beat: 2.8, chord: [C4, E4, G4] },
    ];

    const tempoSecPerBeat = 0.58; // gentle, cozy tempo
    let currentTime = this.ctx.currentTime + 0.1;
    let totalDurationSec = 0;

    for (const item of notes) {
      const duration = item.beat * tempoSecPerBeat;
      this.playNote(item.note, currentTime, Math.max(duration * 1.5, 1.2), 0.12);

      // Play soft harmony chord if available
      if (item.chord) {
        item.chord.forEach((chordNote) => {
          this.playNote(chordNote, currentTime, duration * 2, 0.05);
        });
      }

      currentTime += duration;
      totalDurationSec += duration;
    }

    // Schedule repeat loop with a calm 2.5 second pause
    this.melodyTimeout = window.setTimeout(() => {
      if (this.isPlaying) {
        this.startMusicBoxLoop();
      }
    }, (totalDurationSec + 2.5) * 1000);
  }

  /**
   * Sound effect: Soft crystal chime when clicking cards or reveals
   */
  public playChime() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [587.33, 783.99, 1046.5]; // D5, G5, C6
    notes.forEach((freq, idx) => {
      this.playNote(freq, now + idx * 0.08, 1.0, 0.08);
    });
  }

  /**
   * Sound effect: Gentle candle blowing breath/whoosh sound
   */
  public playBlowSound() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.6;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, now);
    filter.frequency.exponentialRampToValueAtTime(150, now + 0.6);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
  }

  /**
   * Sound effect: Letter unfolding paper flutter
   */
  public playEnvelopeOpenSound() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
    notes.forEach((freq, idx) => {
      this.playNote(freq, now + idx * 0.07, 0.8, 0.07);
    });
  }

  /**
   * Sound effect: Balloon pop sound
   */
  public playBalloonPop() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  /**
   * Sound effect: Gift unwrap fanfare
   */
  public playGiftUnbox() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880, 1108.7];
    notes.forEach((freq, idx) => {
      this.playNote(freq, now + idx * 0.06, 1.2, 0.1);
    });
  }

  /**
   * Sound effect: Sparkle fanfare when celebration completes
   */
  public playCelebrationPop() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const arpeggio = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
    arpeggio.forEach((freq, idx) => {
      this.playNote(freq, now + idx * 0.09, 1.4, 0.1);
    });
  }
}

export const sound = new BirthdayAudioEngine();
