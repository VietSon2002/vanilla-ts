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
      delay: 250000,
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
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 },
    },
  });
  new Swiper(".mySwiper-4", {
    ...defaultSetting,
    loop: true,
    centeredSlides: true,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        centeredSlides: true,
        slidesOffsetBefore: 24,
        slidesOffsetAfter: 24,
      },
      768: {
        slidesPerView: 2,
        centeredSlides: false,
        slidesOffsetBefore: 24,
        slidesOffsetAfter: 24,
      },
      1024: {
        slidesPerView: 4,
        centeredSlides: false,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
      },
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
