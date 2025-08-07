// app/about/page.tsx
import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

export default function AboutAuthor() {
  return (
    <main className="max-w-md mx-auto p-8 text-base leading-relaxed">
      <section className="flex flex-col items-center space-y-6">

        {/* Author name */}
        <h1 className="text-2xl font-bold">Jodi Yu</h1>

        {/* Short description */}
        <p className="text-center text-gray-700 dark:text-gray-300">
          Hi my name is Jodi, and I like to read and write. My favorite genre is nonfiction. I am currently reading the Stormlight Archive, a great fantasy series that I stole off my brother&apos;s bookshelf.
        </p>

        {/* Social media links */}
        <nav className="flex space-x-6 text-gray-600 dark:text-gray-400">
        {/* Email */}
            <HoverCard>
            <HoverCardTrigger className="cursor-pointer hover:underline" asChild>
                <a
                aria-label="Email"
                className="hover:text-red-800 transition"
                >
                    <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />

                    </svg>
                </a>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="text-center">
                <h4 className="text-sm font-semibold">jodilinyu@gmail.com</h4>
              </div>
            </HoverCardContent>
          </HoverCard>

          <a
            href="https://github.com/jodiyu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-gray-900 dark:hover:text-white transition"
          >
            {/* GitHub SVG icon */}
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.48 2 2 6.48 2 12a10 10 0 006.84 9.54c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.54 2.37 1.1 2.95.85.1-.65.35-1.1.63-1.36-2.22-.26-4.56-1.11-4.56-4.95 0-1.09.38-1.97 1-2.67-.1-.26-.45-1.3.1-2.7 0 0 .82-.26 2.7 1a9.41 9.41 0 015 0c1.9-1.26 2.7-1 2.7-1 .55 1.4.2 2.44.1 2.7.63.7 1 1.58 1 2.67 0 3.85-2.35 4.68-4.58 4.94.36.3.67.9.67 1.82v2.7c0 .26.18.59.68.48A10 10 0 0022 12c0-5.52-4.48-10-10-10z"
              />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/in/jodi-yu-6104022a4/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue-700 transition"
          >
            {/* LinkedIn SVG icon */}
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20.45 20.45h-3.58v-5.4c0-1.29-.03-2.94-1.8-2.94-1.8 0-2.07 1.4-2.07 2.85v5.49h-3.57V9h3.43v1.56h.05c.48-.9 1.65-1.85 3.4-1.85 3.64 0 4.31 2.4 4.31 5.5v6.23zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.13 20.45H3.57V9h3.56v11.45z" />
            </svg>
          </a>
        </nav>
      </section>
    </main>
  );
}
