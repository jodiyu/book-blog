'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Background from '@/components/Background';

type FavoriteBook = {
  id: number;
  title: string;
  author: string;
  cover: string;
  category?: string;
  genre: string;
};

export default function Favorites() {
  const [favorites, setFavorites] = useState<FavoriteBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0); // Track current active book index
  const activeGenre = favorites[activeIndex]?.genre || 'default';

  useEffect(() => {
    // Fetch favorite books
    const fetchFavorites = async () => {
      try {
        const response = await fetch('/api/favorites');
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // Auto rotate through books
  useEffect(() => {
    if (favorites.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % favorites.length);
    }, 6000); // 4 seconds per book

    return () => clearInterval(interval); // Cleanup on unmount
  }, [favorites.length]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-gray-500">Loading favorites...</p>
      </main>
    );
  }

  return (
    <>
        <Background genre={activeGenre}/>
        {console.log("[Page] Active genre:", activeGenre)}

        <main className="flex min-h-screen flex-col items-center justify-center p-6">
        <div className="flex items-center justify-center gap-2 max-w-7xl">
            {favorites.map((book, index) => (
            <BookSpine
                key={book.id}
                book={book}
                index={index}
                isActive={index === activeIndex}
            />
            ))}
        </div>
        </main>
    </>
  );
}

type BookSpineProps = {
  book: FavoriteBook;
  index: number;
  isActive: boolean;
};

function BookSpine({ book, index, isActive }: BookSpineProps) {
  // Generate color based on category or use a palette
  const colors = [
    '#5ba6ed', // blue
    '#ca932a', // mustard yellow
    '#5fac4e', // green
    '#b33139', // red
    '#5a215a', // plum
    '#175f76', // dark blue
    '#e07a5f', // coral
    '#81b29a', // sage
  ];
  
  const spineColor = colors[index % colors.length];

  return (
    <motion.div
      className="relative h-96 cursor-pointer overflow-hidden"
      initial={{ width: '40px' }}
      animate={{ 
        width: isActive ? '280px' : '40px',
        zIndex: isActive ? 10 : 1
      }}
      transition={{ 
        duration: 0.4, 
        ease: [0.4, 0, 0.2, 1] // cubic-bezier for smooth expansion
      }}
      style={{
        backgroundColor: spineColor,
      }}
    >
      {/* Collapsed State: Thin spine with vertical text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: isActive ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <p 
          className="text-white font-serif text-sm tracking-wider whitespace-nowrap"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
          }}
        >
          {book.title}
        </p>
      </motion.div>

      {/* Expanded State: Full book cover */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.3, delay: isActive ? 0.1 : 0 }}
      >
        <Image
          src={book.cover}
          alt={`${book.title} by ${book.author}`}
          fill
          className="object-cover"
          sizes="280px"
        />
        
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Book info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-serif text-lg font-semibold line-clamp-2">
            {book.title}
          </h3>
          <p className="text-sm text-gray-200 mt-1">
            {book.author}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}