import AuthButton from "./AuthButton";

export default function Header() {
  return (
    <header className=" flex flex-row justify-between w-full p-2">
      <h1 className=" text-2xl font-bold">TopStuds</h1>
      <nav>
        <AuthButton />
      </nav>
    </header>
  );
}
