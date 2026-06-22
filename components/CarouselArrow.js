import * as React from "react";
// import appImages from '../Themes/AppImages'

const CarouselArrow = ({ direction, onClick, isIconVisible }) => {
    let leftArrowClassName = "leftArrow"
    let rightArrowClassName = "rightArrow"
    let classes = `c-arrow  ${direction == "left" ? leftArrowClassName : rightArrowClassName}`;
    return (
        <span className={classes} onClick={onClick} style={{ position: 'absolute' }}>
            {direction == "right" ?
                <img alt="arrowLeft" src={"../images/forword1.png"} style={{ opacity: isIconVisible ? 1 : 0 }} className="arrowImageLeft" /> :
                <img alt="arrowRight" src={"../images/back1.png"} style={{ opacity: isIconVisible ? 1 : 0 }} className="arrowImageLeft"  />
            }
        </span>
    )
}

export default CarouselArrow