import FlippingCard from "@/components/ui/flipping-card";

const recommendationsList = [
    {
        title: "C",               
        font: "Classics",    
        bookList: [
            { title: "Frankenstein", dateRead: "2021" },
            { title: "Pride and Prejudice", dateRead: "2020" }
        ],
        iconName: "BookOpen",
        color: "#5ba6ed" // blue
    },
    {
        title: "F",
        font: "Fiction",
        bookList: [
            { title: "I'll Give You The Sun", dateRead: "2023" },
            { title: "Looking for Alaska", dateRead: "2016" },
            { title: "Love Story", dateRead: "2020" },
            { title: "Everything I Never Told You", dateRead: "2021" },
            { title: "The Girl with the Dragon Tattoo", dateRead: "2024" }
        ],
        iconName: "Heart",
        color: "#ca932a" // mustard yellow
    },
    {
        title: "M",
        font: "Memoirs",
        bookList: [
            { title: "Small Fry", dateRead: "2021" },
            { title: "Educated", dateRead: "2021" },
            { title: "When Breath Becomes Air", dateRead: "2024" },
            { title: "Between Two Kingdoms", dateRead: "2023" },
            { title: "Reading with Patrick", dateRead: "2025" },
            { title: "The Last Lecture", dateRead: "2025" }
        ],
        iconName: "UserRound",
        color: "#5fac4e" // medium green
    },
    {
        title: "N",
        font: "Nonfiction",
        bookList: [
            { title: "Bad Blood: Secrets and Lies in a Silicon Valley Startup", dateRead: "2022" }
        ],
        iconName: "Syringe",
        color: "#b33139" // deep red
    },
    {
        title: "S",
        font: "Science Fiction",
        bookList: [
            { title: "Dune", dateRead: "2023" }
        ],
        iconName: "Shell",
        color: "#5a215a" // plum
    },
    {
        title: "A",
        font: "Adventure",
        bookList: [
            { title: "The Way of Kings", dateRead: "2025" },
            { title: "Tress of the Emerald Sea", dateRead: "2024" }
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