"use client"
import PageTitle from "@/components/page-title"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { useState } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Id } from "@/convex/_generated/dataModel"

export default function GroupsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [newGroupName, setNewGroupName] = useState("")
  const [newGroupDescription, setNewGroupDescription] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // Fetch groups
  const myGroups = useQuery(api.groups.listMyGroups) || []
  const allGroups = useQuery(api.groups.list, { limit: 50 }) || []

  // Mutations
  const createGroup = useMutation(api.groups.create)
  const joinGroup = useMutation(api.groups.join)

  // Filter groups based on search query
  const filteredMyGroups = myGroups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get suggested groups (groups user is not a member of)
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
    <section>
      <PageTitle title="Study Groups" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>My Study Groups</CardTitle>
            <CardDescription>
              Groups you&apos;re currently participating in
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Search groups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow"
                />
                <Button>
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
              <div className="space-y-4">
                {filteredMyGroups.map((group) => (
                  <div
                    key={group._id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div>
                      <p className="font-medium">{group.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {group.description || "No description"}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() =>
                        router.push(`/dashboard/groups/${group._id}`)
                      }
                    >
                      View Group
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:bg-accent">
              <CardHeader>
                <CardTitle>Create New Group</CardTitle>
                <CardDescription>Start a new study group</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Group
                </Button>
              </CardContent>
            </Card>
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

        <Card className="col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Suggested Groups</CardTitle>
            <CardDescription>Groups you might be interested in</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suggestedGroups.map((group) => (
                <div
                  key={group._id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">{group.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {group.description || "No description"}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleJoinGroup(group._id)}
                  >
                    Join
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
