// Centralized configuration for status badges, labels, and styling
import {
  ShieldAlert,
  ShieldCheck,
  Shield,
  AlertTriangle,
  FileText,
  FileSpreadsheet,
  FileImage,
  File,
  BarChart3,
  TrendingUp,
  Users,
} from "lucide-react"
import type {
  TaskStatus,
  TaskPriority,
  RiskLevel,
  DocumentType,
  ReportType,
} from "./data"

// ==================== TASKS ====================
export const taskStatusConfig: Record<
  TaskStatus,
  { label: string; color: string; bg: string }
> = {
  todo: { label: "Chưa làm", color: "text-muted-foreground", bg: "bg-muted" },
  "in-progress": {
    label: "Đang làm",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  review: { label: "Review", color: "text-chart-3", bg: "bg-chart-3/10" },
  done: { label: "Hoàn thành", color: "text-success", bg: "bg-success/10" },
}

export const taskPriorityConfig: Record<
  TaskPriority,
  { label: string; color: string }
> = {
  low: { label: "Thấp", color: "bg-muted text-muted-foreground" },
  medium: { label: "Trung bình", color: "bg-primary/10 text-primary" },
  high: { label: "Cao", color: "bg-chart-3/10 text-chart-3" },
  critical: {
    label: "Nghiêm trọng",
    color: "bg-destructive/10 text-destructive",
  },
}

// ==================== PROJECTS ====================
export const projectStatusConfig = {
  active: {
    label: "Đang hoạt động",
    color: "bg-green-500/10 text-green-700 dark:text-green-400",
  },
  "on-hold": {
    label: "Tạm dừng",
    color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  },
  completed: {
    label: "Hoàn thành",
    color: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  },
}

// For overview charts
export const projectStatusColors: Record<string, string> = {
  active: "bg-success text-success-foreground",
  "on-hold": "bg-warning text-warning-foreground",
  completed: "bg-primary text-primary-foreground",
}

export const projectStatusLabels: Record<string, string> = {
  active: "Đang triển khai",
  "on-hold": "Tạm dừng",
  completed: "Hoàn thành",
}

// ==================== RISKS ====================
export const riskLevelConfig: Record<
  RiskLevel,
  { label: string; color: string; bg: string; icon: typeof ShieldAlert }
> = {
  low: {
    label: "Thấp",
    color: "text-success",
    bg: "bg-success/10",
    icon: ShieldCheck,
  },
  medium: {
    label: "Trung bình",
    color: "text-chart-3",
    bg: "bg-chart-3/10",
    icon: Shield,
  },
  high: {
    label: "Cao",
    color: "text-destructive",
    bg: "bg-destructive/10",
    icon: AlertTriangle,
  },
  critical: {
    label: "Nghiêm trọng",
    color: "text-destructive",
    bg: "bg-destructive/15",
    icon: ShieldAlert,
  },
}

export const riskStatusConfig: Record<
  string,
  { label: string; color: string }
> = {
  open: { label: "Mở", color: "bg-destructive/10 text-destructive" },
  mitigating: { label: "Đang xử lý", color: "bg-chart-3/10 text-chart-3" },
  resolved: { label: "Đã giải quyết", color: "bg-success/10 text-success" },
}

export const riskImpactLabels: Record<string, string> = {
  low: "Thấp",
  medium: "Trung bình",
  high: "Cao",
}

export const riskProbLabels: Record<string, string> = {
  low: "Thấp",
  medium: "Trung bình",
  high: "Cao",
}

// ==================== TEAM ====================
export const teamAvailabilityConfig: Record<
  string,
  { label: string; color: string; dot: string }
> = {
  available: { label: "Sẵn sàng", color: "text-success", dot: "bg-success" },
  busy: { label: "Bận", color: "text-chart-3", dot: "bg-chart-3" },
  off: { label: "Nghỉ", color: "text-muted-foreground", dot: "bg-muted-foreground" },
}

export const teamPermissionConfig = {
  admin: {
    label: "Admin",
    color: "bg-red-500/10 text-red-700 dark:text-red-400",
    icon: "👑",
  },
  member: {
    label: "Thành viên",
    color: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    icon: "👤",
  },
  viewer: {
    label: "Xem",
    color: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
    icon: "👁️",
  },
}

// ==================== DOCUMENTS ====================
export const documentTypeConfig = {
  pdf: { icon: FileText, label: "PDF", color: "text-red-600" },
  doc: { icon: FileText, label: "Word", color: "text-blue-600" },
  xls: { icon: FileSpreadsheet, label: "Excel", color: "text-green-600" },
  img: { icon: FileImage, label: "Image", color: "text-purple-600" },
  other: { icon: File, label: "Other", color: "text-gray-600" },
}

// ==================== REPORTS ====================
export const reportTemplates = [
  {
    type: "project-summary" as ReportType,
    title: "Báo cáo tổng quan dự án",
    description: "Tổng hợp tiến độ, ngân sách và metrics của dự án",
    icon: BarChart3,
    color: "text-blue-600 bg-blue-50 dark:bg-blue-950",
  },
  {
    type: "task-progress" as ReportType,
    title: "Tiến độ nhiệm vụ",
    description: "Phân tích chi tiết các nhiệm vụ và milestone",
    icon: TrendingUp,
    color: "text-green-600 bg-green-50 dark:bg-green-950",
  },
  {
    type: "team-performance" as ReportType,
    title: "Hiệu suất nhóm",
    description: "Đánh giá năng suất và đóng góp của thành viên",
    icon: Users,
    color: "text-purple-600 bg-purple-50 dark:bg-purple-950",
  },
  {
    type: "risk-analysis" as ReportType,
    title: "Phân tích rủi ro",
    description: "Báo cáo các rủi ro và kế hoạch xử lý",
    icon: AlertTriangle,
    color: "text-orange-600 bg-orange-50 dark:bg-orange-950",
  },
]

export const reportTypeLabels: Record<ReportType, string> = {
  "project-summary": "Tổng quan dự án",
  "task-progress": "Tiến độ nhiệm vụ",
  "team-performance": "Hiệu suất nhóm",
  "risk-analysis": "Phân tích rủi ro",
}

export const reportTypeColors: Record<ReportType, string> = {
  "project-summary": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  "task-progress": "bg-green-500/10 text-green-700 dark:text-green-400",
  "team-performance": "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  "risk-analysis": "bg-orange-500/10 text-orange-700 dark:text-orange-400",
}
