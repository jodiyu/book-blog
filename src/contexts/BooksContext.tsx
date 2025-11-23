'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getBooks } from '@/lib/api';

type Book = {
    id: number;
    title: string;
    author: string;
    quote?: string;
    review?: string;
    cover: string;
    isFavorite: boolean;
    genre: string;
};

type BooksContextType = {
    books: Book[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
    hasLoadedOnce: boolean; // Track if books have been loaded at least once this session
    markAsLoaded: () => void; // Mark that initial load is complete (after showing quote)
};

const BooksContext = createContext<BooksContextType | undefined>(undefined);
// Client side cache
const CACHE_KEY = 'books_cache';
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

type CachedData = {
    books: Book[];
    timestamp: number;
};

export function BooksProvider({ children }: { children: ReactNode }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

    const fetchBooks = async (skipCache = false) => {
        const fetchStart = performance.now();
        console.log('[BooksContext] Starting fetch...');

        // Check cache first
        if (!skipCache) {
            try {
                const cachedData = localStorage.getItem(CACHE_KEY);
                if (cachedData) {
                    const parsed: CachedData = JSON.parse(cachedData);
                    const age = Date.now() - parsed.timestamp;

                    if (age < CACHE_DURATION) {
                        console.log('[BooksContext] Using cached data, age:', (age / 1000).toFixed(1), 'seconds');
                        setBooks(parsed.books);
                        console.log("Here is books", parsed.books)
                        setLoading(false);
                        // DON'T set hasLoadedOnce here! Let the component decide when to set it
                        // This way quote still shows on first page load even with cached data
                        return;
                    } else {
                        console.log('[BooksContext] Cache expired, fetching fresh data');
                    }
                }
            } catch (err) {
                console.warn('[BooksContext] Cache read failed:', err);
            }
        }

        // Fetch from API
        try {
            const data = await getBooks();
            const fetchEnd = performance.now();
            const duration = fetchEnd - fetchStart;

            console.log('[BooksContext] Fetched from API in', duration.toFixed(2), 'ms');
            console.log('[BooksContext] Books count:', data.length);

            setBooks(data);
            console.log("Here is books", books)
            setHasLoadedOnce(true); // Mark as loaded when fetched from API

            // Save to cache
            const cacheData: CachedData = {
                books: data,
                timestamp: Date.now(),
            };
            localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        } catch (err) {
            console.error('[BooksContext] Error in fetch:', err);
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch on mount
    useEffect(() => {
        fetchBooks();
    }, []);

    const refetch = async () => {
        setLoading(true);
        setError(null);
        await fetchBooks(true); // Skip cache when manually refetching
    };

    const markAsLoaded = () => {
        setHasLoadedOnce(true);
        console.log('[BooksContext] Marked as loaded - quote has been shown');
    };

    return (
        <BooksContext.Provider value={{ books, loading, error, refetch, hasLoadedOnce, markAsLoaded }}>
            {children}
        </BooksContext.Provider>
    );
}

export function useBooks() {
    const context = useContext(BooksContext);
    if (context === undefined) {
        throw new Error('useBooks must be used within a BooksProvider');
    }
    return context;
}
