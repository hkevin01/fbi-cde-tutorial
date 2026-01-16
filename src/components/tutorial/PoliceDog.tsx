"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Star, Trophy, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PoliceDogProps {
  visible?: boolean;
  message?: string;
  onInteraction?: () => void;
  mood?: 'happy' | 'excited' | 'focused' | 'proud';
  tutorialStep?: number;
  totalSteps?: number;
}

const dogMessages = {
  welcome: "Woof! I'm Officer Rex, your FBI K-9 guide! Ready to learn about crime data? 🕵️‍♂️",
  tutorial: "Great job! Let's explore the FBI Crime Data Explorer together! 🐕‍🦺",
  encouragement: "You're doing pawsome! Keep going, partner! 🌟",
  completion: "Excellent work! You've mastered the FBI system! Time for treats! 🦴",
  idle: "Need help? Just give me a pat and I'll assist you! 👋",
  search: "Sniffing out the data... Found some interesting patterns! 🔍",
  filters: "These filters help us track down the evidence we need! 🎯",
  charts: "Woof! These charts tell a story - can you read the clues? 📊",
  proud: "You're becoming a real crime data detective! I'm so proud! 🏆"
};

const dogEmojis = {
  happy: '🐕‍🦺',
  excited: '🐕',
  focused: '🐕‍🦺',
  proud: '🏆🐕‍🦺'
};

export const PoliceDog: React.FC<PoliceDogProps> = ({
  visible = true,
  message = dogMessages.welcome,
  onInteraction,
  mood = 'happy',
  tutorialStep = 0,
  totalSteps = 20
}) => {
  const [isInteracting, setIsInteracting] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(message);
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [tailWag, setTailWag] = useState(false);

  useEffect(() => {
    setCurrentMessage(message);
  }, [message]);

  // Auto-celebrate on tutorial progress
  useEffect(() => {
    if (tutorialStep > 0 && tutorialStep < totalSteps) {
      setTailWag(true);
      setTimeout(() => setTailWag(false), 2000);

      if (tutorialStep % 5 === 0) {
        setCurrentMessage(dogMessages.encouragement);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
      }
    } else if (tutorialStep === totalSteps) {
      setCurrentMessage(dogMessages.completion);
      setShowMessage(true);
    }
  }, [tutorialStep, totalSteps]);

  const handleDogClick = () => {
    setIsInteracting(true);
    setShowMessage(true);
    onInteraction?.();

    // Generate floating hearts
    const newHearts = Array.from({ length: 3 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 40 - 20,
      y: Math.random() * 40 - 20
    }));
    setHearts(newHearts);

    // Cycle through different messages
    const messages = Object.values(dogMessages);
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setTimeout(() => {
      setCurrentMessage(randomMessage);
    }, 500);

    // Clear hearts after animation
    setTimeout(() => {
      setHearts([]);
      setIsInteracting(false);
    }, 2000);
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Police Dog Character */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{
          scale: 1,
          rotate: 0,
          y: isInteracting ? [-5, 5, -5, 0] : [0, -3, 0]
        }}
        transition={{
          duration: isInteracting ? 0.6 : 3,
          repeat: isInteracting ? 0 : Infinity,
          repeatType: "reverse"
        }}
        className="fixed bottom-6 right-6 z-50 cursor-pointer select-none"
        onClick={handleDogClick}
      >
        <div className="relative">
          {/* Main Dog Body */}
          <motion.div
            className="w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full shadow-lg border-4 border-blue-600 flex items-center justify-center text-4xl hover:scale-110 transition-transform"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {dogEmojis[mood]}
          </motion.div>

          {/* Police Badge */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
            FBI
          </div>

          {/* Floating Hearts */}
          <AnimatePresence>
            {hearts.map((heart) => (
              <motion.div
                key={heart.id}
                initial={{ scale: 0, x: heart.x, y: heart.y, opacity: 1 }}
                animate={{
                  scale: [0, 1.2, 0],
                  y: heart.y - 50,
                  opacity: [1, 1, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
                className="absolute top-0 left-1/2 pointer-events-none"
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Activity Indicator */}
          {!showMessage && (
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -left-2 w-4 h-4 bg-green-500 rounded-full shadow-lg"
            >
              <motion.div
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                className="w-full h-full bg-green-400 rounded-full opacity-75"
              />
            </motion.div>
          )}
        </div>

        {/* Quick Interaction Prompt */}
        {!showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 2 }}
            className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
          >
            <div className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs shadow-lg border">
              Click me! 🐾
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Message Bubble */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-32 right-6 z-50 max-w-xs"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 relative">
              {/* Close Button */}
              <button
                onClick={handleCloseMessage}
                className="absolute -top-2 -right-2 w-6 h-6 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>

              {/* Dog Avatar in Message */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center text-xl flex-shrink-0 border-2 border-blue-600">
                  {dogEmojis[mood]}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
                    Officer Rex - FBI K-9 Unit
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {currentMessage}
                  </p>
                </div>
              </div>

              {/* Action Icons */}
              <div className="flex justify-center gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  onClick={() => setCurrentMessage(dogMessages.encouragement)}
                >
                  <Star className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                  onClick={() => setCurrentMessage(dogMessages.tutorial)}
                >
                  <Trophy className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400 rounded-full flex items-center justify-center hover:bg-pink-200 dark:hover:bg-pink-800 transition-colors"
                  onClick={() => setCurrentMessage(dogMessages.completion)}
                >
                  <Heart className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Speech Bubble Tail */}
              <div className="absolute bottom-0 right-8 transform translate-y-full">
                <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-white dark:border-t-gray-800"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
