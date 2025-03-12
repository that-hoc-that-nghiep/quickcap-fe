import {
    Grid,
    TextInput,
    PasswordInput,
    Switch,
    Select,
    Divider,
    Text,
    Avatar,
    Group,
    FileButton,
    Box,
    rem,
    Button,
    Space
} from '@mantine/core'
import { IconUpload, IconCheck } from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'

interface AccountSettingsProps {
    profileImage: File | null
    setProfileImage: (file: File | null) => void
}

export const AccountSettings = ({ profileImage, setProfileImage }: AccountSettingsProps) => {
    const handleSave = () => {
        notifications.show({
            title: 'Account settings saved',
            message: 'Your account settings have been successfully updated',
            color: 'green',
            icon: <IconCheck size={16} />
        })
    }

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

            <Space h='xl' />
            <Group justify='flex-end'>
                <Button variant='default'>Cancel</Button>
                <Button onClick={handleSave}>Save Account Settings</Button>
            </Group>
        </>
    )
}