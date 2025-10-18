"use client";

import React from "react";

export type Quote = { text: string; author?: string };

const defaultQuotes: Quote[] = [
  { text: "But not-knowing would not keep me from not caring, and I would always love Alaska Young, my crooked neighbor, with all my crooked heart.", author: "Looking for Alaska" },
  { text: "Yet even that enemy of God and man had friends and associates in his desolation; I am quite alone.", author: "Frankenstein" },
  { text: "Fatigue is here, in my body, in my legs and eyes. That is what you get in the end. Faith is only a word, embroidered. ", author: "The Handmaid's Tail" },
  { text: "They won't let me .. I can't be .. good.", author: "Notes from Underground" },
  { text: "...as if we heard the same bird singing and the song entered each of us, changed.", author: "Reading with Patrick" },
  { text: "How do we get out of the labyrinth of suffering?", author: "Looking for Alaska" },
  { text: "I love memories. They are our ballads, our personal foundation myths. But I must acknowledge that memory can be cruel if left unchallenged.", author: "Tress of the Emerald Sea" },
  { text: "The general prejudice against Mr. Darcy is so violent, that it would be the death of half the good people in Meryton, to attempt to place him in amiable light.", author: "Pride and Prejudice" },
  { text: "I should have wept to die; now it is my only consolation. Polluted by crimes, and torn by the bitterest remorse, where can I find rest but in death?", author: "Frankenstein" },
];

interface RandomQuoteProps {
    quotes?: Quote[];
}

export default function RandomQuote({ quotes = defaultQuotes }: RandomQuoteProps) {
    const [index, setIndex] = React.useState<number | null>(null);

    React.useEffect(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setIndex(randomIndex);
    }, [quotes.length]);

    // Don't render anything until we have a random index
    if (index === null) {
        return null;
    }

    const current = quotes[index];

    return (
        <div className="quotes-rotator" role="status" aria-live="polite">
            <div className="max-w-2xl mx-auto text-center px-4 py-6 font-serif animate-fade-in-blur">
                <p className="text-xl text-gray-700 dark:text-gray-300 italic leading-relaxed">&ldquo;{current.text}&rdquo;</p>
                {current.author && <p className="mt-2 text-m text-gray-500 dark:text-coal-400">— {current.author}</p>}
            </div>
        </div>
    );
}
