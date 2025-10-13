'use client';

import { useEffect, useState } from 'react';
import { getBooks } from '@/lib/api';
import BookModal from '@/components/BookModal';
import Marquee from '@/components/ui/marquee';
import CaseStudyCard from '@/components/ui/case-study-card';
import RandomQuote from '@/components/ui/random-quote';

type Book = {
    id: number;
    title: string;
    author: string;
    quote?: string;
    review?: string;
    cover: string;
};

// Helper function: Takes in the array of books and the chunk size determined by screen dimensions and returns an array of arrays (chunks) of books
function chunkBooks<Book>(array: Book[], chunkSize:number): Book[][] {
    const result: Book[][] = []; 
    const numRows = Math.floor(array.length/chunkSize); // Number of rows with equal chunk sizes
    const remainder = array.length - numRows * chunkSize; // Leftover books in the last row
    for (let i = 0; i < numRows * chunkSize; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }

    let j = 0; // index for result arr
    for (let i = numRows * chunkSize; i < numRows * chunkSize + remainder; i++) {
      result[j].push(array[i]);
      j++;
      if (j == result.length) {
        j = 0; // reset index
      } 
    }

    return result;
}

export default function Library() {
    const[books, setBooks] = useState<Book[]>([]);
    const[selectedBook, setSelectedBook] = useState<Book | null>(null);
    const[booksPerRow, setBooksPerRow] = useState(6);
    const[loading, setLoading] = useState(true);
    const LOADING_MS = 3500; 

    useEffect(() => {
      console.time("API Call Books");
      const start = Date.now();
      let timeoutId: number | null = null;
      let isCancelled = false;

      getBooks() // Client side fetching of books because of useEffect() (CSR - client side rendering)
        .then((data) => {
          if (isCancelled) return;
          console.timeEnd("API Call Books");
          setBooks(data); // Set books
          const elapsed = Date.now() - start;
          console.log("TIME ELAPSED:", elapsed);
          
          if (elapsed < LOADING_MS) {
            const remaining = LOADING_MS - elapsed;
            console.log("ELONGATED TIME:", remaining);
            timeoutId = window.setTimeout(() => {
              if (!isCancelled) setLoading(false);
            }, remaining);
          } else {
            // If already took longer than minimum time, clear loading immediately
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error("Error fetching books:", err);
          if (!isCancelled) {
            // Also respect minimum loading time on errors for consistent UX
            const elapsed = Date.now() - start;
            if (elapsed < LOADING_MS) {
              const remaining = LOADING_MS - elapsed;
              timeoutId = window.setTimeout(() => {
                if (!isCancelled) setLoading(false);
              }, remaining);
            } else {
              setLoading(false);
            }
          }
        });

      return () => {
        isCancelled = true;
        if (timeoutId) window.clearTimeout(timeoutId);
      };
    }, []);

    useEffect(() => {
        const updateBooksPerRow = () => {
            const width = window.innerWidth; // Get the current screen width
            if (width > 1536) setBooksPerRow(5);
            else if (width > 1280) setBooksPerRow(4);
            else if (width > 1024) setBooksPerRow(3);
            else if (width > 640) setBooksPerRow(2);
            else setBooksPerRow(2);
        };

        updateBooksPerRow(); // Initial call for initial screen size
        window.addEventListener('resize', updateBooksPerRow); // Update books per row on screen resize
        return () => window.removeEventListener("resize", updateBooksPerRow);
    }, []);
    const chunkedBooks = chunkBooks(books, booksPerRow); // Get the array of arrays of book chunks

    if (loading) { // Show rotating quotes while books load
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6">
          <RandomQuote />
        </div>
      );
    }

    //   if (loading) { // Skeleton loaders
    //     return (
    //     <div className="p-4 pt-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-8">
    //       {Array.from({ length: 21 }).map((_, i) => (
    //         <div key={i} className="animate-pulse">
    //           <div className="bg-gray-200 dark:bg-gray-800 h-60 w-full rounded-md" />
    //         </div>
    //       ))}
    //     </div>
    //   );
    // }

    return (
    <div className="space-y-6 p-6 overflow-x-hidden">
      {chunkedBooks.map((row, i) => (
        <Marquee
          key={i}
          reverse={i % 2 === 0} // Alternating directions for each row
          pauseOnHover={true}
          applyMask={false}
          pauseOnModal={!!selectedBook}
          speed="100s"
        >
          {row.map((book) => (
            <div key={book.id} className="flex flex-col px-3 items-center">
              <CaseStudyCard
                image={book.cover}
                onClick={() => setSelectedBook(book)}
                />
              <div className="mt-2 text-center">
                <h3 className="text-sm font-medium break-normal max-w-[200px] mx-auto">{book.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 truncate">{book.author}</p>
              </div>
            </div>
          ))}
        </Marquee>
      ))}
      {selectedBook && (
        <BookModal key={selectedBook.id} book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}