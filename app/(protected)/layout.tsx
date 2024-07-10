import DesktopSidebar from "@/components/DesktopSidebar";
import Header from "@/components/header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <main className=" flex flex-col">
    //   <Header />
    //   {children}
    // </main>
    <div className="flex h-full flex-col">
      <Header />
      <div className="flex h-svh pt-16">
        <DesktopSidebar />
        <main className="h-full flex-1">{children}</main>
      </div>
    </div>
  );
}
