// Populates database with essay entries

import 'dotenv/config';
import { config } from 'dotenv';

// make sure environment variables are loaded
config({ path: '.env.local' }); 

import { db } from "@/lib/db";
import { essays } from "@/db/schema";

// Debugging: checking DATABASE_URL
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('DATABASE_URL:', process.env.DATABASE_URL?.substring(0, 50) + '...'); // avoid logging entire URL

// Seed data
const seedData = [
  {
    title: "Separation of Art from the Artist",
    slug: "separation-of-art",
    author: "Jodi Yu",
    content: "Something something something",
    createdAt: new Date('2023-01-01'),
    description: "This is the description",
  },
  {
    title: "Another one",
    slug: "another-one",
    author: "Jodi Yu",
    content: "Something something something",
    description: "Another description",
  },
];

async function seedEssays() {
  try {
    console.log('Starting seed process...'); // debugging message
    
    
    for (const essay of seedData) { // for each object in the array
        await db.insert(essays).values({
            title: essay.title,
            author: essay.author,
            slug: essay.slug,
            content: essay.content,
            createdAt: essay.createdAt,
            description: essay.description,
        });
    }
    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seedEssays();
