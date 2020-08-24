import React, { useState } from 'react';
import '../home/slider.scss';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';
import ArrowLeftRoundedIcon from '@material-ui/icons/ArrowLeftRounded';

const Slider = () => {
  let sliderArr = [
    <div className="home_img1"></div>,
    <div className="home_img2"></div>,
  ];
  const [x, setX] = useState(0);

  const handleLeft = () => {
    x === 0 ? setX(-100 * (sliderArr.length - 1)) : setX(x + 100);
  };
  const handleRight = () => {
    x === -100 * (sliderArr.length - 1) ? setX(0) : setX(x - 100);
  };

  return (
    <div className="home_slider">
      {sliderArr.map((item, index) => {
        return (
          <div
            key={index}
            className="slide"
            style={{ transform: `translateX(${x}%)` }}
          >
            {item}
          </div>
        );
      })}
      <button id="goLeft" onClick={handleLeft}>
        <ArrowLeftRoundedIcon style={{ fontSize: 25 }} />
      </button>
      <button id="goRight" onClick={handleRight}>
        <ArrowRightRoundedIcon style={{ fontSize: 25 }} />
      </button>
    </div>
  );
};

export default Slider;

// <div className="home_img1"></div>
// <div className="home_img2"></div>
