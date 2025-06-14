// populates the database with all the books 

import 'dotenv/config';
import { config } from 'dotenv';

// make sure environment variables are loaded
config({ path: '.env.local' }); 

import { db } from "@/lib/db";
import { books } from "@/db/schema";
import { uploadImageToS3 } from "@/lib/s3";

// debugging: checking DATABASE_URL
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('DATABASE_URL:', process.env.DATABASE_URL?.substring(0, 50) + '...'); // avoid logging entire URL

// temp seed data for testing
const seedData = [
  {
    title: "Notes from Underground",
    author: "Fyodor Dostoevsky",
    quote: "I am a sick man... I am a spiteful man.",
    review: "A dark introspective novella...",
    coverPath: "./src/assets/Notes_From_Underground.jpg"
  },
  {
    title: "Normal People",
    author: "Sally Rooney",
    quote: "Life offers up these moments of joy...",
    review: "A tender exploration of love and class...",
    coverPath: "./src/assets/Normal_People.jpg"
  },
  {
    title: "Tress of the Emerald Sea",
    author: "Brandon Sanderson",
    quote: "Some secrets have a voice...",
    review: "A whimsical fantasy adventure...",
    coverPath: "./src/assets/Tress.jpg"
  },
];

async function seedBooks() {
  try {
    console.log('Starting seed process...'); // debugging message
    
    for (const book of seedData) { // for each object in the array
      const exists = await db.query.books.findFirst({ // returns true if the book already exists in the database
        where: (b, { eq }) => eq(b.title, book.title),
      });

      if (!exists) { // if it doesn't exist, insert the book in the database
        const coverUrl = await uploadImageToS3(book.coverPath); // upload image to S3 and get the URL to insert into the database
        await db.insert(books).values({
          title: book.title,
          author: book.author,
          quote: book.quote,
          review: book.review,
          cover: coverUrl,
        });
        console.log(`Inserted: ${book.title}`);
      } else {
        console.log(`Skipped: ${book.title}`);
      }
    }
    
    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seedBooks();
