import { createReport } from '@/services/report.service'
import { ReportType } from '@/types/report'
import { Button, Checkbox, Group, Select, Textarea, useMantineTheme } from '@mantine/core'
import { useForm } from '@mantine/form'
import { closeAllModals, openModal } from '@mantine/modals'
import { useState } from 'react'
import { toast } from 'sonner'

const ReportVideoModal = ({ videoId }: { videoId: string }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isConfirmed, setIsConfirmed] = useState(false)
    const theme = useMantineTheme()

    const form = useForm({
        initialValues: {
            type: '',
            content: ''
        },

        validate: {
            type: (value) => (value ? null : 'Please select a report type'),
            content: (value) => (value.trim().length >= 5 ? null : 'Content must be at least 5 characters')
        }
    })
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isConfirmed) return
        if (form.validate().hasErrors) return
        setIsLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            await createReport(videoId, form.values.content, form.values.type)
            toast.success('Report submitted successfully!')
            closeAllModals()
        } catch (error) {
            toast.error('Failed to submit report')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Select
                disabled={isLoading}
                withAsterisk
                label='Report Type'
                placeholder='Select a reason'
                data={Object.values(ReportType)}
                {...form.getInputProps('type')}
                error={form.errors.type}
            />

            <Textarea
                disabled={isLoading}
                withAsterisk
                label='Details'
                placeholder='Describe the issue...'
                mt='md'
                {...form.getInputProps('content')}
                error={form.errors.content}
            />

            <Checkbox
                disabled={isLoading}
                mt='md'
                label='I confirm that this report is accurate and truthful'
                checked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.currentTarget.checked)}
            />

            <Group justify='flex-end' mt='md'>
                <Button variant='outline' onClick={() => closeAllModals()} disabled={isLoading}>
                    Cancel
                </Button>
                <Button
                    type='submit'
                    color={theme.colors[theme.primaryColor][5]}
                    loading={isLoading}
                    disabled={!isConfirmed}
                >
                    Submit Report
                </Button>
            </Group>
        </form>
    )
}

export const openReportModal = (videoId: string) => {
    openModal({
        title: 'Report Video Violation',
        children: <ReportVideoModal videoId={videoId} />
    })
}
