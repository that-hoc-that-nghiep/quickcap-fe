import {
    Grid,
    Card,
    TextInput,
    Divider,
    Text,
    Switch,
    Checkbox,
    Stack,
    Group,
    Select,
    Button,
    Space
} from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'

export const NotificationSettings = () => {
    const handleSave = () => {
        notifications.show({
            title: 'Notification settings saved',
            message: 'Your notification preferences have been successfully updated',
            color: 'green',
            icon: <IconCheck size={16} />
        })
    }

    return (
        <>
            <Text size='lg' fw={600} mb='md'>
                Email Notifications
            </Text>
            <Stack gap='xs'>
                <Checkbox label='Receive weekly newsletter' defaultChecked />
                <Checkbox label='Receive system updates' defaultChecked />
                <Checkbox label='Receive security alerts' defaultChecked />
                <Checkbox label='Receive marketing emails' />
            </Stack>

            <Divider my='lg' />

            <Text size='lg' fw={600} mb='md'>
                In-App Notifications
            </Text>
            <Stack gap='xs'>
                <Checkbox label='New messages' defaultChecked />
                <Checkbox label='Task assignments' defaultChecked />
                <Checkbox label='Mentions' defaultChecked />
                <Checkbox label='Project updates' defaultChecked />
            </Stack>

            <Divider my='lg' />

            <Text size='lg' fw={600} mb='md'>
                Notification Channels
            </Text>
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Card withBorder p='md'>
                        <Group justify='apart' mb='xs'>
                            <Text size='sm' fw={500}>
                                Email Frequency
                            </Text>
                        </Group>
                        <Select
                            data={[
                                { value: 'immediate', label: 'Immediate' },
                                { value: 'hourly', label: 'Hourly Digest' },
                                { value: 'daily', label: 'Daily Digest' },
                                { value: 'weekly', label: 'Weekly Digest' }
                            ]}
                            defaultValue='daily'
                        />
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Card withBorder p='md'>
                        <Group justify='apart' mb='xs'>
                            <Text size='sm' fw={500}>
                                Mobile Push Notifications
                            </Text>
                            <Switch defaultChecked />
                        </Group>
                        <Text size='xs' c='dimmed'>
                            Receive notifications on your mobile device
                        </Text>
                    </Card>
                </Grid.Col>
            </Grid>

            <Divider my='lg' />

            <Text size='lg' fw={600} mb='md'>
                Quiet Hours
            </Text>
            <Grid>
                <Grid.Col span={12}>
                    <Switch label='Enable quiet hours' />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput label='Start Time' placeholder='10:00 PM' disabled />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput label='End Time' placeholder='7:00 AM' disabled />
                </Grid.Col>
            </Grid>

            <Space h='xl' />
            <Group justify='flex-end'>
                <Button variant='default'>Cancel</Button>
                <Button onClick={handleSave}>Save Notification Settings</Button>
            </Group>
        </>
    )
}