import Link from "next/link"
import AuthButton from "./auth-button"
import Logo from "./logo"
import NavButton from "./nav-button"
import ThemeToggle from "./theme-toggle"
import { ScrollArea } from "./ui/scroll-area"

export default function DesktopSidebar() {
  return (
    <div className="hidden h-full flex-col gap-6 overflow-hidden p-2 pt-4 lg:flex">
      <Link href={"/"} className="px-4">
        <Logo />
      </Link>
      <ScrollArea className="h-full w-52">
        <nav className="flex flex-col gap-2">
          <NavButton href="/dashboard" name="Dashboard" />
          <NavButton href="/study" name="Study" />
          <NavButton href="/friends" name="Friends" />
          <NavButton href="/groups" name="Groups" />
          <NavButton href="/leaderboards" name="Leaderboards" />
        </nav>
      </ScrollArea>
      <div className="flex flex-col gap-2">
        <ThemeToggle />
        <AuthButton />
      </div>
    </div>
  )
}
