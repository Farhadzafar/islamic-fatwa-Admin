// This file contains utility functions that can be used throughout the application.

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// FormateDate

// Example usage
// const date = new Date();
// const formattedDate = formatDate(date);
// console.log(formattedDate); // Output: "2023-10-01" (or the current date in YYYY-MM-DD format)
//
// This function takes a Date object and returns a string in the format YYYY-MM-DD
// It uses the toISOString method to convert the date to a string and then splits it at the 'T' character to get the date part. The split method is used to separate the date and time components of the ISO string, and we only take the first part (the date) for our output. This ensures that the output is always in the YYYY-MM-DD format, regardless of the input date.

export function formatDate(date: string | Date): string {
  const now = new Date();
  const inputDate = typeof date === "string" ? new Date(date) : date;
  const diffMs = now.getTime() - inputDate.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30); // Approximate
  const years = Math.floor(days / 365);

  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (weeks < 4) return `${weeks}w ago`;
  if (months < 12) return `${months}mo ago`;
  return `${years}y ago`;
}

// export function formatDate(date: string | Date): string {
//   if (!date) return "";
//   if (typeof date === "string") {
//     date = new Date(date);
//   }
//   return date.toISOString().split("T")[0];
// }

// String Truncate
// Example usage
// const longString = "This is a very long string that needs to be truncated.";
// const truncatedString = truncateString(longString, 20);
// console.log(truncatedString); // Output: "This is a very long..."
// This function takes a string and a maximum length as input. If the string is longer than the specified length, it truncates the string and adds an ellipsis ("...") at the end. If the string is shorter than or equal to the specified length, it returns the original string.
export function truncateString(str: string, maxLength: number): string {
  if (!str) return "";
  const plainText = str.replace(/<[^>]+>/g, ""); // remove HTML tags
  return plainText.length > maxLength
    ? plainText.slice(0, maxLength) + "..."
    : plainText;
}

// Number Formatter
// Example usage
// const number = 1234567;
// const formattedNumber = formatNumber(number);
// console.log(formattedNumber); // Output: "1,234,567"
// This function takes a number as input and returns a string formatted with commas as thousands separators. It uses the toLocaleString method to format the number according to the user's locale, which adds commas in the appropriate places for readability.
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

//
export const getAvatarUrl = (fullName: string, image?: string): string => {
  return image && image !== "default-user.jpg"
    ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/images/users/${image}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        fullName
      )}&background=random`;
};
