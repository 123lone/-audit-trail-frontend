"use client";
import { useEffect, useState } from "react";

interface VersionEntry {
  id: string;
  timestamp: string;
  addedWords: string[];
  removedWords: string[];
  oldLength: number;
  newLength: number;
  newLengthText?: string;
}

interface ApiResponse {
  success: boolean;
  entry: VersionEntry;
}

export default function Home() {
  const [text, setText] = useState<string>("");
  const [history, setHistory] = useState<VersionEntry[]>([]);

  // Load history from live backend
  useEffect(() => {
    fetch("https://audit-trail-backend-zwg6.onrender.com/versions")
      .then(res => res.json())
      .then((data: VersionEntry[]) => setHistory(data));
  }, []);

  // Save new version to live backend
  async function saveText() {
    const previous =
      history.length && history[history.length - 1].newLengthText
        ? history[history.length - 1].newLengthText
        : "";

    const res = await fetch("https://audit-trail-backend-zwg6.onrender.com/save-version", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ previous, current: text }),
    });

    const data: ApiResponse = await res.json();
    setHistory([...history, { ...data.entry, newLengthText: text }]);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0d15] to-black px-6 py-10 text-gray-200">
      
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center tracking-wide text-purple-400 drop-shadow-lg">
        📝 Audit Trail Generator
      </h1>

      {/* Text Editor */}
      <div className="max-w-3xl mx-auto mt-8 p-6 bg-white/5 backdrop-blur-xl shadow-xl rounded-xl border border-purple-400/20">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write something & track changes..."
          className="w-full h-40 p-4 bg-black/30 border border-white/10 rounded-xl text-lg outline-none focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.6)] transition"
        />

        <button
          onClick={saveText}
          className="mt-4 w-full py-3 bg-purple-600 hover:bg-purple-700 active:scale-[0.97] rounded-xl text-lg font-semibold shadow-[0_0_15px_rgba(168,85,247,0.5)] transition"
        >
          Save Version 🚀
        </button>
      </div>

      {/* Version History */}
      <h2 className="text-3xl font-bold mt-10 mb-4 text-center">📂 Version History</h2>

      <div className="max-w-3xl mx-auto max-h-[60vh] overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-purple-500/40 scrollbar-track-transparent">
        {history.map((v) => (
          <div
            key={v.id}
            className="border border-purple-300/20 bg-white/5 p-5 rounded-xl hover:border-purple-500/40 hover:scale-[1.01] transition shadow-lg origin-center"
          >
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-400">{v.timestamp}</p>
              <p className="font-semibold text-lg text-white">🆔 {v.id}</p>
            </div>

            <div className="flex gap-2 mt-3 flex-wrap">
              <span className="px-2 py-1 text-xs rounded bg-green-400/20 text-green-400 border border-green-400/50">
                + {v.addedWords.length} added
              </span>
              <span className="px-2 py-1 text-xs rounded bg-red-400/20 text-red-400 border border-red-400/50">
                - {v.removedWords.length} removed
              </span>
            </div>

            {/* Added Words */}
            <div className="mt-4">
              <p className="font-bold text-green-400">Added Words:</p>
              <div className="flex gap-2 flex-wrap mt-1">
                {v.addedWords.length ? (
                  v.addedWords.map((w, i) => (
                    <span key={i} className="chip bg-green-500/10 border border-green-400/30 text-green-300">
                      {w}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 italic">None</span>
                )}
              </div>
            </div>

            {/* Removed Words */}
            <div className="mt-4">
              <p className="font-bold text-red-400">Removed Words:</p>
              <div className="flex gap-2 flex-wrap mt-1">
                {v.removedWords.length ? (
                  v.removedWords.map((w, i) => (
                    <span key={i} className="chip bg-red-500/10 border border-red-400/30 text-red-300">
                      {w}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 italic">None</span>
                )}
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-400">
              Length: <b>{v.oldLength}</b> → <b>{v.newLength}</b> characters
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
