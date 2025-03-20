import { Button, Group, Paper, Progress, Skeleton, Stack, Text, useMantineTheme } from '@mantine/core'
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
import { Suspense } from 'react'
import Videos from '../library/_components/videos'
import { Link, useParams } from 'react-router'
import { useVideos } from '@/services/video.service'
import VideoCard from '../../_components/video-card'

export function HomePage() {
    const theme = useMantineTheme()
    const { orgId } = useParams<{ orgId: string }>()
    const { data } = useVideos(orgId!, { limit: 4, page: 1 })
    return (
        <Stack gap='xl'>
            <Stack>
                <Group justify='space-between' align='center'>
                    <Group>
                        <IconVideoFilled size={24} color={theme.colors[theme.primaryColor][5]} />
                        <Text size='lg' fw={500}>
                            Recent Videos
                        </Text>
                    </Group>
                    <Button
                        component={Link}
                        to={`/${orgId}/library`}
                        variant='subtle'
                        rightSection={<IconArrowRight size={18} />}
                    >
                        See all
                    </Button>
                </Group>
                <Group align='stretch'>
                    <div className='grid grid-cols-4 gap-4'>
                        <Suspense
                            fallback={Array.from({ length: 4 }).map((_, index) => (
                                <Skeleton key={index} height={180} />
                            ))}
                        >
                            {data?.data?.videos.map((video) => <VideoCard key={video._id} video={video} />)}
                            {data?.data.videos.length === 0 && 'No videos'}{' '}
                        </Suspense>
                    </div>
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
