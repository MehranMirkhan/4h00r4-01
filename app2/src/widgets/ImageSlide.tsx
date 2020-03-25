import React from "react";
import { IonSlides, IonSlide } from "@ionic/react";

export default ({ images, options = {}, className = "" }: IImageSlide) => {
  const _options = {
    initialSlide: 0,
    speed: 400,
    pager: true,
    paginationClickable: true,
    loop: true,
    spaceBetween: 20,
    autoHeight: true,
    ...options
  };
  return !images ? null : (
    <IonSlides pager options={_options} className={className}>
      {images.map((image: string, index: number) => (
        <IonSlide key={index}>
          <img src={image} alt="" data-testid="slide-img" />
        </IonSlide>
      ))}
    </IonSlides>
  );
};

interface IImageSlide {
  images?: string[];
  options?: { [key: string]: any };
  className?: string;
}
