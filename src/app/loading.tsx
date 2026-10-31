import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading studios"
      className="relative min-h-svh overflow-hidden bg-background px-4 pt-28 sm:px-6 lg:pt-32 dark:bg-ink"
    >
      {/* Warm glow placeholder vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_42%,rgba(255,95,29,0.18),transparent_55%)] dark:bg-[radial-gradient(circle_at_68%_42%,rgba(255,95,29,0.12),transparent_55%)]" />

      <div className="relative mx-auto flex min-h-svh w-full max-w-7xl flex-col pb-12">
        {/* Floating highlights skeleton */}
        <div className="mt-16 max-w-md space-y-4 lg:mt-24">
          <Skeleton className="h-5 w-60 bg-foreground/10 dark:bg-white/10" />
          <Skeleton className="h-5 w-80 bg-foreground/10 dark:bg-white/10" />
          <Skeleton className="h-5 w-72 bg-foreground/10 dark:bg-white/10" />
        </div>

        {/* Bottom content skeleton */}
        <div className="grid items-end gap-12 pt-32 lg:grid-cols-[1fr_340px] lg:pt-40">
          <div className="max-w-2xl space-y-6">
            <Skeleton className="h-4 w-48 bg-foreground/10 dark:bg-white/10" />
            <Skeleton className="h-12 w-full bg-foreground/10 dark:bg-white/10 sm:h-14" />
            <Skeleton className="h-12 w-3/4 bg-foreground/10 dark:bg-white/10 sm:h-14" />
            <Skeleton className="h-5 w-full max-w-xl bg-foreground/10 dark:bg-white/10" />
            <Skeleton className="h-5 w-2/3 bg-foreground/10 dark:bg-white/10" />
            <div className="flex gap-4 pt-2">
              <Skeleton className="h-11 w-40 bg-foreground/10 dark:bg-white/10" />
              <Skeleton className="h-11 w-40 bg-foreground/10 dark:bg-white/10" />
            </div>
          </div>
          <Skeleton className="h-64 w-full max-w-sm bg-foreground/10 dark:bg-white/10" />
        </div>
      </div>

      {/* Centered spinner overlay */}
      <div className="absolute inset-x-0 bottom-10 flex justify-center">
        <Spinner className="size-6 text-brand" />
      </div>
    </div>
  )
}
