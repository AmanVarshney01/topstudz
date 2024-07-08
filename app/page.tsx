import DashboardButton from "@/components/dashboard-button";

function Header() {
  return (
    <header className="flex w-full flex-row justify-between p-4">
      <nav>
        <h1 className="text-2xl font-bold">TopStudz</h1>
      </nav>
      <DashboardButton />
    </header>
  );
}

export default async function Home() {
  return (
    <div className="flex flex-col mx-auto max-w-7xl">
      <Header />
      <main>
        <h1>Welcome to TopStudz</h1>
      </main>
    </div>
  );
}
