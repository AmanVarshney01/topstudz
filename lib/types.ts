type StudySession = {
  startTime: string
  endTime: string | null
  duration: number
  type: string
  completed: boolean
}

type StudyStats = {
  totalStudyTime: number
  studyDuration: number
  recentSessions: StudySession[]
  stats: {
    totalSessions: number
    completedSessions: number
    completionRate: string
  }
}

type AIRequestBody = {
  messages: any[]
  userName: string | undefined
  studyStats: StudyStats | undefined
  groupInfo: any[]
}
