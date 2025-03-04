export interface ChatMessage {
    id: string
    content: string
    sender: 'user' | 'ai'
    timestamp: Date
}

export interface ChatSession {
    messages: ChatMessage[]
    videoId: string
}
