import { useState } from 'react'
import { Avatar, Button, Flex, Group, Paper, Text, Textarea, Select, ActionIcon, Stack } from '@mantine/core'
import { IconHeart, IconThumbDown, IconHeartFilled, IconThumbDownFilled, IconMessageDots } from '@tabler/icons-react'

// Mock data for comments
const mockComments = [
    {
        id: '1',
        userId: 'user1',
        username: 'JohnDoe',
        avatar: 'https://i.pravatar.cc/150?u=user1',
        content: 'Great video! Very informative and well explained.',
        timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
        likes: 15,
        dislikes: 2,
        replies: [
            {
                id: '1-1',
                userId: 'user2',
                username: 'JaneSmith',
                avatar: 'https://i.pravatar.cc/150?u=user2',
                content: 'I agree! The explanations were very clear.',
                timestamp: new Date(Date.now() - 3600000), // 1 hour ago
                likes: 5,
                dislikes: 0
            }
        ]
    },
    {
        id: '2',
        userId: 'user3',
        username: 'AliceJohnson',
        avatar: 'https://i.pravatar.cc/150?u=user3',
        content: "Could you explain more about the concept at 2:30? I didn't quite understand that part.",
        timestamp: new Date(Date.now() - 3600000 * 5), // 5 hours ago
        likes: 7,
        dislikes: 0,
        replies: []
    },
    {
        id: '3',
        userId: 'user4',
        username: 'BobWilliams',
        avatar: 'https://i.pravatar.cc/150?u=user4',
        content: "Thanks for sharing this! I've been looking for a good explanation of this topic.",
        timestamp: new Date(Date.now() - 3600000 * 8), // 8 hours ago
        likes: 10,
        dislikes: 1,
        replies: []
    }
]

interface Comment {
    id: string
    userId: string
    username: string
    avatar: string
    content: string
    timestamp: Date
    likes: number
    dislikes: number
    replies?: Comment[]
}

// interface VideoCommentsProps {
//     videoId: string
// }

