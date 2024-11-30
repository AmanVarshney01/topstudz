"use client"

import { useChat } from "ai/react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import PageTitle from "@/components/page-title"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Bot,
  User,
  Send,
  RefreshCw,
  StopCircle,
  Loader2,
  TrashIcon,
} from "lucide-react"
import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AIHelperPage() {
  const getStudyStats = useQuery(api.study.getFullStats)
  const listMyGroups = useQuery(api.groups.listMyGroups)
  const user = useQuery(api.users.viewer)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    reload,
    stop,
    setMessages,
  } = useChat({
    api: "/api/ai-helper",
    body: {
      studyStats: getStudyStats,
      groupInfo: listMyGroups,
      userName: user?.name,
    },
    onError: (error) => {
      toast.error("An error occurred while getting a response: ", {
        description: error.message,
      })
    },
    onFinish: () => {
      scrollToBottom()
    },
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const clearChat = () => {
    setMessages([])
    toast.success("Chat history cleared")
  }

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <PageTitle title="AI Study Assistant" />
        <Button
          variant="outline"
          size="sm"
          onClick={clearChat}
          className="gap-2"
        >
          <TrashIcon className="h-4 w-4" />
          Clear Chat
        </Button>
      </div>

      <Card className="flex h-[calc(100svh-120px)] flex-col">
        <ScrollArea
          className="flex-1 p-4"
          style={{ height: "calc(100% - 80px)" }}
        >
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
              <Bot className="mb-4 h-12 w-12" />
              <h3 className="mb-2 text-lg font-semibold">
                How can I help you study better?
              </h3>
              <p className="max-w-sm text-sm">
                Ask me anything about study techniques, time management, or get
                personalized advice based on your study patterns.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3 text-sm",
                    message.role === "user" ? "flex-row-reverse" : "flex-row",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted",
                    )}
                  >
                    {message.role === "user" ? (
                      <Avatar className="size-8">
                        <AvatarImage src={user?.image} />
                        <AvatarFallback>
                          <User />
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <Bot className="size-6" />
                    )}
                  </div>
                  <div className={cn("rounded-lg bg-muted px-4 py-3")}>
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-3">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>

        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask anything about studying..."
              disabled={isLoading}
              className="flex-1"
            />
            <div className="flex gap-2">
              {isLoading ? (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={stop}
                >
                  <StopCircle className="h-4 w-4" />
                </Button>
              ) : (
                messages.length > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.preventDefault()
                      reload()
                    }}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                )
              )}
              <Button type="submit" size="icon" disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
