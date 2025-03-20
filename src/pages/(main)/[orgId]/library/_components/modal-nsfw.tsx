import { nsfwMessages } from '@/types'
import { Text } from '@mantine/core'
import { openModal } from '@mantine/modals'

const AlertNsfwModal = (videoNsfwType: string) => {
    return (
        <div>
            <Text size='md' c='red'>
                {nsfwMessages[videoNsfwType]}
            </Text>
            <Text size='sm' c='dimmed' mt={8}>
                This content has been flagged as not safe for work (NSFW). Proceed with caution.
            </Text>
        </div>
    )
}

export const openAlertNsfwModal = (videoNsfwType: string) => {
    openModal({
        title: 'NSFW Alert',
        children: AlertNsfwModal(videoNsfwType)
    })
}
