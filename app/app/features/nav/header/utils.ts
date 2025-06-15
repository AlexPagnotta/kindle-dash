export const getCurrentDateTime = () => {
  const now = new Date();
  const timezone = process.env.NEXT_PUBLIC_TIMEZONE;

  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: timezone,
  });

  return formatter.format(now);
};
