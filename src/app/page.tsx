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
    const[books, setBooks] = useState<Book[]>([]);
    const[selectedBook, setSelectedBook] = useState<Book | null>(null);

    useEffect(() => {
        getBooks().then(setBooks).catch(console.error);
    }, []);

    return (
        <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {books.map((book) => (
                <div key={book.id} className="flex flex-col">
                    <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-48 sm:h-56 md:h-64 object-cover cursor-pointer rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
                        onClick={() => setSelectedBook(book)}
                    />
                    <div className="mt-2 text-center">
                        <h3 className="text-sm font-medium truncate">{book.title}</h3>
                        <p className="text-xs text-gray-600 truncate">{book.author}</p>
                    </div>
                </div>
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