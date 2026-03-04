"use client"

import { useState } from "react"
import { teamMembers, projects } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Mail,
  Plus,
  UserPlus,
  BarChart3,
  Shield,
  Edit,
} from "lucide-react"
import { cn } from "@/lib/utils"

const availabilityConfig: Record<string, { label: string; color: string; dot: string }> = {
  available: { label: "Sẵn sàng", color: "text-success", dot: "bg-success" },
  busy: { label: "Bận", color: "text-chart-3", dot: "bg-chart-3" },
  off: { label: "Nghỉ", color: "text-muted-foreground", dot: "bg-muted-foreground" },
}

const permissionConfig = {
  admin: { label: "Admin", color: "bg-red-500/10 text-red-700 dark:text-red-400", icon: "👑" },
  member: { label: "Thành viên", color: "bg-blue-500/10 text-blue-700 dark:text-blue-400", icon: "👤" },
  viewer: { label: "Xem", color: "bg-gray-500/10 text-gray-700 dark:text-gray-400", icon: "👁️" },
}

export function TeamTab() {
  const [inviteOpen, setInviteOpen] = useState(false)
  const [editMemberId, setEditMemberId] = useState<string | null>(null)
  
  const totalAssigned = teamMembers.reduce((a, m) => a + m.tasksAssigned, 0)
  const totalCompleted = teamMembers.reduce((a, m) => a + m.tasksCompleted, 0)

  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
                <UserPlus className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{teamMembers.length}</p>
                <p className="text-xs text-muted-foreground">Tổng thành viên</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-10 rounded-lg bg-success/10">
                <BarChart3 className="size-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{Math.round((totalCompleted / totalAssigned) * 100)}%</p>
                <p className="text-xs text-muted-foreground">Tỷ lệ hoàn thành</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-10 rounded-lg bg-chart-3/10">
                <BarChart3 className="size-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalAssigned - totalCompleted}</p>
                <p className="text-xs text-muted-foreground">Nhiệm vụ đang chờ</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Danh sách thành viên</h3>
        <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="h-8">
              <Plus className="size-3.5 mr-1.5" />
              Mời thành viên
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Mời thành viên mới</DialogTitle>
              <DialogDescription>
                Thêm thành viên vào dự án và phân quyền
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="member@company.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Vai trò</Label>
                <Input id="role" placeholder="VD: Frontend Developer" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="permission">Quyền truy cập</Label>
                <Select defaultValue="member">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <span>👑</span>
                        <span>Admin - Toàn quyền</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="member">
                      <div className="flex items-center gap-2">
                        <span>👤</span>
                        <span>Thành viên - Chỉnh sửa</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="viewer">
                      <div className="flex items-center gap-2">
                        <span>👁️</span>
                        <span>Xem - Chỉ xem</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setInviteOpen(false)}>
                Hủy
              </Button>
              <Button onClick={() => setInviteOpen(false)}>
                Gửi lời mời
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Team grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {teamMembers.map((member) => {
          const avail = availabilityConfig[member.availability]
          const perm = permissionConfig[member.permission]
          const completionRate = Math.round((member.tasksCompleted / member.tasksAssigned) * 100)
          return (
            <Card key={member.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="relative">
                    <Avatar className="size-14">
                      <AvatarFallback className="bg-primary/10 text-primary text-base font-semibold">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className={cn("absolute bottom-0 right-0 size-3.5 rounded-full border-2 border-card", avail.dot)} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={cn("text-[10px]", avail.color)}>
                      {avail.label}
                    </Badge>
                    <Badge variant="secondary" className={cn("text-[10px]", perm.color)}>
                      <span className="mr-1">{perm.icon}</span>
                      {perm.label}
                    </Badge>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">Tiến độ</span>
                      <span className="font-semibold">{completionRate}%</span>
                    </div>
                    <Progress value={completionRate} className="h-1.5" />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Nhiệm vụ</span>
                    <span className="font-medium">{member.tasksCompleted}/{member.tasksAssigned}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Mail className="size-3" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  
                  {/* Dự án tham gia */}
                  {member.projects && member.projects.length > 0 && (
                    <div className="pt-2 border-t">
                      <div className="text-[10px] text-muted-foreground mb-1.5">Dự án:</div>
                      <div className="flex flex-wrap gap-1">
                        {member.projects.map((projectId) => {
                          const project = projects.find(p => p.id === projectId)
                          return project ? (
                            <Badge 
                              key={projectId} 
                              variant="secondary" 
                              className="text-[9px] px-1.5 py-0 h-5"
                            >
                              {project.name}
                            </Badge>
                          ) : null
                        })}
                      </div>
                    </div>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => setEditMemberId(member.id)}
                  >
                    <Edit className="size-3 mr-1.5" />
                    Chỉnh sửa quyền
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Edit permission dialog */}
      <Dialog open={!!editMemberId} onOpenChange={() => setEditMemberId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa quyền thành viên</DialogTitle>
            <DialogDescription>
              Thay đổi vai trò và quyền truy cập của thành viên
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-role">Vai trò</Label>
              <Input id="edit-role" placeholder="Frontend Developer" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-permission">Quyền truy cập</Label>
              <Select defaultValue="member">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <span>👑</span>
                      <span>Admin - Toàn quyền</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="member">
                    <div className="flex items-center gap-2">
                      <span>👤</span>
                      <span>Thành viên - Chỉnh sửa</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="viewer">
                    <div className="flex items-center gap-2">
                      <span>👁️</span>
                      <span>Xem - Chỉ xem</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditMemberId(null)}>
              Hủy
            </Button>
            <Button onClick={() => setEditMemberId(null)}>
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
