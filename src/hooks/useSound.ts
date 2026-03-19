import { useCallback, useRef, useEffect } from 'react';

export const useSound = () => {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
  }, []);

  const playHoverSound = useCallback(() => {
    try {
      if (!audioCtxRef.current) initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx || ctx.state === 'suspended') {
        ctx?.resume();
      }

      if (!ctx) return;

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.06);
    } catch (e) {
      // Gracefully fail if audio context is blocked
    }
  }, [initAudio]);

  const playClickSound = useCallback(() => {
    try {
      if (!audioCtxRef.current) initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx || ctx.state === 'suspended') {
        ctx?.resume();
      }

      if (!ctx) return;

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(400, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.15);
    } catch (e) {
      // Gracefully fail if audio context is blocked
    }
  }, [initAudio]);

  return { playHoverSound, playClickSound };
};
