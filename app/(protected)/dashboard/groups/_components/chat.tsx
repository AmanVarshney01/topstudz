"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import { useState, useEffect, useRef, useMemo } from "react"

interface ChatProps {
  groupId: Id<"groups">
}

export function Chat({ groupId }: ChatProps) {
  const { toast } = useToast()
  const currentUser = useQuery(api.users.viewer)
  const [message, setMessage] = useState("")
  const rawMessages = useQuery(api.messages.list, { groupId })
  const messages = useMemo(() => rawMessages || [], [rawMessages])
  const sendMessage = useMutation(api.messages.send)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
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
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Group Chat</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-[400px] flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-6">
              {messages.toReversed().map((message) => {
                const isCurrentUser = message.userId === currentUser?._id
                return (
                  <div
                    key={message._id}
                    className={`flex max-w-[70%] flex-col space-y-1 ${
                      isCurrentUser ? "ml-auto" : "mr-auto"
                    }`}
                  >
                    <div
                      className={`flex items-center gap-2 ${
                        isCurrentUser ? "flex-row-reverse" : "justify-start"
                      }`}
                    >
                      <span className="text-xs text-gray-500">
                        {new Date(message.createdAt).toLocaleTimeString()}
                      </span>
                      <span className="font-medium">{message.author}</span>
                    </div>
                    <div
                      className={`rounded-lg p-1 ${
                        isCurrentUser ? "text-end" : "text-start"
                      }`}
                    >
                      <p className="text-sm">{message.body}</p>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          <form
            onSubmit={handleSendMessage}
            className="mt-4 flex items-center space-x-2"
          >
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button type="submit" disabled={!message.trim()}>
              Send
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
