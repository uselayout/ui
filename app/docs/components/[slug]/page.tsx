import { notFound } from "next/navigation";

import {
  getAllComponentSlugs,
  getComponentDoc,
} from "@/lib/docs/components-meta";
import { SITE_URL } from "@/lib/site";
import { ComponentDocContent } from "./content";

export function generateStaticParams() {
  return getAllComponentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getComponentDoc(slug);
  if (!doc) return {};
  // Root layout's title template appends the site name.
  const pageTitle = doc.title;
  const canonicalUrl = `${SITE_URL}/docs/components/${slug}`;
  return {
    title: pageTitle,
    description: doc.description,
    openGraph: {
      title: pageTitle,
      description: doc.description,
      url: canonicalUrl,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function ComponentDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getComponentDoc(slug);
  if (!doc) notFound();

  return <ComponentDocContent slug={slug} />;
}
