"use client";

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';

interface TutorialStepProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const TutorialStep: React.FC<TutorialStepProps> = ({
  id,
  children,
  className,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn('tutorial-element', id, className)}
    >
      {children}
    </motion.div>
  );
};
