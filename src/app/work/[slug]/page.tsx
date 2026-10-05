import { permanentRedirect } from "next/navigation";

export default async function WorkSlugRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === "digitangels") permanentRedirect("/digitangels");
  permanentRedirect(`/projects/${slug}`);
}
