"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Search } from "lucide-react";
import { useState } from "react";

export default function CurrentFriendsCard() {
  const [searchQuery, setSearchQuery] = useState("");
  // const friends = await getUserFriends()

  const friends = [
    {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "Studying Math",
    },
    {
      name: "Sam Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "Online",
    },
    {
      name: "Taylor Swift",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "Offline",
    },
    {
      name: "Jordan Peterson",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "In a study group",
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">My Friends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Search friends..."
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
            {friends.map((friend, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={friend.avatar} alt={friend.name} />
                    <AvatarFallback>{friend.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{friend.name}</p>
                    <p className="text-sm">{friend.status}</p>
                  </div>
                </div>
                <Button variant="outline">Message</Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
