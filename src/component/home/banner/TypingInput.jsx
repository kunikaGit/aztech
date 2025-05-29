import { useState, useEffect } from 'react';

const TypingInput = () => {
  const sentences = [
    "One stop solution for all your digital needs...",
    "Only $0.08/day to unlock your dreams...",
    "Explore AI, education, music, and more...",
    "Earn rewards with Smart Referral System..."
  ];

  const [placeholder, setPlaceholder] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // SPEED SETTINGS (tweak these values to control speed)
  const typingSpeed = 50;      // ↓ LOWER means faster typing
  const deletingSpeed = 25;    // ↓ LOWER means faster deleting
  const pauseAfterTyping = 1000; // ↓ time to wait before deleting

  useEffect(() => {
    if (inputValue) return; // Stop animation if user starts typing

    const currentSentence = sentences[sentenceIndex];
    let timer;

    if (!deleting && charIndex <= currentSentence.length) {
      timer = setTimeout(() => {
        setPlaceholder(currentSentence.slice(0, charIndex));
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
    } else if (!deleting && charIndex > currentSentence.length) {
      timer = setTimeout(() => setDeleting(true), pauseAfterTyping);
    } else if (deleting && charIndex >= 0) {
      timer = setTimeout(() => {
        setPlaceholder(currentSentence.slice(0, charIndex));
        setCharIndex((prev) => prev - 1);
      }, deletingSpeed);
    } else if (deleting && charIndex < 0) {
      setDeleting(false);
      setSentenceIndex((prev) => (prev + 1) % sentences.length);
      setCharIndex(0);
    }

    return () => clearTimeout(timer);
  }, [charIndex, deleting, sentenceIndex, inputValue]);

  return (
    <input
      type="text"
      placeholder={placeholder + '|'}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className="animated-input"
    />
  );
};

export default TypingInput;
