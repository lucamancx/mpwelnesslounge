"use client";

import { useState, ReactNode, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandableTextProps {
  children?: ReactNode;
  /** Content shown when collapsed (manual mode only) */
  shortContent?: ReactNode;
  /** Content revealed on expand (manual mode only) */
  expandedContent?: ReactNode;
  /** Lines to show before truncating on mobile (auto mode) */
  lines?: number;
  /** Only collapse on mobile screens */
  mobileOnly?: boolean;
  buttonLabel?: string;
  buttonLabelCollapse?: string;
  actionButton?: ReactNode;
}

export function ExpandableText({
  children,
  shortContent,
  expandedContent,
  lines = 4,
  mobileOnly = false,
  buttonLabel = "Scopri di più",
  buttonLabelCollapse = "Mostra meno",
  actionButton
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Desktop + mobileOnly = show everything, no toggle
  if (mobileOnly && !isMobile) {
    return (
      <div>
        {shortContent ?? children}
        {expandedContent}
        {actionButton && (
          <div className="flex flex-wrap items-center gap-4 mt-4">
            {actionButton}
          </div>
        )}
      </div>
    );
  }

  // Manual mode (shortContent + expandedContent provided)
  if (shortContent && expandedContent) {
    return (
      <div className="space-y-4">
        {shortContent}
        <div 
          className={`grid transition-all duration-500 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden">
            <div className="pt-2">
              {expandedContent}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-4">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center text-[11px] font-bold uppercase tracking-widest text-inherit bg-transparent border border-current/30 px-6 py-3.5 rounded-full hover:bg-current/10 transition-colors min-h-[44px]"
          >
            {isExpanded ? buttonLabelCollapse : buttonLabel}
            {isExpanded ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
          </button>
          {actionButton}
        </div>
      </div>
    );
  }

  // Auto mode (uses line-clamp on children)
  return (
    <div className="space-y-4">
      <div 
        className="transition-all duration-500"
        style={!isExpanded ? { display: "-webkit-box", WebkitLineClamp: lines, WebkitBoxOrient: "vertical", overflow: "hidden" } : undefined}
      >
        {children}
      </div>
      <div className="flex flex-wrap items-center gap-3 mt-4">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center text-[11px] font-bold uppercase tracking-widest text-inherit bg-transparent border border-current/30 px-6 py-3.5 rounded-full hover:bg-current/10 transition-colors min-h-[44px]"
        >
          {isExpanded ? buttonLabelCollapse : buttonLabel}
          {isExpanded ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
        </button>
        {actionButton}
      </div>
    </div>
  );
}

