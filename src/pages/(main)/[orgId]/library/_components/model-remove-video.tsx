import { useOrgCategories } from '@/services/category.service'
import { deleteVideoById, removeVideoFromOrg } from '@/services/video.service'
import { Category } from '@/types'
import { Button, Group, Text } from '@mantine/core'
import { closeAllModals, openModal } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

interface VideoProps {
    videoId: string
    orgId: string
    categoryId: Category[]
}

const ConfirmRemoveVideoModal = ({ videoId, orgId, categoryId }: VideoProps) => {
    const queryClient = useQueryClient()
    const [isLoading, setIsLoading] = useState(false)
    const { data } = useOrgCategories(orgId!)
    const categoryIds = categoryId.map((category) => category._id)
    const filtercategoryIds =
        data?.data.filter((category) => categoryIds.includes(category._id)).map((category) => category._id) || []
    const handleRemoveVideo = async () => {
        setIsLoading(true)
        try {
            await removeVideoFromOrg(videoId, orgId, filtercategoryIds)
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
            <Text size='sm'>Are you sure you want to remove this video? This action cannot be undone.</Text>
            <Group justify='flex-end' mt='md'>
                <Button variant='outline' onClick={() => closeAllModals()} disabled={isLoading}>
                    Cancel
                </Button>
                <Button color='red' onClick={handleRemoveVideo} loading={isLoading}>
                    Remove Video
                </Button>
            </Group>
        </>
    )
}

export const openModalRemoveVideo = (videoId: string, orgId: string, categoryId: Category[]) => {
    openModal({
        title: 'Delete Video',
        children: <ConfirmRemoveVideoModal videoId={videoId} orgId={orgId} categoryId={categoryId} />
    })
}
