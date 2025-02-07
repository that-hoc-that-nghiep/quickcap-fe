import { Button, Stack, Text, Title, useMantineTheme } from '@mantine/core'
import { IconHome, IconVideoOff } from '@tabler/icons-react'
import { Link } from 'react-router'

export const ErrorPage = () => {
    const theme = useMantineTheme()
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <Stack align='center' maw={640} gap={24}>
                <IconVideoOff size={160} color={theme.colors[theme.primaryColor][5]} />
                <Stack align='center' gap={4}>
                    <Title ta={'center'} order={1} fw={800}>
                        Oops! Video Not Found
                    </Title>
                    <Text ta={'center'} size='xl' fw={500}>
                        This clip seems to have gone off-script!
                    </Text>
                </Stack>
                <Text ta={'center'} size='xl' fw={500}>
                    Our video directors are frantically searching the cutting room floor. Maybe it's hiding in the
                    bloopers reel?
                </Text>
                <Button component={Link} to='/' leftSection={<IconHome size={20} stroke={2} />} size='lg'>
                    Back to home
                </Button>
            </Stack>
        </div>
    )
}
