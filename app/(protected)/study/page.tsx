"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Clock, BookOpen, Coffee } from "lucide-react"

export default function StudyPage() {
  const [studyTime, setStudyTime] = useState(0)
  const [isStudying, setIsStudying] = useState(false)
  const [goal, setGoal] = useState(25 * 60)
  const [breakTime, setBreakTime] = useState(5 * 60)
  const [isBreak, setIsBreak] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isStudying) {
      interval = setInterval(() => {
        setStudyTime((prevTime) => {
          if (prevTime + 1 >= goal && !isBreak) {
            setIsBreak(true)
            setStudyTime(0)
            return 0
          } else if (prevTime + 1 >= breakTime && isBreak) {
            setIsBreak(false)
            setStudyTime(0)
            return 0
          }
          return prevTime + 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isStudying, goal, breakTime, isBreak])

  const startStopStudy = () => {
    setIsStudying(!isStudying)
  }

  const resetTimer = () => {
    setStudyTime(0)
    setIsStudying(false)
    setIsBreak(false)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const progress = isBreak
    ? (studyTime / breakTime) * 100
    : (studyTime / goal) * 100

  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Study Timer</h1>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                {isBreak ? (
                  <Coffee className="mr-2" />
                ) : (
                  <Clock className="mr-2" />
                )}
                {isBreak ? "Break Time" : "Study Time"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-center text-6xl font-bold">
                {formatTime(studyTime)}
              </div>
              <Progress value={progress} className="mb-4" />
              <div className="flex justify-center space-x-4">
                <Button onClick={startStopStudy}>
                  {isStudying ? "Pause" : "Start"}
                </Button>
                <Button onClick={resetTimer} variant="outline">
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2" /> Study Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="study-goal">Study Duration (minutes)</Label>
                  <Input
                    id="study-goal"
                    type="number"
                    value={goal / 60}
                    onChange={(e) => setGoal(Number(e.target.value) * 60)}
                    min={1}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Study Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Total Study Time: {formatTime(studyTime)}</p>
              <p>Progress: {Math.round(progress)}%</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
