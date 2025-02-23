import Layout from "@/components/Layout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await getServerSession(); // Implement your session retrieval logic
  if (!session || session.user.role !== "ADMIN") {
    redirect("/api/auth/signin");
  }

  // Replace with your API/database calls to fetch pending listings, bookings, etc.
  const pendingListings = [
    { id: 3, name: "Pending Hotel", vendor: "Vendor XYZ" },
  ];

  return (
    <Layout>
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <section className="mt-4">
        <h2 className="text-xl">Pending Listings</h2>
        <ul>
          {pendingListings.map((listing) => (
            <li key={listing.id}>
              {listing.name} - Submitted by {listing.vendor}
              {/* Add actions such as Approve or Reject */}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
