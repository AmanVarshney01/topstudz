import SidebarContent from "./SidebarContent";
import { ScrollArea } from "./ui/scroll-area";

export default function DesktopSidebar() {
  return (
    <div className="hidden h-full overflow-hidden lg:block">
      <ScrollArea className="h-full w-56 border-r">
        <SidebarContent />
      </ScrollArea>
    </div>
  );
}
