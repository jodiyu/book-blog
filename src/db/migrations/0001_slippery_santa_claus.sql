CREATE TABLE "contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"message" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "cover" SET NOT NULL;