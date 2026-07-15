/**
 * Format a date range string for display.
 * Handles "present" as end date for current positions.
 */
export function formatDateRange(start: string, end: string): string {
  const startDate = new Date(start + "-01");
  const startFormatted = startDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  if (end.toLowerCase() === "present") {
    return `${startFormatted} – Present`;
  }

  const endDate = new Date(end + "-01");
  const endFormatted = endDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return `${startFormatted} – ${endFormatted}`;
}

/**
 * Calculate the duration between two dates in years and months.
 */
export function calculateDuration(start: string, end: string): string {
  const startDate = new Date(start + "-01");
  const endDate =
    end.toLowerCase() === "present" ? new Date() : new Date(end + "-01");

  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) return `${remainingMonths}mo`;
  if (remainingMonths === 0) return `${years}yr`;
  return `${years}yr ${remainingMonths}mo`;
}
