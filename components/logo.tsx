export default function Logo({
  variant = "default",
}: {
  variant?: "default" | "small"
}) {
  return (
    <div className="">
      {variant === "default" ? (
        <h1 className="text-2xl font-medium tracking-tight">
          Top<span className="text-blue-600">Studz</span>
        </h1>
      ) : (
        <h1 className="text-2xl font-medium tracking-tight">TS</h1>
      )}
    </div>
  )
}
