/**
 * Converts a JavaScript Date to nanoseconds (bigint) for the backend.
 * The backend uses Time.Time which is nanoseconds since epoch.
 */
export function dateToNano(date: Date): bigint {
  return BigInt(date.getTime()) * BigInt(1_000_000);
}

/**
 * Converts nanoseconds (bigint) from the backend to a JavaScript Date.
 */
export function nanoToDate(nano: bigint): Date {
  return new Date(Number(nano / BigInt(1_000_000)));
}

/**
 * Formats a date (from nanoseconds) as a readable date string.
 */
export function formatDate(nano: bigint): string {
  const date = nanoToDate(nano);
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Formats a time (from nanoseconds) as HH:MM AM/PM.
 */
export function formatTime(nano: bigint): string {
  const date = nanoToDate(nano);
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Returns a date string key (YYYY-MM-DD) from nanoseconds for grouping.
 */
export function getDateKey(nano: bigint): string {
  const date = nanoToDate(nano);
  return date.toISOString().split('T')[0];
}

/**
 * Converts a date string (YYYY-MM-DD) and time string (HH:MM) to nanoseconds.
 */
export function dateTimeToNano(dateStr: string, timeStr: string): bigint {
  const dt = new Date(`${dateStr}T${timeStr}:00`);
  return dateToNano(dt);
}

/**
 * Returns today's date string in YYYY-MM-DD format.
 */
export function todayString(): string {
  return new Date().toISOString().split('T')[0];
}
