"use client"

import { useState, useMemo } from "react"
import {
  Plus,
  FileText,
  Download,
  Eye,
  BarChart3,
  TrendingUp,
  Users,
  AlertTriangle,
  Calendar,
  Trash2,
  FolderOpen,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { reports, projects, type ReportType } from "@/lib/data"

const reportTemplates = [
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

const reportTypeLabels: Record<ReportType, string> = {
  "project-summary": "Tổng quan dự án",
  "task-progress": "Tiến độ nhiệm vụ",
  "team-performance": "Hiệu suất nhóm",
  "risk-analysis": "Phân tích rủi ro",
}

const reportTypeColors: Record<ReportType, string> = {
  "project-summary": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  "task-progress": "bg-green-500/10 text-green-700 dark:text-green-400",
  "team-performance": "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  "risk-analysis": "bg-orange-500/10 text-orange-700 dark:text-orange-400",
}

export function ReportsTab() {
  const [createOpen, setCreateOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<ReportType | "">("")
  const [selectedProjectFilter, setSelectedProjectFilter] = useState<string>("all")

  // Group reports by project
  const reportsByProject = useMemo(() => {
    const grouped = new Map<string, typeof reports>()
    
    reports.forEach((report) => {
      const projectId = report.projectId || "unassigned"
      if (!grouped.has(projectId)) {
        grouped.set(projectId, [])
      }
      grouped.get(projectId)?.push(report)
    })
    
    return grouped
  }, [])

  // Filter reports by selected project
  const filteredReports = useMemo(() => {
    if (selectedProjectFilter === "all") {
      return reports
    }
    return reports.filter((report) => report.projectId === selectedProjectFilter)
  }, [selectedProjectFilter])

  // Get project name by id
  const getProjectName = (projectId?: string) => {
    if (!projectId) return "Chưa phân loại"
    return projects.find((p) => p.id === projectId)?.name || "Dự án không xác định"
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Báo cáo</h1>
          <p className="text-muted-foreground mt-1">
            Tạo và quản lý báo cáo dự án
          </p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="size-4" />
              Tạo báo cáo mới
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tạo báo cáo mới</DialogTitle>
              <DialogDescription>
                Chọn loại báo cáo và cấu hình tham số
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="reportType">Loại báo cáo</Label>
                <Select value={selectedTemplate} onValueChange={(v) => setSelectedTemplate(v as ReportType)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại báo cáo" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTemplates.map((template) => (
                      <SelectItem key={template.type} value={template.type}>
                        {template.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project">Dự án</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn dự án" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Từ ngày</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endDate">Đến ngày</Label>
                  <Input id="endDate" type="date" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateOpen(false)}>
                Hủy
              </Button>
              <Button onClick={() => setCreateOpen(false)}>
                Tạo báo cáo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Mẫu báo cáo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportTemplates.map((template) => {
            const Icon = template.icon
            return (
              <Card
                key={template.type}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedTemplate(template.type)
                  setCreateOpen(true)
                }}
              >
                <CardHeader>
                  <div className={`size-12 rounded-lg flex items-center justify-center ${template.color} mb-3`}>
                    <Icon className="size-6" />
                  </div>
                  <CardTitle className="text-base">{template.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {template.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Báo cáo theo dự án</h2>
          <Select value={selectedProjectFilter} onValueChange={setSelectedProjectFilter}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Chọn dự án" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả dự án ({reports.length})</SelectItem>
              {projects.map((project) => {
                const count = reports.filter((r) => r.projectId === project.id).length
                return (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name} ({count})
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>

        {selectedProjectFilter === "all" ? (
          // Show grouped by project
          <div className="space-y-6">
            {Array.from(reportsByProject.entries()).map(([projectId, projectReports]) => {
              const projectName = getProjectName(projectId === "unassigned" ? undefined : projectId)
              
              return (
                <div key={projectId}>
                  <div className="flex items-center gap-2 mb-3">
                    <FolderOpen className="size-5 text-muted-foreground" />
                    <h3 className="font-semibold text-lg">{projectName}</h3>
                    <Badge variant="secondary">{projectReports.length} báo cáo</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projectReports.map((report) => (
                      <Card key={report.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-sm font-medium line-clamp-2">
                                {report.name}
                              </CardTitle>
                              <CardDescription className="text-xs mt-1">
                                {report.generatedBy}
                              </CardDescription>
                            </div>
                            <Badge
                              variant="secondary"
                              className={`${reportTypeColors[report.type]} shrink-0 text-xs`}
                            >
                              {reportTypeLabels[report.type]}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Calendar className="size-3" />
                              {new Date(report.generatedAt).toLocaleDateString("vi-VN")}
                            </div>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" className="size-7 p-0">
                                <Eye className="size-3.5" />
                              </Button>
                              <Button variant="ghost" size="sm" className="size-7 p-0">
                                <Download className="size-3.5" />
                              </Button>
                              <Button variant="ghost" size="sm" className="size-7 p-0 text-destructive">
                                <Trash2 className="size-3.5" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          // Show flat list for selected project
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm font-medium line-clamp-2">
                        {report.name}
                      </CardTitle>
                      <CardDescription className="text-xs mt-1">
                        {report.generatedBy}
                      </CardDescription>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`${reportTypeColors[report.type]} shrink-0 text-xs`}
                    >
                      {reportTypeLabels[report.type]}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="size-3" />
                      {new Date(report.generatedAt).toLocaleDateString("vi-VN")}
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="size-7 p-0">
                        <Eye className="size-3.5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="size-7 p-0">
                        <Download className="size-3.5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="size-7 p-0 text-destructive">
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-base">Xuất báo cáo</CardTitle>
          <CardDescription>
            Xuất báo cáo dưới định dạng khác nhau
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="size-4" />
              Xuất PDF
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="size-4" />
              Xuất Excel
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="size-4" />
              Xuất CSV
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
