import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { Info, LogOut, Trash2, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface GroupActionsSheetProps {
  group: {
    _id: Id<"groups">
    name: string
    description?: string
    creator?: {
      name?: string
    }
  }
  members?: Array<{
    _id: Id<"groupMembers">
    user: {
      _id: Id<"users">
      name?: string
    } | null
    joinedAt: number
  }>
  isCreator: boolean
}
export function GroupActionsSheet({
  group,
  members,
  isCreator,
}: GroupActionsSheetProps) {
  const router = useRouter()
  const leaveGroup = useMutation(api.groups.leave)
  const deleteGroup = useMutation(api.groups.deleteGroup)

  const handleLeaveGroup = async () => {
    try {
      await leaveGroup({ groupId: group._id })
      toast.success("Left group successfully")
      router.push("/dashboard/groups")
    } catch (error) {
      toast.error("Failed to leave group")
    }
  }

  const handleDeleteGroup = async () => {
    try {
      await deleteGroup({ groupId: group._id })
      toast.success("Group deleted successfully")
      router.push("/dashboard/groups")
    } catch (error) {
      toast.error("Failed to delete group")
    }
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Info className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Group Information</SheetTitle>
          <SheetDescription>
            View group details and manage membership
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Details</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Description</p>
              <p>{group.description || "No description provided"}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Created by</p>
              <p>{group.creator?.name || "Unknown"}</p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Users className="h-4 w-4" />
              Members ({members?.length || 0})
            </h3>
            <div className="space-y-3">
              {members?.map((member) => (
                <div
                  key={member._id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">
                      {member.user?.name || "Unknown User"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Joined {new Date(member.joinedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 pt-6">
            {isCreator ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Group
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the group and remove all data associated with it.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteGroup}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Button
                variant="destructive"
                onClick={handleLeaveGroup}
                className="w-full"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Leave Group
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
