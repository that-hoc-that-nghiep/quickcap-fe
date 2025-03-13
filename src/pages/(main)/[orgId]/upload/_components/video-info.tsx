import { useUploadStep } from '@/stores/uploadStep'
import { Video } from '@/types'
import { CLOUD_FRONT_URL } from '@/utils/constant'
import { Alert, Button, Grid, Group, Paper, Stack, Textarea, TextInput, Title } from '@mantine/core'
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
            title: video?.title,
            description: video?.description
        },
        validate: {
            title: (value) => {
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
                    <TextInput withAsterisk label='Title' key={form.key('title')} {...form.getInputProps('title')} />
                    <Textarea
                        label='Description'
                        autosize
                        minRows={6}
                        maxRows={8}
                        key={form.key('description')}
                        {...form.getInputProps('description')}
                    />
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
