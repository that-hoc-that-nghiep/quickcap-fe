export interface Video {
    _id: string
    title: string
    description?: string
    source: string
    userId: string
    orgId: string[]
    views: number
    type: 'private' | 'public'
    transcript: string
    categoryId: string[]
    createdAt: string
    isNSFW: boolean
    nsfwType: 'Drawing' | 'Hentai' | 'Neutral' | 'Porn' | 'Sexy'
    isDeleted: boolean
}
