"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Clock, BookOpen, Coffee } from "lucide-react"
import { useQueryState } from "nuqs"
import PageTitle from "@/components/page-title"

export default function StudyPage() {
  const [studyTime, setStudyTime] = useQueryState("studyTime", {
    defaultValue: 0,
    parse: (value) => Number(value),
  })
  const [isStudying, setIsStudying] = useQueryState("isStudying", {
    defaultValue: false,
    parse: (value) => value === "true",
  })
  const [goal, setGoal] = useQueryState("goal", {
    defaultValue: 25 * 60,
    parse: (value) => Number(value),
  })
  const [breakTime, setBreakTime] = useQueryState("breakTime", {
    defaultValue: 5 * 60,
    parse: (value) => Number(value),
  })
  const [isBreak, setIsBreak] = useQueryState("isBreak", {
    defaultValue: false,
    parse: (value) => value === "true",
  })
  const [totalStudyTime, setTotalStudyTime] = useQueryState("totalStudyTime", {
    defaultValue: 0,
    parse: (value) => Number(value),
  })

  const [notification, setNotification] = useState<Notification | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      Notification.requestPermission()
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isStudying) {
      interval = setInterval(() => {
        setStudyTime((prevTime) => {
          const nextTime = prevTime + 1

          if (!isBreak) {
            setTotalStudyTime((prev) => prev + 1)
          }

          if (nextTime >= goal && !isBreak) {
            setIsBreak(true)
            setStudyTime(0)
            if (Notification.permission === "granted") {
              new Notification("Break Time!", {
                body: "Time for a break! Take some rest.",
                icon: "/favicon.ico",
              })
            }
            return 0
          } else if (nextTime >= breakTime && isBreak) {
            setIsBreak(false)
            setStudyTime(0)
            if (Notification.permission === "granted") {
              new Notification("Study Time!", {
                body: "Break is over. Let's get back to studying!",
                icon: "/favicon.ico",
              })
            }
            return 0
          }
          return nextTime
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [
    isStudying,
    goal,
    breakTime,
    isBreak,
    setStudyTime,
    setIsBreak,
    setTotalStudyTime,
  ])

  const startStopStudy = () => {
    setIsStudying(!isStudying)
  }

  const resetTimer = () => {
    setStudyTime(0)
    setIsStudying(false)
    setIsBreak(false)
  }

  const resetAll = () => {
    resetTimer()
    setTotalStudyTime(0)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const formatHours = (time: number) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  const progress = isBreak
    ? (studyTime / breakTime) * 100
    : (studyTime / goal) * 100

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Study" />
      <div className="">
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center text-2xl">
                {isBreak ? (
                  <Coffee className="mr-3 h-8 w-8" />
                ) : (
                  <Clock className="mr-3 h-8 w-8" />
                )}
                {isBreak ? "Break Time" : "Study Time"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center text-7xl font-bold tracking-tighter">
                {formatTime(studyTime)}
              </div>
              <Progress value={Math.min(progress, 100)} className="h-3" />
              <div className="flex justify-center gap-4">
                <Button size="lg" onClick={startStopStudy}>
                  {isStudying ? "Pause" : "Start"}
                </Button>
                <Button size="lg" onClick={resetTimer} variant="outline">
                  Reset Timer
                </Button>
                <Button size="lg" onClick={resetAll} variant="destructive">
                  Reset All
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" /> Study Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="study-goal">Study Duration (minutes)</Label>
                <Input
                  id="study-goal"
                  type="number"
                  value={goal / 60}
                  onChange={(e) =>
                    setGoal(Math.max(1, Number(e.target.value)) * 60)
                  }
                  min={1}
                  className="text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="break-time">Break Duration (minutes)</Label>
                <Input
                  id="break-time"
                  type="number"
                  value={breakTime / 60}
                  onChange={(e) =>
                    setBreakTime(Math.max(1, Number(e.target.value)) * 60)
                  }
                  min={1}
                  className="text-lg"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <CardTitle>Study Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <p className="text-lg">
                  Current Session: {formatTime(studyTime)}
                </p>
                <p className="text-lg">
                  Progress: {Math.min(Math.round(progress), 100)}%
                </p>
              </div>
              <div className="border-t pt-4">
                <p className="text-xl font-semibold">
                  Total Study Time: {formatHours(totalStudyTime)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
