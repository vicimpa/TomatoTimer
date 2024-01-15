const FIND_FORMAT = /(\w)\1*/g;
const FIND_NUMBER_FORMAT = /((\d+)(\s*\.\d+)?)(\s*[a-z])?/gi;

export class FDate extends Date {
  get ms() { return this.getMilliseconds(); }
  get s() { return this.getSeconds(); }
  get m() { return this.getMinutes(); }
  get h() { return this.getHours(); }
  get D() { return this.getDate(); }
  get M() { return this.getMonth() + 1; }
  get Y() { return this.getFullYear(); }

  set ms(v) { this.setMilliseconds(v); }
  set s(v) { this.setSeconds(v); }
  set m(v) { this.setMinutes(v); }
  set h(v) { this.setHours(v); }
  set D(v) { this.setDate(v); }
  set M(v) { this.setMonth(v - 1); }
  set Y(v) { this.setFullYear(v); }

  // Форматировать дату в формат (количество символов указывает сколько минимально надо цифр в числе)
  format(format = 'DD.MM.YYYY hh:mm:ss') {
    return format.replace(FIND_FORMAT, (find, key) => {
      if (key in this) {
        const value = this[key as keyof this];

        if (typeof value === 'number') {
          return value
            .toString()
            .padStart(find.length, '0');
        }
      }

      return find;
    });
  }

  // Создаёт функцию форматирования даты под формат
  static makeFormatter(format = 'DD.MM.YYYY hh:mm:ss') {
    return (...args: ConstructorParameters<DateConstructor>) => {
      const fdate = new this(...args);
      return fdate.format(format);
    };
  }

  // Переводит запись, типа '2m 32s' в миллисекунды
  static fromString(string = '') {
    const fdate = new FDate(0);

    string.replace(FIND_NUMBER_FORMAT, (_, ...grops) => {
      const [num = '0', , , key = 'ms'] = grops;

      if (key in fdate)
        (fdate as any)[key] += +num;

      return '';
    });

    return +fdate;
  }
}