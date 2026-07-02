import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Layout UI · the reskinnable component system",
  description:
    "Token-contracted components for the AI agent era. One base system, any brand. From layout.design",
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
  // Static IIFE that reads localStorage and applies data-brand / data-theme /
  // data-density before the browser paints, avoiding a flash of unstyled state.
  const html = [
    "(function(){",
    "try{",
    "var b=localStorage.getItem('layout-ui-brand');",
    "if(b&&b!=='default')document.documentElement.setAttribute('data-brand',b);",
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
