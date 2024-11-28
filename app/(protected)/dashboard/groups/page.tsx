"use client"
import PageTitle from "@/components/page-title"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useToast } from "@/hooks/use-toast"
import { useMutation, useQuery } from "convex/react"
import { Plus, Search, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function GroupsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [newGroupName, setNewGroupName] = useState("")
  const [newGroupDescription, setNewGroupDescription] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const myGroups = useQuery(api.groups.listMyGroups) || []
  const allGroups = useQuery(api.groups.list, { limit: 50 }) || []

  const createGroup = useMutation(api.groups.create)
  const joinGroup = useMutation(api.groups.join)

  const filteredMyGroups = myGroups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const suggestedGroups = allGroups.filter(
    (group) => !myGroups.some((myGroup) => myGroup._id === group._id),
  )

  const handleCreateGroup = async () => {
    try {
      await createGroup({
        name: newGroupName,
        description: newGroupDescription,
      })
      toast({
        title: "Success",
        description: "Group created successfully",
      })
      setNewGroupName("")
      setNewGroupDescription("")
      setIsCreateDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create group",
        variant: "destructive",
      })
    }
  }

  const handleJoinGroup = async (groupId: Id<"groups">) => {
    try {
      await joinGroup({ groupId })
      toast({
        title: "Success",
        description: "Joined group successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join group",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto">
      <PageTitle title="Study Groups" />

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
          <Button variant="secondary">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
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
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              My Study Groups
            </CardTitle>
            <CardDescription>
              Groups you&apos;re currently participating in
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredMyGroups.length === 0 ? (
                <p className="text-center text-muted-foreground">
                  You haven&apos;t joined any groups yet
                </p>
              ) : (
                filteredMyGroups.map((group) => (
                  <div
                    key={group._id}
                    className="flex flex-col gap-2 rounded-lg border p-4 transition-colors hover:bg-accent"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">{group.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {group.description || "No description"}
                        </p>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() =>
                          router.push(`/dashboard/groups/${group._id}`)
                        }
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Suggested Groups</CardTitle>
            <CardDescription>Groups you might be interested in</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suggestedGroups.length === 0 ? (
                <p className="text-center text-muted-foreground">
                  No suggested groups available
                </p>
              ) : (
                suggestedGroups.map((group) => (
                  <div
                    key={group._id}
                    className="flex flex-col gap-2 rounded-lg border p-4 transition-colors hover:bg-accent"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">{group.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {group.description || "No description"}
                        </p>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleJoinGroup(group._id)}
                      >
                        Join
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
