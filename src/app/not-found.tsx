import Link from "next/link"

import { StudioSpaceLogo } from "@/components/logo"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-[#353536] px-4 text-center text-white sm:px-6">
      <StudioSpaceLogo />
      <p className="mt-10 text-sm font-bold tracking-widest text-brand uppercase">
        404 — Page Not Found
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
        This Studio Doesn&apos;t Exist
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
        The page you are looking for has been moved, renamed, or never existed.
        Head back and keep creating.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
        <Button
          render={<Link href="/" />}
          className="h-11 rounded-lg bg-brand px-6 text-base font-semibold text-white hover:bg-brand/90"
        >
          Back To Home
        </Button>
      </div>
    </main>
  )
}
