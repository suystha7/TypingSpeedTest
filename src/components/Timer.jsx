import PropTypes from "prop-types";

const Timer = ({ timer, duration }) => {
  return (
    <div
      className="progress-bar"
      style={{
        backgroundColor: duration - timer < 5 ? "red" : "",
        transition: "background-color 0.5s ease",
      }}
    >
      <div
        style={{
          width: `${(timer / duration) * 100}%`,
          transition: "width 1s ease-in-out",
        }}
      ></div>
    </div>
  );
};

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};

export default Timer;
