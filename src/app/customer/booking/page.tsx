import React from "react";
import BookingForm from "@/components/BookingForm";

function page() {
  return (
    <BookingForm listingId={1} unitId={1} onBookingSuccess={() => {}} />
  );
}

export default page;
