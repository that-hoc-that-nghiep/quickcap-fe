import { useOrgCategories } from '@/services/category.service'
import { addCategoryToVideos, removeCategoryToVideos } from '@/services/video.service'
import { Category } from '@/types'
import { Button, Group, Select, TextInput, Textarea, useMantineTheme } from '@mantine/core'
import { useForm } from '@mantine/form'
import { closeAllModals, openModal } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

const MoveVideoToOrgModal = ({ video }: { video: { id: string; categoryId: Category[]; orgId: string } }) => {
    const { data } = useOrgCategories(video.orgId!)
    const categoryIds = video.categoryId.map((category) => category._id)
    const filtercategoryIds =
        data?.data.filter((category) => categoryIds.includes(category._id)).map((category) => category._id) || []

    const theme = useMantineTheme()
    const queryClient = useQueryClient()
    const form = useForm({
        initialValues: {
            categoryId: filtercategoryIds[0]
        },

        validate: {
            categoryId: (value: string) => (value.length > 0 ? null : 'You must select at least one category')
        }
    })

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async () => {
        if (form.validate().hasErrors) return
        setIsLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            const removeCategories = filtercategoryIds.filter(
                (categoryId) => !form.values.categoryId.includes(categoryId)
            )
            await removeCategoryToVideos(video.id, removeCategories)
            await addCategoryToVideos(video.id, [form.values.categoryId])
            notifications.show({
                title: 'Move video to category',
                message: 'Video has been moved successfully',
                color: 'green'
            })
            queryClient.invalidateQueries({ queryKey: ['video', video.id] })
            closeAllModals()
        } catch (error) {
            console.error('Error move video to org:', error)
            notifications.show({
                title: 'Error move video',
                message: 'An error occurred while updating video',
                color: 'red'
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Select
                data={
                    data?.data.map((category) => ({
                        value: category._id,
                        label: category.name
                    })) || []
                }
                label='Categories'
                placeholder='Select categories'
                {...form.getInputProps('categoryId')}
                error={form.errors.categoryId}
                disabled={isLoading}
                multiple
            />
            <Group justify='flex-end' mt='md'>
                <Button variant='outline' onClick={() => closeAllModals()} disabled={isLoading}>
                    Cancel
                </Button>
                <Button type='submit' color={theme.colors[theme.primaryColor][5]} loading={isLoading}>
                    Save Changes
                </Button>
            </Group>
        </form>
    )
}

export const openMoveVideoToCategoryModal = (video: { id: string; categoryId: Category[]; orgId: string }) => {
    openModal({
        title: 'Move Video to Category',
        children: <MoveVideoToOrgModal video={video} />
    })
}
