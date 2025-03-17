import { ActionIcon, Avatar, Button, Grid, Group, Paper, Tabs, Text, Title, useMantineTheme } from '@mantine/core'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { updateVideo, useVideo } from '@/services/video.service'
import dayjs from 'dayjs'
import { CLOUD_FRONT_URL } from '@/utils/constant'
import AIChatbox from './_components/ai-chatbox'
import { Comments } from './_components/comments'
import { IconEdit, IconEye, IconFlag, IconThumbUp } from '@tabler/icons-react'
import { openReportModal } from '../../library/_components/modal-report'
import { openEditVideoModal } from '../../library/_components/modal-edit-video'
import { useMutationData, useMutationDataState } from '@/hooks/useMutationData'
import { useDebouncedCallback } from '@mantine/hooks'

export const VideoPage = () => {
    const { videoId } = useParams<{ videoId: string }>()
    const { data } = useVideo(videoId!)
    const theme = useMantineTheme()
    const video = useMemo(() => data.data, [data])
    // Mutation để cập nhật views
    const { mutate: mutateViews } = useMutationData(
        ['views', videoId],
        (data: { videoId: string; views: number }) => updateVideo(data.videoId!, { views: data.views }),
        'video'
    )

    const { latestVariables } = useMutationDataState(['views', videoId])

    const viewCount = latestVariables?.variables?.views ?? video?.views ?? 0

    useEffect(() => {
        if (video) {
            mutateViews({ videoId: video._id, views: video.views + 1 })
        }
    }, [videoId])

    const { mutate: mutateLike } = useMutationData(
        ['like'],
        (data: { videoId: string; like: number }) => updateVideo(data.videoId!, { like: data.like }),
        'video'
    )

    const [localLike, setLocalLike] = useState(video?.like ?? 0)

    useEffect(() => {
        setLocalLike(video?.like ?? 0)
    }, [video?.like])

    const debouncedMutate = useDebouncedCallback((newLike) => {
        mutateLike({ videoId: video._id, like: newLike })
    }, 1000)

    const handleLike = () => {
        const newLike = localLike + 1
        setLocalLike(newLike)
        debouncedMutate(newLike)
    }

    return (
        <>
            <Group justify='space-between' className='w-[66%]'>
                <Title order={2}>{video?.title}</Title>
                <Button
                    size='xs'
                    leftSection={<IconEdit size={16} />}
                    color={theme.colors[theme.primaryColor][5]}
                    variant='filled'
                    onClick={() =>
                        openEditVideoModal({
                            id: video._id,
                            title: video.title,
                            description: video.description || '',
                            transcript: video.transcript
                        })
                    }
                >
                    Edit video
                </Button>
            </Group>
            <Grid mt={24}>
                <Grid.Col span={8}>
                    <video
                        width='100%'
                        controls
                        poster={`https://placehold.co/1920x1080?text=${video.title}`}
                        className='rounded-lg mb-6 aspect-video'
                    >
                        <source src={CLOUD_FRONT_URL + '/' + video.source} type='video/mp4' />
                        Your browser does not support the video tag.
                    </video>

                    <Group justify='space-between' gap={10} mb={15}>
                        <Group>
                            <Avatar size='md' src={video.user.picture} />
                            <Grid>
                                <Grid.Col className='py-0' span={12}>
                                    <Text size='md' fw={500}>
                                        {video.user.name}
                                    </Text>
                                </Grid.Col>
                                <Grid.Col className='py-0' span={12}>
                                    <Text c='dimmed' size='sm'>
                                        {dayjs(video?.createdAt).format('DD/MM/YYYY - HH:mm')}
                                    </Text>
                                </Grid.Col>
                            </Grid>
                        </Group>

                        <Button
                            size='xs'
                            leftSection={<IconFlag size={16} />}
                            color='red'
                            variant='outline'
                            onClick={() => openReportModal(videoId!)}
                        >
                            Report Violations
                        </Button>
                    </Group>

                    <Group gap={10} mb={15} align='center' justify='flex-start'>
                        <Group gap={1}>
                            <ActionIcon variant='transparent' color='red' size='md'>
                                <IconEye size={20} />
                            </ActionIcon>
                            <Text size='sm' c='dimmed'>
                                {viewCount}
                            </Text>
                        </Group>

                        <Group gap={1}>
                            <ActionIcon onClick={handleLike} variant='transparent' color='red' size='md'>
                                <IconThumbUp size={20} />
                            </ActionIcon>
                            <Text size='sm' c='dimmed'>
                                {localLike}
                            </Text>
                        </Group>
                    </Group>

                    <Title order={4} mb={12}>
                        Description
                    </Title>
                    <Text>{video?.description}</Text>
                </Grid.Col>

                <Grid.Col span={4}>
                    <Tabs defaultValue='ai-tools' variant='pills'>
                        <Tabs.List grow>
                            <Tabs.Tab value='ai-tools'>AI Tools</Tabs.Tab>
                            <Tabs.Tab value='transcript'>Transcript</Tabs.Tab>
                            <Tabs.Tab value='comments'>Comments</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value='ai-tools' mt='md'>
                            <AIChatbox videoId={videoId || ''} />
                        </Tabs.Panel>

                        <Tabs.Panel value='transcript' mt='md'>
                            <Paper withBorder p={16}>
                                {video?.transcript}
                            </Paper>
                        </Tabs.Panel>

                        <Tabs.Panel value='comments' mt='md'>
                            <Comments />
                        </Tabs.Panel>
                    </Tabs>
                </Grid.Col>
            </Grid>
        </>
    )
}
