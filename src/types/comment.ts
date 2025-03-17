export interface Comment {
    _id: string
    content: string
    videoId: string
    user: {
        id: string
        email: string
        name: string
        given_name: string
        family_name: string
        picture: string
        subscription: string
    }
    createdAt: string
    isDeleted: boolean
}
