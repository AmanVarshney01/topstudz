import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server"
import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import "./globals.css"
import { GeistSans } from "geist/font/sans"

export const metadata: Metadata = {
  title: "TopStudz",
  description:
    "Compete with friends, join study groups, and track your progress to become a top student.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "bg-background font-sans antialiased",
            GeistSans.variable,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Analytics />
          </ThemeProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  )
}
