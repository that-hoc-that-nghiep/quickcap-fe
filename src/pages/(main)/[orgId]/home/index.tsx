import { Button, Group, Paper, Progress, Stack, Text, useMantineTheme } from '@mantine/core'
import {
    IconArrowRight,
    IconDatabase,
    IconEye,
    IconHandFinger,
    IconPlus,
    IconTimeline,
    IconUpload,
    IconVideo,
    IconVideoFilled
} from '@tabler/icons-react'

export function HomePage() {
    const theme = useMantineTheme()
    return (
        <Stack gap='xl'>
            <Stack>
                <Group justify='space-between' align='center'>
                    <Group>
                        <IconHandFinger size={24} color={theme.colors[theme.primaryColor][5]} />
                        <Text size='lg' fw={500}>
                            Quick Actions
                        </Text>
                    </Group>
                </Group>
                <Group>
                    <Button className='grow h-32 text-xl'>
                        <span className='flex flex-col items-center justify-center gap-2'>
                            <IconVideoFilled size={40} color={theme.colors[theme.primaryColor][0]} />
                            Record Screen
                        </span>
                    </Button>
                    <Button variant='default' className='grow h-32 text-xl'>
                        <span className='flex flex-col items-center justify-center gap-2'>
                            <IconUpload size={40} color={theme.colors[theme.primaryColor][5]} />
                            Upload Video
                        </span>
                    </Button>
                    <Button variant='default' className='grow h-32 text-xl'>
                        <span className='flex flex-col items-center justify-center gap-2'>
                            <IconPlus size={40} color={theme.colors[theme.primaryColor][5]} />
                            Create Category
                        </span>
                    </Button>
                </Group>
            </Stack>
            <Stack>
                <Group justify='space-between' align='center'>
                    <Group>
                        <IconVideoFilled size={24} color={theme.colors[theme.primaryColor][5]} />
                        <Text size='lg' fw={500}>
                            Recent Videos
                        </Text>
                    </Group>
                </Group>
                <Group align='stretch'>
                    {/* {mockVideos.slice(0, 4).map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))} */}
                </Group>
            </Stack>
            <Stack>
                <Group justify='space-between' align='center'>
                    <Group>
                        <IconTimeline size={24} color={theme.colors[theme.primaryColor][5]} />
                        <Text size='lg' fw={500}>
                            Dashboard
                        </Text>
                    </Group>
                </Group>
                <Group align='stretch'>
                    <Paper p={16} shadow='md' className='flex flex-col gap-4 grow'>
                        <Text fw={500} c={'dimmed'}>
                            Total videos
                        </Text>
                        <Group>
                            <IconVideo size={24} color={theme.colors[theme.primaryColor][5]} />
                            <Text fw={700} className='text-3xl'>
                                10
                            </Text>
                        </Group>
                    </Paper>
                    <Paper p={16} shadow='md' className='flex flex-col gap-4 grow'>
                        <Text fw={500} c={'dimmed'}>
                            Total views
                        </Text>
                        <Group>
                            <IconEye size={24} color={theme.colors[theme.primaryColor][5]} />
                            <Text fw={700} className='text-3xl'>
                                100
                            </Text>
                        </Group>
                    </Paper>
                    <Paper p={16} shadow='md' className='flex flex-col gap-4 grow'>
                        <Text fw={500} c={'dimmed'}>
                            Total views
                        </Text>
                        <Group>
                            <IconDatabase size={24} color={theme.colors[theme.primaryColor][5]} />
                            <Text fw={700} className='text-3xl'>
                                1.2 GB
                            </Text>
                        </Group>
                        <Stack gap='xs'>
                            <Progress value={30} />
                            <Text size='xs' c={'dimmed'}>
                                30% of 5 GB
                            </Text>
                        </Stack>
                    </Paper>
                </Group>
            </Stack>
        </Stack>
    )
}
