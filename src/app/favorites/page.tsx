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
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Track current active book index
  const activeGenre = activeIndex !== null ? favorites[activeIndex]?.genre || 'default' : 'default';
  const activeBookId = activeIndex !== null ? favorites[activeIndex]?.id : null;

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
  // useEffect(() => {
  //   if (favorites.length === 0) return;

  //   const interval = setInterval(() => {
  //     setActiveIndex((prevIndex) => (prevIndex + 1) % favorites.length);
  //   }, 6000); // 4 seconds per book

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, [favorites.length]);

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
        {console.log("[Page] Active genre:", activeGenre, "Book ID", activeBookId)}

        <main className="flex min-h-screen flex-col items-center justify-center p-6">
        <div 
          className="flex items-center justify-center gap-2 max-w-7xl"
          onMouseLeave={() => setActiveIndex(null)}
        >
            {favorites.map((book, index) => (
            <BookSpine
                key={book.id}
                book={book}
                index={index}
                isActive={index === activeIndex}
                onHover={() => setActiveIndex(index)}
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
  onHover: () => void; 
};

function BookSpine({ book, index, isActive, onHover }: BookSpineProps) {
  // Generate color based on category or use a palette
  const colors = [
    '#6B4423', // dark brown
    // '#9B7653', // tan brown
    // '#8B7355', // dusty brown
    // '#704214', // sepia
    // '#C19A6B', // camel
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
      onMouseEnter={onHover}
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