import { motion } from "framer-motion";
import { pulse } from "../../utils/animations";

/**
 * Premium Skeleton Components
 * Using brand cream colors for subtle, elegant loading states
 */

interface SkeletonProps {
  className?: string;
}

// Base Skeleton with pulse animation
export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => (
  <motion.div
    variants={pulse}
    animate="animate"
    className={`bg-brand-cream-light rounded-sm ${className}`}
  />
);

// Skeleton for Template Cards
export const SkeletonCard: React.FC = () => (
  <div className="overflow-hidden">
    {/* Card Container */}
    <div className="relative">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-brand-cream rounded-sm" />

      {/* Main Card */}
      <div className="aspect-[3/4] relative overflow-hidden rounded-sm bg-white shadow-md">
        <motion.div
          variants={pulse}
          animate="animate"
          className="w-full h-full bg-brand-cream-light"
        />
      </div>
    </div>

    {/* Card Footer */}
    <div className="pt-4 pb-2 space-y-2">
      <motion.div
        variants={pulse}
        animate="animate"
        className="h-4 bg-brand-cream-light rounded w-3/4"
      />
      <motion.div
        variants={pulse}
        animate="animate"
        className="h-3 bg-brand-cream-light rounded w-1/2"
      />
    </div>
  </div>
);

// Skeleton for Event Cards (Dashboard)
export const SkeletonEventCard: React.FC = () => (
  <div className="bg-white rounded-sm shadow-md overflow-hidden">
    <motion.div
      variants={pulse}
      animate="animate"
      className="h-48 bg-brand-cream-light"
    />
    <div className="p-6 space-y-3">
      <motion.div
        variants={pulse}
        animate="animate"
        className="h-6 bg-brand-cream-light rounded w-2/3"
      />
      <motion.div
        variants={pulse}
        animate="animate"
        className="h-4 bg-brand-cream-light rounded w-1/2"
      />
      <div className="flex gap-2 pt-2">
        <motion.div
          variants={pulse}
          animate="animate"
          className="h-8 bg-brand-cream-light rounded w-20"
        />
        <motion.div
          variants={pulse}
          animate="animate"
          className="h-8 bg-brand-cream-light rounded w-20"
        />
      </div>
    </div>
  </div>
);

// Skeleton for Text Lines
interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  className = "",
}) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <motion.div
        key={i}
        variants={pulse}
        animate="animate"
        className="h-4 bg-brand-cream-light rounded"
        style={{ width: i === lines - 1 ? "60%" : "100%" }}
      />
    ))}
  </div>
);

// Skeleton for Table Rows
export const SkeletonTableRow: React.FC = () => (
  <div className="flex items-center gap-4 py-3 border-b border-brand-cream-light">
    <motion.div
      variants={pulse}
      animate="animate"
      className="w-10 h-10 bg-brand-cream-light rounded-full"
    />
    <div className="flex-1 space-y-2">
      <motion.div
        variants={pulse}
        animate="animate"
        className="h-4 bg-brand-cream-light rounded w-1/3"
      />
      <motion.div
        variants={pulse}
        animate="animate"
        className="h-3 bg-brand-cream-light rounded w-1/4"
      />
    </div>
    <motion.div
      variants={pulse}
      animate="animate"
      className="w-20 h-8 bg-brand-cream-light rounded"
    />
  </div>
);

// Skeleton for Guest List
export const SkeletonGuestList: React.FC<{ count?: number }> = ({
  count = 5,
}) => (
  <div className="space-y-1">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonTableRow key={i} />
    ))}
  </div>
);

// Skeleton for Stats Cards
export const SkeletonStatCard: React.FC = () => (
  <div className="bg-white rounded-sm shadow-md p-6">
    <div className="flex items-center justify-between mb-4">
      <motion.div
        variants={pulse}
        animate="animate"
        className="h-5 bg-brand-cream-light rounded w-24"
      />
      <motion.div
        variants={pulse}
        animate="animate"
        className="w-10 h-10 bg-brand-cream-light rounded-full"
      />
    </div>
    <motion.div
      variants={pulse}
      animate="animate"
      className="h-8 bg-brand-cream-light rounded w-16 mb-2"
    />
    <motion.div
      variants={pulse}
      animate="animate"
      className="h-3 bg-brand-cream-light rounded w-32"
    />
  </div>
);

// Skeleton for Form Input
export const SkeletonInput: React.FC = () => (
  <div className="space-y-2">
    <motion.div
      variants={pulse}
      animate="animate"
      className="h-4 bg-brand-cream-light rounded w-24"
    />
    <motion.div
      variants={pulse}
      animate="animate"
      className="h-10 bg-brand-cream-light rounded w-full"
    />
  </div>
);

// Skeleton for Button
export const SkeletonButton: React.FC<{ className?: string }> = ({
  className = "w-32 h-10",
}) => (
  <motion.div
    variants={pulse}
    animate="animate"
    className={`bg-brand-cream-light rounded-sm ${className}`}
  />
);
