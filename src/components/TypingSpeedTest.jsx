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

const generateRandomText = (field) => {
  const fieldQuotes = quotes[field] || [];
  const randomQuote =
    fieldQuotes[Math.floor(Math.random() * fieldQuotes.length)];

  return randomQuote;
};

const TypingSpeedTest = () => {
  const [settings, setSettings] = useState({
    difficulty: "easy",
    duration: 15,
    field: "science",
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

  const startTest = () => {
    const randomText = generateRandomText(settings.field);
    setTestState({
      isActive: true,
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
              <p
                className="text-display"
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#333",
                  marginBottom: "20px",
                }}
              >
                "{testState.currentText}"
              </p>

              <TextField
                value={testState.typedText}
                onChange={handleInputChange}
                placeholder="Start typing here..."
                fullWidth
                multiline
                variant="outlined"
                disabled={!testState.isActive}
              />

              <div
                className="progress-bar"
                style={{
                  height: "10px",
                  width: "100%",
                  backgroundColor: "#e0e0e0",
                  borderRadius: "5px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(testState.timer / settings.duration) * 100}%`,
                    backgroundColor: "#4caf50",
                    borderRadius: "5px",
                  }}
                ></div>
              </div>

              <div
                className="stats"
                style={{ textAlign: "center", fontSize: "18px" }}
              >
                <p style={{ margin: "5px 0" }}>
                  <strong>Time Left:</strong>{" "}
                  {settings.duration - testState.timer}s
                </p>
                <p style={{ margin: "5px 0" }}>
                  <strong>WPM:</strong>{" "}
                  {Math.round(
                    (testState.typedText.split(/\s+/).length /
                      testState.timer) *
                      60
                  ) || 0}
                </p>
                <p style={{ margin: "5px 0" }}>
                  <strong>Accuracy:</strong>{" "}
                  {(
                    (testState.correctCharacters / testState.typedCharacters) *
                    100
                  ).toFixed(2) || 0}
                  %
                </p>
              </div>
            </div>
          </div>
        )}

        {!testState.isActive && results.wpm > 0 && (
          <div
            className="results"
          >
            <h2
            >
              Results:
            </h2>
            <div style={{ marginBottom: "10px", fontSize: "20px" }}>
              <p>
                <strong>Typing Speed:</strong>{" "}
                <span className="result-value">{results.wpm}</span> wpm
              </p>
              <p>
                <strong>Accuracy:</strong>{" "}
                <span className="result-value">{results.accuracy}</span>%
              </p>
            </div>
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
