"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  AlarmClock,
  CalendarCheck,
  Camera,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
  type CarouselApi,
} from "@/components/ui/carousel"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "cn"

const heroHighlights = [
  { icon: Camera, label: "Professional Studio Rental" },
  { icon: AlarmClock, label: "Flexible Hourly Studio Rental" },
  { icon: CalendarCheck, label: "Instant Online Studio Booking" },
]

const AUTOPLAY_MS = 6000

const slides = [
  {
    eyebrow: "Creative Studio Rental",
    headline: "Where Great Content Comes Alive Inside",
    subtext:
      "Create outstanding visual content in professional studio environments equipped with modern facilities, flexible rental options, and inspiring spaces for every production.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2400&auto=format&fit=crop",
    alt: "Photographer working in a dark studio",
  },
  {
    eyebrow: "Instant Online Booking",
    headline: "Book A Pro Studio In Under A Minute",
    subtext:
      "Skip the back-and-forth. Pick your space, choose an hourly slot, and confirm your booking instantly — with shower and blackout rooms ready when you are.",
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=2400&auto=format&fit=crop",
    alt: "Videographer filming in a rental studio",
  },
  {
    eyebrow: "Film & Video Production",
    headline: "Your Story Deserves A Bigger Stage",
    subtext:
      "Cyclorama walls, cinema lighting grids, and full production support — everything your next commercial or podcast episode needs under one roof.",
    image:
      "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?q=80&w=2400&auto=format&fit=crop",
    alt: "Film crew on a production set",
  },
]

export function Banner() {
  const apiRef = React.useRef<CarouselApi | null>(null)
  const [selected, setSelected] = React.useState(0)
  const [paused, setPaused] = React.useState(false)

  // Track the selected slide for the dots
  React.useEffect(() => {
    const api = apiRef.current
    if (!api) return
    const onSelect = () => setSelected(api.selectedScrollSnap())
    api.on("select", onSelect)
    onSelect()
    return () => {
      api.off("select", onSelect)
    }
  }, [])

  // Autoplay, paused on hover/focus
  React.useEffect(() => {
    const api = apiRef.current
    if (!api || paused) return
    const id = setInterval(() => api.scrollNext(), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused])

  return (
    <section
      aria-label="Featured studios"
      className="relative isolate overflow-hidden bg-background text-foreground dark:bg-ink dark:text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Carousel
        opts={{ loop: true }}
        setApi={(api) => (apiRef.current = api)}
        className="min-h-svh"
        aria-roledescription="carousel"
      >
        <CarouselContent className="m-0">
          {slides.map((slide, index) => (
            <CarouselItem
              key={slide.headline}
              className="p-0"
              aria-hidden={index !== selected ? true : undefined}
            >
              <div className="relative min-h-svh">
                {/* Slide visual + theme-aware overlays */}
                <div className="absolute inset-0" aria-hidden="true">
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    priority={index === 0}
                    quality={90}
                    sizes="100vw"
                    className="object-cover object-center opacity-25 dark:opacity-45"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_42%,rgba(255,95,29,0.35),rgba(255,95,29,0.12)_45%,transparent_70%)] dark:bg-[radial-gradient(circle_at_68%_42%,rgba(255,95,29,0.45),rgba(160,40,7,0.25)_45%,transparent_70%)]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent dark:from-ink dark:via-ink/55 dark:to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background/40 dark:from-ink dark:via-transparent dark:to-ink/60" />
                </div>

                {/* Slide content */}
                <div className="relative mx-auto flex min-h-svh w-full max-w-7xl flex-col px-4 pt-24 pb-24 sm:px-6 sm:pt-28 sm:pb-20 lg:pt-32">
                  {/* Floating highlights */}
                  <ul className="mt-8 max-w-md space-y-3 sm:mt-12 sm:space-y-4 lg:mt-24">
                    {heroHighlights.map(({ icon: Icon, label }) => (
                      <li key={label} className="flex items-center gap-3">
                        <Icon className="size-4 shrink-0 sm:size-5" />
                        <span className="text-xs font-medium sm:text-sm sm:text-base">
                          {label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Bottom content */}
                  <div className="mt-auto grid items-end pt-16 sm:pt-24 lg:pt-40">
                    <div className="max-w-2xl">
                      <p className="text-xs font-bold tracking-widest text-brand uppercase sm:text-sm dark:text-white">
                        {slide.eyebrow}
                      </p>
                      <h1 className="mt-3 text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:mt-4 sm:text-5xl sm:leading-none md:text-6xl lg:text-7xl">
                        {slide.headline}
                      </h1>
                      <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/70 sm:mt-6 sm:text-base sm:text-lg lg:leading-relaxed dark:text-white/70">
                        {slide.subtext}
                      </p>
                      <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
                        <Button
                          render={<Link href="/studios" />}
                          className="h-11 w-full rounded-lg bg-brand px-5 text-base font-semibold text-white hover:bg-brand/90 sm:w-auto sm:px-6"
                        >
                          Explore Studios
                        </Button>
                        <Button
                          render={<Link href="/studios" />}
                          className="h-11 w-full rounded-lg border border-foreground/15 bg-background px-5 text-base font-medium text-foreground hover:bg-muted sm:w-auto sm:px-6 dark:border-transparent dark:bg-white dark:text-ink dark:hover:bg-white/90"
                        >
                          Host Your Space
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

      {/* Arrows (swipe + dots cover touch screens) */}
      <div className="hidden sm:contents">
        <HeroArrow direction="prev" />
        <HeroArrow direction="next" />
      </div>
      </Carousel>

      {/* Dots */}
      <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center gap-3 sm:bottom-6 sm:gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.headline}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === selected}
            onClick={() => apiRef.current?.scrollTo(index)}
            className="group cursor-pointer touch-manipulation py-2"
          >
            <span
              className={cn(
                "block h-2.5 rounded-full transition-all duration-300",
                index === selected
                  ? "w-8 bg-brand"
                  : "w-2.5 bg-foreground/30 transition-colors group-hover:bg-foreground/50 dark:bg-white/40 dark:group-hover:bg-white/60",
              )}
            />
          </button>
        ))}
      </div>
    </section>
  )
}

function HeroArrow({
  direction,
}: {
  direction: "prev" | "next"
}) {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()
  const isPrev = direction === "prev"
  const disabled = isPrev ? !canScrollPrev : !canScrollNext

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      aria-label={isPrev ? "Previous slide" : "Next slide"}
      disabled={disabled}
      onClick={isPrev ? scrollPrev : scrollNext}
      className={cn(
        "absolute inset-y-0 z-10 my-auto size-11 rounded-full border border-white/20 bg-ink/40 text-white backdrop-blur-sm hover:bg-ink/60 disabled:opacity-0 dark:bg-white/10 dark:hover:bg-white/20",
        isPrev ? "left-3 sm:left-6" : "right-3 sm:right-6",
      )}
    >
      {isPrev ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </Button>
  )
}
