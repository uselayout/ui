"use client";

import * as React from "react";

/**
 * Shared brand selection for the docs site. The brand reskins component
 * PREVIEWS only (scoped [data-brand] wrappers), never the docs chrome,
 * so the site stays legible while kits are compared.
 */

const STORAGE_KEY = "layout-ui-brand";
const EVENT = "layout-ui-brand-change";

export function getBrand(): string {
  if (typeof window === "undefined") return "default";
  return localStorage.getItem(STORAGE_KEY) ?? "default";
}

export function setBrand(brand: string): void {
  localStorage.setItem(STORAGE_KEY, brand);
  // Legacy cleanup: earlier versions set the attribute globally.
  document.documentElement.removeAttribute("data-brand");
  window.dispatchEvent(new CustomEvent(EVENT));
}

function subscribe(callback: () => void): () => void {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function useBrand(): string {
  return React.useSyncExternalStore(subscribe, getBrand, () => "default");
}
