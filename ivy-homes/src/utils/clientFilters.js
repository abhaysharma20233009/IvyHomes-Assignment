export function filterListings(listings, filters) {
  let result = [...listings];

  if (filters.min_price) {
    result = result.filter(
      (listing) => Number(listing.price) >= Number(filters.min_price)
    );
  }

  if (filters.max_price) {
    result = result.filter(
      (listing) => Number(listing.price) <= Number(filters.max_price)
    );
  }

  if (filters.furnishing) {
    result = result.filter(
      (listing) =>
        String(listing.furnishing).toLowerCase() ===
        String(filters.furnishing).toLowerCase()
    );
  }

  return result;
}