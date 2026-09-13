import { useState } from "react";
import RentalCard from "../components/rentals/RentalCard";
import RentalFilters from "../components/rentals/RentalFilters";
import Loader from "../components/common/Loader";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";
import { useRentals } from "../hooks/useRentals";

export default function RentalsPage() {
  const [filters, setFilters] = useState({
    locality: "",
    bhk: "",
    furnishing: "",
    limit: 50,
    offset: 0,
  });

  function updateFilters(changes) {
    setFilters((current) => ({
      ...current,
      ...changes,
      offset: 0,
    }));
  }

  const {
    results,
    total,
    has_more,
    loading,
    error,
  } = useRentals(filters);

  if (loading) return <Loader />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="page">
      <h1>Rentals</h1>

      <RentalFilters
        filters={filters}
        onChange={updateFilters}
      />

      {results.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="listing-grid">
          {results.map((rental) => (
            <RentalCard
              key={rental.listing_id}
              rental={rental}
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
    </div>
  );
}