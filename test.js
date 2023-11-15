function watchInputValue(id, object, key) {
  let input = document.getElementById(id);

  if (!input) {
    throw new Error("Элемент не найден");
  }
  if (input.nodeName !== "INPUT") {
    throw new Error("Элемент не input");
  }

  input.addEventListener("input", () => {
    object[key] = input.value;
  });

  input = null;
}

//--------------------------------------

class linkInputInObject {
  constructor(object) {
    this.object = object;
  }

  connect(id, linkElements) {
    let input = document.getElementById(id);

    if (!input) {
      throw new Error("Элемент не найден");
    }
    if (input.nodeName !== "INPUT") {
      input = undefined;
      throw new Error("Элемент не input");
    }

    linkElements.forEach((linkElement) => {
      if (linkElement in this.object) {
        input.value = this.object[linkElement];

        input.addEventListener("input", () => {
          this.object[linkElement] = +input.value;
        });
        return;
      }

      let HTMLElement = document.getElementById(linkElement);

      if (HTMLElement) {
        HTMLElement.innerText = input.value;

        input.addEventListener("input", () => {
          HTMLElement.innerText = input.value;
        });

        return;
      } else {
        HTMLElement = null;
      }

      throw new Error(`${linkElement} не  Object Key и не DOM element`);
    });
  }
}

//-----------------
// взаимстваный код
// https://sky.pro/media/realizacziya-dvustoronnej-privyazki-dannyh-v-javascript/

// https://jsfiddle.net/ngdvzqak/22/

function bindData(object, propName, element) {
  // Установить начальное значение элемента.
  element.value = object[propName];

  // Обновить объект при изменении элемента.
  element.addEventListener("input", function (e) {
    object[propName] = e.target.value;
  });

  // Обновить элемент при изменении объекта.
  Object.defineProperty(object, propName, {
    get: function () {
      return this["_" + propName];
    },
    set: function (value) {
      this["_" + propName] = value;
      element.value = value;
    },
  });
}

bindData(a, "b", document.getElementById("myInput"));

//-----------------------------------
// https://jsfiddle.net/jybvnrmg/3/