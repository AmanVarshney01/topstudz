import ConvexClientProvider from "@/components/convex-client-provider"
import DesktopSidebar from "@/components/desktop-sidebar"
import Header from "@/components/header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { NuqsAdapter } from "nuqs/adapters/next/app"

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
        </SidebarProvider>
      </NuqsAdapter>
    </ConvexClientProvider>
  )
}
