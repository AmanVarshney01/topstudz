import ConvexClientProvider from "@/components/convex-client-provider"
import Header from "@/components/header"
import MainSidebar from "@/components/main-sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
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
        <SidebarProvider className="flex h-svh flex-col md:flex-row">
          <Header />
          <MainSidebar />
          <main className="w-full bg-background">
            <ScrollArea className="h-full p-4">{children}</ScrollArea>
          </main>
          <Toaster richColors />
        </SidebarProvider>
      </NuqsAdapter>
    </ConvexClientProvider>
  )
}
