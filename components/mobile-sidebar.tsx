"use client"

import { Menu } from "lucide-react"
import { useState } from "react"
import Logo from "./logo"
import NavButton from "./nav-button"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"

export default function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-56">
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
          <SheetDescription className="sr-only">Menu</SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-2 px-2 py-6">
          <NavButton
            href="/dashboard"
            name="Dashboard"
            onClick={() => setOpen(false)}
          />
          <NavButton
            href="/dashboard/study"
            name="Study"
            onClick={() => setOpen(false)}
          />
          {/* <NavButton
            href="/dashboard/friends"
            name="Friends"
            onClick={() => setOpen(false)}
          /> */}
          <NavButton
            href="/dashboard/groups"
            name="Groups"
            onClick={() => setOpen(false)}
          />
          <NavButton
            href="/dashboard/leaderboards"
            name="Leaderboards"
            onClick={() => setOpen(false)}
          />
        </nav>
      </SheetContent>
    </Sheet>
  )
}
