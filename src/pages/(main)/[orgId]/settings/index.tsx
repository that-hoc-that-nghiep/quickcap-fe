import { useState } from 'react'
import { Tabs, Paper } from '@mantine/core'
import { IconUser, IconPalette, IconBell, IconUsers } from '@tabler/icons-react'
import { AccountSettings } from './AccountSettings'
import { DisplaySettings } from './DisplaySettings'
import { NotificationSettings } from './NotificationSettings'
import { OrganizationSettings } from './OrganizationSettings'

export const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState<string | null>('account')
    const [profileImage, setProfileImage] = useState<File | null>(null)
    const [themeColor, setThemeColor] = useState('#1c7ed6')

    return (
        <Paper shadow='xs' p='md' withBorder>
            <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.List mb='md'>
                    <Tabs.Tab value='account' leftSection={<IconUser size={16} />}>
                        Account Settings
                    </Tabs.Tab>
                    <Tabs.Tab value='organization' leftSection={<IconUsers size={16} />}>
                        Organization Settings
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

                <Tabs.Panel value='organization'>
                    <OrganizationSettings />
                </Tabs.Panel>

                <Tabs.Panel value='display'>
                    <DisplaySettings themeColor={themeColor} setThemeColor={setThemeColor} />
                </Tabs.Panel>

                <Tabs.Panel value='notifications'>
                    <NotificationSettings />
                </Tabs.Panel>
            </Tabs>
        </Paper>
    )
}
