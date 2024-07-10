"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const menuItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Leaderboards", href: "/leaderboards" },
  { name: "Study Groups", href: "/study-groups" },
];

export default function SidebarContent() {
  const path = usePathname().split("/");
  const currentPath = path[1];

  return (
    <ScrollArea className="h-full py-6 px-2">
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start px-4",
                currentPath === item.href.slice(1) ? "bg-accent text-accent-foreground" : "",
              )}
            >
              {item.name}
            </Button>
          </Link>
        ))}
      </nav>
    </ScrollArea>
  );
}
