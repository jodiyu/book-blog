import FlippingCard from "@/components/ui/flipping-card";
import { Heart, Shell, UserRound, BookOpen, Syringe } from "lucide-react";

const recommendationsList = [
    {
        title: "C",               
        font: "Classics",    
        bookList: ["Frankenstein", "Pride and Prejudice"],
        icon: <BookOpen size={18} color="white" />
    },
    {
        title: "F",
        font: "Fiction",
        bookList:["I'll Give You The Sun", "Looking for Alaska", "Love Story", "Everything I Never Told You", "The Way of Kings"],
        icon: <Heart size={18} color="white" />
    },
    {
        title: "M",
        font: "Memoirs",
        bookList: ["Small Fry", "Educated", "When Breath Becomes Air", "Between Two Kingdoms","Reading with Patrick"],
        icon: <UserRound size={18} color="white" />
    },
    {
        title: "N",
        font: "Nonfiction",
        bookList: ["Bad Blood: Secrets and Lies in a Silicon Valley Startup"],
        icon: <Syringe size={18} color="white" />
    },
    {
        title: "S",
        font: "Science Fiction",
        bookList: ["Dune"],
        icon: <Shell size={18} color="white" />
    }

];

export default function Recommendations() {
    return (
<main className="flex min-h-screen flex-col items-center justify-start gap-10 space-y-6 p-6">
            <FlippingCard list={recommendationsList} />
        </main>
    );
}