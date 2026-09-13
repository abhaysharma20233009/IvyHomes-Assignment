export default function ListingDetail({ listing, onClose }) {
  if (!listing) return null;

  return (
    <div className="detail-overlay">
      <div className="detail-panel">
        <button onClick={onClose}>Close</button>

        <h2>
          {listing.apartment_name || "Property"}
        </h2>

        <p>
          {listing.bedroom} BHK {listing.property_type}
        </p>

        <p>Locality: {listing.locality}</p>

        <p>
          Price: ₹
          {Number(listing.price || 0).toLocaleString("en-IN")}
        </p>

        <p>
          Carpet area: {listing.carpet_area || "-"} sq ft
        </p>

        <p>Bathroom: {listing.bathroom ?? "-"}</p>
        <p>Balcony: {listing.balcony ?? "-"}</p>
        <p>Floor: {listing.floor ?? "-"}</p>
        <p>Furnishing: {listing.furnishing || "-"}</p>

        {listing.description && (
          <p>{listing.description}</p>
        )}
      </div>
    </div>
  );
}