import dayjs from "dayjs";

const today = () => {
  const day = new Date().getDate();
  const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const year = new Date().getFullYear();
  const ymd = `${year}/${month}/${day}`;
  const format = dayjs(ymd).format("YYYY/MM/DD");
  return format;
};

export { today };
