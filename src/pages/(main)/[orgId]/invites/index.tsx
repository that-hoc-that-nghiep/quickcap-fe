import { useUser } from '@/hooks/useUser'
import { useInvites } from '@/services/invite.service'
import { Avatar, Group, Paper, Stack, Text } from '@mantine/core'
import { useParams } from 'react-router'

export const InvitesPage = () => {
    const { orgId } = useParams<{ orgId: string }>()
    const { user } = useUser()
    const { data } = useInvites(orgId as string, user?.id as string)
    return (
        <Stack>
            {data.data.length > 0 ? (
                data.data
                    .filter((i) => !i.accepted)
                    .map((invite, index) => (
                        <Paper key={index} p={'md'} shadow='sm'>
                            <Group>
                                <Avatar></Avatar>
                                <Text>{invite.content}</Text>
                            </Group>
                        </Paper>
                    ))
            ) : (
                <div>No invites</div>
            )}
        </Stack>
    )
}
