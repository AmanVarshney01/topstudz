"use client";
import PageTitle from "@/components/page-title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Plus, Search } from "lucide-react";
import { useState } from "react";

export default function GroupsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const groups = [
    {
      name: "Math Wizards",
      members: 5,
      course: "Mathematics",
      nextSession: "Today, 3:00 PM",
    },
    {
      name: "Code Breakers",
      members: 8,
      course: "Computer Science",
      nextSession: "Tomorrow, 5:00 PM",
    },
    {
      name: "Physics Enthusiasts",
      members: 6,
      course: "Physics",
      nextSession: "Friday, 2:00 PM",
    },
    {
      name: "Literature Club",
      members: 4,
      course: "English Literature",
      nextSession: "Saturday, 11:00 AM",
    },
  ];
  const upcomingSessions = [
    { group: "Math Wizards", topic: "Calculus Review", time: "Today, 3:00 PM" },
    {
      group: "Code Breakers",
      topic: "Algorithm Design",
      time: "Tomorrow, 5:00 PM",
    },
    {
      group: "Physics Enthusiasts",
      topic: "Quantum Mechanics",
      time: "Friday, 2:00 PM",
    },
  ];

  const suggestedGroups = [
    { name: "Chemistry Lab", members: 7, course: "Chemistry" },
    { name: "History Buffs", members: 5, course: "History" },
    { name: "Language Exchange", members: 10, course: "Foreign Languages" },
  ];
  return (
    <section>
      <PageTitle title="Groups Page" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>My Study Groups</CardTitle>
            <CardDescription>
              Collaborate and learn with your peers
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
                {groups.map((group, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{group.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {group.course} • {group.members} members
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Next session: {group.nextSession}
                      </p>
                    </div>
                    <Button variant="outline">View Group</Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Create New Group</CardTitle>
            <CardDescription>Start a new study group</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input placeholder="Group name" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="literature">Literature</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Create Group
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Group Sessions</CardTitle>
            <CardDescription>Your scheduled study sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{session.group}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {session.topic}
                    </p>
                  </div>
                  <Badge variant="secondary">
                    <Clock className="mr-2 h-4 w-4" />
                    {session.time}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Suggested Groups</CardTitle>
            <CardDescription>Groups you might be interested in</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suggestedGroups.map((group, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{group.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {group.course} • {group.members} members
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Join
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
