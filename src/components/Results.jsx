import PropTypes from "prop-types"; 
import { Button } from "@mui/material";
import { RestartAlt } from "@mui/icons-material";

const Results = ({ wpm, accuracy, onRestart }) => (
  <div className="results">
    <h2>Results:</h2>
    <p>
      <strong>Typing Speed:</strong>{" "}
      <span
        className="result-value"
        style={{
          color: wpm < 50 ? "red" : wpm < 80 ? "orange" : "green",
        }}
      >
        {wpm}
      </span>{" "}
      wpm
    </p>
    <p>
      <strong>Accuracy:</strong>{" "}
      <span
        className="result-value"
        style={{
          color: accuracy < 50 ? "red" : accuracy < 80 ? "orange" : "green",
        }}
      >
        {accuracy}
      </span>
      %
    </p>
    <Button
      fullWidth
      onClick={onRestart}
      variant="outlined"
      color="error"
      startIcon={<RestartAlt />}
    >
      Restart
    </Button>
  </div>
);

Results.propTypes = {
  wpm: PropTypes.number.isRequired,
  accuracy: PropTypes.number.isRequired,  
  onRestart: PropTypes.func.isRequired,   
};

export default Results;
