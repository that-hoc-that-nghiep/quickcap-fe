import { deleteVideoById } from '@/services/video.service'
import { Button, Group, Text } from '@mantine/core'
import { closeAllModals, openModal } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

interface VideoProps {
    videoId: string
    orgId: string
}

const ConfirmDeleteVideoModal = ({ videoId, orgId }: VideoProps) => {
    const queryClient = useQueryClient()
    const [isLoading, setIsLoading] = useState(false)
    const handleDeleteVideo = async () => {
        setIsLoading(true)
        try {
            await deleteVideoById(videoId, orgId)
            queryClient.invalidateQueries({
                queryKey: ['videos', orgId]
            })
            notifications.show({
                color: 'green',
                title: 'Success',
                message: 'Video deleted successfully'
            })
            closeAllModals()
        } catch (error: any) {
            console.error(error)
            if (error.response?.status === 400) {
                notifications.show({
                    color: 'orange',
                    title: 'Permission Denied',
                    message: error.response.data?.message || 'You are not allowed to remove this video.'
                })
            } else {
                notifications.show({
                    color: 'red',
                    title: 'Error',
                    message: 'Failed to delete video'
                })
            }
        } finally {
            setIsLoading(false)
            closeAllModals()
        }
    }

    return (
        <>
            <Text size='sm'>Are you sure you want to delete this video? This action cannot be undone.</Text>
            <Group justify='flex-end' mt='md'>
                <Button variant='outline' onClick={() => closeAllModals()} disabled={isLoading}>
                    Cancel
                </Button>
                <Button color='red' onClick={handleDeleteVideo} loading={isLoading}>
                    Delete Video
                </Button>
            </Group>
        </>
    )
}

export const openModalDeleteVideo = (videoId: string, orgId: string) => {
    openModal({
        title: 'Delete Video',
        children: <ConfirmDeleteVideoModal videoId={videoId} orgId={orgId} />
    })
}
