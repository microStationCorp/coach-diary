export const getFullDateFormat = (date: string) => {
  const dt = new Date(date);
  return `${dt.toLocaleTimeString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}`;
};
