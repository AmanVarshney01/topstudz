import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export function CreateGroupDialog({
  variant = "default",
}: {
  variant?: "default" | "ghost"
}) {
  const router = useRouter()
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")
  const [newGroupDescription, setNewGroupDescription] = useState("")

  const createGroup = useMutation(api.groups.create)

  const handleCreateGroup = async () => {
    try {
      const newGroup = await createGroup({
        name: newGroupName,
        description: newGroupDescription,
      })
      toast({
        title: "Success",
        description: "Group created successfully",
      })
      setNewGroupName("")
      setNewGroupDescription("")
      setIsOpen(false)
      router.push(`/dashboard/groups/${newGroup}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create group",
        variant: "destructive",
      })
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          className={cn(variant === "ghost" && "h-min p-0 font-normal")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New Group
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Group</DialogTitle>
          <DialogDescription>
            Create a new study group to collaborate with others
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Group name"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
          <Textarea
            placeholder="Group description"
            value={newGroupDescription}
            onChange={(e) => setNewGroupDescription(e.target.value)}
          />
          <Button
            className="w-full"
            onClick={handleCreateGroup}
            disabled={!newGroupName}
          >
            Create Group
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
