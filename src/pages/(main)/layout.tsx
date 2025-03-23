import { AppShell, Avatar, Button, Group, Menu, NavLink, Title, useMantineTheme } from '@mantine/core'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router'
import { IconLogout2, IconPlus, IconSearch, IconUpload, IconVideo } from '@tabler/icons-react'
import { menuItems } from '@/utils/constant'
import { Spotlight, spotlight, SpotlightActionData } from '@mantine/spotlight'
import { useUser } from '@/hooks/useUser'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import OrgSwitcher from './_components/org-switcher'
import { getVideosByOrgId } from '@/services/video.service'
import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query'

export const MainLayout = () => {
    const theme = useMantineTheme()
    const { pathname } = useLocation()
    const { user, orgs, isLoading, currentOrg } = useUser()
    const { removeAccessToken } = useAuth()
    const navigate = useNavigate()
    const { orgId } = useParams<{ orgId: string }>()
    const [actions, setActions] = useState<SpotlightActionData[]>([])

    const { data } = useQuery({
        queryKey: ['videos', orgId, { limit: 100, page: 1 }],
        queryFn: () => (orgId ? getVideosByOrgId({ orgId, limit: 100, page: 1 }) : null),
        enabled: !!orgId
    })

    useEffect(() => {
        if (data?.data?.videos) {
            const videoActions = data.data.videos.map((video) => ({
                id: video._id,
                label: video.title,
                description: `${video.user.name} - ${dayjs(video.createdAt).format('DD/MM/YYYY - HH:mm')}`,
                onClick: () => navigate(`${orgId}/video/${video._id}`),
                leftSection: <IconVideo size={24} stroke={1.5} />
            }))
            setActions(videoActions)
        }
    }, [data, navigate])
    useEffect(() => {
        if (!orgId && !isLoading && !pathname.includes('/video')) {
            const firstOrg = orgs?.[0]
            navigate(`/${firstOrg?.id}/home`)
        }
    }, [orgId, isLoading, orgs, navigate, pathname])

    const handleLogout = () => {
        removeAccessToken()
        navigate('/auth/login')
    }

    return (
        <AppShell header={{ height: 60 }} navbar={{ width: 280, breakpoint: 'sm' }} layout='alt' padding='md'>
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
                        {currentOrg?.type === 'Personal' ? (
                            <Button leftSection={<IconUpload size={18} />} component={Link} to={`/${orgId}/upload`}>
                                Upload
                            </Button>
                        ) : (
                            <>
                                {(currentOrg?.is_permission === 'ALL' || currentOrg?.is_permission === 'UPLOAD') && (
                                    <Button leftSection={<IconPlus size={18} />} component={Link} to={`/${orgId}/add`}>
                                        Add video
                                    </Button>
                                )}
                            </>
                        )}
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
                <OrgSwitcher />
                <AppShell.Section my={16}>
                    <Title order={4} mb={8}>
                        Menu
                    </Title>
                    {menuItems
                        .filter((item) => item.show)
                        .map((item) => (
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
            <AppShell.Main className='flex flex-col w-full'>
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
