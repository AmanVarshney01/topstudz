"use client"
import PageTitle from "@/components/page-title"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

export default function StudyPage() {
  const [studyTime, setStudyTime] = useState(0)
  const [isStudying, setIsStudying] = useState(false)

  const startStopStudy = () => {
    if (isStudying) {
      setIsStudying(false)
    } else {
      setIsStudying(true)
      const interval = setInterval(() => {
        setStudyTime((prevTime) => prevTime + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }
  return (
    <section>
      <PageTitle title="Study" />
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Study Timer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2 text-3xl font-bold">{formatTime(studyTime)}</div>
          <Button onClick={startStopStudy} className="w-full">
            {isStudying ? "Stop" : "Start"} Studying
          </Button>
        </CardContent>
      </Card>
    </section>
  )
}
