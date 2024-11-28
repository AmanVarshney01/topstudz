"use client"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  useSidebar,
} from "./ui/sidebar"
import Logo from "./logo"
import { api } from "@/convex/_generated/api"
import { LayoutDashboard, BookOpen, Users, Trophy } from "lucide-react"
import { UserMenu } from "./user-menu"
import { useQuery } from "convex/react"

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Study",
    href: "/dashboard/study",
    icon: BookOpen,
  },
  {
    name: "Groups",
    href: "/dashboard/groups",
    icon: Users,
  },
  {
    name: "Leaderboards",
    href: "/dashboard/leaderboards",
    icon: Trophy,
  },
]

export default function DesktopSidebar() {
  const viewer = useQuery(api.users.viewer)

  const { state } = useSidebar()

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      className="rounded-lg border bg-background"
    >
      <SidebarHeader className="items-center p-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild tooltip={item.name} className="gap-3">
                <Link href={item.href}>
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <UserMenu
          state={state}
          avatar={viewer?.image!}
          name={viewer?.name!}
          email={viewer?.email!}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
