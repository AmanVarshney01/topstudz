import Link from "next/link"
import Logo from "./logo"
import NavButton from "./nav-button"
import ThemeToggle from "./theme-toggle"
import { ScrollArea } from "./ui/scroll-area"
import { UserMenu } from "./user-menu"
import { api } from "@/convex/_generated/api"
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server"
import { fetchQuery } from "convex/nextjs"

export default async function DesktopSidebar() {
  const viewer = await fetchQuery(
    api.users.viewer,
    {},
    { token: convexAuthNextjsToken() },
  )
  return (
    <div className="hidden h-full flex-col gap-6 overflow-hidden p-2 pt-4 lg:flex">
      <Link href={"/"} className="px-4">
        <Logo />
      </Link>
      <ScrollArea className="h-full w-52">
        <nav className="flex flex-col gap-2">
          <NavButton href="/dashboard" name="Dashboard" />
          <NavButton href="/dashboard/study" name="Study" />
          <NavButton href="/dashboard/friends" name="Friends" />
          <NavButton href="/dashboard/groups" name="Groups" />
          <NavButton href="/dashboard/leaderboards" name="Leaderboards" />
        </nav>
      </ScrollArea>
      <div className="flex flex-col items-center gap-2">
        <UserMenu>{viewer.name}</UserMenu>
      </div>
    </div>
  )
}
