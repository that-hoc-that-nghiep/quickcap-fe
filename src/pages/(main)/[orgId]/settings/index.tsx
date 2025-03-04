import { useState } from 'react'
import {
    Tabs,
    Container,
    Paper,
    Space,
    Button,
    Grid,
    TextInput,
    PasswordInput,
    Switch,
    Select,
    Slider,
    MultiSelect,
    ColorPicker,
    Divider,
    Text,
    Avatar,
    Group,
    FileButton,
    Box,
    rem,
    Checkbox,
    Stack,
    Card
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconUser, IconPalette, IconBell, IconUpload, IconCheck } from '@tabler/icons-react'

export const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState<string | null>('account')
    const [profileImage, setProfileImage] = useState<File | null>(null)
    const [themeColor, setThemeColor] = useState('#1c7ed6')

    const handleSave = () => {
        notifications.show({
            title: 'Settings saved',
            message: 'Your changes have been successfully saved',
            color: 'green',
            icon: <IconCheck size={16} />
        })
    }

    return (
        <Container>
            <Paper shadow='xs' p='md' withBorder>
                <Tabs value={activeTab} onChange={setActiveTab}>
                    <Tabs.List mb='md'>
                        <Tabs.Tab value='account' leftSection={<IconUser size={16} />}>
                            Account Settings
                        </Tabs.Tab>
                        <Tabs.Tab value='display' leftSection={<IconPalette size={16} />}>
                            Display Settings
                        </Tabs.Tab>
                        <Tabs.Tab value='notifications' leftSection={<IconBell size={16} />}>
                            Notification Settings
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value='account'>
                        <AccountSettings profileImage={profileImage} setProfileImage={setProfileImage} />
                    </Tabs.Panel>

                    <Tabs.Panel value='display'>
                        <DisplaySettings themeColor={themeColor} setThemeColor={setThemeColor} />
                    </Tabs.Panel>

                    <Tabs.Panel value='notifications'>
                        <NotificationSettings />
                    </Tabs.Panel>
                </Tabs>

                <Space h='xl' />
                <Group justify='flex-end'>
                    <Button variant='default'>Cancel</Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                </Group>
            </Paper>
        </Container>
    )
}

const AccountSettings = ({
    profileImage,
    setProfileImage
}: {
    profileImage: File | null
    setProfileImage: (file: File | null) => void
}) => {
    return (
        <>
            <Text size='lg' fw={600} mb='md'>
                Profile Information
            </Text>
            <Grid>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Group justify='center'>
                        <Box>
                            <Avatar
                                size={120}
                                radius='xl'
                                src={profileImage ? URL.createObjectURL(profileImage) : null}
                            />
                            <Group justify='center' mt='sm'>
                                <FileButton onChange={setProfileImage} accept='image/png,image/jpeg'>
                                    {(props) => (
                                        <Button
                                            leftSection={<IconUpload size={rem(16)} />}
                                            variant='outline'
                                            size='xs'
                                            {...props}
                                        >
                                            Upload photo
                                        </Button>
                                    )}
                                </FileButton>
                            </Group>
                        </Box>
                    </Group>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 8 }}>
                    <Grid>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <TextInput label='First Name' placeholder='John' />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <TextInput label='Last Name' placeholder='Doe' />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <TextInput label='Email' type='email' placeholder='johndoe@example.com' />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <TextInput label='Job Title' placeholder='Software Engineer' />
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
            </Grid>

            <Divider my='lg' />

            <Text size='lg' fw={600} mb='md'>
                Security
            </Text>
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <PasswordInput label='Current Password' placeholder='Enter current password' />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <PasswordInput label='New Password' placeholder='Enter new password' />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Group>
                        <Switch label='Enable two-factor authentication' />
                    </Group>
                </Grid.Col>
            </Grid>

            <Divider my='lg' />

            <Text size='lg' fw={600} mb='md'>
                Preferences
            </Text>
            <Grid>
                <Grid.Col span={12}>
                    <Select
                        label='Language'
                        placeholder='Select language'
                        data={[
                            { value: 'en', label: 'English' },
                            { value: 'es', label: 'Spanish' },
                            { value: 'fr', label: 'French' },
                            { value: 'de', label: 'German' }
                        ]}
                        defaultValue='en'
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Select
                        label='Time Zone'
                        placeholder='Select time zone'
                        data={[
                            { value: 'utc-8', label: 'Pacific Time (UTC-8)' },
                            { value: 'utc-5', label: 'Eastern Time (UTC-5)' },
                            { value: 'utc+0', label: 'UTC' },
                            { value: 'utc+1', label: 'Central European Time (UTC+1)' }
                        ]}
                        defaultValue='utc-8'
                    />
                </Grid.Col>
            </Grid>
        </>
    )
}

