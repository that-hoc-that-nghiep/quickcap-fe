import { Category, Video } from '@/types'
import {
    ActionIcon,
    Anchor,
    Avatar,
    Button,
    Card,
    Group,
    Menu,
    Select,
    Stack,
    Text,
    useMantineTheme
} from '@mantine/core'
import { Link, useParams } from 'react-router'
import dayjs from 'dayjs'
import {
    IconBan,
    IconEdit,
    IconEye,
    IconFlag,
    IconFolder,
    IconSettings,
    IconThumbUp,
    IconTrash
} from '@tabler/icons-react'
import { openEditVideoModal } from '../[orgId]/library/_components/modal-edit-video'
import { openReportModal } from '../[orgId]/library/_components/modal-report'
import { openAlertNsfwModal } from '../[orgId]/library/_components/modal-nsfw'
import { openModalDeleteVideo } from '../[orgId]/library/_components/modal-delete-video'
import { CLOUD_FRONT_URL } from '@/utils/constant'
import { useUser } from '@/hooks/useUser'
import { openModalRemoveVideo } from '../[orgId]/library/_components/model-remove-video'
import { closeAllModals, openModal } from '@mantine/modals'
import { useOrgCategories } from '@/services/category.service'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import { addCategoryToVideos, removeCategoryToVideos } from '@/services/video.service'
import { notifications } from '@mantine/notifications'
const MoveVideoToOrgModal = ({ video }: { video: { id: string; categoryId: Category[]; orgId: string } }) => {
    const { data } = useOrgCategories(video.orgId!)
    const categoryIds = video.categoryId.map((category) => category._id)
    const filtercategoryIds =
        data?.data.filter((category) => categoryIds.includes(category._id)).map((category) => category._id) || []

    const theme = useMantineTheme()
    const queryClient = useQueryClient()
    const form = useForm({
        initialValues: {
            categoryId: filtercategoryIds[0]
        },

        validate: {
            categoryId: (value: string) => (value.length > 0 ? null : 'You must select at least one category')
        }
    })

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async () => {
        if (form.validate().hasErrors) return
        setIsLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            const removeCategories = filtercategoryIds.filter(
                (categoryId) => !form.values.categoryId.includes(categoryId)
            )
            await removeCategoryToVideos(video.id, removeCategories)
            await addCategoryToVideos(video.id, [form.values.categoryId])
            notifications.show({
                title: 'Move video to category',
                message: 'Video has been moved successfully',
                color: 'green'
            })
            queryClient.invalidateQueries({ queryKey: ['video', video.id] })
            closeAllModals()
        } catch (error) {
            console.error('Error move video to org:', error)

            notifications.show({
                title: 'Error move video',
                message: 'An error occurred while updating video',
                color: 'red'
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Select
                data={
                    data?.data
                        .filter((c) => !c.isDeleted)
                        .map((category) => ({
                            value: category._id,
                            label: category.name
                        })) || []
                }
                label='Categories'
                placeholder='Select categories'
                {...form.getInputProps('categoryId')}
                error={form.errors.categoryId}
                disabled={isLoading}
                multiple
            />
            <Group justify='flex-end' mt='md'>
                <Button variant='outline' onClick={() => closeAllModals()} disabled={isLoading}>
                    Cancel
                </Button>
                <Button type='submit' color={theme.colors[theme.primaryColor][5]} loading={isLoading}>
                    Save Changes
                </Button>
            </Group>
        </form>
    )
}
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
                                    {user?.id === video.user.id && (
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
                                    )}

                                    {(currentOrg?.is_permission === 'ALL' ||
                                        currentOrg?.is_permission === 'UPLOAD') && (
                                        <Menu.Item
                                            leftSection={<IconFolder size={16} />}
                                            onClick={() =>
                                                openModal({
                                                    title: 'Move Video to Category',
                                                    children: (
                                                        <MoveVideoToOrgModal
                                                            video={{
                                                                id: video._id,
                                                                categoryId: video.categoryId,
                                                                orgId: orgId!
                                                            }}
                                                        />
                                                    )
                                                })
                                            }
                                        >
                                            Update category
                                        </Menu.Item>
                                    )}

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
                                        <>
                                            {currentOrg?.is_owner && (
                                                <Menu.Item
                                                    leftSection={<IconTrash size={16} />}
                                                    color='red'
                                                    onClick={() => {
                                                        openModalRemoveVideo(video._id, orgId!, video.categoryId)
                                                    }}
                                                >
                                                    Remove Video
                                                </Menu.Item>
                                            )}
                                        </>
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
