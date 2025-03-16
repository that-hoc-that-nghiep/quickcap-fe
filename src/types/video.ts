export interface Video {
    _id: string
    title: string
    description?: string
    source: string
    user: {
        id: string
        email: string
        name: string
        given_name: string
        family_name: string
        picture: string
        subscription: string
    }
    orgId: string[]
    views: number
    like: number
    transcript: string
    categoryId: string[]
    createdAt: string
    isNSFW: boolean
    nsfwType: 'Drawing' | 'Hentai' | 'Neutral' | 'Porn' | 'Sexy'
    isDeleted: boolean
}
