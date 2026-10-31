import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  Heart,
  Mail,
  ShieldCheck,
} from "lucide-react"

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
  { label: "Photo Studios", href: "/studios?category=photo" },
  { label: "Cinema & Sound Stages", href: "/studios?category=cinema" },
  { label: "Podcast Lounges", href: "/studios?category=podcast" },
  { label: "Music & Dolby Suites", href: "/studios?category=music" },
  { label: "Art & Ceramic Workshops", href: "/studios?category=art" },
]



const date = new Date().getFullYear()

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1.1 2h6.5l4.4 5.9L18.9 2Zm-1.1 18.1h1.7L7.5 3.8H5.7l12.1 16.3Z" />
    </svg>
  )
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M23 12s0-3.8-.5-5.5a2.8 2.8 0 0 0-2-2C18.9 4 12 4 12 4s-6.9 0-8.5.5a2.8 2.8 0 0 0-2 2C1 8.2 1 12 1 12s0 3.8.5 5.5a2.8 2.8 0 0 0 2 2c1.6.5 8.5.5 8.5.5s6.9 0 8.5-.5a2.8 2.8 0 0 0 2-2c.5-1.7.5-5.5.5-5.5ZM9.8 15.5v-7l6.2 3.5-6.2 3.5Z" />
    </svg>
  )
}

const socialLinks = [
  { Icon: YoutubeIcon, label: "YouTube", href: "https://youtube.com" },
  { Icon: InstagramIcon, label: "Instagram", href: "https://instagram.com" },
  { Icon: XIcon, label: "X (Twitter)", href: "https://x.com" },
]

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="grid size-8 place-items-center rounded-lg bg-orange-500 text-white">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      </span>
      <span className="text-lg font-bold tracking-tight text-foreground">
        Studio<span className="text-orange-500">Space</span>
      </span>
    </Link>
  )
}

function Newsletter() {
  return (
    <form className="mt-8 flex max-w-xs items-center gap-2">
      <label htmlFor="footer-email" className="sr-only">
        Creator email
      </label>
      <div className="relative flex-1">
        <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          id="footer-email"
          type="email"
          name="email"
          required
          placeholder="Enter creator email..."
          className="h-10 w-full rounded-full border border-input bg-background pr-3 pl-9 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>
      <button
        type="submit"
        aria-label="Subscribe to newsletter"
        className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full bg-orange-500 text-white transition-colors hover:bg-orange-600"
      >
        <ArrowRight className="size-4" />
      </button>
    </form>
  )
}

export function Footer() {
  return (
    <footer>
      {/* Trust badge strip */}
      <div className="border-y border-border bg-orange-50/50 dark:bg-white/5 dark:text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6 sm:gap-4">
          {trustBadges.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-center gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-orange-100 text-orange-500">
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
      <div className="bg-background py-14 text-foreground dark:bg-ink dark:text-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.2fr_1.2fr]">
            {/* Brand + newsletter */}
            <div>
              <Logo />
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                StudioSpace is the premier peer-to-peer workspace sharing
                marketplace connecting filmmakers, photographers, musicians,
                and creators with world-class production facilities.
              </p>

              <p className="mt-7 text-xs font-bold tracking-widest text-foreground uppercase">
                Join Our Creator Newsletter
              </p>
              <Newsletter />
            </div>

            {/* Explore */}
            <nav aria-label="Explore">
              <h3 className="text-xs font-bold tracking-widest text-foreground uppercase">
                Explore
              </h3>
              <ul className="mt-5 space-y-3">
                {exploreLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-orange-500"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Categories */}
            <nav aria-label="Categories">
              <h3 className="text-xs font-bold tracking-widest text-foreground uppercase">
                Categories
              </h3>
              <ul className="mt-5 space-y-3">
                {categoryLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-orange-500"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Connect */}
            <div>
              <h3 className="text-xs font-bold tracking-widest text-foreground uppercase">
                Connect With Us
              </h3>
              <div className="mt-5 flex items-center gap-2">
                {socialLinks.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="grid size-9 place-items-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-muted hover:text-orange-500 dark:border-white/15 dark:bg-transparent"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>

              <p className="mt-5 text-sm text-muted-foreground">
                Need assistance? Email support:{" "}
                <a
                  href="mailto:support@studiospace.io"
                  className="font-bold text-foreground underline-offset-4 hover:text-orange-500 hover:underline"
                >
                  support@studiospace.io
                </a>
              </p>
            </div>
          </div>

          <div className="text-xs font-bold tracking-widest text-foreground my-10 border-t border-border ">
            <div className="flex justify-between items-center mt-8">
              <h3>© {date} StudioSpace. All rights reserved.</h3>
              <Link href="/" className="flex justify-center items-center gap-10">
                <p>Privacy Policy</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
