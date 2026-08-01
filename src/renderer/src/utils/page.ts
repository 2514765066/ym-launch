//分页函数
export const chunk = <T>(list: (T | null)[], size: number): T[][] => {
  const result: T[][] = [];

  for (let i = 0; i < list.length; i += size) {
    result.push(
      list.slice(i, i + size).filter((item): item is T => item !== null),
    );
  }

  return result;
};
