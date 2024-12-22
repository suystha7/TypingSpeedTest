import PropTypes from "prop-types";
import { Typography } from "@mui/material";

const StatDisplay = ({ label, value, color }) => (
  <Typography variant="body1">
    <div className="result-box">
      <strong className="result-text">{label}: </strong>
      <span className="result-value" style={{ color }}>
        {value}
      </span>
    </div>
  </Typography>
);

StatDisplay.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  color: PropTypes.string.isRequired,
};

export default StatDisplay;
