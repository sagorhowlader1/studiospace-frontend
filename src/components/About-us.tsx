import Link from "next/link"
import {
  IdCard,
  KeyRound,
  Headphones,
  ShieldCheck,
} from "lucide-react"

import { Button } from "@/components/ui/button"

const protections = [
  {
    title: "$1,000,000 Host Liability Protection",
    description:
      "Comprehensive property and stage damage coverage backed by top-tier creative insurance underwriters for every booking.",
    icon: ShieldCheck,
  },
  {
    title: "Identity & Professional Verification",
    description:
      "Every studio host and booking creator undergoes rigorous ID and portfolio verification to ensure professional workspace safety.",
    icon: IdCard,
  },
  {
    title: "Production Equipment Safeguard",
    description:
      "High-value cinema lenses, vintage microphones, and lighting grids are protected with itemized check-in/out protocols.",
    icon: KeyRound,
  },
  {
    title: "24/7 Dedicated Production Concierge",
    description:
      "Direct on-call dispatch assistance for technical access, power hookups, acoustic calibration, and emergency reschedules.",
    icon: Headphones,
  },
]

export default function AboutUs() {
  return (
    <section id="about-us" className="scroll-mt-24 bg-muted/40 py-20 sm:py-24 dark:bg-muted/20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Left: heading + copy + CTAs */}
          <div>
            <p className="text-xs font-bold tracking-widest text-orange-500 uppercase sm:text-sm">
              Trust, Safety &amp; Peace of Mind
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance sm:mt-5 sm:text-4xl lg:text-5xl">
              Built on Uncompromising Protection for Explore Studios
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:text-base">
              We understand creative production is unpredictable. StudioSpace
              provides enterprise-grade safety umbrellas, verified host
              guarantees, and around-the-clock technical support so you can
              focus entirely on craft.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              
              <Button
                render={<Link href="/explore-studios" />}
                className="h-11 w-full rounded-lg border border-foreground/15 bg-background px-5 text-sm font-medium text-foreground hover:bg-muted sm:w-auto sm:px-6 dark:border-transparent dark:bg-white dark:text-ink dark:hover:bg-white/90"
              >
                Explore Studios
              </Button>
            </div>
          </div>

          {/* Right: protection cards */}
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {protections.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-orange-100 text-orange-500">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-sm font-bold tracking-tight text-foreground sm:text-base">
                  {title}
                </h3>
                <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground sm:text-[0.8125rem]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
