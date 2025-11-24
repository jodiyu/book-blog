import { useRef, useEffect, useState } from "react";

const EMOTION_COLORS: Record<string, string> = { // Thanks Frank
    admiration: "rgba(255,215,0,0.4)",
    amusement: "rgba(255,105,180,0.4)",
    anger: "rgba(255,0,0,0.4)",
    annoyance: "rgba(255,160,122,0.4)",
    approval: "rgba(50,205,50,0.4)",
    caring: "rgba(255,182,193,0.4)",
    curiosity: "rgba(0,206,209,0.4)",
    desire: "rgba(255,69,0,0.4)",
    disappointment: "rgba(139,0,0,0.4)",
    disapproval: "rgba(139,69,19,0.4)",
    disgust: "rgba(85,107,47,0.4)",
    embarrassment: "rgba(255,99,71,0.4)",
    excitement: "rgba(255,215,0,0.4)",
    fear: "rgba(128,0,128,0.4)",
    gratitude: "rgba(255,222,173,0.4)",
    grief: "rgba(47,79,79,0.4)",
    joy: "rgba(255,255,0,0.4)",
    love: "rgba(255,20,147,0.4)",
    nervousness: "rgba(70,130,180,0.4)",
    optimism: "rgba(0,255,127,0.4)",
    pride: "rgba(255,69,0,0.4)",
    realization: "rgba(135,206,235,0.4)",
    relief: "rgba(152,251,152,0.4)",
    remorse: "rgba(139,0,0,0.4)",
    sadness: "rgba(0,0,255,0.4)",
    surprise: "rgba(255,165,0,0.4)",
};

const FICTION_COLORS: Record<string, string> = { // Looking for alaska, ill give you the sun, love story, the girl with the dragon tattoo, everything i never told you
    admiration: "rgba(255,215,0,0.4)",
    annoyance: "rgba(255,160,122,0.4)",
    love: "rgba(255,20,147,0.4)",
    optimism: "rgba(0,255,127,0.4)",
    approval: "rgba(50,205,50,0.4)",
};

const NONFICTION_COLORS: Record<string, string>= { // When breath becomes air, bad blood, educated, small fry
    caring: "rgba(255,182,193,0.4)",
    joy: "rgba(255,255,0,0.4)",
    desire: "rgba(255,69,0,0.4)",
    disappointment: "rgba(139,0,0,0.4)",
    excitement: "rgba(255,215,0,0.4)",
    admiration: "rgba(255,215,0,0.4)",
    pride: "rgba(255,69,0,0.4)",
};

const CLASSIC_COLORS: Record<string, string> = { // frankenstein, pride and prejudice
    curiosity: "rgba(0,206,209,0.4)",
    desire: "rgba(255,69,0,0.4)",
    disappointment: "rgba(139,0,0,0.4)",
    realization: "rgba(135,206,235,0.4)",
    annoyance: "rgba(255,160,122,0.4)",
    grief: "rgba(47,79,79,0.4)",
    remorse: "rgba(139,0,0,0.4)",
    sadness: "rgba(0,0,255,0.4)",
    pride: "rgba(255,69,0,0.4)",
    love: "rgba(255,20,147,0.4)",
};

const SCIENCE_COLORS: Record<string, string> = { //dune 
    remorse: "rgba(139,0,0,0.4)",
    pride: "rgba(255,69,0,0.4)",
    desire: "rgba(255,69,0,0.4)",
    caring: "rgba(255,182,193,0.4)",
    disapproval: "rgba(139,69,19,0.4)",

};

const FANTASY_COLORS: Record<string, string> = { // the way of kings
    anger: "rgba(255,0,0,0.4)",
    surprise: "rgba(255,165,0,0.4)",
    realization: "rgba(135,206,235,0.4)",
    grief: "rgba(47,79,79,0.4)",
    pride: "rgba(255,69,0,0.4)",
    curiosity: "rgba(0,206,209,0.4)",
};

const GENRE_TO_COLORS: Record<string,Record<string,string>>= {
    fiction: FICTION_COLORS,
    nonfiction: NONFICTION_COLORS,
    classic: CLASSIC_COLORS,
    science: SCIENCE_COLORS,
    fantasy: FANTASY_COLORS,
    default: {} // Default no colors
};

type Bubble = {
    emotion: string;
    x: number;
    y: number;
    size: number;
    alpha: number;
    targetAlpha: number;
    appearDelay?: number; // ms delay before first draw (only used in first render)
};


// Function to get emotion keys based on genre
function getEmotionsForGenre(genre: string): string[] {
    const genreKey = genre.toLowerCase(); // Not needed since already lowercase in db
    const colorMap = GENRE_TO_COLORS[genreKey] || EMOTION_COLORS;
    return Object.keys(colorMap);
}

function generateRandomBubbles(count: number, emotions: string[]): Bubble[] {
    if (typeof window === "undefined") return []; // prevent SSR crash
    if (emotions.length === 0) return []; // Prevent errors with empty emotions

    const res: Bubble[] = [];
    for (let i = 0; i < count; i++) {
        const emotion = emotions[Math.floor(Math.random() * emotions.length)];
        res.push({
            emotion,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: 800 + Math.random() * 800,
            alpha: 0,
            targetAlpha: 1,
        });
    }
    return res;
}

