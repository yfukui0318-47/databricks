export type UsageStats = {
  firstVisitedAt: string
  lastVisitedAt: string
  previousVisitedAt: string | null
  visitCount: number
}

const STORAGE_KEY = 'cert-workspace-usage'

export function recordUsageVisit(now = new Date()): UsageStats {
  const currentValue = window.localStorage.getItem(STORAGE_KEY)
  const currentStats = currentValue ? (JSON.parse(currentValue) as UsageStats) : null
  const nowIso = now.toISOString()

  const nextStats: UsageStats = {
    firstVisitedAt: currentStats?.firstVisitedAt ?? nowIso,
    previousVisitedAt: currentStats?.lastVisitedAt ?? null,
    lastVisitedAt: nowIso,
    visitCount: (currentStats?.visitCount ?? 0) + 1,
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextStats))
  return nextStats
}
