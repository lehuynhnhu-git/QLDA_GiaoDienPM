import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: string
  config: Record<string, { label: string; color: string; bg?: string }>
  className?: string
}

export function StatusBadge({ status, config, className }: StatusBadgeProps) {
  const statusInfo = config[status]
  if (!statusInfo) return null

  return (
    <Badge
      variant="outline"
      className={cn(
        "text-[10px]",
        statusInfo.bg || "",
        statusInfo.color,
        className
      )}
    >
      {statusInfo.label}
    </Badge>
  )
}
