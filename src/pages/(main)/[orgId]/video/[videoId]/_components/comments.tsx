import { Suspense, useEffect, useState } from 'react'
import {
    Avatar,
    Button,
    Flex,
    Group,
    Paper,
    Text,
    Textarea,
    Stack,
    Skeleton,
    ScrollArea,
    ActionIcon,
    Tooltip
} from '@mantine/core'
import { useParams } from 'react-router'
import { createComment, useComments } from '@/services/comment'
import { Comment } from '@/types/comment'
import dayjs from 'dayjs'
import { notifications } from '@mantine/notifications'
import { IconTrash } from '@tabler/icons-react'
import { useUser } from '@/hooks/useUser'
import { openModalDeleteComment } from './modal-delete-comment'

export const Comments = () => {
    const { videoId } = useParams<{ videoId: string }>()
    const { data } = useComments(videoId!)
    const [comments, setComments] = useState<Comment[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { currentOrg } = useUser()
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
                notifications.show({
                    title: 'Comment added',
                    message: 'Your comment has been added successfully',
                    color: 'green'
                })
                setNewComment('')
            }
        } catch (error) {
            console.error(error)
            notifications.show({
                title: 'Error',
                message: 'Failed to add comment',
                color: 'red'
            })
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
    const totalComments = comments.filter((comment) => !comment.isDeleted).reduce((total) => total + 1, 0)

    return (
        <Stack>
            <Group>
                <Text fw={500} size='lg'>
                    Comments ({totalComments})
                </Text>
            </Group>
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

            <ScrollArea h={500}>
                <Suspense
                    fallback={Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} height={100} />
                    ))}
                >
                    {comments
                        .filter((comment) => !comment.isDeleted)
                        .map((comment) => (
                            <Paper key={comment._id} p='md' withBorder mb={12} shadow='md'>
                                <Group align='flex-start'>
                                    <Avatar src={comment.user.picture} radius='xl' size='md' />
                                    <div style={{ flex: 1 }}>
                                        <Group justify='space-between' mb={4}>
                                            <Group>
                                                <Text fw={500}>{comment.user.name}</Text>
                                                <Text size='xs' c='dimmed'>
                                                    {dayjs(comment.createdAt).format('DD/MM/YYYY - HH:mm')}
                                                </Text>
                                            </Group>

                                            {currentOrg?.is_owner && (
                                                <Tooltip label='Delete comment' withArrow>
                                                    <ActionIcon
                                                        variant='subtle'
                                                        onClick={() => openModalDeleteComment(videoId!, comment._id)}
                                                    >
                                                        <IconTrash size={16} />
                                                    </ActionIcon>
                                                </Tooltip>
                                            )}
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
