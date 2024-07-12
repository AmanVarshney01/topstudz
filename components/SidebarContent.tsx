"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const menuItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Study", href: "/study" },
  { name: "Friends", href: "/friends" },
  { name: "Groups", href: "/groups" },
  { name: "Leaderboards", href: "/leaderboards" },
];

export default function SidebarContent() {
  const path = usePathname().split("/");
  const currentPath = path[1];

  return (
    <nav className="flex flex-col gap-2 px-2 py-6">
      {menuItems.map((item) => (
        <Button
          key={item.name}
          variant="ghost"
          className={cn(
            "justify-start",
            currentPath === item.href.slice(1)
              ? "bg-accent text-accent-foreground"
              : null,
          )}
          asChild
        >
          <Link href={item.href}>{item.name}</Link>
        </Button>
      ))}
    </nav>
  );
}
