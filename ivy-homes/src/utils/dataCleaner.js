export function isCorruptListing(listing) {
  const numericFields = [
    "price",
    "carpet_area",
    "super_built_up_area",
    "bedroom",
    "bathroom",
    "balcony",
    "floor",
    "total_floors",
  ];

  for (const field of numericFields) {
    const value = listing[field];

    if (
      value !== null &&
      value !== undefined &&
      (!Number.isFinite(Number(value)) || Number(value) < 0)
    ) {
      return true;
    }
  }

  if (
    Number.isFinite(Number(listing.carpet_area)) &&
    Number.isFinite(Number(listing.super_built_up_area)) &&
    Number(listing.carpet_area) > Number(listing.super_built_up_area)
  ) {
    return true;
  }

  if (
    Number.isFinite(Number(listing.floor)) &&
    Number.isFinite(Number(listing.total_floors)) &&
    Number(listing.floor) > Number(listing.total_floors)
  ) {
    return true;
  }

  if (
    Number(listing.floor) > 0 &&
    Number(listing.total_floors) === 0
  ) {
    return true;
  }

  if (
    listing.property_type === "plot" &&
    (Number(listing.bedroom) > 0 ||
      Number(listing.bathroom) > 0)
  ) {
    return true;
  }

  return false;
}