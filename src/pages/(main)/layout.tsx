import { AppShell, Avatar, Button, Group, Menu, NavLink, Select, Title, useMantineTheme } from '@mantine/core'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router'
import { IconLogout2, IconSearch, IconUpload, IconVideoFilled } from '@tabler/icons-react'
import { actions, menuItems } from '@/utils/constant'
import { Spotlight, spotlight } from '@mantine/spotlight'
import { useUser } from '@/hooks/useUser'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'

export const MainLayout = () => {
    const theme = useMantineTheme()
    const { pathname } = useLocation()
    const { user, orgs, isLoading } = useUser()
    const { removeAccessToken } = useAuth()
    const navigate = useNavigate()
    const { orgId } = useParams<{ orgId: string }>()

    useEffect(() => {
        if (!orgId && !isLoading) {
            const firstOrg = orgs?.[0]
            navigate(`/${firstOrg?.id}/home`)
        }
    }, [orgId, isLoading, orgs, navigate])

    const handleLogout = () => {
        removeAccessToken()
        window.location.reload()
    }

    const handleOrgChange = (newOrgId: string | null) => {
        if (newOrgId) {
            // Navigate to the same page but with new org ID
            const currentPath = pathname.split('/').slice(2).join('/')
            navigate(`/${newOrgId}/${currentPath || 'home'}`)
        }
    }

    return (
        <AppShell header={{ height: 60 }} navbar={{ width: 280, breakpoint: ' sm' }} layout='alt' padding='md'>
            <AppShell.Header withBorder={false} p='md'>
                <Group justify='space-between'>
                    <Button
                        leftSection={<IconSearch size={18} color={theme.colors[theme.primaryColor][4]} />}
                        justify='start'
                        variant='default'
                        w={300}
                        c={theme.colors[theme.primaryColor][5]}
                        fw={400}
                        onClick={spotlight.open}
                    >
                        Search
                    </Button>

                    <Group>
                        <Button leftSection={<IconUpload size={18} />}>Upload</Button>
                        <Button leftSection={<IconVideoFilled size={18} />}>Record</Button>
                        <Menu shadow='md' width={200}>
                            <Menu.Target>
                                <Avatar src={user?.picture} className='cursor-pointer'></Avatar>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Label>{user?.email}</Menu.Label>
                                <Menu.Item leftSection={<IconLogout2 size={14} />} onClick={handleLogout}>
                                    Logout
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar
                p='md'
                style={{
                    backgroundColor: theme.colors.gray[0]
                }}
            >
                <AppShell.Section my={16}>
                    <Group justify='center'>
                        <Title order={2}>QuickCap</Title>
                    </Group>
                </AppShell.Section>
                <AppShell.Section>
                    <Select
                        data={orgs?.map((org) => ({ label: org.name, value: org.id })) || []}
                        value={orgId}
                        onChange={handleOrgChange}
                        comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                        allowDeselect={false}
                    />
                </AppShell.Section>
                <AppShell.Section my={16}>
                    <Title order={4} mb={8}>
                        Menu
                    </Title>
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            component={Link}
                            to={`/${orgId}${item.path}`}
                            leftSection={<item.icon size={20} />}
                            label={item.label}
                            active={pathname.includes(item.path)}
                            className='rounded-lg capitalize'
                        />
                    ))}
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
            <Spotlight
                actions={actions}
                nothingFound='Nothing found...'
                highlightQuery
                searchProps={{
                    leftSection: <IconSearch size={20} stroke={1.5} />,
                    placeholder: 'Search...'
                }}
            />
        </AppShell>
    )
}
