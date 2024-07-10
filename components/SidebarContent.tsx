import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Button } from "./ui/button";

const menuItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Leaderboards", href: "/leaderboards" },
  { name: "Study Groups", href: "/study-groups" },
];

export default function SidebarContent() {
  return (
    <ScrollArea className="h-full py-6">
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <Button variant="ghost" className="w-full justify-start px-4">
              {item.name}
            </Button>
          </Link>
        ))}
      </nav>
    </ScrollArea>
  );
}
