import React, { useState } from 'react';
import '../home/slider.scss';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';
import ArrowLeftRoundedIcon from '@material-ui/icons/ArrowLeftRounded';
import home_sub from '../../image/home_sub.png';
import home_write from '../../image/home_write.png';
import { Link } from 'react-router-dom';

const Slider = () => {
  let sliderArr = [
    <div className="home_img1">
      <Link to="/main" className="home_log">
        <img src={home_sub} alt="img" />
      </Link>
    </div>,
    <div className="home_img2">
      <Link to="/search" className="home_log">
        <img src={home_write} alt="img" />
      </Link>
    </div>,
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
