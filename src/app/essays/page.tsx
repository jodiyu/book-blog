import { db } from "@/db"
import { essays } from "@/db/schema"
import Link from "next/link"
import { format } from "date-fns";

export default async function EssayList() {
  const allEssays = await db.select().from(essays).orderBy(essays.createdAt) // Server component (DB call) for static rendering

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <ul className="space-y-6">
        {allEssays.map((essay) => (
          <li key={essay.id}>
            <Link
              href={`/essays/${essay.slug}`}
              className="block border border-border rounded-lg p-6 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <h2 className="text-l mb-1">
                {essay.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {format(new Date(essay.createdAt), "MMMM d, yyyy")}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
