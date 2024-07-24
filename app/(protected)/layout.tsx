import DesktopSidebar from "@/components/desktop-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid h-dvh grid-rows-[1fr] p-2">
      {/* <Header /> */}
      <div className="grid overflow-hidden lg:grid-cols-[auto_1fr]">
        <DesktopSidebar />
        <ScrollArea className="h-full w-full rounded-md border">
          <main className="mx-auto h-full max-w-7xl flex-1 p-2">
            {children}
          </main>
        </ScrollArea>
      </div>
      <Toaster richColors />
    </div>
  );
}
