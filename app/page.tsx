import GoToActionButton from "@/components/go-to-action-button"
import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import MainPage from "@/public/main.png"

function Header() {
  return (
    <header className="flex w-full flex-row items-center justify-between p-4">
      <nav>
        <Logo />
      </nav>
      <GoToActionButton />
    </header>
  )
}

export default async function Home() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col">
      <Header />
      {/* <main>
        <h1>Welcome to TopStudz</h1>
      </main> */}
      <LandingPage />
    </div>
  )
}

import { BookOpen, Star, Timer, Trophy, Users, Video } from "lucide-react"
import Image from "next/image"

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="flex flex-col items-center rounded-2xl bg-indigo-900 p-8 md:flex-row md:p-12">
          <div className="mb-8 w-full md:mb-0 md:w-1/2 md:pr-8">
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
              Competitive Studying with TopStudz
            </h1>
            <p className="mb-6 text-indigo-200">
              Motivate yourself to study more by turning learning into a fun,
              competitive activity. Track your progress, compete with friends,
              and achieve your academic goals!
            </p>
            <div className="mb-8 space-x-4">
              <Button className="rounded-full bg-blue-500 px-6 py-3 transition hover:bg-blue-600">
                Get Started
              </Button>
              <Button className="rounded-full px-6 py-3">Learn More</Button>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="text-blue-400" />
              <span className="text-lg">
                Join thousands of motivated students
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <Image src={MainPage} alt="main page" />
          </div>
        </div>

        <section className="mt-16">
          <h2 className="mb-8 text-center text-3xl font-bold">Key Features</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: <Timer className="h-12 w-12 text-indigo-600" />,
                title: "Study Tracking",
                description:
                  "Log your study sessions with subject-specific timers.",
              },
              {
                icon: <Trophy className="h-12 w-12 text-indigo-600" />,
                title: "Leaderboards",
                description:
                  "Compete with friends, college peers, and city-wide rankings.",
              },
              {
                icon: <Star className="h-12 w-12 text-indigo-600" />,
                title: "Achievements",
                description:
                  "Earn badges and rewards for your study milestones.",
              },
              {
                icon: <Users className="h-12 w-12 text-indigo-600" />,
                title: "Friend Management",
                description:
                  "Add friends and create study groups for collaborative learning.",
              },
              {
                icon: <BookOpen className="h-12 w-12 text-indigo-600" />,
                title: "Weekly Challenges",
                description:
                  "Participate in study challenges for extra points and motivation.",
              },
              {
                icon: <Video className="h-12 w-12 text-indigo-600" />,
                title: "Analytics & Insights",
                description:
                  "Visualize your study habits and track progress over time.",
              },
            ].map((feature, index) => (
              <div key={index} className="rounded-xl p-6 shadow-md">
                {feature.icon}
                <h3 className="mb-2 mt-4 text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to Boost Your Study Habits?
          </h2>
          <p className="mb-8 text-xl">
            Join TopStudz today and transform the way you learn!
          </p>
          <Button className="rounded-full bg-indigo-600 px-8 py-3 text-lg transition hover:bg-indigo-700">
            Sign Up Now
          </Button>
        </section>
      </main>
    </div>
  )
}
