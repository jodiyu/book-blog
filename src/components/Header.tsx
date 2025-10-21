import Link from "next/link";
import { Button } from '@/components/ui/button';
import { ModeToggle } from "@/components/ui/mode-toggle";

export function Header() {
    return (
            <header className="w-full flex justify-center items-center py-4 border-b font-serif">
                <nav className="flex gap-6">
                    <Link href="/">
                        <Button variant="ghost">Reviews</Button>
                    </Link>
                    <Link href="/favorites">
                        <Button variant="ghost">Favorites</Button>
                    </Link>
                    <Link href="/essays">
                        <Button variant="ghost">Essays</Button>
                    </Link>
                    <Link href="/about">
                        <Button variant="ghost">About</Button>
                    </Link>
                </nav>
                <div className="absolute right-6">
                    <ModeToggle />
                </div>
            </header>
    )
}