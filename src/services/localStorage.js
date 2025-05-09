const LOCAL_STORAGE_KEY = "reactJournalEntriesMultiFile";

/**
 * @returns {Array} 
 */
export const loadEntries = () => {
  try {
    const storedEntries = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedEntries) {
      const parsed = JSON.parse(storedEntries);
      return Array.isArray(parsed) ? parsed : [];
    }
    return []; 
  } catch (error) {
    console.error(
      "Failed to load saved entries",
      error,
    );
    return []; 
  }
};

/**
 * @param {Array} entries 
 * @returns {boolean} 
 */
export const saveEntries = (entries) => {
  if (!Array.isArray(entries)) {
    console.error("Error attempting to save non-array data");
    return false;
  }
  try {
    const entriesString = JSON.stringify(entries);
    localStorage.setItem(LOCAL_STORAGE_KEY, entriesString);
    return true; 
  } catch (error) {
    console.error("Failed to save entries", error);
    return false; 
  }
};
