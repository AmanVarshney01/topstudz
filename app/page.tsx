import Logo from "@/components/logo"
import GoToActionButton from "@/components/go-to-action-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import MainPage from "@/public/main.png"
import {
  BookOpen,
  Star,
  Timer,
  Trophy,
  Users,
  BarChart,
  Target,
  Zap,
  ChevronRight,
  Clock,
  LineChart,
  Github,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Meteors from "@/components/ui/meteors"

const features = [
  {
    icon: <Timer className="h-12 w-12" />,
    title: "Focus Timer",
    description: "Customizable study sessions with break reminders",
    badge: "Popular",
  },
  {
    icon: <Trophy className="h-12 w-12" />,
    title: "Competitive Learning",
    description: "Global and group-based leaderboards",
  },
  {
    icon: <Users className="h-12 w-12" />,
    title: "Study Groups",
    description: "Create and join study groups for collaborative learning",
    badge: "New",
  },
  {
    icon: <BarChart className="h-12 w-12" />,
    title: "Progress Analytics",
    description: "Detailed insights into your study patterns",
  },
  {
    icon: <Target className="h-12 w-12" />,
    title: "Goal Setting",
    description: "Set and track daily and weekly study goals",
  },
  {
    icon: <Zap className="h-12 w-12" />,
    title: "Achievements",
    description: "Earn rewards for consistent study habits",
  },
]

const stats = [
  {
    value: "10,000+",
    label: "Active Students",
    icon: <Users className="h-4 w-4" />,
  },
  {
    value: "1M+",
    label: "Study Hours",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    value: "5,000+",
    label: "Study Groups",
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    value: "50+",
    label: "Universities",
    icon: <Star className="h-4 w-4" />,
  },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col px-4">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 items-center justify-between">
          <Logo />
          <GoToActionButton />
        </div>
      </header>

      <main className="relative flex-1">
        <div className="absolute inset-0 overflow-hidden">
          <Meteors number={20} />
        </div>
        <section className="relative mx-auto space-y-8 py-24 sm:py-32">
          <div className="mx-auto flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="text-pretty text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              Study. Compete. Succeed.
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Join the community of high-achievers. Track your study sessions,
              compete with peers, and unlock your academic potential.
            </p>
            <div className="space-x-4">
              <Button size="lg" className="rounded-full" asChild>
                <Link href="/dashboard">
                  Get Started <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full"
                asChild
              >
                <Link
                  href={"https://github.com/AmanVarshney01/topstudz"}
                  target="_blank"
                >
                  <Github className="h-4 w-4" />
                  Github
                </Link>
              </Button>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat, i) => (
              <Card key={i} className="bg-background/60 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center gap-2 p-4">
                  <div className="flex items-center gap-2">
                    {stat.icon}
                    <span className="text-2xl font-bold">{stat.value}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mx-auto max-w-5xl rounded-[20px] border bg-background/60 p-4 backdrop-blur-sm">
            <Image
              src={MainPage}
              alt="App preview"
              className="rounded-[12px] shadow-xl"
              priority
            />
          </div>
        </section>

        <section className="mx-auto py-20">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Everything you need to excel
            </h2>
            <p className="mt-4 text-muted-foreground">
              Comprehensive tools designed for serious students
            </p>
          </div>

          <div className="grid items-center justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <Card
                key={i}
                className="bg-background/60 backdrop-blur-sm transition-all hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="mb-4 flex items-center gap-2">
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                      {feature.icon}
                    </div>
                    {feature.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {feature.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-t bg-muted/50">
          <div className="py-20">
            <Card className="relative mx-auto max-w-4xl overflow-hidden bg-foreground">
              <div className="absolute inset-0">
                <Meteors number={10} />
              </div>
              <CardContent className="relative flex flex-col items-center gap-4 p-12 text-center text-primary-foreground">
                <LineChart className="h-12 w-12" />
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Ready to Transform Your Study Habits?
                </h2>
                <p className="max-w-[42rem] text-lg text-primary-foreground/80">
                  Join thousands of students who are already improving their
                  academic performance with TopStudz.
                </p>
                <Button
                  size="lg"
                  variant="secondary"
                  className="mt-4 rounded-full backdrop-blur-sm"
                  asChild
                >
                  <Link href={"/dashboard"}>Start Your Journey</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="relative border-t bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © 2024 TopStudz. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with ❤️ for students
          </p>
        </div>
      </footer>
    </div>
  )
}
