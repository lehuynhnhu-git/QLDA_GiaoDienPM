export type TaskStatus = "todo" | "in-progress" | "review" | "done"
export type TaskPriority = "low" | "medium" | "high" | "critical"
export type RiskLevel = "low" | "medium" | "high" | "critical"

export interface Project {
  id: string
  name: string
  progress: number
  status: "active" | "on-hold" | "completed"
  startDate: string
  endDate: string
  budget: number
  spent: number
  tasksTotal: number
  tasksDone: number
  teamMembers: {
    name: string
    role: string
  }[]
}

export interface Task {
  id: string
  title: string
  assignee: string
  assigneeAvatar: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
  project: string
  projectId: string  // Task thuộc dự án nào
}

export interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  email: string
  tasksAssigned: number
  tasksCompleted: number
  availability: "available" | "busy" | "off"
  permission: "admin" | "member" | "viewer"
  projects: string[]  // Project IDs người này tham gia
}

export interface Risk {
  id: string
  title: string
  description: string
  level: RiskLevel
  probability: "low" | "medium" | "high"
  impact: "low" | "medium" | "high"
  mitigation: string
  owner: string
  status: "open" | "mitigating" | "resolved"
}

export interface GanttTask {
  id: string
  name: string
  start: number
  duration: number
  progress: number
  assignee: string
  color: string
}

export type DocumentType = "pdf" | "doc" | "xls" | "img" | "other"

export interface Document {
  id: string
  name: string
  type: DocumentType
  size: string
  uploadedBy: string
  uploadedAt: string
  projectId: string  // Dự án chứa tài liệu này
  url: string
}

export type ReportType = "project-summary" | "task-progress" | "team-performance" | "risk-analysis"

export interface Report {
  id: string
  name: string
  type: ReportType
  generatedAt: string
  generatedBy: string
  projectId?: string
}

export const projects: Project[] = [
  {
    id: "p1",
    name: "Website Redesign",
    progress: 72,
    status: "active",
    startDate: "2026-01-15",
    endDate: "2026-04-30",
    budget: 150000000,
    spent: 98000000,
    tasksTotal: 48,
    tasksDone: 35,
    teamMembers: [
      { name: "Nguyễn Văn An", role: "Project Manager" },
      { name: "Trần Thị Bình", role: "Lead Developer" },
      { name: "Hoàng Thu Hà", role: "UI/UX Designer" },
      { name: "Lê Hoàng Cường", role: "QA Engineer" },
    ],
  },
  {
    id: "p2",
    name: "Mobile App v2.0",
    progress: 45,
    status: "active",
    startDate: "2026-02-01",
    endDate: "2026-06-30",
    budget: 280000000,
    spent: 120000000,
    tasksTotal: 62,
    tasksDone: 28,
    teamMembers: [
      { name: "Trần Thị Bình", role: "Tech Lead" },
      { name: "Nguyễn Văn An", role: "Backend Developer" },
      { name: "Phạm Minh Đức", role: "Frontend Developer" },
      { name: "Hoàng Thu Hà", role: "Designer" },
      { name: "Vũ Đức Giang", role: "Product Manager" },
    ],
  },
  {
    id: "p3",
    name: "API Integration",
    progress: 90,
    status: "active",
    startDate: "2025-11-01",
    endDate: "2026-03-15",
    budget: 80000000,
    spent: 72000000,
    tasksTotal: 30,
    tasksDone: 27,
    teamMembers: [
      { name: "Nguyễn Văn An", role: "Lead Developer" },
      { name: "Trần Thị Bình", role: "Backend Developer" },
      { name: "Phạm Minh Đức", role: "Technical Writer" },
    ],
  },
  {
    id: "p4",
    name: "CRM System",
    progress: 20,
    status: "on-hold",
    startDate: "2026-03-01",
    endDate: "2026-08-30",
    budget: 350000000,
    spent: 45000000,
    tasksTotal: 85,
    tasksDone: 17,
    teamMembers: [
      { name: "Vũ Đức Giang", role: "Business Analyst" },
      { name: "Nguyễn Văn An", role: "Solution Architect" },
      { name: "Lê Hoàng Cường", role: "QA Lead" },
    ],
  },
]

