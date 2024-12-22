import PropTypes from "prop-types"; 
import { InputLabel, FormControl, Select, MenuItem } from "@mui/material";

const FieldSelector = ({ field, onChange }) => (
  <div>
    <InputLabel>Field</InputLabel>
    <FormControl fullWidth>
      <Select value={field} onChange={onChange}>
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
  </div>
);

FieldSelector.propTypes = {
  field: PropTypes.string.isRequired,   
  onChange: PropTypes.func.isRequired,  
};

export default FieldSelector;
