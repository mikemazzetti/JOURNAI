import React, { useState, useEffect } from "react";
import Button from "./components/common/Button.jsx";
import Card from "./components/common/Card.jsx";
import TextArea from "./components/common/TextArea.jsx";
import Alert from "./components/common/Alert.jsx";

function App() {
  const [text, setText] = useState("");
  const [prompt, setPrompt] = useState("");
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  const STORE_KEY = "journalEntries";

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORE_KEY);
      if (stored) {
        setEntries(JSON.parse(stored));
        console.log("Loaded entriese");
      }
    } catch (err) {
      console.error("Failed to load entries:", err);
      setErr("Could not load entries");
      localStorage.removeItem(STORE_KEY);
    }
  }, []);

  const getPrompt = async () => {
    if (!text.trim()) {
      setErr("Please write your thoughtsfirst");
      return;
    }

    setErr("");
    setPrompt("");
    setIsLoading(true);
    setMsg("Getting suggestion...");

    try {
      const res = await fetch("http://localhost:3001/api/get-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ journalText: text }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to get suggestion");
      }

      const data = await res.json();
      setPrompt(data.prompt);
      setMsg("Got suggestion!");
    } catch (err) {
      console.error("Error:", err);
      setErr(err.message || "Failed to get suggestion");
      setMsg("");
    } finally {
      setIsLoading(false);
    }
  };

  const saveEntry = () => {
    if (!text.trim()) {
      setErr("Can't save empty entry");
      return;
    }
    setErr("");

    const entry = {
      id: Date.now(),
      text,
      savedAt: new Date().toISOString(),
    };

    const updated = [entry, ...entries];
    setEntries(updated);

    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(updated));
      setMsg("Saved!");
    } catch (err) {
      console.error("Save failed:", err);
      setErr("Save failed");
      setEntries(entries);
    }

    setTimeout(() => setMsg(""), 3000);
  };

  const deleteEntry = (id) => {
    const ok = window.confirm("Delete this entry?");
    if (!ok) return;

    const updated = entries.filter(entry => entry.id !== id);
    setEntries(updated);

    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(updated));
      setMsg("Deleted");
    } catch (err) {
      console.error("Delete failed:", err);
      setErr("Delete failed");
      setEntries(entries);
    }
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-50 via-stone-50 to-slate-100 p-4 sm:p-6 font-sans">
      <Card className="w-full max-w-3xl mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4">
          AI-Powered Journal
        </h1>

        <div className="mb-4">
          <label
            htmlFor="entry"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Today's thoughts:
          </label>
          <TextArea
            id="entry"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start writing..."
            className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            rows={8}
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <Button
            onClick={getPrompt}
            disabled={isLoading || !text.trim()}
            variant="outline"
            className="w-full sm:w-auto"
          >
            {isLoading ? "Getting..." : "Get Prompt"}
          </Button>
          <Button
            onClick={saveEntry}
            disabled={isLoading || !text.trim()}
            variant="default"
            className="w-full sm:w-auto"
          >
            Save
          </Button>
        </div>

        {prompt && (
          <div className="mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-md">
            <p className="text-sm font-medium text-indigo-700 mb-1">
              Prompt:
            </p>
            <p className="text-sm text-indigo-800 italic">{prompt}</p>
          </div>
        )}

        <Alert message={err} type="error" className="my-2" />
        <Alert message={msg} type="success" className="my-2" />
      </Card>

      {entries.length > 0 && (
        <Card className="w-full max-w-3xl">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Entries
          </h2>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {entries.map((entry) => (
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
                  onClick={() => deleteEntry(entry.id)}
                  variant="secondary"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
                  aria-label="Delete"
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
        JOURNAI | Powered by OpenAI / React / PostgreSQL
      </footer>
    </div>
  );
}

export default App;
