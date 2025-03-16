export interface Conversation {
    conversations: Message[]
}

export interface Message {
    role: 'user' | 'ai'
    content: string
}
