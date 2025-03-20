import { Button, Group, Paper, Skeleton, Stack, Text, useMantineTheme } from '@mantine/core'
import { IconArrowRight, IconEye, IconThumbUp, IconTimeline, IconVideo, IconVideoFilled } from '@tabler/icons-react'
import { Suspense } from 'react'
import { Link, useParams } from 'react-router'
import { useAnalyticsVideosByOrgId, useVideos } from '@/services/video.service'
import VideoCard from '../../_components/video-card'

export function HomePage() {
    const theme = useMantineTheme()
    const { orgId } = useParams<{ orgId: string }>()
    const { data } = useVideos(orgId!, { limit: 4, page: 1 })
    const { data: analytiscVideos } = useAnalyticsVideosByOrgId(orgId!)
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
                            {data?.data?.videos
                                .filter((c) => !c.isDeleted)
                                .map((video) => <VideoCard key={video._id} video={video} />)}
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
                <Suspense
                    fallback={Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton key={index} height={100} radius='md' />
                    ))}
                >
                    <Group align='stretch'>
                        {/* Total Videos */}
                        <Paper p={16} shadow='md' className='flex flex-col gap-4 grow'>
                            <Text fw={500} c={'dimmed'}>
                                Total videos
                            </Text>
                            <Group>
                                <IconVideo size={24} color={theme.colors[theme.primaryColor][5]} />
                                <Text fw={700} className='text-3xl'>
                                    {analytiscVideos.data?.totalVideo ?? 0}
                                </Text>
                            </Group>
                        </Paper>

                        {/* Total Views */}
                        <Paper p={16} shadow='md' className='flex flex-col gap-4 grow'>
                            <Text fw={500} c={'dimmed'}>
                                Total views
                            </Text>
                            <Group>
                                <IconEye size={24} color={theme.colors[theme.primaryColor][5]} />
                                <Text fw={700} className='text-3xl'>
                                    {analytiscVideos.data?.totalView ?? 0}
                                </Text>
                            </Group>
                        </Paper>

                        {/* Total Likes */}
                        <Paper p={16} shadow='md' className='flex flex-col gap-4 grow'>
                            <Text fw={500} c={'dimmed'}>
                                Total likes
                            </Text>
                            <Group>
                                <IconThumbUp size={24} color={theme.colors[theme.primaryColor][5]} />
                                <Text fw={700} className='text-3xl'>
                                    {analytiscVideos.data?.totalLike ?? 0}
                                </Text>
                            </Group>
                        </Paper>
                    </Group>
                </Suspense>
            </Stack>
        </Stack>
    )
}
