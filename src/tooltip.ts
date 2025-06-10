export const setupTooltip = () => {
  const { computePosition, autoUpdate, arrow, flip } = FloatingUIDOM;
  // Hiển thị tooltip khi di chuột vào button
  document.querySelectorAll("[data-tooltip]").forEach(hoverTooltip => {
    let tooltip;
    let cleanupTooltip;

    hoverTooltip.addEventListener("mouseenter", e => {
      if (!(e.target instanceof HTMLButtonElement)) return false;
      tooltip = document.createElement("div");
      tooltip.classList.add("tooltip");

      tooltip.textContent = e.target?.dataset.tooltip;

      const arrowElement = document.createElement("div");
      arrowElement.classList.add("arrow");
      // Thêm tooltip vào body
      tooltip.appendChild(arrowElement);
      document.body.appendChild(tooltip);

      setTimeout(() => {
        // Hiển thị tooltip
        if (tooltip) tooltip.classList.add("show");
      });

      // Tự động cập nhật vị trí của tooltip
      cleanupTooltip = autoUpdate(e.target, tooltip, () => {
        computePosition(e.target, tooltip, {
          placement: "bottom", // Vị trí tooltip
          middleware: [
            FloatingUIDOM.offset(5), // Khoảng cách giữa button và tooltip
            FloatingUIDOM.shift({ padding: 5 }), // Đảm bảo tooltip không bị tràn ra ngoài màn hình
            flip(),
            arrow({ element: arrowElement }),
          ],
        }).then(({ x, y, middlewareData, placement }) => {
          // Đặt vị trí cho tooltip
          Object.assign(tooltip.style, {
            left: `${x}px`,
            top: `${y}px`,
          });
          if (middlewareData.arrow) {
            const { x, y } = middlewareData.arrow;
            const side = placement.split("-")[0];

            const staticSide = {
              top: "bottom",
              right: "left",
              bottom: "top",
              left: "right",
            }[side];

            Object.assign(arrowElement.style, {
              left: x != null ? `${x}px` : "",
              top: y != null ? `${y}px` : "",
              [staticSide]: `${-arrowElement.offsetWidth / 2}px`,
              transform: "rotate(45deg)",
            });
          }
        });
      });
    });

    // Ẩn tooltip khi di chuột ra khỏi button
    hoverTooltip.addEventListener("mouseleave", () => {
      if (tooltip) {
        // Xóa phần tử khỏi DOM
        document.body.removeChild(tooltip);
        cleanupTooltip();
        tooltip = null;
      }
    });
  });
};
