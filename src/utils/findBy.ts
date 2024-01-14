

/**
 * @description
 * Кароче это говно что-то типа Array.map, 
 * но вместо Array она использует набор 
 * строк после функции и создаёт объект, 
 * где свойствами являются строки, которые
 * передаются, а значениями результаты работы функции
 * для этих свойств. Использую для создания объекта с
 * HTML элементами и тд.
 */
export const findBy = <T extends string, F extends (v: T) => any>(
  find: F,
  ...data: T[]
) => {
  const object: Pick<{ [key: string]: ReturnType<F>; }, T> = {} as any;

  for (const item of data)
    object[item] = find(item);

  return object;
};