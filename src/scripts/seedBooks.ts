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
  {
    title: "Love Story",
    author: "Erich Segal",
    quote: "Love means never having to say you're sorry...",
    review: "A devastating romance book...",
    coverPath: "./src/assets/Love_Story.jpg"
  },
  {
    title: "Hary Potter and the Philosopher's Stone",
    author: "JK Rowling",
    quote: "You're a wizard, Harry...",
    review: "A magical wizard story..",
    coverPath: "./src/assets/Harry_Potter.jpg"
  },
  {
    title: "Green Eggs and Ham",
    author: "Dr Suess",
    quote: "I do not want green eggs and ham..",
    review: "Witty children's book...",
    coverPath: "./src/assets/Green_Eggs.jpg"
  },
  {
    title: "Everything I Never Told You",
    author: "Celeste Ng",
    quote: "Blah blah blah...",
    review: "Devastating family drama...",
    coverPath: "./src/assets/Everything.jpg"
  },
  {
    title: "Existentialism is a Humanism",
    author: "Jean-Paul Sartre",
    quote: "Existence precedes essence...",
    review: "A defense against existentialism...",
    coverPath: "./src/assets/Existentialism.jpg"
  },
  {
    title: "A Very Long Book",
    author: "Someone",
    quote: "Blah blah blah...",
    review: "I struggle to describe Marianne and Connell, and I realize that the author has beautifully crafted a story that doesn’t fit into the rigidity of boxes and words. I question how love is defined and shown in this story: Is their love inextricably bound to the characters’ internal pain: Marianne’s self destructive desire to let go of her bodily autonomy and Connell’s desperation for conformity and self hatred from straying away from it? What is their love without their unequal power dynamic? To me, the last words of the book hang off the page, dangling like an unfinished story, like a person taking a breath mid-sentence. Looking back, I think that if the author were to “finish the story,” it would leave me more dissatisfied. Because part of the story is its incompleteness and its crazed and non-formulaic structure; jumping through time like there exists no linearity and cohesion. It is reminiscent of memories: some stick and permeate in your consciousness, and you relive them like they are unending. Other periods of your life evade your mind without more than a whisper. It would be dissatisfying to give these characters - so flawed and so complex - a banal ending, bound to the words on the page that define their entire existence. A black and white ending to a vibrant story. The book ends like this: Marianne says, “I’ll always be here. You know that,” and then we flip the page and we realize the book has ended in utter incompleteness, leaving us dumbfounded, grasping for some sense of their relationship and their future. Do they fade from each others’ lives like old memories? Can they truly love each other if they don’t love themselves? We ask these questions as readers and we acknowledge that they will be left unanswered.",
    coverPath: "./src/assets/Existentialism.jpg"
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
