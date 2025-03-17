import { Video } from '@/types'
import { ActionIcon, Anchor, Avatar, Card, Group, Image, Menu, Stack, Text } from '@mantine/core'
import { Link, useParams } from 'react-router'
import dayjs from 'dayjs'
import { IconEdit, IconEye, IconFlag, IconSettings, IconThumbUp } from '@tabler/icons-react'
import { openEditVideoModal } from '../[orgId]/library/_components/modal-edit-video'
import { openReportModal } from '../[orgId]/library/_components/modal-report'

const VideoCard = ({ video }: { video: Video }) => {
    const { orgId } = useParams<{ orgId: string }>()
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
                    <Group justify='space-between'>
                        <Group>
                            <Avatar size='sm' src={video.user.picture} />
                            <Text size='md' fw={500}>
                                {video.user.name}
                            </Text>
                        </Group>
                        <Menu shadow='md' width={200} position='bottom-end'>
                            <Menu.Target>
                                <ActionIcon variant='subtle'>
                                    <IconSettings size={20} />
                                </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item
                                    leftSection={<IconEdit size={16} />}
                                    onClick={() =>
                                        openEditVideoModal({
                                            id: video._id,
                                            title: video.title,
                                            description: video.description || '',
                                            transcript: video.transcript
                                        })
                                    }
                                >
                                    Edit Video
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={<IconFlag size={16} />}
                                    color='red'
                                    onClick={() => openReportModal(video._id)}
                                >
                                    Report Video
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
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
