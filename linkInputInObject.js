export class linkInputInObject {
  constructor(object) {
    this.object = object;
  }

  connect(id, linkElements) {
    let input = document.getElementById(id);

    if (!input) {
      throw new Error("Элемент не найден");
    }
    if (input.nodeName !== "INPUT") {
      throw new Error("Элемент не input");
    }

    linkElements.forEach((linkElement) => {
      if (linkElement in this.object) {
        input.value = this.object[linkElement];

        // Отвязать EventListener

        input.addEventListener("input", () => {
          this.object[linkElement] = +input.value;
        });
        return;
      }

      const htmlElement = document.getElementById(linkElement);

      if (htmlElement) {
        htmlElement.innerText = input.value;

        // Отвязать EventListener

        input.addEventListener("input", () => {
          htmlElement.innerText = input.value;
        });

        return;
      }

      throw new Error(`${linkElement} не  Object Key и не DOM element`);
    });
  }
}
