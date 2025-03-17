import { updateVideo } from '@/services/video.service'
import { Button, Group, TextInput, Textarea, useMantineTheme } from '@mantine/core'
import { useForm } from '@mantine/form'
import { closeAllModals, openModal } from '@mantine/modals'
import { useState } from 'react'
import { toast } from 'sonner'

const EditVideoModal = ({
    video
}: {
    video: { id: string; title: string; description: string; transcript: string }
}) => {
    const theme = useMantineTheme()
    const form = useForm({
        initialValues: {
            title: video.title,
            description: video.description,
            transcript: video.transcript
        },

        validate: {
            title: (value) => (value.trim().length > 0 ? null : 'Title is required'),
            description: (value) => (value.trim().length > 5 ? null : 'Description must be at least 5 characters'),
            transcript: (value) => (value.trim().length > 10 ? null : 'Transcript must be at least 10 characters')
        }
    })

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async () => {
        if (!form.isValid()) return

        setIsLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            await updateVideo(video.id, form.values)
            toast.success('Video updated successfully!')
            closeAllModals()
        } catch (error) {
            console.error('Error updating video:', error)
            toast.error('Failed to update video')
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
            />

            <Textarea
                disabled={isLoading}
                withAsterisk
                label='Description'
                placeholder='Enter video description'
                mt='md'
                {...form.getInputProps('description')}
            />

            <Textarea
                disabled={isLoading}
                withAsterisk
                label='Transcript'
                placeholder='Enter video transcript'
                mt='md'
                {...form.getInputProps('transcript')}
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

export const openEditVideoModal = (video: { id: string; title: string; description: string; transcript: string }) => {
    openModal({
        title: 'Edit Video',
        children: <EditVideoModal video={video} />
    })
}
