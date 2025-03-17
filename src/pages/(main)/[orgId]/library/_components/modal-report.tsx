import { createReport } from '@/services/report.service'
import { ReportType } from '@/types/report'
import { Button, Checkbox, Group, Select, Textarea, useMantineTheme } from '@mantine/core'
import { closeAllModals, openModal } from '@mantine/modals'
import { useState } from 'react'
import { toast } from 'sonner'

const ReportVideoModal = ({ videoId }: { videoId: string }) => {
    const [type, setType] = useState('')
    const [content, setContent] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isConfirmed, setIsConfirmed] = useState(false)
    const theme = useMantineTheme()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isConfirmed) return

        setIsLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            await createReport(videoId, content, type)
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
                value={type}
                onChange={(value) => setType(value || '')}
            />

            <Textarea
                disabled={isLoading}
                withAsterisk
                label='Details'
                placeholder='Describe the issue...'
                mt='md'
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
