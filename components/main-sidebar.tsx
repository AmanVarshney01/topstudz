"use client"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import {
  BookOpen,
  Bot,
  Calendar,
  LayoutDashboard,
  Trophy,
  Users,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CommandMenu } from "./command-menu"
import Logo from "./logo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "./ui/sidebar"
import { UserMenu } from "./user-menu"
import { TopsDisplay } from "./tops-display"

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
    name: "Calendar",
    href: "/dashboard/calendar",
    icon: Calendar,
  },
  {
    name: "Groups",
    href: "/dashboard/groups",
    icon: Users,
    hasSubMenu: true,
  },
  {
    name: "Leaderboards",
    href: "/dashboard/leaderboards",
    icon: Trophy,
  },
  {
    name: "AI Helper",
    href: "/dashboard/ai-helper",
    icon: Bot,
  },
]

function NavGroupsSkeleton() {
  return (
    <SidebarMenu>
      {Array.from({ length: 3 }).map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuSkeleton />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

export default function MainSidebar() {
  const viewer = useQuery(api.users.viewer)
  const groups = useQuery(api.groups.listMyGroups)
  const pathname = usePathname()
  const { state } = useSidebar()

  if (!viewer || !groups) {
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
                {item.hasSubMenu && <NavGroupsSkeleton />}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter className="bg-background">
          <SidebarMenuSkeleton />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    )
  }

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
        {state === "expanded" && <TopsDisplay />}
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
