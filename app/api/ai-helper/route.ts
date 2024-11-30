import { google } from "@ai-sdk/google"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, userName, studyStats, groupInfo } = await req.json()

  const systemPrompt = `You are a helpful study assistant that helps users with their study goals and productivity.
  Here is important context about the user:
  - User Name: ${userName}
  - Total Study Time: ${studyStats?.totalStudyTime || 0} seconds
  - Recent Study Sessions: ${JSON.stringify(studyStats?.recentSessions || [])}
  - Groups Joined: ${JSON.stringify(groupInfo || [])}
  - Todays Date and Time: ${new Date().toLocaleString()}

  Provide encouraging, personalized advice based on their study patterns and goals. Give a short staight to point advice.`

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
