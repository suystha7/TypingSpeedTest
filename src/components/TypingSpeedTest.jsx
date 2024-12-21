import { useState, useEffect } from "react";
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import { PlayArrow, RestartAlt } from "@mui/icons-material";
import "./TypingSpeedTest.css";
import { quotes } from "..";

const generateRandomText = (difficulty, field) => {
  const fieldQuotes = quotes[difficulty]?.[field] || [];
  if (fieldQuotes.length === 0)
    return "No quotes available for this combination.";
  return fieldQuotes[Math.floor(Math.random() * fieldQuotes.length)];
};

const TypingSpeedTest = () => {
  const [settings, setSettings] = useState({
    difficulty: "easy",
    duration: 15,
    field: "science",
  });
  const [testState, setTestState] = useState({
    isActive: false,
    startTime: 0,
    timer: 0,
    currentText: "",
    typedText: "",
    correctCharacters: 0,
    typedCharacters: 0,
  });
  const [results, setResults] = useState({ wpm: 0, accuracy: 0 });

  useEffect(() => {
    let interval;
    if (testState.isActive && testState.timer < settings.duration) {
      interval = setInterval(() => {
        setTestState((prev) => ({
          ...prev,
          timer: Math.floor((Date.now() - prev.startTime) / 1000),
        }));
      }, 1000);
    } else if (testState.timer >= settings.duration) {
      stopTest();
    }
    return () => clearInterval(interval);
  }, [testState.isActive, testState.timer, settings.duration]);

  const startTest = () => {
    const randomText = generateRandomText(settings.difficulty, settings.field);
    setTestState({
      isActive: true,
      startTime: Date.now(),
      timer: 0,
      currentText: randomText,
      typedText: "",
      correctCharacters: 0,
      typedCharacters: 0,
    });
    setResults({ wpm: 0, accuracy: 0 });
  };

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

  const restartTest = () => {
    setResults({ wpm: 0, accuracy: 0 });
    setTestState({
      isActive: false,
      startTime: 0,
      timer: 0,
      currentText: "",
      typedText: "",
      correctCharacters: 0,
      typedCharacters: 0,
    });
  };

  return (
    <>
      <h1 className="title">Typing Speed Test</h1>
      <div className="container">
        {!testState.isActive && results.wpm === 0 && (
          <div className="settings">
            <InputLabel>Difficulty</InputLabel>
            <FormControl fullWidth>
              <Select
                value={settings.difficulty}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    difficulty: e.target.value,
                  }))
                }
              >
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
              </Select>
            </FormControl>

            <InputLabel>Field</InputLabel>
            <FormControl fullWidth>
              <Select
                value={settings.field}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, field: e.target.value }))
                }
              >
                <MenuItem value="science">Science</MenuItem>
                <MenuItem value="web development">Web Development</MenuItem>
                <MenuItem value="psychology">Psychology</MenuItem>
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="ALML">AI/ML</MenuItem>
                <MenuItem value="IOT">IOT</MenuItem>
                <MenuItem value="GK">General Knowledge</MenuItem>
                <MenuItem value="sociology">Sociology</MenuItem>
              </Select>
            </FormControl>

            <InputLabel>Duration</InputLabel>
            <FormControl fullWidth>
              <Select
                value={settings.duration}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    duration: parseInt(e.target.value, 10),
                  }))
                }
              >
                <MenuItem value={15}>15 seconds</MenuItem>
                <MenuItem value={30}>30 seconds</MenuItem>
                <MenuItem value={60}>60 seconds</MenuItem>
              </Select>
            </FormControl>

            <Button
              fullWidth
              style={{
                justifyContent: "center",
                alignContent: "center",
                display: "flex",
                marginTop: "1rem",
              }}
              onClick={startTest}
              variant="outlined"
              color="success"
              startIcon={<PlayArrow />}
            >
              Start Test
            </Button>
          </div>
        )}

        {testState.isActive && (
          <div className="test-section">
            <div className="test-card">
              <div className="title-card">
                <p className="text-display">"{testState.currentText}"</p>
                <p>
                  <strong>Difficulty:</strong>{" "}
                  {settings.difficulty.charAt(0).toUpperCase() +
                    settings.difficulty.slice(1)}
                </p>
              </div>

              <TextField
                value={testState.typedText}
                onChange={handleInputChange}
                placeholder="Start typing here..."
                fullWidth
                multiline
                variant="outlined"
                disabled={!testState.isActive}
              />

              <div className="progress-bar">
                <div
                  style={{
                    width: `${(testState.timer / settings.duration) * 100}%`, // Calculate progress as a percentage
                  }}
                ></div>
              </div>

              <div className="stats">
                <p>
                  <strong>Time Left:</strong>{" "}
                  {settings.duration - testState.timer}s
                </p>
                <p>
                  <strong>WPM:</strong> {results.wpm}
                </p>
                <p>
                  <strong>Accuracy:</strong> {results.accuracy}%
                </p>
              </div>
            </div>
          </div>
        )}

        {!testState.isActive && results.wpm > 0 && (
          <div className="results">
            <h2>Results:</h2>
            <p>
              <strong>Typing Speed:</strong>
              <span className="result-value"> {results.wpm}</span> wpm
            </p>
            <p>
              <strong>Accuracy:</strong>{" "}
              <span className="result-value">{results.accuracy}</span>%
            </p>
            <Button
              fullWidth
              onClick={restartTest}
              variant="outlined"
              color="error"
              startIcon={<RestartAlt />}
            >
              Restart Test
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default TypingSpeedTest;
