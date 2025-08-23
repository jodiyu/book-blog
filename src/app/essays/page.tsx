import { db } from "@/db"
import { essays } from "@/db/schema"
import Link from "next/link"
import { format } from "date-fns";

export const dynamic = "force-dynamic"; // Do not statically pre-render this route at the time of the deploy / do not cache the HTML

export default async function EssayList() {
  const allEssays = await db.select().from(essays).orderBy(essays.createdAt) // Static inputs only, generats SSG (static site generation) at built time
  console.log("All essays: ", allEssays);

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 font-times">
      <ul className="space-y-6">
        {allEssays.map((essay) => (
          <li key={essay.id}>
            <Link
              href={`/essays/${essay.slug}`}
              className="block border border-border rounded-lg p-6 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <h2 className="text-2xl mb-1 font-semibold">
                {essay.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {format(new Date(essay.createdAt), "MMMM d, yyyy")}
              </p>
               <p className="text-m">
                {essay.description}
              </p>
              
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
