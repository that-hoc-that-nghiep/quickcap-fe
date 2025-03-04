export interface VideoContext {
    title?: string
    description?: string
    author?: string
}

export const generateAIResponse = async (prompt: string, videoContext: VideoContext): Promise<string> => {
    // In a real implementation, this would call an AI API
    // This is a mock implementation for demonstration
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate processing delay

    const lowerPrompt = prompt.toLowerCase()

    if (lowerPrompt.includes('about') || lowerPrompt.includes('what is this video')) {
        return `This video is titled "${videoContext.title}" by ${videoContext.author}. ${videoContext.description}`
    } else if (lowerPrompt.includes('who') || lowerPrompt.includes('author') || lowerPrompt.includes('creator')) {
        return `This video was created by ${videoContext.author}.`
    } else if (lowerPrompt.includes('hello') || lowerPrompt.includes('hi')) {
        return `Hello! I'm here to help answer questions about "${videoContext.title}". What would you like to know?`
    } else {
        return `The video "${videoContext.title}" is about: ${videoContext.description}. Is there anything specific you'd like to know?`
    }
}
