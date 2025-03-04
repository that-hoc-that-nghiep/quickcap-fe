import { useState, useRef, useEffect } from 'react'
import { Paper, Text, TextInput, Button, Stack, Group, Avatar, ScrollArea, Loader } from '@mantine/core'
import { IconSend, IconRobot } from '@tabler/icons-react'
import { ChatMessage } from '../../models/chat'
import { generateAIResponse } from '../../services/aiService'

interface AIChatBoxProps {
    videoId: string
    videoTitle?: string
    videoDescription?: string
    videoAuthor?: string
}

export const AIChatBox = ({ videoId, videoTitle, videoDescription, videoAuthor }: AIChatBoxProps) => {
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [currentMessage, setCurrentMessage] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Initial greeting message
    useEffect(() => {
        const initialMessage: ChatMessage = {
            id: crypto.randomUUID(),
            content: `Hello! I'm your AI assistant. Ask me anything about this video.`,
            sender: 'ai',
            timestamp: new Date()
        }
        setMessages([initialMessage])
    }, [videoId])

    // Auto scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSendMessage = async () => {
        if (currentMessage.trim() === '') return

        // Add user message
        const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            content: currentMessage,
            sender: 'user',
            timestamp: new Date()
        }

        setMessages((prev) => [...prev, userMessage])
        setCurrentMessage('')
        setIsProcessing(true)

        try {
            // Get AI response
            const response = await generateAIResponse(currentMessage, {
                title: videoTitle,
                description: videoDescription,
                author: videoAuthor
            })

            // Add AI response
            const aiMessage: ChatMessage = {
                id: crypto.randomUUID(),
                content: response,
                sender: 'ai',
                timestamp: new Date()
            }

            setMessages((prev) => [...prev, aiMessage])
        } catch (error) {
            console.error(error)
            // Handle error
            const errorMessage: ChatMessage = {
                id: crypto.randomUUID(),
                content: "Sorry, I couldn't process your request. Please try again.",
                sender: 'ai',
                timestamp: new Date()
            }

            setMessages((prev) => [...prev, errorMessage])
        } finally {
            setIsProcessing(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    return (
        <Paper p='md' radius='md' shadow='md' style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
            <Text size='lg' fw={500} mb='xs'>
                Video Assistant
            </Text>

            <ScrollArea flex={1} mb='xs' px='xs' style={{ flexGrow: 1 }}>
                <Stack>
                    {messages.map((message) => (
                        <Group
                            key={message.id}
                            justify={message.sender === 'user' ? 'end' : 'start'}
                            align='flex-start'
                        >
                            {message.sender !== 'user' && (
                                <Avatar color={'green'} radius='xl'>
                                    <IconRobot size={20} />
                                </Avatar>
                            )}
                            <Paper
                                p='xs'
                                radius='md'
                                bg={message.sender === 'user' ? 'blue.1' : 'gray.1'}
                                style={{
                                    maxWidth: '80%',
                                    wordBreak: 'break-word'
                                }}
                                shadow='xs'
                            >
                                <Text size='sm'>{message.content}</Text>
                            </Paper>
                        </Group>
                    ))}
                    <div ref={messagesEndRef} />
                </Stack>
            </ScrollArea>

            <Group>
                <TextInput
                    placeholder='Ask a question about this video...'
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isProcessing}
                    style={{ flexGrow: 1 }}
                />
                <Button
                    onClick={handleSendMessage}
                    disabled={isProcessing || currentMessage.trim() === ''}
                    variant='filled'
                >
                    {isProcessing ? <Loader size='sm' /> : <IconSend size={20} />}
                </Button>
            </Group>
        </Paper>
    )
}
