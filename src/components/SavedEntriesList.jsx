import React from "react";
import EntryItem from "./EntryItem.jsx";

function EntryList({ entries, onDelete }) {
  if (!entries?.length) {
    return (
      <div className="text-center text-gray-500 text-sm mt-4">
        No entries yet.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-3">
        Entries
      </h2>
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2 border-t pt-4">
        {entries.map((entry) => (
          <EntryItem
            key={entry.id}
            entry={entry}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default EntryList;