export const tasks: Task[] = [
  {
    id: "t1",
    title: "Thiết kế giao diện trang chủ",
    assignee: "Nguyễn Văn An",
    assigneeAvatar: "NA",
    status: "done",
    priority: "high",
    dueDate: "2026-03-05",
    project: "Website Redesign",
    projectId: "p1",
  },
  {
    id: "t2",
    title: "Xây dựng API xác thực",
    assignee: "Trần Thị Bình",
    assigneeAvatar: "TB",
    status: "in-progress",
    priority: "critical",
    dueDate: "2026-03-10",
    project: "Mobile App v2.0",
    projectId: "p2",
  },
  {
    id: "t3",
    title: "Kiểm thử tích hợp thanh toán",
    assignee: "Lê Hoàng Cường",
    assigneeAvatar: "LC",
    status: "review",
    priority: "high",
    dueDate: "2026-03-08",
    project: "API Integration",
    projectId: "p3",
  },
  {
    id: "t4",
    title: "Viết tài liệu kỹ thuật API",
    assignee: "Phạm Minh Đức",
    assigneeAvatar: "MD",
    status: "todo",
    priority: "medium",
    dueDate: "2026-03-15",
    project: "API Integration",
    projectId: "p3",
  },
  {
    id: "t5",
    title: "Tối ưu hiệu suất database",
    assignee: "Nguyễn Văn An",
    assigneeAvatar: "NA",
    status: "in-progress",
    priority: "high",
    dueDate: "2026-03-12",
    project: "CRM System",
    projectId: "p4",
  },
  {
    id: "t6",
    title: "Thiết kế UI dashboard mobile",
    assignee: "Hoàng Thu Hà",
    assigneeAvatar: "TH",
    status: "todo",
    priority: "medium",
    dueDate: "2026-03-20",
    project: "Mobile App v2.0",
    projectId: "p2",
  },
  {
    id: "t7",
    title: "Triển khai CI/CD pipeline",
    assignee: "Trần Thị Bình",
    assigneeAvatar: "TB",
    status: "in-progress",
    priority: "critical",
    dueDate: "2026-03-06",
    project: "Website Redesign",
    projectId: "p1",
  },
  {
    id: "t8",
    title: "Phân tích yêu cầu khách hàng",
    assignee: "Vũ Đức Giang",
    assigneeAvatar: "DG",
    status: "done",
    priority: "low",
    dueDate: "2026-02-28",
    project: "CRM System",
    projectId: "p4",
  },
]

export const teamMembers: TeamMember[] = [
  {
    id: "m1",
    name: "Nguyễn Văn An",
    role: "Lead Developer",
    avatar: "NA",
    email: "an.nguyen@company.com",
    tasksAssigned: 12,
    tasksCompleted: 9,
    availability: "available",
    permission: "admin",
    projects: ["p1", "p2", "p3"],  // Website, Mobile, API
  },
  {
    id: "m2",
    name: "Trần Thị Bình",
    role: "Backend Developer",
    avatar: "TB",
    email: "binh.tran@company.com",
    tasksAssigned: 10,
    tasksCompleted: 6,
    availability: "busy",
    permission: "admin",
    projects: ["p2", "p3"],  // Mobile, API
  },
  {
    id: "m3",
    name: "Lê Hoàng Cường",
    role: "QA Engineer",
    avatar: "LC",
    email: "cuong.le@company.com",
    tasksAssigned: 8,
    tasksCompleted: 7,
    availability: "available",
    permission: "member",
    projects: ["p1", "p4"],  // Website, CRM
  },
  {
    id: "m4",
    name: "Phạm Minh Đức",
    role: "Technical Writer",
    avatar: "MD",
    email: "duc.pham@company.com",
    tasksAssigned: 5,
    tasksCompleted: 3,
    availability: "available",
    permission: "member",
    projects: ["p2", "p3"],  // Mobile, API
  },
  {
    id: "m5",
    name: "Hoàng Thu Hà",
    role: "UI/UX Designer",
    avatar: "TH",
    email: "ha.hoang@company.com",
    tasksAssigned: 9,
    tasksCompleted: 7,
    availability: "busy",
    permission: "member",
    projects: ["p1", "p2"],  // Website, Mobile
  },
  {
    id: "m6",
    name: "Vũ Đức Giang",
    role: "Business Analyst",
    avatar: "DG",
    email: "giang.vu@company.com",
    tasksAssigned: 6,
    tasksCompleted: 5,
    availability: "off",
    permission: "viewer",
    projects: ["p4"],  // CRM
  },
]

