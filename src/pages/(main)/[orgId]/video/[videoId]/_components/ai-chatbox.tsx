import { useQueryData } from '@/hooks/useQueryData'
import { createConversation, getConversation } from '@/services/conversation.service'
import { VideoMessage } from '@/types/conversation'
import { Button, Input, ScrollArea } from '@mantine/core'
import { useListState } from '@mantine/hooks'
import { useCallback, useEffect, useRef, useState } from 'react'
import Message from './ai-message'
import { IconSend } from '@tabler/icons-react'
import { BackendResponse } from '@/types/common'
import { notifications } from '@mantine/notifications'

type Props = {
    videoId: string
}
const AIChatbox = ({ videoId }: Props) => {
    const [conversation, handler] = useListState<VideoMessage>([])
    const [message, setMessage] = useState<string>('')
    const [isBotThinking, setIsBotThinking] = useState<boolean>(false)
    const { data, refetch } = useQueryData<BackendResponse<VideoMessage[]> | null>(['conversations', videoId], () =>
        getConversation(videoId)
    )

    const conversationData = data?.data ?? []
    useEffect(() => {
        if (data) {
            handler.setState(conversationData)
            scrollBottom()
        }
    }, [conversationData, videoId])
    const chatSectionViewport = useRef<HTMLDivElement>(null)
    const scrollBottom = useCallback(() => {
        if (chatSectionViewport.current) {
            chatSectionViewport.current.scrollIntoView(false)
        }
    }, [])
    useEffect(() => {
        scrollBottom()
    }, [conversation])

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }
    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (message.trim() === '') return

        setIsBotThinking(true)
        handler.append({ role: 'user', content: message })
        setMessage('')
        scrollBottom()
        try {
            const res = await createConversation(videoId, message)
            if (res) {
                handler.append({
                    role: 'ai',
                    content: res.data[1].content
                })
            }
        } catch (e) {
            console.log(e)
            notifications.show({
                title: 'Error',
                message: 'Failed to send message',
                color: 'red'
            })
        } finally {
            setIsBotThinking(false)
            scrollBottom()
            refetch()
        }
    }
    return (
        <div>
            <ScrollArea className='flex-grow h-[22rem]'>
                <div className='flex flex-col gap-4 p-4' ref={chatSectionViewport}>
                    {conversation.length === 0 && (
                        <Message role='ai' content='Hi there! I am an AI chatbot. How can I help you today?' />
                    )}
                    {conversation.map((message, index) => (
                        <Message key={index} {...message} />
                    ))}
                    {isBotThinking && <Message role='ai' content='l' />}
                </div>
            </ScrollArea>
            <form className='px-1 pt-3 flex gap-2' onSubmit={handleSendMessage}>
                <Input
                    placeholder='Type your message...'
                    value={message}
                    onChange={handleMessageChange}
                    className='grow'
                    disabled={isBotThinking}
                />
                <Button type='submit' size='icon' disabled={isBotThinking || message.trim() === ''}>
                    <IconSend className='size-4' />
                </Button>
            </form>
        </div>
    )
}

export default AIChatbox
