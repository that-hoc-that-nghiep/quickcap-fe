import { AppShell, Avatar, Button, Group, NavLink, Select, Title, useMantineTheme } from '@mantine/core'
import { Link, Outlet, useLocation } from 'react-router'
import { IconSearch, IconUpload, IconVideoFilled } from '@tabler/icons-react'
import { actions, menuItems } from '@/utils/constant'
import { Spotlight, spotlight } from '@mantine/spotlight'

const DUMB_ORG_ID = 'org1'

export const MainLayout = () => {
    const theme = useMantineTheme()
    const { pathname } = useLocation()

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
                        <Avatar></Avatar>
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
                        data={['Org1', 'Org2', 'Org3']}
                        defaultValue={'Org1'}
                        comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
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
                            to={`/${DUMB_ORG_ID}${item.path}`}
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
