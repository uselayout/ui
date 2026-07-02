import { notFound } from "next/navigation";

import {
  getAllComponentSlugs,
  getComponentDoc,
} from "@/lib/docs/components-meta";
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
  return {
    title: `${doc.title} · Layout UI`,
    description: doc.description,
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
