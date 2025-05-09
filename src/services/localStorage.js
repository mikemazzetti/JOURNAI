const LOCAL_STORAGE_KEY = "reactJournalEntriesMultiFile";

/**
 * Loads journal entries from local storage.
 * @returns {Array} Array of saved entry objects, or  empty array if none found or error occurs.
 */
export const loadEntries = () => {
  try {
    const storedEntries = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedEntries) {
      // Ensure parsing results in an array
      const parsed = JSON.parse(storedEntries);
      return Array.isArray(parsed) ? parsed : [];
    }
    return []; // Return empty array if nothing stored
  } catch (error) {
    console.error(
      "Failed to load or parse saved entries from local storage:",
      error,
    );
    return []; // Return empty array if error
  }
};

/**
 * Saves journal entries to local storage.
 * @param {Array} entries - Array of entry objects to save.
 * @returns {boolean} True if saving successful, false otherwise.
 */
export const saveEntries = (entries) => {
  if (!Array.isArray(entries)) {
    console.error("Attempted to save non-array data to local storage.");
    return false;
  }
  try {
    const entriesString = JSON.stringify(entries);
    localStorage.setItem(LOCAL_STORAGE_KEY, entriesString);
    return true; // Success
  } catch (error) {
    console.error("Failed to save entries to local storage:", error);
    return false; // Failure
  }
};
