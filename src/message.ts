export const Message = {
  init: ({ text, className }: { text: string; className: string }) =>
    Toastify({
      duration: 3000,
      text,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      close: true,
      className,
    }).showToast(),

  success: ({ text = "" }: { text: string }) => Message.init({ text, className: "success" }),
  error: ({ text = "" }: { text: string }) => Message.init({ text, className: "error" }),
  info: ({ text = "" }: { text: string }) => Message.init({ text, className: "info" }),
  warning: ({ text = "" }: { text: string }) => Message.init({ text, className: "warning" }),
};
