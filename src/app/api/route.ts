import { db } from '@/lib/db';
import { books, contacts } from '@/db/schema';
import { NextResponse } from 'next/server';

// get all the books
export async function GET() {
  const allBooks = await db.select().from(books);
  return NextResponse.json(allBooks);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, message } = body;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Insert using Drizzle ORM
    await db.insert(contacts).values({
      firstName,
      lastName,
      email,
      message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error inserting contact:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}