import { useEffect, useState } from "react";
import { getRentals } from "../services/rentalsService";

export function useRentals(filters) {
  const [data, setData] = useState({
    results: [],
    total: 0,
    has_more: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const response = await getRentals(filters);

        if (!cancelled) {
          setData(response);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.detail ||
              err.message ||
              "Failed to load rentals."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [
    filters.limit,
    filters.offset,
    filters.locality,
    filters.bhk,
    filters.furnishing,
    filters.sort_by,
    filters.order,
  ]);

  return {
    ...data,
    loading,
    error,
  };
}