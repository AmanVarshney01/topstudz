import { LoaderCircle } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center p-16">
      <LoaderCircle className="animate-spin" size={40} strokeWidth={1} />
    </div>
  )
}
