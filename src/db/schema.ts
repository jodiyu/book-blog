import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';
// import { relations } from 'drizzle-orm';

// Mapping out the database schema: data and cols

// Reviews page
export const books = pgTable('books', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  quote: text('quote'),
  review: text('review'),
  cover: text('cover').notNull(), // URL to image loaded from AWS
  isFavorite: boolean('is_favorite').default(false),
  });

// Essays page
export const essays = pgTable('essays', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  slug: text('slug').notNull().unique(), // Unique identifying part of web address
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(), // Sort in order
  description: text('description').notNull(),
});