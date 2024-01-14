const defaultParams = [1000, 60, 60, 0];

/**
 * @description
 * Кароче, пример этого вот
 * ```js
 * const [s, m, h] = times(51576, [60, 60, 0])
 * console.log(`${h}:${m}:${s}`) // 14:19:36 ;
 * ```
 * В общем функция проходит по массиву. На
 * каждом элементе она делит время на предыдущий,
 * если есть и вычисляет остаток от деления на текущем.
 * По мимо этого, она из элементов массива делает строку
 * с минимум 2 цифрами, заполняя слева нулями. Как раз,
 * для расчета времени.
 */
export const times = <T extends number[]>(time = 0, params?: T) => (
  (params ?? defaultParams).map((cur = 0, i, d, prev = d[i - 1]) => {
    let out = time;
    if (prev) out = (time /= prev);
    if (cur) out %= cur;
    return `${out | 0}`.padStart(2, '0');
  })
);