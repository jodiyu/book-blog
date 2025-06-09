'use client';

import { useEffect, useState } from 'react';
import { getBooks } from '@/lib/api';
import BookModal from '@/components/BookModal';

type Book = {
    id: number;
    title: string;
    author: string;
    quote?: string;
    review?: string;
    cover: string;
};

export default function Library() {
    const[books, setBooks] = useState<Book[]>([]); // array of book objects
    const[selectedBook, setSelectedBook] = useState<Book | null>(null); // currently selected book for modal

    useEffect(() => {
        getBooks().then(setBooks).catch(console.error);
    }, []);

    return (
        <div className="p-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {books.map((book) => (
                <img
                key={book.id}
                src={book.cover}
                alt={book.title}
                className="cursor-pointer rounded shadow hover:scale-105 transition"
                onClick={() => setSelectedBook(book)}
                />
            ))}
            {selectedBook && (
                <BookModal 
                    book={selectedBook} 
                    onClose={() => setSelectedBook(null)} 
                />
            )}
        </div>
    ); 
}