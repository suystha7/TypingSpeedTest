import PropTypes from "prop-types";
import { Star } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

const RatingStars = ({ stars }) => {
  const getEmoji = (stars) => {
    if (stars === 5) return "😊😊😊😊😊";
    if (stars === 4) return "😊😊😊😊😄";
    if (stars === 3) return "😊😊😊😐";
    if (stars === 2) return "😊😊😞";
    return "😊😞😞"; 
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <div>
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            style={{
              color: index < stars ? "#FFD700" : "#E0E0E0",
              fontSize: "24px",
              marginBottom: "8px",
            }}
          />
        ))}

        <Typography
          variant="body2"
          style={{ marginLeft: "8px", fontSize: "24px" }}
        >
          {getEmoji(stars)}
        </Typography>
      </div>
    </Box>
  );
};

RatingStars.propTypes = {
  stars: PropTypes.number.isRequired,
};

export default RatingStars;
