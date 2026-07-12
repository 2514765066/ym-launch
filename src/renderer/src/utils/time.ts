import dayjs, { Dayjs } from "dayjs";

//获取时间差
export const getDayDiff = (start: number | Dayjs, end: number | Dayjs) => {
  const d1 = dayjs(start);
  const d2 = dayjs(end);

  return d2.diff(d1, "day");
};
