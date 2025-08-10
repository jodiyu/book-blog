// app/essays/[slug]/page.tsx

import { db } from "@/db";
import { essays } from "@/db/schema";
import { eq } from "drizzle-orm";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import BackButton from "@/components/ui/backbutton";  // client component

interface EssayPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EssayPage({ params }: EssayPageProps) {
  const wait = await params; // Params is asynchronous and is passed as a Promise so it needs an await
  const slug = wait.slug;
  const result = await db.select().from(essays).where(eq(essays.slug, slug)); // server component
  const essay = result[0];


  if (!essay) return notFound();

  return (
    <main className="max-w-[700px] mx-auto p-8 font-times text-md leading-relaxed">
      <BackButton />
      <h1 className="text-2xl font-semibold mb-2 text-foreground">{essay.title}</h1>

      <div className="text-muted-foreground text-sm mb-6">
        <span>By {essay.author}</span> &middot;{" "}
        <span>{format(new Date(essay.createdAt), "MMMM d, yyyy")}</span>
      </div>

      {essay.content
        .split(/\n{2,}/)
        .map((para, idx) => {
          const html = para.replace(/~(.*?)~/g, "<em>$1</em>"); // Match text between ~ delimeter and italicize
          return (
            <p 
              key={idx} 
              className="mb-4 indent-8"
              dangerouslySetInnerHTML={{ __html: html }} // Injecting HTML tags into a String
            />
          );
        })}

    </main>
  );
}
