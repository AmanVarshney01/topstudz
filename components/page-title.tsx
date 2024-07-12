import { Button } from "./ui/button";

export default function PageTitle({
  title,
  buttonText,
}: {
  title: string;
  buttonText?: string;
}) {
  return (
    <div className="flex w-full flex-row items-center justify-between px-4 py-6">
      <h2 className="text-2xl font-semibold leading-none tracking-tight">
        {title}
      </h2>
      {buttonText && <Button size={"sm"}>{buttonText}</Button>}
    </div>
  );
}
