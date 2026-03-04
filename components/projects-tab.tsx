"use client"

import { useState } from "react"
import { Plus, MoreVertical, Calendar, DollarSign, Users as UsersIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { projects } from "@/lib/data"
import { projectStatusConfig } from "@/lib/configs"
import { formatDateWithOptions } from "@/lib/formatters"
import { UserAvatar } from "@/components/common/user-avatar"

export function ProjectsTab() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dự án</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý tất cả dự án của bạn
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="size-4" />
              Tạo dự án mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Tạo dự án mới</DialogTitle>
              <DialogDescription>
                Điền thông tin để tạo dự án mới cho nhóm của bạn
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Tên dự án</Label>
                <Input id="name" placeholder="VD: Website Redesign 2026" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Ngày bắt đầu</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endDate">Ngày kết thúc</Label>
                  <Input id="endDate" type="date" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="budget">Ngân sách (VNĐ)</Label>
                <Input id="budget" type="number" placeholder="150000000" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  placeholder="Mô tả ngắn về dự án..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Hủy
              </Button>
              <Button onClick={() => setOpen(false)}>Tạo dự án</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
              <div className="space-y-1 flex-1">
                <CardTitle className="text-lg line-clamp-1">
                  {project.name}
                </CardTitle>
                <Badge className={projectStatusConfig[project.status].color} variant="secondary">
                  {projectStatusConfig[project.status].label}
                </Badge>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                  <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                  <DropdownMenuItem>Xuất báo cáo</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    Xóa dự án
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Tiến độ</span>
                  <span className="font-semibold">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Thời gian</span>
                    <span className="font-medium text-xs">
                      {formatDateWithOptions(project.startDate, {
                        day: "2-digit",
                        month: "2-digit",
                      })}
                      {" - "}
                      {formatDateWithOptions(project.endDate, {
                        day: "2-digit",
                        month: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <UsersIcon className="size-4 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Nhiệm vụ</span>
                    <span className="font-medium text-xs">
                      {project.tasksDone}/{project.tasksTotal}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="size-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Ngân sách:</span>
                  </div>
                  <span className="font-semibold">
                    {(project.spent / 1000000).toFixed(1)}M / {(project.budget / 1000000).toFixed(0)}M
                  </span>
                </div>
                <Progress
                  value={(project.spent / project.budget) * 100}
                  className="h-1.5 mt-2"
                />
              </div>

              {/* Team Members Section */}
              {project.teamMembers && project.teamMembers.length > 0 && (
                <div className="pt-3 border-t">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs text-muted-foreground mt-1">Team</span>
                    <div className="flex-1 space-y-1.5">
                      {project.teamMembers.slice(0, 3).map((member, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <UserAvatar
                            name={member.name}
                            size="sm"
                            className="size-6 shrink-0"
                            fallbackClassName="text-[9px] font-semibold"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-medium truncate leading-tight">
                              {member.name}
                            </p>
                            <p className="text-[10px] text-muted-foreground truncate leading-tight">
                              {member.role}
                            </p>
                          </div>
                        </div>
                      ))}
                      {project.teamMembers.length > 3 && (
                        <p className="text-[10px] text-muted-foreground pl-8">
                          +{project.teamMembers.length - 3} người khác
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
