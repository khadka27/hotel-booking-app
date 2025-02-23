// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">
        Welcome to Hotel & Restaurant Booking
      </h1>
      <p>Search and book your favorite hotels and restaurants!</p>
      <nav className="mt-4">
        <Link href="/customer/dashboard">Customer Dashboard</Link> |{" "}
        <Link href="/vendor/dashboard">Vendor Dashboard</Link> |{" "}
        <Link href="/admin/dashboard">Admin Dashboard</Link>
      </nav>
    </main>
  );
}
