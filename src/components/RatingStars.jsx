"use client";

export default function RatingStars({ rating = 0, size = 22 }) {
  // Ensure the rating is a number, handling string input like "4.5"
  const numericRating = parseFloat(rating);
  
  const maxStars = 5;
  
  const safeRating = Math.min(numericRating || 0, maxStars);
  const fullStars = Math.floor(safeRating);
  const hasHalf = safeRating % 1 >= 0.5;

  // Your Star SVG, now confirmed to be used correctly with currentColor
  const StarSVG = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 21" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.7255 1.38797C9.32681 -0.462659 11.945 -0.462657 12.5463 1.38798L13.68 4.87725C13.9489 5.70488 14.7202 6.26522 15.5904 6.26522H19.2592C21.2051 6.26522 22.0141 8.75523 20.4399 9.89899L17.4718 12.0555C16.7677 12.567 16.4731 13.4736 16.7421 14.3013L17.8758 17.7905C18.4771 19.6412 16.359 21.1801 14.7847 20.0363L11.8166 17.8798C11.1125 17.3683 10.1592 17.3683 9.4552 17.8798L6.48705 20.0363C4.91281 21.1801 2.79468 19.6412 3.39599 17.7905L4.52972 14.3013C4.79863 13.4736 4.50404 12.567 3.80002 12.0555L0.831864 9.89899C-0.742378 8.75523 0.0666764 6.26522 2.01255 6.26522H5.68139C6.55161 6.26522 7.32286 5.70488 7.59177 4.87725L8.7255 1.38797Z"
        fill="currentColor"
      />
    </svg>
  );

  // Define colors for clarity
  const filledColor = "#1E1E1E"; // Black
  const emptyColor = "#E0E0E0"; // Light Gray

  return (
    <div className="flex gap-1">
      {/* Full stars (Black) */}
      {[...Array(fullStars)].map((_, i) => (
        <div key={`full-${i}`} style={{ color: filledColor }}>
          {StarSVG}
        </div>
      ))}

      {/* ⭐️ Half star ⭐️ */}
      {hasHalf && (
        <div
          style={{
            position: "relative",
            width: size,
            height: size,
          }}
        >
          {/* Layer 1: The completely empty star on the bottom */}
          <div style={{ color: emptyColor, position: 'absolute', top: 0, left: 0 }}>
            {StarSVG}
          </div>

          {/* Layer 2: A container showing only the left 50% of the filled star */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "50%", // Only show the left half
              height: "100%",
              overflow: "hidden", // Crucial for clipping the filled star
              color: filledColor, // The filled color
            }}
          >
            {StarSVG}
          </div>
        </div>
      )}

      {/* The EMPTY STARS block has been removed. 
        The component now only renders the calculated full and half stars.
      */}
    </div>
  );
}