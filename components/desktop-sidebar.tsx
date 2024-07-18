import NavButton from "./nav-button";
import { ScrollArea } from "./ui/scroll-area";

export default function DesktopSidebar() {
  return (
    <div className="hidden h-full overflow-hidden lg:block">
      <ScrollArea className="h-full w-56 border-r">
        <nav className="flex flex-col gap-2 px-2 py-6">
          <NavButton href="/dashboard" name="Dashboard" />
          <NavButton href="/study" name="Study" />
          <NavButton href="/friends" name="Friends" />
          <NavButton href="/groups" name="Groups" />
          <NavButton href="/leaderboards" name="Leaderboards" />
        </nav>
      </ScrollArea>
    </div>
  );
}
