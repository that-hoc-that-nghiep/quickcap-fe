import { Grid, Paper, Tabs, Text, Title } from '@mantine/core'
import { useMemo } from 'react'
import { useParams } from 'react-router'
import { useVideo } from '@/services/video.service'
import dayjs from 'dayjs'
import { CLOUD_FRONT_URL } from '@/utils/constant'
import AIChatbox from './_components/ai-chatbox'
import { Comments } from './_components/comments'

export const VideoPage = () => {
    const { videoId } = useParams<{ videoId: string }>()
    const { data } = useVideo(videoId!)
    const video = useMemo(() => data.data, [data])

    return (
        <>
            <Title order={2} mb={12}>
                {video?.title}
            </Title>
            <Text c='dimmed' size='sm'>
                {dayjs(video?.createdAt).format('DD/MM/YYYY - HH:mm')}
            </Text>
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
                            <AIChatbox />
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
