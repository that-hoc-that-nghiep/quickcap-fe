import { mockNotifications } from '@/utils/constant'
import { Avatar, Group, Paper, Stack, Text } from '@mantine/core'

export const InvitesPage = () => {
    return (
        <Stack>
            {mockNotifications.map((notification, index) => (
                <Paper key={index} p={'md'} shadow='sm'>
                    <Group>
                        <Avatar></Avatar>
                        <Text>{notification}</Text>
                    </Group>
                </Paper>
            ))}
        </Stack>
    )
}
