// Centralized formatting utilities

/**
 * Format date to Vietnamese locale
 * @param date - Date string or Date object
 * @returns Formatted date string in dd/mm/yyyy format
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("vi-VN")
}

/**
 * Format date with specific options
 * @param date - Date string or Date object
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDateWithOptions(
  date: string | Date,
  options: Intl.DateTimeFormatOptions
): string {
  return new Date(date).toLocaleDateString("vi-VN", options)
}

/**
 * Format date to short format (day and month only)
 * @param date - Date string or Date object
 * @returns Formatted date string in dd/mm format
 */
export function formatDateShort(date: string | Date): string {
  return new Date(date).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
  })
}

/**
 * Get user initials from full name
 * @param name - Full name string
 * @returns Initials (e.g., "John Doe" => "JD")
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

/**
 * Format file size to human-readable format
 * @param bytes - File size in bytes
 * @returns Formatted size string (e.g., "1.5 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
}

/**
 * Group items by project ID
 * @param items - Array of items with projectId property
 * @param projects - Array of project objects
 * @returns Array of grouped items
 */
export function groupByProject<T extends { projectId: string }>(
  items: T[],
  projects: Array<{ id: string; name: string }>
): Array<{ project: { id: string; name: string }; items: T[] }> {
  return projects
    .map((project) => ({
      project,
      items: items.filter((item) => item.projectId === project.id),
    }))
    .filter((group) => group.items.length > 0)
}
