import React from "react";
import Prompt from "./PromptDisplay.jsx";
import TextArea from "./common/TextArea.jsx";
import Button from "./common/Button.jsx";

function Editor({
  text,
  onChange,
  prompt,
  onPrompt,
  onSave,
  isLoading,
  hasKey,
}) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4">
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
          onChange={handleChange}
          placeholder="Start writing..."
          className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          rows={10}
          disabled={isLoading || !hasKey}
        />
      </div>

      <Prompt text={prompt} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Button
          onClick={onPrompt}
          disabled={isLoading || !hasKey || !text.trim()}
          variant="outline"
          className="w-full sm:w-auto"
        >
          {isLoading ? "Getting..." : "Get Prompt"}
        </Button>
        <Button
          onClick={onSave}
          disabled={isLoading || !text.trim()}
          variant="default"
          className="w-full sm:w-auto"
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default Editor;
