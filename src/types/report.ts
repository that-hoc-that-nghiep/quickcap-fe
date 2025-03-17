import { Video } from './video'

export interface ReportVideo {
    _id: string
    user: {
        id: string
        email: string
        name: string
        given_name: string
        family_name: string
        picture: string
        subscription: string
    }
    videoId: Video
    type: string
    content: string
    approved: boolean
    createdAt: string
}
