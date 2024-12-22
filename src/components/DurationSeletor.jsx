import PropTypes from "prop-types";
import { InputLabel, FormControl, Select, MenuItem } from "@mui/material";

const DurationSelector = ({ duration, onChange }) => (
  <div>
    <InputLabel>Duration</InputLabel>
    <FormControl fullWidth>
      <Select value={duration} onChange={onChange}>
        <MenuItem value={15}>15 seconds</MenuItem>
        <MenuItem value={30}>30 seconds</MenuItem>
      </Select>
    </FormControl>
  </div>
);

DurationSelector.propTypes = {
  duration: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DurationSelector;
