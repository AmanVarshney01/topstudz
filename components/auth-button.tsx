import { signOut } from "@/auth"
import { getCurrentUser } from "@/db/queries"
import { ChevronDownIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

function SignOutButton() {
  return (
    <form
      className="w-full"
      action={async () => {
        "use server"
        await signOut({ redirectTo: "/login" })
      }}
    >
      <Button size={"sm"} className="w-full" variant={"destructive"}>
        Sign Out
      </Button>
    </form>
  )
}

export default async function AuthButton() {
  const user = await getCurrentUser()

  return (
    user && (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center rounded-lg border p-2">
          <div className="flex flex-row items-center justify-between gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user.image!} />
              <AvatarFallback>
                {user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="line-clamp-1 hidden truncate text-sm md:block">
              {user.name}
            </span>
            <ChevronDownIcon className="hidden h-4 w-4 md:block" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuLabel>
            <span className="truncate text-sm opacity-90">{user.email}</span>
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  )
}
