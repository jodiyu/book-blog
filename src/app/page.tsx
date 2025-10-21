'use client';

import { useEffect, useState } from 'react';
import { useBooks } from '@/contexts/BooksContext';
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
    // Get books from context (cached globally)
    const { books, loading, error, hasLoadedOnce, markAsLoaded } = useBooks();
    
    const[selectedBook, setSelectedBook] = useState<Book | null>(null);
    const[booksPerRow, setBooksPerRow] = useState(6);
    const[showContent, setShowContent] = useState(false);
    const LOADING_MS = 4500;
    const loadStartRef = useState(() => Date.now())[0];

    // Handle minimum loading time (only on first load ever)
    useEffect(() => {
      console.log("Starting useEffect...", { loading, booksLength: books.length, hasLoadedOnce })
      if (!loading && books.length > 0) {
        // If data has already been loaded in this session, show immediately
        if (hasLoadedOnce) {
          console.log("Data already shown before in this session. No quote shown")
          setShowContent(true);
          return;
        }
        
        // First time loading this session - enforce minimum loading time
        const elapsed = Date.now() - loadStartRef;
        console.log("First load - Elapsed:", elapsed, "ms")
        
        if (elapsed < LOADING_MS) {
          const remaining = LOADING_MS - elapsed;
          console.log("Waiting remaining:", remaining, "ms")
          const timer = setTimeout(() => {
            setShowContent(true);
            markAsLoaded(); // Mark that we've shown the quote
          }, remaining);
          return () => clearTimeout(timer);
        } else {
          console.log("Data took long enough, showing immediately")
          setShowContent(true);
          markAsLoaded(); // Mark that we've shown the quote
        }
      }
    }, [loading, books, loadStartRef, hasLoadedOnce, markAsLoaded]);

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

    // Show error state
    if (error) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6">
          <div className="text-center">
            <p className="text-red-500 dark:text-red-400 mb-4">Failed to load books</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    // Show quote loading screen only on first load ever (not when cached or returning from other pages)
    if (!hasLoadedOnce && (loading || !showContent || books.length === 0)) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6 transition-opacity duration-500 ease-out">
          <RandomQuote />
        </div>
      );
    }

    // If we've loaded data before but it's not ready, show nothing (shouldn't happen with cache)
    if (books.length === 0) {
      return null;
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
    <div className="space-y-6 p-6 overflow-x-hidden animate-fade-in-blur">
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
                <p className="text-xs text-gray-600 dark:text-gray-300 truncate font-serif">{book.author}</p>
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