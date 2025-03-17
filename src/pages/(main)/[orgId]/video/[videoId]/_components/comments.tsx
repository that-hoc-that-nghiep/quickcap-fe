import { Suspense, useEffect, useState } from 'react'
import { Avatar, Button, Flex, Group, Paper, Text, Textarea, Stack, Skeleton, ScrollArea } from '@mantine/core'
import { useParams } from 'react-router'
import { createComment, useComments } from '@/services/comment'
import { Comment } from '@/types/comment'
import dayjs from 'dayjs'
import { toast } from 'sonner'
import { getHotkeyHandler } from '@mantine/hooks'

export const Comments = () => {
    const { videoId } = useParams<{ videoId: string }>()
    const { data } = useComments(videoId!)
    const [comments, setComments] = useState<Comment[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    useEffect(() => {
        if (data) {
            setComments(data.data)
        }
    }, [data])

    const [newComment, setNewComment] = useState('')

    const handleAddComment = async () => {
        if (!newComment.trim()) return
        setIsSubmitting(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            const response = await createComment(videoId!, newComment)
            if (response?.data) {
                setComments([response.data, ...comments])
                toast.success('Comment successfully')
                setNewComment('')
            }
        } catch (error) {
            console.error(error)
            toast.error('Error adding comment')
        } finally {
            setIsSubmitting(false)
        }
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleAddComment()
        }
    }
    const totalComments = comments.reduce((total) => total + 1, 0)

    return (
        <Stack>
            <Group>
                <Text fw={500} size='lg'>
                    Comments ({totalComments})
                </Text>
            </Group>

            {/* Comment Input */}
            <Paper p='md' withBorder shadow='md'>
                <Textarea
                    placeholder='Add a comment...'
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            handleAddComment()
                        }
                    }}
                    minRows={2}
                    mb={12}
                    disabled={isSubmitting}
                />
                <Flex justify='flex-end'>
                    <Button onKeyDown={() => handleKeyDown} onClick={handleAddComment} loading={isSubmitting}>
                        Post Comment
                    </Button>
                </Flex>
            </Paper>

            {/* Comments Display */}
            <ScrollArea h={500}>
                <Suspense
                    fallback={Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} height={100} />
                    ))}
                >
                    {comments.map((comment) => (
                        <Paper key={comment._id} p='md' withBorder mb={12} shadow='md'>
                            <Group align='flex-start'>
                                <Avatar src={comment.user.picture} radius='xl' size='md' />
                                <div style={{ flex: 1 }}>
                                    <Group mb={4}>
                                        <Text fw={500}>{comment.user.name}</Text>
                                        <Text size='xs' c='dimmed'>
                                            {dayjs(comment.createdAt).format('DD/MM/YYYY - HH:mm')}
                                        </Text>
                                    </Group>
                                    <Text mb={8}>{comment.content}</Text>
                                </div>
                            </Group>
                        </Paper>
                    ))}
                </Suspense>
            </ScrollArea>
        </Stack>
    )
}
