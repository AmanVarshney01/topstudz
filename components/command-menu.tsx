"use client"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import {
  BookOpen,
  Bot,
  Clock,
  LayoutDashboard,
  Settings,
  Timer,
  Trophy,
  Users,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { CreateGroupDialog } from "./create-group-dialog"
import { ScrollArea } from "./ui/scroll-area"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const groups = useQuery(api.groups.listMyGroups)

  const [isCreateGroupDialogOpen, setIsCreateGroupDialogOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none",
        )}
        onClick={() => setOpen(true)}
      >
        <span className="inline-flex">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">ctrl</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogHeader className="sr-only">
          <DialogTitle>Search Commands</DialogTitle>
          <DialogDescription>
            Search for commands to navigate quickly.
          </DialogDescription>
        </DialogHeader>
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
              <CommandItem
                onSelect={() => {
                  router.push("/dashboard/ai-helper")
                  setOpen(false)
                }}
              >
                <Bot className="mr-2 h-4 w-4" />
                Go to AI Helper
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
