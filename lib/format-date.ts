const options = {
  year: "numeric" as "numeric",
  month: "long" as "long",
  day: "numeric" as "numeric",
  hour: "2-digit" as "2-digit",
  minute: "2-digit" as "2-digit",
  second: "2-digit" as "2-digit",
  // more options - not needed
  // timeZoneName: "short" as "short",
};

export function formatUnixTimestamp(unixTimestamp: string) {
  const date = new Date(Number(unixTimestamp)); // Convert Unix timestamp to milliseconds
  console.log(date);

  return date.toLocaleDateString("fa-IR", options);
}
