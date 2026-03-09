"use client";

import Link from 'next/link';
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { Toaster } from "react-hot-toast";
import { fetchNotes } from "@/lib/api/clientApi";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import css from "./NotesPage.module.css"; 

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 300);

  const { data } = useQuery({
    queryKey: ["notes", debouncedSearch, page, tag],
    queryFn: () => fetchNotes(debouncedSearch, page, tag),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;
    
  return (
    <div className={css.app}>
      <Toaster />    
      <header className={css.toolbar}>
        <SearchBox 
          value={search} 
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); 
          }} 
        />
        
        <Link href="/notes/action/create" className={css.button} >
          Create note +
        </Link>

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}        
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={page - 1}
          />
        )}
      </header>

      <main>
        {data && data.notes.length > 0 ? (
          <NoteList notes={data.notes} />
        ) : (
          <p>No notes found for tag: {tag || 'all'}</p>
        )}
      </main>
    </div>
  );
}