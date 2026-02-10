import { ReactNode } from 'react';

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  featured?: boolean;
};

export function GlassCard({ children, className = '', featured = false }: GlassCardProps) {
  return (
    <div
      className={`glass-card relative p-6 ${
        featured ? 'border-beam' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}