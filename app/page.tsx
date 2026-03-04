"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ProjectsTab } from "@/components/projects-tab"
import { OverviewTab } from "@/components/overview-tab"
import { TasksTab } from "@/components/tasks-tab"
import { TeamTab } from "@/components/team-tab"
import { RisksTab } from "@/components/risks-tab"
import { DocumentsTab } from "@/components/documents-tab"
import { ReportsTab } from "@/components/reports-tab"
import { Button } from "@/components/ui/button"
import {
  Bell,
  Search,
  CalendarDays,
  Menu,
  FolderKanban,
  Users,
  ListTodo,
  LayoutDashboard,
  ShieldAlert,
  FileText,
  BarChart3,
  Plus,
  Download,
  Filter,
  MoreHorizontal,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "projects", label: "Dự án", icon: FolderKanban },
  { id: "tasks", label: "Nhiệm vụ", icon: ListTodo, badge: 5 },
  { id: "team", label: "Nhóm", icon: Users },
  { id: "overview", label: "Tiến độ", icon: LayoutDashboard },
  { id: "risks", label: "Rủi ro", icon: ShieldAlert, badge: 2 },
  { id: "documents", label: "Tài liệu", icon: FileText },
  { id: "reports", label: "Báo cáo", icon: BarChart3 },
]

const tabTitles: Record<string, string> = {
  projects: "Quản lý dự án",
  overview: "Theo dõi tiến độ",
  tasks: "Quản lý nhiệm vụ",
  team: "Nhóm & Phân quyền",
  risks: "Xử lý rủi ro",
  documents: "Quản lý tài liệu",
  reports: "Báo cáo dự án",
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("projects")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar - Icon only */}
      <AppSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar with branding and utilities */}
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="flex items-center justify-center size-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="size-4" />
            </button>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base">ProTask</span>
              <span className="text-xs text-muted-foreground hidden sm:inline">
                Project Management
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm..."
                className="pl-9 h-8 w-[200px] bg-background text-sm"
              />
            </div>
            <Button variant="ghost" size="icon" className="size-8">
              <CalendarDays className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="relative size-8">
              <Bell className="size-4" />
              <Badge className="absolute -top-0.5 -right-0.5 size-4 flex items-center justify-center p-0 text-[9px] bg-destructive text-primary-foreground">
                3
              </Badge>
            </Button>
          </div>
        </header>

        {/* Ribbon Tabs - MS Project Style */}
        <div className="border-b border-border bg-card/50 shrink-0">
          <div className="flex items-center h-10 px-4 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 h-9 rounded-t-md text-sm font-medium transition-colors relative",
                    isActive
                      ? "bg-background text-foreground border border-b-0 border-border"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className="ml-1 size-5 flex items-center justify-center p-0 text-[10px] bg-primary text-primary-foreground"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Quick Actions Toolbar - MS Project Style */}
        <div className="border-b border-border bg-card/30 px-4 py-2 shrink-0">
          <div className="flex items-center gap-2">
            <Button size="sm" className="h-8 gap-2">
              <Plus className="size-3.5" />
              Tạo mới
            </Button>
            <Button size="sm" variant="outline" className="h-8 gap-2">
              <Download className="size-3.5" />
              Xuất
            </Button>
            <Button size="sm" variant="outline" className="h-8 gap-2">
              <Filter className="size-3.5" />
              Lọc
            </Button>
            <div className="h-5 w-px bg-border mx-1" />
            <Button size="sm" variant="ghost" className="h-8">
              <MoreHorizontal className="size-4" />
            </Button>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto bg-background">
          <main className="p-6">
            {activeTab === "projects" && <ProjectsTab />}
            {activeTab === "overview" && <OverviewTab />}
            {activeTab === "tasks" && <TasksTab />}
            {activeTab === "team" && <TeamTab />}
            {activeTab === "risks" && <RisksTab />}
            {activeTab === "documents" && <DocumentsTab />}
            {activeTab === "reports" && <ReportsTab />}
          </main>
        </div>
      </div>
    </div>
  )
}

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <AppSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="flex items-center justify-center size-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors lg:hidden"
              aria-label="Menu"
            >
              <Menu className="size-5" />
            </button>
            <div>
              <h1 className="text-base font-semibold text-foreground">{tabTitles[activeTab]}</h1>
              <p className="text-xs text-muted-foreground">
                {new Date().toLocaleDateString("vi-VN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm..."
                className="pl-9 h-9 w-[220px] bg-background"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative size-9">
              <CalendarDays className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="relative size-9">
              <Bell className="size-4" />
              <Badge className="absolute -top-0.5 -right-0.5 size-4 flex items-center justify-center p-0 text-[9px] bg-destructive text-primary-foreground">
                3
              </Badge>
            </Button>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto">
          <main className="p-6 pb-24">
            {activeTab === "projects" && <ProjectsTab />}
            {activeTab === "overview" && <OverviewTab />}
            {activeTab === "tasks" && <TasksTab />}
            {activeTab === "team" && <TeamTab />}
            {activeTab === "risks" && <RisksTab />}
            {activeTab === "documents" && <DocumentsTab />}
            {activeTab === "reports" && <ReportsTab />}
          </main>
        </div>
      </div>
    </div>
  )
}
