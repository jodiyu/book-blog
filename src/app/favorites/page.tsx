import FlippingCard from "@/components/ui/flipping-card";
import { Heart, Shell, UserRound, BookOpen, Syringe, Sword } from "lucide-react";

const recommendationsList = [
    {
        title: "C",               
        font: "Classics",    
        bookList: ["Frankenstein", "Pride and Prejudice"],
        icon: BookOpen,
        color: "#5ba6ed" // blue
    },
    {
        title: "F",
        font: "Fiction",
        bookList:["I'll Give You The Sun", "Looking for Alaska", "Love Story", "Everything I Never Told You"],
        icon: Heart,
        color: "#ca932a" // mustard yellow
    },
    {
        title: "M",
        font: "Memoirs",
        bookList: ["Small Fry", "Educated", "When Breath Becomes Air", "Between Two Kingdoms","Reading with Patrick"],
        icon: UserRound,
        color: "#5fac4e" // medium green
    },
    {
        title: "N",
        font: "Nonfiction",
        bookList: ["Bad Blood: Secrets and Lies in a Silicon Valley Startup"],
        icon: Syringe,
        color: "#b33139" // deep red
    },
    {
        title: "S",
        font: "Science Fiction",
        bookList: ["Dune"],
        icon: Shell,
        color: "#5a215a" // plum
    },
    {
        title: "A",
        font: "Adventure",
        bookList: ["The Way of Kings", "Tress of the Emerald Sea"],
        icon: Sword,
        color: "#175f76" // dark blue
    },

];

export default function Recommendations() {
    return (
<main className="flex min-h-screen flex-col items-center justify-start gap-10 space-y-6 p-6">
            <FlippingCard list={recommendationsList} />
        </main>
    );
}