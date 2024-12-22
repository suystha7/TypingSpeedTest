import PropTypes from "prop-types";
import { Typography } from "@mui/material";

const Feedback = ({ wpmFeedback, accuracyFeedback }) => (
  <Typography
    variant="body2"
    className="summary"
    style={{
      marginTop: "20px",
      marginBottom: "20px",
      fontStyle: "italic",
      fontWeight: "700",
      textAlign: "center",
      fontSize: "0.9rem",
    }}
  >
    {wpmFeedback} <br /> {accuracyFeedback}
  </Typography>
);

Feedback.propTypes = {
  wpmFeedback: PropTypes.string.isRequired,
  accuracyFeedback: PropTypes.string.isRequired,
};

export default Feedback;
