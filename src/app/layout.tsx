import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudioSpace",
  description:
    "Discover and book inspiring creative studios for photography, film, music, and design.",
};

// Applies the saved (or system) theme before first paint to avoid a light-flash.
const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;d&&document.documentElement.classList.add("dark")}catch(e){}})()`

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Navbar />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
