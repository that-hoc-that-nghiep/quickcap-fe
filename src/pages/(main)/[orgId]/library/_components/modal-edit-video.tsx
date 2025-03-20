import { useOrgCategories } from '@/services/category.service'
import { addCategoryToVideos, removeCategoryToVideos, updateVideo } from '@/services/video.service'
import { Category } from '@/types'
import { Button, Group, Select, TextInput, Textarea, useMantineTheme } from '@mantine/core'
import { useForm } from '@mantine/form'
import { closeAllModals, openModal } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

const EditVideoModal = ({
    video
}: {
    video: { id: string; title: string; description: string; transcript: string; categoryId: Category[]; orgId: string }
}) => {
    const { data } = useOrgCategories(video.orgId!)
    const categoryIds = video.categoryId.map((category) => category._id)
    const filtercategoryIds =
        data?.data.filter((category) => categoryIds.includes(category._id)).map((category) => category._id) || []

    const theme = useMantineTheme()
    const queryClient = useQueryClient()
    const form = useForm({
        initialValues: {
            title: video.title,
            description: video.description,
            transcript: video.transcript,
            categoryId: filtercategoryIds
        },

        validate: {
            title: (value: string) => (value.trim().length > 0 ? null : 'Title is required'),
            description: (value: string) =>
                value.trim().length > 5 ? null : 'Description must be at least 5 characters',
            transcript: (value: string) =>
                value.trim().length > 10 ? null : 'Transcript must be at least 10 characters',
            categoryId: (value: string[]) => (value.length > 0 ? null : 'You must select at least one category')
        }
    })

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async () => {
        if (form.validate().hasErrors) return
        setIsLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            await updateVideo(video.id, {
                title: form.values.title,
                description: form.values.description,
                transcript: form.values.transcript
            })
            const removeCategories = filtercategoryIds.filter(
                (categoryId) => !form.values.categoryId.includes(categoryId)
            )
            await removeCategoryToVideos(video.id, removeCategories)
            await addCategoryToVideos(video.id, form.values.categoryId)
            notifications.show({
                title: 'Video updated',
                message: 'Video has been updated successfully',
                color: 'green'
            })
            queryClient.invalidateQueries({ queryKey: ['video', video.id] })
            closeAllModals()
        } catch (error) {
            console.error('Error updating video:', error)
            notifications.show({
                title: 'Error updating video',
                message: 'An error occurred while updating video',
                color: 'red'
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                autoFocus
                disabled={isLoading}
                withAsterisk
                label='Title'
                placeholder='Enter video title'
                {...form.getInputProps('title')}
                error={form.errors.title}
            />

            <Textarea
                disabled={isLoading}
                withAsterisk
                resize='vertical'
                label='Description'
                placeholder='Enter video description'
                mt='md'
                {...form.getInputProps('description')}
                error={form.errors.description}
            />

            <Textarea
                disabled={isLoading}
                withAsterisk
                resize='vertical'
                label='Transcript'
                placeholder='Enter video transcript'
                mt='md'
                {...form.getInputProps('transcript')}
                error={form.errors.transcript}
            />
            <Select
                data={
                    data?.data.map((category) => ({
                        value: category._id,
                        label: category.name
                    })) || []
                }
                label='Categories'
                placeholder='Select categories'
                mt='md'
                {...form.getInputProps('categoryId')}
                error={form.errors.categoryId}
                disabled={isLoading}
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

export const openEditVideoModal = (video: {
    id: string
    title: string
    description: string
    transcript: string
    categoryId: Category[]
    orgId: string
}) => {
    openModal({
        title: 'Edit Video',
        children: <EditVideoModal video={video} />
    })
}
