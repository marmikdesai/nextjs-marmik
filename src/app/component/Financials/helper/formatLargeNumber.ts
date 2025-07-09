export const formatLargeNumber = (value: string) => {
  const num = parseFloat(value);
  if (isNaN(num)) return value;

  const absNum = Math.abs(num);

  if (absNum >= 1e12) {
    return (num / 1e12).toFixed(2) + "T";
  } else if (absNum >= 1e9) {
    return (num / 1e9).toFixed(2) + "B";
  } else if (absNum >= 1e6) {
    return (num / 1e6).toFixed(2) + "M";
  } else if (absNum >= 1e3) {
    return (num / 1e3).toFixed(2) + "K";
  }
  return num.toLocaleString("en-IN");
};
