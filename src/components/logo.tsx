import { cn } from "cn"

export function StudioSpaceMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient
          id="studiospace-mark-gradient"
          x1="5"
          y1="3"
          x2="35"
          y2="37"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#ff9e66" />
          <stop offset="0.55" stopColor="#f4581f" />
          <stop offset="1" stopColor="#d3350b" />
        </linearGradient>
      </defs>
      {/* gradient squircle tile */}
      <rect
        x="2"
        y="2"
        width="36"
        height="36"
        rx="11.5"
        fill="url(#studiospace-mark-gradient)"
      />
      {/* soft inner highlight for depth */}
      <rect
        x="3.2"
        y="3.2"
        width="33.6"
        height="33.6"
        rx="10.3"
        stroke="#ffffff"
        strokeOpacity="0.16"
        strokeWidth="1.6"
        fill="none"
      />
      {/* studio target mark */}
      <circle cx="20" cy="20" r="8.7" stroke="#ffffff" strokeWidth="2.7" />
      <circle cx="20" cy="20" r="3.4" fill="#ffffff" />
    </svg>
  )
}

export function StudioSpaceLogo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <StudioSpaceMark className="size-8" />
      <span className="text-2xl font-bold tracking-tight whitespace-nowrap text-foreground">
        Studio
        <span className="bg-gradient-to-r from-[#f4581f] to-[#c22f09] bg-clip-text text-transparent">
          Space
        </span>
      </span>
    </span>
  )
}
