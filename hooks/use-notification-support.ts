import { useState, useEffect } from "react"

export default function useNotificationSupport() {
  const [isSupported, setIsSupported] = useState(false)
  const [permission, setPermission] =
    useState<NotificationPermission>("default")

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setIsSupported(true)
      setPermission(Notification.permission)
    }
  }, [])

  return { isSupported, permission }
}
