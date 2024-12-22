import PropTypes from "prop-types";
import { InputLabel, FormControl, Select, MenuItem } from "@mui/material";

const FieldSelector = ({ field, onChange }) => (
  <div>
    <InputLabel>Field</InputLabel>
    <FormControl fullWidth>
      <Select value={field} onChange={onChange}>
        <MenuItem value="MERN">MERN</MenuItem>
        <MenuItem value="CSS">CSS</MenuItem>
        <MenuItem value="HTML">HTML</MenuItem>
        <MenuItem value="JavaScript">JavaScript</MenuItem>
        <MenuItem value="Quality Assurance">Quality Assurance</MenuItem>
        <MenuItem value="UI/UX">UI/UX</MenuItem>
        <MenuItem value="Project Manager">Project Manager</MenuItem>
        <MenuItem value="DevOps">DevOps</MenuItem>
        <MenuItem value="AI">AI</MenuItem>
        <MenuItem value="ML">ML</MenuItem>
      </Select>
    </FormControl>
  </div>
);

FieldSelector.propTypes = {
  field: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FieldSelector;
