import Link from "next/link";
import AuthButton from "./auth-button";
import Logo from "./logo";
import MobileSidebar from "./MobileSidebar";

export default function Header() {
  return (
    <header className="fixed top-0 z-20 flex h-16 w-full flex-row items-center justify-between border-b bg-background px-4 py-2">
      <div className="flex flex-row items-center justify-center gap-2">
        <MobileSidebar />
        <Link href={"/"}>
          <Logo />
        </Link>
      </div>
      <nav className="flex flex-row items-center gap-2">
        <AuthButton />
      </nav>
    </header>
  );
}
