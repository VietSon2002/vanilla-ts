export const setupFormValid = () => {
  (<any>window)._FORM_ = {};
  (<any>window)._FORMSTATUS_ = {};
  (<any>window)._SELECT_ = {};
  Array.from(document.getElementsByTagName("form")).forEach(el => {
    if (!el.noValidate) return;
    (<any>window)._FORM_[el.name] = {};
    (<any>window)._FORMSTATUS_[el.name] = false;
    (<any>window)._SELECT_[el.name] = {};
    el.addEventListener("submit", event => {
      event.preventDefault();
      submitForm(el);
    });

    Array.from(["input", "textarea"]).forEach(tag =>
      Array.from(el.querySelectorAll(tag)).forEach((element: HTMLInputElement) => {
        if (element.type === "range") rangeSlider(element);
        element.addEventListener(
          "blur",
          () => showMessage(element as HTMLInputElement, tag, "blur", el.name),
          false,
        );
      }),
    );
    Array.from([".pretty > input", "select"]).forEach(tag =>
      Array.from(el.querySelectorAll(tag)).forEach((element: HTMLInputElement) => {
        if (element.type.indexOf("select") > -1)
          (<any>window)._SELECT_[el.name][element.name] = new Choices(element, {
            removeItemButton: true,
          });
        element.addEventListener(
          "change",
          () => showMessage(element as HTMLInputElement, tag, "change", el.name),
          false,
        );
      }),
    );
  });
};
const submitForm = (el: HTMLFormElement) => {
  Array.from(["input", "textarea"]).forEach(tag =>
    el.querySelectorAll(".group > " + tag).forEach(element => {
      showMessage(element as HTMLInputElement, tag, "blur", el.name);
    }),
  );
  Array.from([".pretty > input", "select"]).forEach(tag =>
    el.querySelectorAll(tag).forEach(element => {
      showMessage(element as HTMLInputElement, tag, "change", el.name, true);
    }),
  );
  (<any>window)._FORMSTATUS_[el.name] = el.querySelectorAll(".group.error").length === 0;
  return true;
};
const showMessage = (
  el: HTMLInputElement,
  tag: string,
  event: string,
  nameForm: string,
  isSubmit = false,
) => {
  const parentElement = el.closest(".group");

  if (parentElement) {
    if (!isSubmit) {
      if (tag === "select")
        (<any>window)._FORM_[nameForm][el.name] =
          el.type.indexOf("multiple") > -1
            ? (<any>window)._SELECT_[nameForm][el.name].getValue().map((i: any) => i.value)
            : (<any>window)._SELECT_[nameForm][el.name].getValue().value;
      else
        (<any>window)._FORM_[nameForm][el.name.replace("[]", "")] =
          el.name.indexOf("[]") === -1
            ? el.value
            : [].filter
                .call(document.getElementsByName(el.name), (c: HTMLInputElement) => c.checked)
                .map((c: HTMLInputElement) => c.value);
    }

    const message = getMessage(el, nameForm, isSubmit);
    const tl = gsap.timeline({
      defaults: { duration: 0.3, ease: "power1.inOut" },
    });
    const error = parentElement.querySelector("p");
    if (message) {
      if (error) error.innerHTML = message;
      else {
        if (tag === "select") (<any>window)._SELECT_[nameForm][el.name].destroy();
        const oldInput = parentElement.querySelectorAll(tag);
        parentElement.innerHTML += `<p class="error">${message}</p>`;
        const p = parentElement.querySelector("p");
        tl.from(p, { marginTop: "-15", opacity: "0", fontSize: "10" });

        parentElement.classList.add("error");
        Array.from(parentElement.querySelectorAll(tag)).forEach(
          (input: HTMLInputElement, index) => {
            if (tag === "select") {
              (<any>window)._SELECT_[nameForm][input.name] = new Choices(input, {
                removeItemButton: true,
              });
            }
            input.checked = (oldInput[index] as HTMLInputElement).checked;
            input.value = (oldInput[index] as HTMLInputElement).value;
            input.addEventListener(event, () => showMessage(input, tag, event, nameForm), false);
          },
        );
      }
    } else {
      const oldInput = parentElement.querySelectorAll(tag);
      parentElement.classList.remove("error");
      if (error) tl.to(error, { marginTop: "-15", opacity: "0", fontSize: "10" });
      setTimeout(() => {
        parentElement.querySelector("p")?.remove();
        Array.from(parentElement.querySelectorAll(tag)).forEach(
          (input: HTMLInputElement, index) => {
            input.checked = (oldInput[index] as HTMLInputElement).checked;
            input.addEventListener(event, () => showMessage(input, tag, event, nameForm), false);
          },
        );
      }, 300);
    }
  }
};

const getMessage = (el: HTMLInputElement, nameForm: string, isSubmit: boolean) => {
  let { value } = el;
  const { required, type, name, dataset } = el;
  if (isSubmit || (type === "checkbox" && name && name.indexOf("[]") > -1))
    value = (<any>window)._FORM_[nameForm][name.replace("[]", "")];
  if (!value && required && name.indexOf("[]") === -1) return (<any>window)._MESSAGE_.required;
  else if (value && type === "email" && !regexEmail.test(value.trim()))
    return (<any>window)._MESSAGE_.email;
  else if (
    value &&
    dataset.hasOwnProperty("minLength") &&
    value.length < parseInt(dataset["minLength"]!)
  )
    return (<any>window)._MESSAGE_.minLengthCheckBox + dataset["minLength"] + " ký tự";
  else if (
    value &&
    dataset.hasOwnProperty("maxLength") &&
    value.length > parseInt(dataset["maxLength"]!)
  )
    return (<any>window)._MESSAGE_.minLengthCheckBox + dataset["maxLength"] + " ký tự";
  else if (
    value &&
    dataset.hasOwnProperty("regex") &&
    !new RegExp(dataset["regex"]!).test(value.trim())
  )
    return dataset.hasOwnProperty("message")
      ? dataset["message"]
      : (<any>window)._MESSAGE_.required;
  else if (value && dataset.hasOwnProperty("compare")) {
    const compare = el.parentElement!.parentElement!.querySelector(
      `[name='${dataset["compare"]}']`,
    ) as HTMLInputElement;
    if (!!compare && compare.value && compare.value.trim() !== value.trim())
      return dataset.hasOwnProperty("message")
        ? dataset["message"]
        : (<any>window)._MESSAGE_.required;
  }

  if (
    type === "checkbox" &&
    name.indexOf("[]") > -1 &&
    dataset.hasOwnProperty("minLength") &&
    (!value || value.length < parseInt(dataset["minLength"]!))
  )
    return (<any>window)._MESSAGE_.minLengthCheckBox + dataset["minLength"];
  return "";
};
const regexEmail = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
