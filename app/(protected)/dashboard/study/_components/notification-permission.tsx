import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Bell } from "lucide-react"
import { useState } from "react"

export default function NotificationPermission() {
  const [permission, setPermission] = useState(
    typeof window !== "undefined" ? Notification.permission : "default",
  )

  const requestPermission = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      const result = await Notification.requestPermission()
      setPermission(result)

      if (result === "granted") {
        new Notification("Notifications Enabled! 🎉", {
          body: "You'll be notified when your study sessions complete.",
          icon: "/favicon.ico",
        })
      }
    }
  }

  if (!("Notification" in window)) {
    return null
  }

  if (permission === "denied") {
    return (
      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-yellow-600">
            <AlertTriangle className="h-5 w-5" />
            <p>
              Notifications are blocked. Please enable them in your browser
              settings to receive study alerts.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (permission === "default") {
    return (
      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <p>Enable notifications for study reminders</p>
            </div>
            <Button onClick={requestPermission} variant="outline">
              Enable Notifications
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}
