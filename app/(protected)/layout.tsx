import DesktopSidebar from "@/components/desktop-sidebar"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import Header from "@/components/header"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Toaster } from "@/components/ui/sonner"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <NuqsAdapter>
      <div className="grid h-dvh grid-rows-[auto_1fr] p-2">
        <Header />
        <div className="grid overflow-hidden lg:grid-cols-[auto_1fr]">
          <DesktopSidebar />
          <ScrollArea className="min-h-[calc(100svh-20px)] w-full rounded-md border">
            <main className="mx-auto h-full max-w-7xl flex-1 p-2">
              {children}
            </main>
          </ScrollArea>
        </div>
        <Toaster richColors />
      </div>
    </NuqsAdapter>
  )
}
