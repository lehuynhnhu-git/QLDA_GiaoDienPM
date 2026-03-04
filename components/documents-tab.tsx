"use client"

import { useState } from "react"
import {
  Plus,
  Search,
  Filter,
  Grid3x3,
  List,
  FileText,
  FileImage,
  FileSpreadsheet,
  File,
  Download,
  Trash2,
  Eye,
  Upload,
  FolderKanban,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { documents, projects, type DocumentType } from "@/lib/data"

const typeConfig = {
  pdf: { icon: FileText, label: "PDF", color: "text-red-600" },
  doc: { icon: FileText, label: "Word", color: "text-blue-600" },
  xls: { icon: FileSpreadsheet, label: "Excel", color: "text-green-600" },
  img: { icon: FileImage, label: "Image", color: "text-purple-600" },
  other: { icon: File, label: "Other", color: "text-gray-600" },
}

export function DocumentsTab() {
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState<DocumentType | "all">("all")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [uploadOpen, setUploadOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filteredDocuments = documents.filter((doc) => {
    const matchSearch = doc.name.toLowerCase().includes(search.toLowerCase())
    const matchType = filterType === "all" || doc.type === filterType
    return matchSearch && matchType
  })

  // Group documents by project
  const documentsByProject = projects.map((project) => ({
    project,
    documents: filteredDocuments.filter((doc) => doc.projectId === project.id)
  })).filter((group) => group.documents.length > 0) // Only show projects that have documents

  const getFileIcon = (type: DocumentType) => {
    const Icon = typeConfig[type].icon
    return <Icon className={`size-8 ${typeConfig[type].color}`} />
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tài liệu</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý tất cả tài liệu dự án
          </p>
        </div>
        <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Upload className="size-4" />
              Tải lên tài liệu
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tải lên tài liệu</DialogTitle>
              <DialogDescription>
                Chọn file từ máy tính của bạn để tải lên
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="file">Chọn file</Label>
                <Input id="file" type="file" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project">Dự án</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn dự án" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="p1">Website Redesign</SelectItem>
                    <SelectItem value="p2">Mobile App v2.0</SelectItem>
                    <SelectItem value="p3">API Integration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setUploadOpen(false)}>
                Hủy
              </Button>
              <Button onClick={() => setUploadOpen(false)}>Tải lên</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm tài liệu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={(v) => setFilterType(v as DocumentType | "all")}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="size-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="doc">Word</SelectItem>
                  <SelectItem value="xls">Excel</SelectItem>
                  <SelectItem value="img">Hình ảnh</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border rounded-md">
                <Button
                  variant={view === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setView("grid")}
                  className="rounded-r-none"
                >
                  <Grid3x3 className="size-4" />
                </Button>
                <Button
                  variant={view === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setView("list")}
                  className="rounded-l-none"
                >
                  <List className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {documentsByProject.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="size-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Không tìm thấy tài liệu</h3>
          <p className="text-muted-foreground">
            Thử thay đổi bộ lọc hoặc tải lên tài liệu mới
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {documentsByProject.map(({ project, documents: projectDocs }) => (
            <div key={project.id} className="space-y-3">
              <div className="flex items-center gap-2">
                <FolderKanban className="size-5 text-primary" />
                <h2 className="text-xl font-semibold">{project.name}</h2>
                <Badge variant="secondary">{projectDocs.length} tài liệu</Badge>
              </div>
              
              {view === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {projectDocs.map((doc) => (
                    <Card key={doc.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-full flex justify-center py-4 bg-muted/30 rounded-lg">
                            {getFileIcon(doc.type)}
                          </div>
                          <div className="w-full space-y-2">
                            <p className="font-medium text-sm line-clamp-2 text-center">
                              {doc.name}
                            </p>
                            <div className="flex items-center justify-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {typeConfig[doc.type].label}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {doc.size}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground text-center">
                              <div>{doc.uploadedBy}</div>
                              <div>
                                {new Date(doc.uploadedAt).toLocaleDateString("vi-VN")}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-1 w-full">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Eye className="size-3 mr-1" />
                              Xem
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Download className="size-3 mr-1" />
                              Tải
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setDeleteId(doc.id)}
                            >
                              <Trash2 className="size-3 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {projectDocs.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            {getFileIcon(doc.type)}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{doc.name}</p>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                <span>{doc.uploadedBy}</span>
                                <span>•</span>
                                <span>
                                  {new Date(doc.uploadedAt).toLocaleDateString("vi-VN")}
                                </span>
                                <span>•</span>
                                <span>{doc.size}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{typeConfig[doc.type].label}</Badge>
                            <Button variant="ghost" size="sm">
                              <Eye className="size-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDeleteId(doc.id)}
                            >
                              <Trash2 className="size-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa tài liệu?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Tài liệu sẽ bị xóa vĩnh viễn.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={() => setDeleteId(null)}>
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
