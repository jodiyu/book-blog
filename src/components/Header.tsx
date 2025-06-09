import Link from "next/link";
import { Button } from '@/components/ui/button';

export function Header() {
    return (
        <header className="w-full flex justify-center py-4 border-b bg-white">
            <nav className="flex gap-6">
                <Link href="/">
                    <Button variant="ghost">Books</Button>
                </Link>
                <Link href="/recommendations">
                    <Button variant="ghost">Recommendations</Button>
                </Link>
                <Link href="/contact">
                    <Button variant="ghost">Contact</Button>
                </Link>
            </nav>
        </header>
    )
}