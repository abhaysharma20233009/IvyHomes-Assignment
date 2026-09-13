import ListingDetail from "./ListingDetail";
import { useState } from "react";
import { useSavedListings } from "../../context/SavedListingsContext";

function formatPrice(price) {
  if (price === null || price === undefined) {
    return "Price unavailable";
  }

  const value = Number(price);

  if (!Number.isFinite(value)) {
    return "Price unavailable";
  }

  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  }

  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)} Lakh`;
  }

  return `₹${value.toLocaleString("en-IN")}`;
}

function formatArea(area) {
  if (area === null || area === undefined) {
    return "Area unavailable";
  }

  const value = Number(area);

  if (!Number.isFinite(value)) {
    return "Area unavailable";
  }

  return `${value.toLocaleString("en-IN")} sq ft`;
}

export default function ListingCard({ listing }) {
  const { isSaved, toggleSaved } = useSavedListings();
  const [showDetails, setShowDetails] = useState(false);

  if (!listing) {
    return null;
  }

  const {
    listing_id,
    apartment_name,
    locality,
    property_type,
    bedroom,
    bathroom,
    furnishing,
    floor,
    total_floors,
    price,
    carpet_area,
    posted_by,
    is_verified,
    is_live,
  } = listing;

  const saved = isSaved(listing_id);

  return (
    <>
      <article className="listing-card">
        <div className="listing-card-top">
          <span className="listing-type">
            {property_type || "Property"}
          </span>

          {is_verified && (
            <span className="verified-badge">
              ✓ Verified
            </span>
          )}
        </div>

        <div className="listing-card-body">
          <h3 className="listing-title">
            {apartment_name || "Property Listing"}
          </h3>

          <p className="listing-locality">
            {locality || "Location unavailable"}
          </p>

          <div className="listing-price">
            {formatPrice(price)}
          </div>

          <div className="listing-details">
            {bedroom !== null && bedroom !== undefined && (
              <span>
                🛏 {bedroom}{" "}
                {Number(bedroom) === 1 ? "Bed" : "Beds"}
              </span>
            )}

            {bathroom !== null && bathroom !== undefined && (
              <span>
                🚿 {bathroom}{" "}
                {Number(bathroom) === 1 ? "Bath" : "Baths"}
              </span>
            )}

            {carpet_area !== null &&
              carpet_area !== undefined && (
                <span>
                  📐 {formatArea(carpet_area)}
                </span>
              )}
          </div>

          <div className="listing-extra">
            {furnishing && (
              <span>
                <strong>Furnishing:</strong>{" "}
                {furnishing}
              </span>
            )}

            {floor !== null &&
              floor !== undefined &&
              total_floors !== null &&
              total_floors !== undefined && (
                <span>
                  <strong>Floor:</strong>{" "}
                  {floor}/{total_floors}
                </span>
              )}
          </div>

          {posted_by && (
            <div className="listing-posted-by">
              Posted by: {posted_by}
            </div>
          )}
        </div>

        <div className="listing-card-footer">
          <button
            type="button"
            className="view-listing-btn"
            onClick={() => setShowDetails(true)}
          >
            View Details
          </button>

          <button
            type="button"
            className={`save-listing-btn ${
              saved ? "saved" : ""
            }`}
            onClick={() => toggleSaved(listing_id)}
            aria-label={
              saved
                ? "Remove listing from saved listings"
                : "Save listing"
            }
          >
            {saved ? "♥ Saved" : "♡ Save"}
          </button>
        </div>

        {is_live === false && (
          <div className="listing-inactive">
            This listing is currently inactive
          </div>
        )}
      </article>

      {showDetails && (
        <ListingDetail
          listing={listing}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
}