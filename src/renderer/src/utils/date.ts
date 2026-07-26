//是否超过24小时
export const isOverOneDay = (date1: number, date2: number = Date.now()) => {
  const d1 = new Date(date1).getTime();
  const d2 = new Date(date2).getTime();

  const oneDayInMs = 24 * 60 * 60 * 1000;
  return Math.abs(d1 - d2) > oneDayInMs;
};
