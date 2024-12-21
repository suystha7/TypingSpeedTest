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

// Function to generate random text based on selected field
const generateRandomText = (field) => {
  const quotes = {
    science: [
      "Science is the belief in the ignorance of the experts.",
      "The important thing is not to stop questioning.",
      "Science is a way of thinking much more than it is a body of knowledge.",
    ],
    "web development": [
      "Web development is not just about writing code, it's about creating experiences.",
      "The best way to predict the future of web development is to create it.",
      "Design is not just what it looks like and feels like. Design is how it works.",
    ],
    psychology: [
      "The unexamined life is not worth living.",
      "Psychology is the study of behavior, not just the study of mind.",
      "Mental health is not a destination, but a process.",
    ],
    IT: [
      "IT is not just about hardware and software, it’s about how we use technology to solve problems.",
      "The great myth of our age is that IT is separate from the business.",
      "Information technology is a tool, not the solution.",
    ],
    ALML: [
      "Artificial intelligence is the new electricity.",
      "The future belongs to those who embrace artificial intelligence and machine learning.",
      "Machine learning is a key element of AI, where systems learn from data and improve over time.",
    ],
    IOT: [
      "The Internet of Things is transforming the way we live and work.",
      "In IoT, we have a combination of software, sensors, and the internet working together.",
      "The future of IoT is endless possibilities.",
    ],
    GK: [
      "Knowledge is power.",
      "An investment in knowledge pays the best interest.",
      "The more that you read, the more things you will know.",
    ],
    sociology: [
      "Sociology is the study of society and human behavior.",
      "Sociology helps us understand the complex relationship between individuals and society.",
      "The study of sociology is not just about understanding society, but about changing it.",
    ],
  };

  // Pick a random quote from the selected field
  const fieldQuotes = quotes[field] || [];
  const randomQuote =
    fieldQuotes[Math.floor(Math.random() * fieldQuotes.length)];

  return randomQuote;
};

const TypingSpeedTest = () => {
  const [settings, setSettings] = useState({
    difficulty: "easy",
    duration: 15,
    field: "science", // Default field set to science
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
              {/* Display Text */}
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

              {/* Textfield Input */}
              <TextField
                value={testState.typedText}
                onChange={handleInputChange}
                placeholder="Start typing here..."
                fullWidth
                multiline
                variant="outlined"
                disabled={!testState.isActive}
              />

              {/* Progress Bar */}
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

              {/* Statistics */}
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
          <div className="results">
            <h2>Results:</h2>
            <p>
              Typing Speed: <span className="result-value">{results.wpm}</span>{" "}
              WPM
            </p>
            <p>
              Accuracy: <span className="result-value">{results.accuracy}</span>
              %
            </p>
            <Button
              onClick={restartTest}
              variant="contained"
              color="success"
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
