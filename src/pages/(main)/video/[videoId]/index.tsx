import { mockVideos } from '@/utils/constant'
import { Grid, Tabs, Text, Title } from '@mantine/core'
import { useMemo } from 'react'
import { useParams } from 'react-router'
import { AIChatBox } from '@/components/AIChatBox'
import { VideoComments } from '@/components/VideoComments'

export const VideoPage = () => {
    const { videoId } = useParams<{ videoId: string }>()
    const video = useMemo(() => mockVideos.find((v) => v.id === videoId), [videoId])

    return (
        <>
            <Title order={2} mb={12}>
                {video?.title}
            </Title>
            <Text c='dimmed' size='sm'>
                {video?.author}
            </Text>
            <Grid mt={24}>
                <Grid.Col span={8}>
                    <video width='100%' controls poster={video?.thumbnailUrl} className='rounded-lg mb-6 aspect-video'>
                        <source src={video?.videoUrl} type='video/mp4' />
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

                        <Tabs.Panel value='ai-tools' pt='md'>
                            <AIChatBox
                                videoId={videoId || ''}
                                videoTitle={video?.title}
                                videoDescription={video?.description}
                                videoAuthor={video?.author}
                            />
                        </Tabs.Panel>

                        <Tabs.Panel value='transcript'>Transcript</Tabs.Panel>

                        <Tabs.Panel value='comments' pt='md'>
                            <VideoComments videoId={videoId || ''} />
                        </Tabs.Panel>
                    </Tabs>
                </Grid.Col>
            </Grid>
        </>
    )
}
