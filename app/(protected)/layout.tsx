import DesktopSidebar from "@/components/DesktopSidebar";
import Header from "@/components/header";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full flex-col">
      <Header />
      <div className="flex h-svh pt-16">
        <DesktopSidebar />
        <ScrollArea className="w-full">
          <main className="h-full flex-1">{children}</main>
        </ScrollArea>
      </div>
    </div>
  );
}
