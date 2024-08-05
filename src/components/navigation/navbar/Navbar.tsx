import Link from "next/link";

interface NavbarProps {
    name?: string; // Make name optional if not always provided
}

export default function Navbar({ name }: NavbarProps) {
    return (
        <nav>
            <div>
                <Link href="/">Home</Link>
            </div>
            <div>
                <Link href="/login">Login</Link>
            </div>
            <div>
                <Link href="/signup">Signup</Link>
            </div>
            <div>
                <Link href="/contact">Contact US</Link>
            </div>
            <div>
                <Link href="/about">About US</Link>
            </div>
            {name && <h1>{name}</h1>}
        </nav>

    )
}