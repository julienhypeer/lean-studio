import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  speed?: number;
  delay?: number;
  loop?: boolean;
  onComplete?: () => void;
}

export function useTypewriter(
  text: string,
  options: UseTypewriterOptions = {}
) {
  const { 
    speed = 30, 
    delay = 0, 
    loop = false,
    onComplete 
  } = options;
  
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
      
      if (loop) {
        setTimeout(() => {
          setDisplayText('');
          setCurrentIndex(0);
          setIsComplete(false);
        }, 2000);
      }
    }
  }, [currentIndex, text, speed, isTyping, loop, isComplete, onComplete]);

  return {
    displayText,
    isComplete,
    isTyping
  };
}