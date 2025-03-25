import { Button, Container, Group, Progress, Stack, Stepper, Text, Title } from '@mantine/core'
import VideoDropzone from './_components/video-dropzone'
import { FileWithPath } from '@mantine/dropzone'
import { useCallback, useState } from 'react'
import { notifications } from '@mantine/notifications'
import { isChunkedUploadSupported, uploadVideo, uploadVideoChunked } from '@/services/video.service'
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
    const [active, handlers] = useUploadStep(0, { min: 0, max: 3 })
    const [loading, setLoading] = useState(false)
    const [videoInfo, setVideoInfo] = useState<Video | null>(null)
    const [uploadProgress, setUploadProgress] = useState({ uploaded: 0, total: 0, percentage: 0 })

    const onUpload = useCallback(
        async (files: FileWithPath[]) => {
            setLoading(true)
            try {
                let videoData: Video | null = null

                // Check if chunked upload is supported
                if (isChunkedUploadSupported()) {
                    // Use chunked upload with progress tracking
                    notifications.show({
                        color: 'blue',
                        title: 'Starting chunked upload',
                        message: 'Your video will be processed in chunks for faster upload',
                        loading: true,
                        autoClose: 3000
                    })

                    const response = await uploadVideoChunked(
                        files[0] as File, // Convert FileWithPath to File
                        5 * 1024 * 1024, // 5MB chunk size
                        (progress) => {
                            console.log('Upload progress:', progress)
                            setUploadProgress(progress)
                        }
                    )

                    videoData = response.data
                    console.log('Chunked upload complete. Video data:', videoData)
                } else {
                    // Fall back to regular upload if chunked upload is not supported
                    notifications.show({
                        color: 'yellow',
                        title: 'Using traditional upload',
                        message: 'Your browser does not support chunked uploads. Using standard upload instead.'
                    })

                    const response = await uploadVideo(files[0])
                    videoData = response.data
                    console.log('Standard upload complete. Video data:', videoData)
                }

                if (videoData) {
                    notifications.show({
                        color: 'green',
                        title: 'Upload successful',
                        message: 'Video uploaded successfully',
                        autoClose: 5000
                    })

                    setVideoInfo(videoData)

                    // Wait a short time to ensure state is updated before moving to next step
                    setTimeout(() => {
                        handlers.increment()
                    }, 500)
                } else {
                    throw new Error('No video data returned from upload')
                }
            } catch (error) {
                console.error('Upload error:', error)
                notifications.show({
                    color: 'red',
                    title: 'Upload failed',
                    message: error instanceof Error ? error.message : 'Something went wrong',
                    autoClose: false
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
                        <VideoDropzone sizeButton='lg' height={220} onUpload={onUpload} loading={loading} />

                        {/* Show progress bar during upload */}
                        {(loading || uploadProgress.percentage > 0) && (
                            <Stack mt='md'>
                                <Progress
                                    value={uploadProgress.percentage}
                                    size='md'
                                    striped={loading}
                                    animated={loading}
                                />
                                <Text size='sm' ta='center'>
                                    {uploadProgress.percentage}%
                                    {!loading && uploadProgress.percentage >= 100 && ' - Processing video...'}
                                </Text>
                            </Stack>
                        )}
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
