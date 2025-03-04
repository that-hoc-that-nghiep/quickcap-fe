import { Video } from '@/types'
import { Anchor, Avatar, Card, Group, Image, Stack, Text } from '@mantine/core'
import { Link } from 'react-router'

const VideoCard = ({ video }: { video: Video }) => {
    return (
        <Card key={video.id} withBorder shadow='sm' w={300} className='grow'>
            <Card.Section component={Link} to={`/video/${video.id}`}>
                <Image src={video.thumbnailUrl} alt={video.title} height={160} fit='cover' className='aspect-video' />
            </Card.Section>
            <Group wrap='nowrap' align='start' mt={16}>
                <Avatar></Avatar>
                <Stack gap={2}>
                    <Anchor component={Link} to={`/video/${video.id}`} lineClamp={2} underline='never' fw={600}>
                        {video.title}
                    </Anchor>
                    <Text size='sm' c='dimmed'>
                        {video.author}
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
