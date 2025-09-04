import React, { useEffect, useState, useCallback } from "react";

const QUESTION_BANK = [
  // Geography
  { id: "GK1", question: "What is the capital of Japan?", answer: "Tokyo", hint: "An anagram is 'O, TOKY'" },
  { id: "GK2", question: "Which river is the longest in the world?", answer: "Nile", hint: "Flows through northeastern Africa." },
  { id: "GK3", question: "What is the largest desert in the world?", answer: "Antarctic", hint: "It's a polar desert." },
  { id: "GK4", question: "Which country is known as the Land of the Rising Sun?", answer: "Japan", hint: "Its flag features a red disc." },
  { id: "GK5", question: "Mount Everest is located in which mountain range?", answer: "Himalayas", hint: "The highest mountain range in the world." },
  { id: "GK6", question: "What is the smallest country in the world?", answer: "Vatican City", hint: "An independent city-state within Rome." },
  { id: "GK7", question: "What is the capital of Australia?", answer: "Canberra", hint: "Not Sydney or Melbourne." },
  { id: "GK8", question: "Which continent is the least populated?", answer: "Antarctica", hint: "Home to penguins and scientists." },
  
  // History
  { id: "GK11", question: "Who was the first man to walk on the moon?", answer: "Neil Armstrong", hint: "An American astronaut." },
  { id: "GK12", question: "In which year did the Titanic sink?", answer: "1912", hint: "In the early 20th century." },
  { id: "GK13", question: "Who was the first President of the United States?", answer: "George Washington", hint: "A founding father." },
  { id: "GK14", question: "The ancient city of Rome was built on how many hills?", answer: "7", hint: "A prime number." },
  { id: "GK15", question: "Who invented the light bulb?", answer: "Thomas Edison", hint: "A prolific American inventor." },
  { id: "GK16", question: "Which war was fought between the north and south regions of the United States?", answer: "Civil War", hint: "Took place in the 1860s." },
  { id: "GK17", question: "The Renaissance began in which country?", answer: "Italy", hint: "Home of Leonardo da Vinci." },
  { id: "GK20", question: "What ancient civilization built the pyramids?", answer: "Egyptians", hint: "Ruled by Pharaohs." },

  // Science
  { id: "GK21", question: "What is the chemical symbol for gold?", answer: "Au", hint: "From the Latin word 'aurum'." },
  { id: "GK22", question: "Which planet is known as the Red Planet?", answer: "Mars", hint: "The fourth planet from the sun." },
  { id: "GK23", question: "What is H2O commonly known as?", answer: "Water", hint: "Essential for all known life." },
  { id: "GK24", question: "What is the hardest natural substance on Earth?", answer: "Diamond", hint: "A form of carbon." },
  { id: "GK25", question: "What gas do plants absorb from the atmosphere?", answer: "Carbon Dioxide", hint: "Chemical formula CO2." },
  { id: "GK26", question: "How many planets are in our solar system?", answer: "8", hint: "Pluto was reclassified." },
  { id: "GK28", question: "What force pulls objects toward the center of the Earth?", answer: "Gravity", hint: "Discovered by Isaac Newton." },
  { id: "GK68", question: "What is the human body's largest organ?", answer: "Skin", hint: "It covers your entire body." },

  // Arts & Literature
  { id: "GK31", question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci", hint: "An Italian Renaissance artist." },
  { id: "GK32", question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare", hint: "The Bard of Avon." },
  { id: "GK33", question: "Which artist is famous for co-founding the Cubist movement?", answer: "Pablo Picasso", hint: "A Spanish painter." },
  { id: "GK34", question: "Who is the author of the 'Harry Potter' series?", answer: "J.K. Rowling", hint: "A British author." },
  { id: "GK35", question: "What is the name of the wizard in 'The Lord of the Rings'?", answer: "Gandalf", hint: "He is known for his wisdom." },
  { id: "GK36", question: "Who composed the 'Moonlight Sonata'?", answer: "Ludwig van Beethoven", hint: "A German composer." },
  { id: "GK38", question: "Who wrote 'To Kill a Mockingbird'?", answer: "Harper Lee", hint: "An American novelist." },
  { id: "GK91", question: "What is the most famous painting by Vincent van Gogh?", answer: "The Starry Night", hint: "Depicts a dramatic night sky." },

  // Sports
  { id: "GK41", question: "How many rings are on the Olympic flag?", answer: "5", hint: "Representing the continents." },
  { id: "GK42", question: "Which country won the first ever FIFA World Cup in 1930?", answer: "Uruguay", hint: "They were also the host nation." },
  { id: "GK43", question: "In which sport would you perform a slam dunk?", answer: "Basketball", hint: "Popularized by Michael Jordan." },
  { id: "GK45", question: "Which boxer was known as 'The Greatest'?", answer: "Muhammad Ali", hint: "Float like a butterfly..." },
  { id: "GK46", question: "How many players are on a soccer team on the field?", answer: "11", hint: "Includes the goalkeeper." },
  { id: "GK47", question: "In which sport is the term 'love' used?", answer: "Tennis", hint: "Means a score of zero." },
  { id: "GK48", question: "Usain Bolt is a famous athlete in which sport?", answer: "Sprinting", hint: "From Jamaica." },
  { id: "GK87", question: "What is the fastest land animal?", answer: "Cheetah", hint: "Famous for its spots." },

  // Technology
  { id: "T1", question: "What does CPU stand for in a computer?", answer: "Central Processing Unit", hint: "The 'brain' of the computer." },
  { id: "T2", question: "What is the main function of RAM?", answer: "Temporary memory", hint: "Random-Access Memory." },
  { id: "T3", question: "Which company makes the iPhone?", answer: "Apple", hint: "Also makes MacBooks." },
  { id: "T4", question: "What technology allows devices to connect to the internet without cables?", answer: "Wi-Fi", hint: "You're probably using it now." },
  { id: "T5", question: "What do you call the main page of a website?", answer: "Homepage", hint: "The first page you see." },
  { id: "T6", question: "What does HTML stand for?", answer: "HyperText Markup Language", hint: "Used to structure web pages." },
  { id: "T7", question: "In social media, what does 'DM' usually mean?", answer: "Direct Message", hint: "A private chat." },
  { id: "T8", question: "Which company developed the Android operating system?", answer: "Google", hint: "A major competitor to Apple's iOS." },
  { id: "T9", question: "In programming, what is a 'bug'?", answer: "An error", hint: "Something that causes a program to behave unexpectedly." },
  { id: "T10", question: "What service is commonly used to send electronic mail?", answer: "Email", hint: "Short for electronic mail." },
];

const KRISHNA_QUOTES = [
  "Set your heart upon your work, but never on its reward.",
  "The soul is neither born, nor does it ever die.",
  "A man is made by his beliefs. As he believes, so he becomes.",
  "Perform your obligatory duty, because action is indeed better than inaction.",
  "Calmness, gentleness, silence, self-restraint, and purity: these are the disciplines of the mind.",
  "There is nothing lost or wasted in this life.",
  "The wise see knowledge and action as one; they see truly.",
  "Whatever happened, happened for the good. Whatever is happening, is happening for the good. Whatever will happen, will also happen for the good.",
  "Change is the law of the universe. You can be a millionaire, or a pauper in an instant.",
  "Lust, anger, and greed are the three gates to self-destructive hell.",
  "It is better to live your own destiny imperfectly than to live an imitation of somebody else's life with perfection.",
  "You have the right to work, but never to the fruit of work.",
  "No one who does good work will ever come to a bad end, either here or in the world to come.",
  "The spirit is beyond destruction. No one can bring an end to spirit which is everlasting.",
  "The mind acts like an enemy for those who do not control it.",
  "For one who has conquered his mind, a mind is best of friends, but for one who has failed to do so, a mind is the greatest enemy.",
  "Through selfless service, you will always be fruitful and find the fulfillment of your desires.",
  "The Key to happiness is the reduction of desires.",
  "Do everything you have to do, but not with greed, not with ego, not with lust, not with envy but with love, compassion, humility, and devotion.",
  "The mind is restless and difficult to restrain, but it is subdued by practice.",
  "He who has no attachments can really love others, for his love is pure and divine.",
  "Creation is only the projection into form of that which already exists.",
  "As a person puts on new garments, giving up old ones, the soul similarly accepts new material bodies, giving up the old and useless ones.",
  "When a man dwells on the pleasure of sense, attraction for them arises in him.",
  "From attraction arises desire, the lust of possession, and this leads to passion, to anger.",
  "The power of God is with you at all times; through the activities of mind, senses, breathing, and emotions; and is constantly doing all the work using you as a mere instrument.",
  "The senses are so strong and impetuous that they forcibly carry away the mind even of a man of discrimination who is endeavoring to control them.",
  "One who sees inaction in action, and action in inaction, is intelligent among men.",
  "The self-controlled soul, who moves amongst sense objects, free from either attachment or repulsion, he wins eternal peace.",
  "A gift is pure when it is given from the heart to the right person at the right time and at the right place, and when we expect nothing in return.",
  "Those who are motivated only by desire for the fruits of action are miserable, for they are constantly anxious about the results of what they do.",
  "Why do you worry unnecessarily? Whom do you fear? Who can kill you? The soul is neither born nor dies.",
  "Live a well-balanced life, it will bring peace.",
  "Action should be undertaken as a means of purification, of the body, mind, and intellect.",
  "That which seems like poison at first, but tastes like nectar in the end, is the second kind of happiness.",
  "The only way you can conquer me is through love, and there I am gladly conquered.",
  "The soul can never be cut to pieces by any weapon, nor burned by fire, nor moistened by water, nor withered by the wind.",
  "I am the beginning, middle, and end of creation.",
  "Among all kinds of killers, time is the ultimate because time kills everything.",
  "To the illumined man or woman, a clod of dirt, a stone, and gold are the same.",
  "The wise grieve neither for the living nor for the dead.",
  "There was never a time when I, you, or these kings did not exist; nor shall we ever cease to exist in the future.",
  "For the soul there is never birth nor death. Nor, having once been, does he ever cease to be. He is unborn, eternal, ever-existing, undying and primeval.",
  "Even if you were the most sinful of all sinners, you could cross over all sin by the raft of spiritual wisdom.",
  "As the blazing fire reduces wood to ashes, similarly, the fire of Self-knowledge reduces all Karma to ashes.",
  "There is nothing more purifying than knowledge in this world.",
  "You are what you believe in. You become that which you believe you can become.",
  "Sever the ignorant doubt in your heart with the sword of self-knowledge. Observe your discipline. Arise.",
  "Be steadfast in the performance of your duty, abandoning attachment to success and failure.",
  "The pleasure from the senses seems like nectar at first, but it is bitter as poison in the end.",
  "One who has control over the mind is tranquil in heat and cold, in pleasure and pain, and in honor and dishonor.",
  "I am the source of all spiritual and material worlds. Everything emanates from Me.",
  "A disciplined mind brings happiness.",
  "The ignorant work for their own profit; the wise work for the welfare of the world, without thought for themselves.",
  "Fear not. What is not real, never was and never will be. What is real, always was and cannot be destroyed.",
  "I am time, the destroyer of all; I have come to consume the world.",
  "My concern is not for the body but for the soul.",
  "All works are being done by the energy and power of nature, but due to delusion of ego, people assume themselves to be the doer.",
  "The wise man lets go of all results, whether good or bad, and is focused on the action alone.",
  "To be detached from the fruits of your actions is the highest path.",
  "I am the taste of water, the light of the sun and the moon.",
  "Fill your mind with me, be my devotee, sacrifice unto me or bow down to me, and you will surely come to me.",
  "Reshape yourself through the power of your will.",
  "Those who meditate on me and worship me with an unwavering mind, to them I carry what they lack and preserve what they have.",
  "The offering of wisdom is better than any material offering.",
  "Works do not cling to me because I am not attached to their results. Those who understand this and practice it live in freedom.",
  "The wise should not unsettle the mind of the ignorant who is attached to the fruits of work.",
  "I am seated in everyone's heart.",
  "As a mirror is obscured by dust, so the intellect is obscured by anger.",
  "I am the supreme goal of the learned. I am the supreme path.",
  "Beholding the Supreme Being in all beings, the wise should extend the quality of love and friendship to all.",
  "The intellect of those who are attached to worldly pleasures and wealth is not steady.",
  "I am the consciousness in all beings.",
  "Strive for the welfare of others, for this is the highest duty of a righteous person.",
  "I am everlasting and I am the maintainer.",
  "All beings are born to delusion, overcome by the dualities which arise from desire and aversion.",
  "He who is not disturbed by the incessant flow of desires—that enter like rivers into the ocean, which is ever being filled but is always still—can alone achieve peace.",
  "Of all yogis, the one who is intimately united with Me, who has taken refuge in Me and worships Me with faith and love, is the most devout.",
  "My true being is unborn and changeless. I am the Lord of all creatures.",
  "Whenever dharma declines and the purpose of life is forgotten, I manifest myself on earth.",
  "I am the heat of the fire, and I am the life of all that lives.",
  "The faith of each is in accordance with his nature.",
  "The embodied soul is eternal in existence, indestructible, and infinite.",
  "He who is contented with what comes to him without effort, who is free from the dualities and from envy, and who is steady in both success and failure, is never entangled, although performing actions."
];

const STORAGE_KEY = "krishna_puzzle_shown_questions_v6_mixed";

export default function QuestionPage({ useNoRepeat = true }) {
  const [current, setCurrent] = useState(null);
  const [answer, setAnswer] = useState("");
  const [solved, setSolved] = useState(false);
  const [quote, setQuote] = useState("");
  const [showHint, setShowHint] = useState(false);

  const getNewQuestion = useCallback(() => {
    let pool = QUESTION_BANK.map((q) => q.id);

    if (useNoRepeat && typeof localStorage !== "undefined") {
      try {
        const shownRaw = localStorage.getItem(STORAGE_KEY);
        const shown = shownRaw ? JSON.parse(shownRaw) : [];
        const filteredPool = pool.filter((id) => !shown.includes(id));
        
        if (filteredPool.length === 0) {
          localStorage.removeItem(STORAGE_KEY);
        } else {
          pool = filteredPool;
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
        if (!shown.includes(q.id)) {
            shown.push(q.id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(shown));
        }
      } catch {}
    }

    setCurrent(q);
    setAnswer("");
    setSolved(false);
    setShowHint(false);
    setQuote("");
  }, [useNoRepeat]);

  useEffect(() => {
    getNewQuestion();
  }, [getNewQuestion]);

  const checkAnswer = () => {
    if (!current) return;
    if (answer.trim().toLowerCase() === current.answer.trim().toLowerCase()) {
      setSolved(true);
      setQuote(KRISHNA_QUOTES[Math.floor(Math.random() * KRISHNA_QUOTES.length)]);
    } else {
      alert("Incorrect — please try again.");
    }
  };

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
            <p style={{ fontSize: 22, fontWeight: 600, marginBottom: 8, lineHeight: 1.4 }}>
              {current.question || "No question available"}
            </p>
            <div style={{ fontSize: 12, color: "#a0aec0", marginBottom: 20 }}>
              Question ID: {current.id}
            </div>

            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
              placeholder="Type your answer..."
              style={styles.input}
            />

            <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: 'center' }}>
              <button onClick={checkAnswer} style={styles.button}>
                Submit
              </button>
              <button
                onClick={() => setShowHint((s) => !s)}
                style={{ ...styles.button, background: "#4a5568", color: "#e2e8f0" }}
              >
                {showHint ? "Hide Hint" : "Show Hint"}
              </button>
              <button
                onClick={getNewQuestion}
                style={{ ...styles.button, background: "#dd6b20", color: "#fff" }}
              >
                Skip
              </button>
            </div>

            {showHint && (
              <div style={{ marginTop: 20, color: "#cbd5e0", background: '#2d3748', padding: '10px', borderRadius: '6px' }}>
                <strong>Hint:</strong> {current.hint || "—"}
              </div>
            )}
           
          </>
        ) : (
          <>
            <div style={{ fontSize: 48 }}>🎉</div>
            <h2 style={{ marginTop: 8, fontSize: 28, color: '#fff' }}>Correct!</h2>
            <blockquote style={{ margin: '20px auto', padding: '15px', fontStyle: "italic", background: '#2d3748', borderRadius: '8px', borderLeft: '4px solid #f6ad55', maxWidth: '90%' }}>
              <p style={{fontSize: 18, color: '#e2e8f0'}}>“{quote}”</p>
            </blockquote>

            <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: 'center' }}>
              <button onClick={getNewQuestion} style={styles.button}>
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
                style={{ ...styles.button, background: "#3182ce", color: "#fff" }}
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
    background: "#1a202c",
    padding: 20,
    fontFamily: 'sans-serif',
  },
  card: {
    width: "min(600px, 95%)",
    background: "#2d3748",
    color: "#e2e8f0",
    padding: '32px',
    borderRadius: 16,
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 8,
    border: "2px solid #4a5568",
    background: '#1a202c',
    color: '#e2e8f0',
    fontSize: 16,
    textAlign: "center",
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  button: {
    padding: "12px 20px",
    borderRadius: 8,
    border: "none",
    background: "#38a169",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 'bold',
    fontSize: '15px',
    transition: 'transform 0.1s',
  },
};

