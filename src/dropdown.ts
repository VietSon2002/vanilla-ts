// export const setupDropdown = () => {
//   const { computePosition, autoUpdate, flip } = FloatingUIDOM;
//   let dropdown;
//   let cleanupDropdown;
//   let isOpen = false;
//   document.querySelectorAll("[data-dropdown]").forEach(button => {
//     if (!(button instanceof HTMLButtonElement)) return false;
//     button.addEventListener("click", () => {
//       if (isOpen) return false;
//       if (!button.nextElementSibling) return false;
//       dropdown = document.createElement("nav");
//       console.log("dropdown", button.nextElementSibling);
//       dropdown.classList.add("dropdown");
//       if (!(button.nextElementSibling instanceof HTMLTemplateElement)) return false;
//       const children = [...Array.from(button.nextElementSibling.content.children)];
//       children.forEach(child => {
//         dropdown.appendChild(child.cloneNode(true));
//       });
//       // Thêm dropdown vào body
//       document.body.appendChild(dropdown);

//       setTimeout(() => {
//         // Hiển thị dropdown
//         if (dropdown) dropdown.classList.add("show");
//         isOpen = true;
//       });

//       // Tự động cập nhật vị trí của dropdown
//       cleanupDropdown = autoUpdate(button, dropdown, () => {
//         computePosition(button, dropdown, {
//           middleware: [
//             FloatingUIDOM.offset(5), // Khoảng cách giữa button và dropdown
//             FloatingUIDOM.shift({ padding: 5 }), // Đảm bảo dropdown không bị tràn ra ngoài màn hình
//             flip(),
//           ],
//         }).then(({ x, y }) => {
//           // Đặt vị trí cho dropdown
//           Object.assign(dropdown.style, {
//             left: `${x + 59}px`,
//             top: `${y}px`,
//           });
//         });
//       });
//     });
//   });

//   document.addEventListener("click", event => {
//     if (isOpen && dropdown && event.target !== dropdown) {
//       // Xóa phần tử khỏi DOM
//       document.body.removeChild(dropdown);
//       dropdown = null;
//       isOpen = false;
//       cleanupDropdown();
//     }
//   });
// };
export const setupDropdown = () => {
  const { computePosition, autoUpdate, flip } = FloatingUIDOM;
  let dropdown;
  let cleanupDropdown;
  let isOpen = false;
  let mouseLeaveTimeout;

  document.querySelectorAll("[data-dropdown]").forEach(button => {
    if (!(button instanceof HTMLButtonElement)) return false;

    button.addEventListener("mouseenter", () => {
      if (isOpen) return false;
      if (!button.nextElementSibling) return false;

      dropdown = document.createElement("nav");
      console.log("dropdown", button.nextElementSibling);
      dropdown.classList.add("dropdown");

      if (!(button.nextElementSibling instanceof HTMLTemplateElement)) return false;

      const children = [...Array.from(button.nextElementSibling.content.children)];
      children.forEach(child => {
        dropdown.appendChild(child.cloneNode(true));
      });

      // Thêm dropdown vào body
      document.body.appendChild(dropdown);

      setTimeout(() => {
        // Hiển thị dropdown
        if (dropdown) dropdown.classList.add("show");
        isOpen = true;
      });

      // Tự động cập nhật vị trí của dropdown
      cleanupDropdown = autoUpdate(button, dropdown, () => {
        computePosition(button, dropdown, {
          middleware: [
            FloatingUIDOM.offset(5), // Khoảng cách giữa button và dropdown
            FloatingUIDOM.shift({ padding: 5 }), // Đảm bảo dropdown không bị tràn ra ngoài màn hình
            flip(),
          ],
        }).then(({ x, y }) => {
          // Đặt vị trí cho dropdown
          Object.assign(dropdown.style, {
            left: `${x + 59}px`,
            top: `${y}px`,
          });
        });
      });

      // Gắn sự kiện cho dropdown sau khi nó được thêm vào DOM
      dropdown.addEventListener("mouseenter", () => {
        clearTimeout(mouseLeaveTimeout);
      });

      dropdown.addEventListener("mouseleave", () => {
        mouseLeaveTimeout = setTimeout(() => {
          if (dropdown) {
            document.body.removeChild(dropdown);
            dropdown = null;
            isOpen = false;
            cleanupDropdown?.();
          }
        }, 100);
      });
    });

    button.addEventListener("mouseleave", () => {
      if (isOpen && dropdown) {
        mouseLeaveTimeout = setTimeout(() => {
          if (dropdown) {
            document.body.removeChild(dropdown);
            dropdown = null;
            isOpen = false;
            cleanupDropdown?.();
          }
        }, 300);
      }
    });
  });
};

