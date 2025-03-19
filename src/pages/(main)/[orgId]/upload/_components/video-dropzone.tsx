import { MAX_FILE_SIZE } from '@/utils/constant'
import { Button, Group, Text } from '@mantine/core'
import { Dropzone, FileWithPath } from '@mantine/dropzone'
import { notifications } from '@mantine/notifications'
import { IconUpload, IconVideo, IconX } from '@tabler/icons-react'
import { useRef } from 'react'

interface VideoDropzoneProps {
    onUpload: (file: FileWithPath[]) => void
    loading: boolean
}

const VideoDropzone = ({ onUpload, loading }: VideoDropzoneProps) => {
    const openRef = useRef<() => void>(null)

    return (
        <div className='flex flex-col items-center justify-center'>
            <Dropzone
                loading={loading}
                onDrop={(files) => onUpload(files)}
                onReject={(files) => {
                    console.log('rejected files', files)
                    notifications.show({
                        color: 'red',
                        title: 'File rejected',
                        message: 'File does not meet requirements'
                    })
                }}
                maxSize={MAX_FILE_SIZE * 1024 ** 2}
                accept={['video/*']}
                multiple={false}
                openRef={openRef}
            >
                <Group justify='center' gap='xl' mih={220} style={{ pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                        <IconUpload size={52} color='var(--mantine-color-blue-6)' stroke={1.5} />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX size={52} color='var(--mantine-color-red-6)' stroke={1.5} />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconVideo size={52} color='var(--mantine-color-dimmed)' stroke={1.5} />
                    </Dropzone.Idle>

                    <div>
                        <Text size='xl' inline>
                            Drag video here or click to select file
                        </Text>
                        <Text size='sm' c='dimmed' inline mt={7}>
                            Max file size: {MAX_FILE_SIZE}MB
                        </Text>
                    </div>
                </Group>
            </Dropzone>
            <Group justify='center' mt='md'>
                <Button
                    size='lg'
                    onClick={() => openRef.current?.()}
                    leftSection={<IconUpload size={18} />}
                    disabled={loading}
                >
                    Select file
                </Button>
            </Group>
        </div>
    )
}

export default VideoDropzone
