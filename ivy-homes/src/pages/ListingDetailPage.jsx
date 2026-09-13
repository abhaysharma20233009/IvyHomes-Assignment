import { useLocation, useNavigate } from "react-router-dom";

export default function ListingDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const listing = location.state?.listing;

  if (!listing) {
    return (
      <div className="page">
        <h2>Listing unavailable</h2>

        <button onClick={() => navigate("/")}>
          Back to listings
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <button onClick={() => navigate(-1)}>
        Back
      </button>

      <h1>
        {listing.apartment_name || "Property"}
      </h1>

      <p>{listing.locality}</p>

      <p>
        {listing.bedroom} BHK
      </p>

      <p>
        ₹{Number(listing.price || 0).toLocaleString("en-IN")}
      </p>

      <p>
        Carpet area: {listing.carpet_area} sq ft
      </p>

      <p>{listing.description}</p>
    </div>
  );
}