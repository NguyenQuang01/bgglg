const today = () => {
  const day = new Date().getDate();
  const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const year = new Date().getFullYear();
  console.log(`${year}/${month}/${day}`);
  return `${year}/${month}/${day}`;
};

export { today };
