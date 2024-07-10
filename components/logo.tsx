import { Library } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <Library className=" " color="#38bdf8" />
      <h1 className="text-xl font-medium tracking-tight">
        Top<span className="text-sky-400">Studz</span>
      </h1>
    </div>
  );
}
