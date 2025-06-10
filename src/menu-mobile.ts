export const setupMenuMobile = () => {
  document.querySelectorAll("[data-menu]").forEach((el: HTMLDivElement) => {
    let menuMask;
    el.addEventListener("click", () => {
      const isShow = el.classList.contains("active");

      if (!isShow) {
        menuMask = document.createElement("div");
        menuMask.className = "drawer-mask";
        menuMask.onclick = () => {
          document.body.removeChild(menuMask);
          toggleClassList(el, ["active"]);
          toggleClassList(document.querySelector(el.dataset.menu ?? ""), ["active"]);
        };
        document.body.appendChild(menuMask);
        setTimeout(() => {
          menuMask.classList.add("active");
          toggleClassList(el, ["active"]);
          toggleClassList(document.querySelector(el.dataset.menu ?? ""), ["active"]);
        }, 200);
      }
    });
  });
};
export const toggleClassList = (element: Element | null, classList: string[]) =>
  element && classList.forEach(e => element.classList.toggle(e));