export const VideoComments = () => {
    const [comments, setComments] = useState<Comment[]>(mockComments)
    const [newComment, setNewComment] = useState('')
    const [sortOption, setSortOption] = useState('newest')
    const [likedComments, setLikedComments] = useState<Record<string, boolean>>({})
    const [dislikedComments, setDislikedComments] = useState<Record<string, boolean>>({})

    const handleAddComment = () => {
        if (!newComment.trim()) return

        const comment: Comment = {
            id: Date.now().toString(),
            userId: 'currentUser', // In a real app, get from auth
            username: 'Current User',
            avatar: 'https://i.pravatar.cc/150?u=currentUser',
            content: newComment,
            timestamp: new Date(),
            likes: 0,
            dislikes: 0,
            replies: []
        }

        setComments([comment, ...comments])
        setNewComment('')
    }

    const formatTimestamp = (date: Date) => {
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

        if (diffHours < 1) {
            const diffMinutes = Math.floor(diffMs / (1000 * 60))
            return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`
        }

        if (diffHours < 24) {
            return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
        }

        const diffDays = Math.floor(diffHours / 24)
        return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
    }

    const handleLike = (commentId: string) => {
        setComments(
            comments.map((comment) => {
                if (comment.id === commentId) {
                    const isLiked = likedComments[commentId]
                    return {
                        ...comment,
                        likes: isLiked ? comment.likes - 1 : comment.likes + 1
                    }
                }
                return comment
            })
        )

        setLikedComments({
            ...likedComments,
            [commentId]: !likedComments[commentId]
        })

        // Remove dislike if exists
        if (dislikedComments[commentId]) {
            setDislikedComments({
                ...dislikedComments,
                [commentId]: false
            })
        }
    }

    const handleDislike = (commentId: string) => {
        setComments(
            comments.map((comment) => {
                if (comment.id === commentId) {
                    const isDisliked = dislikedComments[commentId]
                    return {
                        ...comment,
                        dislikes: isDisliked ? comment.dislikes - 1 : comment.dislikes + 1
                    }
                }
                return comment
            })
        )

        setDislikedComments({
            ...dislikedComments,
            [commentId]: !dislikedComments[commentId]
        })

        // Remove like if exists
        if (likedComments[commentId]) {
            setLikedComments({
                ...likedComments,
                [commentId]: false
            })
        }
    }

    const handleReply = (commentId: string) => {
        // In a real implementation, you would open a reply input field
        console.log(`Reply to comment ${commentId}`)
    }

    const sortedComments = [...comments].sort((a, b) => {
        if (sortOption === 'newest') {
            return b.timestamp.getTime() - a.timestamp.getTime()
        }
        if (sortOption === 'oldest') {
            return a.timestamp.getTime() - b.timestamp.getTime()
        }
        if (sortOption === 'most_liked') {
            return b.likes - a.likes
        }
        return 0
    })

    const totalComments = comments.reduce((total, comment) => total + 1 + (comment.replies?.length || 0), 0)

    return (
        <Stack>
            <Group>
                <Text fw={500} size='lg'>
                    Comments ({totalComments})
                </Text>
                <Select
                    size='sm'
                    value={sortOption}
                    onChange={(value) => setSortOption(value || 'newest')}
                    data={[
                        { value: 'newest', label: 'Newest First' },
                        { value: 'oldest', label: 'Oldest First' },
                        { value: 'most_liked', label: 'Most Liked' }
                    ]}
                    w={150}
                />
            </Group>

            {/* Comment Input */}
            <Paper p='md' withBorder shadow='md'>
                <Textarea
                    placeholder='Add a comment...'
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    minRows={2}
                    mb={12}
                />
                <Flex justify='flex-end'>
                    <Button onClick={handleAddComment}>Post Comment</Button>
                </Flex>
            </Paper>

            {/* Comments Display */}
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                {sortedComments.map((comment) => (
                    <Paper key={comment.id} p='md' withBorder mb={12} shadow='md'>
                        <Group align='flex-start'>
                            <Avatar src={comment.avatar} radius='xl' size='md' />
                            <div style={{ flex: 1 }}>
                                <Group mb={4}>
                                    <Text fw={500}>{comment.username}</Text>
                                    <Text size='xs' c='dimmed'>
                                        {formatTimestamp(comment.timestamp)}
                                    </Text>
                                </Group>
                                <Text mb={8}>{comment.content}</Text>
                                <Group>
                                    <ActionIcon
                                        variant='subtle'
                                        onClick={() => handleLike(comment.id)}
                                        color={likedComments[comment.id] ? 'blue' : 'gray'}
                                    >
                                        {likedComments[comment.id] ? (
                                            <IconHeartFilled size={16} />
                                        ) : (
                                            <IconHeart size={16} />
                                        )}
                                    </ActionIcon>
                                    <Text size='xs'>{comment.likes}</Text>

                                    <ActionIcon
                                        variant='subtle'
                                        onClick={() => handleDislike(comment.id)}
                                        color={dislikedComments[comment.id] ? 'red' : 'gray'}
                                    >
                                        {dislikedComments[comment.id] ? (
                                            <IconThumbDownFilled size={16} />
                                        ) : (
                                            <IconThumbDown size={16} />
                                        )}
                                    </ActionIcon>
                                    <Text size='xs'>{comment.dislikes}</Text>

                                    <ActionIcon variant='subtle' onClick={() => handleReply(comment.id)}>
                                        <IconMessageDots size={16} />
                                    </ActionIcon>
                                    <Text size='xs'>Reply</Text>
                                </Group>

                                {/* Replies */}
                                {comment.replies && comment.replies.length > 0 && (
                                    <div style={{ marginTop: 12, marginLeft: 20 }}>
                                        {comment.replies.map((reply) => (
                                            <Paper key={reply.id} p='md' withBorder mb={8} shadow='xs'>
                                                <Group align='flex-start'>
                                                    <Avatar src={reply.avatar} radius='xl' size='sm' />
                                                    <div style={{ flex: 1 }}>
                                                        <Group mb={4}>
                                                            <Text size='sm' fw={500}>
                                                                {reply.username}
                                                            </Text>
                                                            <Text size='xs' color='dimmed'>
                                                                {formatTimestamp(reply.timestamp)}
                                                            </Text>
                                                        </Group>
                                                        <Text size='sm'>{reply.content}</Text>
                                                        <Group mt={4}>
                                                            <ActionIcon size='sm' variant='subtle'>
                                                                <IconHeart size={14} />
                                                            </ActionIcon>
                                                            <Text size='xs'>{reply.likes}</Text>

                                                            <ActionIcon size='sm' variant='subtle'>
                                                                <IconThumbDown size={14} />
                                                            </ActionIcon>
                                                            <Text size='xs'>{reply.dislikes}</Text>
                                                        </Group>
                                                    </div>
                                                </Group>
                                            </Paper>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Group>
                    </Paper>
                ))}
            </div>
        </Stack>
    )
}
