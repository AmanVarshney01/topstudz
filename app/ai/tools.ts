import { tool as createTool } from "ai"
import { z } from "zod"

export const tableDisplayTool = createTool({
  description: "Display data in a table format",
  parameters: z.object({
    headers: z.array(z.string()).describe("Column headers for the table"),
    rows: z.array(z.array(z.string())).describe("Data rows for the table"),
    caption: z.string().optional().describe("Optional table caption"),
  }),
  execute: async function ({ headers, rows, caption }) {
    return { headers, rows, caption }
  },
})

export const tools = {
  displayTable: tableDisplayTool,
}
