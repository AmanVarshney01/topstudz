"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import { useState, useEffect, useRef, useMemo } from "react"
import { toast } from "sonner"
import { Send, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatProps {
  groupId: Id<"groups">
}

export function Chat({ groupId }: ChatProps) {
  const currentUser = useQuery(api.users.viewer)
  const [message, setMessage] = useState("")
  const rawMessages = useQuery(api.messages.list, { groupId })
  const messages = useMemo(() => rawMessages || [], [rawMessages])
  const sendMessage = useMutation(api.messages.send)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    try {
      await sendMessage({
        groupId,
        body: message.trim(),
      })
      setMessage("")
    } catch (error) {
      toast.error("Failed to send message")
    }
  }

  return (
    <Card className="flex h-[calc(100svh-170px)] flex-col">
      <ScrollArea
        ref={scrollAreaRef}
        className="flex-1 p-4"
        style={{ height: "calc(100% - 80px)" }}
      >
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
            <User className="mb-4 h-12 w-12" />
            <h3 className="mb-2 text-lg font-semibold">
              Start chatting with your group
            </h3>
            <p className="max-w-sm text-sm">
              Send messages to communicate with other members of this group.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.toReversed().map((message) => {
              const isCurrentUser = message.userId === currentUser?._id
              return (
                <div
                  key={message._id}
                  className={cn(
                    "flex gap-3 text-sm",
                    isCurrentUser ? "flex-row-reverse" : "flex-row",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full",
                      isCurrentUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted",
                    )}
                  >
                    <User className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span
                      className={cn(
                        "text-xs text-muted-foreground",
                        isCurrentUser ? "text-right" : "text-left",
                      )}
                    >
                      {message.author}
                    </span>
                    <div
                      className={cn(
                        "rounded-lg px-4 py-3",
                        isCurrentUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted",
                      )}
                    >
                      {message.body}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </ScrollArea>

      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!message.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  )
}
