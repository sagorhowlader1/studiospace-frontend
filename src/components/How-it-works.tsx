import Link from "next/link"
import {
  ArrowRight,
  CalendarSearch,
  Search,
  Sparkles,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "cn"
import React from "react"

const steps = [
  {
    number: "01",
    title: "Discover Spaces",
    description:
      "Filter verified cyc walls, podcast lounges, soundstages, and mixing suites by location, gear inventory, and creator reviews.",
    icon: Search,
    iconClasses: "bg-orange-100 text-orange-500",
  },
  {
    number: "02",
    title: "Select Shoot Hours",
    description:
      "Inspect live calendar availability, choose precise hourly blocks, and review transparent breakdown rates with zero surprise fees.",
    icon: CalendarSearch,
    iconClasses: "bg-blue-100 text-blue-500",
  },
  {
    number: "03",
    title: "Book Instantly",
    description:
      "Lock in your reservation with double-booking collision prevention, instant booking confirmation, and downloadable invoice vouchers.",
    icon: Zap,
    iconClasses: "bg-emerald-100 text-emerald-500",
  },
  {
    number: "04",
    title: "Create & Produce",
    description:
      "Arrive at the stage with verified access codes, plug into ready-calibrated equipment grids, and bring your vision to life.",
    icon: Sparkles,
    iconClasses: "bg-violet-100 text-violet-500",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-background py-20 sm:py-24">      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-widest text-orange-500 uppercase sm:text-sm">
            Frictionless Booking
          </p>
          <h2 className="mt-3 text-white  px-3 py-1.5 text-3xl font-extrabold tracking-tight  sm:mt-4 sm:text-4xl lg:text-5xl">
            How StudioSpace Works
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:text-base">
            Four simple steps from pre-production concept to rolling camera in
            world-class creative facilities.
          </p>
        </div>

        {/* Step cards */}
        <div className="mt-12 flex flex-col gap-6 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 lg:flex lg:flex-row">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <article className="flex-1 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7">
                <div className="flex items-start justify-between">
                  <span
                    className={cn(
                      "grid size-11 place-items-center rounded-xl",
                      step.iconClasses,
                    )}
                  >
                    <step.icon className="size-5" />
                  </span>
                  <span className="text-2xl font-bold text-foreground/10 sm:text-3xl">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-6 text-base font-bold tracking-tight text-foreground sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </article>

              {/* Arrow separator between cards (desktop only) */}
              {index < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden self-center text-foreground/30 lg:block"
                >
                  <ArrowRight className="size-5" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center sm:mt-16">
          <Button
            render={<Link href="/studios" />}
            className="h-11 rounded-lg bg-orange-500 px-7 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Start Exploring Workspaces
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </section>
  )
}
