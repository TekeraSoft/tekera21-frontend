

import { useState, useRef, useCallback, useEffect } from "react";

interface UseNotificationSoundReturn {
  isAudioEnabled: boolean;
  initializeAudio: () => Promise<boolean>;
  playSound: () => boolean;
  playBeep: () => void;
}

export const useNotificationSound = (): UseNotificationSoundReturn => {
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const notificationSoundRef = useRef<HTMLAudioElement | null>(null);

  const initializeAudio = useCallback(async (): Promise<boolean> => {
    try {
      // AudioContext oluştur
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();

      // Ses dosyası yükle
      notificationSoundRef.current = new Audio("/sounds/order_notification.wav");
      notificationSoundRef.current.preload = "auto";

      // Sessiz unlock sesi çal
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      gainNode.gain.value = 0;
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      oscillator.start();
      oscillator.stop(audioContextRef.current.currentTime + 0.1);

      setIsAudioEnabled(true);
      console.log("Audio sistemi aktif edildi");
      return true;
    } catch (error) {
      console.error("Audio başlatılamadı:", error);
      return false;
    }
  }, []);

  const playSound = useCallback((): boolean => {
    if (!isAudioEnabled || !audioContextRef.current) {
      console.warn("Audio sistemi aktif değil");
      return false;
    }

    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }

    try {
      if (notificationSoundRef.current) {
        notificationSoundRef.current.currentTime = 0;
        notificationSoundRef.current.play().catch(() => {
          console.log("Ses dosyası çalınamadı, beep çalınıyor");
          playBeep();
        });
      } else {
        playBeep();
      }
      return true;
    } catch (error) {
      console.error("Ses çalınamadı:", error);
      return false;
    }
  }, [isAudioEnabled]);

  const playBeep = useCallback((): void => {
    if (!audioContextRef.current) return;

    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      oscillator.frequency.value = 800;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContextRef.current.currentTime + 0.5
      );

      oscillator.start();
      oscillator.stop(audioContextRef.current.currentTime + 0.5);
    } catch (error) {
      console.error("Beep çalınamadı:", error);
    }
  }, []);

  // Sayfa yüklendiğinde event listener'ları ekle
  useEffect(() => {
    const handleUserInteraction = (): void => {
      if (!isAudioEnabled) {
        initializeAudio();
      }
    };

    const events: (keyof DocumentEventMap)[] = [
      "click",
      "keydown",
      "touchstart",
    ];

    events.forEach((event) => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [isAudioEnabled, initializeAudio]);

  return {
    isAudioEnabled,
    initializeAudio,
    playSound,
    playBeep,
  };
};
