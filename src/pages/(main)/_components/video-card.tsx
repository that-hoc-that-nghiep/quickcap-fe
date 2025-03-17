import { Video } from '@/types'
import { ActionIcon, Anchor, Avatar, Card, Group, Image, Stack, Text } from '@mantine/core'
import { Link, useParams } from 'react-router'
import dayjs from 'dayjs'
import { IconEye, IconThumbUp } from '@tabler/icons-react'
import { toast } from 'sonner'
import { useState } from 'react'

const VideoCard = ({ video }: { video: Video }) => {
    const { orgId } = useParams<{ orgId: string }>()
    const [isLoading, setIsLoading] = useState(false)
    const handleReportVideo = async () => {
        setIsLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))

            toast.success('Report submitted successfully!')
        } catch (error) {
            console.error('Error reporting video:', error)
            toast.error('Failed to report the video')
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Card withBorder shadow='sm'>
            <Card.Section component={Link} to={`/${orgId}/video/${video._id}`}>
                <Image
                    src={`https://placehold.co/600x400?text=${video.title}`}
                    alt={video.title}
                    height={160}
                    fit='cover'
                    className='aspect-video'
                />
            </Card.Section>
            <Group wrap='nowrap' align='start' mt={16}>
                <Stack gap={7}>
                    <Group gap={10}>
                        <Avatar size='sm' src={video.user.picture} />
                        <Text size='md' fw={500}>
                            {video.user.name}
                        </Text>
                    </Group>
                    <Anchor
                        component={Link}
                        to={`/${orgId}/video/${video._id}`}
                        lineClamp={2}
                        underline='never'
                        fw={600}
                    >
                        {video.title}
                    </Anchor>
                    <Text size='sm' c='dimmed'>
                        {dayjs(video.createdAt).format('DD/MM/YYYY - HH:mm')}
                    </Text>
                    <Group gap={10} align='center' justify='flex-start'>
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
                </Stack>
            </Group>
        </Card>
    )
}

export default VideoCard
