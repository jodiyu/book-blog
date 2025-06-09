import { db } from '@/lib/db';
import { books } from '@/db/schema';
import { NextResponse } from 'next/server';

// get all the books
export async function GET() {
  const allBooks = await db.select().from(books);
  return NextResponse.json(allBooks);
}

// add a new book
// export async function POST(req: Request) {
//   const body = await req.json();
//   const { title, author, quote, review, cover } = body;

//   await db.insert(books).values({
//     title,
//     author,
//     quote,
//     review,
//     cover,
//   });

//   return NextResponse.json({ success: true });
// }
