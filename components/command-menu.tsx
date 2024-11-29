"use client"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command"
import { useEffect, useState } from "react"
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Trophy,
  UserPlus,
  Clock,
  Settings,
  Timer,
  Search,
} from "lucide-react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { CreateGroupDialog } from "./create-group-dialog"
import { ScrollArea } from "./ui/scroll-area"

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const groups = useQuery(api.groups.listMyGroups)

  const [isCreateGroupDialogOpen, setIsCreateGroupDialogOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type command to search..." />
        <CommandList>
          <ScrollArea className="h-[300px]">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              <CommandItem
                onSelect={() => {
                  router.push("/dashboard")
                  setOpen(false)
                }}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Go to Dashboard
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  router.push("/dashboard/study")
                  setOpen(false)
                }}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Go to Study
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  router.push("/dashboard/groups")
                  setOpen(false)
                }}
              >
                <Users className="mr-2 h-4 w-4" />
                Go to Groups
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  router.push("/dashboard/leaderboards")
                  setOpen(false)
                }}
              >
                <Trophy className="mr-2 h-4 w-4" />
                Go to Leaderboards
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Study">
              <CommandItem
                onSelect={() => {
                  router.push("/dashboard/study?isStudying=true")
                  setOpen(false)
                }}
              >
                <Timer className="mr-2 h-4 w-4" />
                Start Study Session
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  router.push("/dashboard/study?tab=history")
                  setOpen(false)
                }}
              >
                <Clock className="mr-2 h-4 w-4" />
                View Study History
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  router.push("/dashboard/study/?tab=settings")
                  setOpen(false)
                }}
              >
                <Settings className="mr-2 h-4 w-4" />
                Study Settings
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Groups">
              <CommandItem
                onSelect={() => {
                  setIsCreateGroupDialogOpen(true)
                  setOpen(false)
                }}
              >
                <Users className="mr-2 h-4 w-4" />
                Create Group
              </CommandItem>
              {groups?.map((group) => (
                <CommandItem
                  key={group._id}
                  onSelect={() => {
                    router.push(`/dashboard/groups/${group._id}`)
                    setOpen(false)
                  }}
                >
                  <Users className="mr-2 h-4 w-4" />
                  {group.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </CommandList>
      </CommandDialog>
      <CreateGroupDialog
        open={isCreateGroupDialogOpen}
        setOpen={setIsCreateGroupDialogOpen}
      />
    </>
  )
}
