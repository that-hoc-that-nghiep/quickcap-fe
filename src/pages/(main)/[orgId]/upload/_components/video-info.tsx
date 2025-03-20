import { useUploadStep } from '@/stores/uploadStep'
import { Video } from '@/types'
import { CLOUD_FRONT_URL } from '@/utils/constant'
import { Alert, Button, Grid, Group, Paper, Stack, Text, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { openModal } from '@mantine/modals'
import { IconAlertCircle, IconBubbleText } from '@tabler/icons-react'
import { useEffect } from 'react'

interface VideoInfoProps {
    video: Video | null
}

const VideoInfo = ({ video }: VideoInfoProps) => {
    const [, { increment }] = useUploadStep()
    const handleShowTranscript = () => {
        openModal({
            title: 'Transcript',
            size: 'xl',
            children: <div>{video?.transcript}</div>
        })
    }

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: video?.title || '',
            description: video?.description
        },
        validate: {
            title: (value: string) => {
                if (!value) {
                    return 'Title is required'
                }
                return value.length < 5 ? 'Title is too short' : null
            }
        }
    })

    useEffect(() => {
        if (!video) return
        form.setFieldValue('title', video?.title)
        form.setFieldValue('description', video?.description)
    }, [video, form])

    return (
        <Grid gutter={'xl'}>
            <Grid.Col span={7}>
                <form action='' className='space-y-4 h-full'>
                    <Title order={2} pb={8}>
                        Video information
                    </Title>

                    <div className='flex flex-col space-y-1'>
                        <Text fw={700}>Title</Text>
                        <Paper withBorder p={8}>
                            {video?.title}
                        </Paper>
                    </div>

                    <div className='flex flex-col space-y-1'>
                        <Text fw={700}>Description</Text>
                        <Paper withBorder p={8}>
                            {video?.description}
                        </Paper>
                    </div>
                </form>
            </Grid.Col>
            <Grid.Col span={5}>
                <Paper shadow='xs' p={16} withBorder>
                    <Stack>
                        <video
                            src={CLOUD_FRONT_URL + '/' + video?.source}
                            controls
                            className='w-full h-auto rounded-md'
                        />
                        <Button fullWidth leftSection={<IconBubbleText size={16} />} onClick={handleShowTranscript}>
                            Show transcript
                        </Button>
                    </Stack>
                </Paper>
            </Grid.Col>
            <Grid.Col span={12}>
                <Alert variant='light' color='orange' title='Your video is under review' icon={<IconAlertCircle />}>
                    Your video is under review. We will notify you as soon as the process is complete.
                </Alert>
            </Grid.Col>
            <Grid.Col span={12}>
                <Group justify='end'>
                    <Button onClick={increment}>Next</Button>
                </Group>
            </Grid.Col>
        </Grid>
    )
}
export default VideoInfo
