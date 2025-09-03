// QR Puzzle — direct-Puzzle URL flow
// Purpose: Scanning the QR with the phone camera opens a URL like https://your-site/p/PUZ-ARJUNA
// The phone browser shows the single puzzle page, user answers there and receives a divine message.
// How to use:
// 1) Deploy this app to a public URL (Vercel / Netlify / static host). The QR codes generated on the Home page use window.location.origin by default.
// 2) Print the QR images (they encode full URL: <origin>/p/<PUZZLE_ID>) or place them digitally. Scanning with the phone camera opens the puzzle page directly.
// 3) Edit PUZZLES and MESSAGES at the top to customize questions & quotes.

import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useParams, Link, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

// ----------------- Data (edit here) -----------------
const PUZZLES = {
  "PUZ-FIB": {
    id: "PUZ-FIB",
    title: "Prime Sequence",
    question: "Fill the next prime in the series: 2, 3, 5, 7, 11, ?",
    answer: "13",
    hint: "It's the next prime number.",
  },
  "PUZ-REV": {
    id: "PUZ-REV",
    title: "String Reversal",
    question: "Reverse this string and type it: RAMA",
    answer: "AMAR",
    hint: "Write it backwards.",
  },
  "PUZ-ARJUNA": {
    id: "PUZ-ARJUNA",
    title: "Focus Like Arjuna",
    question: "Type only the word that is the 'eye of the problem' in this sentence: 'Bug fixes improve stability'.",
    answer: "Bug",
    hint: "What does Arjuna aim at?",
  },
};

const MESSAGES = [
  "Write your code with devotion, let the results (deployment) be handled by Karma.",
  "Debugging is our Kurukshetra – stay calm, victory will come with focus.",
  "A true coder is like Arjuna – aiming only at the eye of the problem.",
  "Merge conflicts are like Kauravas – face them with patience and guidance.",
  "Every sprint is like Raas Leela – rhythm, harmony, and flow bring success.",
  "Good documentation is like Krishna’s flute – simple, clear, and guiding everyone.",
  "Testing is our dharma – ensure quality without attachment to deadlines.",
];

// ----------------- Helper UI -----------------
function SmallBadge({ children }) {
  return <span className="text-xs px-2 py-1 rounded bg-indigo-100 text-indigo-800">{children}</span>;
}

