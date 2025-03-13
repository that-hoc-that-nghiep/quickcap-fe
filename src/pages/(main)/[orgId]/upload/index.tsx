import { Button, Container, Stepper } from '@mantine/core'
import VideoDropzone from './_components/video-dropzone'
import { FileWithPath } from '@mantine/dropzone'
import { useCallback, useState } from 'react'
import { notifications } from '@mantine/notifications'
import { uploadVideo } from '@/services/video.service'
import { Video } from '@/types'
import VideoInfo from './_components/video-info'
import { useUploadStep } from '@/stores/uploadStep'
import { Link, useParams } from 'react-router'

const StepContainer = ({ children }: { children: React.ReactNode }) => (
    <Container size={'lg'} className='w-full mt-6'>
        {children}
    </Container>
)

const VideoUploadPage = () => {
    const { orgId } = useParams()
    const [active, handlers] = useUploadStep(0, { min: 0, max: 3 })
    console.log(active)

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
                        <VideoInfo video={videoInfo!} />
                    </StepContainer>
                </Stepper.Step>
                <Stepper.Step label='Select org' description='Select organization to upload video'>
                    <StepContainer>
                        <Button onClick={handlers.increment}>Next</Button>
                    </StepContainer>
                </Stepper.Step>
                <Stepper.Completed>
                    <Button component={Link} to={`/${orgId}/library`}>
                        Go to library
                    </Button>
                </Stepper.Completed>
            </Stepper>
        </Container>
    )
}

export default VideoUploadPage
