import SidebarContent from "./SidebarContent";

export default function DesktopSidebar() {
  return (
    <div className="hidden h-full lg:block">
      <div className="h-full w-56 border-r">
        <SidebarContent />
      </div>
    </div>
  );
}
