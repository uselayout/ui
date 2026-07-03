import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · the reskinnable component system`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "react components",
    "design system",
    "shadcn alternative",
    "AI agents",
    "design tokens",
    "reskinnable UI",
    "Base UI",
    "Tailwind v4",
    "token contracted",
    "component library",
    "TypeScript",
    "layout.design",
    "MCP server",
    "theme system",
    "accessible components",
  ],
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    title: `${SITE_NAME} · the reskinnable component system`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} · the reskinnable component system`,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <PrePaintScript />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}

/**
 * Inline script that runs synchronously before first paint, reading
 * localStorage to apply persisted brand/theme/density attributes on <html>.
 * Content is a static string constant: no user-supplied data, no XSS risk.
 */
function PrePaintScript() {
  // Static IIFE that reads localStorage and applies data-theme / data-density
  // before the browser paints, avoiding a flash of unstyled state. Brand is
  // NOT applied globally: it scopes to preview surfaces via BrandScope.
  const html = [
    "(function(){",
    "try{",
    "document.documentElement.removeAttribute('data-brand');",
    "var t=localStorage.getItem('layout-ui-theme');",
    "if(t==='dark')document.documentElement.setAttribute('data-theme','dark');",
    "var d=localStorage.getItem('layout-ui-density');",
    "if(d==='compact')document.documentElement.setAttribute('data-density','compact');",
    "}catch(e){}",
    "})()",
  ].join("");

  return (
    <script
      // Content is a static constant string: no user data, no sanitisation needed.
      // biome-ignore lint/security/noDangerouslySetInnerHtml: static pre-paint script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
