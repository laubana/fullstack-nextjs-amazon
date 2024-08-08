"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { CarouselProps } from "./Carousel.props";

import styles from "./Carousel.module.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Carousel.css";

export default (props: CarouselProps): JSX.Element => {
  const { items } = props;

  return (
    <div className={styles.container}>
      <Swiper
        navigation={true}
        pagination={true}
        modules={[Navigation, Pagination]}
        spaceBetween="16px"
      >
        {items.map((itemMapItem, itemMapItemIndex) => (
          <SwiperSlide key={itemMapItemIndex}>{itemMapItem}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
