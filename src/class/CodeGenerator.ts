/**
 * @description
 * Класс для генерации/парсинга кода пресета.
 */
export class CodeGenerator {
  /**
   * @example
   * '000-string-0-string-number-null' => [0, 'string', '0', 'string', 'number', null]
   */
  static parseCode(code: string) {
    const props: Array<string | number | null> = code.split("-");

    for (const key in props) {
      let value = props[key];

      const num = Number(value);

      if (!isNaN(num)) {
        props[key] = num;
      } else {
        value !== "null" ? (props[key] = value) : null;
      }
    }

    return props;
  }

  /**
   * @description
   * Генерирует код пресета из массива строк, чисел и null.
   *
   * @example
   * [0, 'string', null, '0', 'string', 'number', null] => '0-string-null-0-string-number-null'
   */
  static generateCode(props: Array<string | number | null>): string {
    let code = props.reduce<string>((acc, value, i, arr) => {
      return acc + String(value) + (arr.length - 1 > i ? `-` : "");
    }, "");

    return code;
  }

  /**
   * @description
   * Проверяет на валидность кода пресета.
   */
  static testCode(code: string): boolean {
    return /^(((\d+|([a-zA-Z]+)+)-)+)(\d+|([a-zA-Z]+)+)$/.test(code);
  }
}
