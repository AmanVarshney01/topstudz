"use client"
import PageTitle from "@/components/page-title"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { api } from "@/convex/_generated/api"
import { useMutation, useQuery } from "convex/react"
import {
  ChartBar,
  Clock,
  History,
  Pause,
  Play,
  RotateCcw,
  Save,
  Settings,
} from "lucide-react"
import { useQueryState } from "nuqs"
import { useEffect } from "react"
import { toast } from "sonner"

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

function StudyTimer({
  studyTime,
  studyDuration,
  isStudying,
  onStartStop,
  onReset,
}: {
  studyTime: number
  studyDuration: number
  isStudying: boolean
  onStartStop: () => void
  onReset: () => void
}) {
  const progress = (studyTime / studyDuration) * 100

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-center text-2xl">
          <Clock className="mr-3 h-8 w-8" />
          Study Timer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center text-7xl font-bold tracking-tighter">
          {formatTime(studyTime)}
        </div>
        <Progress value={Math.min(progress, 100)} className="h-3" />
        <div className="flex justify-center gap-4">
          <Button size="lg" onClick={onStartStop} className="w-32">
            {isStudying ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start
              </>
            )}
          </Button>
          <Button
            size="lg"
            onClick={onReset}
            variant="outline"
            className="w-32"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function StudySettings({
  studyDuration,
  onDurationChange,
  onSave,
}: {
  studyDuration: number
  onDurationChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSave: () => void
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="mr-2 h-5 w-5" /> Study Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="study-goal">Study Duration (minutes)</Label>
            <Input
              id="study-goal"
              type="number"
              value={studyDuration / 60}
              onChange={onDurationChange}
              min={1}
              className="text-lg"
            />
          </div>
          <Button className="w-full" onClick={onSave} variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function StudyStats({
  studyTime,
  progress,
  totalStudyTime,
}: {
  studyTime: number
  progress: number
  totalStudyTime: number
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <ChartBar className="mr-2 h-5 w-5" /> Study Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Current Session</p>
            <p className="text-2xl font-bold">{formatTime(studyTime)}</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Progress</p>
            <p className="text-2xl font-bold">
              {Math.min(Math.round(progress), 100)}%
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Total Study Time</p>
            <p className="text-2xl font-bold">{formatHours(totalStudyTime)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function RecentSessions({ sessions }: { sessions: any[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <History className="mr-2 h-5 w-5" /> Study History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-[400px] space-y-4 overflow-y-auto">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <div>
                <p className="font-medium">Study Session</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(session.startTime).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatTime(session.duration)}</p>
                <p className="text-sm text-muted-foreground">
                  {session.completed ? "Completed" : "Incomplete"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function StudyPage() {
  const [studyTime, setStudyTime] = useQueryState("studyTime", {
    defaultValue: 0,
    parse: (value) => Number(value),
  })
  const [isStudying, setIsStudying] = useQueryState("isStudying", {
    defaultValue: false,
    parse: (value) => value === "true",
  })
  const [studyDuration, setStudyDuration] = useQueryState("studyDuration", {
    defaultValue: 25 * 60,
    parse: (value) => Number(value),
  })

  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "stats",
    parse: (value) => value as "stats" | "settings" | "history",
  })

  const settings = useQuery(api.study.getSettings)
  const updateSettings = useMutation(api.study.updateSettings)
  const completeSession = useMutation(api.study.completeSession)
  const stats = useQuery(api.study.getStats)

  useEffect(() => {
    if (settings) {
      setStudyDuration(settings.studyDuration)
    }
  }, [settings, setStudyDuration])

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
          if (nextTime >= studyDuration) {
            handleSessionComplete(nextTime)
            return 0
          }
          return nextTime
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isStudying, studyDuration])

  const handleSessionComplete = (time: number) => {
    setIsStudying(false)
    completeSession({
      duration: time,
      type: "study",
      completed: true,
    })
    toast.success("Great job! Take a break if you need one.")
    if (Notification.permission === "granted") {
      new Notification("Study Session Complete!", {
        body: "Great job! Take a break if you need one.",
        icon: "/favicon.ico",
      })
    }
  }

  const handleStartStop = () => {
    if (isStudying) {
      completeSession({
        duration: studyTime,
        type: "study",
        completed: false,
      })
      toast.success(`Study session paused at ${formatTime(studyTime)}.`)
    } else {
      toast.success("Study session started.")
    }
    setIsStudying(!isStudying)
  }

  const handleReset = () => {
    if (isStudying) {
      completeSession({
        duration: studyTime,
        type: "study",
        completed: false,
      })
    }
    setStudyTime(0)
    setIsStudying(false)
    toast.success("Timer has been reset to 0.")
  }

  const handleSaveSettings = async () => {
    try {
      await updateSettings({ studyDuration })
      toast.success("Your study settings have been saved to your account.")
    } catch (error) {
      toast.error("Failed to save settings.")
    }
  }

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDuration = Math.max(1, Number(e.target.value)) * 60
    setStudyDuration(newDuration)
    toast.success(`Study duration set to ${e.target.value} minutes.`)
  }

  const progress = (studyTime / studyDuration) * 100

  return (
    <div className="">
      <PageTitle title="Study Dashboard" />

      <div className="grid gap-6">
        <StudyTimer
          studyTime={studyTime}
          studyDuration={studyDuration}
          isStudying={isStudying}
          onStartStop={handleStartStop}
          onReset={handleReset}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="mt-6">
            <StudyStats
              studyTime={studyTime}
              progress={progress}
              totalStudyTime={stats?.totalStudyTime ?? 0}
            />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <StudySettings
              studyDuration={studyDuration}
              onDurationChange={handleDurationChange}
              onSave={handleSaveSettings}
            />
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            {stats?.recentSessions && stats.recentSessions.length > 0 ? (
              <RecentSessions sessions={stats.recentSessions} />
            ) : (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No study sessions recorded yet.
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
