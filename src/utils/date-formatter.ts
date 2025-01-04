export default function dateFormatter(isoDate: string) {
  // Convert ISO string to a Date object
  const date = new Date(isoDate);

  // Extract the date in a readable format (e.g., YYYY-MM-DD)
  const readableDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return readableDate;
}
