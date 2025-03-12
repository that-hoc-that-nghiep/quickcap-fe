import { useUser } from '@/hooks/useUser'
import { useOrgInfo } from '@/services/auth.service'
import { ActionIcon, Avatar, Badge, Button, Card, Group, Stack, Text } from '@mantine/core'
import { IconPencil, IconPlus } from '@tabler/icons-react'

const OrgMemberSettings = () => {
    const { currentOrg } = useUser()
    const { data } = useOrgInfo(currentOrg?.id)
    return (
        <Card withBorder p='xl' radius='md' shadow='xs' className='flex flex-col h-full'>
            <Group justify='space-between' mb='lg'>
                <Text size='xl' fw={700}>
                    Members
                </Text>
                {currentOrg?.is_owner ? (
                    <Button color='green' leftSection={<IconPlus size={16} />} size='sm'>
                        Add member
                    </Button>
                ) : null}
            </Group>

            {data?.users.map((user) => (
                <Group key={user.id} justify='space-between' align='center' mb='lg'>
                    <Group>
                        <Avatar src={user.picture} radius='xl' size='md' color='blue'>
                            {user.name[0]}
                        </Avatar>
                        <Stack gap={2}>
                            <Group justify=''>
                                <Text size='sm' fw={500}>
                                    {user.name}
                                </Text>

                                <Badge color={user.is_owner ? 'red' : 'blue'}>
                                    {user.is_owner ? 'Owner' : 'Member'}
                                </Badge>
                            </Group>
                            <Text size='xs' c='dimmed'>
                                {user.email}
                            </Text>
                        </Stack>
                    </Group>
                    <ActionIcon variant='subtle'>
                        <IconPencil size={16} />
                    </ActionIcon>
                </Group>
            ))}
        </Card>
    )
}

export default OrgMemberSettings
