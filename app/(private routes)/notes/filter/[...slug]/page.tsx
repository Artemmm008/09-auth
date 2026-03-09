import { Metadata } from "next"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/serverApi";
import NotesClient from "./Notes.client";

interface Props {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] || 'all';

  return {
    title: `Notes: ${tag.toUpperCase()}`,
    description: `All notes filtered by ${tag} category.`,
    openGraph: {
      title: `Notes: ${tag.toUpperCase()}`,
      description: `All notes filtered by ${tag} category.`,
      url: `https://notehub.com/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `All notes filtered by ${tag} category`,
        },
      ],
      type: 'article',
    },
  }
}

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params;
  const queryClient = new QueryClient();

  const tag = slug?.[0] === 'all' ? undefined : slug?.[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => fetchNotes("", 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag}/>
    </HydrationBoundary>
  );
}