import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Scene3DBackground } from "@/components/site/scene-3d-background";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { ScrollToTop } from "@/components/site/scroll-to-top";
import { SmoothScroll } from "@/components/site/smooth-scroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Xai — Intelligence Workspace",
    template: "%s · Xai",
  },
  description:
    "Xai turns raw data into structured intelligence and actionable insight — then automates the work.",
  keywords: [
    "Xai",
    "Intelligence Workspace",
    "AI",
    "data intelligence",
    "insight",
    "automation",
  ],
  authors: [{ name: "Xai" }],
  openGraph: {
    title: "Xai — Intelligence Workspace",
    description:
      "From raw data → structured intelligence → actionable insight → AI automations.",
    siteName: "Xai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xai — Intelligence Workspace",
    description:
      "From raw data → structured intelligence → actionable insight → AI automations.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            <div className="relative flex min-h-screen flex-col bg-background">
              <ScrollProgress />
              <Scene3DBackground />
              <SiteNav />
              <main className="relative z-10 flex-1">{children}</main>
              <SiteFooter />
              <ScrollToTop />
            </div>
          </SmoothScroll>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
