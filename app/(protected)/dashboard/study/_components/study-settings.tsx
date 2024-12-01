import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Settings, Save } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function StudySettings({
  studyDuration,
  dailyGoal,
  onDurationChange,
  onDailyGoalChange,
  onSave,
}: {
  studyDuration: number
  dailyGoal: number
  onDurationChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDailyGoalChange: (e: React.ChangeEvent<HTMLInputElement>) => void
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
            <Label htmlFor="study-duration">Study Duration (minutes)</Label>
            <Input
              id="study-duration"
              type="number"
              value={studyDuration / 60}
              onChange={onDurationChange}
              min={1}
              className="text-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="daily-goal">Daily Study Goal (minutes)</Label>
            <Input
              id="daily-goal"
              type="number"
              value={dailyGoal / 60}
              onChange={onDailyGoalChange}
              min={1}
              className="text-lg"
            />
            <p className="text-sm text-muted-foreground">
              Target amount of study time per day
            </p>
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
