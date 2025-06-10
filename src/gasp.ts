export const animationSlide = (e: Element, delay: number) => {
  const tl = gsap.timeline({ delay, defaults: { duration: 1, ease: "power1.inOut" } });
  const eGsap = e.querySelectorAll(".gsap");
  const old = gsap.getTweensOf(eGsap);
  if (old.length > 0) {
    old.forEach((item: any) => item.kill());
    return true;
  }
  eGsap.forEach(item => {
    if (item.classList.contains("left"))
      tl.from(item, { x: "-=10%", scale: "+=0.15", opacity: "-=1" }, "<0.25");
    if (item.classList.contains("right"))
      tl.from(item, { x: "+=10%", scale: "+=0.15", opacity: "-=1" }, "<0.5");
    if (item.classList.contains("top"))
      tl.from(item, { y: "-=50%", scale: "+=0.15", opacity: "-=1" }, "<0.25");
    if (item.classList.contains("bottom"))
      tl.from(item, { y: "+=50%", scale: "+=0.15", opacity: "-=1" }, "<0.5");
    if (item.classList.contains("zoom")) gsap.to(item, { scale: "+=0.1", duration: 20 });
  });
};
