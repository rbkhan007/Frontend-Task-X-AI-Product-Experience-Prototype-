"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const ROLES = [
  "Head of Data",
  "VP Engineering",
  "Data Lead",
  "Product Manager",
  "Director of Insights",
  "CTO",
  "Other",
] as const;

export function RoleSelect({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string | boolean;
}) {
  const [open, setOpen] = useState(false);
  const [focusedIdx, setFocusedIdx] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const focusedRef = useRef(focusedIdx);
  useEffect(() => { focusedRef.current = focusedIdx; }, [focusedIdx]);

  const selected = value || "Select…";

  const select = useCallback(
    (v: string) => {
      onChange(v);
      setOpen(false);
      setFocusedIdx(-1);
    },
    [onChange]
  );

  const toggleOpen = useCallback(() => {
    setOpen((prev) => {
      if (!prev) {
        setFocusedIdx(value ? ROLES.indexOf(value as typeof ROLES[number]) : -1);
      } else {
        setFocusedIdx(-1);
      }
      return !prev;
    });
  }, [value]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!open) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          toggleOpen();
          e.preventDefault();
        }
        return;
      }
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusedIdx((prev) => Math.min(prev + 1, ROLES.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIdx((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (focusedRef.current >= 0) select(ROLES[focusedRef.current]);
          break;
        case "Escape":
          setOpen(false);
          setFocusedIdx(-1);
          break;
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, select, toggleOpen]);

  useEffect(() => {
    if (!open || focusedIdx < 0) return;
    const el = listRef.current?.children[focusedIdx] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [focusedIdx, open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setFocusedIdx(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative" style={{ zIndex: 40 }}>
      <button
        type="button"
        role="combobox"
        aria-controls="role-listbox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select role"
        onClick={toggleOpen}
        className={cn(
          "auth-input flex items-center justify-between",
          !value && "text-muted-foreground/60",
          !!error && "border-red-500/50"
        )}
      >
        <span className="truncate">{selected}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex shrink-0 items-center"
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={listRef}
            id="role-listbox"
            role="listbox"
            initial={{ opacity: 0, y: -6, filter: "blur(4px)", scale: 0.96 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, y: -4, filter: "blur(3px)", scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-56 overflow-y-auto rounded-xl border border-hairline bg-surface-2 p-1 shadow-2xl backdrop-blur-xl"
            style={{ transformOrigin: "top" }}
          >
            {ROLES.map((role, i) => (
              <button
                key={role}
                type="button"
                role="option"
                aria-selected={role === value}
                onClick={() => select(role)}
                onMouseEnter={() => setFocusedIdx(i)}
                className={cn(
                  "flex w-full items-center rounded-lg px-3 py-2 text-left text-[13px] transition-colors",
                  role === value
                    ? "bg-accent/12 text-accent"
                    : focusedIdx === i
                    ? "bg-surface-3 text-foreground"
                    : "text-muted-foreground hover:bg-surface-3 hover:text-foreground"
                )}
              >
                <span>{role}</span>
                {role === value && (
                  <motion.span
                    layoutId="role-check"
                    className="ml-auto h-1.5 w-1.5 rounded-full bg-accent"
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
