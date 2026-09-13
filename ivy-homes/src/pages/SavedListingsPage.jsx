import { useSavedListings } from "../context/SavedListingsContext";
import EmptyState from "../components/common/EmptyState";

export default function SavedListingsPage() {
  const { savedIds } = useSavedListings();

  if (savedIds.length === 0) {
    return (
      <EmptyState message="You have no saved listings." />
    );
  }

  return (
    <div className="page">
      <h1>Saved Listings</h1>

      {savedIds.map((id) => (
        <div key={id} className="saved-item">
          Listing ID: {id}
        </div>
      ))}
    </div>
  );
}