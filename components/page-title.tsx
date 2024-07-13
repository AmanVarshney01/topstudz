export default function PageTitle({
  title,
  button,
}: {
  title: string;
  button?: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-row items-center justify-between h-24 px-4">
      <h2 className="text-2xl font-semibold leading-none tracking-tight">
        {title}
      </h2>
      {button && button}
    </div>
  );
}