export const risks: Risk[] = [
  {
    id: "r1",
    title: "Chậm tiến độ Mobile App",
    description: "Khả năng trễ deadline do thiếu nhân lực backend",
    level: "high",
    probability: "high",
    impact: "high",
    mitigation: "Tuyển thêm 2 developer backend, tăng cường OT",
    owner: "Nguyễn Văn An",
    status: "mitigating",
  },
  {
    id: "r2",
    title: "Vượt ngân sách CRM",
    description: "Chi phí phát sinh do thay đổi yêu cầu liên tục",
    level: "critical",
    probability: "medium",
    impact: "high",
    mitigation: "Đóng băng scope, đàm phán lại với khách hàng",
    owner: "Trần Thị Bình",
    status: "open",
  },
  {
    id: "r3",
    title: "Bảo mật API endpoint",
    description: "Phát hiện lỗ hổng bảo mật trong API xác thực",
    level: "critical",
    probability: "low",
    impact: "high",
    mitigation: "Audit code, cập nhật thư viện, thêm rate limiting",
    owner: "Lê Hoàng Cường",
    status: "mitigating",
  },
  {
    id: "r4",
    title: "Thay đổi công nghệ",
    description: "Framework frontend có breaking changes trong phiên bản mới",
    level: "medium",
    probability: "medium",
    impact: "medium",
    mitigation: "Lock phiên bản, lên kế hoạch migration",
    owner: "Phạm Minh Đức",
    status: "open",
  },
  {
    id: "r5",
    title: "Nghỉ việc nhân sự",
    description: "Nguy cơ mất nhân sự chủ chốt do áp lực công việc",
    level: "low",
    probability: "low",
    impact: "medium",
    mitigation: "Tăng lương, cải thiện môi trường làm việc",
    owner: "Hoàng Thu Hà",
    status: "resolved",
  },
]

export const ganttTasks: GanttTask[] = [
  { id: "g1", name: "Nghiên cứu & Phân tích", start: 0, duration: 3, progress: 100, assignee: "Vũ Đức Giang", color: "#3b82f6" },
  { id: "g2", name: "Thiết kế UI/UX", start: 2, duration: 4, progress: 85, assignee: "Hoàng Thu Hà", color: "#10b981" },
  { id: "g3", name: "Phát triển Frontend", start: 5, duration: 6, progress: 60, assignee: "Nguyễn Văn An", color: "#f59e0b" },
  { id: "g4", name: "Phát triển Backend", start: 4, duration: 7, progress: 45, assignee: "Trần Thị Bình", color: "#8b5cf6" },
  { id: "g5", name: "Kiểm thử & QA", start: 8, duration: 4, progress: 20, assignee: "Lê Hoàng Cường", color: "#ef4444" },
  { id: "g6", name: "Tích hợp API", start: 9, duration: 3, progress: 10, assignee: "Phạm Minh Đức", color: "#06b6d4" },
  { id: "g7", name: "Triển khai & Go-live", start: 11, duration: 2, progress: 0, assignee: "Nguyễn Văn An", color: "#ec4899" },
]

