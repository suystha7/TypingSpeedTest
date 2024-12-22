import PropTypes from "prop-types";

const TextDisplay = ({ currentText, typedText }) => {
  const getTextWithHighlights = () => {
    return [...currentText].map((char, index) => {
      const typedChar = typedText[index] || "";
      const isCorrect = char === typedChar;

      if (char === " " && typedChar === " ") {
        return <span key={index}> </span>;
      }

      return (
        <span
          key={index}
          style={{
            color: isCorrect ? "green" : typedChar ? "red" : "black",
          }}
        >
          {char}
        </span>
      );
    });
  };

  return <p className="text-display">&quot;{getTextWithHighlights()}&quot;</p>;
};

TextDisplay.propTypes = {
  currentText: PropTypes.string.isRequired,
  typedText: PropTypes.string.isRequired,
};

export default TextDisplay;
