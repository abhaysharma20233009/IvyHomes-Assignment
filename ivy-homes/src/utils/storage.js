const SAVED_KEY = "saved_listings";

export function getSavedListings() {
  try {
    const value = localStorage.getItem(SAVED_KEY);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

export function saveListings(listings) {
  localStorage.setItem(SAVED_KEY, JSON.stringify(listings));
}