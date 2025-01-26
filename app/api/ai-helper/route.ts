import { tools } from "@/app/ai/tools"
import { AIRequestBody } from "@/lib/types"
import { formatDuration } from "@/lib/utils"
import { google } from "@ai-sdk/google"
import { streamText } from "ai"

export async function POST(req: Request) {
  const { messages, userName, studyStats, groupInfo }: AIRequestBody =
    await req.json()

  const userContext = `
    User Profile:
    - Name: ${userName}
    - Total Study Time: ${formatDuration(studyStats?.totalStudyTime || 0)}
    - Preferred Session Length: ${formatDuration(studyStats?.studyDuration || 1500)}
  `

  const studyMetrics = `
    Study Performance:
    - Total Sessions: ${studyStats?.stats.totalSessions}
    - Completed Sessions: ${studyStats?.stats.completedSessions}
    - Success Rate: ${studyStats?.stats.completionRate}%
  `

  const recentActivity = `
    Recent Study History:
    ${
      studyStats?.recentSessions
        .map(
          (session) => `
    - ${new Date(session.startTime).toLocaleDateString()}
      Duration: ${formatDuration(session.duration)}
      Completed: ${session.completed ? "✓" : "✗"}
    `,
        )
        .join("") || "No recent study activity recorded"
    }
      `

  const additionalContext = `
    Additional Information:
    - Groups: ${JSON.stringify(groupInfo || [])}
    - Current Time: ${new Date().toLocaleString()}
      `

  const guidelines = `
    Key Instructions:
    1. ALWAYS use displayTable tool for tabular data presentation
    2. Provide concise, personalized feedback
    3. Focus on:
      - Completion rate trends
      - Session duration patterns
      - Overall study consistency
    4. Keep responses brief and actionable
    5. Address user by their first name
      `

  const system = `You are a supportive study advisor providing personalized guidance.

    ${userContext}
    ${studyMetrics}
    ${recentActivity}
    ${additionalContext}
    ${guidelines}
`

  const result = streamText({
    model: google("gemini-1.5-flash"),
    messages,
    system,
    tools,
  })

  return result.toDataStreamResponse()
}
