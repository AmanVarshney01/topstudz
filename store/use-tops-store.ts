import { create } from "zustand"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

interface TopsState {
  currentSessionTops: number
  incrementTops: (seconds: number) => void
  resetSessionTops: () => void
  useGetTotalTops: () => number | undefined
}

export const useTopsStore = create<TopsState>()((set, get) => ({
  currentSessionTops: 0,
  incrementTops: (seconds) =>
    set((state) => ({
      currentSessionTops: state.currentSessionTops + seconds,
    })),
  resetSessionTops: () => set({ currentSessionTops: 0 }),
  useGetTotalTops: () => {
    const stats = useQuery(api.study.getStats)
    return stats?.totalStudyTime
  },
}))