export const weekLabels = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12", "T13"]

export const documents: Document[] = [
  {
    id: "d1",
    name: "Tài liệu đặc tả yêu cầu.pdf",
    type: "pdf",
    size: "2.5 MB",
    uploadedBy: "Vũ Đức Giang",
    uploadedAt: "2026-02-15",
    projectId: "p1",
    url: "#",
  },
  {
    id: "d2",
    name: "Thiết kế UI Mockup.fig",
    type: "other",
    size: "8.3 MB",
    uploadedBy: "Hoàng Thu Hà",
    uploadedAt: "2026-02-18",
    projectId: "p1",
    url: "#",
  },
  {
    id: "d3",
    name: "Database Schema.xls",
    type: "xls",
    size: "456 KB",
    uploadedBy: "Trần Thị Bình",
    uploadedAt: "2026-02-20",
    projectId: "p2",
    url: "#",
  },
  {
    id: "d4",
    name: "API Documentation.doc",
    type: "doc",
    size: "1.8 MB",
    uploadedBy: "Phạm Minh Đức",
    uploadedAt: "2026-02-22",
    projectId: "p3",
    url: "#",
  },
  {
    id: "d5",
    name: "User Flow Diagram.png",
    type: "img",
    size: "892 KB",
    uploadedBy: "Hoàng Thu Hà",
    uploadedAt: "2026-02-25",
    projectId: "p2",
    url: "#",
  },
  {
    id: "d6",
    name: "Testing Strategy.pdf",
    type: "pdf",
    size: "1.2 MB",
    uploadedBy: "Lê Hoàng Cường",
    uploadedAt: "2026-02-28",
    projectId: "p1",
    url: "#",
  },
  {
    id: "d7",
    name: "Budget Report Q1.xls",
    type: "xls",
    size: "324 KB",
    uploadedBy: "Nguyễn Văn An",
    uploadedAt: "2026-03-01",
    projectId: "p4",  // CRM System
    url: "#",
  },
  {
    id: "d8",
    name: "Meeting Minutes 2026-02.doc",
    type: "doc",
    size: "678 KB",
    uploadedBy: "Vũ Đức Giang",
    uploadedAt: "2026-03-01",
    projectId: "p4",  // CRM System
    url: "#",
  },
]

export const reports: Report[] = [
  {
    id: "rp1",
    name: "Báo cáo tổng quan dự án",
    type: "project-summary",
    generatedAt: "2026-03-01",
    generatedBy: "Nguyễn Văn An",
    projectId: "p1",
  },
  {
    id: "rp2",
    name: "Tiến độ nhiệm vụ",
    type: "task-progress",
    generatedAt: "2026-02-28",
    generatedBy: "Trần Thị Bình",
    projectId: "p1",
  },
  {
    id: "rp3",
    name: "Hiệu suất nhóm",
    type: "team-performance",
    generatedAt: "2026-02-25",
    generatedBy: "Hoàng Thu Hà",
    projectId: "p1",
  },
  {
    id: "rp4",
    name: "Báo cáo tổng quan dự án",
    type: "project-summary",
    generatedAt: "2026-02-20",
    generatedBy: "Lê Hoàng Cường",
    projectId: "p2",
  },
  {
    id: "rp5",
    name: "Tiến độ nhiệm vụ",
    type: "task-progress",
    generatedAt: "2026-02-15",
    generatedBy: "Phạm Minh Đức",
    projectId: "p2",
  },
  {
    id: "rp6",
    name: "Phân tích rủi ro",
    type: "risk-analysis",
    generatedAt: "2026-02-18",
    generatedBy: "Vũ Đức Giang",
    projectId: "p2",
  },
  {
    id: "rp7",
    name: "Báo cáo tổng quan dự án",
    type: "project-summary",
    generatedAt: "2026-02-10",
    generatedBy: "Nguyễn Văn An",
    projectId: "p3",
  },
]
