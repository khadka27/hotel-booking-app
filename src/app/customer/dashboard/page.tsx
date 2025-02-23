// src/app/customer/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CustomerDashboard() {
  // Here you would check the session; for demonstration, we're redirecting if not logged in
  const session = await getServerSession(); // implement your auth logic
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">Customer Dashboard</h1>
      <p>Welcome, {session?.user?.name || "Customer"}!</p>
      {/* Add search bars, booking history, etc. */}
    </div>
  );
}
