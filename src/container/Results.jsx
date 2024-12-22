import PropTypes from "prop-types";
import { Button, Typography } from "@mui/material";
import { RestartAlt } from "@mui/icons-material";
import Feedback from "../components/Feedback";
import RatingStars from "../components/RatingStars";
import StatDisplay from "../components/StatDisplay";

const Results = ({ wpm, accuracy, onRestart }) => {
  const getWpmFeedback = (wpm) => {
    if (wpm < 50) return "Keep practicing to improve your speed!";
    if (wpm < 80) return "Good job! You're getting there!";
    return "Excellent typing speed! Well done!";
  };

  const getAccuracyFeedback = (accuracy) => {
    if (accuracy < 50) return "Focus on accuracy to avoid mistakes.";
    if (accuracy < 80) return "Nice accuracy! Keep improving!";
    return "Outstanding accuracy! Keep up the great work!";
  };

  const getRating = (wpm, accuracy) => {
    const average = (wpm + accuracy) / 2;
    if (average >= 90) return { stars: 5, text: "Exceptional" };
    if (average >= 75) return { stars: 4, text: "Great" };
    if (average >= 50) return { stars: 3, text: "Good" };
    return { stars: 2, text: "Needs Improvement" };
  };

  const wpmFeedback = getWpmFeedback(wpm);
  const accuracyFeedback = getAccuracyFeedback(accuracy);
  const { stars, text } = getRating(wpm, accuracy);

  return (
    <div className="results">
      <div className="stats-box">
        <StatDisplay
          label="Typing Speed"
          value={`${wpm} wpm`}
          color={wpm < 50 ? "red" : wpm < 80 ? "orange" : "green"}
        />
        <StatDisplay
          label="Accuracy"
          value={`${accuracy}%`}
          color={accuracy < 50 ? "red" : accuracy < 80 ? "orange" : "green"}
        />
      </div>

      <Feedback wpmFeedback={wpmFeedback} accuracyFeedback={accuracyFeedback} />
      <RatingStars stars={stars} />

      <Typography
        variant="body2"
        style={{
          textAlign: "center",
          marginTop: "8px",
          fontWeight: "bold",
          color: "#555",
        }}
      >
        {text} ({stars} / 5 stars)
      </Typography>

      <div className="button-container">
        <Button
          onClick={onRestart}
          variant="outlined"
          color="error"
          startIcon={<RestartAlt />}
          style={{ marginTop: "16px" }}
        >
          Restart
        </Button>
      </div>
    </div>
  );
};

Results.propTypes = {
  wpm: PropTypes.number.isRequired,
  accuracy: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired,
};

export default Results;
