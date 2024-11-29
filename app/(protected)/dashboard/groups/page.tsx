"use client"
import PageTitle from "@/components/page-title"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useToast } from "@/hooks/use-toast"
import { useMutation, useQuery } from "convex/react"
import { Plus, Search, Users, UserPlus, Info, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { CreateGroupDialog } from "@/components/create-group-dialog"

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

  const GroupCard = ({ group, action }: any) => (
    <div className="flex flex-col gap-3 rounded-lg border p-2">
      <div className="flex flex-col p-2">
        <span className="text-lg">{group.name}</span>
        <span className="line-clamp-2 text-sm text-gray-600">
          {group.description || "No description"}
        </span>
      </div>
      <div className="border-t pt-2">
        {action === "view" ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/dashboard/groups/${group._id}`)}
            className="w-full justify-between"
          >
            View Group
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleJoinGroup(group._id)}
          >
            <span className="flex flex-row gap-2">
              <UserPlus className="mr-2 h-4 w-4" />
              Join
            </span>
          </Button>
        )}
      </div>
    </div>
  )

  const [isCreateGroupDialogOpen, setIsCreateGroupDialogOpen] = useState(false)

  return (
    <div>
      <PageTitle title="Study Groups" />
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row">
        <div className="flex flex-1 gap-2">
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
        <CreateGroupDialog
          open={isCreateGroupDialogOpen}
          setOpen={setIsCreateGroupDialogOpen}
        >
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Group
          </Button>
        </CreateGroupDialog>
      </div>

      <Tabs defaultValue="my-groups" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="my-groups">My Groups</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
        </TabsList>
        <TabsContent value="my-groups" className="space-y-4">
          <ScrollArea className="h-full">
            {filteredMyGroups.length === 0 ? (
              <Card>
                <CardContent className="flex h-[200px] flex-col items-center justify-center space-y-4">
                  <Info className="h-8 w-8 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    You haven&apos;t joined any groups yet
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => router.push("#discover")}
                  >
                    Discover Groups
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredMyGroups.map((group) => (
                  <GroupCard key={group._id} group={group} action="view" />
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="discover" className="space-y-4">
          <ScrollArea className="h-[600px] pr-4">
            {suggestedGroups.length === 0 ? (
              <Card>
                <CardContent className="flex h-[200px] flex-col items-center justify-center">
                  <Info className="h-8 w-8 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    No suggested groups available
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {suggestedGroups.map((group) => (
                  <GroupCard key={group._id} group={group} action="join" />
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
