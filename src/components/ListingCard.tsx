import Image from "next/image";

interface ListingCardProps {
  name: string;
  address: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function ListingCard({
  name,
  address,
  description,
  price,
  imageUrl,
}: ListingCardProps) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <Image
        src={imageUrl}
        alt={name}
        width={400}
        height={200}
        className="rounded"
      />
      <h2 className="text-xl font-semibold mt-2">{name}</h2>
      <p className="text-gray-600">{address}</p>
      <p className="mt-2">{description}</p>
      <p className="mt-2 font-bold">${price}</p>
    </div>
  );
}
