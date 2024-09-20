export default function PageTitle({
  title,
  button,
}: {
  title: string
  button?: React.ReactNode
}) {
  return (
    <div className="flex h-20 w-full flex-row items-center justify-between bg-background px-4">
      <h2 className="text-2xl font-semibold leading-none tracking-tight">
        {title}
      </h2>
      {button && button}
    </div>
  )
}
