import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Rick & Morty Explorer",
  description: "Frontend Test — Rick and Morty Browser",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        {}
<nav className="backdrop-blur bg-white/20 shadow px-6 py-4 flex items-center justify-between sticky top-0 z-50">
          <Link href="/" className="text-2xl font-bold text-green-600">
            Rick & Morty
          </Link>

          <div className="flex gap-4">
            <Link href="/characters" className="hover:text-green-600 font-medium">
              Characters
            </Link>
          </div>
        </nav>

        {}
        <main className="p-5">{children}</main>
      </body>
    </html>
  );
}
