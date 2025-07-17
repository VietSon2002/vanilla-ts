export const setupDropdown = () => {
  const { computePosition, autoUpdate, offset, shift, flip } = FloatingUIDOM;

  let dropdown: HTMLElement | null = null;
  let cleanupDropdown: (() => void) | null = null;
  let isOpen = false;
  let hideTimeout: number;

  const removeDropdown = () => {
    if (dropdown) {
      dropdown.remove();
      dropdown = null;
      isOpen = false;
      cleanupDropdown?.();
      cleanupDropdown = null;
    }
  };

  const createDropdown = (button: HTMLButtonElement, template: HTMLTemplateElement) => {
    if (isOpen || !template) return;

    dropdown = document.createElement("nav");
    dropdown.classList.add("dropdown");

    const children = [...template.content.children];
    children.forEach(child => dropdown!.appendChild(child.cloneNode(true)));

    document.body.appendChild(dropdown);

    setTimeout(() => {
      dropdown?.classList.add("show");
      isOpen = true;
    });

    cleanupDropdown = autoUpdate(button, dropdown, () => {
      computePosition(button, dropdown!, {
        middleware: [offset(5), shift({ padding: 5 }), flip()],
      }).then(({ x, y }) => {
        Object.assign(dropdown!.style, {
          left: `${55 + x}px`,
          top: `${y}px`,
        });
      });
    });

    dropdown.addEventListener("mouseenter", () => clearTimeout(hideTimeout));
    dropdown.addEventListener("mouseleave", () => hideDropdown());
  };

  const hideDropdown = () => {
    hideTimeout = window.setTimeout(() => {
      removeDropdown();
    }, 200);
  };

  document.querySelectorAll("[data-dropdown]").forEach(button => {
    if (!(button instanceof HTMLButtonElement)) return;

    const mode = button.getAttribute("data-dropdown"); // "click" hoặc "hover"
    const template = button.nextElementSibling;
    if (!(template instanceof HTMLTemplateElement)) return;

    if (mode === "hover") {
      button.addEventListener("mouseenter", () => {
        if (!isOpen) createDropdown(button, template);
      });
      button.addEventListener("mouseleave", () => hideDropdown());
    }

    if (mode === "click") {
      button.addEventListener("click", (e) => {
        e.preventDefault(); // tránh submit form nếu có
        if (isOpen) {
          removeDropdown();
        } else {
          createDropdown(button, template);
        }
      });
    }
  });

  // Đóng khi click ra ngoài
  document.addEventListener("click", (e) => {
    if (
      isOpen &&
      dropdown &&
      !dropdown.contains(e.target as Node) &&
      !(e.target instanceof HTMLElement && e.target.closest("[data-dropdown='click']"))
    ) {
      removeDropdown();
    }
  });
};
