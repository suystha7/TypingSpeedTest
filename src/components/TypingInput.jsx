import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const TypingInput = ({ typedText, onChange, disabled }) => (
  <TextField
    value={typedText}
    onChange={onChange}
    placeholder="Start typing here..."
    fullWidth
    multiline
    variant="outlined"
    disabled={disabled}
  />
);

TypingInput.propTypes = {
  typedText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default TypingInput;
