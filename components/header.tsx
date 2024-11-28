import Link from "next/link"
// import AuthButton from "./auth-button"
import Logo from "./logo"
import MobileSidebar from "./mobile-sidebar"
import ThemeToggle from "./theme-toggle"
import { SidebarTrigger } from "./ui/sidebar"

export default function Header() {
  return (
    <header className="flex w-full flex-row items-center justify-between bg-background px-4 py-2 lg:hidden">
      <div className="flex flex-row items-center justify-center gap-2">
        <SidebarTrigger />
        <Link href={"/"}>
          <Logo />
        </Link>
      </div>
      <nav className="flex flex-row items-center gap-2">
        <ThemeToggle />
        {/* <AuthButton /> */}
      </nav>
    </header>
  )
}
