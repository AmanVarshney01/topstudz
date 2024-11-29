import DesktopSidebar from "@/components/desktop-sidebar"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import Header from "@/components/header"
import { Toaster } from "@/components/ui/sonner"
import ConvexClientProvider from "@/components/convex-client-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { CommandMenu } from "@/components/command-menu"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ConvexClientProvider>
      <NuqsAdapter>
        <SidebarProvider className="flex flex-col md:flex-row">
          <Header />
          <DesktopSidebar />
          <main className="w-full bg-background p-4">{children}</main>
          <Toaster richColors />
          <CommandMenu />
        </SidebarProvider>
      </NuqsAdapter>
    </ConvexClientProvider>
  )
}
