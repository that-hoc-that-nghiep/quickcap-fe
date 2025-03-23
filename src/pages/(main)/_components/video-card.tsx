import { Video } from '@/types'
import { ActionIcon, Anchor, Avatar, Card, Group, Menu, Stack, Text } from '@mantine/core'
import { Link, useParams } from 'react-router'
import dayjs from 'dayjs'
import { IconBan, IconEdit, IconEye, IconFlag, IconSettings, IconThumbUp, IconTrash } from '@tabler/icons-react'
import { openEditVideoModal } from '../[orgId]/library/_components/modal-edit-video'
import { openReportModal } from '../[orgId]/library/_components/modal-report'
import { openAlertNsfwModal } from '../[orgId]/library/_components/modal-nsfw'
import { openModalDeleteVideo } from '../[orgId]/library/_components/modal-delete-video'
import { CLOUD_FRONT_URL } from '@/utils/constant'
import { useUser } from '@/hooks/useUser'
import { openModalRemoveVideo } from '../[orgId]/library/_components/model-remove-video'

const VideoCard = ({ video }: { video: Video }) => {
    const { orgId } = useParams<{ orgId: string }>()
    const { user, currentOrg } = useUser()
    return (
        <Card withBorder shadow='sm'>
            <Card.Section
                component={video.isNSFW ? ('div' as any) : Link}
                to={video.isNSFW ? undefined : `/${orgId}/video/${video._id}`}
            >
                {video.isNSFW ? (
                    <div className='w-full h-[160px] bg-gray-400 flex items-center justify-center'>
                        <IconBan size={50} className='text-red-700' />
                    </div>
                ) : (
                    <video width='100%' className='rounded-t-lg mb-6 aspect-video'>
                        <source src={CLOUD_FRONT_URL + '/' + video.source} type='video/mp4' />
                        Your browser does not support the video tag.
                    </video>
                )}
            </Card.Section>
            <Group wrap='nowrap' grow align='start' mt={16}>
                <Stack gap={7}>
                    <Group justify='space-between'>
                        <Group>
                            <Avatar size='sm' src={video.user.picture} />
                            <Text size='md' fw={500}>
                                {video.user.name}
                            </Text>
                        </Group>
                        {!video.isNSFW && (
                            <Menu shadow='md' width={200} position='bottom-end'>
                                <Menu.Target>
                                    <ActionIcon variant='subtle'>
                                        <IconSettings size={20} />
                                    </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item
                                        disabled={user?.id !== video.user.id}
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

                                    {currentOrg?.type === 'Personal' ? (
                                        <Menu.Item
                                            leftSection={<IconTrash size={16} />}
                                            color='red'
                                            onClick={() => {
                                                openModalDeleteVideo(video._id, orgId!)
                                            }}
                                        >
                                            Delete Video
                                        </Menu.Item>
                                    ) : (
                                        <Menu.Item
                                            disabled={currentOrg?.is_owner === false ? true : false}
                                            leftSection={<IconTrash size={16} />}
                                            color='red'
                                            onClick={() => {
                                                openModalRemoveVideo(video._id, orgId!, video.categoryId)
                                            }}
                                        >
                                            Remove Video
                                        </Menu.Item>
                                    )}
                                    <Menu.Item
                                        leftSection={<IconFlag size={16} />}
                                        color='red'
                                        onClick={() => openReportModal(video._id)}
                                    >
                                        Report Video
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        )}
                    </Group>

                    {video.isNSFW ? (
                        <Group gap={2}>
                            <Text>{video.title}</Text>
                            <Text
                                size='sm'
                                fw={600}
                                className='text-red-500 cursor-pointer'
                                onClick={() => openAlertNsfwModal(video.nsfwType)}
                            >
                                NSFW Content - Click for more info
                            </Text>
                        </Group>
                    ) : (
                        <Anchor
                            component={Link}
                            to={`/${orgId}/video/${video._id}`}
                            lineClamp={2}
                            underline='never'
                            fw={600}
                        >
                            {video.title}
                        </Anchor>
                    )}
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
