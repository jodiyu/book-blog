'use client';

import { useEffect, useState } from 'react';
import { getBooks } from '@/lib/api';
import BookModal from '@/components/BookModal';
import Marquee from '@/components/ui/marquee';
import CaseStudyCard from '@/components/ui/case-study-card';

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

    useEffect(() => {
        getBooks()
          .then((data) => {
            setBooks(data); // Set books
            setLoading(false);
          })
          .catch((err) => {
            console.error("Error fetching books:", err);
            setLoading(false);
          }); 
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

      if (loading) { // Skeleton loaders
        return (
        <div className="p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-8">
          {Array.from({ length: 21 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-600 h-60 w-full rounded-md" />
            </div>
          ))}
        </div>
      );
    }

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