import { cn } from "cn"

export function StudioSpaceLogo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="size-8 shrink-0"
      >
        {/* rounded hexagon mark */}
        <path
          d="M20 2.5 35.5 11.2v17.6L20 37.5 4.5 28.8V11.2L20 2.5Z"
          fill="currentColor"
        />
        {/* red S-swoosh */}
        <path
          d="M25.5 14.5c-1.6-2.6-8.4-3-9.2.6-.8 3.5 8.9 3 8.1 6.8-.8 3.8-7.8 3.4-9.9.6"
          stroke="#ee3f2b"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span className="text-2xl font-bold tracking-tight whitespace-nowrap">
        StudioSpace
      </span>
    </span>
  )
}
