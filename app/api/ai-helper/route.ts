import { tools } from "@/app/ai/tools"
import { AIRequestBody } from "@/lib/types"
import { formatDuration } from "@/lib/utils"
import { google } from "@ai-sdk/google"
import { streamText } from "ai"

export async function POST(req: Request) {
  const { messages, userName, studyStats, groupInfo }: AIRequestBody =
    await req.json()

  const system = `You are a helpful study assistant that helps users with their study goals and productivity.
  Here is important context about the user:
  - User Name: ${userName}
  - Total Study Time: ${formatDuration(studyStats?.totalStudyTime || 0)}
  - Preferred Study Duration: ${formatDuration(studyStats?.studyDuration || 1500)} per session
  - Study Statistics:
    * Total Sessions: ${studyStats?.stats.totalSessions}
    * Completed Sessions: ${studyStats?.stats.completedSessions}
    * Completion Rate: ${studyStats?.stats.completionRate}%

  Recent Study Sessions:
  ${
    studyStats?.recentSessions
      .map(
        (session) => `
  - Date: ${new Date(session.startTime).toLocaleDateString()}
    Duration: ${formatDuration(session.duration)}
    Completed: ${session.completed ? "Yes" : "No"}
  `,
      )
      .join("\n") || "No recent sessions"
  }

  Groups Joined: ${JSON.stringify(groupInfo || [])}
  Current Date and Time: ${new Date().toLocaleString()}

  IMPORTANT: When displaying any tabular data, ALWAYS use the displayTable tool instead of markdown or plain text formatting.
  For example, when showing study sessions, use the displayTable tool with appropriate headers and rows.

  Provide encouraging, personalized advice based on their study patterns and goals. Consider:
  1. Their study session completion rate
  2. Their preferred study duration
  3. Their total study time
  4. Recent study patterns and consistency
  5. Give shorter response.
  6. Use Users Name. Prefer First Name
  `

  const result = streamText({
    model: google("gemini-1.5-flash"),
    messages,
    system,
    tools,
  })

  return result.toDataStreamResponse()
}
