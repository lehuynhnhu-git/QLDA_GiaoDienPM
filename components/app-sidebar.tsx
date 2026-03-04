"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ListTodo,
  Users,
  GanttChart,
  ShieldAlert,
  Settings,
  ChevronLeft,
  FolderKanban,
  Bell,
  LogOut,
  FileText,
  BarChart3,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

const navItems = [
  { id: "projects", label: "Dự án", icon: FolderKanban },
  { id: "team", label: "Nhóm & Phân quyền", icon: Users },
  { id: "tasks", label: "Nhiệm vụ", icon: ListTodo, badge: 5 },
  { id: "overview", label: "Theo dõi tiến độ", icon: LayoutDashboard },
  { id: "risks", label: "Xử lý rủi ro", icon: ShieldAlert, badge: 2 },
  { id: "documents", label: "Tài liệu", icon: FileText },
  { id: "reports", label: "Báo cáo", icon: BarChart3 },
]

interface AppSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  collapsed: boolean
  onToggleCollapse: () => void
}

export function AppSidebar({
  activeTab,
  onTabChange,
  collapsed,
  onToggleCollapse,
}: AppSidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 shrink-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className={cn("flex items-center h-16 px-4 border-b border-sidebar-border", collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center size-8 rounded-lg bg-sidebar-primary">
              <FolderKanban className="size-4 text-sidebar-primary-foreground" />
            </div>
            <span className="font-semibold text-sm tracking-tight">ProTask</span>
          </div>
        )}
        {collapsed && (
          <div className="flex items-center justify-center size-8 rounded-lg bg-sidebar-primary">
            <FolderKanban className="size-4 text-sidebar-primary-foreground" />
          </div>
        )}
        {!collapsed && (
          <button
            onClick={onToggleCollapse}
            className="flex items-center justify-center size-7 rounded-md text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            aria-label="Thu gọn thanh bên"
          >
            <ChevronLeft className="size-4" />
          </button>
        )}
      </div>

      <ScrollArea className="flex-1 py-3">
        <nav className="flex flex-col gap-1 px-2">
          {!collapsed && (
            <span className="text-[10px] uppercase font-semibold tracking-widest text-sidebar-foreground/40 px-3 mb-1">
              Quản lý
            </span>
          )}
          {navItems.map((item) => {
            const isActive = activeTab === item.id
            const Icon = item.icon
            const btn = (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors w-full",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                  collapsed && "justify-center px-0"
                )}
              >
                <Icon className="size-4 shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <Badge className="bg-sidebar-primary text-sidebar-primary-foreground text-[10px] px-1.5 py-0 h-5">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </button>
            )

            return collapsed ? (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>{btn}</TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            ) : (
              btn
            )
          })}

          {!collapsed && (
            <span className="text-[10px] uppercase font-semibold tracking-widest text-sidebar-foreground/40 px-3 mt-5 mb-1">
              Hệ thống
            </span>
          )}
          {collapsed && <div className="h-4" />}
          {[{ id: "settings", label: "Cài đặt", icon: Settings }].map((item) => {
            const Icon = item.icon
            const btn = (
              <button
                key={item.id}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors w-full text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                  collapsed && "justify-center px-0"
                )}
              >
                <Icon className="size-4 shrink-0" />
                {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
              </button>
            )
            return collapsed ? (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>{btn}</TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            ) : (
              btn
            )
          })}
        </nav>
      </ScrollArea>

      <div className={cn("border-t border-sidebar-border p-3", collapsed ? "flex justify-center" : "")}>
        {collapsed ? (
          <button onClick={onToggleCollapse} className="flex items-center justify-center size-8 rounded-md text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
            <ChevronLeft className="size-4 rotate-180" />
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <Avatar className="size-9">
              <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs font-semibold">
                PM
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-tight truncate">Quản Lý Dự Án</p>
              <p className="text-xs text-sidebar-foreground/50 truncate">pm@protask.vn</p>
            </div>
            <div className="flex items-center gap-1">
              <button className="size-7 flex items-center justify-center rounded-md text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
                <Bell className="size-3.5" />
              </button>
              <button className="size-7 flex items-center justify-center rounded-md text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
                <LogOut className="size-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
