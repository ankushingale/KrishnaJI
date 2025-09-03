// src/QuestionPage.jsx
import React, { useEffect, useState } from "react";

const QUESTION_BANK = [
  { id: "Q1", question: "Fill the next prime in the series: 2, 3, 5, 7, 11, ?", answer: "13", hint: "Next prime" },
  { id: "Q2", question: "Reverse this string and type it: RAMA", answer: "AMAR", hint: "Write backwards" },
  { id: "Q3", question: "What is the capital of France? (one word)", answer: "Paris", hint: "City of lights" },
  { id: "Q4", question: "2 + 2 × 2 = ?", answer: "6", hint: "Multiplication before addition" },
  { id: "Q5", question: "Which language uses 'console.log' to print?", answer: "javascript", hint: "Browser language" },
];

const KRISHNA_QUOTES = [
  "Write your code with devotion, let the results (deployment) be handled by Karma.",
  "Debugging is our Kurukshetra – stay calm, victory will come with focus.",
  "A true coder is like Arjuna – aiming only at the eye of the problem.",
  "Merge conflicts are like Kauravas – face them with patience and guidance.",
  "Every sprint is like Raas Leela – rhythm, harmony, and flow bring success.",
  "Good documentation is like Krishna’s flute – simple, clear, and guiding everyone.",
  "Testing is our dharma – ensure quality without attachment to deadlines.",
];

const STORAGE_KEY = "qr_shown_questions_v1";

export default function QuestionPage({ useNoRepeat = true }) {
  const [current, setCurrent] = useState(null);
  const [answer, setAnswer] = useState("");
  const [solved, setSolved] = useState(false);
  const [quote, setQuote] = useState("");
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const pickRandom = () => {
      let pool = QUESTION_BANK.map((q) => q.id);

      if (useNoRepeat && typeof localStorage !== "undefined") {
        try {
          const shownRaw = localStorage.getItem(STORAGE_KEY);
          const shown = shownRaw ? JSON.parse(shownRaw) : [];
          pool = pool.filter((id) => !shown.includes(id));
          if (pool.length === 0) {
            localStorage.removeItem(STORAGE_KEY);
            pool = QUESTION_BANK.map((q) => q.id);
          }
        } catch (e) {
          console.warn("Error reading shown list:", e);
        }
      }

      const id = pool[Math.floor(Math.random() * pool.length)];
      const q = QUESTION_BANK.find((x) => x.id === id) || QUESTION_BANK[0];

      if (useNoRepeat && typeof localStorage !== "undefined") {
        try {
          const shownRaw = localStorage.getItem(STORAGE_KEY);
          const shown = shownRaw ? JSON.parse(shownRaw) : [];
          shown.push(q.id);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(shown));
        } catch {}
      }

      setCurrent(q);
    };

    pickRandom();
  }, [useNoRepeat]);

  const checkAnswer = () => {
    if (!current) return;
    if (answer.trim().toLowerCase() === current.answer.trim().toLowerCase()) {
      setSolved(true);
      setQuote(KRISHNA_QUOTES[Math.floor(Math.random() * KRISHNA_QUOTES.length)]);
    } else {
      alert("Incorrect — please try again.");
    }
  };

  const handleNew = () => window.location.reload();

  if (!current) {
    return (
      <div style={styles.center}>
        <div style={styles.card}>
          <h3>Loading...</h3>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.center}>
      <div style={styles.card}>
        {!solved ? (
          <>
            <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>
              {current.question || "No question available"}
            </p>
            <div style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
              Question ID: {current.id}
            </div>

            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
              placeholder="Type your answer..."
              style={styles.input}
            />

            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button onClick={checkAnswer} style={styles.button}>
                Submit
              </button>
              <button
                onClick={() => setShowHint((s) => !s)}
                style={{ ...styles.button, background: "#ddd", color: "#111" }}
              >
                {showHint ? "Hide Hint" : "Show Hint"}
              </button>
            </div>

            {showHint && (
              <div style={{ marginTop: 12, color: "#444" }}>
                Hint: {current.hint || "—"}
              </div>
            )}
            <div style={{ marginTop: 16, fontSize: 12, color: "#999" }}>
              Tip: QR generator params are ignored — page still picks a fresh question.
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 40 }}>🎉</div>
            <h2 style={{ marginTop: 8 }}>Correct!</h2>
            <blockquote style={{ marginTop: 10, fontStyle: "italic" }}>“{quote}”</blockquote>

            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <button onClick={handleNew} style={styles.button}>
                New Question
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: "Krishna Quote", text: quote }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(quote);
                    alert("Quote copied to clipboard.");
                  }
                }}
                style={{ ...styles.button, background: "#2b6cb0", color: "#fff" }}
              >
                Share / Copy
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  center: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f7fafc",
    padding: 20,
  },
  card: {
    width: "min(720px, 96%)",
    background: "#000000ff",
    padding: 24,
    borderRadius: 10,
    boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #ddd",
    fontSize: 16,
  },
  button: {
    padding: "10px 16px",
    borderRadius: 6,
    border: "none",
    background: "#48bb78",
    color: "#fff",
    cursor: "pointer",
  },
};
