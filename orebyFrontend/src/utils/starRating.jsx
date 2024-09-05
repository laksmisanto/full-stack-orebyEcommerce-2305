import { useState } from "react";

import { FaStar } from "react-icons/fa";

function Rating({ initialRating = 0, maxRating = 5, onChange }) {
  const [rating, setRating] = useState(initialRating);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleRatingChange(i)}
          className={`star ${rating >= i ? "filled" : "fill"}`}
        >
          <FaStar />
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="rating-container flex gap-1 cursor-pointer hover:fill-green-600">
      {renderStars()}
    </div>
  );
}

export default Rating;
