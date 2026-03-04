"use client"

import { projects, tasks, teamMembers } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  FolderKanban,
  ListChecks,
  Users,
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react"
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Tooltip as RechartsTooltip,
} from "recharts"
import { projectStatusColors, projectStatusLabels } from "@/lib/configs"
import { formatDate } from "@/lib/formatters"

const taskStatusData = [
  { name: "Chưa làm", value: tasks.filter((t) => t.status === "todo").length, fill: "#94a3b8" },
  { name: "Đang làm", value: tasks.filter((t) => t.status === "in-progress").length, fill: "#3b82f6" },
  { name: "Review", value: tasks.filter((t) => t.status === "review").length, fill: "#f59e0b" },
  { name: "Xong", value: tasks.filter((t) => t.status === "done").length, fill: "#10b981" },
]

const budgetData = projects.map((p) => ({
  name: p.name.length > 12 ? p.name.slice(0, 12) + "..." : p.name,
  budget: Math.round(p.budget / 1000000),
  spent: Math.round(p.spent / 1000000),
}))

const totalTasks = projects.reduce((a, p) => a + p.tasksTotal, 0)
const completedTasks = projects.reduce((a, p) => a + p.tasksDone, 0)
const activeProjects = projects.filter((p) => p.status === "active").length

export function OverviewTab() {
  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Dự án",
            value: projects.length,
            sub: `${activeProjects} đang triển khai`,
            icon: FolderKanban,
            color: "text-primary",
            bgColor: "bg-primary/10",
          },
          {
            label: "Nhiệm vụ",
            value: totalTasks,
            sub: `${completedTasks} hoàn thành`,
            icon: ListChecks,
            color: "text-success",
            bgColor: "bg-success/10",
          },
          {
            label: "Thành viên",
            value: teamMembers.length,
            sub: `${teamMembers.filter((m) => m.availability === "available").length} sẵn sàng`,
            icon: Users,
            color: "text-chart-3",
            bgColor: "bg-chart-3/10",
          },
          {
            label: "Rủi ro cao",
            value: 2,
            sub: "Cần xử lý ngay",
            icon: AlertTriangle,
            color: "text-destructive",
            bgColor: "bg-destructive/10",
          },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
                </div>
                <div className={`flex items-center justify-center size-10 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`size-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects list */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <TrendingUp className="size-4 text-primary" />
              Tiến độ dự án
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {projects.map((project) => (
              <div key={project.id} className="flex flex-col gap-2 rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm">{project.name}</span>
                    <Badge className={projectStatusColors[project.status]} variant="secondary">
                      {projectStatusLabels[project.status]}
                    </Badge>
                  </div>
                  <span className="text-sm font-semibold">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="size-3" />
                    <span>{project.tasksDone}/{project.tasksTotal} nhiệm vụ</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="size-3" />
                    <span>Hạn: {formatDate(project.endDate)}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Task status pie */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Phân bổ nhiệm vụ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {taskStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {taskStatusData.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <div className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: item.fill }} />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-semibold ml-auto">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget chart */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <ArrowUpRight className="size-4 text-primary" />
            Ngân sách dự án (triệu VND)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
                <YAxis tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="budget" name="Ngân sách" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="spent" name="Đã chi" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent activity */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Hoạt động gần đây</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {[
              { user: "NA", name: "Nguyễn Văn An", action: 'hoàn thành nhiệm vụ "Thiết kế giao diện trang chủ"', time: "2 giờ trước" },
              { user: "TB", name: "Trần Thị Bình", action: "cập nhật tiến độ API xác thực lên 65%", time: "3 giờ trước" },
              { user: "LC", name: "Lê Hoàng Cường", action: 'gửi review "Kiểm thử tích hợp thanh toán"', time: "5 giờ trước" },
              { user: "TH", name: "Hoàng Thu Hà", action: "thêm 3 nhiệm vụ mới vào Mobile App v2.0", time: "1 ngày trước" },
            ].map((act, i) => (
              <div key={i} className="flex items-start gap-3">
                <Avatar className="size-8 mt-0.5">
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-medium">
                    {act.user}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{act.name}</span>{" "}
                    <span className="text-muted-foreground">{act.action}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
