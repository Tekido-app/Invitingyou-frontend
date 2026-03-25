import type { Variants } from 'framer-motion';

/**
 * Premium Animation Utilities
 * 
 * Philosophy: Subtle, refined, never bouncy or cheap
 * - Use ease-in-out for smooth, natural motion
 * - Keep durations short (200-400ms)
 * - Minimal scale changes (1.02 max)
 * - Fade over slide when possible
 */

// ============================================
// TRANSITION PRESETS
// ============================================

export const transitions = {
  // Smooth and refined (default for most interactions)
  smooth: {
    duration: 0.3,
    ease: [0.4, 0.0, 0.2, 1] as const, // Custom easing curve (similar to ease-in-out but more refined)
  },

  // Quick and responsive (for buttons, small elements)
  quick: {
    duration: 0.2,
    ease: [0.4, 0.0, 0.2, 1] as const,
  },

  // Slow and elegant (for page transitions, large elements)
  elegant: {
    duration: 0.4,
    ease: [0.4, 0.0, 0.2, 1] as const,
  },
};

// ============================================
// FADE ANIMATIONS (Most Premium)
// ============================================

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 8 }, // Subtle 8px movement
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
};

// ============================================
// SCALE ANIMATIONS (Very Subtle)
// ============================================

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.98 }, // Barely noticeable scale
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};

// For hover effects - extremely subtle
export const hoverScale = {
  scale: 1.02, // Just 2% - barely visible but feels responsive
  transition: transitions.quick,
};

// For tap/click effects
export const tapScale = {
  scale: 0.98, // Slight press effect
  transition: transitions.quick,
};

// ============================================
// STAGGER ANIMATIONS (For Lists/Grids)
// ============================================

export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.05, // Subtle stagger (50ms between items)
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: transitions.smooth,
  },
};

// ============================================
// SLIDE ANIMATIONS (Use Sparingly)
// ============================================

export const slideInRight: Variants = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '100%', opacity: 0 },
};

export const slideInLeft: Variants = {
  initial: { x: '-100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 },
};

// ============================================
// LOADING ANIMATIONS
// ============================================

export const pulse: Variants = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Subtle shimmer effect for skeletons
export const shimmer: Variants = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Create a custom delay for staggered animations
 */
export const createStagger = (delay: number = 0.05): Variants => ({
  animate: {
    transition: {
      staggerChildren: delay,
      delayChildren: 0.1,
    },
  },
});

/**
 * Combine multiple animation variants
 */
export const combineVariants = (...variants: Variants[]): Variants => {
  return variants.reduce((acc, variant) => ({
    ...acc,
    ...variant,
  }), {});
};