const DisplaySettings = ({
    themeColor,
    setThemeColor
}: {
    themeColor: string
    setThemeColor: (color: string) => void
}) => {
    return (
        <>
            <Text size='lg' fw={600} mb='md'>
                Theme
            </Text>
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Select
                        label='Theme Mode'
                        placeholder='Select mode'
                        data={[
                            { value: 'light', label: 'Light' },
                            { value: 'dark', label: 'Dark' },
                            { value: 'system', label: 'System Default' }
                        ]}
                        defaultValue='system'
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Text size='sm' fw={500} mb={4}>
                        Accent Color
                    </Text>
                    <ColorPicker
                        format='hex'
                        value={themeColor}
                        onChange={setThemeColor}
                        swatches={['#1c7ed6', '#37B24D', '#F59F00', '#E03131', '#7048E8', '#1098AD']}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Text size='sm' fw={500} mb={4}>
                        Density
                    </Text>
                    <Slider
                        label={(value) => ['Compact', 'Normal', 'Spacious'][Math.floor(value / 50)]}
                        step={50}
                        marks={[
                            { value: 0, label: 'Compact' },
                            { value: 50, label: 'Normal' },
                            { value: 100, label: 'Spacious' }
                        ]}
                        defaultValue={50}
                    />
                </Grid.Col>
            </Grid>

            <Divider my='lg' />

            <Text size='lg' fw={600} mb='md'>
                Dashboard Layout
            </Text>
            <Grid>
                <Grid.Col span={12}>
                    <Select
                        label='Default View'
                        placeholder='Select view'
                        data={[
                            { value: 'grid', label: 'Grid View' },
                            { value: 'list', label: 'List View' },
                            { value: 'board', label: 'Board View' }
                        ]}
                        defaultValue='grid'
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <MultiSelect
                        label='Widgets to Display'
                        placeholder='Select widgets'
                        data={[
                            { value: 'recent', label: 'Recent Activity' },
                            { value: 'stats', label: 'Statistics' },
                            { value: 'calendar', label: 'Calendar' },
                            { value: 'tasks', label: 'Tasks' },
                            { value: 'notes', label: 'Notes' }
                        ]}
                        defaultValue={['recent', 'stats', 'calendar']}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Checkbox label='Show welcome message on login' defaultChecked />
                </Grid.Col>
            </Grid>

            <Divider my='lg' />

            <Text size='lg' fw={600} mb='md'>
                Accessibility
            </Text>
            <Grid>
                <Grid.Col span={12}>
                    <Switch label='High contrast mode' />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Switch label='Reduce animations' />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Select
                        label='Font Size'
                        placeholder='Select size'
                        data={[
                            { value: 'sm', label: 'Small' },
                            { value: 'md', label: 'Medium' },
                            { value: 'lg', label: 'Large' },
                            { value: 'xl', label: 'Extra Large' }
                        ]}
                        defaultValue='md'
                    />
                </Grid.Col>
            </Grid>
        </>
    )
}

const NotificationSettings = () => {
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
        </>
    )
}
