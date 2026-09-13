import { useMemo, useState } from "react";
import ListingCard from "../components/listings/ListingCard";
import ListingFilters from "../components/listings/ListingFilters";
import ListingDetail from "../components/listings/ListingDetail";
import Loader from "../components/common/Loader";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";
import { useListings } from "../hooks/useListings";
import { filterListings } from "../utils/clientFilters";
import { isCorruptListing } from "../utils/dataCleaner";

export default function ListingsPage() {
  const [filters, setFilters] = useState({
    locality: "",
    bhk: "",
    property_type: "",
    min_price: "",
    max_price: "",
    furnishing: "",
    limit: 50,
    offset: 0,
  });

  const [selectedListing, setSelectedListing] =
    useState(null);

  function updateFilters(changes) {
    setFilters((current) => ({
      ...current,
      ...changes,
      offset: 0,
    }));
  }

  const { results, total, has_more, loading, error } =
    useListings(filters);

  const cleanListings = useMemo(
    () => results.filter((listing) => !isCorruptListing(listing)),
    [results]
  );

  const visibleListings = useMemo(
    () =>
      filterListings(cleanListings, filters),
    [cleanListings, filters]
  );

  if (loading) return <Loader />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="page">
      <h1>Listings</h1>

      <ListingFilters
        filters={filters}
        onChange={updateFilters}
      />

      <p>
        Showing {visibleListings.length} of {5100}
      </p>

      {visibleListings.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="listing-grid">
          {visibleListings.map((listing) => (
            <ListingCard
              key={listing.listing_id}
              listing={listing}
              onClick={setSelectedListing}
            />
          ))}
        </div>
      )}

      <div className="pagination">
        <button
          disabled={filters.offset === 0}
          onClick={() =>
            setFilters((current) => ({
              ...current,
              offset: Math.max(
                0,
                current.offset - current.limit
              ),
            }))
          }
        >
          Previous
        </button>

        <span>
          {filters.offset + 1}–
          {Math.min(
            filters.offset + filters.limit,
            total
          )}
        </span>

        <button
          disabled={!has_more}
          onClick={() =>
            setFilters((current) => ({
              ...current,
              offset:
                current.offset + current.limit,
            }))
          }
        >
          Next
        </button>
      </div>

      <ListingDetail
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
      />
    </div>
  );
}