import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Banner() {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img
            loading="lazy"
            src="https://cdn-websites-clones.s3.amazonaws.com/amazon-clone/gi1.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://cdn-websites-clones.s3.amazonaws.com/amazon-clone/6ff.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://cdn-websites-clones.s3.amazonaws.com/amazon-clone/7ma.jpg"
            alt=""
          />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
