"use client"

import { MoonIcon, SunIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

const themeKey = "theme"

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark")
  try {
    localStorage.setItem(themeKey, isDark ? "dark" : "light")
  } catch {
    // storage can be unavailable (private mode); theme still toggles this visit
  }
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  // Icons are swapped with pure `dark:` CSS so there is never a hydration mismatch.
  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`size-10 text-foreground hover:bg-foreground/10 hover:text-foreground ${className}`}
    >
      <SunIcon className="hidden size-5 dark:block" />
      <MoonIcon className="size-5 dark:hidden" />
    </Button>
  )
}
