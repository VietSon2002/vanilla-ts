import { space } from "postcss/lib/list";
import { animationSlide } from "./gasp";

export const setupSwiper = () => {
  const defaultSetting = {
    loop: true,
    autoHeight: true,
    spaceBetween: 20,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      init: (el: any) => animationSlide(el.slides[el.activeIndex], 0),
      slideChangeTransitionStart: (el: any) => animationSlide(el.slides[el.activeIndex], 0),
    },
    autoplay: {
      delay: 2500000,
    },
  };
  new Swiper(".mySwiper", {
    ...defaultSetting,
    slidesPerView: 1,
  });
  new Swiper(".mySwiper-stop", {
    ...defaultSetting,
    autoplay: false,
    slidesPerView: "auto",
    loop: true,
    centeredSlides: false,
    spaceBetween: 24,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: { slidesPerView: 1.2 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 },
    },
  });
  new Swiper(".mySwiper-4", {
    ...defaultSetting,
    slidesPerView: "auto", // <-- tạo khoảng cách giữa các slide
    loop: true,
    centeredSlides: false,
    spaceBetween: 24,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: { slidesPerView: 1.2 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 },
    },
  });
  new Swiper('.client-swiper', {
    slidesPerView: 5,
    spaceBetween: 60,
    loop: true,
    speed: 5000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    freeMode: true,
    freeModeMomentum: false,
    breakpoints: {
      320: { slidesPerView: 2, spaceBetween: 20 },
      640: { slidesPerView: 3, spaceBetween: 40 },
      1024: { slidesPerView: 5, spaceBetween: 110 },
    }
  });
};
