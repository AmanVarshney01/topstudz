import PageTitle from "@/components/page-title";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LeaderboardsPage() {
  const overallLeaders = [
    {
      rank: 1,
      name: "Alex Johnson",
      score: 9850,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      rank: 2,
      name: "Sam Lee",
      score: 9720,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      rank: 3,
      name: "Taylor Swift",
      score: 9650,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      rank: 4,
      name: "Jordan Peterson",
      score: 9580,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      rank: 5,
      name: "Emma Watson",
      score: 9510,
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ];

  const courseLeaders = {
    all: [
      {
        rank: 1,
        name: "Alex Johnson",
        score: 98,
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        rank: 2,
        name: "Sam Lee",
        score: 97,
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        rank: 3,
        name: "Taylor Swift",
        score: 96,
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
    math: [
      {
        rank: 1,
        name: "Emma Watson",
        score: 99,
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        rank: 2,
        name: "Chris Hemsworth",
        score: 98,
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        rank: 3,
        name: "Natalie Portman",
        score: 97,
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
    physics: [
      {
        rank: 1,
        name: "Jordan Peterson",
        score: 100,
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        rank: 2,
        name: "Alex Johnson",
        score: 99,
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        rank: 3,
        name: "Sam Lee",
        score: 98,
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  };

  const studyTimeLeaders = [
    {
      rank: 1,
      name: "Taylor Swift",
      hours: 120,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      rank: 2,
      name: "Jordan Peterson",
      hours: 115,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      rank: 3,
      name: "Emma Watson",
      hours: 110,
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ];

  const achievementLeaders = [
    {
      rank: 1,
      name: "Sam Lee",
      achievements: 25,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      rank: 2,
      name: "Alex Johnson",
      achievements: 23,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      rank: 3,
      name: "Natalie Portman",
      achievements: 22,
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ];

  const personalRanking = {
    overall: 42,
    course: 15,
    studyTime: 28,
    achievements: 37,
  };
  return (
    <section>
      <PageTitle title="Leaderboards" />
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Overall Top Performers</CardTitle>
          <CardDescription>
            Students with the highest overall scores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Rank</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {overallLeaders.map((leader) => (
                <TableRow key={leader.rank}>
                  <TableCell className="font-medium">{leader.rank}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="mr-2 h-8 w-8">
                        <AvatarImage src={leader.avatar} alt={leader.name} />
                        <AvatarFallback>{leader.name[0]}</AvatarFallback>
                      </Avatar>
                      {leader.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{leader.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
