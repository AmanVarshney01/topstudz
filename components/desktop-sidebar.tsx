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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
  useSidebar,
  SidebarRail,
} from "./ui/sidebar"
import Logo from "./logo"
import { api } from "@/convex/_generated/api"
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Trophy,
  UserPlus,
} from "lucide-react"
import { UserMenu } from "./user-menu"
import { useQuery } from "convex/react"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { CommandMenu } from "./command-menu"

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
    hasSubMenu: true, // Add this to indicate it has a submenu
  },
  {
    name: "Leaderboards",
    href: "/dashboard/leaderboards",
    icon: Trophy,
  },
]

export default function DesktopSidebar() {
  const viewer = useQuery(api.users.viewer)
  const groups = useQuery(api.groups.listMyGroups)
  const pathname = usePathname()
  const { state } = useSidebar()

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      className="rounded-lg border bg-background"
    >
      <SidebarHeader className="w-full items-center bg-background">
        <Link href="/" className="flex items-center gap-2 pb-2">
          <Logo variant={state === "collapsed" ? "small" : "default"} />
        </Link>
        {state === "expanded" && <CommandMenu />}
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="bg-background p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                tooltip={item.name}
                className="gap-3"
                isActive={pathname === item.href}
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
              {item.hasSubMenu && groups && (
                <SidebarMenuSub>
                  {groups.map((group) => (
                    <SidebarMenuSubItem key={group._id}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathname === `/dashboard/groups/${group._id}`}
                      >
                        <Link href={`/dashboard/groups/${group._id}`}>
                          <span>{group.name}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="bg-background">
        <UserMenu
          state={state}
          avatar={viewer?.image!}
          name={viewer?.name!}
          email={viewer?.email!}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
