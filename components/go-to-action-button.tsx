import Link from "next/link"
import { Button } from "./ui/button"

export default async function GoToActionButton() {
  return (
    <Link href="/dashboard">
      <Button size={"sm"}>Dashboard</Button>
    </Link>
  )
}
