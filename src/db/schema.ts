import { pgTable, serial, text } from 'drizzle-orm/pg-core';
// import { relations } from 'drizzle-orm';

// mapping out the database schema: data and cols
export const books = pgTable('books', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    author: text('author').notNull(),
    quote: text('quote'),
    review: text('review'),
    cover: text('cover').notNull(), // url to image
    });
