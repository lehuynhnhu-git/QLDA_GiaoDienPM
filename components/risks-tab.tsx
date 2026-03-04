"use client"

import { risks, type RiskLevel } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ShieldAlert,
  Plus,
  User,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  riskLevelConfig,
  riskStatusConfig,
  riskImpactLabels,
  riskProbLabels,
} from "@/lib/configs"
import { StatusBadge } from "@/components/common/status-badge"

export function RisksTab() {
  const openRisks = risks.filter((r) => r.status === "open").length
  const mitigatingRisks = risks.filter((r) => r.status === "mitigating").length
  const resolvedRisks = risks.filter((r) => r.status === "resolved").length
  const criticalRisks = risks.filter((r) => r.level === "critical").length

  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Tổng rủi ro", value: risks.length, color: "text-foreground", bg: "bg-secondary" },
          { label: "Đang mở", value: openRisks, color: "text-destructive", bg: "bg-destructive/10" },
          { label: "Đang xử lý", value: mitigatingRisks, color: "text-chart-3", bg: "bg-chart-3/10" },
          { label: "Đã giải quyết", value: resolvedRisks, color: "text-success", bg: "bg-success/10" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className={cn("text-2xl font-bold mt-1", stat.color)}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <ShieldAlert className="size-4 text-destructive" />
          Danh sách rủi ro
        </h3>
        <Button size="sm" className="h-8">
          <Plus className="size-3.5 mr-1.5" />
          Thêm rủi ro
        </Button>
      </div>

      {/* Risk matrix hint */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Ma trận rủi ro</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs">
              <thead>
                <tr>
                  <th className="p-2 text-muted-foreground font-medium" rowSpan={2}>Xác suất \ Tác động</th>
                  <th className="p-2 text-muted-foreground font-medium">Thấp</th>
                  <th className="p-2 text-muted-foreground font-medium">Trung bình</th>
                  <th className="p-2 text-muted-foreground font-medium">Cao</th>
                </tr>
              </thead>
              <tbody>
                {(["high", "medium", "low"] as const).map((prob) => (
                  <tr key={prob}>
                    <td className="p-2 font-medium text-muted-foreground">{riskProbLabels[prob]}</td>
                    {(["low", "medium", "high"] as const).map((impact) => {
                      const count = risks.filter(
                        (r) => r.probability === prob && r.impact === impact && r.status !== "resolved"
                      ).length
                      const isHighRisk = (prob === "high" && impact === "high") || (prob === "high" && impact === "medium") || (prob === "medium" && impact === "high")
                      return (
                        <td key={impact} className="p-2">
                          <div
                            className={cn(
                              "inline-flex items-center justify-center size-10 rounded-lg font-bold",
                              count > 0
                                ? isHighRisk
                                  ? "bg-destructive/15 text-destructive"
                                  : "bg-chart-3/10 text-chart-3"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {count}
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Risk list */}
      <div className="flex flex-col gap-3">
        {risks.map((risk) => {
          const level = riskLevelConfig[risk.level]
          const status = riskStatusConfig[risk.status]
          const LevelIcon = level.icon
          return (
            <Card key={risk.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className={cn("flex items-center justify-center size-10 rounded-lg shrink-0", level.bg)}>
                    <LevelIcon className={cn("size-5", level.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className="text-sm font-semibold">{risk.title}</h4>
                      <Badge variant="outline" className={cn("text-[10px]", level.color)}>{level.label}</Badge>
                      <Badge variant="outline" className={cn("text-[10px]", status.color)}>{status.label}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{risk.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Xác suất: </span>
                        <span className="font-medium">{riskProbLabels[risk.probability]}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tác động: </span>
                        <span className="font-medium">{riskImpactLabels[risk.impact]}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="size-3 text-muted-foreground" />
                        <span className="font-medium">{risk.owner}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-start gap-2 rounded-md bg-muted/50 p-2.5">
                      <ArrowRight className="size-3 text-primary mt-0.5 shrink-0" />
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">Biện pháp: </span>
                        {risk.mitigation}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
