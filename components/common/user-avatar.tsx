import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getInitials } from "@/lib/formatters"
import { cn } from "@/lib/utils"

interface UserAvatarProps {
  name: string
  size?: "sm" | "md" | "lg"
  className?: string
  fallbackClassName?: string
}

const sizeClasses = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
}

const textSizeClasses = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
}

export function UserAvatar({
  name,
  size = "md",
  className,
  fallbackClassName,
}: UserAvatarProps) {
  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      <AvatarFallback
        className={cn(
          "bg-primary/10 text-primary",
          textSizeClasses[size],
          fallbackClassName
        )}
      >
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  )
}
