export interface Invite {
    _id: string
    senderId: string
    receiverId: string
    emailReceiver: string
    content: string
    orgId: string
    accepted: boolean
}
