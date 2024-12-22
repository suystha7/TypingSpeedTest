import PropTypes from "prop-types";
import { InputLabel, FormControl, Select, MenuItem } from "@mui/material";

const DifficultySelector = ({ difficulty, onChange }) => (
  <div>
    <InputLabel>Difficulty</InputLabel>
    <FormControl fullWidth>
      <Select value={difficulty} onChange={onChange}>
        <MenuItem value="easy">Easy</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="hard">Hard</MenuItem>
      </Select>
    </FormControl>
  </div>
);

DifficultySelector.propTypes = {
  difficulty: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default DifficultySelector;
