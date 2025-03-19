import { Button, Container, Group, Stack, Stepper, Title } from '@mantine/core'
import VideoDropzone from './_components/video-dropzone'
import { FileWithPath } from '@mantine/dropzone'
import { useCallback, useState } from 'react'
import { notifications } from '@mantine/notifications'
import { uploadVideo } from '@/services/video.service'
import { Video } from '@/types'
import VideoInfo from './_components/video-info'
import { useUploadStep } from '@/stores/uploadStep'
import { Link, useParams } from 'react-router'
import SelectOrgs from './_components/select-orgs'

const StepContainer = ({ children }: { children: React.ReactNode }) => (
    <Container size={'lg'} className='w-full mt-6'>
        {children}
    </Container>
)

const VideoUploadPage = () => {
    const { orgId } = useParams()
    const [active, handlers] = useUploadStep(2 , { min: 0, max: 3 })

    const [loading, setLoading] = useState(false)
    const [videoInfo, setVideoInfo] = useState<Video | null>(null)

    const onUpload = useCallback(
        async (files: FileWithPath[]) => {
            setLoading(true)
            try {
                const res = await uploadVideo(files[0])
                if (res) {
                    notifications.show({
                        color: 'green',
                        title: 'Upload successful',
                        message: 'Video uploaded successfully'
                    })
                    setVideoInfo(res.data)
                    handlers.increment()
                }
            } catch (error) {
                console.error(error)
                notifications.show({
                    color: 'red',
                    title: 'Upload failed',
                    message: 'Something went wrong'
                })
            } finally {
                setLoading(false)
            }
        },
        [handlers]
    )

    return (
        <Container size={'lg'} className='w-full'>
            <Stepper active={active} className='w-full mt-4'>
                <Stepper.Step label='Upload video' description='Upload your video' loading={loading}>
                    <StepContainer>
                        <VideoDropzone onUpload={onUpload} loading={loading} />
                    </StepContainer>
                </Stepper.Step>
                <Stepper.Step label='Video information' description='Review uploaded video'>
                    <StepContainer>
                        <VideoInfo video={videoInfo} />
                    </StepContainer>
                </Stepper.Step>
                <Stepper.Step label='Select org' description='Select organization to upload video'>
                    <StepContainer>
                        <SelectOrgs video={videoInfo} />
                    </StepContainer>
                </Stepper.Step>
                <Stepper.Completed>
                    <StepContainer>
                        <Stack>
                            <Title ta={'center'} mb={16}>
                                Video uploaded successfully 🎉
                            </Title>
                            <Group justify='center'>
                                <Button component={Link} to={`/${orgId}/library`}>
                                    Go to library
                                </Button>
                            </Group>
                        </Stack>
                    </StepContainer>
                </Stepper.Completed>
            </Stepper>
        </Container>
    )
}

export default VideoUploadPage
