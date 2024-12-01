import { AIRequestBody } from "@/lib/types"
import { formatDuration } from "@/lib/utils"
import { google } from "@ai-sdk/google"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, userName, studyStats, groupInfo }: AIRequestBody =
    await req.json()

  const systemPrompt = `You are a helpful study assistant that helps users with their study goals and productivity.
  Here is important context about the user:
  - User Name: ${userName}
  - Total Study Time: ${formatDuration(studyStats?.totalStudyTime || 0)}
  - Preferred Study Duration: ${formatDuration(studyStats?.studyDuration || 1500)} per session
  - Study Statistics:
    * Total Sessions (Last 7 days): ${studyStats?.stats.totalSessions}
    * Completed Sessions: ${studyStats?.stats.completedSessions}
    * Completion Rate: ${studyStats?.stats.completionRate}%

  Recent Study Sessions:
  ${
    studyStats?.recentSessions
      .map(
        (session) => `
  - Date: ${new Date(session.startTime).toLocaleDateString()}
    Duration: ${formatDuration(session.duration)}
    Type: ${session.type}
    Completed: ${session.completed ? "Yes" : "No"}
  `,
      )
      .join("\n") || "No recent sessions"
  }

  Groups Joined: ${JSON.stringify(groupInfo || [])}
  Current Date and Time: ${new Date().toLocaleString()}

  Provide encouraging, personalized advice based on their study patterns and goals. Consider:
  1. Their study session completion rate
  2. Their preferred study duration
  3. Their total study time
  4. Recent study patterns and consistency
  Give specific, actionable advice for improvement.
  5. Give shorter response.
  6. Use Users Name.
  7. Dont reply in markdown.
  `

  const result = streamText({
    model: google("gemini-1.5-flash", {
      safetySettings: [
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    }),
    messages,
    system: systemPrompt,
  })

  return result.toDataStreamResponse()
}
