import { ActionIcon, Avatar, Grid, Group, Paper, Tabs, Text, Title } from '@mantine/core'
import { useMemo } from 'react'
import { useParams } from 'react-router'
import { useVideo } from '@/services/video.service'
import dayjs from 'dayjs'
import { CLOUD_FRONT_URL } from '@/utils/constant'
import AIChatbox from './_components/ai-chatbox'
import { Comments } from './_components/comments'
import { IconEye, IconThumbUp } from '@tabler/icons-react'

export const VideoPage = () => {
    const { videoId } = useParams<{ videoId: string }>()
    const { data } = useVideo(videoId!)
    const video = useMemo(() => data.data, [data])

    return (
        <>
            <Title order={2} mb={5}>
                {video?.title}
            </Title>
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

                    <Group gap={10} mb={15}>
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

                    <Group gap={10} mb={15} align='center' justify='flex-start'>
                        <Group gap={1}>
                            <ActionIcon variant='transparent' color='red' size='md'>
                                <IconEye size={20} />
                            </ActionIcon>
                            <Text size='sm' c='dimmed'>
                                {video.views}
                            </Text>
                        </Group>

                        <Group gap={1}>
                            <ActionIcon variant='transparent' color='red' size='md'>
                                <IconThumbUp size={20} />
                            </ActionIcon>
                            <Text size='sm' c='dimmed'>
                                {video.like}
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
                            {/* <AIChatBox
                                videoId={videoId || ''}
                                videoTitle={video?.title}
                                videoDescription={video?.description}
                                videoAuthor={video?.author}
                            /> */}
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
