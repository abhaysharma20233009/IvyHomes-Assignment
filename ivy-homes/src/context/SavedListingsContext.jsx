import { createContext, useContext, useState } from "react";
import {
  getSavedListings,
  saveListings,
} from "../utils/storage";

const SavedListingsContext = createContext(null);

export function SavedListingsProvider({ children }) {
  const [savedIds, setSavedIds] = useState(getSavedListings());

  function toggleSaved(id) {
    setSavedIds((current) => {
      const updated = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];

      saveListings(updated);
      return updated;
    });
  }

  function isSaved(id) {
    return savedIds.includes(id);
  }

  return (
    <SavedListingsContext.Provider
      value={{
        savedIds,
        toggleSaved,
        isSaved,
      }}
    >
      {children}
    </SavedListingsContext.Provider>
  );
}

export function useSavedListings() {
  return useContext(SavedListingsContext);
}