type BackgroundProps = {
    genre: string;
};

export default function Background({genre}: BackgroundProps) {
    //const { current } = usePlayer();
    const [emotions, setEmotions] = useState<string[] | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const bubblesRef = useRef<Bubble[]>([]);
    const isFirstRenderRef = useRef(true);
    const startTimeRef = useRef<number | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Initialize emotions state on first render
    useEffect(() => {
        console.log("Active genre:", genre)
        const genreEmotions = getEmotionsForGenre(genre);
        setEmotions(genreEmotions);
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const updateSize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const prevGenreRef = useRef(genre);

    // // Genre change effect
    // useEffect(() => {
    //     // Skip on first render
    //     console.log("Active genre:", genre)
    //     console.log(`Genre changed from ${prevGenreRef.current} to ${genre}`);
            
    //     // Cancel any existing animation frame
    //     if (animationFrameRef.current) {
    //         cancelAnimationFrame(animationFrameRef.current);
    //         animationFrameRef.current = null;
    //     }
            
    //     // Fade out current bubbles
    //     bubblesRef.current.forEach(bubble => {
    //         bubble.targetAlpha = 0;
    //     });
        
    //     // After a delay, generate new bubbles with new genre
    //     const timer = setTimeout(() => {
    //         const genreEmotions = getEmotionsForGenre(genre);
    //         setEmotions(genreEmotions);
    //         bubblesRef.current = generateRandomBubbles(4, genreEmotions);
    //         isFirstRenderRef.current = true;
    //         startTimeRef.current = null;
    //     }, 1000); // Wait for fade out
        
    //     return () => clearTimeout(timer);
    // }, [bookId]);

    useEffect(() => {
        if (!dimensions.width || !dimensions.height || !emotions || emotions.length === 0) return;
        bubblesRef.current = generateRandomBubbles(4, emotions);
    }, [dimensions, emotions]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Assign sequential delays only for the first render
        if (isFirstRenderRef.current) {
            bubblesRef.current = bubblesRef.current.map((b, i) => ({
                ...b,
                appearDelay: i * 500, // 0ms, 500ms, 1000ms, ...
            }));
        }

        // Ensure canvas size matches dimensions
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        const animate = (timestamp: number) => {
            if (startTimeRef.current === null) startTimeRef.current = timestamp;
            const elapsed = timestamp - startTimeRef.current;

            const bubbles = bubblesRef.current;

            // === update alpha ===
            for (let i = 0; i < bubbles.length; i++) {
                const bubble = bubbles[i];

                // during first render, wait until appearDelay passes
                if (
                    isFirstRenderRef.current &&
                    elapsed < (bubble.appearDelay ?? 0)
                ) {
                    continue; // skip drawing until its time
                }

                const alphaStep = isFirstRenderRef.current ? 0.03 : 0.01;

                if (Math.abs(bubble.alpha - bubble.targetAlpha) < alphaStep) {
                    bubble.alpha = bubble.targetAlpha;
                } else if (bubble.alpha < bubble.targetAlpha) {
                    bubble.alpha += alphaStep;
                } else {
                    bubble.alpha -= alphaStep;
                }
                bubble.alpha = Math.max(0, Math.min(1, bubble.alpha));
            }

            // === clear + redraw ===
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const bubble of bubbles) {
                // skip hidden bubbles (still waiting)
                if (
                    isFirstRenderRef.current &&
                    elapsed < (bubble.appearDelay ?? 0)
                )
                    continue;

                // Select the color map based on genre
                const genreKey = genre.toLowerCase();
                const colorMap = GENRE_TO_COLORS[genreKey] || EMOTION_COLORS;
                const color = colorMap[bubble.emotion] || EMOTION_COLORS[bubble.emotion];
                if (!color) continue;

                const match = color.match(
                    /rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]+)?\)/
                );
                if (!match) continue;

                const [, r, g, b, a = "1"] = match;
                const alpha = bubble.alpha * parseFloat(a);

                const gradient = ctx.createRadialGradient(
                    bubble.x,
                    bubble.y,
                    bubble.size * 0.15,
                    bubble.x,
                    bubble.y,
                    bubble.size * 0.5
                );
                gradient.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
                gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);

                ctx.beginPath();
                ctx.arc(bubble.x, bubble.y, bubble.size / 2, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fillStyle = gradient;
                ctx.fill();
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        // After all bubbles have appeared, mark first render done
        const totalIntroTime = bubblesRef.current.length * 800 + 2000; // stagger + fade buffer
        const firstRenderTimer = setTimeout(() => {
            isFirstRenderRef.current = false;
        }, totalIntroTime);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            clearTimeout(firstRenderTimer);
        };
    }, [genre, dimensions]); // Add dimensions as dependency

     return (
        <div
            style={{
                position: "fixed",
                width: "100%",
                height: "100%",
                left: 0,
                top: 0,
                overflow: "hidden",
                zIndex: -1,
                backgroundColor: "rgba(0, 0, 0, 0.1)",
            }}
        >
            <canvas
                ref={canvasRef}
                width={dimensions.width}
                height={dimensions.height}
                style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    borderRadius: 0, // no clue why this fixes the border issue
                }}
            />
        </div>
    );
}