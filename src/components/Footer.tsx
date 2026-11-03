import Link from "next/link";
import {
  BadgeCheck,
  Heart,
  ShieldCheck,
} from "lucide-react";

import { NewsletterForm } from "@/components/newsletter-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StudioSpaceMark } from "@/components/logo";

const privacyLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" }
]
const trustBadges = [
  {
    icon: ShieldCheck,
    title: "Host Guarantee",
    description: "Comprehensive liability & gear protection",
  },
  {
    icon: BadgeCheck,
    title: "Verified Workspaces",
    description: "Inspected acoustics, power, & gear",
  },
  {
    icon: Heart,
    title: "Creator First",
    description: "Zero hidden fees, transparent booking",
  },
]

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/explore-studios" },
  // { label: "All Workspaces", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/#about-us" },
  
]



const categoryLinks = [
  { label: "Photo Studios", href: "/explore-studios" },
  { label: " Sound Stages", href: "/explore-studios" },
  { label: "Podcast Rooms", href: "/explore-studios" },
  { label: "Music Suites", href: "/explore-studios" },
  { label: "Art Workshops", href: "/explore-studios" },
  { label: "Dance Studios", href: "/explore-studios" },
  { label: "Co-working Lofts", href: "/explore-studios" },
]

const date = new Date().getFullYear()

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1.1 2h6.5l4.4 5.9L18.9 2Zm-1.1 18.1h1.7L7.5 3.8H5.7l12.1 16.3Z" />
    </svg>
  )
}


const socialLinks = [
  { Icon: XIcon, label: "X (Twitter)", href: "https://x.com" },
]


function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <StudioSpaceMark className="size-8" />
      <span className="text-lg font-bold tracking-tight text-foreground">
        Studio<span className="text-brand">Space</span>
      </span>
    </Link>
  )
}

export function Footer() {
  return (
    <footer>
      {/* Trust badge strip */}
      <div className="bg-brand/5 dark:bg-white/5 border-y border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:grid-cols-3 sm:gap-4 sm:px-6">
          {trustBadges.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-center gap-4">
              <span className="bg-brand/10 text-brand grid size-10 shrink-0 place-items-center rounded-lg">
                <Icon className="size-5" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  {title}
                </h3>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-background dark:bg-ink py-14 text-foreground">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.2fr_1.2fr]">
            {/* Brand + newsletter */}
            <div>
              <Logo />
              <p className="text-muted-foreground mt-5 max-w-sm text-sm leading-relaxed">
                StudioSpace is the premier peer-to-peer workspace sharing
                marketplace connecting filmmakers, photographers, musicians,
                and creators with world-class production facilities.
              </p>

              <p className="text-foreground mt-7 text-xs font-bold tracking-widest uppercase">
                Join Our Creator Newsletter
              </p>
              <NewsletterForm />
            </div>

            {/* Explore */}
            <nav aria-label="Explore">
              <h3 className="text-foreground text-xs font-bold tracking-widest uppercase">
                Explore
              </h3>
              <ul className="mt-5 space-y-3">
                {exploreLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-brand text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Categories */}
            <nav aria-label="Categories">
              <h3 className="text-foreground text-xs font-bold tracking-widest uppercase">
                Categories
              </h3>
              <ul className="mt-5 space-y-3">
                {categoryLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-brand text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Connect */}
            <div>
              <h3 className="text-foreground text-xs font-bold tracking-widest uppercase">
                Connect With Us
              </h3>
              <div className="mt-5 flex items-center gap-2">
                {socialLinks.map(({ Icon, label, href }) => (
                  <Button
                    key={label}
                    variant="outline"
                    size="icon"
                    aria-label={label}
                    render={<a href={href} />}
                    className="rounded-lg"
                  >
                    <Icon className="size-4" />
                  </Button>
                ))}
              </div>

              <p className="text-muted-foreground mt-5 text-sm">
                Need assistance? Email support:{" "}
                <a
                  href="mailto:support@studiospace.io"
                  className="font-bold text-foreground underline-offset-4 hover:text-brand hover:underline"
                >
                  support@studiospace.io
                </a>
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <Separator className="my-10" />
          <div className="text-muted-foreground flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-xs">© {date} StudioSpace. All rights reserved.</p>
            
             <nav aria-label="privacyLinks">

              <ul className="mt-5 space-y-3">
                {privacyLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-brand text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                    
                  </li>
                ))}
              </ul>
            </nav>
           
          </div>
        </div>
      </div>
    </footer>
  )
}
