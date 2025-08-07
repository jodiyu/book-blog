CREATE TABLE "essays" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"author" text NOT NULL,
	"slug" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "essays_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
DROP TABLE "contacts" CASCADE;