import React from "react";
import "./VegBadge.css";

/**
 * Standard Indian FSSAI Veg / Non-Veg Badge
 * - Veg: Green bordered square with filled green circle dot
 * - Non-Veg: Red bordered square with filled upward red triangle
 */
export default function VegBadge({
  isVeg,
  dietaryType,
  size = "md",
  showLabel = false,
  className = "",
  title,
}) {
  // Normalize veg status
  const isVegetarian =
    dietaryType !== undefined
      ? dietaryType === "veg"
      : isVeg === true || isVeg === 1 || isVeg === "1";

  const typeClass = isVegetarian ? "veg" : "non_veg";
  const defaultTitle = isVegetarian ? "Pure Veg" : "Non-Veg";
  const badgeTitle = title || defaultTitle;

  // Sizing dimensions for SVG
  const dim = size === "sm" ? 14 : size === "lg" ? 22 : 17;
  const innerDotR = size === "sm" ? 3 : size === "lg" ? 5 : 4;
  const triPoints =
    size === "sm"
      ? "7,3 3,10 11,10"
      : size === "lg"
      ? "11,4 5,16 17,16"
      : "8.5,3.5 4,12.5 13,12.5";

  return (
    <span
      className={`veg_badge_wrapper ${className}`}
      title={badgeTitle}
      aria-label={badgeTitle}
    >
      <span className={`veg_badge_icon ${typeClass} size-${size}`}>
        <svg
          width={dim}
          height={dim}
          viewBox={`0 0 ${dim} ${dim}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isVegetarian ? (
            <circle
              cx={dim / 2}
              cy={dim / 2}
              r={innerDotR}
              fill="#16a34a"
            />
          ) : (
            <polygon
              points={triPoints}
              fill="#b91c1c"
            />
          )}
        </svg>
      </span>

      {showLabel && (
        <span className={`veg_badge_text ${typeClass}`}>
          {isVegetarian ? "Veg" : "Non-Veg"}
        </span>
      )}
    </span>
  );
}
