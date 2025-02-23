import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="p-4 bg-gray-100 dark:bg-gray-800 flex justify-between items-center">
        <nav className="flex space-x-4">
          <Link href="/">Home</Link>
          <Link href="/customer/dashboard">Customer</Link>
          <Link href="/vendor/dashboard">Vendor</Link>
          <Link href="/admin/dashboard">Admin</Link>
        </nav>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}
