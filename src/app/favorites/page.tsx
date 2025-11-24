'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Background from '@/components/Background';
import { useBooks } from '@/contexts/BooksContext';

type FavoriteBook = {
  id: number;
  title: string;
  author: string;
  cover: string;
  genre: string;
  isFavorite: boolean;
};

export default function Favorites() {
  const { books, loading, error} = useBooks() // Use book context
  const favorites = books.filter(book => book.isFavorite);

  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Track current active book index
  const activeGenre = activeIndex !== null ? favorites[activeIndex]?.genre || 'default' : 'default';
  const activeBookId = activeIndex !== null ? favorites[activeIndex]?.id : null;


  if (loading) {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-12 h-12 border-4 border-gray-700 border-t-gray-400 rounded-full animate-spin" />
    </main>
  );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-red-500">Error loading favorites</p>
      </main>
    );
  }

  if (favorites.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-gray-500 font-serif">No favorites yet. Mark some books as favorites!</p>
      </main>
    );
  }


  return (
    <>
        <Background genre={activeGenre} key={activeBookId}/>
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
  // Vintage book spine color palette with varied tones
  const spineColors = [
    { base: '#8B4513', dark: '#6B3410', light: '#A0522D' }, // saddle brown
    { base: '#654321', dark: '#4A2F1A', light: '#7D5B2E' }, // dark brown
    { base: '#8B7355', dark: '#6B5335', light: '#A08965' }, // dusty brown
    { base: '#704214', dark: '#503010', light: '#8B5A1E' }, // sepia
    { base: '#A0522D', dark: '#7D3F1F', light: '#BC6B3D' }, // sienna
    { base: '#9B7653', dark: '#7B5633', light: '#B58663' }, // tan
    { base: '#6F4E37', dark: '#4F3627', light: '#8B6347' }, // coffee
    { base: '#5C4033', dark: '#3C2823', light: '#7C5843' }, // chestnut
  ];
  
  const colorSet = spineColors[index % spineColors.length];

  return (
    <motion.div
      className="relative h-96 cursor-pointer overflow-hidden shadow-lg"
      initial={{ width: '40px' }}
      animate={{ 
        width: isActive ? '280px' : '40px',
        zIndex: isActive ? 10 : 1
      }}
      transition={{ 
        duration: 0.4, 
        ease: [0.4, 0, 0.2, 1]
      }}
      style={{
        background: `linear-gradient(to right, 
          ${colorSet.dark} 0%, 
          ${colorSet.base} 15%, 
          ${colorSet.base} 85%, 
          ${colorSet.dark} 100%
        )`,
        borderLeft: `1px solid ${colorSet.dark}`,
        borderRight: `1px solid ${colorSet.dark}`,
      }}
      onMouseEnter={onHover}
    >
      {/* Leather texture overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0,0,0,0.1) 2px,
              rgba(0,0,0,0.1) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(0,0,0,0.05) 2px,
              rgba(0,0,0,0.05) 4px
            )
          `,
        }}
      />

      {/* Spine ridge highlights */}
      <div 
        className="absolute top-0 bottom-0 left-[2px] w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"
      />
      <div 
        className="absolute top-0 bottom-0 right-[2px] w-[1px] bg-gradient-to-b from-transparent via-black/30 to-transparent"
      />

      {/* Collapsed State: Thin spine with vertical text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: isActive ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Decorative top element */}
        <div className="absolute top-4 left-0 right-0 flex justify-center">
          <div 
            className="w-6 h-6 rounded-full border border-yellow-700/40"
            style={{
              background: `radial-gradient(circle, ${colorSet.light}, ${colorSet.base})`,
            }}
          />
        </div>

        {/* Book title */}
        <p 
          className="text-amber-100 font-serif text-sm tracking-wider whitespace-nowrap px-1"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            textShadow: '0 1px 2px rgba(0,0,0,0.8)',
          }}
        >
          {book.title}
        </p>

        {/* Decorative bottom element */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <div 
            className="w-6 h-6 rounded-full border border-yellow-700/40"
            style={{
              background: `radial-gradient(circle, ${colorSet.light}, ${colorSet.base})`,
            }}
          />
        </div>

        {/* Spine wear marks */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/20 to-transparent" />
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