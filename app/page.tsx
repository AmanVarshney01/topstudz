import GoToActionButton from "@/components/go-to-action-button"
import Logo from "@/components/logo"

function Header() {
  return (
    <header className="flex w-full flex-row items-center justify-between p-4">
      <nav>
        <Logo />
      </nav>
      <GoToActionButton />
    </header>
  )
}

export default async function Home() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col">
      <Header />
      <main>
        <h1>Welcome to TopStudz</h1>
      </main>
    </div>
  )
}
