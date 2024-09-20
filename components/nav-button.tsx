"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"

export default function NavButton({
  href,
  name,
  onClick,
}: {
  href: string
  name: string
  onClick?: () => void
}) {
  const path = usePathname()

  return (
    <Button
      key={name}
      variant="ghost"
      className={cn(
        "justify-start",
        path === href &&
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
      )}
      asChild
      onClick={onClick}
    >
      <Link href={href}>{name}</Link>
    </Button>
  )
}
