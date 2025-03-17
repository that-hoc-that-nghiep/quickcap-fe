import { createReport } from '@/services/report.service'
import { ReportType } from '@/types/report'
import { Button, Group, Modal, Select, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { closeAllModals, openConfirmModal, openModal } from '@mantine/modals'
import { useState } from 'react'
import { toast } from 'sonner'

const ReportVideoModal = ({ videoId }: { videoId: string }) => {
    const form = useForm({
        initialValues: {
            type: '',
            content: ''
        },

        validate: {
            type: (value) => (value ? null : 'Please select a report type'),
            content: (value) => (value.trim().length > 5 ? null : 'Content must be at least 5 characters')
        }
    })

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            await createReport(videoId, form.values.content, form.values.type)
            toast.success('Report submitted successfully!')
            closeAllModals()
        } catch (error) {
            console.error('Error submitting report:', error)
            toast.error('Failed to submit report')
        } finally {
            setIsLoading(false)
        }
    }

    const handleConfirmSubmit = () => {
        openConfirmModal({
            title: 'Confirm Report Submission',
            children: 'Are you sure you want to submit this report? This action cannot be undone.',
            labels: { confirm: 'Confirm', cancel: 'Cancel' },
            confirmProps: { color: 'red', loading: isLoading },
            onConfirm: handleSubmit
        })
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                handleConfirmSubmit()
            }}
        >
            <Select
                withAsterisk
                label='Report Type'
                placeholder='Select a reason'
                data={Object.values(ReportType)}
                {...form.getInputProps('type')}
            />

            <Textarea
                withAsterisk
                label='Details'
                placeholder='Describe the issue...'
                mt='md'
                {...form.getInputProps('content')}
            />

            <Group justify='flex-end' mt='md'>
                <Button variant='outline' onClick={() => closeAllModals()} disabled={isLoading}>
                    Cancel
                </Button>
                <Button type='submit' color='red' loading={isLoading}>
                    Submit Report
                </Button>
            </Group>
        </form>
    )
}

// Hàm mở modal báo cáo
export const openReportModal = (videoId: string) => {
    openModal({
        title: 'Report Video Violation',
        children: <ReportVideoModal videoId={videoId} />
    })
}
