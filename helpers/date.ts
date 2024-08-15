const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const stringifyDate = (date: Date) => {
  const MM = months[date.getMonth()];
  const dd = date.getDate();
  const yy = date.getFullYear();

  return `${MM} ${dd}, ${yy}`;
};
