import { deleteComment } from '@/services/comment'
import { Button, Group, Text } from '@mantine/core'
import { closeAllModals, openModal } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

interface CommentProps {
    commentId: string
    videoId: string
}

const ConfirmDeleteCommentModal = ({ commentId, videoId }: CommentProps) => {
    const queryClient = useQueryClient()
    const [isLoading, setIsLoading] = useState(false)
    const handleDeleteComment = async () => {
        setIsLoading(true)
        try {
            await deleteComment(commentId)
            queryClient.invalidateQueries({
                queryKey: ['comments', videoId]
            })
            notifications.show({
                color: 'green',
                title: 'Success',
                message: 'Comment deleted successfully'
            })
            closeAllModals()
        } catch (error: any) {
            console.error(error)
            if (error.response?.status === 400) {
                notifications.show({
                    color: 'orange',
                    title: 'Permission Denied',
                    message: error.response.data?.message || 'You are not allowed to remove this comment.'
                })
            } else {
                notifications.show({
                    color: 'red',
                    title: 'Error',
                    message: 'Failed to delete comment'
                })
            }
        } finally {
            setIsLoading(false)
            closeAllModals()
        }
    }

    return (
        <>
            <Text size='sm'>Are you sure you want to delete this comment? This action cannot be undone.</Text>
            <Group justify='flex-end' mt='md'>
                <Button variant='outline' onClick={() => closeAllModals()} disabled={isLoading}>
                    Cancel
                </Button>
                <Button color='red' onClick={handleDeleteComment} loading={isLoading}>
                    Delete Comment
                </Button>
            </Group>
        </>
    )
}

export const openModalDeleteComment = (videoId: string, commentId: string) => {
    openModal({
        title: 'Delete Comment',
        children: <ConfirmDeleteCommentModal videoId={videoId} commentId={commentId} />
    })
}
