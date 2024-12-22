import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { quotes } from "..";
import DifficultySelector from "../components/DifficultySelector";
import FieldSelector from "../components/FieldSelector";
import DurationSelector from "../components/DurationSeletor";
import TextDisplay from "../components/TextDisplay";
import Results from "./Results";
import Timer from "../components/Timer";
import TypingInput from "../components/TypingInput";
import { formatTime } from "../utils/format";

const generateRandomText = (difficulty, field) => {
  const fieldQuotes = quotes[difficulty]?.[field] || [];
  if (fieldQuotes.length === 0)
    return "No quotes available for this combination.";
  return fieldQuotes[Math.floor(Math.random() * fieldQuotes.length)];
};

const TypingSpeed = () => {
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
    startedTyping: false,
  });
  const [results, setResults] = useState({ wpm: 0, accuracy: 0 });

  useEffect(() => {
    let interval;
    if (
      testState.isActive &&
      testState.startedTyping &&
      testState.timer < settings.duration
    ) {
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
  }, [
    testState.isActive,
    testState.timer,
    settings.duration,
    testState.startedTyping,
    testState.stopTest,
  ]);

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
      startedTyping: false,
    });
    setResults({ wpm: 0, accuracy: 0 });
  };

  const stopTest = () => {
    setTestState((prev) => ({ ...prev, isActive: false }));
    const wordsTyped = testState.typedText.trim().split(/\s+/).length;
    const totalDurationInMinutes = settings.duration / 60;
    const wpm = wordsTyped / totalDurationInMinutes;
    const accuracy =
      testState.typedCharacters > 0
        ? (
            (testState.correctCharacters / testState.typedCharacters) *
            100
          ).toFixed(2)
        : 0;

    setResults({
      wpm: Math.round(wpm),
      accuracy: parseFloat(accuracy),
    });
  };

  const handleInputChange = (e) => {
    const input = e.target.value;

    if (input.length > testState.currentText.length) {
      return;
    }

    if (!testState.startedTyping) {
      setTestState((prev) => ({
        ...prev,
        startTime: Date.now(),
        startedTyping: true,
      }));
    }

    const correctCharacters = Array.from(input).reduce((count, char, index) => {
      return count + (char === testState.currentText[index] ? 1 : 0);
    }, 0);

    setTestState((prev) => ({
      ...prev,
      typedText: input,
      typedCharacters: input.length,
      correctCharacters,
    }));

    const wordsTyped = input.trim().split(/\s+/).length;
    const wpm = wordsTyped / (testState.timer / 60);
    const accuracy =
      input.length > 0
        ? ((correctCharacters / input.length) * 100).toFixed(2)
        : 0;

    setResults({
      wpm: Math.round(wpm),
      accuracy: parseFloat(accuracy),
    });
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
      startedTyping: false,
    });
  };

  const getTitle = () => {
    if (!testState.isActive && results.wpm === 0) {
      return "Want to know your typing speed ?";
    }
    if (testState.isActive) {
      return "Let's start typing";
    }
    return "Result you obtained";
  };

  return (
    <>
      <h1 className="title">{getTitle()}</h1>
      <div className="container">
        {!testState.isActive && results.wpm === 0 && (
          <div className="settings">
            <DifficultySelector
              difficulty={settings.difficulty}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  difficulty: e.target.value,
                }))
              }
            />
            <FieldSelector
              field={settings.field}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, field: e.target.value }))
              }
            />
            <DurationSelector
              duration={settings.duration}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  duration: parseInt(e.target.value, 10),
                }))
              }
            />
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
              Start
            </Button>
          </div>
        )}

        {testState.isActive && (
          <div className="test-section">
            <div className="test-card">
              <Timer timer={testState.timer} duration={settings.duration} />
              <TextDisplay
                currentText={testState.currentText}
                typedText={testState.typedText}
              />
              <TypingInput
                typedText={testState.typedText}
                onChange={handleInputChange}
                disabled={!testState.isActive}
              />
              <div className="stats">
                <p>
                  <strong>Time Left:</strong>{" "}
                  {formatTime(settings.duration - testState.timer)}
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
          <Results
            wpm={results.wpm}
            accuracy={results.accuracy}
            onRestart={restartTest}
          />
        )}
      </div>
    </>
  );
};

export default TypingSpeed;
