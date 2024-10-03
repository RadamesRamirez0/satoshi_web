export function truncateDecimals(num: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  const truncated = Math.trunc(num * factor) / factor;

  return truncated;
}
