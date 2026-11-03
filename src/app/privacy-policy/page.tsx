
import Link from "next/link";
import {
  ShieldCheck,
  LockKeyhole,
  UserRound,
  Database,
  Cookie,
  Share2,
  FileText,
  Mail,
  ChevronRight,
  CalendarDays,
  Globe,
  Shield,
} from "lucide-react";

const date = new Date().toLocaleDateString("en-US",{
  month: "long",
  day: "2-digit",
  year: "numeric",
})



const sections = [
  {
    id: "information",
    title: "1. Information We Collect",
    icon: Database,
    content: (
      <>
        <p>
          We may collect different types of information when you use
          StudioSpace to explore studios, create an account, or book a
          creative space.
        </p>

        <h3>Personal Information</h3>
        <ul>
          <li>Full name and email address.</li>
          <li>Profile and account information.</li>
          <li>Authentication and account details.</li>
          <li>Contact information you choose to provide.</li>
        </ul>

        <h3>Booking Information</h3>
        <ul>
          <li>Selected studio information.</li>
          <li>Booking dates and reservation details.</li>
          <li>Booking status and related information.</li>
        </ul>

        <h3>Studio Listing Information</h3>
        <ul>
          <li>Studio name, description, and location.</li>
          <li>Studio images and rental pricing.</li>
          <li>Available facilities and equipment.</li>
          <li>Studio availability and listing details.</li>
        </ul>

        <h3>Technical Information</h3>
        <ul>
          <li>Browser type and device information.</li>
          <li>IP address and operating system.</li>
          <li>Website usage and technical data.</li>
        </ul>
      </>
    ),
  },
  {
    id: "usage",
    title: "2. How We Use Your Information",
    icon: UserRound,
    content: (
      <>
        <p>We use collected information to:</p>
        <ul>
          <li>Create and manage user accounts.</li>
          <li>Provide secure authentication.</li>
          <li>Help users discover creative studios.</li>
          <li>Process and manage studio bookings.</li>
          <li>Allow hosts to manage studio listings.</li>
          <li>Send important booking updates.</li>
          <li>Improve website functionality and user experience.</li>
          <li>Respond to support requests.</li>
          <li>Prevent fraudulent activities and protect our platform.</li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    title: "3. Information Sharing",
    icon: Share2,
    content: (
      <>
        <p>
          StudioSpace respects your privacy. We do not sell your
          personal information to third parties.
        </p>
        <h3>Studio Hosts and Creators</h3>
        <p>
          Relevant booking information may be shared between users
          involved in a reservation to facilitate the booking process.
        </p>

        <h3>Service Providers</h3>
        <p>
          We may work with trusted providers for hosting,
          authentication, database management, and technical services.
        </p>

        <h3>Legal Requirements</h3>
        <p>
          We may disclose information when required by applicable laws
          or legal processes.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "4. Cookies and Tracking Technologies",
    icon: Cookie,
    content: (
      <>
        <p>
          StudioSpace may use cookies and similar technologies to
          support website functionality and improve your experience.
        </p>
        <ul>
          <li>Maintain user sessions.</li>
          <li>Support authentication functionality.</li>
          <li>Remember certain preferences.</li>
          <li>Understand website usage.</li>
          <li>Improve website performance.</li>
        </ul>
        <p>
          You can manage or disable cookies through your browser
          settings. Disabling certain cookies may affect some
          website features.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "5. Data Security",
    icon: LockKeyhole,
    content: (
      <p>
        We take reasonable technical and organizational measures to
        protect personal information against unauthorized access,
        alteration, disclosure, or destruction. However, no
        internet-based platform or electronic storage system can
        guarantee complete security.
      </p>
    ),
  },
  {
    id: "retention",
    title: "6. Data Retention",
    icon: Database,
    content: (
      <p>
        We retain personal information only for as long as reasonably
        necessary to provide our services, maintain accounts, manage
        bookings, resolve disputes, and comply with applicable legal
        obligations. When information is no longer required, we may
        delete or anonymize it.
      </p>
    ),
  },
  {
    id: "rights",
    title: "7. Your Privacy Rights",
    icon: ShieldCheck,
    content: (
      <>
        <p>
          Depending on your location and applicable privacy laws, you
          may have the right to:
        </p>
        <ul>
          <li>Request access to your personal information.</li>
          <li>Request correction of inaccurate information.</li>
          <li>Request deletion of certain personal information.</li>
          <li>Withdraw consent where applicable.</li>
          <li>Unsubscribe from marketing emails.</li>
          <li>Ask questions about how your information is used.</li>
        </ul>
        <p>
          To exercise these rights, please contact us using the
          information provided below.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    title: "8. Third-Party Services",
    icon: Globe,
    content: (
      <p>
        StudioSpace may use third-party services for authentication,
        hosting, databases, email communication, and other technical
        purposes. These providers may process information according
        to their own privacy policies. We encourage users to review
        the privacy policies of services they interact with.
      </p>
    ),
  },
  {
    id: "children",
    title: "9. Children's Privacy",
    icon: UserRound,
    content: (
      <p>
        StudioSpace is not intended for children under the age of 13.
        We do not knowingly collect personal information from
        children under 13. If we become aware of such collection,
        we will take reasonable steps to delete that information.
      </p>
    ),
  },
  {
    id: "transfers",
    title: "10. International Data Transfers",
    icon: Globe,
    content: (
      <p>
        Your information may be processed or stored in countries
        other than your country of residence depending on the
        location of our hosting and service providers. Where
        required, we take reasonable steps to ensure appropriate
        protection during international transfers.
      </p>
    ),
  },
  {
    id: "changes",
    title: "11. Changes to This Privacy Policy",
    icon: FileText,
    content: (
      <p>
        We may update this Privacy Policy from time to time to reflect
        changes in our services, technology, or applicable legal
        requirements. Updates will be published on this page with a
        revised Last Updated date. We encourage users to review this
        page periodically.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ShieldCheck size={34} />
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Your Privacy Matters
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Privacy Policy
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              Your trust means everything to us. Learn how StudioSpace
              collects, uses, and protects your personal information
              while helping you discover creative spaces.
            </p>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <CalendarDays size={16} />
              Last Updated: {date}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 lg:grid-cols-[260px_1fr]">
        {/* Table of Contents */}
        <aside className="h-fit lg:sticky lg:top-24">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="mb-5 text-sm font-bold uppercase tracking-wider">
              On This Page
            </h2>

            <nav className="space-y-1">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                >
                  <ChevronRight size={15} />
                  {section.title}
                </a>
              ))}

              <a
                href="#contact"
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
              >
                <ChevronRight size={15} />
                12. Contact Us
              </a>
            </nav>
          </div>
        </aside>

        {/* Policy Content */}
        <div className="min-w-0 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <p className="leading-8 text-muted-foreground">
              Welcome to StudioSpace! We value your privacy and are
              committed to protecting your personal information.
              This Privacy Policy explains how we collect, use, store,
              and protect your information when you visit our
              platform, create an account, explore studios, book
              creative spaces, or list your own studio.
            </p>
          </div>

          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 md:p-8"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={22} />
                  </div>

                  <h2 className="text-xl font-bold md:text-2xl">
                    {section.title}
                  </h2>
                </div>

                <div className="policy-content space-y-4 text-sm leading-8 text-muted-foreground md:text-base">
                  {section.content}
                </div>
              </article>
            );
          })}

          {/* Contact Section */}
          <article
            id="contact"
            className="scroll-mt-28 rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Mail size={22} />
              </div>

              <h2 className="text-xl font-bold md:text-2xl">
                12. Contact Us
              </h2>
            </div>

            <p className="mb-6 text-sm leading-8 text-muted-foreground md:text-base">
              If you have any questions, concerns, or requests
              regarding this Privacy Policy or your personal
              information, please contact us.
            </p>

            <div className="space-y-3">
              <p className="text-sm font-medium">
                Website:{" "}
                <a
                  href="https://studiospace-frontend-three.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  StudioSpace
                </a>
              </p>

              <p className="text-sm font-medium">
                Email:{" "}
                <span className="text-primary">
                  Replace with your support email
                </span>
              </p>

              <p className="text-sm font-medium">
                Platform: StudioSpace
              </p>
            </div>
          </article>

          {/* Footer Note */}
          <div className="py-8 text-center">
            <Shield size={28} className="mx-auto mb-3 text-primary" />

            <p className="text-sm font-medium text-muted-foreground">
              Your privacy. Your trust. Our responsibility.
            </p>

            <p className="mt-2 text-xs text-muted-foreground">
              © {new Date().getFullYear()} StudioSpace. All Rights Reserved.
            </p>

            <Link
              href="/"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Back to Home
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
