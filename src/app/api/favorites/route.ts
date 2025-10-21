import { db } from '@/lib/db';
import { books } from '@/db/schema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

// Cache the response for 1 hour
export const revalidate = 3600;

export async function GET() {
  try {
    // For now, let's return all books - you can modify with a filter when you add isFavorite field
    const favoriteBooks = await db
      .select({
        id: books.id,
        title: books.title,
        author: books.author,
        cover: books.cover,
        review: books.review,
        quote: books.quote,
      })
      .from(books)
      .where(eq(books.isFavorite, true)) // Filter by if book is favorite
      .orderBy(books.id);

    return NextResponse.json(favoriteBooks);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json(
      { error: 'Failed to fetch favorites' },
      { status: 500 }
    );
  }
}