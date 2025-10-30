"use client";

export default function RatingStars({
  rating = 0,
  size = 22,
  maxStars = 5,
  filledColor = "#1E1E1E",
  emptyColor = "#E0E0E0",
  responsiveSizes, // { sm: 14, md: 18, lg: 22 }
  className = "",
}) {
  const numericRating = parseFloat(rating);
  const safeRating = Math.min(numericRating || 0, maxStars);
  const fullStars = Math.floor(safeRating);
  const hasHalf = safeRating % 1 >= 0.5;

  // Compute size dynamically if responsiveSizes provided
  const getResponsiveSize = () => {
    if (typeof window === "undefined" || !responsiveSizes) return size;

    const width = window.innerWidth;
    if (width < 640 && responsiveSizes.sm) return responsiveSizes.sm; // mobile
    if (width < 1024 && responsiveSizes.md) return responsiveSizes.md; // tablet
    if (responsiveSizes.lg) return responsiveSizes.lg; // desktop
    return size;
  };

  const actualSize = getResponsiveSize();

  const StarSVG = (
    <svg 
      width={actualSize}
      height={actualSize}
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.7255 1.38797C9.32681 -0.462659 11.945 -0.462657 12.5463 1.38798L13.68 4.87725C13.9489 5.70488 14.7202 6.26522 15.5904 6.26522H19.2592C21.2051 6.26522 22.0141 8.75523 20.4399 9.89899L17.4718 12.0555C16.7677 12.567 16.4731 13.4736 16.7421 14.3013L17.8758 17.7905C18.4771 19.6412 16.359 21.1801 14.7847 20.0363L11.8166 17.8798C11.1125 17.3683 10.1592 17.3683 9.4552 17.8798L6.48705 20.0363C4.91281 21.1801 2.79468 19.6412 3.39599 17.7905L4.52972 14.3013C4.79863 13.4736 4.50404 12.567 3.80002 12.0555L0.831864 9.89899C-0.742378 8.75523 0.0666764 6.26522 2.01255 6.26522H5.68139C6.55161 6.26522 7.32286 5.70488 7.59177 4.87725L8.7255 1.38797Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <div className={`flex self-start gap-1 ${className}`}>
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`}  className="inline-flex items-center justify-center shrink-0" style={{ color: filledColor }}>
          {StarSVG}
        </span>
      ))}

      {/* Half star */}
      {hasHalf && (
        <div style={{ position: "relative", width: actualSize, height: actualSize }}>
          <div style={{ color: emptyColor, position: "absolute", top: 0, left: 0 }}>
            {StarSVG}
          </div>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "50%",
              height: "100%",
              overflow: "hidden",
              color: filledColor,
            }}
          >
            {StarSVG}
          </div>
        </div>
      )}
    </div>
  );
}
