import Link from "next/link"
import Logo from "./logo"
import { SidebarTrigger } from "./ui/sidebar"

export default function Header() {
  return (
    <header className="flex w-full flex-row items-center justify-between bg-background px-4 py-2 md:hidden">
      <div className="flex flex-row items-center justify-center gap-2">
        <SidebarTrigger />
        <Link href={"/"}>
          <Logo />
        </Link>
      </div>
    </header>
  )
}
