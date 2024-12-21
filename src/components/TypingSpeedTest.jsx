import { useState, useEffect } from "react";
import "./TypingSpeedTest.css";

const TypingSpeedTest = () => {
  const sampleTexts = {
    easy: [
      "The quick brown fox jumps over the lazy dog. It's a classic sentence to use all letters of the alphabet.",
    ],
    medium: [
      "Frontend development includes HTML, CSS, and JavaScript. These are the building blocks of modern web development.",
    ],
    hard: [
      "Advanced JavaScript concepts include closures, promises, and async-await. Mastering these is essential for developers.",
    ],
  };

  const [settings, setSettings] = useState({
    difficulty: "easy",
    duration: 15,
  });
  const [testState, setTestState] = useState({
    isActive: false,
    timer: 0,
    currentText: "",
    typedText: "",
    correctCharacters: 0,
    typedCharacters: 0,
  });
  const [results, setResults] = useState({ wpm: 0, accuracy: 0 });

  // Timer Management
  useEffect(() => {
    let interval;
    if (testState.isActive && testState.timer < settings.duration) {
      interval = setInterval(() => {
        setTestState((prev) => ({ ...prev, timer: prev.timer + 1 }));
      }, 1000);
    } else if (testState.timer >= settings.duration) {
      stopTest();
    }
    return () => clearInterval(interval);
  }, [testState.isActive, testState.timer, settings.duration]);

  // Start the test
  const startTest = () => {
    const randomIndex = Math.floor(
      Math.random() * sampleTexts[settings.difficulty].length
    );
    setTestState({
      isActive: true,
      timer: 0,
      currentText: sampleTexts[settings.difficulty][randomIndex],
      typedText: "",
      correctCharacters: 0,
      typedCharacters: 0,
    });
    setResults({ wpm: 0, accuracy: 0 });
  };

  // Stop the test and calculate results
  const stopTest = () => {
    setTestState((prev) => ({ ...prev, isActive: false }));
    const wordsTyped = testState.typedText.trim().split(/\s+/).length;
    const wpm = Math.round((wordsTyped / settings.duration) * 60);
    const accuracy = (
      (testState.correctCharacters / testState.typedCharacters) *
      100
    ).toFixed(2);
    setResults({
      wpm,
      accuracy: isNaN(accuracy) ? 0 : parseFloat(accuracy),
    });
  };

  // Handle input changes during typing
  const handleInputChange = (e) => {
    const input = e.target.value;
    const correctCharacters = Array.from(input).reduce((count, char, index) => {
      return count + (char === testState.currentText[index] ? 1 : 0);
    }, 0);

    setTestState((prev) => ({
      ...prev,
      typedText: input,
      typedCharacters: input.length,
      correctCharacters,
    }));
  };

  // Restart the test
  const restartTest = () => {
    setResults({ wpm: 0, accuracy: 0 });
    setTestState({
      isActive: false,
      timer: 0,
      currentText: "",
      typedText: "",
      correctCharacters: 0,
      typedCharacters: 0,
    });
  };

  return (
    <div className="container">
      <h1 className="title">Typing Speed Test</h1>

      {!testState.isActive && results.wpm === 0 && (
        <div className="settings">
          <label>Difficulty:</label>
          <select
            value={settings.difficulty}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, difficulty: e.target.value }))
            }
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <label>Duration:</label>
          <select
            value={settings.duration}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                duration: parseInt(e.target.value, 10),
              }))
            }
          >
            <option value={15}>15 seconds</option>
            <option value={30}>30 seconds</option>
            <option value={60}>60 seconds</option>
          </select>

          <button onClick={startTest} className="btn">
            Start Test
          </button>
        </div>
      )}

      {testState.isActive && (
        <div className="test-section">
          <p className="text-display">{testState.currentText}</p>
          <textarea
            value={testState.typedText}
            onChange={handleInputChange}
            placeholder="Start typing here..."
            disabled={!testState.isActive}
          ></textarea>
          <div
            className="progress-bar"
            style={{ width: `${(testState.timer / settings.duration) * 100}%` }}
          ></div>

          <div className="stats">
            <p>Time Left: {settings.duration - testState.timer}s</p>
            <p>
              WPM:{" "}
              {Math.round(
                (testState.typedText.split(/\s+/).length / testState.timer) * 60
              ) || 0}
            </p>
            <p>
              Accuracy:{" "}
              {(
                (testState.correctCharacters / testState.typedCharacters) *
                100
              ).toFixed(2) || 0}
              %
            </p>
          </div>
        </div>
      )}

      {!testState.isActive && results.wpm > 0 && (
        <div className="results">
          <h2>Results:</h2>
          <p>
            Typing Speed: <span className="result-value">{results.wpm}</span>{" "}
            WPM
          </p>
          <p>
            Accuracy: <span className="result-value">{results.accuracy}</span>%
          </p>
          <button onClick={restartTest} className="btn">
            Restart Test
          </button>
        </div>
      )}
    </div>
  );
};

export default TypingSpeedTest;
