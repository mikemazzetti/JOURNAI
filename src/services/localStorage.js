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
      "Failed to load or parse saved entries from local storage:",
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
    console.error("Attempted to save non-array data to local storage.");
    return false;
  }
  try {
    const entriesString = JSON.stringify(entries);
    localStorage.setItem(LOCAL_STORAGE_KEY, entriesString);
    return true; 
  } catch (error) {
    console.error("Failed to save entries to local storage:", error);
    return false; 
  }
};
