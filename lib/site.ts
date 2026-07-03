/**
 * Single source of truth for site-wide constants.
 * Set NEXT_PUBLIC_SITE_URL in your environment to override the default.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ui.staging.layout.design";

export const SITE_NAME = "Layout UI";

export const SITE_DESCRIPTION =
  "Token-contracted, reskinnable React component system built for AI coding agents. 54 components on Base UI primitives, every component ships machine-readable usage rules. Themes compile from real company design systems.";
