import GoToActionButton from "@/components/go-to-action-button"
import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import MainPage from "@/public/main.png"
import { BookOpen, Star, Timer, Trophy, Users, Video } from "lucide-react"
import Image from "next/image"

export default async function Home() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col">
      <header className="sticky top-0 z-50 flex w-full flex-row items-center justify-between bg-background/80 p-4 backdrop-blur-sm transition-all duration-200 ease-in-out">
        <nav className="transition-opacity duration-200 hover:opacity-80">
          <Logo />
        </nav>
        <GoToActionButton />
      </header>
      <div className="min-h-screen">
        <main className="container mx-auto px-6 py-16">
          <Card className="relative overflow-hidden p-12 shadow-2xl dark:from-violet-900 md:p-16">
            <div className="relative flex flex-col items-center md:flex-row">
              <div className="mb-12 w-full md:mb-0 md:w-1/2 md:pr-12">
                <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl">
                  Elevate Your Academic Excellence
                </h1>
                <p className="mb-8 text-lg leading-relaxed text-violet-100">
                  Transform your learning journey with data-driven insights,
                  collaborative competition, and personalized study analytics.
                  Join the next generation of high-achievers.
                </p>
                <div className="mb-10 space-x-6">
                  <Button
                    variant="default"
                    size="lg"
                    className="rounded-full bg-white px-8 text-violet-900 hover:bg-violet-100"
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full text-white hover:bg-violet-800/30"
                  >
                    Learn More
                  </Button>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6 text-emerald-300" />
                  <span className="text-lg font-medium text-violet-100">
                    Join thousands of motivated students
                  </span>
                </div>
              </div>
              <div className="w-full transform transition-transform duration-500 hover:scale-105 md:w-1/2">
                <Image
                  src={MainPage}
                  alt="main page"
                  className="rounded-2xl shadow-2xl hover:shadow-violet-500/50"
                  priority
                />
              </div>
            </div>
          </Card>

          <section className="mt-24">
            <h2 className="mb-12 text-center text-4xl font-bold tracking-tight dark:text-white">
              Key Features
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  icon: (
                    <Timer className="h-12 w-12 text-emerald-600 dark:text-emerald-500" />
                  ),
                  title: "Study Tracking",
                  description:
                    "Log your study sessions with subject-specific timers.",
                },
                {
                  icon: (
                    <Trophy className="h-12 w-12 text-emerald-600 dark:text-emerald-500" />
                  ),
                  title: "Leaderboards",
                  description:
                    "Compete with friends, college peers, and city-wide rankings.",
                },
                {
                  icon: (
                    <Star className="h-12 w-12 text-emerald-600 dark:text-emerald-500" />
                  ),
                  title: "Achievements",
                  description:
                    "Earn badges and rewards for your study milestones.",
                },
                {
                  icon: (
                    <Users className="h-12 w-12 text-emerald-600 dark:text-emerald-500" />
                  ),
                  title: "Friend Management",
                  description:
                    "Add friends and create study groups for collaborative learning.",
                },
                {
                  icon: (
                    <BookOpen className="h-12 w-12 text-emerald-600 dark:text-emerald-500" />
                  ),
                  title: "Weekly Challenges",
                  description:
                    "Participate in study challenges for extra points and motivation.",
                },
                {
                  icon: (
                    <Video className="h-12 w-12 text-emerald-600 dark:text-emerald-500" />
                  ),
                  title: "Analytics & Insights",
                  description:
                    "Visualize your study habits and track progress over time.",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <CardContent className="p-8">
                    <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110">
                      {feature.icon}
                    </div>
                    <h3 className="mb-3 text-2xl font-semibold tracking-tight dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <Card className="relative mt-24 overflow-hidden p-16 text-center text-white shadow-2xl">
            <div className="relative">
              <h2 className="mb-6 text-4xl font-bold tracking-tight">
                Ready to Boost Your Study Habits?
              </h2>
              <p className="mb-10 text-2xl font-light text-violet-100">
                Join TopStudz today and transform the way you learn!
              </p>
              <Button
                size="lg"
                className="rounded-full bg-white px-10 text-violet-700 hover:bg-violet-100"
              >
                Sign Up Now
              </Button>
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}
