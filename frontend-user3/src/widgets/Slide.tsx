import React from "react";
import { IonSlides, IonSlide } from "@ionic/react";

import "./Slide.css";

type ISlide = {
  images: string[];
  options?: any;
};

export default ({ images, options = {} }: ISlide) => {
  const _options = {
    initialSlide: 0,
    speed: 400,
    pager: true,
    paginationClickable: true,
    loop: true,
    spaceBetween: 20,
    ...options
  };
  return (
    <IonSlides pager options={_options} className="slider">
      {images.map((image: string, index: number) => (
        <IonSlide key={index}>
          <img src={image} alt="" />
        </IonSlide>
      ))}
    </IonSlides>
  );
};
