import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { Shield } from "lucide-react"
import { toast } from "sonner"

export function MemberRoleSelect({
  groupId,
  userId,
  currentRole,
  isDisabled,
}: {
  groupId: Id<"groups">
  userId: Id<"users">
  currentRole: Doc<"groupMembers">["role"]
  isDisabled?: boolean
}) {
  const updateRole = useMutation(api.groups.updateMemberRole)

  const handleRoleChange = async (newRole: typeof currentRole) => {
    try {
      await updateRole({
        groupId,
        userId,
        newRole,
      })
      toast.success("Role updated successfully")
    } catch (error) {
      toast.error("Failed to update role")
    }
  }

  return (
    <Select
      disabled={isDisabled}
      value={currentRole}
      onValueChange={handleRoleChange}
    >
      <SelectTrigger className="w-[110px]">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="member">Member</SelectItem>
      </SelectContent>
    </Select>
  )
}
