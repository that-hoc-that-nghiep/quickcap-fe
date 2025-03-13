import { Video } from '@/types'
import { Anchor, Avatar, Card, Group, Image, Stack, Text } from '@mantine/core'
import { Link } from 'react-router'
import dayjs from 'dayjs'

const VideoCard = ({ video }: { video: Video }) => {
    return (
        <Card withBorder shadow='sm'>
            <Card.Section component={Link} to={`/video/${video._id}`}>
                <Image
                    src={`https://placehold.co/600x400?text=${video.title}`}
                    alt={video.title}
                    height={160}
                    fit='cover'
                    className='aspect-video'
                />
            </Card.Section>
            <Group wrap='nowrap' align='start' mt={16}>
                <Avatar></Avatar>
                <Stack gap={2}>
                    <Anchor component={Link} to={`/video/${video._id}`} lineClamp={2} underline='never' fw={600}>
                        {video.title}
                    </Anchor>
                    <Text size='sm' c='dimmed'>
                        {dayjs(video.createdAt).format('DD/MM/YYYY - HH:mm')}
                    </Text>
                    <Text size='sm' c='dimmed'>
                        {video.views} views
                    </Text>
                </Stack>
            </Group>
        </Card>
    )
}

export default VideoCard
