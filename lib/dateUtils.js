/**
 * dateUtils.js
 * Native JavaScript alternatives for date-fns functionalities.
 */

/**
 * Returns the next available days, skipping Fridays (day 5 in JS).
 * @param {number} count - The number of days to return.
 * @returns {Date[]} Array of Date objects.
 */
export const getNextAvailableDays = (count = 14) => {
  const days = [];
  let d = new Date();
  while (days.length < count) {
    if (d.getDay() !== 5) {
      days.push(new Date(d));
    }
    d.setDate(d.getDate() + 1);
  }
  return days;
};

/**
 * Formats a Date object into specific string formats.
 * Replaces `format()` from date-fns.
 * 
 * Supported formats:
 * - "yyyy-MM-dd" : e.g., "2026-09-04"
 * - "MMM"        : e.g., "Sep"
 * - "d"          : e.g., "4"
 * - "EEE"        : e.g., "Wed"
 * - "MMM d, yyyy": e.g., "Sep 4, 2026"
 * 
 * @param {Date} dateObj - The date to format
 * @param {string} formatStr - The format pattern
 * @returns {string} Formatted date string
 */
export const formatDate = (dateObj, formatStr) => {
  if (!dateObj || !(dateObj instanceof Date)) return "";
  
  if (formatStr === "yyyy-MM-dd") {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  if (formatStr === "MMM") {
    return dateObj.toLocaleString("en-US", { month: "short" });
  }
  if (formatStr === "d") {
    return dateObj.getDate().toString();
  }
  if (formatStr === "EEE") {
    return dateObj.toLocaleString("en-US", { weekday: "short" });
  }
  if (formatStr === "MMM d, yyyy") {
    return dateObj.toLocaleString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    });
  }
  return dateObj.toString();
};
