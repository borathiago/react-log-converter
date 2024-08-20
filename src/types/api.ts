export interface LogStats {
    totalLogs: number
    totalConversions: number
    histogram: [{ date: string; conversions: number }]
}