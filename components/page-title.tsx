import { Button } from "./ui/button";

export default function PageTitle({
  title,
  buttonText,
}: {
  title: string;
  buttonText?: string;
}) {
  return (
    <div className="flex w-full flex-row justify-between px-4 py-8">
      <h2 className="font-mediumt- text-2xl">{title}</h2>
      {buttonText && <Button size={"sm"}>{buttonText}</Button>}
    </div>
  );
}
