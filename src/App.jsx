import React, { useState, useEffect } from "react";
import Button from "./components/common/Button.jsx";
import Card from "./components/common/Card.jsx";
import TextArea from "./components/common/TextArea.jsx";
import Input from "./components/common/Input.jsx";
import Alert from "./components/common/Alert.jsx";

function App() {
  const [journalText, setJournalText] = useState("");
  const [suggestedPrompt, setSuggestedPrompt] = useState("");
  const [savedEntries, setSavedEntries] = useState([]);
  const [isLoadingPrompt, setIsLoadingPrompt] = useState(false);
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const LOCAL_STORAGE_KEY = "reactJournalEntries";

  useEffect(() => {
    try {
      const storedEntries = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedEntries) {
        setSavedEntries(JSON.parse(storedEntries));
        console.log("Loaded saved entries from local storage.");
      }
    } catch (err) {
      console.error(
        "Failed to load or parse saved entries from local storage:",
        err,
      );
      setError("Could not load saved journal entries.");
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, []);

  const handleGetPrompt = async () => {
    if (!journalText.trim()) {
      setError(
        "Please write something in your journal first to get a relevant prompt.",
      );
      return;
    }

    setError("");
    setSuggestedPrompt("");
    setIsLoadingPrompt(true);
    setStatusMessage("Getting prompt suggestion...");

    try {
      const response = await fetch("http://localhost:3001/api/get-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ journalText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get prompt suggestion");
      }

      const data = await response.json();
      setSuggestedPrompt(data.prompt);
      setStatusMessage("Suggestion received!");
    } catch (err) {
      console.error("Error fetching prompt:", err);
      setError(err.message || "Failed to get prompt suggestion");
      setStatusMessage("");
    } finally {
      setIsLoadingPrompt(false);
    }
  };

  const handleSaveEntry = () => {
    if (!journalText.trim()) {
      setError("Cannot save an empty journal entry.");
      return;
    }
    setError("");

    const newEntry = {
      id: Date.now(),
      text: journalText,
      savedAt: new Date().toISOString(),
    };

    const updatedEntries = [newEntry, ...savedEntries];
    setSavedEntries(updatedEntries);

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedEntries));
      setStatusMessage("Entry saved successfully!");
    } catch (err) {
      console.error("Failed to save entry to local storage:", err);
      setError(
        "Could not save entry. Local storage might be full or disabled.",
      );
      setSavedEntries(savedEntries);
    }

    setTimeout(() => setStatusMessage(""), 3000);
  };

  const handleDeleteEntry = (idToDelete) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this journal entry?",
    );
    if (!confirmed) return;

    const updatedEntries = savedEntries.filter(
      (entry) => entry.id !== idToDelete,
    );
    setSavedEntries(updatedEntries);

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedEntries));
      setStatusMessage("Entry deleted.");
    } catch (err) {
      console.error("Failed to update local storage after deletion:", err);
      setError("Could not update saved entries after deletion.");
      setSavedEntries(savedEntries);
    }
    setTimeout(() => setStatusMessage(""), 3000);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-50 via-stone-50 to-slate-100 p-4 sm:p-6 font-sans">
      <Card className="w-full max-w-3xl mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4">
          AI-Powered Journal
        </h1>

        <div className="mb-4">
          <label
            htmlFor="journalEntry"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Today's thoughts:
          </label>
          <TextArea
            id="journalEntry"
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            placeholder="Start writing your journal entry here..."
            className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            rows={8}
            disabled={isLoadingPrompt}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <Button
            onClick={handleGetPrompt}
            disabled={isLoadingPrompt || !journalText.trim()}
            variant="outline"
            className="w-full sm:w-auto"
          >
            {isLoadingPrompt ? "Getting Suggestion..." : "Suggest a Prompt"}
          </Button>
          <Button
            onClick={handleSaveEntry}
            disabled={isLoadingPrompt || !journalText.trim()}
            variant="default"
            className="w-full sm:w-auto"
          >
            Save Entry
          </Button>
        </div>

        {suggestedPrompt && (
          <div className="mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-md">
            <p className="text-sm font-medium text-indigo-700 mb-1">
              Suggested Prompt:
            </p>
            <p className="text-sm text-indigo-800 italic">{suggestedPrompt}</p>
          </div>
        )}

        <Alert message={error} type="error" className="my-2" />
        <Alert message={statusMessage} type="success" className="my-2" />
      </Card>

      {savedEntries.length > 0 && (
        <Card className="w-full max-w-3xl">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Saved Entries
          </h2>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {savedEntries.map((entry) => (
              <div
                key={entry.id}
                className="p-3 border rounded-md bg-gray-50 relative group"
              >
                <p className="text-xs text-gray-500 mb-1">
                  Saved: {new Date(entry.savedAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-800 whitespace-pre-wrap">
                  {entry.text}
                </p>
                <Button
                  onClick={() => handleDeleteEntry(entry.id)}
                  variant="secondary"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
                  aria-label="Delete entry"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
      <footer className="mt-6 text-center text-xs text-gray-500">
        Journal App | Powered by OpenAI
      </footer>
    </div>
  );
}

export default App;
