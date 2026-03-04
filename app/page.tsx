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
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

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
