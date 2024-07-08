import AuthButton from "./auth-button";

export default function Header() {
  return (
    <header className="flex w-full flex-row justify-between p-4">
      <nav>
        <h1 className="text-2xl font-bold">TopStudz</h1>
      </nav>
      <AuthButton />
    </header>
  );
}
