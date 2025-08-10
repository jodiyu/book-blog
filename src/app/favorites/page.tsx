import FlippingCard from "@/components/ui/flipping-card";

const recommendationsList = [
    {
        title: "C",               
        font: "Classics",    
        bookList: [
            { title: "Frankenstein", dateRead: "2021", author: "Mary Shelley" },
            { title: "Pride and Prejudice", dateRead: "2020", author: "Jane Austen" }
        ],
        iconName: "BookOpen",
        color: "#5ba6ed" // blue
    },
    {
        title: "F",
        font: "Fiction",
        bookList: [
            { title: "I'll Give You The Sun", dateRead: "2023", author: "Jandy Nelson" },
            { title: "Looking for Alaska", dateRead: "2016", author: "John Green" },
            { title: "Love Story", dateRead: "2020", author: "Erich Segal" },
            { title: "Everything I Never Told You", dateRead: "2021", author: "Celeste Ng" },
            { title: "The Girl with the Dragon Tattoo", dateRead: "2024", author: "Stieg Larsson" }
        ],
        iconName: "Heart",
        color: "#ca932a" // mustard yellow
    },
    {
        title: "M",
        font: "Memoirs",
        bookList: [
            { title: "Small Fry", dateRead: "2021", author: "Lisa Brennan-Jobs" },
            { title: "Educated", dateRead: "2021", author: "Tara Westover" },
            { title: "When Breath Becomes Air", dateRead: "2024", author: "Paul Kalanithi" },
            { title: "Between Two Kingdoms", dateRead: "2023", author: "Suleika Jaouad" },
            { title: "Reading with Patrick", dateRead: "2025", author: "Michelle Kuo" },
            { title: "The Last Lecture", dateRead: "2025", author: "Jeffrey Zaslow and Randy Pausch" }
        ],
        iconName: "UserRound",
        color: "#5fac4e" // medium green
    },
    {
        title: "N",
        font: "Nonfiction",
        bookList: [
            { title: "Bad Blood: Secrets and Lies in a Silicon Valley Startup", dateRead: "2022", author: "John Carreyrou" }
        ],
        iconName: "Syringe",
        color: "#b33139" // deep red
    },
    {
        title: "S",
        font: "Science Fiction",
        bookList: [
            { title: "Dune", dateRead: "2023", author: "Frank Herbert" }
        ],
        iconName: "Shell",
        color: "#5a215a" // plum
    },
    {
        title: "A",
        font: "Adventure",
        bookList: [
            { title: "The Way of Kings", dateRead: "2025", author: "Brandon Sanderson" },
            { title: "Tress of the Emerald Sea", dateRead: "2024", author: "Brandon Sanderson" }
        ],
        iconName: "Sword",
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