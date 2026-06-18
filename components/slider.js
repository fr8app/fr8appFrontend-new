import React from "react";
import appImages from "../constants/appImages";

const CarouselArrow = ({ direction, onClick }) => {
  let leftArrowClassName = "leftArrow";
  let rightArrowClassName = "rightArrow";
  let classes = `c-arrow  ${
    direction == "left" ? leftArrowClassName : rightArrowClassName
  }`;
  return (
    <span
      className={classes}
      onClick={onClick}
      style={{ position: "absolute" }}
    >
      {direction == "right" ? (
        <img src={appImages.moon} className="arrowImage" />
      ) : (
        <img src={appImages.sun} className="arrowImage" />
      )}
    </span>
  );
};

export default CarouselArrow;
