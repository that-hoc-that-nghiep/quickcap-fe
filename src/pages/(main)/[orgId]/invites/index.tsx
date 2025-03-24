import { useUser } from '@/hooks/useUser'
import { acceptInvite, useInvites } from '@/services/invite.service'
import { Button, Group, Paper, Stack, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router'
function getFirstSentence(text: string) {
    const sentences = text
        .split('.')
        .map((s: string) => s.trim())
        .filter((s: string) => s)
    return sentences.length > 0 ? sentences[0] : ''
}
export const InvitesPage = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    const { data } = useInvites(user?.id as string)
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()
    const handleAccept = async (inviteId: string, orgId: string) => {
        try {
            setLoading(true)
            await acceptInvite(inviteId)
            queryClient.invalidateQueries({
                queryKey: ['invites', user?.id]
            })
            notifications.show({
                title: 'Success',
                message: 'Invite accepted successfully!',
                color: 'green'
            })
            navigate(`/${orgId}/home`)
        } catch (error) {
            notifications.show({
                title: 'Error',
                message: 'Failed to accept invite',
                color: 'red'
            })
        } finally {
            setLoading(false)
        }
    }
    return (
        <Stack>
            {data.data.length > 0 ? (
                data.data.map((invite, index) => (
                    <Paper key={index} p={'md'} shadow='sm'>
                        <Group>
                            <Text>{getFirstSentence(invite.content)}</Text>
                            {!invite.accepted ? (
                                <Button
                                    leftSection={<IconCheck size={18} />}
                                    loading={loading}
                                    color='green'
                                    variant='filled'
                                    onClick={() => handleAccept(invite._id, invite.orgId)}
                                >
                                    Accept invite
                                </Button>
                            ) : (
                                <Text c='gray'>Accepted</Text>
                            )}
                        </Group>
                    </Paper>
                ))
            ) : (
                <div>No invites</div>
            )}
        </Stack>
    )
}
