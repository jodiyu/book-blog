import { db } from '@/lib/db';
import { books } from '@/db/schema';
import { NextResponse } from 'next/server';

// Cache the response for 1 hour, revalidate in background
export const revalidate = 3600; // 1 hour in seconds

export async function GET() {
  try {
    const result = await db
      .select({
        id: books.id,
        title: books.title,
        author: books.author,
        cover: books.cover,
        review: books.review,
        quote: books.quote,
      })
      .from(books)
      .orderBy(books.id);
      return NextResponse.json(result);
  } catch (err) {
    console.error("Error fetching books: ", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });

  }
}


// Contact: Deprecated
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { firstName, lastName, email, message } = body;

//     if (!firstName || !lastName || !email || !message) {
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//     }

//     // Insert using Drizzle ORM
//     await db.insert(contacts).values({
//       firstName,
//       lastName,
//       email,
//       message,
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('Error inserting contact:', error);
//     return NextResponse.json({ error: 'Server error' }, { status: 500 });
//   }
// }