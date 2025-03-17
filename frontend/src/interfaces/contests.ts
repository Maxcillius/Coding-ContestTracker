interface Codeforces {
    city?: string,
    country?: string,
    description: string,
    difficulty: number,
    durationSeconds: number,
    froze: boolean,
    id: number,
    kind: string,
    name: string,
    season: string,
    phase: string,
    type: string,
    preparedBy?: string,
    relativeTimeSeconds?: number,
    startTimeSeconds?: number
}

interface Leetcode {
    containsPremium: boolean,
    duration: number,
    startTime: number,
    title: string,
    titleSlug: string,
    cardImg: any
}

export type { Codeforces, Leetcode }