"use client"

import { useState } from "react"
import { tasks, projects, type Task, type TaskStatus, type TaskPriority } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Search,
  Filter,
  Plus,
  Calendar,
  ChevronRight,
  FolderKanban,
  Edit,
  Trash2,
} from "lucide-react"
import { cn } from "@/lib/utils"

const statusConfig: Record<TaskStatus, { label: string; color: string; bg: string }> = {
  todo: { label: "Chưa làm", color: "text-muted-foreground", bg: "bg-muted" },
  "in-progress": { label: "Đang làm", color: "text-primary", bg: "bg-primary/10" },
  review: { label: "Review", color: "text-chart-3", bg: "bg-chart-3/10" },
  done: { label: "Hoàn thành", color: "text-success", bg: "bg-success/10" },
}

const priorityConfig: Record<TaskPriority, { label: string; color: string }> = {
  low: { label: "Thấp", color: "bg-muted text-muted-foreground" },
  medium: { label: "Trung bình", color: "bg-primary/10 text-primary" },
  high: { label: "Cao", color: "bg-chart-3/10 text-chart-3" },
  critical: { label: "Nghiêm trọng", color: "bg-destructive/10 text-destructive" },
}

export function TasksTab() {
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [addOpen, setAddOpen] = useState(false)

  const filteredTasks = tasks.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === "all" || t.status === filterStatus
    return matchSearch && matchStatus
  })

  // Group tasks by project
  const tasksByProject = projects.map((project) => ({
    project,
    tasks: filteredTasks.filter((task) => task.projectId === project.id)
  })).filter((group) => group.tasks.length > 0) // Only show projects that have tasks

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nhiệm vụ</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý và theo dõi tiến độ công việc
          </p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="size-4" />
              Thêm nhiệm vụ
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm nhiệm vụ mới</DialogTitle>
              <DialogDescription>
                Tạo nhiệm vụ mới và gán cho thành viên trong dự án
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Tiêu đề nhiệm vụ</Label>
                <Input id="title" placeholder="Nhập tiêu đề nhiệm vụ..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project">Dự án</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn dự án" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assignee">Người thực hiện</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn người thực hiện" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m1">Nguyễn Văn An</SelectItem>
                    <SelectItem value="m2">Trần Thị Bình</SelectItem>
                    <SelectItem value="m3">Lê Hoàng Cường</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Độ ưu tiên</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn độ ưu tiên" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Thấp</SelectItem>
                    <SelectItem value="medium">Trung bình</SelectItem>
                    <SelectItem value="high">Cao</SelectItem>
                    <SelectItem value="critical">Nghiêm trọng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddOpen(false)}>
                Hủy
              </Button>
              <Button onClick={() => setAddOpen(false)}>Tạo nhiệm vụ</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search & Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm nhiệm vụ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <Filter className="size-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="todo">Chưa làm</SelectItem>
                <SelectItem value="in-progress">Đang làm</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="done">Hoàn thành</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tasks by Project */}
      {tasksByProject.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="size-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Không tìm thấy nhiệm vụ</h3>
          <p className="text-muted-foreground">
            Thử thay đổi bộ lọc hoặc thêm nhiệm vụ mới
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {tasksByProject.map(({ project, tasks: projectTasks }) => (
            <div key={project.id} className="space-y-3">
              <div className="flex items-center gap-2">
                <FolderKanban className="size-5 text-primary" />
                <h2 className="text-xl font-semibold">{project.name}</h2>
                <Badge variant="secondary">{projectTasks.length} nhiệm vụ</Badge>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border bg-muted/50">
                          <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Nhiệm vụ</th>
                          <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Trạng thái</th>
                          <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Ưu tiên</th>
                          <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Người thực hiện</th>
                          <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Hạn</th>
                          <th className="px-4 py-3"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {projectTasks.map((task) => (
                          <tr key={task.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                            <td className="px-4 py-3 text-sm font-medium">{task.title}</td>
                            <td className="px-4 py-3">
                              <Badge variant="outline" className={cn("text-[10px]", statusConfig[task.status].bg, statusConfig[task.status].color)}>
                                {statusConfig[task.status].label}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <Badge variant="outline" className={cn("text-[10px]", priorityConfig[task.priority].color)}>
                                {priorityConfig[task.priority].label}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <Avatar className="size-6">
                                  <AvatarFallback className="text-[9px] font-medium bg-secondary text-secondary-foreground">
                                    {task.assigneeAvatar}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{task.assignee}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">
                              {new Date(task.dueDate).toLocaleDateString("vi-VN")}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm" className="size-7 p-0">
                                  <Edit className="size-3.5 text-muted-foreground" />
                                </Button>
                                <Button variant="ghost" size="sm" className="size-7 p-0">
                                  <Trash2 className="size-3.5 text-destructive" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
