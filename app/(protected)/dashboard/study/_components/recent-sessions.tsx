import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { formatTimeTimer } from "@/lib/utils"
import { History } from "lucide-react"

export default function RecentSessions({ sessions }: { sessions: any[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <History className="mr-2 h-5 w-5" /> Study History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 overflow-y-auto">
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
                <p className="font-medium">
                  {formatTimeTimer(session.duration)}
                </p>
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