function Home() {
  // baseUrl used to make QR encode a full absolute link so phone camera opens it directly
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://your-site.example';

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-white to-indigo-50 flex flex-col gap-6">
      <header className="max-w-3xl mx-auto text-center">
        <h1 className="text-2xl font-bold">QR Puzzle — Deploy & Scan</h1>
        <p className="text-sm text-muted mt-2">Scan QR with your phone camera → it opens the question page → answer on phone → receive the message.</p>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="p-4 bg-white rounded-lg shadow">
          <h2 className="font-semibold mb-2">Generate QR codes (print or display)</h2>
          <p className="text-xs text-muted mb-3">Each QR points to: <code>{baseUrl}/p/&lt;PUZZLE_ID&gt;</code>. Replace baseUrl with your public domain if needed.</p>

          <div className="grid grid-cols-2 gap-4">
            {Object.keys(PUZZLES).map((id) => (
              <div key={id} className="p-3 border rounded flex flex-col items-center gap-2">
                <QRCodeCanvas value={`${baseUrl}/p/${id}`} size={140} includeMargin={true} />
                <div className="text-sm font-medium">{id}</div>
                <div className="text-xs text-muted">{PUZZLES[id].title}</div>
                <button
                  className="mt-2 text-xs underline"
                  onClick={() => navigator.clipboard && navigator.clipboard.writeText(`${baseUrl}/p/${id}`)}
                >
                  Copy link
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="p-4 bg-white rounded-lg shadow flex flex-col gap-3">
          <h2 className="font-semibold">Quick test links</h2>
          <p className="text-xs text-muted">If you want to test on the same device (phone), open any of these links directly in the phone browser. If you scanned the QR from the phone camera, it does the same.</p>

          <div className="flex flex-col gap-2">
            {Object.keys(PUZZLES).map((id) => (
              <a key={id} href={`${baseUrl}/p/${id}`} className="px-3 py-2 rounded bg-indigo-600 text-white text-sm text-center" rel="noreferrer">Open {id} on this device</a>
            ))}
          </div>

          <div className="mt-4 text-xs text-muted">
            <div className="font-semibold">Notes</div>
            <ul className="list-disc ml-5">
              <li>If testing locally (localhost), phone cannot open localhost unless exposed to network (use ngrok / localtunnel or deploy to a public host).</li>
              <li>To change the domain encoded in QR (if you deploy under a custom domain), edit the <code>baseUrl</code> line above.</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="max-w-3xl mx-auto text-xs text-muted">
        <div>To customize puzzles/messages: edit <code>PUZZLES</code> and <code>MESSAGES</code> at the top of this file.</div>
        <div className="mt-2">Required libs: <code>react-router-dom</code>, <code>qrcode.react</code>.</div>
      </footer>
    </div>
  );
}

function PuzzlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const puzzleKey = id ? id.toUpperCase() : '';
  const puzzle = PUZZLES[puzzleKey];
  const [answer, setAnswer] = useState('');
  const [solved, setSolved] = useState(false);
  const [message, setMessage] = useState('');

  const randMessage = () => MESSAGES[Math.floor(Math.random() * MESSAGES.length)];

  if (!puzzle) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white p-6 rounded shadow text-center max-w-md">
          <h2 className="text-lg font-semibold mb-2">Puzzle not found</h2>
          <p className="text-sm text-muted">The scanned QR points to an unknown puzzle id: <b>{id}</b></p>
          <div className="mt-4 flex gap-2 justify-center">
            <Link to="/" className="px-3 py-2 rounded bg-indigo-600 text-white">Home</Link>
          </div>
        </div>
      </div>
    );
  }

  const check = () => {
    if (answer.trim().toLowerCase() === puzzle.answer.trim().toLowerCase()) {
      setSolved(true);
      setMessage(randMessage());
    } else {
      alert('Wrong answer — please try again.');
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow max-w-xl w-full">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-semibold">{puzzle.title}</h1>
            <SmallBadge>{puzzle.id}</SmallBadge>
          </div>
          <div className="text-right text-xs text-muted">
            <div>Scan opened: <b>{window.location.href}</b></div>
          </div>
        </div>

        <hr className="my-4" />

        {!solved ? (
          <div className="space-y-4">
            <p className="text-lg">{puzzle.question}</p>
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Type your answer here"
              onKeyDown={(e) => { if (e.key === 'Enter') check(); }}
            />
            <div className="flex gap-2">
              <button onClick={check} className="px-4 py-2 bg-indigo-600 text-white rounded">Submit</button>
              <button onClick={() => alert(puzzle.hint || 'No hint')} className="px-4 py-2 border rounded">Hint</button>
              <button onClick={() => navigate('/')} className="px-4 py-2 border rounded">Back</button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-4xl">🎉</div>
            <div className="text-lg font-semibold">Correct!</div>
            <blockquote className="italic text-xl">“{message}”</blockquote>
            <div className="flex gap-2 justify-center">
              <button onClick={() => { setSolved(false); setAnswer(''); }} className="px-4 py-2 border rounded">Try again</button>
              <button onClick={() => navigator.share ? navigator.share({ title: 'Krishna Quote', text: message }) : navigator.clipboard.writeText(message)} className="px-4 py-2 bg-indigo-600 text-white rounded">Share / Copy</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/p/:id" element={<PuzzlePage />} />
        <Route path="*" element={<div className="p-6">Not found — <Link to="/">Home</Link></div>} />
      </Routes>
    </Router>
  );
}
