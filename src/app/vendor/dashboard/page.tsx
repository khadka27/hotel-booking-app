import Layout from "@/components/Layout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function VendorDashboard() {
  const session = await getServerSession(); // Implement your session retrieval logic
  if (!session || session.user.role !== "VENDOR") {
    redirect("/api/auth/signin");
  }

  // Replace with a call to your API/database to fetch vendor listings.
  const listings = [
    {
      id: 1,
      name: "Hotel California",
      address: "Los Angeles, CA",
      price: 150,
      imageUrl: "/hotel.jpg",
    },
    {
      id: 2,
      name: "Sunny Restaurant",
      address: "San Francisco, CA",
      price: 75,
      imageUrl: "/restaurant.jpg",
    },
  ];

  return (
    <Layout>
      <h1 className="text-2xl font-semibold">Vendor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {listings.map((listing) => (
          <div key={listing.id} className="border p-4 rounded">
            <h2 className="text-xl">{listing.name}</h2>
            <p>{listing.address}</p>
            <p className="font-bold">${listing.price}</p>
            {/* Add buttons or links to edit/view details */}
          </div>
        ))}
      </div>
    </Layout>
  );
}
