import { menuItems } from '@/utils/constant'
import { Stack, Text, Title } from '@mantine/core'
import { Outlet, useLocation } from 'react-router'

export const OrgLayout = () => {
    const { pathname } = useLocation()
    return (
        <>
            <Stack gap={4} mb={16}>
                <Text tt={'uppercase'} c='dimmed' size='sm'>
                    personal
                </Text>
                <Title order={2} tt={'capitalize'}>
                    {menuItems.find((item) => pathname.includes(item.path))?.label}
                </Title>
            </Stack>
            <Outlet />
        </>
    )
}
